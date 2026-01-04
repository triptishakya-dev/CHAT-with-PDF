import { Github, Heart, Linkedin, Twitter } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-white">RAG Chat PDF</h3>
            <p className="text-sm text-gray-400 text-center md:text-left max-w-xs">
              Empowering your PDF conversations with advanced AI technology. Chat smarter, not harder.
            </p>
          </div>

          {/* Quick Links (Placeholder for future) */}
           <div className="flex flex-col items-center md:items-center space-y-2">
            
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} RAG Chat PDF. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
              <span>by</span>
              <span className="text-white font-medium">Tripti</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
