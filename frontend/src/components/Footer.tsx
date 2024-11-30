import React from 'react'
export default function Footer() {
    return (
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Science Creativity Club. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }
  