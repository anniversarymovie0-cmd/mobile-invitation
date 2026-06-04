import React from 'react';

const ContactModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data || !data.enabled) return null;

  // [수정] 색이 꽉 채워진 전화 아이콘
  const PhoneIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#adacac">
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
    </svg>
  );

  // [수정] 색이 꽉 채워진 메시지 아이콘
  const MessageIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#adacac">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  const ContactRow = ({ title, person }) => (
    <div style={{ marginBottom: '18px', textAlign: 'center' }}>
      <p style={{ margin: '5px 0', fontSize: '13px', color: '#888' }}>
        {title} <span style={{ color: '#333', marginLeft: '2px' }}>{person.name}</span>
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '8px' }}>
        <a href={`tel:${person.phone}`} style={{ display: 'flex', alignItems: 'center' }}>
          <PhoneIcon />
        </a>
        <a href={`sms:${person.phone}`} style={{ display: 'flex', alignItems: 'center' }}>
          <MessageIcon />
        </a>
      </div>
    </div>
  );

  const groomContacts = data.groom || [];
  const brideContacts = data.bride || [];

  const hasGroom = groomContacts.length > 0;
  const hasBride = brideContacts.length > 0;
  const onlyOneSide = hasGroom !== hasBride;

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
      justifyContent: 'center', zIndex: 9999 
    }} onClick={onClose}>
      <div style={{ 
        backgroundColor: '#fff', padding: '25px 20px', borderRadius: '0px', 
        width: '85%', maxWidth: '350px' 
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#333' }}>축하 연락하기</span>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', color: '#adacac' }}>✕</button>
        </div>
        
       <div style={{ 
  display: 'flex',
  justifyContent: 'center'
}}>
  {/* 신랑측 */}
  {hasGroom && (
    <div style={{ 
      flex: onlyOneSide ? '0 1 180px' : 1,
      borderRight: hasBride ? '1px solid #f5f5f5' : 'none'
    }}>
      <h4 style={{ color: '#333', fontSize: '14px', textAlign: 'center', marginBottom: '15px', fontWeight: '600' }}>신랑측</h4>
      {groomContacts.map((person, i) => (
        <ContactRow key={i} title={person.relation} person={person} />
      ))}
    </div>
  )}
  
  {/* 신부측 */}
  {hasBride && (
    <div style={{ 
      flex: onlyOneSide ? '0 1 180px' : 1
    }}>
      <h4 style={{ color: '#333', fontSize: '14px', textAlign: 'center', marginBottom: '15px', fontWeight: '600' }}>신부측</h4>
      {brideContacts.map((person, i) => (
        <ContactRow key={i} title={person.relation} person={person} />
      ))}
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default ContactModal;