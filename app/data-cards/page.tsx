import type { Metadata, Viewport } from "next";
import { DataCardGame } from "./card-game";

export const metadata: Metadata = {
  title: "데이터 할리갈리 | 생각깨움",
  description: "휴대폰에서 카드를 넘기고 같은 유형의 데이터 3장을 찾아보세요.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#171c20" };

export default function DataCardsPage() {
  return <DataCardGame />;
}
