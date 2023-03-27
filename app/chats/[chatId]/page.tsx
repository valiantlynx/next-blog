import { getSortedChatsData, getChatData } from "@/lib/chats"
import {notFound} from "next/navigation"
import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"


//turn the ssr to ssg
export async function generateStaticParams() {
    const chats = await getSortedChatsData() // deduped

    return chats.map((chat) => ({
        chatId: chat.id,
    }))
}

export async function generateMetadata({params}: {params: {chatId: string}}) {
    const chats = await getSortedChatsData() // deduped
    const {chatId} = params

    const chat = chats.find((chat) => chat.id === chatId)

    if (!chat) {
        return {
            title: 'chat Not Found',
        }
    }

    const {title, date, contentHtml} = await getChatData(chatId)

    return {
        title: "Chat: " + title + " | " + getFormattedDate(date) + " | " + "Valiantlynx.com Chat App",
        description: contentHtml,
    }
}

export default async function Chat({params}: {params: {chatId: string}}) {
    const chats = await getSortedChatsData() // deduped
    const {chatId} = params

    if (!chats.find((chat) => chat.id === chatId)) {
        return notFound()
    }

    const {title, date, contentHtml} = await getChatData(chatId)

    const formattedDate = getFormattedDate(date)


  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
        <h1 className="text-3xl mt-4 mb-0">{title}</h1>
        <p className="mt-0">{formattedDate}</p>
        <article>
            <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
            <p>
                <Link href="/" > 🏡 Back to home 🏠 </Link>
            </p>
        </article>
    </main>
  )
}
