import type { Metadata } from "next";
import { Header } from '../components/Header'; 
import { Footer } from '../components/Footer';
import { LeftSidebar } from '../components/LeftSidebar'; 
import RightSidebar from '../components/RightSidebar'; 
import { GoogleAnalytics } from '../components/GoogleAnalytics';

import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false


const BASE_URL = 'https://barhik.tokyo/';
const GA_TRACKING_ID = 'G-3NSB7W1M61';

export const metadata: Metadata = {
	title: {
		default:"The Bartender's Memoir",
		template: "%s | The Bartender's Memoir",
	},
	description: "プロのバーテンダーが贈る、カクテル、ウイスキー、バーの作法に関する教養ブログです。",
	icons: {
		icon: '/favicon.ico',
	},

	metadataBase: new URL(BASE_URL),
	
	openGraph: {
		title: "The Bartender's Memoir",
		description: "プロのバーテンダーが贈る、カクテル、ウイスキー、バーの作法に関する教養ブログです。",
		url: BASE_URL,
		siteName: "The Bartender's Memoir",
		images: [
			{ 
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "The Bartender's Memoir",
			},
		],
		locale: "ja_JP",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`antialiased flex flex-col min-h-screen font-sans text-gray-800 bg-gray-50`}>
				<Header className="z-50 sticky top-0" />
				<main className="
					flex-grow 
					max-w-7xl mx-auto w-full 
					/* PC: 3列グリッド */
					grid grid-cols-1 lg:grid-cols-[150px_1fr_300px] gap-0 lg:gap-8
					overflow-visible
				">

					<LeftSidebar className="hidden lg:block"/> 
					<div className="p-4 lg:py-8 flex-grow order-1 lg:order-none w-full min-h-0"> 
						{children} 
					</div>
					<RightSidebar className="order-2 lg:order-none" /> 
				</main>

				<Footer /> 	

				{/* ======================================================= */}
				{/*  google analytics */}
				{/* ======================================================= */}
				<GoogleAnalytics trackingId={GA_TRACKING_ID} />
			</body>
		</html>
	)
}