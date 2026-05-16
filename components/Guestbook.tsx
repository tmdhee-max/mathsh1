import { db } from "@/db";
import { guestbook } from "@/db/schema";
import { addGuestbookEntry } from "@/app/actions";
import { desc } from "drizzle-orm";
import AdminDeleteButton from "./AdminDeleteButton";

export default async function Guestbook() {
  const entries = await db.select().from(guestbook).orderBy(desc(guestbook.createdAt));

  return (
    <div className="w-full max-w-3xl mx-auto relative group">
      {/* 장식용 배경 블러 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
            방명록 ✨
          </h2>
          <p className="text-slate-500 mt-2">자유롭게 발자취를 남겨주세요!</p>
        </div>
        
        <form action={addGuestbookEntry} className="space-y-4 mb-10">
          <div>
            <input 
              type="text" 
              name="name" 
              placeholder="이름 (또는 닉네임)" 
              required 
              className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all shadow-sm"
            />
          </div>
          <div>
            <textarea 
              name="message" 
              placeholder="따뜻한 응원의 메시지를 남겨주세요!" 
              required 
              rows={3}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all resize-none shadow-sm"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 hover:from-blue-500 to-indigo-600 hover:to-indigo-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            메시지 남기기
          </button>
        </form>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {entries.map((entry) => (
            <div key={entry.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all group/item">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  {entry.name}
                </span>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-full group-hover/item:bg-slate-50 transition-colors">
                  {entry.createdAt.toLocaleDateString()}
                </span>
                <AdminDeleteButton id={entry.id} />
              </div>
              <p className="text-slate-600 leading-relaxed pl-10">{entry.message}</p>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">첫 번째 방명록의 주인공이 되어보세요! 🎉</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
