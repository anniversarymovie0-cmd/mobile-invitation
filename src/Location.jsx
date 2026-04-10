import React, { useEffect } from 'react';

export default function Location({ data }) {
  if (!data) return null;

  const { name, address, lat, lng, transport } = data;

  const btnStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    fontSize: '0.85rem',
    backgroundColor: '#f8f8f8',
    border: '1px solid #eee',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#333',
    textDecoration: 'none'
  };

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com/v2/maps/sdk.js"]'
    );

    const loadMap = () => {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        const container = document.getElementById('kakao-map');
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3
        };

        const mapInstance = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng)
        });

        marker.setMap(mapInstance);
      });
    };

    if (existingScript) {
      loadMap();
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=da275dfc7963d4605867a43f0e945daf&autoload=false';
    script.async = true;
    script.onload = loadMap;
    document.head.appendChild(script);
  }, [lat, lng]);

  const addressLines = address?.split('\n');

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
      <h2
        className="english-title"
        style={{ marginBottom: '30px', textAlign: 'center' }}
      >
        LOCATION
      </h2>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3
          style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}
        >
          {name}
        </h3>
       {/* 층/홀 (강조) */}
<p style={{ fontSize: '0.95rem', color: '#111', marginBottom: '4px', fontWeight: 'bold' }}>
  {addressLines?.[0]}
</p>

{/* 주소 (여러 줄 대응) */}
<p style={{
  fontSize: '0.9rem',
  color: '#555',
  marginTop: '8px',
  whiteSpace: 'pre-line'
}}>
  {addressLines?.slice(1).join('\n')}
</p>
      </div>

      {/* 지도 영역 */}
      <div
        style={{
          width: '100%',
          height: '350px',
          marginBottom: '40px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #eee'
        }}
      >
        <div id="kakao-map" style={{ width: '100%', height: '100%' }} />
      </div>

     {/* 교통 안내 */}
<div style={{ marginBottom: '30px', textAlign: 'left', paddingLeft: '10px' }}>

  {transport?.car && (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontWeight: '600', letterSpacing: '0.3px', color: '#111', marginBottom: '6px', fontSize: '1.05rem' }}>
        자차
      </div>
      <div style={{ color: '#555', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
        {transport.car}
      </div>
    </div>
  )}

  {transport?.subway && (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontWeight: '600', letterSpacing: '0.3px', color: '#111', marginBottom: '6px', fontSize: '1.05rem' }}>
        지하철
      </div>
      <div style={{ color: '#555', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
        {transport.subway}
      </div>
    </div>
  )}

  {transport?.bus && (
    <div style={{ marginBottom: '20px' }}>
     <div style={{ fontWeight: '600', letterSpacing: '0.3px', color: '#111', marginBottom: '6px', fontSize: '1.05rem' }}>
        버스
      </div>
      <div style={{ color: '#555', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
        {transport.bus}
      </div>
    </div>
  )}

  {transport?.parking && (
    <div style={{ marginBottom: '20px' }}>
     <div style={{ fontWeight: '600', letterSpacing: '0.3px', color: '#111', marginBottom: '6px', fontSize: '1.05rem' }}>
        주차
      </div>
      <div style={{ color: '#555', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
        {transport.parking}
      </div>
    </div>
  )}

  {transport?.shuttle && (
    <div style={{ marginBottom: '40px' }}>
     <div style={{ fontWeight: '600', letterSpacing: '0.3px', color: '#111', marginBottom: '6px', fontSize: '1.05rem' }}>
        셔틀버스
      </div>
      <div style={{ color: '#555', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
        {transport.shuttle}
      </div>
    </div>
  )}

</div>

      {/* 길찾기 버튼 */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={() =>
            (window.location.href = `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(name)}&appname=wedding`)
          }
          style={btnStyle}
        >
          <img src="/images/naver_logo.png" alt="" style={{ width: '18px' }} />
          <span style={{ marginLeft: '6px' }}>네이버 지도</span>
        </button>

        <button
          onClick={() =>
            window.open(
              `https://map.kakao.com/link/to/${encodeURIComponent(name)},${lat},${lng}`,
              '_blank'
            )
          }
          style={btnStyle}
        >
          <img src="/images/kakao_logo.png" alt="" style={{ width: '18px' }} />
          <span style={{ marginLeft: '6px' }}>카카오맵</span>
        </button>

        <button
          onClick={() =>
            (window.location.href = `tmap://route?rGoName=${encodeURIComponent(name)}&rGoX=${lng}&rGoY=${lat}`)
          }
          style={btnStyle}
        >
          <img src="/images/tmap_logo.png" alt="" style={{ width: '18px' }} />
          <span style={{ marginLeft: '6px' }}>T맵</span>
        </button>
      </div>
    </div>
  );
}