"use client";

import { useState } from "react";

type AnimalType = "bear" | "rabbit" | "cat";
type HatType = "none" | "cap" | "crown" | "bow";
type OutfitType = "none" | "shirt" | "dress" | "suit";
type AccessoryType = "none" | "scarf" | "glasses" | "wand";

export default function DressUpGame() {
  const [animal, setAnimal] = useState<AnimalType>("bear");
  const [hat, setHat] = useState<HatType>("none");
  const [outfit, setOutfit] = useState<OutfitType>("none");
  const [accessory, setAccessory] = useState<AccessoryType>("none");

  const animals = {
    bear: { color: "bg-amber-600", secondary: "bg-amber-700", ears: "w-12 h-12 rounded-full -top-4 -left-3", earsRight: "w-12 h-12 rounded-full -top-4 -right-3" },
    rabbit: { color: "bg-slate-50", secondary: "bg-slate-200", ears: "w-8 h-24 rounded-full -top-16 left-2", earsRight: "w-8 h-24 rounded-full -top-16 right-2" },
    cat: { color: "bg-orange-400", secondary: "bg-orange-500", ears: "w-12 h-12 rounded-tl-xl rounded-tr-md rounded-bl-md rounded-br-3xl transform -rotate-12 -top-4 -left-2", earsRight: "w-12 h-12 rounded-tr-xl rounded-tl-md rounded-br-md rounded-bl-3xl transform rotate-12 -top-4 -right-2" },
  };

  const currentAnimal = animals[animal];

  return (
    <div className="w-full max-w-4xl mx-auto relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden flex flex-col md:flex-row gap-8">
        
        {/* Game Area (Left) */}
        <div className="flex-1 bg-gradient-to-b from-sky-200 to-green-200 rounded-2xl border-4 border-white shadow-inner relative flex items-end justify-center min-h-[400px] overflow-hidden">
          
          {/* Cloud decorations */}
          <div className="absolute top-10 left-10 text-6xl opacity-80 animate-pulse">☁️</div>
          <div className="absolute top-24 right-16 text-5xl opacity-60">☁️</div>

          {/* Animal Character */}
          <div className="relative flex flex-col items-center pb-8 transition-transform duration-300 hover:scale-105">
            
            {/* Accessory Overlay: Wand */}
            {accessory === 'wand' && <div className="absolute top-1/2 -right-16 text-6xl z-50 animate-bounce" style={{ transform: 'rotate(15deg)' }}>🪄</div>}

            {/* Head */}
            <div className={`w-36 h-36 rounded-[3rem] ${currentAnimal.color} relative z-20 flex flex-col items-center justify-center shadow-lg transition-colors duration-500`}>
              {/* Ears */}
              <div className={`absolute ${currentAnimal.secondary} ${currentAnimal.ears} -z-10 transition-all duration-500`}></div>
              <div className={`absolute ${currentAnimal.secondary} ${currentAnimal.earsRight} -z-10 transition-all duration-500`}></div>
              
              {/* Eyes */}
              <div className="absolute top-12 flex gap-8">
                <div className="w-4 h-4 bg-slate-800 rounded-full shadow-inner flex items-start justify-end p-0.5"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
                <div className="w-4 h-4 bg-slate-800 rounded-full shadow-inner flex items-start justify-end p-0.5"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>
              </div>
              
              {/* Nose/Mouth */}
              <div className="absolute top-20 flex flex-col items-center">
                <div className="w-5 h-3 bg-slate-800 rounded-full mb-1"></div>
                <div className="w-6 h-3 border-b-2 border-slate-800 rounded-full"></div>
              </div>

              {/* Hat Overlay */}
              {hat === 'cap' && <div className="absolute -top-8 text-7xl z-30 drop-shadow-md">🧢</div>}
              {hat === 'crown' && <div className="absolute -top-12 text-7xl z-30 drop-shadow-md animate-pulse">👑</div>}
              {hat === 'bow' && <div className="absolute -top-6 right-0 text-6xl z-30 drop-shadow-md">🎀</div>}
              
              {/* Accessory Overlay: Glasses */}
              {accessory === 'glasses' && <div className="absolute top-9 text-6xl z-30 drop-shadow-sm">🕶️</div>}
            </div>

            {/* Body */}
            <div className={`w-28 h-32 ${currentAnimal.color} rounded-t-[3rem] relative z-10 -mt-6 shadow-md transition-colors duration-500`}>
              {/* Outfit Overlay */}
              {outfit === 'shirt' && (
                <div className="absolute inset-0 bg-blue-500 rounded-t-[3rem] border-b-8 border-blue-600 flex justify-center items-start pt-4 overflow-hidden">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full text-xs flex items-center justify-center font-bold text-yellow-800">STAR</div>
                </div>
              )}
              {outfit === 'dress' && (
                <div className="absolute -inset-x-6 bottom-0 top-0 bg-pink-400 rounded-t-[3rem] rounded-b-2xl border-b-[12px] border-pink-500 flex justify-center items-start pt-2">
                  <div className="w-full flex justify-center gap-2"><div className="w-3 h-3 bg-white rounded-full opacity-50"></div><div className="w-3 h-3 bg-white rounded-full opacity-50"></div></div>
                </div>
              )}
              {outfit === 'suit' && (
                <div className="absolute inset-0 bg-slate-800 rounded-t-[3rem] flex justify-center overflow-hidden">
                  <div className="w-6 h-full bg-white flex flex-col items-center pt-2 gap-2">
                    <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent border-t-red-500"></div>
                    <div className="w-2 h-2 bg-slate-800 rounded-full mt-2"></div>
                    <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              )}
              
              {/* Accessory Overlay: Scarf */}
              {accessory === 'scarf' && (
                <div className="absolute -top-4 -left-4 -right-4 h-12 bg-red-500 rounded-full z-30 border-b-4 border-red-600 shadow-md">
                  <div className="absolute top-4 left-4 w-6 h-16 bg-red-500 rounded-full -z-10 border-r-4 border-red-600 transform -rotate-12"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls Area (Right) */}
        <div className="w-full md:w-80 flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              옷 입히기 게임 🎀
            </h2>
            <p className="text-slate-500 mt-1 font-medium">나만의 귀여운 인형을 꾸며보세요!</p>
          </div>

          <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[350px]">
            {/* Animal Selection */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">동물 종류</h3>
              <div className="flex gap-2">
                {(['bear', 'rabbit', 'cat'] as const).map(a => (
                  <button key={a} onClick={() => setAnimal(a)} className={`flex-1 py-2 rounded-xl text-2xl transition-all ${animal === a ? 'bg-pink-100 border-2 border-pink-400 scale-105' : 'bg-white border-2 border-transparent shadow-sm hover:scale-105'}`}>
                    {a === 'bear' ? '🐻' : a === 'rabbit' ? '🐰' : '🐱'}
                  </button>
                ))}
              </div>
            </div>

            {/* Hat Selection */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">모자</h3>
              <div className="grid grid-cols-4 gap-2">
                {(['none', 'cap', 'crown', 'bow'] as const).map(h => (
                  <button key={h} onClick={() => setHat(h)} className={`py-2 rounded-xl text-xl transition-all ${hat === h ? 'bg-purple-100 border-2 border-purple-400 scale-105' : 'bg-white border-2 border-transparent shadow-sm hover:scale-105'}`}>
                    {h === 'none' ? '❌' : h === 'cap' ? '🧢' : h === 'crown' ? '👑' : '🎀'}
                  </button>
                ))}
              </div>
            </div>

            {/* Outfit Selection */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">옷</h3>
              <div className="grid grid-cols-4 gap-2">
                {(['none', 'shirt', 'dress', 'suit'] as const).map(o => (
                  <button key={o} onClick={() => setOutfit(o)} className={`py-2 rounded-xl text-xl transition-all ${outfit === o ? 'bg-blue-100 border-2 border-blue-400 scale-105' : 'bg-white border-2 border-transparent shadow-sm hover:scale-105'}`}>
                    {o === 'none' ? '❌' : o === 'shirt' ? '👕' : o === 'dress' ? '👗' : '👔'}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessory Selection */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">액세서리</h3>
              <div className="grid grid-cols-4 gap-2">
                {(['none', 'scarf', 'glasses', 'wand'] as const).map(acc => (
                  <button key={acc} onClick={() => setAccessory(acc)} className={`py-2 rounded-xl text-xl transition-all ${accessory === acc ? 'bg-emerald-100 border-2 border-emerald-400 scale-105' : 'bg-white border-2 border-transparent shadow-sm hover:scale-105'}`}>
                    {acc === 'none' ? '❌' : acc === 'scarf' ? '🧣' : acc === 'glasses' ? '🕶️' : '🪄'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button onClick={() => { setHat('none'); setOutfit('none'); setAccessory('none'); }} className="mt-auto py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all active:scale-95 text-sm">
            다시 꾸미기 ↺
          </button>
        </div>

      </div>
    </div>
  );
}
