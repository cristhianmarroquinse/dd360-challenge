import './globals.css'
import type { Metadata } from 'next'
import { GlobalContextProvider } from '@/context/store'

export const metadata: Metadata = {
  title: 'DD360 Challenge',
  description: 'DD360 Challenge',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <html lang="es">
      <body>
          <GlobalContextProvider>
            {children}
          </GlobalContextProvider>
      </body>
    </html>
  )
}
