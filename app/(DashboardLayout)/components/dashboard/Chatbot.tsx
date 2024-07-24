// "use client";

// import { useChat } from "ai/react";
// import { ChatInput, ChatMessages } from "./ui/chat";

// export default function ChatbotUI() {
// 	const { messages, input, isLoading, handleSubmit, handleInputChange, reload, stop } = useChat();

// 	return (
// 		<main className="flex min-h-screen flex-col items-center gap-10 p-24 bg-gradient-to-bl from-slate-300 to-blue-50">
// 			{/* <h1 className="font-bold">Finance Recommender</h1> */}
//             {/* <ChatMessages messages={messages} isLoading={isLoading} reload={reload} stop={stop} /> */}
// 			<ChatInput
// 				input={input}
// 				handleSubmit={handleSubmit}
// 				handleInputChange={handleInputChange}
// 				isLoading={isLoading}
// 				multiModal
// 			/>
// 		</main>
// 	);
// }



// // Sample App 

import React, { useState } from 'react';
import './ChatApp.css';
import BaseCard from "../shared/DashboardCard";


const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate a response from ChatGPT
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a response', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">ChatGPT Interface</div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
      <button className="attachment-button">📎</button>

        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="chat-send-button" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
