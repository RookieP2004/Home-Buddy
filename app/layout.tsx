import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Sora, DM_Sans, Geist_Mono } from 'next/font/google'
import './globals.css'

const sora = Sora({ variable: '--font-sora', subsets: ['latin'], weight: ['400', '500', '600', '700'] })
const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'], weight: ['400', '500', '700'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'HomeBuddy - On-Demand Household Help',
  description: 'Find trusted helpers for your household needs. Real-time booking, verified helpers, and transparent pricing.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
