// 這個檔案由 AI 自動產生，SVG 內容來自 ~/Downloads/output.svg
import React from "react";

const ShareIcon: React.FC<{ size?: number; style?: React.CSSProperties }> = ({
  size = 28,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* 箭頭往上 */}
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
    {/* 下方水平線 */}
    <path d="M5 19h14" />
  </svg>
);

export default ShareIcon;
