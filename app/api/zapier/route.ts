// the search page for the blog posts
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { NextResponse } from "next/server";
import { useZapierWithLangchain } from "@/lib/useZapierWithLangchain"


export async function GET(request: Request) {
    console.log("connected to zapier route, GET request received")
    const posts = getSortedPostsData()

    // use the search query to filter the posts
    const { searchParams } = new URL(request.url);

    const postId = searchParams.get("postId");
    console.log("postId", postId)

    if (postId == null || !postId || postId == "" || postId == undefined) {
        //if it is empty return no posts with that name were found
        const filteredPosts = [{
            title: "No posts found",
            date: "2021-01-01",
            id: "no-posts-found",
        }]

        return NextResponse.json({ filteredPosts })
    } else {
        const filteredPosts = await getPostData(postId)
        console.log("filteredPosts", filteredPosts.date)
        const { title, date, contentHtml } = filteredPosts

        const result = await useZapierWithLangchain({ postId, title: title, date: date, contentHtml: contentHtml })

        // console.log("result: ", result)

        return NextResponse.json({ filteredPosts })
    }
}

// // this will recieve some data from frontend and call a function to send it to zapier
// import { useZapierWithLangchain } from "@/lib/useZapierWithLangchain"
// import { NextResponse } from "next/server";


