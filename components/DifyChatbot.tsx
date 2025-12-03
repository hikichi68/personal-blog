"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faXmark, faPaperPlane, faRobot, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';

// メッセージの型定義
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

// 💡 最初の挨拶メッセージをここで設定
const INITIAL_MESSAGE: Message = {
    id: 1,
    text: '私はBartt、Royal Chordのコンシェルジュです。ご予約、メニュー、ウイスキーについて何でも聞いてくださいね。',
    sender: 'bot',
};

// =================================================================
// 💡 Dify Custom Chat UI Component
// =================================================================
export const DifyCustomChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // メッセージが追加されるたびに一番下までスクロール
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // ローカルAPIルートを呼び出してDifyからの返答を取得する関数
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input.trim(), sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Next.jsのAPIルートに質問を送信
      const response = await fetch('/api/dify-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await response.json();

      if (!response.ok) {
        // APIルートからのエラーメッセージをボットとして表示
        const errorMessage = data.error || '不明なエラーが発生しました。';
        const errorBotMessage: Message = { id: Date.now() + 1, text: `エラー: ${errorMessage}`, sender: 'bot' };
        setMessages((prev) => [...prev, errorBotMessage]);
        return;
      }
      
      // 2. 成功した場合、回答を画面に追加
      const botMessage: Message = { id: Date.now() + 1, text: data.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("API Call Failed:", error);
      const errorMessage: Message = { id: Date.now() + 1, text: 'ネットワーク接続または予期せぬエラーが発生しました。', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // =================================================================
  // 🎨 UI: Tailwind CSSによるデザイン (テーマカラー: 赤)
  // =================================================================
  return (
    // 画面の右下に固定配置
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* 1. チャットウィンドウ */}
      {isOpen && (
        <div 
          className="bg-white rounded-xl shadow-2xl w-80 md:w-96 h-[500px] flex flex-col overflow-hidden border border-gray-200"
          style={{ width: '24rem', height: '40rem' }} // Difyの埋め込みと同じサイズを適用
        >
          {/* ヘッダー */}
          <div className="bg-red-700 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faRobot} className="text-xl" />
              <h3 className="text-lg font-bold">Bartt コンシェルジュ</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl hover:opacity-80 transition">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* メッセージ表示エリア */}
          <div 
            ref={chatWindowRef} 
            className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50" // 💡 背景色をわずかに暗く (bg-gray-50)
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* ボットアイコン (左側) */}
                {msg.sender === 'bot' && (
                    <FontAwesomeIcon icon={faRobot} className="w-6 h-6 mr-2 text-red-700 flex-shrink-0" />
                )}
                
                {/* メッセージバブル */}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm shadow-sm transition duration-300
                    ${msg.sender === 'user' 
                      ? 'bg-red-700 text-white rounded-br-none' // ユーザー：赤背景
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200' // ボット：白背景
                    }
                    ${msg.sender === 'bot' ? 'whitespace-pre-wrap' : ''}
                    `
                  }
                >
                  {/* エラーメッセージの場合、赤文字で強調 */}
                  {msg.text.startsWith('エラー:') ? (
                    <span className="font-bold text-red-500 block">{msg.text}</span>
                  ) : (
                    msg.text
                  )}
                </div>

                {/* ユーザーアイコン (右側) */}
                {msg.sender === 'user' && (
                    <FontAwesomeIcon icon={faUser} className="w-6 h-6 ml-2 text-red-700 flex-shrink-0" />
                )}
              </div>
            ))}
            
            {/* ローディング表示 */}
            {isLoading && (
                <div className="flex justify-start">
                    <FontAwesomeIcon icon={faRobot} className="w-6 h-6 mr-2 text-red-700 flex-shrink-0 animate-bounce" />
                    <div className="bg-white text-gray-800 rounded-xl rounded-tl-none px-3 py-2 text-sm border border-gray-200">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-1" />
                        Barttが考え中...
                    </div>
                </div>
            )}
          </div>

          {/* 入力フォーム */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Barttと話す..."
              id="chat-input"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-red-700 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-red-700 text-white p-2 rounded-r-lg hover:bg-red-800 transition disabled:opacity-50"
              disabled={!input.trim() || isLoading}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
            </button>
          </form>
        </div>
      )}

      {/* 2. 開閉ボタン (バブル) - 赤色固定 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ease-in-out
          ${isOpen ? 'bg-red-700 rotate-45' : 'bg-red-700 hover:bg-red-800'}
        `}
      >
        <FontAwesomeIcon 
          icon={isOpen ? faXmark : faMessage} 
          className="text-white text-2xl" 
        />
      </button>
    </div>
  );
};