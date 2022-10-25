import { useState } from 'preact/hooks'
import './Popup.css'

export const Popup = () => {
  const [version, _setVersion] = useState('0.1.0')

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
