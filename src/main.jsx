import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css' // ⭐ 이 줄이 있어야 폰트와 정렬이 살아납니다!

// 1. 화면 그리기 - 빌드 강제 업데이트 테스트!!! 12345
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
) 