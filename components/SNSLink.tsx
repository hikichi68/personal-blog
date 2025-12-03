import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; // 💡 IconDefinitionはcoreからインポート

// リンクデータとアイコン定義をマッピング
interface SNSData {
    icon: IconDefinition;
    colorClass: string; // Tailwind CSSのテキスト色クラス
}

// 💡 渡された label に基づいてアイコンと色を決定するヘルパー
const getSNSIconAndColor = (label: string): SNSData => {
    switch (label) {
        case 'Twitter (X)':
            return { icon: faTwitter, colorClass: 'text-blue-400' };
        case 'Instagram':
            return { icon: faInstagram, colorClass: 'text-pink-500' }; 
        case 'Facebook':
            return { icon: faFacebook, colorClass: 'text-blue-600' };
        default:
            return { icon: faTwitter, colorClass: 'text-gray-400' }; 
    }
}


interface SNSLinkProps {
    href: string;
    label: string;
}

// 💡 export function の形式に変更
// Propの型付けは関数の引数に直接適用します
export function SNSLink({ href, label }: SNSLinkProps) {
    const { icon, colorClass } = getSNSIconAndColor(label);

    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-3 text-white hover:text-red-400 transition duration-200"
        >
            <FontAwesomeIcon 
                icon={icon} 
                className={`text-xl ${colorClass}`} 
            />
            
            <span className="text-sm">{label}</span>
        </a>
    );
};