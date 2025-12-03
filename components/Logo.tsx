import Link from 'next/link';
interface LogoProps {
    className?: string;
    boxOn?: boolean;
}

// 共通で常に適用するスタイル
const baseStyle = "inline-block py-4 px-8 text-xl font-bold rounded";

// boxOn が true のときに適用するスタイル
const activeBoxStyle = "bg-red-700 text-white shadow-lg";

// boxOn が false のときに適用するスタイル (例として)
const inactiveBoxStyle = "bg-gray-100 text-gray-800 border border-gray-300";


export function Logo({ className = '',boxOn = false}: LogoProps) {
    const dynamicStyle = boxOn ? activeBoxStyle : inactiveBoxStyle;
    return (
        <Link href="/"
        className={`${baseStyle} ${dynamicStyle} ${className}`}
        >
            Royal Chord
        </Link>
    )
}