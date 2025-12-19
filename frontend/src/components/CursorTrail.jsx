import { useEffect, useState } from 'react'

function CursorTrail() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newTrail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }
      
      setTrails(prev => [...prev.slice(-10), newTrail])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (index + 1) / trails.length * 0.5,
            transform: `translate(-50%, -50%) scale(${(index + 1) / trails.length})`
          }}
        />
      ))}
    </>
  )
}

export default CursorTrail