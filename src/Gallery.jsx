import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const thumbnailRef = useRef(null);

  // ✅ 메인 이미지 스와이프 시작 위치
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  // ✅ 갤러리 미사용 옵션
  const isGalleryEnabled = images?.enabled !== false;

  // ✅ 기존 배열 방식 / 새 객체 방식 둘 다 대응
  const galleryImages = Array.isArray(images)
    ? images
    : images?.list;

  if (
    !isGalleryEnabled ||
    !galleryImages ||
    galleryImages.length === 0
  ) {
    return null;
  }

  // ✅ 선택된 썸네일이 화면 중앙에 보이도록 이동
  const scrollToThumbnail = (index) => {
    setTimeout(() => {
      const thumbnail = thumbnailRef.current?.children[index];

      thumbnail?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }, 0);
  };

  // ✅ 이전·다음 이미지 이동
  const moveImage = (direction) => {
    if (galleryImages.length <= 1) return;

    setSelectedIndex((prev) => {
      const nextIndex =
        direction === 'left'
          ? prev === 0
            ? galleryImages.length - 1
            : prev - 1
          : prev === galleryImages.length - 1
            ? 0
            : prev + 1;

      scrollToThumbnail(nextIndex);

      return nextIndex;
    });
  };

  // ✅ 썸네일 직접 선택
  const selectImage = (index) => {
    setSelectedIndex(index);
    scrollToThumbnail(index);
  };

  // ✅ 메인 이미지 터치 시작
  const handleTouchStart = (event) => {
    const touch = event.touches[0];

    if (!touch) return;

    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  // ✅ 메인 이미지 터치 종료
  const handleTouchEnd = (event) => {
    if (
      touchStartXRef.current === null ||
      touchStartYRef.current === null
    ) {
      return;
    }

    const touch = event.changedTouches[0];

    if (!touch) return;

    const distanceX =
      touchStartXRef.current - touch.clientX;

    const distanceY =
      touchStartYRef.current - touch.clientY;

    // 터치값 초기화
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    /*
     * ✅ 좌우 이동 거리가 45px 이상이고,
     * 세로 이동보다 가로 이동이 클 때만 스와이프로 판단
     *
     * 따라서 일반적인 위아래 페이지 스크롤은 방해하지 않음
     */
    const isHorizontalSwipe =
      Math.abs(distanceX) >= 45 &&
      Math.abs(distanceX) > Math.abs(distanceY);

    if (!isHorizontalSwipe) return;

    if (distanceX > 0) {
      // 왼쪽으로 밀기 → 다음 사진
      moveImage('right');
    } else {
      // 오른쪽으로 밀기 → 이전 사진
      moveImage('left');
    }
  };

  // ✅ 터치가 중간에 취소된 경우 초기화
  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      style={{
        padding: '60px 0',
        backgroundColor: '#fff'
      }}
    >
      <h2
        className="english-title"
        style={{ marginBottom: '40px' }}
      >
        GALLERY
      </h2>

      {/* 메인 이미지 */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        style={{
          width: '100%',
          marginBottom: '40px',
          padding: '0 20px',
          height: '430px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          // ✅ 세로 스크롤은 허용하면서 좌우 스와이프 사용
          touchAction: 'pan-y',
          overflow: 'hidden'
        }}
      >
        <motion.img
          key={selectedIndex}
          src={galleryImages[selectedIndex]}
          alt="Main Gallery"
          loading="eager"
          decoding="async"
          draggable={false}
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            backgroundColor: '#ffffff',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 썸네일 */}
      <div
        className="thumbnail-wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px'
        }}
      >
        {/* 이전 이미지 */}
        <button
          type="button"
          className="thumbnail-arrow"
          onClick={() => moveImage('left')}
          aria-label="이전 이미지"
        >
          &#8249;
        </button>

        <div
          ref={thumbnailRef}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            flex: 1
          }}
        >
          {galleryImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              onClick={() => selectImage(index)}
              style={{
                flexShrink: 0
              }}
            >
              <img
                src={src}
                alt={`thumbnail-${index}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                onContextMenu={(event) =>
                  event.preventDefault()
                }
                onDragStart={(event) =>
                  event.preventDefault()
                }
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: 'none',
                  opacity:
                    selectedIndex === index ? 1 : 0.6,
                  transition: 'all 0.2s',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
                }}
              />
            </div>
          ))}
        </div>

        {/* 다음 이미지 */}
        <button
          type="button"
          className="thumbnail-arrow"
          onClick={() => moveImage('right')}
          aria-label="다음 이미지"
        >
          &#8250;
        </button>
      </div>

      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .thumbnail-arrow {
          border: none;
          background: transparent;
          color: #777;
          font-size: 30px;
          font-weight: 300;
          cursor: pointer;
          padding: 0 8px;
          opacity: 0.35;
          transition: opacity 0.2s;
          display: block;
          outline: none;
          line-height: 1;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }

        .thumbnail-arrow:hover {
          opacity: 0.8;
        }

        .thumbnail-arrow:focus {
          outline: none;
        }

        .thumbnail-arrow:active {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}