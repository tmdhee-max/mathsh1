import Guestbook from "@/components/Guestbook";

export const dynamic = 'force-dynamic';

// 👇 여기에 원하는 링크들을 추가하고 수정하세요!
const MY_LINKS = [
  {
    title: "구글",
    description: "구글 검색엔진으로 이동합니다.",
    url: "https://google.com",
    icon: "🌐",
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "네이버",
    description: "네이버 메인 페이지로 이동합니다.",
    url: "https://naver.com",
    icon: "🔍",
    color: "from-green-400 to-green-600"
  },
  {
    title: "유튜브",
    description: "유튜브에서 동영상을 시청하세요.",
    url: "https://youtube.com",
    icon: "▶️",
    color: "from-red-400 to-red-600"
  }
];

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
            아래에 원하는 링크를 자유롭게 추가하고 나만의 맞춤형 페이지로 꾸며보세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a href="#my-links" className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-200 hover:scale-105 hover:shadow-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block">
            바로가기 목록 👀
          </a>
        </div>
      </section>

      {/* 커스텀 링크 목록 섹션 */}
      <section id="my-links" className="w-full max-w-5xl mx-auto mt-20 scroll-mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MY_LINKS.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex flex-col p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${link.color} transition-opacity duration-300`} />
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                <span className="text-slate-300 group-hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{link.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{link.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 방명록 섹션 */}
      <section className="w-full max-w-5xl mx-auto mt-24">
        <Guestbook />
      </section>
    </div>
  );
}
