
import { getSortedChatsData } from "@/lib/chats"
import ChatItem from "./ChatItem"
import ChatNav from "./ChatNav"
import ChatInput from "./ChatInput"
import styles from "./chat.module.css"
import { type } from "os"

type Props = {
    response: string
}


export default async function Chats({response}: Props) {
    // no need to await, cause we have the data in the server, its get the data right away
    const chats = await getSortedChatsData()


    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <ChatNav />
            <div id="messages"
                className={`flex flex-col space-y-4 p-3 overflow-y-auto ${styles['scrollbar-thumb-blue']} ${styles['scrollbar-thumb-rounded']} ${styles['scrollbar-track-blue-lighter']} ${styles['scrollbar-w-2']} scrolling-touch`}>
                {chats.map((chat: any) => (
                    //console.log("testchat", chat),
                    <ChatItem key={chat.id} chat={chat} />
                    
                ))}
                {response}
            </div>
            <ChatInput />
        </div>
    )
}


