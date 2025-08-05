import React, { useState } from "react";
import axios from "axios";



function GeminiConsultant() {
  const [userInput, setUserInput] = useState("");
  const [answer, setAnswer] = useState([]);

  const ask = () => {
    if (!userInput.trim()) return;

    axios
      .post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAtOX-Yvymqz8ogViLD1EyzdqLPK85W3wQ",
        {
          contents: [
            {
              parts: [
                {
                  text: userInput + "\Мне нужны информации только касательно про коррупцию.",
                },
              ],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setAnswer([
          ...answer,
          {
            answer:
              response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Нет ответа.",
            question: userInput,
          },
        ]);
        setUserInput("");
      })
      .catch((error) => {
        console.error("Қате:", error);
        alert("Ошибка при анализе Gemini API.");
      });
  };

  return (
    <div className="gemini-container">
      <h2>🤖 Ваш помощник Gemeni!</h2>
        <div className="qa-list">
        {answer.map((n, i) => (
          <div key={i} className="qa-card">
            <p><b>Вопрос:</b> {n.question}</p>
            <p><b>Ответ:</b> {n.answer}</p>
          </div>
        ))}
      </div>
     <div className="input-area">
  <input
    type="text"
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
    placeholder="Например: Что такое коррупция?"
  />
  <button onClick={ask}>Спросить</button>
</div>


    
    </div>
  );
}

export default GeminiConsultant;