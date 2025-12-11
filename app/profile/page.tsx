import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Profile",
    description: "バーテンダーのプロフィールと経歴。",
}

export default function ProfilePage() {
    return (
        <div className="py-12 px-4 md:px-8">
            <h1 className="text-4xl font-serif font-bold border-b-2 border-red-700 pb-3 mb-8">
                Profile
            </h1>
            <p className="text-lg text-gray-700">
                （バーテンダーとしてのプロフィール情報を記載する予定です。）
            </p>
        </div>
    );
}