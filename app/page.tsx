import Guestbook from "@/components/Guestbook";
import { getCustomLinks } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const myLinks = await getCustomLinks();

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
          {myLinks.map((link) => (
            <a 
              key={link.id} 
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
          {myLinks.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <span className="text-4xl mb-4">🔗</span>
              <p className="text-slate-500 font-medium text-lg">아직 등록된 링크가 없습니다.</p>
              <p className="text-slate-400 mt-1">관리자 페이지에서 첫 번째 링크를 추가해보세요!</p>
            </div>
          )}
        </div>
      </section>

      {/* 방명록 섹션 */}
      <section className="w-full max-w-5xl mx-auto mt-24">
        <Guestbook />
      </section>
    </div>
  );
}
