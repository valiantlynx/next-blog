import Link from "next/link"
import { FaYoutube, FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaPinterest, FaReddit } from "react-icons/fa"

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


export default function Navbar( ) {
    return (
        <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
            <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0" >
                    <Link href="/" className="text-white/90 no-underline hover:text-white">Valiantlynx</Link>
                </h1>
                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                    {socialMedia.map((social) => (
                        <Link href={social.url} key={social.name} className="text-white/90 no-underline hover:text-white" target="_blank">
                            {social.icon}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
