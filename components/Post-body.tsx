import React from 'react';

interface PostBodyProps {
    children: React.ReactNode;
    className?: string;

}

export function PostBody({ children }: PostBodyProps) {
    return (
        <div className="mg-6">
            <h2>Post Body</h2>
            {children}
        </div>
    )
}