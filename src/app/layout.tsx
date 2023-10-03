import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Login from '@/components/Login'
import ClientProvider from '@/components/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChatGPT by MGF',
  description: 'ChatGPT clone using OpenAI API!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {
            session ? (
              <div className='flex'>
                {/* Sidebar */}
                <Sidebar/>


                {/* ClientProvider - Notification */}
                {/* NOTE: Here goes anything that need to be at the top level.
                    For example, toasts.
                */}
                <ClientProvider/>

                <div className='bg-[#F8F5F1] flex-1'>{children}</div>
              </div>
            ):(
              <Login/>
            )
          }
        </SessionProvider>
      </body>
    </html>
  )
}
