import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getJobs } from '../services/api'

function JobListing() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true)
      const data = await getJobs(filterParams)
      setJobs(data.jobs)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs(filters)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-lg">Loading jobs...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Job Listings</h2>
      
      {/* Filters */}
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search jobs..."
            value={filters.search}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Job List */}
      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-xl text-gray-500 bounce-in">
              No jobs found. Try adjusting your filters.
            </div>
          </div>
        ) : (
          jobs.map((job, index) => (
            <div 
              key={job._id} 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover-lift border border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{job.title}</h3>
                  <p className="text-gray-600 mb-1 flex items-center">
                    🏢 {job.company}
                  </p>
                  <p className="text-gray-600 mb-1 flex items-center">
                    📍 {job.location}
                  </p>
                  <p className="text-blue-600 mb-1 capitalize flex items-center">
                    ⏰ {job.type}
                  </p>
                  <p className="text-green-600 font-medium mb-4 flex items-center">
                    💰 {job.salary}
                  </p>
                </div>
                <div className="text-2xl">🚀</div>
              </div>
              <Link 
                to={`/jobs/${job._id}`}
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 pulse-glow font-semibold"
              >
                View Details →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default JobListing