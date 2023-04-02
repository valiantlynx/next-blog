"use client"
import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi';
import { classNames } from '@/lib/classNames';
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
    const [isVisible, setIsVisible] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null); // Create a ref


    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    function scrollToBottom() {
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            const isScrolledToBottom = chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 1;
            if (!isScrolledToBottom) {
                setIsVisible(true);
                chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
            } else {
                setIsVisible(false);
            }

            chatBox.addEventListener("scroll", () => {
                const isScrolledToBottom = chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 1;
                if (isScrolledToBottom) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            });
        }
    }

    useLayoutEffect(() => {
        const chatBox = chatBoxRef.current;
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
            setIsVisible(false);
        }
    }, [messages]);



    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        const fetchData = async () => {
            try {

                // current tine in 2023-01-01 00:00:00 format
                const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

                // fetch a paginated records list with a filter for the newest records between now and one hour ago

                const oneHourAgo = new Date(new Date().getTime() - 60 * 60 * 1000)
                // an hour ago in 2023-01-01 00:00:00 format
                const oneHourAgoString = oneHourAgo.toISOString().slice(0, 19).replace('T', ' ');

                console.log("oneHourAgoString: ", oneHourAgoString)

                console.log("now: ", now)

                // fetch a paginated records list
                const resultList = await pb.collection('messages').getList(1, 50, {
                    // filter for the newest records
                    filter: `created >= '${oneHourAgoString}' && created <= '${now}'`,
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
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>

            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                <ChatNav />
                <div id="messages"
                    ref={chatBoxRef}
                    className={`flex flex-col space-y-4 p-3 overflow-y-auto 
    ${styles['scrollbar-thumb-blue']} 
    ${styles['scrollbar-thumb-rounded']}
    ${styles['scrollbar-track-blue-lighter']} 
    ${styles['scrollbar-w-2']} scrolling-touch`}>
                    {/* chat messages */}

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
                                    {/* <Link href={`/chats/${message.id}`} > */}
                                    <div className="chat-bubble text-sm">
                                        {message.text}
                                    </div>
                                    {/* </Link> */}
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
                <div className="relative">
                    <button
                        onClick={scrollToTop}
                        className={classNames(
                            "fixed bottom-4 right-8 p-2 rounded-full bg-blue-500 text-white",
                            isVisible ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <BiArrowFromBottom />
                    </button>

                    <button
                        onClick={scrollToBottom}
                        className={classNames(
                            "absolute bottom-4 right-4 btn btn-circle p-2 rounded-full bg-gray-500 text-white",
                            isVisible ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <BiArrowFromTop />
                    </button>
                </div>
                <ChatInput />
            </div>


        </>
    );
}

