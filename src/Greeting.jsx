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
    <span
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <img
        src="/images/flower.png"
        alt="국화"
        style={{
          width: '11px',
          height: '11px',
          position: 'absolute',
          left: '-16px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 1
        }}
      />
      {parent.name}
    </span>
  );
}

    return parent.name;
  };

  // ✅ 부모 존재 여부 체크
  const hasGroomParents =
    parents.groom.father?.name || parents.groom.mother?.name;

  const hasBrideParents =
    parents.bride.father?.name || parents.bride.mother?.name;

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
        style={{
          fontSize: '1rem',
          lineHeight: '2.2',
          color: '#555',
          marginBottom: '50px',
          whiteSpace: 'pre-wrap'
        }}
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

        {/* 🔵 신랑 */}
        <div style={{ marginBottom: '10px' }}>
          {hasGroomParents ? (
            <>
              <span>
                {parents.groom.father?.name && renderParentName(parents.groom.father)}
                {parents.groom.father?.name && parents.groom.mother?.name && ' · '}
                {parents.groom.mother?.name && renderParentName(parents.groom.mother)}
              </span>

              <span style={{ fontSize: '1rem', color: '#999', margin: '0 5px' }}>
                의 <span style={{ display: 'inline-block', minWidth: '2.5em' }}>
                  {parents.groom.relation}
                </span>
              </span>

              <span style={{ fontWeight: 'bold' }}>{intro.groomName}</span>
            </>
          ) : (
            <>
              <span style={{ color: '#999', marginRight: '6px' }}>신랑</span>
              <span style={{ fontWeight: 'bold' }}>{intro.groomName}</span>
            </>
          )}
        </div>

        {/* 🔴 신부 */}
        <div>
          {hasBrideParents ? (
            <>
              <span>
                {parents.bride.father?.name && renderParentName(parents.bride.father)}
                {parents.bride.father?.name && parents.bride.mother?.name && ' · '}
                {parents.bride.mother?.name && renderParentName(parents.bride.mother)}
              </span>

              <span style={{ fontSize: '1rem', color: '#999', margin: '0 5px' }}>
                의 <span style={{ display: 'inline-block', minWidth: '2.5em' }}>
                  {parents.bride.relation}
                </span>
              </span>

              <span style={{ fontWeight: 'bold' }}>{intro.brideName}</span>
            </>
          ) : (
            <>
              <span style={{ color: '#999', marginRight: '6px' }}>신부</span>
              <span style={{ fontWeight: 'bold' }}>{intro.brideName}</span>
            </>
          )}
        </div>

      </motion.div>

    </div>
  );
}