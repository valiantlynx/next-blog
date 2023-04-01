import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Valiantlynx Blog',
  description: 'The Journey of a Multi-Disciplinary Engineer: Exploring the Intersection of AI, Blockchain, Web Development, and Product Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark:bg-slate-800' >
        <Navbar />
        {children}
        </body>
    </html>
  )
}
