import React from 'react'
import UrlForm from '../components/UrlForm'

const UrlExpiry = () => {
  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center p-4">
      <div className="bg-[#1b263b] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold text-[#e0e1dd] text-center mb-4">URL with Expiry</h1>
        <UrlForm showExpiry={true} />
      </div>
    </div>
  )
}

export default UrlExpiry
