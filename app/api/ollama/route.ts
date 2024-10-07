import { LlmModel } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

const MODEL_PORTS: Record<LlmModel, number> = {
    mistral: 11434,
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { model } = body;

        if (!model || !MODEL_PORTS[model as LlmModel]) {
            return NextResponse.json(
                { error: "Invalid model specified" },
                { status: 400 }
            );
        }

        const BASE_URL = `http://localhost:${MODEL_PORTS[model as LlmModel]}`;

        const ollamaResponse = await fetch(`${BASE_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!ollamaResponse.ok) {
            throw new Error(`Failed to generate Ollama response: ${ollamaResponse.statusText}`);
        }

        const stream = new ReadableStream({
            async start(controller) {
                const reader = ollamaResponse.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    const chunk = new TextDecoder().decode(value);
                    const lines = chunk.split('\n').filter(line => line.trim() !== '');
                    for (const line of lines) {
                        try {
                            const json = JSON.parse(line);
                            controller.enqueue(JSON.stringify(json) + '\n');
                        } catch (e) {
                            console.error('Error parsing Ollama response:', e);
                        }
                    }
                }
                controller.close();
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'application/json',
                'Transformer-Encoding': 'chunked',
            },
        });
    } catch (error) {
        console.error('Error calling Ollama API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Ollama API route is working' });
}