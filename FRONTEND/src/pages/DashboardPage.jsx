import React, { useEffect } from 'react'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  useEffect(() => {
    document.title = 'Shrinkly - Dashboard'
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1b2a] py-10 px-4">
      <h1 className="text-2xl text-[#e0e1dd] font-semibold text-center mb-6">Your Shortened URLs</h1>
      <div className="max-w-5xl mx-auto">
        <UserUrl />
      </div>
    </div>
  )
}

export default DashboardPage
