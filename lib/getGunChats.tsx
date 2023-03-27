import path from 'path'
import fs from 'fs';

// const gun = Gun({
//     peers: ['https://chat.valiantlynx.com/gun'],
// });

interface ChatMessage {
    id: string;
    title: string;
    date: string;
    owner: string;
    contentHtml: string;
}

const chatsDirectory = path.join(process.cwd(), 'chatmessages')

export async function getGunChats() {
 
    let messages: ChatMessage[] = [];

    const fileNames = fs.readdirSync(chatsDirectory)
    const messagesJson: any = fileNames.map(async (fileName) => {
        // Remove ".json" from file name to get id
        const id = fileName.replace(/\.json$/, '')
        console.log('id:', id);

        // Read JSON file as string
        const fullPath = path.join(chatsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Parse JSON file into messages array
        if(fileContents !== undefined && fileContents !== null) {
            messages = JSON.parse(fileContents);
        }

        // // Get chats from GunJS with the same ID as the file
        // gun.get(`${id}`).map().on((m: any) => {
        //     if (m !== null && m !== undefined) {
        //         const message: ChatMessage = {
        //             id,
        //             title: m.message,
        //             date: m.time,
        //             owner: m.username,
        //             contentHtml: m.message,
        //         }
        //         messages.push(message);

        //         // Write updated messages array to JSON file
        //         const messagesJson = JSON.stringify(m);
        //         console.log('messagesJson:', messagesJson);
        //         fs.writeFileSync(fullPath, messagesJson, 'utf8');
        //     }
        // });
    })

    //console.log('Returning messages:', messages);

    return messages;
}
