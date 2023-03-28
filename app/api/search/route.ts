// the search page for the blog posts
import { getSortedPostsData } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const posts = getSortedPostsData()

  // console.log("posts", posts)

  // console.log(JSON.stringify(posts))

  // use the search query to filter the posts
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");
  console.log("query", query)

  //check if the query is empty, if it is return no posts with that name were found
  if (query == null || !query || query == "" || query == undefined) {
    //if it is empty return no posts with that name were found
    const noPosts = [{
      title: "No posts found",
      date: "2021-01-01",
      id: "no-posts-found",
    }]

    return NextResponse.json({ noPosts })
  }

  //await and return the filtered posts
  const filteredPosts = await posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json({ filteredPosts });
}
