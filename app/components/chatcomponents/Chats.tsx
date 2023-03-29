
import { getSortedChatsData } from "@/lib/chats"
import ChatItem from "./ChatItem"
import ChatNav from "./ChatNav"
import ChatInput from "./ChatInput"
import styles from "./chat.module.css"
import Link from "next/link"
import Image from "next/image"

type Props = {
    response: string
}

export default async function Chats({ response }: Props) {
    // no need to await, cause we have the data in the server, its get the data right away
    const chats = await getSortedChatsData()


    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <ChatNav />
            <div id="messages"
                className={`flex flex-col space-y-4 p-3 overflow-y-auto 
                ${styles['scrollbar-thumb-blue']} 
                ${styles['scrollbar-thumb-rounded']}
                ${styles['scrollbar-track-blue-lighter']} 
                ${styles['scrollbar-w-2']} scrolling-touch`}>

                {chats.map((chat) => (
                    //console.log("testchat", chat),
                    //sends an error
                    // <ChatItem chat={chat} key={chat.id} />
                    <div className="chat-message" key={chat.id} >
                        <div className="flex items-end justify-end">
                            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                <div><Link href={`/chats/${chat.id}`} className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white no-underline ">{chat.title}</Link></div>
                                <p className="text-sm mt-1">
                                    {chat.date}
                                </p>
                            </div>
                            <Image src={`https://avatars.dicebear.com/api/human/${chat.owner}.svg`} alt={`The profile of ${chat.owner}`} className="w-6 h-6 rounded-full order-2" />
                        </div>
                    </div>
                ))}


            </div>
            <ChatInput />
        </div>
    )
}


