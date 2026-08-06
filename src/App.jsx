import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import WeddingPage from './WeddingPage';

function setViewportContent(content) {
  let viewport = document.querySelector('meta[name="viewport"]');

  if (!viewport) {
    viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    document.head.appendChild(viewport);
  }

  viewport.setAttribute('content', content);
}

function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: window.innerWidth > 768 ? 'center' : 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: '20px',
        paddingTop: window.innerWidth > 768 ? '0px' : '20px',
      }}
    >
      <img
        src="/images/logo.png"
        alt="logo"
        style={{
          width: '130px',
          marginBottom: '20px',
        }}
      />

      <img
        src="/images/brand_main.jpg"
        alt="대표 이미지"
        style={{
          width: '100%',
          maxWidth: '320px',
          borderRadius: '6px',
          marginBottom: '20px',
        }}
      />

      <p
        style={{
          fontSize: '13px',
          color: '#666',
          lineHeight: '1.6',
          marginBottom: '25px',
          textAlign: 'center',
        }}
      >
        영화처럼, 기억될 순간을 디자인합니다.
      </p>

      {[
        {
          text: '스마트스토어',
          link: 'https://mkt.shopping.naver.com/link/68b04396183bf64a8345aef3',
        },
        {
          text: '인스타그램',
          link: 'https://instagram.com/anniversary.movie',
        },
        {
          text: '카톡 문의하기',
          link: 'http://pf.kakao.com/_XySxoG',
        },
      ].map((btn, idx) => (
        <a
          key={idx}
          href={btn.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <button
            style={{
              width: '200px',
              padding: '12px 0',
              backgroundColor: '#eaeaea',
              color: '#333',
              border: 'none',
              marginBottom: '10px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {btn.text}
          </button>
        </a>
      ))}
    </div>
  );
}

function PageLoader() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isAdmin = window.location.search.includes('admin=true');

  useEffect(() => {
    if (!id) return;

    fetch(`https://anniversarymovie.kr/api/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API 요청 실패: ${res.status}`);
        }

        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.error(err);

        // API 오류 시 준비 중 화면으로 처리
        setData({
          status: 'preparing',
        });
      });
  }, [id]);

  // 확대 제어: 기본은 차단, false인 경우에만 허용
  useLayoutEffect(() => {
    if (!data) return;

    const shouldDisableZoom = data.settings?.disableZoom !== false;

    if (shouldDisableZoom) {
      setViewportContent(
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
      );
    } else {
      setViewportContent('width=device-width, initial-scale=1.0');
    }
  }, [data]);

  // Safari 및 모바일 브라우저 핀치 확대 방지
  useEffect(() => {
    if (!data) return;

    const shouldDisableZoom = data.settings?.disableZoom !== false;

    if (!shouldDisableZoom) return;

    const preventGesture = (event) => {
      event.preventDefault();
    };

    const preventMultiTouch = (event) => {
      if (event.touches && event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener('gesturestart', preventGesture, {
      passive: false,
    });

    document.addEventListener('gesturechange', preventGesture, {
      passive: false,
    });

    document.addEventListener('gestureend', preventGesture, {
      passive: false,
    });

    document.addEventListener('touchmove', preventMultiTouch, {
      passive: false,
    });

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
      document.removeEventListener('touchmove', preventMultiTouch);
    };
  }, [data]);

  if (!id) {
    return <div>잘못된 접근입니다.</div>;
  }

  if (!data) return null;

  // 삭제 완료 고객: 만료 안내
  if (data.status === 'expired') {
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#fff',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <p
          style={{
            fontSize: '18px',
            color: '#333',
            marginBottom: '12px',
          }}
        >
          유효기간이 만료된 모바일 청첩장입니다.
        </p>

        <p
          style={{
            fontSize: '14px',
            color: '#888',
            lineHeight: '1.7',
            margin: 0,
          }}
        >
          해당 페이지는 삭제되었거나
          <br />
          더 이상 제공되지 않습니다.
        </p>
      </div>
    );
  }

  // QR 선발급 고객 또는 공개 전 고객: 준비 중 안내
  if (
    data.status === 'preparing' ||
    (!data.open && !isAdmin)
  ) {
    return (
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#fff',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <p
          style={{
            fontSize: '18px',
            color: '#333',
            marginBottom: '10px',
          }}
        >
          모바일 청첩장이 준비 중입니다
        </p>

        <p
          style={{
            fontSize: '14px',
            color: '#888',
            margin: 0,
          }}
        >
          곧 공개될 예정입니다
        </p>
      </div>
    );
  }

  return <WeddingPage data={data} />;
}

export default function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('da275dfc7963d4605867a43f0e945daf');
    }
  }, []);

  // 데이터가 불러와지기 전 기본 확대 차단
  useLayoutEffect(() => {
    setViewportContent(
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'
    );
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view/:id" element={<PageLoader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}