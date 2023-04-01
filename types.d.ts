type BlogPost = {
    id: string,
    title: string,
    date: string,
}

type BlogChat = {
    id: string,
    title: string,
    date: string,
    owner: string,
    contentHtml: string,
}

interface User {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    updated: string;
    username: string;
    verified: boolean;
    expand: any;
}

interface Message {
    id: string;
    text: string;
    user: string;
    created: string;
    expand?: {
        user: User;
    };
}


