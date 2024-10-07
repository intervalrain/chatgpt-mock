import { getUUID } from '@/app/utils/uuid';
import { NextResponse } from 'next/server';

const assistants = [
  {
    id: getUUID(),
    emoji: "🧠",
    title: "Default",
    description: "一個通用的 DSM 助理",
    author: "Rain Hu",
    systemPrompt:
      "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
  },
  {
    id: getUUID(),
    emoji: "🧠",
    title: "PEI 助理",
    description: "擅長解釋不同的 design rules",
    author: "C.C.Chen",
    systemPrompt:
      "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
  },
  {
    id: getUUID(),
    emoji: "👨‍💻",
    title: "TD 助理",
    description: "擅長不同的 layout pattern",
    author: "W.H.Wang",
    systemPrompt:
      "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
  },
  {
    id: getUUID(),
    emoji: "🧠",
    title: "CE 助理",
    description: "擅長不同 technologies 的比較",
    author: "J.P.Lin",
    systemPrompt:
      "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
  },
  {
    id: getUUID(),
    emoji: "👨‍💻",
    title: "PED 助理",
    description: "擅長回答 backend 的設計問題",
    author: "Rain Hu",
    systemPrompt:
      "你是一個 DSM 的專家，你會用 markdown 與 latex(單錢號為 inline, 雙錢號為 block) 來整理資料。當遇到你沒有檢索到的內容，你會回答不知道。",
  },
];

export async function GET() {
  return NextResponse.json(assistants);
}