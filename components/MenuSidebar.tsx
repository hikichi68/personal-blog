import Link from 'next/link';
// next/image を使用しないため、インポートは不要

const menuCategories = [
    { label: 'フルコース', slug: 'full-course', imageSrc: '/images/full-course.png' }, 
    { label: 'アラカルト', slug: 'dish', imageSrc: '/images/dish.png' },
    { label: 'ウイスキー', slug: 'whiskey', imageSrc: '/images/whiskey.png' },
    { label: 'ブランデー', slug: 'brandy', imageSrc: '/images/brandy.png' },
    { label: 'スピリッツ', slug: 'spirits', imageSrc: '/images/spirits.png' },
    { label: 'カクテル', slug: 'cocktail', imageSrc: '/images/cocktail.png' },
    { label: 'デザート', slug: 'dessert', imageSrc: '/images/dessert.png' },
];

// 汎用的な画像表示コンポーネント
// Next.jsのImageコンポーネントは使用せず、通常の<img>タグに統一します。
const CategoryImage = ({ src, alt }: { src: string, alt: string }) => {
    const baseClasses = "object-cover transform transition-transform duration-300 group-hover:scale-105 w-full h-full";
    
    // 外部URLを直接使用するため、生の <img> タグで十分です
    return (
        <img 
            src={src} 
            alt={alt} 
            className={baseClasses} 
        />
    );
};

export default function MenuSidebar() {
    return (
        <aside className="w-full lg:w-64 p-4 lg:p-0">
            <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    <span className="text-red-600">|</span> カテゴリ
                </h3>
                <nav>
                    <ul className="space-y-3">
                        {menuCategories.map((cat) => (
                            <li key={cat.slug}>
                                <Link 
                                    href={`/menu/category/${cat.slug}`} 
                                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition duration-150 group"
                                >
                                    {/* 💡 画像/アイコンエリア */}
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0 shadow-md">
                                        <CategoryImage
                                            src={cat.imageSrc}
                                            alt={cat.label}
                                            // isLocalフラグは不要になったため削除
                                        />
                                    </div>
                                    {/* ラベル */}
                                    <span className="text-lg font-semibold text-gray-700 group-hover:text-red-600 transition">
                                        {cat.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}