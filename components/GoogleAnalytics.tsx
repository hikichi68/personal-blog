"use client";

import React from 'react';
import Script from 'next/script';

// 💡 追跡IDをpropsとして受け取る (再利用性を高める)
interface GoogleAnalyticsProps {
    trackingId: string; // 例: G-3NSB7W1M61
}

/**
 * Google Analytics (GA4) のトラッキングコードを埋め込むコンポーネント
 */
export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId }) => {
    // trackingId がなければ何もレンダリングしない
    if (!trackingId) {
        return null;
    }

    return (
        <>
            {/* 1. gtag.js の非同期読み込み */}
            <Script 
                strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} 
            />

            {/* 2. gtag の初期化と設定 */}
            <Script id="google-analytics-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${trackingId}');
                `}
            </Script>
        </>
    );
};