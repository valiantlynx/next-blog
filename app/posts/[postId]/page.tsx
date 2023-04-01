import { getSortedPostsData, getPostData } from "@/lib/posts"
import { notFound } from "next/navigation"
import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"
import Chats from "@/app/components/chatcomponents/Chats"
import ShareButton from "@/app/components/shareComponents/ShareButton"

//turn this ssr to ssg 
export function generateStaticParams() {
    const posts = getSortedPostsData() // deduped

    return posts.map((post) => ({
        postId: post.id,
    }))
}

export function generateMetadata({ params }: { params: { postId: string } }) {
    const posts = getSortedPostsData() // deduped
    const { postId } = params

    const post = posts.find((post) => post.id === postId)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({ params }: { params: { postId: string } }) {
    const posts = getSortedPostsData() // deduped
    const { postId } = params

    if (!posts.find((post) => post.id === postId)) {
        return notFound()
    }

    const { title, date, contentHtml } = await getPostData(postId)

    const formattedDate = getFormattedDate(date)


    return (
        <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">{formattedDate}</p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
              {/* they both send an error  */}
                <ShareButton postId={postId} />
                <Chats />
                <p>
                    <Link href="/" > 🏡 Back to home 🏠 </Link>
                </p>
            </article>
        </main>
    )
}
