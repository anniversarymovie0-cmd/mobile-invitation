import React, { useState, useEffect } from 'react';
import MainVisual from './MainVisual';
import Greeting from './Greeting';
import Gallery from './Gallery';
import Calendar from './Calendar';
import Location from './Location';
import Accounts from './Accounts';
import Share from './Share';
import Information from './Information';
import MusicPlayer from './MusicPlayer';
import ContactModal from './ContactModal';
import Rsvp from "./Rsvp";
import VideoSection from './VideoSection';

export default function WeddingPage({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!data) return null;

  const {
    intro,
    parents,
    gallery,
    calendar,
    map,
    accounts,
    information,
    contacts,
    video
  } = data;
  

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      <MusicPlayer
  bgm={data.bgm}
  bgmAutoPlay={data.bgmAutoPlay} // 🔥 이거 추가
  isVideoPlaying={isVideoPlaying}
/>

      <MainVisual data={intro} />

      {/* 🔥 영상 (메인 이후) */}
      {video?.enabled && video?.position === 'afterMain' && (
        <VideoSection data={video} setIsVideoPlaying={setIsVideoPlaying} />
      )}

      <div className="fade-up">
        <Greeting intro={intro} parents={parents} />
      </div>

      {/* 🔥 영상 (인사말 이후) */}
      {video?.enabled && video?.position === 'afterGreeting' && (
        <VideoSection data={video} setIsVideoPlaying={setIsVideoPlaying} />
      )}

      {/* 축하 연락하기 */}
{contacts?.enabled && (
  <div className="fade-up" style={{
    marginTop: '-30px',
    marginBottom: '70px',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px'
  }}>
    <button
      onClick={() => setIsModalOpen(true)}
      style={{
        width: '100%',
        maxWidth: '240px',
        padding: '12px 0',
        backgroundColor: '#f2f2f2',
        border: 'none',
        fontSize: '15px',
        color: '#333',
        cursor: 'pointer'
      }}
    >
      축하 연락하기
    </button>
  </div>
)}

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={contacts}
      />

    <div className="fade-up">
  <Calendar date={calendar?.date} />
</div>

{/* 🔥 영상 (캘린더 이후) */}
{video?.enabled && video?.position === 'afterCalendar' && (
  <VideoSection
    data={video}
    setIsVideoPlaying={setIsVideoPlaying}
  />
)}

{/* Location (Calendar 뒤) */}
{map?.position === 'afterCalendar' && (
  <div className="fade-up">
    <Location data={map} />
  </div>
)}

<div className="fade-up">
  <Gallery images={gallery} />
</div>

{/* 🔥 영상 (갤러리 이후) */}
{video?.enabled && video?.position === 'afterGallery' && (
  <VideoSection
    data={video}
    setIsVideoPlaying={setIsVideoPlaying}
  />
)}

{/* Location (Gallery 뒤) */}
{map?.position === 'afterGallery' && (
  <div className="fade-up">
    <Location data={map} />
  </div>
)}

{/* 기본 위치 (position이 없으면 기존 위치 유지) */}
{!map?.position && (
  <div className="fade-up">
    <Location data={map} />
  </div>
)}
      <div className="fade-up">
        <Information data={information} />
      </div>

      {/* Location (Information 뒤) */}
{map?.position === 'afterInformation' && (
  <div className="fade-up">
    <Location data={map} />
  </div>
)}

      <div className="fade-up">
        <Accounts data={accounts} />
      </div>
      {/* Location (Accounts 뒤) */}
{map?.position === 'afterAccounts' && (
  <div className="fade-up">
    <Location data={map} />
  </div>
)}

      {/* RSVP */}
      {data?.rsvp && (
        <div style={{ width: '100%' }}>
          <Rsvp data={data.rsvp} />
        </div>
      )}
      {/* Location (RSVP 뒤) */}
{map?.position === 'afterRsvp' && (
  <div className="fade-up">
    <Location data={map} />
  </div>
)}

      <div className="fade-up">
        <Share data={data} />
      </div>

      {/* 🔥 하단 로고 */}
      <div style={{
        padding: '25px 0',
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <img
          src="/images/logo.png"
          alt="anniversary movie"
          style={{
            width: '100px',
            margin: '0 auto 10px',
            display: 'block',
            opacity: 0.5
          }}
        />
        <div style={{
          fontSize: '11px',
          color: '#aaa',
        }}>
          © Anniversary Movie. All rights reserved.
        </div>
      </div>

    </div>
  );
}