"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Home, Users, Megaphone, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/adopcion", label: "Adopción", icon: Heart },
    { href: "/campanas", label: "Campañas", icon: Megaphone },
    { href: "/refugios", label: "Refugios", icon: Building2 },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary m-4" />
          <span className="text-xl font-bold text-primary">FIFI ADOPT</span>
        </Link>

        <nav className="md:flex items-center space-x-6 hidden">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>


        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Users className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
