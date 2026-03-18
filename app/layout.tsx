import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CTSE Lab 06 – Order Management',
  description: 'Event-driven microservices frontend',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-indigo-700 text-white shadow-md">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0v10l-8 4m0-10L4 7m8 10V7" />
            </svg>
            <span className="text-xl font-semibold tracking-tight">Order Management System</span>
            <span className="ml-auto text-indigo-200 text-sm">Event-Driven Microservices</span>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
        <footer className="text-center text-xs text-gray-400 py-6">
          CTSE Lab 06 · API Gateway → Kafka → Microservices
        </footer>
      </body>
    </html>
  )
}
