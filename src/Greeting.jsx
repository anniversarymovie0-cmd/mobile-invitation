import React from 'react';
import { motion } from 'framer-motion';

export default function Greeting({ intro, parents }) {

  // ✅ 부모 이름 + 옵션 처리 함수
  const renderParentName = (parent) => {
    if (!parent) return '';

    if (parent.symbol === 'go') {
      return `故 ${parent.name}`;
    }

    if (parent.symbol === 'flower') {
      return (
        <>
          <img
            src="/images/flower.png"
            alt="국화"
            style={{
              width: '12px',
              marginRight: '4px',
              verticalAlign: 'middle',
              opacity: 0.7
            }}
          />
          {parent.name}
        </>
      );
    }

    return parent.name;
  };

  return (
    <div style={{ padding: '80px 30px', backgroundColor: '#fff', textAlign: 'center' }}>
      
      {/* INVITATION 타이틀 */}
      <motion.h2
        className="english-title"
        style={{ marginBottom: '30px' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        INVITATION
      </motion.h2>

      {/* 인사말 */}
      <motion.p
        style={{ fontSize: '1rem', lineHeight: '2.2', color: '#555', marginBottom: '50px', whiteSpace: 'pre-wrap' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {intro.message}
      </motion.p>

      {/* 부모 / 이름 */}
      <motion.div
        style={{ fontSize: '1rem', color: '#333' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div style={{ marginBottom: '10px' }}>
          <span>
            {renderParentName(parents.groom.father)} · {renderParentName(parents.groom.mother)}
          </span>
          <span style={{ fontSize: '1rem', color: '#999', margin: '0 5px' }}>
            의 {parents.groom.relation}
          </span>
          <span style={{ fontWeight: 'bold' }}>{intro.groomName}</span>
        </div>

        <div>
          <span>
            {renderParentName(parents.bride.father)} · {renderParentName(parents.bride.mother)}
          </span>
          <span style={{ fontSize: '1rem', color: '#999', margin: '0 5px' }}>
            의 {parents.bride.relation}
          </span>
          <span style={{ fontWeight: 'bold' }}>{intro.brideName}</span>
        </div>
      </motion.div>

    </div>
  );
}