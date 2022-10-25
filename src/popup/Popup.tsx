import { useEffect, useState } from 'preact/hooks'
import './Popup.css'

const getIp = async () => {
  try {
    const response = await fetch(`https://ip.seeip.org/geoip`)
    const ip = response.text()
    return ip
  } catch (e) {
    return null
  }
}

export const Popup = () => {
  const [version, _setVersion] = useState('0.1.0')

  useEffect(() => {
    // Trigger your effect
    return () => {
      console.log('DEBUG')
      // Optional: Any cleanup code
    }
  }, [])

  return (
    <main>
      <h3>Pop Up!</h3>

      <h6>v{version}</h6>

      <a href="https://github.com/riipandi/chrome-ext-kepo" target="_blank">
        Made with 🫰 by Aris Ripandi
      </a>
    </main>
  )
}

export default Popup
