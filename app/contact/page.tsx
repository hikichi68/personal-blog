"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// フォームの初期状態を定義
interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const INITIAL_FORM_STATE: FormState = {
    name: '',
    email: '',
    subject: 'ブログについてのお問い合わせ', 
    message: '',
};

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);

    // フォーム入力値の変更をハンドル
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // フォーム送信処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const dataToSend = new FormData();
        
        // CF7のタグ設定に合わせてキーを指定
        // お名前: [text* your-name]
        dataToSend.append('your-name', formData.name);       
        // メールアドレス: [email* your-email]
        dataToSend.append('your-email', formData.email);     
        // 件名: [select blog-451 ...]  <-- ここを修正しました！
        dataToSend.append('blog-451', formData.subject);     
        // メッセージ: [textarea* your-message]
        dataToSend.append('your-message', formData.message); 
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: dataToSend,
            });

            // レスポンスの内容を確認するためにJSONをパース
            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData(INITIAL_FORM_STATE);
            } else {
                console.error("API Error Detail:", result); // 詳細なエラーをコンソールに出す
                setStatus('error');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-red-600 inline-block pb-2 mb-4">
                    Contact
                </h1>
                <p className="text-gray-600">ご質問・ご相談など、お気軽にお問い合わせください。</p>
            </div>

            <div className="flex flex-col items-center justify-center">

                {/* お問い合わせフォーム */}
                <div className="w-full max-w-2xl">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                        {/* フォームステータス表示 */}
                        {status === 'success' && (
                            <div className="py-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                                    ✓
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">送信が完了しました</h3>
                                <p className="text-gray-600">内容を確認の上、折り返しご連絡いたします。</p>
                                <button onClick={() => setStatus('idle')} className="text-red-600 font-bold text-sm underline">
                                    別のメッセージを送る
                                </button>
                            </div>
                        )}
                        {/* エラー表示 */}
                        {status === 'error' && (
                            <div className="py-12 text-center space-y-4">
                                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                                    !
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">送信エラー</h3>
                                <p className="text-gray-600">送信中に問題が発生しました。時間をおいて再度お試しください。</p>
                                <button onClick={() => setStatus('idle')} className="text-red-600 font-bold text-sm underline">
                                    フォームに戻る
                                </button>
                            </div>
                        )}
                        
                        {/* フォーム本体 */}
                        {status !== 'success' && status !== 'error' && (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        {/* htmlFor と id で紐付け、autoComplete追加 */}
                                        <label htmlFor="name" className="text-xs font-bold text-gray-500 ml-1">お名前</label>
                                        <input 
                                            id="name"
                                            type="text" 
                                            name="name" 
                                            autoComplete="name"
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="山田 太郎" 
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold text-gray-500 ml-1">メールアドレス</label>
                                        <input 
                                            id="email"
                                            type="email" 
                                            name="email" 
                                            autoComplete="email"
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            required 
                                            placeholder="example@mail.com" 
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all" 
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-bold text-gray-500 ml-1">件名</label>
                                    <select 
                                        id="subject"
                                        name="subject" 
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all appearance-none"
                                    >
                                        <option>ブログについてのお問い合わせ</option>
                                        <option>ウェブサイト構築についてのお問い合わせ</option>
                                        <option>その他</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold text-gray-500 ml-1">メッセージ内容</label>
                                    <textarea 
                                        id="message"
                                        rows={5} 
                                        name="message" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="こちらにお問い合わせ内容をご記入ください。" 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-700/20 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
                                >
                                    {status === 'sending' ? (
                                        <span className="animate-pulse">送信中...</span>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                            <span>メッセージを送信する</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <Link href="/" className="text-gray-400 hover:text-red-600 transition text-sm font-medium">
                    ← トップページに戻る
                </Link>
            </div>
        </div>
    );
}