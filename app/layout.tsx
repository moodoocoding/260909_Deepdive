import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "생각깨움 | 교원 디지털 연수",
  description: "직접 해 보고 이야기하며 디지털 개념을 발견하는 초등교사 연수 미션",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
