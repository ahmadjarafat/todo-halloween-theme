import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import localFont from 'next/font/local'
import './globals.css'

const jannaLT = localFont({
  src: [
    {
      path: './assets/fonts/JannaLT-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/ArbFONTS-Janna-LT-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-janna',
  display: 'swap',
})

const rubikWetPaint = localFont({
  src: './assets/fonts/RubikWetPaint-Regular.ttf',
  variable: '--font-rubik-wet-paint',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
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
    <html lang="en">
      <body className={`${jannaLT.variable} ${rubikWetPaint.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
