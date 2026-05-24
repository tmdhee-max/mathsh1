import Guestbook from "@/components/Guestbook";
import IntegerMathGame from "@/components/IntegerMathGame";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-in-out">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            재미있는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">수학 연구소</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600">
            복잡한 설정 없이 바로 시작하세요. 이 템플릿은 Vercel에 즉시 배포할 수 있으며, 
            원하는 기능을 마음껏 추가할 수 있는 견고한 뼈대를 제공합니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a href="#math-game" className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-200 hover:scale-105 hover:shadow-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block">
            게임 시작하기 🎮
          </a>
        </div>
      </section>

      {/* 정수 사칙연산 게임 섹션 */}
      <section id="math-game" className="w-full max-w-5xl mx-auto mt-16 scroll-mt-24">
        <IntegerMathGame />
      </section>

      {/* 방명록 섹션 */}
      <section className="w-full max-w-5xl mx-auto mt-24">
        <Guestbook />
      </section>
    </div>
  );
}
