import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Accounts({ data }) {
  const [open, setOpen] = useState({ groom: false, bride: false });
  const toggle = (side) => setOpen({ ...open, [side]: !open[side] });

  // [수정됨] 강력한 복사 기능 (HTTP/HTTPS 모두 지원)
  const handleCopy = (text) => {
    // 1. 최신 방식 시도 (HTTPS 또는 localhost)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => alert("계좌번호가 복사되었습니다."))
        .catch(() => legacyCopy(text)); // 실패하면 옛날 방식 시도
    } else {
      // 2. 보안 환경이 아닐 때 (IP 주소 접속 등) 옛날 방식 사용
      legacyCopy(text);
    }
  };

  // [추가] 옛날 복사 방식 (호환성용)
  const legacyCopy = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // 화면 밖으로 숨김
      textArea.style.position = "fixed"; 
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      
      // 복사 명령 실행
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        alert("계좌번호가 복사되었습니다.");
      } else {
        alert("복사에 실패했습니다. 직접 입력해주세요.");
      }
    } catch (err) {
      alert("복사 기능을 지원하지 않는 브라우저입니다.");
    }
  };

  const Item = ({ title, isOpen, onToggle, list }) => (
    <div style={{ maxWidth: '400px', margin: '0 auto 10px' }}>
      <button 
        onClick={onToggle} 
        style={{ 
          width: '100%', 
          padding: '18px', 
          border: '1px solid #eee', 
          backgroundColor: '#fff', 
          borderRadius: '8px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          fontSize: '1rem',
          color: '#444'
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: '0.8rem', color: '#888' }}>{isOpen ? '▲ 접기' : '▼ 펼치기'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            style={{ overflow: 'hidden' }}
          >
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f9f9f9', 
              border: '1px solid #eee', 
              borderTop: 'none', 
              borderRadius: '0 0 8px 8px' 
            }}>
              {list.map((acc, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: i === list.length - 1 ? 0 : '15px',
                  fontSize: '0.95rem',
                  borderBottom: i === list.length - 1 ? 'none' : '1px solid #eee',
                  paddingBottom: i === list.length - 1 ? 0 : '15px'
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '4px' }}>
                      {acc.bank} <b style={{ color: '#333' }}>{acc.number}</b>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>
                      예금주: {acc.name}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleCopy(acc.number)} 
                    style={{ 
                      padding: '6px 12px', 
                      backgroundColor: '#fff', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: '#555',
                      marginLeft: '10px'
                    }}
                  >
                    복사
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#fafafa', textAlign: 'center' }}>
      <div style={{ marginBottom: '30px' }}>

        <h2 style={{ fontSize: '1.1rem', fontFamily: '"Gowun Dodum", serif' }}>
          마음 전하실 곳
        </h2>
        <p style={{
  fontSize: '0.9rem',
  color: '#888',
  lineHeight: '1.7',
  marginTop: '15px'
}}>
  참석이 어려우신 분들을 위해 기재했습니다.<br />
  너그러운 마음으로 양해 부탁드립니다.
</p>
      </div>
      <Item title="신랑측 계좌번호" isOpen={open.groom} onToggle={() => toggle('groom')} list={data.groom} />
      <Item title="신부측 계좌번호" isOpen={open.bride} onToggle={() => toggle('bride')} list={data.bride} />
    </div>
  );
}