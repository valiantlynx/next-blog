import { pb } from '@/lib/pocketbase/pb'
import { useState } from 'react'

export default function ChatInput() {
    const [newMessage, setNewMessage] = useState<string>('');
    const [chatInput, setChatInput] = useState<string>('');

    const handleAI = async (createdMessage: string) => {
        // api call to chatai here
        console.log("chatInput being sent to chataiEndpoint: ", createdMessage)
        const chataiEndpoint = (chatInput: string) => `http://localhost:3000/api/chatai?chatInput=${chatInput}`;

        console.log("chataiEndpoint: ", chataiEndpoint(chatInput))

        //send the chatInput to the chataiEndpoint api to get the chatOutput
        fetch(chataiEndpoint(chatInput)).then((res) => {
                //console.log("res: ", res)
                return res.json();
            })
            .then(async (data) => {
                console.log("data from chatinput.tsx: ", data.result)

                const pocketbaseData = {
                    text: newMessage + data.result,
                    user: "valiantlynx_ai1",
                };

                const createdMessageAi = await pb.collection('messages').create(pocketbaseData);
                console.log("createdMessageAi: ", createdMessageAi.text)
                return data.result;
            })
    }


    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("newMessage: ", newMessage)
       
        try {
            const data = {
                text: newMessage,
                user: pb.authStore.model?.id,
            };
            const createdMessage = await pb.collection('messages').create(data);
            console.log("createdMessage: ", createdMessage.text)
            handleAI(createdMessage.text);

            setNewMessage('');

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <form onSubmit={sendMessage} className="relative flex">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <button type="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                        </svg>
                    </button>
                </span>
                <input type="text" placeholder="Write your message!" className="form-input w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3 pl-12" value={newMessage} onChange={(e) => {
                    setNewMessage(e.target.value);
                    setChatInput(e.target.value);
                }} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button type="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                        </svg>
                    </button>

                    <button className="btn btn-circle btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </button>

                    <button className="btn btn-circle btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </button>

                    <button className="btn btn-gray rounded-lg transition duration-500 ease-in-out hover:bg-gray-400 focus:outline-none">
                        <span className="font-bold">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 ml-2 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>

                </div>
            </form>
        </div>
    )
}
