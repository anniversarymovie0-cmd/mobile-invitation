import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Information({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  if (!data || data.length === 0) return null;

  // 스크롤할 때 현재 몇 번째 페이지인지 계산하는 함수
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      // 현재 스크롤 위치를 카드 너비로 나눠서 인덱스 계산
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    }
  };

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#fff', textAlign: 'center' }}>
      
      {/* 1. 타이틀 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        style={{ marginBottom: '30px', padding: '0 20px' }}
      >
       <p className="english-title" style={{ marginBottom: '10px' }}>
  INFORMATION
</p>
     
      </motion.div>

      {/* 2. 가로 슬라이드 영역 (좌우 스크롤) */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',        // 가로 스크롤 허용
          scrollSnapType: 'x mandatory', // 스크롤이 딱딱 멈추게 설정
          paddingBottom: '20px',
          scrollbarWidth: 'none',   // 파이어폭스 스크롤바 숨김
          msOverflowStyle: 'none',  // IE 스크롤바 숨김
          WebkitOverflowScrolling: 'touch' // 모바일 터치감 향상
        }}
        className="hide-scrollbar" // 크롬 스크롤바 숨김 (아래 style 태그 참고)
      >
        {data.map((item, index) => (
          <div 
            key={index}
            style={{
              minWidth: '100%',      // 화면 꽉 차게
              scrollSnapAlign: 'center', // 가운데 정렬로 멈춤
              padding: '0 20px',     // 양옆 여백
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* 카드 디자인 */}
            <div style={{
              width: '100%',
              backgroundColor: '#f9f9f9',
              padding: '40px 20px',
              borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px' // 카드 최소 높이
            }}>
              <h3 style={{ 
                fontSize: '1.1rem', 
                marginBottom: '15px', 
                fontWeight: 'bold',
                color: '#000000'
              }}>
                {item.title}
              </h3>
              <p style={{ 
                color: '#555', 
                fontSize: '0.95rem', 
                lineHeight: '1.8', 
                whiteSpace: 'pre-wrap' 
              }}>
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. 페이지네이션 (점 3개) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
        {data.map((_, index) => (
          <div 
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#fa7268' : '#ddd', // 활성화된 점 색상 변경
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </div>

      {/* 스크롤바 숨기기 위한 내부 스타일 */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
}