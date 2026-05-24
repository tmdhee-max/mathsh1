"use client";

import { useState } from "react";
import { getCustomLinks, addCustomLink, deleteCustomLink, updateLinksOrder, getAllGuestbookEntries, deleteGuestbookEntry } from "@/app/actions";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [links, setLinks] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  
  const [newLink, setNewLink] = useState({ title: "", url: "", description: "", icon: "🌐" });
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderChanged, setIsOrderChanged] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Test auth by fetching entries
    const res = await getAllGuestbookEntries(password);
    if (res.success) {
      setIsAuthenticated(true);
      setEntries(res.data || []);
      const fetchedLinks = await getCustomLinks();
      setLinks(fetchedLinks);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
    setIsLoading(false);
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await addCustomLink(newLink.title, newLink.url, newLink.description, newLink.icon, password);
    if (res.success) {
      alert("추가되었습니다.");
      setNewLink({ title: "", url: "", description: "", icon: "🌐" });
      const fetchedLinks = await getCustomLinks();
      setLinks(fetchedLinks);
    } else {
      alert(res.message);
    }
    setIsLoading(false);
  };

  const handleDeleteLink = async (id: number) => {
    if(!confirm("정말 삭제하시겠습니까?")) return;
    setIsLoading(true);
    const res = await deleteCustomLink(id, password);
    if (res.success) {
      const fetchedLinks = await getCustomLinks();
      setLinks(fetchedLinks);
    } else {
      alert(res.message);
    }
    setIsLoading(false);
  };

  const moveLink = (index: number, direction: -1 | 1) => {
    if (index + direction < 0 || index + direction >= links.length) return;
    const newLinks = [...links];
    const temp = newLinks[index];
    newLinks[index] = newLinks[index + direction];
    newLinks[index + direction] = temp;
    setLinks(newLinks);
    setIsOrderChanged(true);
  };

  const handleSaveOrder = async () => {
    setIsLoading(true);
    const orderedIds = links.map(l => l.id);
    const res = await updateLinksOrder(orderedIds, password);
    if (res.success) {
      alert("순서가 저장되었습니다.");
      setIsOrderChanged(false);
      const fetchedLinks = await getCustomLinks();
      setLinks(fetchedLinks);
    } else {
      alert(res.message);
    }
    setIsLoading(false);
  };

  const handleDeleteEntry = async (id: number) => {
    if(!confirm("정말 삭제하시겠습니까?")) return;
    setIsLoading(true);
    const res = await deleteGuestbookEntry(id, password);
    if (res.success) {
      const fetchRes = await getAllGuestbookEntries(password);
      if (fetchRes.success) setEntries(fetchRes.data || []);
    } else {
      alert(res.message);
    }
    setIsLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <form onSubmit={login} className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full space-y-4 border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800 text-center">관리자 로그인</h1>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button type="submit" disabled={isLoading} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            {isLoading ? "확인 중..." : "로그인"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-slate-800">관리자 대시보드</h1>
        <button onClick={() => window.location.href = "/"} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 font-medium transition-colors text-sm sm:text-base">메인으로 돌아가기</button>
      </div>

      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-800">🔗 커스텀 링크(배너) 관리</h2>
          {isOrderChanged && (
            <button onClick={handleSaveOrder} disabled={isLoading} className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors animate-bounce shadow-md">
              변경된 순서 저장
            </button>
          )}
        </div>
        
        <form onSubmit={handleAddLink} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-2xl">
          <input type="text" placeholder="제목 (예: 구글)" required value={newLink.title} onChange={e => setNewLink({...newLink, title: e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="url" placeholder="URL (https://...)" required value={newLink.url} onChange={e => setNewLink({...newLink, url: e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="설명 (선택)" value={newLink.description} onChange={e => setNewLink({...newLink, description: e.target.value})} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex gap-2">
            <input type="text" placeholder="이모지 (예: 🌐)" required value={newLink.icon} onChange={e => setNewLink({...newLink, icon: e.target.value})} className="w-20 px-4 py-3 rounded-xl border border-slate-200 text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">추가</button>
          </div>
        </form>

        <div className="space-y-3">
          {links.map((link, index) => (
            <div key={link.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4 transition-all hover:bg-white hover:shadow-sm">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={() => moveLink(index, -1)} disabled={index === 0} className="p-1 text-xs bg-slate-200 text-slate-500 rounded hover:bg-slate-300 disabled:opacity-30 transition-opacity">🔼</button>
                  <button type="button" onClick={() => moveLink(index, 1)} disabled={index === links.length - 1} className="p-1 text-xs bg-slate-200 text-slate-500 rounded hover:bg-slate-300 disabled:opacity-30 transition-opacity">🔽</button>
                </div>
                <span className="text-3xl">{link.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-800">{link.title}</h3>
                  <p className="text-sm text-slate-500 truncate max-w-xs">{link.url}</p>
                </div>
              </div>
              <button onClick={() => handleDeleteLink(link.id)} className="px-4 py-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 font-medium w-full sm:w-auto transition-colors">삭제</button>
            </div>
          ))}
          {links.length === 0 && <p className="text-slate-500 text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">등록된 링크가 없습니다.</p>}
        </div>
      </section>

      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">📝 방명록 관리</h2>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {entries.map(entry => (
            <div key={entry.id} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-slate-50 rounded-xl border border-slate-100 gap-4 transition-all hover:bg-white hover:shadow-sm">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-800">{entry.name}</span>
                  <span className="text-xs text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">{new Date(entry.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-600">{entry.message}</p>
              </div>
              <button onClick={() => handleDeleteEntry(entry.id)} className="px-4 py-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 font-medium whitespace-nowrap w-full sm:w-auto transition-colors">삭제</button>
            </div>
          ))}
          {entries.length === 0 && <p className="text-slate-500 text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">등록된 방명록이 없습니다.</p>}
        </div>
      </section>
    </div>
  );
}
