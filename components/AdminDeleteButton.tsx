"use client";

import { useState } from "react";
import { deleteGuestbookEntry } from "@/app/actions";

export default function AdminDeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    
    setIsDeleting(true);
    setError("");
    const result = await deleteGuestbookEntry(id, password);
    setIsDeleting(false);
    
    if (result.success) {
      setShowPrompt(false);
      setPassword("");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowPrompt(!showPrompt)}
        className="ml-3 text-xs text-slate-400 hover:text-rose-500 bg-white hover:bg-rose-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1 shadow-sm active:scale-95"
      >
        <span className="text-[10px]">🗑️</span> 삭제
      </button>

      {showPrompt && (
        <div className="absolute right-0 top-10 w-64 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-200">
          <form onSubmit={handleDelete} className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-slate-700">관리자 인증</h4>
            <p className="text-xs text-slate-500">이 게시물을 삭제하려면 관리자 비밀번호를 입력하세요.</p>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호" 
              className="w-full text-sm px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all"
              autoFocus
            />
            {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
            <div className="flex gap-2 mt-1">
              <button 
                type="button" 
                onClick={() => setShowPrompt(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                취소
              </button>
              <button 
                type="submit" 
                disabled={isDeleting}
                className="flex-1 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-md transition-colors disabled:opacity-50"
              >
                {isDeleting ? "삭제 중..." : "확인"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
