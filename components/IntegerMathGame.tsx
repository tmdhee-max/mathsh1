"use client";

import { useState, useEffect, useRef } from "react";
import { saveGameScore, getGameRankings } from "@/app/actions";

type GameState = "start" | "playing" | "gameover";
type GameMode = "time" | "challenge";

interface Question {
  questionStr: string;
  answer: number;
}

interface Ranking {
  id: number;
  nickname: string;
  score: number;
  mode: string;
  createdAt: Date;
}

export default function IntegerMathGame() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [mode, setMode] = useState<GameMode>("time");
  const [nickname, setNickname] = useState("");
  
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(5);
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestion = (): Question => {
    const operators = ['+', '-', '×', '÷'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let num1 = 0, num2 = 0, answer = 0;
    
    if (operator === '÷') {
      num2 = Math.floor(Math.random() * 15) - 7;
      if (num2 === 0) num2 = 2; // prevent div by zero
      answer = Math.floor(Math.random() * 15) - 7;
      num1 = num2 * answer;
    } else {
      num1 = Math.floor(Math.random() * 20) - 10;
      num2 = Math.floor(Math.random() * 20) - 10;
      if (operator === '+') answer = num1 + num2;
      if (operator === '-') answer = num1 - num2;
      if (operator === '×') {
        num1 = Math.floor(Math.random() * 12) - 6;
        num2 = Math.floor(Math.random() * 12) - 6;
        answer = num1 * num2;
      }
    }

    const formatNum = (n: number) => n < 0 ? `(${n})` : (n > 0 ? `(+${n})` : `0`);
    const questionStr = `${formatNum(num1)} ${operator} ${formatNum(num2)} = ?`;
    
    return { questionStr, answer };
  };

  const startGame = (selectedMode: GameMode) => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요!");
      return;
    }
    setMode(selectedMode);
    setScore(0);
    setCombo(0);
    setTimeLeft(60);
    setLives(5);
    setCurrentQuestion(generateQuestion());
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState === "playing" && mode === "time") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, mode]);

  // Focus input automatically
  useEffect(() => {
    if (gameState === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentQuestion]);

  const endGame = async () => {
    setGameState("gameover");
    setIsSaving(true);
    try {
      await saveGameScore(nickname, score, mode);
      const fetchedRankings = await getGameRankings(mode);
      // @ts-ignore
      setRankings(fetchedRankings);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const submitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion) return;
    
    const parsedAnswer = parseInt(userAnswer, 10);
    if (isNaN(parsedAnswer)) return;

    if (parsedAnswer === currentQuestion.answer) {
      // Correct answer
      const newCombo = combo + 1;
      setCombo(newCombo);
      const comboBonus = Math.floor(newCombo / 3) * 5; 
      setScore(score + 10 + comboBonus);
      setCurrentQuestion(generateQuestion());
      setUserAnswer("");
    } else {
      // Wrong answer
      setCombo(0);
      setUserAnswer("");
      if (mode === "challenge") {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          endGame();
        } else {
          setCurrentQuestion(generateQuestion());
        }
      } else {
        setCurrentQuestion(generateQuestion());
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">🧮 정수 사칙연산 마스터</h2>
        <p className="text-blue-100 mt-2 font-medium">양의 정수와 음의 정수를 정복해보세요!</p>
      </div>

      <div className="p-8">
        {gameState === "start" && (
          <div className="flex flex-col items-center space-y-8 animate-in fade-in duration-500">
            <div className="w-full max-w-sm space-y-2">
              <label className="block text-sm font-semibold text-slate-700 ml-1">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="멋진 닉네임을 입력하세요"
                className="w-full px-5 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                maxLength={10}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <button
                onClick={() => startGame("time")}
                className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300 rounded-2xl transition-all hover:-translate-y-1"
              >
                <span className="text-4xl mb-3">⏱️</span>
                <span className="font-bold text-blue-700 text-lg">타임 어택</span>
                <span className="text-sm text-blue-500 mt-1">60초 동안 최대한 많이!</span>
              </button>
              
              <button
                onClick={() => startGame("challenge")}
                className="flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 hover:border-purple-300 rounded-2xl transition-all hover:-translate-y-1"
              >
                <span className="text-4xl mb-3">🔥</span>
                <span className="font-bold text-purple-700 text-lg">도전 문제</span>
                <span className="text-sm text-purple-500 mt-1">5번 틀리면 게임 종료!</span>
              </button>
            </div>
          </div>
        )}

        {gameState === "playing" && currentQuestion && (
          <div className="flex flex-col items-center space-y-8 animate-in zoom-in-95 duration-300">
            {/* Status Bar */}
            <div className="flex justify-between w-full px-4 py-3 bg-slate-50 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Score</span>
                <span className="text-2xl font-black text-blue-600">{score}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Combo</span>
                <span className={`text-xl font-black ${combo >= 3 ? 'text-orange-500 scale-110' : 'text-slate-700'} transition-transform`}>
                  {combo} 🔥
                </span>
              </div>
              <div className="flex flex-col items-end">
                {mode === "time" ? (
                  <>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Time</span>
                    <span className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                      {timeLeft}s
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lives</span>
                    <span className="text-2xl font-black tracking-widest text-red-500">
                      {'❤️'.repeat(lives)}{'🤍'.repeat(5 - lives)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Problem */}
            <div className="text-center py-8">
              <h3 className="text-5xl sm:text-6xl font-extrabold text-slate-800 tracking-tighter drop-shadow-sm">
                {currentQuestion.questionStr}
              </h3>
            </div>

            {/* Answer Input */}
            <form onSubmit={submitAnswer} className="w-full max-w-xs flex gap-2">
              <input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="flex-1 px-6 py-4 text-2xl text-center font-bold border-4 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                placeholder="정답"
              />
              <button 
                type="submit"
                className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xl shadow-lg transition-colors"
              >
                입력
              </button>
            </form>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="flex flex-col items-center space-y-6 animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-black text-slate-800">게임 종료! 🎉</h3>
              <p className="text-lg text-slate-500">{nickname}님의 최종 점수는?</p>
              <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 py-4">
                {score} 점
              </div>
            </div>

            <button
              onClick={() => setGameState("start")}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105"
            >
              다시 하기
            </button>

            {/* Leaderboard */}
            <div className="w-full mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="text-xl font-bold text-center text-slate-700 mb-4">🏆 명예의 전당 ({mode === 'time' ? '타임어택' : '도전문제'})</h4>
              
              {isSaving ? (
                <p className="text-center text-slate-400 py-4">결과 저장 및 랭킹 불러오는 중...</p>
              ) : (
                <div className="space-y-2">
                  {rankings.map((r, i) => (
                    <div key={r.id} className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-600' : i === 1 ? 'bg-slate-200 text-slate-600' : i === 2 ? 'bg-amber-100 text-amber-700' : 'bg-slate-50 text-slate-400'}`}>
                          {i + 1}
                        </span>
                        <span className="font-bold text-slate-700">{r.nickname}</span>
                      </div>
                      <span className="font-black text-blue-600">{r.score}</span>
                    </div>
                  ))}
                  {rankings.length === 0 && (
                    <p className="text-center text-slate-400 py-4">아직 랭킹이 없습니다. 첫 번째로 등록해보세요!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
