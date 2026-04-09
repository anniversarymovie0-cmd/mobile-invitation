import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Gallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#fff' }}>
      
      {/* 타이틀 */}
      <h2 className="english-title" style={{ marginBottom: '40px' }}>
        GALLERY
      </h2>

      {/* 메인 이미지 */}
      <div style={{ 
        width: '100%',
        marginBottom: '40px',
        padding: '0 20px',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
       justifyContent: 'center',
      }}>
        <motion.img
          key={selectedIndex}
          src={images[selectedIndex]}
          alt="Main Gallery"
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
}}
        />
      </div>

      {/* 썸네일 */}
      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '10px',
          padding: '0 20px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {images.map((src, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedIndex(index)}
            style={{ flexShrink: 0 }}
          >
            <img
              src={src}
              alt={`thumbnail-${index}`}
              style={{
                width: '70px',
                height: '70px',
                objectFit: 'cover',
                cursor: 'pointer',
                border: 'none',
                opacity: selectedIndex === index ? 1 : 0.6,
                transition: 'all 0.2s',
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
}