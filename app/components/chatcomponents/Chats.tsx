"use client"
import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase/pb'
import ChatNav from "./ChatNav"
import ChatInput from "./ChatInput"
import styles from "./chat.module.css"
import Link from "next/link"
import Image from "next/image"

export default function Chats() {
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    let unsubscribe: (() => void) | undefined;

    useEffect(() => {
       
        const fetchData = async () => {
            try {

                // Get initial messages
                const resultList = await pb.collection('messages').getList(1, 50, {
                    sort: 'created',
                    expand: 'user',
                });


                //console.log("resultList: ", resultList.items)
                setMessages(resultList.items as unknown as Message[]);

                //console.log("messages: ", messages)

                // Subscribe to realtime messages
                unsubscribe = await pb
                    .collection('messages')
                    .subscribe('*', async ({ action, record }) => {
                        if (action === 'create') {
                            // Fetch associated user
                            const user = await pb.collection('users').getOne(record.user);
                            record.expand = { user };
                            setMessages((messages) => [...messages, record] as Message[]);

                        }
                        if (action === 'delete') {
                            setMessages((messages) =>
                                messages.filter((m) => m.id !== record.id)
                            );
                        }
                    });
            } catch (err) {
                console.error("error: " + err);
            }
        };

        fetchData();

        return () => {
            unsubscribe?.();
        };
    }, []);

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //console.log("newMessage id: ", pb.authStore.model?.id)
            const data = {
                text: newMessage,
                user: pb.authStore.model?.id,
            };
            const createdMessage = await pb.collection('messages').create(data);
            setNewMessage('');
        } catch (err) {
            console.error("err", err);
        }
    };

    return (
        <>
            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                <ChatNav />
                <div id="messages"
                    className={`flex flex-col space-y-4 p-3 overflow-y-auto 
                ${styles['scrollbar-thumb-blue']} 
                ${styles['scrollbar-thumb-rounded']}
                ${styles['scrollbar-track-blue-lighter']} 
                ${styles['scrollbar-w-2']} scrolling-touch`}>

                    {messages.map((message) => {
                        //console.log("message1: ", message)
                        return (
                            message.expand?.user?.id !== pb.authStore.model?.id ? (
                                <div className="chat chat-start" key={message.id}>
                                    <div className="chat-image ">
                                        <div className="w-10 rounded-full">
                                            <Image src={`https://avatars.dicebear.com/api/human/${message.expand?.user?.username}.svg`} alt={`The profile of ${message.expand?.user?.username}`} className="w-9 h-9 rounded-full order-2  "
                                                width={90} height={90}
                                            />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {message.expand?.user?.username}
                                        <time className="text-xs opacity-50">{message.created}</time>
                                    </div>
                                    <Link href={`/chats/${message.id}`} >
                                        <div className="chat-bubble text-sm">
                                            {message.text}
                                        </div>
                                    </Link>
                                    <div className="chat-footer opacity-50">
                                        Delivered
                                    </div>
                                </div>
                            ) : (
                                <div className="chat chat-end" key={message.id}>
                                    <div className="chat-image ">
                                        <div className="w-10 rounded-full">
                                            <Image src={`https://avatars.dicebear.com/api/human/${message.expand?.user?.username}.svg`} alt={`The profile of ${message.expand?.user?.username}`} className="w-9 h-9 rounded-full order-2  "
                                                width={90} height={90}
                                            />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {message.expand?.user?.username}
                                        <time className="text-xs opacity-50">{message.created}</time>
                                    </div>
                                    <Link href={`/chats/${message.id}`} >
                                        <div className="chat-bubble text-sm">
                                            {message.text}
                                        </div>
                                    </Link>
                                    <div className="chat-footer opacity-50">
                                        Seen at 12:45
                                    </div>
                                </div>
                            )
                        )
                    })}
                </div>
             
                <ChatInput  />
            </div>
        </>
    );
}


