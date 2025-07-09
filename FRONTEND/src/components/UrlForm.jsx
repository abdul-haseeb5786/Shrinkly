import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = ({ showExpiry = true }) => {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [expiresIn, setExpiresIn] = useState("")

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug, expiresIn)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
      setUrl("")
      setCustomSlug("")
      setExpiresIn("")
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="space-y-5 bg-[#0d1b2a] p-6 rounded-xl text-[#e0e1dd] shadow-xl max-w-xl mx-auto">
      <div>
        <label htmlFor="url" className="block text-sm font-medium mb-1 text-[#e0e1dd]">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 bg-[#1b263b] border border-[#415a77] text-white placeholder-[#778da9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#778da9]"
        />
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-[#415a77] text-white py-2 px-4 rounded-md hover:bg-[#778da9] transition-colors duration-200"
      >
        Shorten URL
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-200 text-red-900 rounded-md">
          {error}
        </div>
      )}

      {isAuthenticated && (
        <div className="space-y-4">
          <div>
            <label htmlFor="customSlug" className="block text-sm font-medium mb-1 text-[#e0e1dd]">
              Custom URL (optional)
            </label>
            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => setCustomSlug(event.target.value)}
              placeholder="Enter custom slug"
              className="w-full px-4 py-2 bg-[#1b263b] border border-[#415a77] text-white placeholder-[#778da9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#778da9]"
            />
          </div>

          {showExpiry && (
            <div>
              <label htmlFor="expiresIn" className="block text-sm font-medium mb-1 text-[#e0e1dd]">
                Expiry Time (optional)
              </label>
              <select
                id="expiresIn"
                value={expiresIn}
                onChange={(e) => setExpiresIn(e.target.value)}
                className="w-full px-4 py-2 bg-[#1b263b] border border-[#415a77] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#778da9]"
              >
                <option value="">Never (Permanent)</option>
                <option value="30s">30 seconds</option>
                <option value="5m">5 minutes</option>
                <option value="15m">15 minutes</option>
                <option value="1h">1 hour</option>
                <option value="6h">6 hours</option>
                <option value="1d">1 day</option>
                <option value="7d">7 days</option>
              </select>
            </div>
          )}
        </div>
      )}

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-[#e0e1dd]">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 bg-[#1b263b] border border-[#415a77] text-white rounded-l-md"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-[#415a77] text-white hover:bg-[#778da9]'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UrlForm
