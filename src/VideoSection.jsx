import React, { useState } from 'react';

export default function VideoSection({ data, setIsVideoPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!data || !data.url) return null;

  // ✅ 세로 여부 체크 (추가)
  const isVertical = data.ratio === 'vertical';

  let videoId = '';

  if (data.url.includes('youtu.be')) {
    videoId = data.url.split('/').pop();
  } else if (data.url.includes('embed')) {
    videoId = data.url.split('embed/')[1]?.split('?')[0];
  } else {
    videoId = data.url.split('v=')[1]?.split('&')[0];
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;

  return (
    <div style={{ padding: '50px 0 20px', backgroundColor: '#fff' }}>
      
      {/* ✅ 여기만 분기 */}
      <div
        style={{
          width: isVertical ? '90%' : '100%',
          aspectRatio: isVertical ? '9 / 16' : '16 / 9',
          height: 'auto',
          position: 'relative',
          overflow: 'hidden',
          margin: isVertical ? '0 auto' : '0'
        }}
      >

        {!isPlaying ? (
          <div
            onClick={() => {
              setIsPlaying(true);
              setIsVideoPlaying(true);
            }}
            style={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {/* 썸네일 */}
            <img
              src={thumbnail}
              onError={(e) => {
                e.target.src = fallback;
              }}
              alt="video thumbnail"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* 어두운 오버레이 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.2)'
            }} />

            {/* ▶ 플레이 버튼 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ▶
            </div>
          </div>
        ) : (
          <iframe
            src={embedUrl}
            title="Wedding Video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        )}

      </div>
    </div>
  );
}