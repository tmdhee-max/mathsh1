export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-in-out">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            재밌는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">교육용 웹앱</span> 만들기
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600">
            복잡한 설정 없이 바로 시작하세요. 이 템플릿은 Vercel에 즉시 배포할 수 있으며, 
            원하는 기능을 마음껏 추가할 수 있는 견고한 뼈대를 제공합니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* 가짜(Placeholder) 버튼 */}
          <button className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 hover:shadow-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            시작하기 (기능 추가 예정)
          </button>
        </div>
      </section>

      {/* 추가 기능 섹션 예시 */}
      <section className="w-full max-w-5xl mx-auto mt-24">
        {/* // 여기에 새로운 컴포넌트를 추가하세요. 예: 기능 소개 카드, 강의 목록 등 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-60">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm border-dashed flex items-center justify-center h-48">
            <span className="text-slate-400 font-medium">컴포넌트 영역 1</span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm border-dashed flex items-center justify-center h-48">
            <span className="text-slate-400 font-medium">컴포넌트 영역 2</span>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm border-dashed flex items-center justify-center h-48">
            <span className="text-slate-400 font-medium">컴포넌트 영역 3</span>
          </div>
        </div>
      </section>
    </div>
  );
}
