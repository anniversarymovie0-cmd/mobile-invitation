import React from 'react';

export default function Share({ data }) {

  // ✅ 공유용 URL 생성 (핵심)
 const getShareUrl = () => {
  const { origin, pathname } = window.location;
  const parts = pathname.split("/");
  const id = parts[2];

  if (!id) return window.location.href;

  return `${origin}/w/${id}`;
};


  // 링크 복사
  const handleCopy = () => {
    const url = getShareUrl();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(() => alert("청첩장 주소가 복사되었습니다.\n카카오톡에 붙여넣기 하세요!"))
        .catch(() => legacyCopy(url));
    } else {
      legacyCopy(url);
    }
  };

  // 옛날 복사 방식
  const legacyCopy = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        alert("청첩장 주소가 복사되었습니다.\n카카오톡에 붙여넣기 하세요!");
      } else {
        alert("복사에 실패했습니다. 브라우저 주소창을 길게 눌러 복사해주세요.");
      }
    } catch (err) {
      alert("이 브라우저는 복사 기능을 지원하지 않습니다.");
    }
  };

  // ⭐ 카카오 공유
  const handleKakaoShare = () => {
    const shareUrl = getShareUrl();
    console.log("kakaoThumbnail:", data?.intro?.kakaoThumbnail);

    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      alert("카카오 SDK 초기화가 필요합니다.");
      return;
    }

    const title = data?.intro?.title || "모바일 청첩장";
    const description = data?.intro?.date || "";

    const imageUrl =
  window.location.origin +
  data.intro.kakaoThumbnail +
  "?v=" + Date.now();

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "청첩장 보러가기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#fff', paddingBottom: '40px' }}>

      {/* 링크 복사 버튼 */}
      <button
        onClick={handleCopy}
        style={{
          backgroundColor: '#f5f5f5',
          color: '#000',
          border: '1px solid #eee',
          padding: '12px 40px',
          borderRadius: '0',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          margin: '0 auto',
          width: 'calc(100% - 40px)',
          boxShadow: 'none'
        }}
      >
        공유하기 (링크 복사)
      </button>

      {/* 카카오 공유 버튼 */}
      <button
        onClick={handleKakaoShare}
        style={{
          backgroundColor: '#f5f5f5',
          color: '#000',
          border: '1px solid #eee',
          padding: '12px 40px',
          borderRadius: '0',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          margin: '12px auto 0',
          width: 'calc(100% - 40px)',
          boxShadow: 'none'
        }}
      >
        카카오톡 공유하기
      </button>

    </div>
  );
}