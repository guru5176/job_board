import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-shift opacity-10"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6 bounce-in">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              JobBoard
            </span>
            <br />
            <span className="text-4xl text-gray-700">Mini Job Portal</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 slide-in-up max-w-2xl mx-auto leading-relaxed">
            🚀 Find your dream job or post opportunities for talented professionals. 
            Connect with the best talent in the industry!
          </p>
          
          <div className="space-x-6 slide-in-up">
            <Link 
              to="/jobs" 
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover-lift pulse-glow font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              🔍 Browse Jobs
            </Link>
            <Link 
              to="/signup" 
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover-lift font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              ✨ Get Started
            </Link>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover-lift">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
              <p className="text-gray-600">Find amazing opportunities and apply with ease</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover-lift">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-2">For Employers</h3>
              <p className="text-gray-600">Post jobs and find the perfect candidates</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover-lift">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
              <p className="text-gray-600">Quick applications with secure authentication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home