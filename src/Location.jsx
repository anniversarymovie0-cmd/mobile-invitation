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
  const hasDetail = addressLines && addressLines.length > 1;
  const destinationName = name.replace(/,/g, ' ');

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
{hasDetail ? (
  <>
    {/* 홀/층 */}
    <p style={{
      fontSize: '0.95rem',
      color: '#111',
      marginBottom: '4px',
      fontWeight: 'bold'
    }}>
      {addressLines[0]}
    </p>

    {/* 주소 */}
    <p style={{
      fontSize: '0.9rem',
      color: '#555',
      marginTop: '8px',
      whiteSpace: 'pre-line'
    }}>
      {addressLines.slice(1).join('\n')}
    </p>
  </>
) : (
  /* 주소만 있을 때 */
  <p style={{
    fontSize: '0.9rem',
    color: '#555',
    marginTop: '8px',
    whiteSpace: 'pre-line'
  }}>
    {address}
  </p>
)}
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

  {transport && (() => {
    const entries = Object.entries(transport).filter(([_, v]) => v);

    return entries.map(([key, value], index) => {

      const titleMap = {
        car: '자가용',
        publicTransport: '대중교통',
        subway: '지하철',
        bus: '버스',
        train: '기차',
        expressbus: '고속버스',
        ktx: 'KTX',
        ktxsrt: 'KTX・SRT',
        parking: '주차',
        shuttle: '셔틀버스',
        taxi : '택시'
      };

      return (
        <div
          key={key}
          style={{
            marginBottom: index === entries.length - 1 ? '40px' : '20px'
          }}
        >
          <div style={{
            fontWeight: '600',
            letterSpacing: '0.3px',
            color: '#111',
            marginBottom: '6px',
            fontSize: '1.05rem'
          }}>
            {titleMap[key] || key}
          </div>

          <div style={{
            color: '#555',
            whiteSpace: 'pre-wrap',
            fontSize: '0.9rem'
          }}>
            {value}
          </div>
        </div>
      );
    });
  })()}

</div>
      {/* 길찾기 버튼 */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={() =>
            (window.location.href = `nmap://route/car?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(destinationName)}&appname=wedding`)
          }
          style={btnStyle}
        >
          <img src="/images/naver_logo.png" alt="" style={{ width: '18px' }} />
          <span style={{ marginLeft: '6px' }}>네이버 지도</span>
        </button>

        <button
          onClick={() => {


  const appUrl = `kakaomap://route?ep=${lat},${lng}&epName=${encodeURIComponent(destinationName)}&by=CAR`;
  const webUrl = `https://map.kakao.com/link/to/${encodeURIComponent(destinationName)},${lat},${lng}`;

  // 앱 실행
  window.location.href = appUrl;

  // fallback
  setTimeout(() => {
    window.location.href = webUrl;
  }, 700);
}}
          style={btnStyle}
        >
          <img src="/images/kakao_logo.png" alt="" style={{ width: '18px' }} />
          <span style={{ marginLeft: '6px' }}>카카오맵</span>
        </button>

        <button
          onClick={() =>
            (window.location.href = `tmap://route?rGoName=${encodeURIComponent(destinationName)}&rGoX=${lng}&rGoY=${lat}`)
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