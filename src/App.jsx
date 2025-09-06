import React, { useState, useEffect } from "react";
import "./App.css"; // CSS faylini ulash

// Savollarni yangilash
const questions = [
  // HTML Savollari
  { question: "HTML nima uchun ishlatiladi?", options: ["Styling", "Tuzilma", "Logika", "Ma'lumotlar bazasi"], answer: "Tuzilma" },
  { question: "HTMLda id va class atributlarining farqi nima?", options: ["class faqat stil uchun", "id bir martalab ishlatiladi", "id hamma elementlarga bir xil bo'lishi mumkin", "farqi yo'q"], answer: "id bir martalab ishlatiladi" },
  { question: "<a> tegining vazifasi nima?", options: ["Havola yaratish", "Rasm qo‘shish", "Tabiiy matn", "Formani yaratish"], answer: "Havola yaratish" },
  { question: "HTMLda forma yaratish uchun qanday teg ishlatiladi?", options: ["<form>", "<input>", "<div>", "<button>"], answer: "<form>" },
  { question: "HTMLda rasmni qo‘shish uchun qanday teg ishlatiladi?", options: ["<image>", "<img>", "<src>", "<figure>"], answer: "<img>" },

  // CSS Savollari
  { question: "CSS nima uchun ishlatiladi?", options: ["Stil va dizayn", "Ma'lumotlar bazasi", "Logika", "Tuzilma"], answer: "Stil va dizayn" },
  { question: "CSSda class va id selektorlarining farqi nima?", options: ["id faqat bitta element uchun ishlatiladi", "class har xil elementlar uchun ishlatiladi", "id kengaytirilgan", "farqi yo'q"], answer: "id faqat bitta element uchun ishlatiladi" },
  { question: "Flexbox va Gridning farqi nima?", options: ["Flexbox bir o‘lchovli, Grid esa ikki o‘lchovli", "Ikkalasi bir xil", "Grid faqat alignment uchun", "Flexbox elementni to‘g‘ri joylashtirish uchun"], answer: "Flexbox bir o‘lchovli, Grid esa ikki o‘lchovli" },
  { question: "CSSda rangni qanday belgilash mumkin?", options: ["`color: red;`", "`color: #ff0000;`", "`color: rgba(255, 0, 0, 1);`", "Barchasi to‘g‘ri"], answer: "Barchasi to‘g‘ri" },
  { question: "box-sizing xususiyati nima?", options: ["Elementning umumiy o‘lchamini hisoblash", "Elementning maksimal o‘lchamini belgilash", "Elementga to‘g‘ri joylashishni berish", "Elementning borderini ko‘rsatish"], answer: "Elementning umumiy o‘lchamini hisoblash" },

  // React Savollari
  { question: "React komponenti nima?", options: ["JS kodining tuzilishi", "HTML kodi", "UI qismlari", "CSS qism"], answer: "UI qismlari" },
  { question: "Reactda useState qanday ishlaydi?", options: ["Holatni o‘zgartiradi", "Komponentni qayta yaratadi", "Elementni CSS bilan o‘zgartiradi", "Funktsiyalarni o‘zgartiradi"], answer: "Holatni o‘zgartiradi" },
  { question: "Reactda props va state farqi nima?", options: ["Props faqat o‘qish uchun, state esa o‘zgartirish uchun", "Propsni o‘zgartirish mumkin", "Props va state bir xil", "State boshqa komponentlarga uzatiladi"], answer: "Props faqat o‘qish uchun, state esa o‘zgartirish uchun" },
  { question: "Reactda useEffect hooki nima uchun ishlatiladi?", options: ["Komponentni render qilish", "Holatni o‘zgartirish", "Tashqi ta’sirni boshqarish", "JSX yaratish"], answer: "Tashqi ta’sirni boshqarish" },
  { question: "JSX nima?", options: ["JavaScript kutubxonasi", "JavaScript kodining HTML shakli", "CSSni o‘z ichiga olgan skript", "JavaScriptdagi xato"], answer: "JavaScript kodining HTML shakli" },
];

function QuestionCard({ question, options, handleAnswer }) {
  return (
    <div className="card">
      <h2>{question}</h2>
      <div className="options">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(75);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (timer > 0 && !isFinished) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsFinished(true);
    }
  }, [timer, isFinished]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === shuffledQuestions[currentQuestion]?.answer) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < shuffledQuestions.length) {
      setCurrentQuestion(next);
    } else {
      setIsFinished(true);
    }
  };

  if (!shuffledQuestions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Dasturlash Quiz O‘yini</h1>
      {!isFinished ? (
        <>
          <div className="timer">Qolgan vaqt: {timer} sek</div>
          <QuestionCard
            question={shuffledQuestions[currentQuestion].question}
            options={shuffledQuestions[currentQuestion].options}
            handleAnswer={handleAnswer}
          />
        </>
      ) : (
        <div className="result">
          <h2>O‘yin tugadi!</h2>
          <p>To‘g‘ri javoblar soni: {score} / {shuffledQuestions.length}</p>
        </div>
      )}
    </div>
  );
}

export default App;
