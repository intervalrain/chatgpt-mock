export interface Conversation {
  id: string;
  title: string;
  date: Date;
}

export const mockConversations: Conversation[] = [
  { id: "1", title: "AI Ethics Discussion", date: new Date() },
  {
    id: "2",
    title: "Machine Learning Basics",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Next.js vs React",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "TypeScript Best Practices",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Quantum Computing Intro",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    title: "Blockchain Fundamentals",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: "7",
    title: "Cybersecurity Trends",
    date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
  },
  {
    id: "8",
    title: "Cloud Computing Services",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
];
