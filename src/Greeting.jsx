import React from 'react';
import { motion } from 'framer-motion';

export default function Greeting({ intro, parents }) {

  // ✅ 부모 이름 + 옵션 처리 함수
  const renderParentName = (parent, isFirst = false) => {
    if (!parent) return '';

    const nameText = parent.symbol === 'go' ? `故 ${parent.name}` : parent.name;
    const isFlower = parent.symbol === 'flower';

    return (
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: '1.8',
          verticalAlign: 'middle'
        }}
      >
        {isFlower && (
          isFirst ? (
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
                display: 'block'
              }}
            />
          ) : (
            <img
              src="/images/flower.png"
              alt="국화"
              style={{
                width: '11px',
                height: '11px',
                display: 'inline-block',
                marginRight: '3px',
                flexShrink: 0
              }}
            />
          )
        )}

        <span>{nameText}</span>
      </span>
    );
  };

  const hasGroomParents =
    parents.groom.father?.name || parents.groom.mother?.name;

  const hasBrideParents =
    parents.bride.father?.name || parents.bride.mother?.name;

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    lineHeight: '1.8'
  };

  return (
    <div style={{ padding: '80px 30px', backgroundColor: '#fff', textAlign: 'center' }}>
      
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

      <motion.div
        style={{ fontSize: '1rem', color: '#333' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
      >

        {/* 신랑 */}
        <div style={{ ...rowStyle, marginBottom: '10px' }}>
          {hasGroomParents ? (
            <>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {parents.groom.father?.name &&
                  renderParentName(parents.groom.father, true)}

                {parents.groom.father?.name && parents.groom.mother?.name && (
                  <span style={{ margin: '0 4px' }}>·</span>
                )}

                {parents.groom.mother?.name &&
                  renderParentName(parents.groom.mother, !parents.groom.father?.name)}
              </span>

              <span style={{ color: '#999', margin: '0 5px' }}>
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

        {/* 신부 */}
        <div style={rowStyle}>
          {hasBrideParents ? (
            <>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {parents.bride.father?.name &&
                  renderParentName(parents.bride.father, true)}

                {parents.bride.father?.name && parents.bride.mother?.name && (
                  <span style={{ margin: '0 4px' }}>·</span>
                )}

                {parents.bride.mother?.name &&
                  renderParentName(parents.bride.mother, !parents.bride.father?.name)}
              </span>

              <span style={{ color: '#999', margin: '0 5px' }}>
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