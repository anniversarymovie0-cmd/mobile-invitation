import React, { useEffect, useRef, useState } from 'react';

export default function MusicPlayer({ bgm, isVideoPlaying, bgmAutoPlay }) {
  if (!bgm) return null; 
  const audioRef = useRef(null);
  const fadeRef = useRef(null); // 🔥 interval 관리

  const isAutoPlay = bgmAutoPlay === true; // ✅ 추가

  const [showToast, setShowToast] = useState(!isAutoPlay); // ✅ 수정
  const [isPlaying, setIsPlaying] = useState(false);

  const musicSrc = typeof bgm === 'string' && bgm.includes('/')
  ? bgm
  : `/music/bgm_${bgm}.mp3`;

  // 🔥 페이드 아웃 (안정 버전)
  const fadeOut = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearInterval(fadeRef.current);

    let volume = audio.volume;

    fadeRef.current = setInterval(() => {
      if (volume > 0.05) {
        volume -= 0.05;
        audio.volume = volume;
      } else {
        audio.volume = 0;
        audio.pause();
        setIsPlaying(false);
        clearInterval(fadeRef.current);
      }
    }, 50);
  };

  // 토스트 자동 숨김
useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2200);

    return () => clearTimeout(timer);
  }
}, [showToast]);

  // 🔥 영상 시작 시만 페이드아웃 (핵심 수정)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isVideoPlaying) {
      fadeOut();
    } else {
      audio.volume = 1;
    }
  }, [isVideoPlaying]);

  // 자동재생
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAutoPlay) { // ✅ 수정
      audio.volume = 1;

      audio.play()
  .then(() => {
    setIsPlaying(true);
    setShowToast(false);
  })
  .catch(() => {
    setIsPlaying(false);
    setShowToast(true);
  });
    }
  }, [isAutoPlay]); // ✅ 수정

  // 🔥 수동 버튼
  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearInterval(fadeRef.current);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 1;
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  if (!musicSrc) return null;

  return (
    <>
      {/* 토스트 */}
      {showToast && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '480px',
            padding: '14px 0',
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            textAlign: 'center',
            fontSize: '13px',
            zIndex: 9999
          }}
        >
          배경음악이 준비되어 있습니다
        </div>
      )}

      <audio ref={audioRef} src={musicSrc} loop />

      {/* 버튼 */}
      <div
        onClick={handlePlay}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10,
          cursor: 'pointer',
          opacity: 0.7,
          display: 'flex',
          alignItems: 'center',
          gap: '9px'
        }}
      >
        {/* 🎵 움직이는 바 */}
        {isPlaying && (
          <div style={{ display: 'flex', gap: '2px' }}>
            <div className="music-bar" />
            <div className="music-bar delay1" />
            <div className="music-bar delay2" />
          </div>
        )}

        {/* ▶ / || 버튼 */}
        {isPlaying ? (
          <div style={{ display: 'flex', gap: '3px' }}>
            <div style={{ width: '3px', height: '14px', background: '#aaa' }} />
            <div style={{ width: '3px', height: '14px', background: '#aaa' }} />
          </div>
        ) : (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '12px solid #aaa',
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent'
            }}
          />
        )}
      </div>
    </>
  );
}