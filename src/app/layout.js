'use client'

import { useEffect, useState } from 'react';
import { Markazi_Text } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { AppProvider } from '../components/AppContext';
import { Toaster } from 'react-hot-toast';

const markazi = Markazi_Text({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function Layout({ children }) {
	const [markaziState, setMarkazi] = useState(null);

	useEffect(() => {
		setMarkazi(markazi);
	}, []);

	return (
		<html lang="en" className="scroll-smooth">
			<body className={markaziState?.className}>
				<main>
					<AppProvider>
						<div className="content">
							<Toaster/>
							<Header />
							{children}
						</div>
						<footer className='border-t text-center mt-10 opacity-30 p-4 z-50'>
							&copy; 2024 All right reserved
						</footer>
					</AppProvider>
				</main>
			</body>
		</html>
	);
}
