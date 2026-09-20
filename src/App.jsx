import './App.css'
import { useState, useMemo } from 'react';
// import Lantern from './components/Lantern'

function App() {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState('intro');

  const stars = useMemo(() => {
    return Array.from({ length: 500 }).map((_, index) => ({
      id: index,
      style: {
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 3}s`,     // Lệch nhịp nhấp nháy từ 0 - 3 giây
        animationDuration: `${1 + Math.random() * 2}s` // Tốc độ nhấp nháy từ 1 - 3 giây
      },
      sizeClass: `size-${Math.floor(Math.random() * 3) + 1}`
    }));
  }, []);

  return (
    <>
      {scene === 'intro' &&
        < div className="intro" >
          <div className="stars">
            {stars.map((star) => (
              <div
                key={star.id}
                className={`star ${star.sizeClass}`}
                style={star.style}
              />
            ))}
          </div>

          <div className="moon"></div>

          <div className="clouds">
            <div className="cloud speed-slow delay-1"></div>
            <div className="cloud speed-normal"></div>
            <div className="cloud speed-fast delay-2"></div>
            <div className="cloud speed-normal delay-3"></div>
          </div>

          {
            !started &&
            <div className="content">
              <p className="small-title">Một đêm trung thu</p>
              <h1>đêm trăng kéo quân</h1>
              <p className='description'>Một câu chuyện nhỏ về đêm trung thu</p>
              <button onClick={() => setStarted(true)}>--- bắt đầu ---</button>
            </div>
          }

          {
            started && (
              <div className='started'>Câu chuyện bắt đầu...</div>
            )
          }
        </ div>
      }

      {scene === 'village' && (
        <Village />
      )}
    </>
  )
}

export default App
