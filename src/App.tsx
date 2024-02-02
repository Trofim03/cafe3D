import { useEffect, useState } from 'react'
import './App.scss'
import { initThree } from './helpers/threeConfig'
import gsap from 'gsap'
import { FRAMES } from './helpers/threeConfig/constants';

export const App = () => {
  const [state, setState] = useState({camera: {}, updateCamera: () => {}})
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    window.scrollTo({top: 0})
    const {camera, updateCamera} = initThree()

    setState({camera, updateCamera})
  }, [])

  const handleNext = () => {
    if (state.camera) {
      const nextFrameIndex = frameIndex + 1
      setFrameIndex(nextFrameIndex)
      
      gsap.to(
        state.camera.position,
        {
          ...(FRAMES[nextFrameIndex].position), duration: 2, ease: 'power3.out',
          onUpdate: () => {state.updateCamera()},
          onRepeat: () => {console.log(1)}
        }
      )
    }
  }
  const handlePrev = () => {
    if (state.camera) {
      const prevFrameIndex = frameIndex - 1
      setFrameIndex(prevFrameIndex)

      gsap.to(
        state.camera.position,
        {
          ...(FRAMES[prevFrameIndex].position), duration: 2, ease: 'power3.out',
          onUpdate: () => {state.updateCamera()},
          onRepeat: () => {console.log(1)}
        }
      )
    }
  }

  return (
    <>
      <button onClick={handleNext} className='next'>next</button>
      <button onClick={handlePrev} className='prev'>prev</button>
      <canvas id="modelCanvas"/>
    </>
  )
}
