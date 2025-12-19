import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white p-4 shadow-lg relative overflow-hidden">
      <div className="container mx-auto flex justify-between items-center relative z-10">
        <Link to="/" className="text-2xl font-bold hover-lift">
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            🚀 JobBoard
          </span>
        </Link>
        
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-blue-200 transition-all duration-300 hover:scale-110 px-3 py-1 rounded-lg hover:bg-white/10">
            Home
          </Link>
          <Link to="/jobs" className="hover:text-blue-200 transition-all duration-300 hover:scale-110 px-3 py-1 rounded-lg hover:bg-white/10">
            Jobs
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200 transition-all duration-300 hover:scale-110 px-3 py-1 rounded-lg hover:bg-white/10">
                Dashboard
              </Link>
              {user.role === 'employer' && (
                <Link to="/post-job" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                  Post Job
                </Link>
              )}
              <span className="text-blue-100 bg-white/10 px-3 py-1 rounded-full">
                Hi, {user.name} 👋
              </span>
              <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition-all duration-300 hover:scale-110 px-3 py-1 rounded-lg hover:bg-white/10">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 pulse-glow">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar