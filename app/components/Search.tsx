'use client'
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Search() {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const [active, setActive] = useState(false)
    const [results, setResults] = useState([])

    const searchEndpoint = (search: string) => `/api/search?q=${search}`

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch('')
        router.push(`posts/${search}/`)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setSearch(e.target.value)
        setActive(true)
        fetch(searchEndpoint(e.target.value))
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                console.log("data", data.filteredPosts)
                setResults(data.filteredPosts)
            }
            )
    }


    return (
        <form onSubmit={handleSubmit} className="p-3">
         
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    value={search}
                    onChange={(e) => {
                        handleSearch(e)
                    }}
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search ..." required />

                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

            </div>
            {active && results && (
                <div className="absolute w-full bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    {results.map((result: any) => (

                        <Link key={result.id}
                            href={`/posts/${result.id}`}
                            onClick={() => {
                                setActive(false)
                                setSearch('')
                            }}
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-white"
                        >
                            {result.title}
                        </Link>
                    ))}
                </div>
            )}

        </form>
    )
}
