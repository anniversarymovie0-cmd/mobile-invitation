const functions = require("firebase-functions");
const express = require("express");
const database = require("./wedding-data.json");

const app = express();

// wedding-data.json의 삭제 완료 고객 ID 목록
const expiredIds = Array.isArray(database.expiredIds)
  ? database.expiredIds
  : [];

/**
 * 모바일 청첩장 데이터 API
 *
 * 1. expiredIds에 포함된 ID → 유효기간 만료
 * 2. 데이터가 없는 ID → QR 선발급 고객으로 보고 준비 중
 * 3. 데이터가 있는 ID → 기존 고객 데이터 반환
 */
app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  const data = database[id];

  // 삭제 완료 고객
  if (expiredIds.includes(id)) {
    res.status(200).json({
      status: "expired"
    });
    return;
  }

  // 아직 wedding-data.json에 추가되지 않은 QR 선발급 고객
  if (!data) {
    res.status(200).json({
      status: "preparing"
    });
    return;
  }

  // 정상 고객 데이터
  res.status(200).json(data);
});

/**
 * 카카오톡 등 공유용 OG 페이지
 */
app.get("/w/:id", (req, res) => {
  const id = req.params.id;
  const data = database[id];
  const url = `https://anniversarymovie.kr/view/${id}`;

  // version: 1.0.4

  /*
   * 삭제 고객 또는 QR만 선발급된 고객은
   * OG 정보를 만들 수 없으므로 실제 청첩장 주소로 이동시킴
   */
  if (expiredIds.includes(id) || !data) {
    res.redirect(302, url);
    return;
  }

  const title = data.intro?.title || "모바일 청첩장";
  const description = data.intro?.date || "";
  const thumbnail = data.intro?.thumbnail || "";

  const image = thumbnail.startsWith("http")
    ? thumbnail
    : `https://anniversarymovie.kr${thumbnail}`;

  const html = `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="utf-8" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:url" content="${url}" />
      <meta property="og:type" content="website" />
    </head>

    <body>
      <script>
        setTimeout(() => {
          window.location.href = "${url}";
        }, 100);
      </script>
    </body>
  </html>
  `;

  res.status(200).send(html);
});

exports.invitation = functions.https.onRequest(app);