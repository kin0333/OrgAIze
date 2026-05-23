"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const LayoutDashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
)

const ReceiptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 17.5v-11" />
  </svg>
)

const HandshakeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88" />
    <path d="m16 16 3 3a1 1 0 1 0 3-3l-4-4" />
    <path d="m2 2 2 2" />
    <path d="m6.5 6.5 2 2" />
    <path d="m22 22-2-2" />
    <path d="m17.5 17.5-2-2" />
    <path d="m7 11 2-2" />
  </svg>
)

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboardIcon />,
  },
  {
    label: "Liquidations",
    href: "/liquidations",
    icon: <ReceiptIcon />,
  },
  {
    label: "Sponsorships",
    href: "/sponsorships",
    icon: <HandshakeIcon />,
  },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#b2e0d4]/30 bg-white/90 backdrop-blur-xl">
      {/* Logo Section */}
      <div className="flex items-center gap-3 border-b border-[#b2e0d4]/30 px-6 py-5">
        <div className="relative h-10 w-10 overflow-hidden rounded-xl">
          <Image
            src="/OrgAIze.png"
            alt="OrgAIze Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-[#004d00]">
            OrgAIze
          </h1>
          <p className="text-[11px] font-medium tracking-wider text-[#66b3a1] uppercase">
            Finance Hub
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6" aria-label="Main navigation">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={0}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#e0f7f1] text-[#004d00] shadow-sm"
                      : "text-slate-600 hover:bg-[#e0f7f1]/50 hover:text-[#004d00]"
                  }`}
                >
                  <span className={isActive ? "text-[#007a33]" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#007a33]" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[#b2e0d4]/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0f7f1] text-sm font-bold text-[#004d00]">
            T
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Treasurer</p>
            <p className="text-xs text-slate-400">Demo Mode</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
