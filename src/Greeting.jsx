import React from 'react';
import { motion } from 'framer-motion';

export default function Greeting({ intro, parents }) {

  // ✅ 부모 이름 + 옵션 처리 함수
  // 기존 국화꽃 배열 방식 그대로 유지
  const renderParentName = (parent, isFirst = false) => {
    if (!parent) return '';

    const nameText =
      parent.symbol === 'go' ? `故 ${parent.name}` : parent.name;

    const isFlower = parent.symbol === 'flower';

    return (
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          lineHeight: '1.8',
          verticalAlign: 'middle'
        }}
      >
        {isFlower && (
          isFirst ? (
            <img
              src="/images/flower.png"
              alt="국화"
              style={{
                width: '11px',
                height: '11px',
                position: 'absolute',
                left: '-16px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'block'
              }}
            />
          ) : (
            <img
              src="/images/flower.png"
              alt="국화"
              style={{
                width: '11px',
                height: '11px',
                display: 'inline-block',
                marginRight: '3px',
                flexShrink: 0
              }}
            />
          )
        )}

        <span>{nameText}</span>
      </span>
    );
  };

  const groomFather = parents?.groom?.father;
  const groomMother = parents?.groom?.mother;

  const brideFather = parents?.bride?.father;
  const brideMother = parents?.bride?.mother;

  const hasGroomFather = Boolean(groomFather?.name);
  const hasGroomMother = Boolean(groomMother?.name);

  const hasBrideFather = Boolean(brideFather?.name);
  const hasBrideMother = Boolean(brideMother?.name);

  const hasGroomParents =
    hasGroomFather || hasGroomMother;

  const hasBrideParents =
    hasBrideFather || hasBrideMother;

  const hasBothGroomParents =
    hasGroomFather && hasGroomMother;

  const hasBothBrideParents =
    hasBrideFather && hasBrideMother;

  /*
   * ✅ 신랑·신부가 동일한 Grid 열을 공유
   *
   * 1열: 아버지
   * 2열: 가운데점
   * 3열: 어머니
   * 4열: 의
   * 5열: 관계
   * 6열: 신랑·신부 이름
   *
   * 한 분만 입력된 경우에는 1~3열을 하나로 합쳐
   * 부모님 성함을 '의' 바로 앞에 배치합니다.
   */
  const parentsGridStyle = {
    display: 'grid',
    gridTemplateColumns:
      'max-content max-content max-content max-content max-content minmax(3em, max-content)',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '0',
    rowGap: '10px',
    whiteSpace: 'nowrap',
    lineHeight: '1.8'
  };

  const fatherStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  };

  const dotStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 4px'
  };

  const motherStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };

  /*
   * ✅ 부모님 한 분만 입력된 경우
   *
   * 부모님 영역 1~3열을 합치고 오른쪽 정렬하여
   * 뒤의 '의'와 불필요한 간격이 생기지 않도록 처리
   */
  const singleParentStyle = {
    gridColumn: '1 / 4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    justifySelf: 'stretch'
  };

  // ✅ 부모님 성함 ↔ 의 ↔ 관계 간격
  const uiStyle = {
    color: '#999',
    marginLeft: '8px',
    marginRight: '5px'
  };

  /*
   * ✅ 관계 영역
   *
   * 신랑·신부 중 가장 긴 관계 문구에 맞춰 자동 확장
   * 짧은 '딸'은 관계 영역 가운데 정렬
   */
  const relationStyle = {
    display: 'block',
    width: '100%',
    color: '#999',
    textAlign: 'center',
    paddingRight: '5px',
    boxSizing: 'border-box'
  };

  /*
   * ✅ 신랑·신부 이름 영역
   *
   * 외자·두 글자·세 글자 이름의 시작 위치를 동일하게 유지
   */
  const coupleNameStyle = {
    display: 'block',
    minWidth: '3em',
    textAlign: 'left',
    fontWeight: 'bold'
  };

  const simpleRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    lineHeight: '1.8'
  };

  return (
    <div
      style={{
        padding: '80px 30px',
        backgroundColor: '#fff',
        textAlign: 'center'
      }}
    >
      <motion.h2
        className="english-title"
        style={{ marginBottom: '30px' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        INVITATION
      </motion.h2>

      <motion.p
        style={{
          fontSize: '1rem',
          lineHeight: '2.2',
          color: '#555',
          marginBottom: '50px',
          whiteSpace: 'pre-wrap'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {intro.message}
      </motion.p>

      <motion.div
        style={{
          fontSize: '1rem',
          color: '#333'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {hasGroomParents || hasBrideParents ? (
          <div style={parentsGridStyle}>

            {/* ================= 신랑 ================= */}

            {hasGroomParents ? (
              <>
                {hasBothGroomParents ? (
                  <>
                    {/* 신랑 아버지 */}
                    <span style={fatherStyle}>
                      {renderParentName(groomFather, true)}
                    </span>

                    {/* 가운데점 */}
                    <span style={dotStyle}>
                      ·
                    </span>

                    {/* 신랑 어머니 */}
                    <span style={motherStyle}>
                      {renderParentName(groomMother, false)}
                    </span>
                  </>
                ) : (
                  <>
                    {/* 신랑 부모님 한 분만 입력된 경우 */}
                    <span style={singleParentStyle}>
                      {hasGroomFather
                        ? renderParentName(groomFather, true)
                        : renderParentName(groomMother, true)}
                    </span>
                  </>
                )}

                {/* 의 */}
                <span style={uiStyle}>
                  의
                </span>

                {/* 아들 / 장남 / 둘째아들 등 */}
                <span style={relationStyle}>
                  {parents.groom.relation}
                </span>

                {/* 신랑 이름 */}
                <span style={coupleNameStyle}>
                  {intro.groomName}
                </span>
              </>
            ) : (
              <span
                style={{
                  gridColumn: '1 / 7',
                  ...simpleRowStyle
                }}
              >
                <span
                  style={{
                    color: '#999',
                    marginRight: '6px'
                  }}
                >
                  신랑
                </span>

                <span style={{ fontWeight: 'bold' }}>
                  {intro.groomName}
                </span>
              </span>
            )}

            {/* ================= 신부 ================= */}

            {hasBrideParents ? (
              <>
                {hasBothBrideParents ? (
                  <>
                    {/* 신부 아버지 */}
                    <span style={fatherStyle}>
                      {renderParentName(brideFather, true)}
                    </span>

                    {/* 가운데점 */}
                    <span style={dotStyle}>
                      ·
                    </span>

                    {/* 신부 어머니 */}
                    <span style={motherStyle}>
                      {renderParentName(brideMother, false)}
                    </span>
                  </>
                ) : (
                  <>
                    {/* 신부 부모님 한 분만 입력된 경우 */}
                    <span style={singleParentStyle}>
                      {hasBrideFather
                        ? renderParentName(brideFather, true)
                        : renderParentName(brideMother, true)}
                    </span>
                  </>
                )}

                {/* 의 */}
                <span style={uiStyle}>
                  의
                </span>

                {/* 딸 / 장녀 / 첫째딸 등 */}
                <span style={relationStyle}>
                  {parents.bride.relation}
                </span>

                {/* 신부 이름 */}
                <span style={coupleNameStyle}>
                  {intro.brideName}
                </span>
              </>
            ) : (
              <span
                style={{
                  gridColumn: '1 / 7',
                  ...simpleRowStyle
                }}
              >
                <span
                  style={{
                    color: '#999',
                    marginRight: '6px'
                  }}
                >
                  신부
                </span>

                <span style={{ fontWeight: 'bold' }}>
                  {intro.brideName}
                </span>
              </span>
            )}
          </div>
        ) : (
          <>
            {/* 부모님 성함이 양쪽 모두 없는 경우 */}
            <div
              style={{
                ...simpleRowStyle,
                marginBottom: '10px'
              }}
            >
              <span
                style={{
                  color: '#999',
                  marginRight: '6px'
                }}
              >
                신랑
              </span>

              <span style={{ fontWeight: 'bold' }}>
                {intro.groomName}
              </span>
            </div>

            <div style={simpleRowStyle}>
              <span
                style={{
                  color: '#999',
                  marginRight: '6px'
                }}
              >
                신부
              </span>

              <span style={{ fontWeight: 'bold' }}>
                {intro.brideName}
              </span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}