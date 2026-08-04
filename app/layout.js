import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'NOVA — Premium E-Commerce',
  description: 'World-class shopping experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f9f9f7]">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}