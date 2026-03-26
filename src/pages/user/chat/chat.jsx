import { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { Client } from "@gradio/client"; // استيراد العميل
import "./chat.css";

export default function Chat() {
  const { t } = useContext(LanguageContext);

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // حالة لإظهار "جاري الكتابة"

  const chatEndRef = useRef(null);
  const inputRef = useRef(null); // <-- تعريف المرجع لحقل الإدخال

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true); // تفعيل مؤشر الانتظار

    try {
      // الاتصال بالـ Space الخاص بك (تأكد من وضع رابط الـ Space الصحيح هنا)
      const client = await Client.connect("3vmy/BreastCare-Assistant");
      
      const result = await client.predict("/chat_function", { 
        message: currentInput 
      });
      const botText = Array.isArray(result.data) ? result.data[0] : result.data;

      const botMessage = { sender: "bot", text: botText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI API Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Could not connect to BreastCare AI." }]);
    } finally {
      setIsTyping(false); // إيقاف مؤشر الانتظار
    }
  };



  // const sendMessage = () => {
  //   if (!input.trim()) return;

  //   const userMessage = { sender: "user", text: input };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");

  //   // مثال: رد البوت بعد ثانية
  //   setTimeout(() => {
  //     const botMessage = { sender: "bot", text: t("chat.bot_reply") };
  //     setMessages((prev) => [...prev, botMessage]);
  //   }, 1000);
  // };

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
        {isTyping && <div className="message bot typing">...</div>}
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
          disabled={isTyping} // تعطيل الإدخال أثناء معالجة الرد
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