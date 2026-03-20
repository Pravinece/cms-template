import React from 'react'
import { Outlet } from 'react-router-dom'

function HeroPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* <Sidebar />
      <Topbar /> */}
      <main
        id="main-content"
        tabIndex={-1}
        className={
          'pt-16 min-h-screen transition-all duration-200 pl-64'}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {/* <ErrorBoundary> */}
            <Outlet />
          {/* </ErrorBoundary> */}
        </div>
      </main>
      {/* <ToastContainer /> */}
    </div>

  )
}

export default HeroPage