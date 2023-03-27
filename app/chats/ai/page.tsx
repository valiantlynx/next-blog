import { OpenAI } from 'langchain/llms';

// import dotenv from 'dotenv';
import dotenv from 'dotenv';
import Chats from '@/app/components/chatcomponents/Chats';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ openAIApiKey: openaiApiKey });

export default async function page() {
    async function sendMessageToOpenAI(message: string): Promise<string> {
        const res = await openai.call(message);
        return res;
    }
    const message = 'Hello, how are you?';
    const response = await sendMessageToOpenAI(message);
    console.log(response);
    return (
        <div>
            <Chats response={response} />            
            </div>
    )
}
