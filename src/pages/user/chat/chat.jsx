import { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import "./chat.css";

export default function Chat() {
  const { t } = useContext(LanguageContext);

  const [messages, setMessages] = useState([
    { sender: "bot", text: t("chat.welcome") },
  ]);
  const [input, setInput] = useState("");

  const chatEndRef = useRef(null);
  const inputRef = useRef(null); // <-- تعريف المرجع لحقل الإدخال

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // مثال: رد البوت بعد ثانية
    setTimeout(() => {
      const botMessage = { sender: "bot", text: t("chat.bot_reply") };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // تمرير Scroll تلقائي للرسائل الجديدة
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // التركيز على حقل الإدخال عند تحميل الصفحة
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="chat-fullpage">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder={t("chat.placeholder")}
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={input.trim() === ""}
          className={input.trim() === "" ? "disabled-btn" : ""}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </div>
  );
}