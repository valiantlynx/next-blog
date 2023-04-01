"use client"
import Link from "next/link"
import { FaYoutube, FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaPinterest, FaReddit } from "react-icons/fa"
import Search from "./Search"
import Image from "next/image"
import { pb } from "@/lib/pocketbase/pb"
import signOut from "@/lib/pocketbase/logOut"
const imageUrl = `/images/profile-image.png`;

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


export default function Navbar() {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {socialMedia.map((social) => (
                            <li key={social.name}>
                                <Link href={social.url} key={social.name} className="text-black/90 no-underline hover:text-black" target="_blank">
                                    {social.icon}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href="/" className="btn btn-ghost normal-case text-xl hover:text-black">Valiantlynx</Link>
            </div>
            <div className="navbar-end">
                <Search />
                <Link href="/login" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </Link>
                <div className="dropdown dropdown-end">


                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {/* make sure to change the alt and src to your own image */}
                            <Image alt="user profile image" width="20" height="20" src={imageUrl} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link href="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li ><Link href="/settings">Settings</Link></li>
                        <li>
                            <button onClick={signOut}>Logout</button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

    )
}
