"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Operation = "+" | "-" | "*" | "/";

export default function MathGame() {
  const [score, setScore] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<Operation>("+");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblem = useCallback(() => {
    const ops: Operation[] = ["+", "-", "*", "/"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    let a = 0;
    let b = 0;

    if (op === "+") {
      a = Math.floor(Math.random() * 50) + 1;
      b = Math.floor(Math.random() * 50) + 1;
    } else if (op === "-") {
      a = Math.floor(Math.random() * 50) + 20;
      b = Math.floor(Math.random() * 20) + 1;
    } else if (op === "*") {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
    } else if (op === "/") {
      b = Math.floor(Math.random() * 10) + 2;
      const result = Math.floor(Math.random() * 10) + 2;
      a = b * result;
    }

    setNum1(a);
    setNum2(b);
    setOperation(op);
    setAnswer("");
    setFeedback(null);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer) return;
    
    const userAnswer = parseInt(answer, 10);
    if (isNaN(userAnswer)) return;

    let correctAnswer = 0;
    switch (operation) {
      case "+": correctAnswer = num1 + num2; break;
      case "-": correctAnswer = num1 - num2; break;
      case "*": correctAnswer = num1 * num2; break;
      case "/": correctAnswer = num1 / num2; break;
    }

    if (userAnswer === correctAnswer) {
      setScore(s => s + 10);
      setFeedback("correct");
      setTimeout(generateProblem, 800);
    } else {
      setScore(s => Math.max(0, s - 5));
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        {/* Score Display */}
        <div className="absolute top-6 right-6 bg-slate-100/80 px-4 py-2 rounded-full font-bold text-slate-700 shadow-sm border border-slate-200">
          점수: <span className="text-emerald-600 text-lg">{score}</span>
        </div>

        <div className="text-center mb-10 mt-2">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
            사칙연산 챌린지 🧮
          </h2>
          <p className="text-slate-500 mt-2 font-medium">빠르게 계산하고 점수를 올려보세요!</p>
        </div>

        {/* Problem Display */}
        <div className="flex justify-center items-center gap-4 text-5xl sm:text-6xl font-black text-slate-800 mb-10 py-8 bg-slate-50/80 rounded-2xl shadow-inner border border-slate-200">
          <span className="w-20 text-right">{num1}</span>
          <span className="text-teal-500 drop-shadow-sm">{operation}</span>
          <span className="w-20 text-left">{num2}</span>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="정답 입력"
              className={`w-full text-center text-3xl font-bold px-5 py-5 rounded-2xl border-2 transition-all shadow-sm focus:outline-none focus:ring-4 ${
                feedback === 'correct' ? 'bg-emerald-50 border-emerald-400 text-emerald-700 focus:ring-emerald-200' :
                feedback === 'wrong' ? 'bg-rose-50 border-rose-400 text-rose-700 focus:ring-rose-200 animate-pulse' :
                'bg-white border-slate-200 text-slate-800 focus:border-teal-500 focus:ring-teal-100'
              }`}
            />
            {feedback === 'correct' && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl animate-bounce">✨</div>
            )}
            {feedback === 'wrong' && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl">❌</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-teal-500 hover:from-teal-400 to-emerald-500 hover:to-emerald-400 text-white font-bold text-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            정답 확인
          </button>
        </form>
      </div>
    </div>
  );
}
