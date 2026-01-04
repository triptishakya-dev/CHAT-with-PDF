import { UserButton } from '@clerk/nextjs'
import { Sparkles, FileText } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-blue-600/20 p-2 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RAG Chat PDF
              </span>
            </div>

            <div className="hidden md:flex items-center">
              <div className="h-6 w-px bg-gray-700 mx-4" />
              <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 px-3 py-1 rounded-full shadow-sm">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium text-gray-300">
                  Powered by Gemini
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: User Profile */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full p-0.5 border border-gray-700 hover:border-gray-600 transition-all duration-200">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-gray-700 hover:ring-gray-600 transition-all"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
