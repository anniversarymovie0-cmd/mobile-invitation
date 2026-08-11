import React, { useEffect } from 'react';

export default function Location({ data }) {
  const {
    name = '',
    address = '',
    lat,
    lng,
    transport
  } = data || {};

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
    if (!data || lat == null || lng == null) return;

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
  }, [data, lat, lng]);

  if (!data) return null;

  const addressLines = address ? address.split('\n') : [];
  const hasDetail = addressLines.length > 1;

  const destinationName = name.replace(/,/g, ' ');

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
    taxi: '택시'
  };

  /*
    신규 자유 입력 방식 확인

    transport.custom 배열이 존재하고,
    내용이 한 개 이상 있으면 자유 입력 방식으로 표시합니다.
  */
  const customTransport = Array.isArray(transport?.custom)
    ? transport.custom.filter(
        (item) => item && (item.title || item.description)
      )
    : [];

  const hasCustomTransport = customTransport.length > 0;

  /*
    기존 입력 방식

    custom은 제외하고,
    값이 존재하는 교통 안내만 표시합니다.
  */
  const legacyTransportEntries =
    transport && !hasCustomTransport
      ? Object.entries(transport).filter(
          ([key, value]) =>
            key !== 'custom' &&
            typeof value === 'string' &&
            value.trim() !== ''
        )
      : [];

  return (
    <div
      style={{
        padding: '60px 20px',
        backgroundColor: '#fff'
      }}
    >
      <h2
        className="english-title"
        style={{
          marginBottom: '30px',
          textAlign: 'center'
        }}
      >
        LOCATION
      </h2>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '25px'
        }}
      >
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '8px',
            whiteSpace: 'pre-line'
          }}
        >
          {name}
        </h3>

        {hasDetail ? (
          <>
            {/* 홀/층 */}
            <p
              style={{
                fontSize: '0.95rem',
                color: '#111',
                marginBottom: '4px',
                fontWeight: 'bold'
              }}
            >
              {addressLines[0]}
            </p>

            {/* 주소 */}
            <p
              style={{
                fontSize: '0.9rem',
                color: '#555',
                marginTop: '8px',
                whiteSpace: 'pre-line'
              }}
            >
              {addressLines.slice(1).join('\n')}
            </p>
          </>
        ) : (
          /* 주소만 있을 때 */
          <p
            style={{
              fontSize: '0.9rem',
              color: '#555',
              marginTop: '8px',
              whiteSpace: 'pre-line'
            }}
          >
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
        <div
          id="kakao-map"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      {/* 교통 안내 */}
      {(hasCustomTransport || legacyTransportEntries.length > 0) && (
        <div
          style={{
            marginBottom: '30px',
            textAlign: 'left',
            paddingLeft: '10px'
          }}
        >
          {/* 신규 자유 입력 방식 */}
          {hasCustomTransport &&
            customTransport.map((item, index) => (
              <div
                key={`${item.title || 'transport'}-${index}`}
                style={{
                  marginBottom:
                    index === customTransport.length - 1
                      ? '40px'
                      : '20px'
                }}
              >
                {item.title && (
                  <div
                    style={{
                      fontWeight: '600',
                      letterSpacing: '0.3px',
                      color: '#111',
                      marginBottom: '6px',
                      fontSize: '1.05rem',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {item.title}
                  </div>
                )}

                {item.description && (
                  <div
                    style={{
                      color: '#555',
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.9rem'
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            ))}

          {/* 기존 입력 방식 */}
          {!hasCustomTransport &&
            legacyTransportEntries.map(([key, value], index) => (
              <div
                key={key}
                style={{
                  marginBottom:
                    index === legacyTransportEntries.length - 1
                      ? '40px'
                      : '20px'
                }}
              >
                <div
                  style={{
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    color: '#111',
                    marginBottom: '6px',
                    fontSize: '1.05rem'
                  }}
                >
                  {titleMap[key] || key}
                </div>

                <div
                  style={{
                    color: '#555',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.9rem'
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 길찾기 버튼 */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center'
        }}
      >
        {/* 네이버 지도 */}
        <button
          onClick={() => {
            const appUrl =
              `nmap://route/car?dlat=${lat}` +
              `&dlng=${lng}` +
              `&dname=${encodeURIComponent(destinationName)}` +
              `&appname=wedding`;

            const webUrl =
              `https://map.naver.com/v5/directions/-/` +
              `${lng},${lat},${encodeURIComponent(destinationName)},PLACE_POI/-/car`;

            window.location.href = appUrl;

            setTimeout(() => {
              window.location.href = webUrl;
            }, 700);
          }}
          style={btnStyle}
        >
          <img
            src="/images/naver_logo.png"
            alt=""
            style={{ width: '18px' }}
          />

          <span style={{ marginLeft: '6px' }}>
            네이버 지도
          </span>
        </button>

        {/* 카카오맵 */}
        <button
          onClick={() => {
            const appUrl =
              `kakaomap://route?ep=${lat},${lng}` +
              `&epName=${encodeURIComponent(destinationName)}` +
              `&by=CAR`;

            const webUrl =
              `https://map.kakao.com/link/to/` +
              `${encodeURIComponent(destinationName)},${lat},${lng}`;

            window.location.href = appUrl;

            setTimeout(() => {
              window.location.href = webUrl;
            }, 700);
          }}
          style={btnStyle}
        >
          <img
            src="/images/kakao_logo.png"
            alt=""
            style={{ width: '18px' }}
          />

          <span style={{ marginLeft: '6px' }}>
            카카오맵
          </span>
        </button>

        {/* T맵 */}
        <button
          onClick={() => {
            const isMobile =
              /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isMobile) {
              window.location.href =
                `tmap://route?` +
                `rGoName=${encodeURIComponent(destinationName)}` +
                `&rGoX=${lng}` +
                `&rGoY=${lat}`;
            } else {
              window.open(
                'https://www.tmap.co.kr/',
                '_blank',
                'noopener,noreferrer'
              );
            }
          }}
          style={btnStyle}
        >
          <img
            src="/images/tmap_logo.png"
            alt=""
            style={{ width: '18px' }}
          />

          <span style={{ marginLeft: '6px' }}>
            T맵
          </span>
        </button>
      </div>
    </div>
  );
}