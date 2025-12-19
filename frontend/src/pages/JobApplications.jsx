import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJobApplications } from '../services/api'
import { useAuth } from '../hooks/useAuth'

function JobApplications() {
  const { id } = useParams()
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [jobTitle, setJobTitle] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [id])

  const fetchApplications = async () => {
    try {
      const data = await getJobApplications(id)
      setApplications(data.applications)
      if (data.applications.length > 0) {
        // Get job title from first application
        setJobTitle(data.applications[0].job?.title || 'Job Applications')
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== 'employer') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-lg text-red-600">Access denied. Only employers can view applications.</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-lg">Loading applications...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Applications for: {jobTitle}</h2>

      <div className="grid gap-4">
        {applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No applications received yet.
          </div>
        ) : (
          applications.map(application => (
            <div key={application._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{application.applicant.name}</h3>
                  <p className="text-gray-600">{application.applicant.email}</p>
                  <p className="text-sm text-gray-500">
                    Applied on: {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
              
              {application.coverLetter && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Cover Letter:</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">
                    {application.coverLetter}
                  </p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Accept
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Reject
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Contact
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default JobApplications