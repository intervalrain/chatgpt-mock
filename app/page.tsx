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

export default Home;