'use client'
import { useState, FormEvent } from "react"

export default function Search() {
  const [search, setSearch] = useState('')
  const [requestInput, setRequestInput] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch()
    setSearch('')
    setRequestInput('')
    //router.push(`posts/${search}/`)
  }

  const handleSearch = () => {
    const zapierEndpoint = (postId: string, requestInput: any) => `http://localhost:3000/api/zapier?postId=${search}&requestInput=${JSON.stringify(requestInput)}`

    console.log("zapierEndpoint: ", zapierEndpoint(search, requestInput))

    // send the post data to zapier api to post to social media
    fetch(zapierEndpoint(search, requestInput)).then((res) => {
      //console.log("res: ", res)
      return res.json()
    }).then((data) => {
      console.log("data: ", data.filteredPosts)
      return data.filteredPosts
    })
  }


  return (
    <form onSubmit={handleSubmit} className="mt-5 p-3">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Request</label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            //handleSearch(e)
          }}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="what what blog is this about ..."
          required />
        <input
          type="text"
          value={requestInput}
          onChange={(e) => {
            setRequestInput(e.target.value)
            //handleSearch(e)
          }}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="what do you want to do with zapier ..."
          required />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Request</button>

      </div>
    </form>
  )
}

