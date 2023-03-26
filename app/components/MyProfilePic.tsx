import Image from "next/image"
const imageUrl = `/images/profile-image.png`;


export default function MyProfilePic() {
  return (
    <section className="w-full mx-auto">
        <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
            src={imageUrl}
            alt="Valiantlynx Profile Picture"
            width={200}
            height={200}
            priority={true}
        />

    </section>
  )
}
