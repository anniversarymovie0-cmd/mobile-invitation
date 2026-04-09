import { useState } from "react";

const scriptUrl =
  "https://script.google.com/macros/s/AKfycbw7BGiCeiWR3wQrrW16rfVZQflKrEcYiOG7MSXpM8AYRdlLoKEinhJa2Wfx8mqGUJv0/exec";

async function submitRsvp(data) {
  const params = new URLSearchParams();

  params.append("sheetId", data.sheetId);
  params.append("side", data.side);
  params.append("name", data.name);
  params.append("attend", data.attend);
  params.append("meal", data.meal);
  params.append("count", String(data.count));
  params.append("phone", data.phone);

  const res = await fetch(scriptUrl, {
    method: "POST",
    body: params,
  });

  return res.text();
}

export default function Rsvp({ data }) {
  if (!data?.enabled) return null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [side, setSide] = useState("");
  const [attend, setAttend] = useState("");
  const [meal, setMeal] = useState("");
  const [count, setCount] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (loading) return;

    if (!data?.sheetId) return alert("RSVP 시트 정보 없음");
    if (!side) return alert("구분 선택");
    if (!attend) return alert("참석 여부 선택");
    if (!meal) return alert("식사 여부 선택");
    if (!name.trim()) return alert("성함 입력");
    if (!count.trim()) return alert("인원 입력");
    if (!phone.trim()) return alert("연락처 입력");
    if (!agree) return alert("개인정보 동의 필요");

    setLoading(true);

    // 팝업은 바로 띄우지 말고, 아주 짧은 딜레이 후 띄워서 체감 지연 줄이기
    // 단, 중복 여부는 서버가 최종 판단
    submitRsvp({
      sheetId: data.sheetId,
      side,
      name,
      attend,
      meal,
      count,
      phone,
    })
      .then((res) => {
        if (res.includes("duplicate")) {
          alert("이미 제출된 연락처입니다.");
          return;
        }

        if (res.includes("success")) {
          alert("참석 의사가 전달되었습니다 💌");

          setSide("");
          setAttend("");
          setMeal("");
          setName("");
          setCount("");
          setPhone("");
          setAgree(false);
          return;
        }

        alert("제출 실패");
      })
      .catch(() => {
        alert("전송 중 오류가 발생했습니다");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={container}>
      <p className="english-title" style={{ marginBottom: "10px" }}>
        RSVP
      </p>

      <p style={desc}>
        결혼식 참석 여부를 알려주세요
      </p>

      <div style={block}>
        <label style={label}>구분</label>
        <div style={row}>
          <button type="button" style={btn(side === "신랑측")} onClick={() => setSide("신랑측")}>신랑측</button>
          <button type="button" style={btn(side === "신부측")} onClick={() => setSide("신부측")}>신부측</button>
        </div>
      </div>

      <div style={block}>
        <label style={label}>참석 여부</label>
        <div style={row}>
          <button type="button" style={btn(attend === "참석")} onClick={() => setAttend("참석")}>참석</button>
          <button type="button" style={btn(attend === "미참석")} onClick={() => setAttend("미참석")}>미참석</button>
        </div>
      </div>

      <div style={block}>
        <label style={label}>식사 여부</label>
        <div style={row}>
          <button type="button" style={btn(meal === "식사 가능")} onClick={() => setMeal("식사 가능")}>식사 가능</button>
          <button type="button" style={btn(meal === "식사 불가")} onClick={() => setMeal("식사 불가")}>식사 불가</button>
        </div>
      </div>

      <div style={row}>
        <div style={{ flex: 1 }}>
          <label style={label}>성함</label>
          <input
            style={input}
            placeholder="김무비"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={label}>인원</label>
          <input
            type="number"
            style={input}
            placeholder="1"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
      </div>

      <div style={block}>
        <label style={label}>연락처</label>
        <input
          style={inputFull}
          placeholder="010-1234-5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div style={agreeWrap}>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <div>
          <div style={agreeTitle}>개인정보 수집 및 이용 동의</div>
          <div style={agreeDesc}>
            참석여부 전달을 위한 개인정보 수집 및 이용에 동의해 주세요.
          </div>
        </div>
      </div>

      <button type="button" style={submitBtn} onClick={handleSubmit} disabled={loading}>
        {loading ? "전송 중..." : "제출"}
      </button>
    </div>
  );
}

/* ===== 스타일 ===== */

const container = {
  maxWidth: "420px",
  margin: "0 auto",
  padding: "60px 20px",
  backgroundColor: "#ffffff"
};

const desc = {
  textAlign: "center",
  fontSize: "14px",
  color: "#777",
  marginBottom: "30px",
  lineHeight: "1.8"
};

const block = {
  marginBottom: "18px"
};

const label = {
  fontSize: "13px",
  color: "#777",
  marginBottom: "6px",
  display: "block"
};

const row = {
  display: "flex",
  gap: "10px",
  marginBottom: "18px"
};

const btn = (active) => ({
  flex: 1,
  height: "40px",
  border: "1px solid #e5e5e5",
  backgroundColor: active ? "#333" : "#efefef",
  color: active ? "#fff" : "#777",
  fontSize: "14px",
  cursor: "pointer"
});

const input = {
  width: "100%",
  height: "40px",
  border: "1px solid #e5e5e5",
  backgroundColor: "#efefef",
  padding: "0 10px",
  fontSize: "14px"
};

const inputFull = {
  ...input
};

const agreeWrap = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
  marginBottom: "25px",
  fontSize: "12px",
  color: "#777"
};

const agreeTitle = {
  fontSize: "12px"
};

const agreeDesc = {
  fontSize: "12px",
  color: "#999"
};

const submitBtn = {
  display: "block",
  width: "100%",
  maxWidth: "120px",
  margin: "30px auto 0",
  backgroundColor: "#e5e5e5",
  border: "none",
  padding: "10px 0",
  fontSize: "14px",
  cursor: "pointer",
  color: "#333",
  WebkitAppearance: "none",
  appearance: "none"
};