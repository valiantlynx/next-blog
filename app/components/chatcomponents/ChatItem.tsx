import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"
import { getChatData } from "@/lib/chats"

type Props = {
    chat: BlogChat
}

export default async function ChatItem({ chat }: Props) {
    const { title, date, id, owner, contentHtml } = await getChatData(chat.id)
    
    const formattedDate = getFormattedDate(date)
    

    return (owner !== "anderson" ?
        <div className="chat-message">
            <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div><Link href={`/chats/${id}`} className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 no-underline">{contentHtml}</Link></div>
                    <p className="text-sm mt-1">
                        {formattedDate}
                    </p>
                </div>
                <img src={`https://avatars.dicebear.com/api/human/${owner}.svg`} alt={`The profile of ${owner}`} className="w-6 h-6 rounded-full order-1" />
            </div>
        </div>
        :
        <div className="chat-message">
            <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div><Link href={`/chats/${id}`} className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white no-underline ">{contentHtml}</Link></div>
                    <p className="text-sm mt-1">
                        {formattedDate}
                    </p>
                </div>
                <img src={`https://avatars.dicebear.com/api/human/${owner}.svg`} alt={`The profile of ${owner}`} className="w-6 h-6 rounded-full order-2" />
            </div>
        </div>
    )
}