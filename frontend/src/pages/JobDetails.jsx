import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJobById, applyToJob } from '../services/api'
import { useAuth } from '../hooks/useAuth'

function JobDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [showApplication, setShowApplication] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      const data = await getJobById(id)
      setJob(data.job)
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async (e) => {
    e.preventDefault()
    setApplying(true)
    setMessage('')
    
    try {
      await applyToJob(id, { coverLetter })
      setMessage('Application submitted successfully!')
      setShowApplication(false)
      setCoverLetter('')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-lg">Loading job details...</div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-lg text-red-600">Job not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <div className="mb-6">
          <p className="text-xl text-gray-700 mb-2">{job.company}</p>
          <p className="text-gray-600 mb-1">{job.location}</p>
          <p className="text-blue-600 mb-1 capitalize">{job.type}</p>
          <p className="text-green-600 font-medium text-lg">{job.salary}</p>
          <p className="text-sm text-gray-500 mt-2">Posted by: {job.employer?.name}</p>
        </div>
        
        {message && (
          <div className={`p-4 rounded mb-4 ${
            message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>
        
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Requirements</h3>
            <ul className="list-disc list-inside space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>
        )}
        
        {user && user.role === 'seeker' && (
          <div>
            {!showApplication ? (
              <button 
                onClick={() => setShowApplication(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Apply Now
              </button>
            ) : (
              <form onSubmit={handleApply} className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Submit Application</h4>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write a cover letter (optional)..."
                  className="w-full p-3 border rounded-lg mb-4 h-32"
                />
                <div className="space-x-2">
                  <button
                    type="submit"
                    disabled={applying}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplication(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        
        {!user && (
          <p className="text-gray-600">
            Please <a href="/login" className="text-blue-600">login</a> as a job seeker to apply for this position.
          </p>
        )}
      </div>
    </div>
  )
}

export default JobDetails