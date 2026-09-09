import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./app/globals.css";
import HomePage from "./app/page";

const root = document.getElementById("root");

if (!root) {
  throw new Error("페이지를 표시할 루트 요소를 찾지 못했습니다.");
}

createRoot(root).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
