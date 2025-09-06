import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Set a metadataBase for absolute URLs (OG/Twitter) during static export
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: 'Ezedin Ebrahim - Software Developer',
  description: 'Personal website of Ezedin Ebrahim, a passionate software developer specializing in modern web technologies.',
  keywords: 'software developer, web development, programming, portfolio',
  authors: [{ name: 'Ezedin Ebrahim' }],
  openGraph: {
    title: 'Ezedin Ebrahim - Software Developer',
    description: 'Personal website of Ezedin Ebrahim, a passionate software developer.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
