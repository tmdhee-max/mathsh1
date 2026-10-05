import { db } from "@/db";
import { boardPosts } from "@/db/schema";
import { addBoardPost } from "@/app/actions";
import { desc } from "drizzle-orm";

export default async function Board() {
  const posts = await db.select().from(boardPosts).orderBy(desc(boardPosts.createdAt));

  return (
    <div className="w-full max-w-4xl mx-auto relative group mb-24">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
            게시판 📋
          </h2>
          <p className="text-slate-500 mt-2">자유롭게 의견과 질문을 남겨주세요!</p>
        </div>
        
        <form action={addBoardPost} className="space-y-4 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              name="title" 
              placeholder="제목을 입력하세요" 
              required 
              className="flex-1 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all shadow-sm"
            />
            <input 
              type="text" 
              name="author" 
              placeholder="작성자" 
              required 
              className="w-full sm:w-32 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all shadow-sm"
            />
          </div>
          <div>
            <textarea 
              name="content" 
              placeholder="내용을 작성해주세요..." 
              required 
              rows={4}
              className="w-full px-5 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none shadow-sm"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-teal-500 hover:from-teal-600 to-emerald-500 hover:to-emerald-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            글 등록하기
          </button>
        </form>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {posts.map((post) => (
            <div key={post.id} className="p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-all group/item">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h3 className="text-xl font-bold text-slate-800">{post.title}</h3>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  {post.createdAt.toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xs">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                {post.author}
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 font-medium">아직 등록된 게시글이 없습니다. 첫 번째 글을 남겨주세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
