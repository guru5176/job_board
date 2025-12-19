import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getMyJobs, getMyApplications } from '../services/api'

function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      if (user.role === 'employer') {
        const result = await getMyJobs()
        setData(result.jobs)
      } else if (user.role === 'seeker') {
        const result = await getMyApplications()
        setData(result.applications)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          {user.role === 'employer' ? 'My Job Postings' : 'My Applications'}
        </h2>
        {user.role === 'employer' && (
          <Link
            to="/post-job"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Post New Job
          </Link>
        )}
      </div>

      <div className="grid gap-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {user.role === 'employer' 
              ? 'No job postings yet. Create your first job posting!'
              : 'No applications yet. Start applying to jobs!'
            }
          </div>
        ) : (
          data.map(item => (
            <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
              {user.role === 'employer' ? (
                <>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-1">{item.company}</p>
                  <p className="text-gray-600 mb-1">{item.location}</p>
                  <p className="text-blue-600 mb-1 capitalize">{item.type}</p>
                  <p className="text-green-600 font-medium mb-4">{item.salary}</p>
                  <Link
                    to={`/jobs/${item._id}/applications`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                  >
                    View Applications
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">{item.job.title}</h3>
                  <p className="text-gray-600 mb-1">{item.job.company}</p>
                  <p className="text-gray-600 mb-1">{item.job.location}</p>
                  <p className="text-green-600 font-medium mb-2">{item.job.salary}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <Link
                      to={`/jobs/${item.job._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Job
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard