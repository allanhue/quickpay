// src/app/layout.js
import './globals.css'

export const metadata = {
  title: 'QuickPay - Invoice Management',
  description: 'Professional invoice management system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}