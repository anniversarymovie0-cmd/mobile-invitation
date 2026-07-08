import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailRef = useRef(null);

  // ✅ 갤러리 미사용 옵션 추가
  const isGalleryEnabled = images?.enabled !== false;

  // ✅ 기존 배열 방식 / 새 객체 방식 둘 다 대응
  const galleryImages = Array.isArray(images) ? images : images?.list;

  if (!isGalleryEnabled || !galleryImages || galleryImages.length === 0) return null;

  const moveImage = (direction) => {
    setSelectedIndex((prev) => {
      const nextIndex =
        direction === 'left'
          ? prev === 0 ? galleryImages.length - 1 : prev - 1
          : prev === galleryImages.length - 1 ? 0 : prev + 1;

      setTimeout(() => {
        const thumbnail = thumbnailRef.current?.children[nextIndex];
        thumbnail?.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }, 0);

      return nextIndex;
    });
  };

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#fff' }}>
      <h2 className="english-title" style={{ marginBottom: '40px' }}>
        GALLERY
      </h2>

      {/* 메인 이미지 */}
      <div style={{
        width: '100%',
        marginBottom: '40px',
        padding: '0 20px',
        height: '430px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <motion.img
          key={selectedIndex}
          src={galleryImages[selectedIndex]}
          alt="Main Gallery"
          loading="eager"
          decoding="async"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
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
            transform: 'scale(1.07)',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
        />
      </div>

      {/* 썸네일 */}
      <div
        className="thumbnail-wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
        }}
      >
        <button
          className="thumbnail-arrow"
          onClick={() => moveImage('left')}
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
            flex: 1,
          }}
        >
          {galleryImages.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              style={{ flexShrink: 0 }}
            >
              <img
                src={src}
                alt={`thumbnail-${index}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: 'none',
                  opacity: selectedIndex === index ? 1 : 0.6,
                  transition: 'all 0.2s',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                }}
              />
            </div>
          ))}
        </div>

        <button
          className="thumbnail-arrow"
          onClick={() => moveImage('right')}
        >
          &#8250;
        </button>
      </div>

      <style>{`
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
          transition: 0.2s;
          display: block;
          outline: none;
          line-height: 1;
        }

        .thumbnail-arrow:hover {
          opacity: 0.8;
        }

        .thumbnail-arrow:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}