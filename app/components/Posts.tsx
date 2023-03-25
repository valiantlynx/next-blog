import { getSortedPostsData } from "@/lib/posts"
import ListItem from "./ListItem"

export default function Posts() {
    // no need to await, cause we have the data in the server, its get the data right away
    const posts = getSortedPostsData()
    return (
        <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold dark:text-white/90">Blogs</h2>
            <ul className="w-full">
                {posts.map((post) => (
                    <ListItem key={post.id} post={post} />
                ))}
            </ul>
        </section>
    )
}
