import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { incrementAndGetVisits } from "@/app/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "재미있는 수학 연구소",
  description: "재밌는 수학 사이트",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const visits = await incrementAndGetVisits();

  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        {/* 상단 헤더 */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-600">재미있는 수학 연구소</span>
            </div>
            <nav className="hidden md:flex gap-6">
              {/* 여기에 새로운 네비게이션 아이템을 추가하세요 */}
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">홈</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">소개</a>
            </nav>
            <button className="md:hidden p-2 rounded-md hover:bg-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* 하단 푸터 */}
        <footer className="border-t bg-white py-8 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-slate-500 font-medium">
              방문자 수: <span className="text-blue-600 font-bold">{visits.toLocaleString()}</span>명
            </p>
            <p className="text-sm text-slate-500 mt-1">
              © {new Date().getFullYear()} 재미있는 수학 연구소. 제작 승희샘
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
