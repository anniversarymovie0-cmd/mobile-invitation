import React from 'react';
import { motion } from 'framer-motion';

export default function Calendar({ date }) {
  const weddingDate = new Date(date);
  
  const today = new Date();
  const diff = weddingDate.getTime() - today.getTime();
  const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();

  const monthNames = [
  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
  'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
];
  
  // 1. 24시간제 시간 가져오기
  const hour = weddingDate.getHours();
  const minute = weddingDate.getMinutes();

  // 2. 오전/오후 및 12시간제 변환 로직
  const ampm = hour >= 12 ? '오후' : '오전';
  const displayHour = hour % 12 ? hour % 12 : 12; // 0시는 12시로, 13시는 1시로 변환
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const weeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

 return (
    <div style={{ padding: '70px 20px', backgroundColor: '#f6f6f6', textAlign: 'center' }}>
      <h2 
        className="english-title" 
        style={{ 
          marginBottom: '30px', 
          color: '#333', // INVITATION과 동일한 색상으로 맞춤
          fontSize: '0.8rem' // 크기 통일
        }}
      >
        WEDDING DAY
      </h2>
  

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <p style={{ fontSize: '0.95rem', letterSpacing: '1px', color: '#555', marginBottom: '30px', fontWeight: 'bold' }}>
         {year}년 {month + 1}월 {weddingDate.getDate()}일{' '}
{['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][weddingDate.getDay()]}{' '}
{ampm} {displayHour}시{minute === 0 ? '' : ` ${minute}분`}
        </p>
      </motion.div>

      <div 
      style={{ 
  marginBottom: '27px', 
  fontSize: '1.1rem', 
  color: '#000', 
  letterSpacing: '3px',
  fontFamily: "'Gowun Batang', serif",
  fontWeight: '500'
}}>
  {monthNames[month]}
</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px 0px', maxWidth: '280px', margin: '0 auto', fontSize: '0.9rem', color: '#444' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} style={{ color: i === 0 ? '#ff6b6b' : '#444', fontWeight: 'bold', fontSize: '0.8rem' }}>{day}</div>
        ))}
        {calendarDays.map((day, index) => {
          const isWeddingDay = day === weddingDate.getDate();
          return (
            <div key={index} style={{ height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {day && (
                <div style={{
                  width: '30px', height: '30px', lineHeight: '30px', borderRadius: '50%',
                  backgroundColor: isWeddingDay ? '#999999' : 'transparent',
                  color: isWeddingDay ? 'white' : '#333',
                  fontWeight: isWeddingDay ? 'bold' : 'normal',
                  boxShadow: isWeddingDay ? '0 2px 5px rgba(131, 131, 131, 0.4)' : 'none'
                }}>
                  {day}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>
          결혼식이 <span style={{ color: '#464646', fontWeight: 'bold' }}>{dDay > 0 ? dDay : 0}</span>일 남았습니다.
        </p>
      </div>
    </div>
  );
}