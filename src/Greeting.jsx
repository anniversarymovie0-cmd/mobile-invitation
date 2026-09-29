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

        <span style={{ whiteSpace: 'pre' }}>{nameText}</span>
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
   * ✅ 신랑 측 어머님 성함 앞 특수 표기 확인
   *
   * flower : 국화꽃
   * go     : 故
   */
  const hasGroomMotherSpecial =
    hasGroomMother &&
    (
      groomMother?.symbol === 'flower' ||
      groomMother?.symbol === 'go'
    );

  /*
   * ✅ 신부 측 어머님 성함 앞 특수 표기 확인
   *
   * flower : 국화꽃
   * go     : 故
   */
  const hasBrideMotherSpecial =
    hasBrideMother &&
    (
      brideMother?.symbol === 'flower' ||
      brideMother?.symbol === 'go'
    );

  /*
   * ✅ 부모님 성함이 4글자 이상인 경우 확인
   *
   * symbol은 포함하지 않고 실제 성함(parent.name)만 확인
   *
   * 예:
   * 최윤화   → 3글자 → 기존 Grid
   * 남궁옥희 → 4글자 → 해당 행만 독립 가운데 정렬
   */
  const hasGroomLongParentName =
    (groomFather?.name?.trim().length || 0) >= 4 ||
    (groomMother?.name?.trim().length || 0) >= 4;

  const hasBrideLongParentName =
    (brideFather?.name?.trim().length || 0) >= 4 ||
    (brideMother?.name?.trim().length || 0) >= 4;

  /*
   * ✅ 해당 행을 독립 가운데 정렬해야 하는지 최종 확인
   *
   * 기존:
   * - 어머님 국화
   * - 어머님 故
   *
   * 추가:
   * - 부모님 성함 중 한 분이라도 4글자 이상
   */
  const hasGroomSpecialRow =
    hasGroomMotherSpecial || hasGroomLongParentName;

  const hasBrideSpecialRow =
    hasBrideMotherSpecial || hasBrideLongParentName;

  /*
   * ✅ 일반적인 경우
   * 신랑·신부가 동일한 Grid 열을 공유
   *
   * 1열: 아버지
   * 2열: 가운데점
   * 3열: 어머니
   * 4열: 의
   * 5열: 관계
   * 6열: 신랑·신부 이름
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
   * ✅ 부모님 한 분만 입력된 일반적인 경우
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
   * ✅ 일반 Grid의 관계 영역
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
   * ✅ 일반 Grid의 신랑·신부 이름 영역
   */
  const coupleNameStyle = {
  display: 'block',
  minWidth: '3em',
  textAlign: 'left',
  fontWeight: '400',
  WebkitTextStroke: '0.2px currentColor'
};

  const simpleRowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    lineHeight: '1.8'
  };

  /*
   * ✅ 예외 행
   *
   * - 어머님 국화
   * - 어머님 故
   * - 부모님 성함 4글자 이상
   *
   * 해당 줄만 하나의 문장처럼 가운데 정렬
   */
  const motherSpecialRowStyle = {
    gridColumn: '1 / 7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    lineHeight: '1.8'
  };

  // ✅ 예외 행의 가운데점
  const specialRowDotStyle = {
    margin: '0 4px'
  };

  // ✅ 예외 행의 '의'
  const specialRowUiStyle = {
    color: '#999',
    marginLeft: '8px',
    marginRight: '5px'
  };

  // ✅ 예외 행의 관계
  const specialRowRelationStyle = {
    color: '#999',
    marginRight: '5px'
  };

  // ✅ 예외 행의 신랑·신부 이름
  const specialRowNameStyle = {
    fontWeight: 'bold',
    whiteSpace: 'pre'
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
              hasGroomSpecialRow ? (
                /*
                 * ✅ 신랑 측 예외 행
                 *
                 * - 어머님 국화
                 * - 어머님 故
                 * - 부모님 성함 4글자 이상
                 */
                <span style={motherSpecialRowStyle}>

                  {hasGroomFather &&
                    renderParentName(groomFather, true)}

                  {hasGroomFather && hasGroomMother && (
                    <span style={specialRowDotStyle}>
                      ·
                    </span>
                  )}

                  {hasGroomMother &&
                    renderParentName(groomMother, false)}

                  <span style={specialRowUiStyle}>
                    의
                  </span>

                  <span style={specialRowRelationStyle}>
                    {parents.groom.relation}
                  </span>

                  <span style={specialRowNameStyle}>
                    {intro.groomName}
                  </span>
                </span>
              ) : (
                /*
                 * ✅ 신랑 측 일반적인 경우
                 * 기존 Grid 배열 그대로 유지
                 */
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

                  {/* 관계 */}
                  <span style={relationStyle}>
                    {parents.groom.relation}
                  </span>

                  {/* 신랑 이름 */}
                  <span
                    style={{
                      ...coupleNameStyle,
                      whiteSpace: 'pre'
                    }}
                  >
                    {intro.groomName}
                  </span>
                </>
              )
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

                <span
                  style={{
                    fontWeight: 'bold',
                    whiteSpace: 'pre'
                  }}
                >
                  {intro.groomName}
                </span>
              </span>
            )}

            {/* ================= 신부 ================= */}

            {hasBrideParents ? (
              hasBrideSpecialRow ? (
                /*
                 * ✅ 신부 측 예외 행
                 *
                 * - 어머님 국화
                 * - 어머님 故
                 * - 부모님 성함 4글자 이상
                 */
                <span style={motherSpecialRowStyle}>

                  {hasBrideFather &&
                    renderParentName(brideFather, true)}

                  {hasBrideFather && hasBrideMother && (
                    <span style={specialRowDotStyle}>
                      ·
                    </span>
                  )}

                  {hasBrideMother &&
                    renderParentName(brideMother, false)}

                  <span style={specialRowUiStyle}>
                    의
                  </span>

                  <span style={specialRowRelationStyle}>
                    {parents.bride.relation}
                  </span>

                  <span style={specialRowNameStyle}>
                    {intro.brideName}
                  </span>
                </span>
              ) : (
                /*
                 * ✅ 신부 측 일반적인 경우
                 * 기존 Grid 배열 그대로 유지
                 */
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

                  {/* 관계 */}
                  <span style={relationStyle}>
                    {parents.bride.relation}
                  </span>

                  {/* 신부 이름 */}
                  <span
                    style={{
                      ...coupleNameStyle,
                      whiteSpace: 'pre'
                    }}
                  >
                    {intro.brideName}
                  </span>
                </>
              )
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

                <span
                  style={{
                    fontWeight: 'bold',
                    whiteSpace: 'pre'
                  }}
                >
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

              <span
                style={{
                  fontWeight: 'bold',
                  whiteSpace: 'pre'
                }}
              >
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

              <span
                style={{
                  fontWeight: 'bold',
                  whiteSpace: 'pre'
                }}
              >
                {intro.brideName}
              </span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}