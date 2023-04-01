
import { FaYoutube, FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaPinterest, FaReddit } from "react-icons/fa"
import Link from "next/link"
import { getSortedPostsData } from "@/lib/posts"
import { notFound } from "next/navigation"

//dynamic social media links
const socialMedia = [
    {
        name: "Youtube",
        url: "https://www.youtube.com/channel/UC5yZzdTXg3TX4oFhzI2ritQ",
        icon: <FaYoutube />
    },
    {
        name: "Github",
        url: "https://github.com/valiantlynx",
        icon: <FaGithub />
    },
    {
        name: "Twitter",
        url: "https://twitter.com/Valiantlynxz",
        icon: <FaTwitter />
    },
    {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/valiant-lynx-b3773224a/",
        icon: <FaLinkedin />
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/valiant_lynx/",
        icon: <FaInstagram />
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=100087843852647",
        icon: <FaFacebook />
    },
    {
        name: "Pinterest",
        url: "https://www.pinterest.com/valiantlynx/",
        icon: <FaPinterest />
    },
    {
        name: "Reddit",
        url: "https://www.reddit.com/user/animevariant",
        icon: <FaReddit />
    }
]
type Props = {
    postId: string
}

export default function ShareButton({ postId }: Props) {
    const posts = getSortedPostsData() // deduped

    if (!posts.find((post) => post.id === postId)) {
        return notFound()
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="frame flex flex-row justify-around items-center h-20 w-[350px] relative shadow-[-7px_-7px_20px_0px_#fff9,-4px_-4px_5px_0px_#fff9,7px_7px_20px_0px_#0002,4px_4px_5px_0px_#0001,inset_0px_0px_0px_0px_#fff9,inset_0px_0px_0px_0px_#0001,inset_0px_0px_0px_0px_#fff9,inset_0px_0px_0px_0px_#0001] transition-shadow duration-[0.6s] ease-[cubic-bezier(.79,0.21,0.06,0.81)] rounded-[10px]">
                {socialMedia.map((social) => (
                    <Link
                        href={`/chats/ai/${postId}`}
                        key={social.name}
                        className="h-[35px] w-[35px] flex flex-col justify-center items-center shadow-[-7px_-7px_20px_0px_#fff9,-4px_-4px_5px_0px_#fff9,7px_7px_20px_0px_#0002,4px_4px_5px_0px_#0001,inset_0px_0px_0px_0px_#fff9,inset_0px_0px_0px_0px_#0001,inset_0px_0px_0px_0px_#fff9,inset_0px_0px_0px_0px_#0001] transition-shadow duration-[0.6s] ease-[cubic-bezier(.79,0.21,0.06,0.81)] text-base text-[rgba(42,52,84,1)] no-underline rounded-[3px] active:shadow-[4px_4px_6px_0_rgba(255,255,255,0.5),-4px_-4px_6px_0_rgba(116,125,136,0.2),inset_-4px_-4px_6px_0_rgba(255,255,255,0.5),inset_4px_4px_6px_0_rgba(116,125,136,0.3)]; background: #e0e5ec;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;"
                    >
                        {social.icon}
                    </Link>
                ))}
            </div>
        </div>
    )
}
