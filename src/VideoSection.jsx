import React, { useState } from 'react';

export default function VideoSection({ data, setIsVideoPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!data || !data.url) return null;

  let videoId = '';

  if (data.url.includes('youtu.be')) {
    videoId = data.url.split('/').pop();
  } else {
    videoId = data.url.split('v=')[1]?.split('&')[0];
  }

  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`;

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#fff' }}>
      
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          position: 'relative',
          overflow: 'hidden'
        }}
      >

        {!isPlaying ? (
          <div
            onClick={() => {
  setIsPlaying(true);
  setIsVideoPlaying(true); // 🔥 이거 추가
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