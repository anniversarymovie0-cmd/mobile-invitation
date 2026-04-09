import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MainVisual({ data }) {

  // 🔥 스크롤 기반 애니메이션
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // 👉 은은하게 위로 이동 (핵심)
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <div ref={ref} className="fullscreen-container">
      
      {/* 1. 배경 이미지 */}
      <motion.img 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        src={data.mainImage} 
        alt="Main" 
        className="fullscreen-image"
      />

      {/* 3. 상단 타이틀 (흰색) */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5, delay: 0.5 }}
        className="main-title-white"
      >
      </motion.h2>

      {/* 4. 하단 이름 및 날짜 (현재 주석 유지) */}
      {/*
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5, delay: 1 }}
        className="main-info-white"
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', fontWeight: 'bold' }}>
          {data.groomName} <span style={{ fontSize: '1rem', verticalAlign: 'middle' }}>&</span> {data.brideName}
        </h2>
        <p style={{ fontSize: '1rem', opacity: 0.9, letterSpacing: '1px' }}>
          {data.date}
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '5px' }}>
          {data.location}
        </p>
      </motion.div>
      */}
      
    </div>
  );
}