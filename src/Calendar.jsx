import React from 'react';
import { motion } from 'framer-motion';

export default function Calendar({ date }) {
  
  // ✅ 지원 형식
  // "2026-10-17"
  // "2026-10-17T"
  // "2026-10-17T12:30:00+09:00"
  // "2026-10-17T12:30:00"

  if (!date || typeof date !== 'string') return null;

  // =========================================================
  // ✅ 날짜/시간을 Date 객체의 시간대 변환 없이 직접 읽기
  // =========================================================

  const dateMatch = date.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{1,2}):(\d{2}))?/
  );

  if (!dateMatch) return null;

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]) - 1;
  const weddingDay = Number(dateMatch[3]);

  // 시간이 실제 입력되어 있는지 확인
  const hasTime =
    dateMatch[4] !== undefined &&
    dateMatch[5] !== undefined;

  const hour = hasTime ? Number(dateMatch[4]) : 0;
  const minute = hasTime ? Number(dateMatch[5]) : 0;

  // =========================================================
  // ✅ 오전/오후 및 12시간제
  // =========================================================

  const ampm = hour >= 12 ? '오후' : '오전';

  const displayHour =
    hour % 12
      ? hour % 12
      : 12;

  // =========================================================
  // ✅ 요일 계산
  // 입력된 날짜 자체를 기준으로 계산
  // 해외 접속자의 시간대 영향 없음
  // =========================================================

  const weddingDateForCalendar = new Date(
    year,
    month,
    weddingDay
  );

  const weddingDayOfWeek =
    weddingDateForCalendar.getDay();

  const weekNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일'
  ];

  // =========================================================
  // ✅ D-Day
  // 한국 날짜 기준으로 계산
  // 해외에서 접속해도 동일하게 표시
  // =========================================================

  const koreaDateParts = new Intl.DateTimeFormat(
    'en-CA',
    {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }
  )
    .formatToParts(new Date())
    .reduce((acc, part) => {
      if (part.type !== 'literal') {
        acc[part.type] = Number(part.value);
      }
      return acc;
    }, {});

  const todayUTC = Date.UTC(
    koreaDateParts.year,
    koreaDateParts.month - 1,
    koreaDateParts.day
  );

  const weddingUTC = Date.UTC(
    year,
    month,
    weddingDay
  );

  const diff = weddingUTC - todayUTC;

  const dDay = Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  );

  // =========================================================
  // ✅ 월 표기
  // =========================================================

  const monthNames = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.'
  ];

  // =========================================================
  // ✅ 달력 생성
  // =========================================================

  const firstDayOfMonth = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div
      style={{
        padding: '70px 20px',
        backgroundColor: '#f6f6f6',
        textAlign: 'center'
      }}
    >
      <h2
        className="english-title"
        style={{
          marginBottom: '30px',
          color: '#333',
          fontSize: '0.8rem'
        }}
      >
        WEDDING DAY
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p
          style={{
            fontSize: '0.95rem',
            letterSpacing: '1px',
            color: '#555',
            marginBottom: '30px',
            fontWeight: 'bold'
          }}
        >
          {year}년 {month + 1}월 {weddingDay}일{' '}
          {weekNames[weddingDayOfWeek]}

          {hasTime && (
            <>
              {' '}
              {ampm} {displayHour}시
              {minute === 0 ? '' : ` ${minute}분`}
            </>
          )}
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
        }}
      >
        {monthNames[month]}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '15px 0px',
          maxWidth: '280px',
          margin: '0 auto',
          fontSize: '0.9rem',
          color: '#444'
        }}
      >
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
          (day, i) => (
            <div
              key={i}
              style={{
                color:
                  i === 0
                    ? '#ff6b6b'
                    : '#444',
                fontWeight: 'bold',
                fontSize: '0.8rem'
              }}
            >
              {day}
            </div>
          )
        )}

        {calendarDays.map((day, index) => {
          const isWeddingDay =
            day === weddingDay;

          return (
            <div
              key={index}
              style={{
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {day && (
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    lineHeight: '30px',
                    borderRadius: '50%',
                    backgroundColor:
                      isWeddingDay
                        ? '#999999'
                        : 'transparent',
                    color:
                      isWeddingDay
                        ? 'white'
                        : '#333',
                    fontWeight:
                      isWeddingDay
                        ? 'bold'
                        : 'normal',
                    boxShadow:
                      isWeddingDay
                        ? '0 2px 5px rgba(131, 131, 131, 0.4)'
                        : 'none'
                  }}
                >
                  {day}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '30px',
          paddingTop: '30px',
          borderTop: '1px solid #eee'
        }}
      >
        <p
          style={{
            fontSize: '0.9rem',
            color: '#555'
          }}
        >
          결혼식이{' '}
          <span
            style={{
              color: '#464646',
              fontWeight: 'bold'
            }}
          >
            {dDay > 0 ? dDay : 0}
          </span>
          일 남았습니다.
        </p>
      </div>
    </div>
  );
}