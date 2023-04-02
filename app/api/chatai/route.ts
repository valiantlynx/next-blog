import { NextResponse } from "next/server";
import aiChatbotWithLangchain from "@/lib/aiChatbotWithLangchain"

export async function GET(request: Request) {
    console.log("connected to chatai route, GET request received")

    const { searchParams } = new URL(request.url);

    // console.log("searchParams", searchParams)

    const chatInput: any = searchParams.get("chatInput");
    
    console.log("chatInput", chatInput)

    const result = await aiChatbotWithLangchain({ chatInput })

    console.log("result ai api: ", result)

    return NextResponse.json({ result })
}