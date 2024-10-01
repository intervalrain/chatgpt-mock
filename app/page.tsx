import Link from "next/link";
import ChatInterface from "./components/ChatInterface/ChatInterface";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<main className="flex-1 overflow-hidden">
				<ChatInterface />
			</main>
			<Footer />
		</div>
	);
}

// const Home: React.FC = () => {
// 	return (
// 		<div className="flex flex-col items-center justify-center min-h-screen py-2">
// 			<main className="flex flex-col items-center justify-center w-full flex-1 px-2 text-center">
// 				<h1 className="text-6xl font-bold">
// 					Welcome to{' '}
// 					<a className="text-blue-600" href="https://nextjs.org">
// 						ChatGPT clone
// 					</a>
// 				</h1>				
// 				<p className="mt-3 text-2xl">
// 					Get started by loggin in or creating a new chat
// 				</p>
// 				<div className="flex mt-6">
// 					<Link href="/chat" className="mx-3 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
// 						New Chat
// 					</Link>
// 					<Link href="/login" className="mx-3 bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded border border-black">
// 						Login
// 					</Link>
// 				</div>
// 			</main>
// 		</div>	
// 	);
// };

export default Home;