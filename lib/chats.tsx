
// there will be a specific chat for each blog Chat
import { getGunChats } from "./getGunChats"

const chatPlaceholderData = [
    {
        id: 'Admin',
        title: 'Admin',
        date: '2021-01-01',
        owner: 'Admin',
        contentHtml: 'Be respectful to others and have fun!',
    }
]


export async function getSortedChatsData() {
    
    // Get the chats from gunjs
    const gunChats = await getGunChats()

    //console.log("gunChats", gunChats)

    // Combine the gun chats with the placeholder data
    chatPlaceholderData.push(...gunChats)

   
    const allChatsData = gunChats.map((chat) => {
        // Get the chat id
        const id = chat.id

        // Combine the data with the id
        const blogChat: BlogChat = {
            id,
            title: chat.title,
            date: chat.date,
            owner: chat.owner,
            contentHtml: chat.contentHtml,
        }

        return blogChat
    })


    // Sort chats by date
    return allChatsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })

}

// get one chat by id
export async function getChatData(id: string) {
    // Get the chat id    
    const chat: any = chatPlaceholderData.find((chat) => chat.id === id)

    const contentHtml = chat.contentHtml ?? 'oops! no content for this chat yet, please check back later or contact the owner of this chat to see if they have any updates for you.'

    const blogChatWithHTML: BlogChat & { contentHtml: string } = {
        id,
        title: chat.title,
        date: chat.date,
        owner: chat.owner,
        contentHtml,
    }

    // Combine the data with the id and contentHtml
    return blogChatWithHTML

}

