import type { ReactNode } from 'react'
import { Header } from './Header.tsx'

export const Layout = ({ children }: { children: ReactNode }) => (
  <main className="mx-auto flex min-h-svh max-w-md flex-col items-center gap-5 bg-[#fff8fb] px-4 py-8 text-cocoa">
    <Header />
    {children}
  </main>
)
