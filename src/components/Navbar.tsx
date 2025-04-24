"use client"
import { Beaker, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Beaker className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-xl text-gray-800">ChemTrack</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-blue-600 font-medium">Chemicals</a>
        </div>

        <div className="flex items-center gap-3">
          {loggedIn ? (
            <>
              <Avatar className="h-9 w-9 bg-blue-100 text-blue-600">
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
              <Button variant="default" size="sm">Logout</Button>
            </>
          ) : (
            <Button size="sm">Login</Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden mt-3 pb-3 border-t border-gray-100">
          <div className="flex flex-col space-y-3 pt-3">
            <a href="#" className="text-blue-600 font-medium px-2">Chemicals</a>
          </div>
        </div>
      )}
    </nav>
  )
}
