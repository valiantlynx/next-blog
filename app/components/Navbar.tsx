import Link from "next/link"
import { FaYoutube, FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaPinterest, FaReddit } from "react-icons/fa"

export default function Navbar() {
    return (
        <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
            <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0" >
                    <Link href="/" className="text-white/90 no-underline hover:text-white">Valiantlynx</Link>
                </h1>
                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                    <Link className="text-white/90 no-underline hover:text-white" href="https://www.youtube.com/channel/UCowp4JkKtviDPKEejXcn1-g" >
                        <FaYoutube />
                    </Link>
                    <Link className="text-white/90 no-underline hover:text-white" href="https://github.com/valiantlynx" >
                        <FaGithub />
                    </Link>
                    <Link className="text-white/90 no-underline hover:text-white" href="https://twitter.com/Valiantlynx" >
                        <FaTwitter />
                    </Link>
                    <Link className="text-white/90 no-underline hover:text-white" href="https://www.linkedin.com/in/valiantlynx/" >
                        <FaLinkedin />
                    </Link>
                    <Link className="text-white/90 no-underline hover:text-white" href="https://www.instagram.com/valiantlynx/" >
                        <FaInstagram />
                    </Link>
                    <Link className="text-white/90 no-underline hover:text-white" href="https://www.facebook.com/valiantlynx" >
                        <FaFacebook />
                    </Link>
                    <Link className="text-white/90 no-underline hover:text-white" href="https://www.pinterest.com/valiantlynx/" >
                        <FaPinterest />
                    </Link>
                    <Link className="text-white/90 no-underline hover:text-white" href="https://www.reddit.com/user/valiantlynx" >
                        <FaReddit />
                    </Link>
                   
                </div>
            </div>
        </nav>
    )
}
