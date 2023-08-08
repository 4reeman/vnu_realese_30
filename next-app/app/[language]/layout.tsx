import './globals.css'
import Navbar from "./components/NavBar/Navbar"

export const metadata = {
  title: 'Vnu site',
  description: 'Description for Vnu site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
