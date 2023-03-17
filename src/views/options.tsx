import { render } from 'preact'
import { useState } from 'preact/hooks'
import 'virtual:windi.css'

const Options = () => {
  const [version, _setVersion] = useState('0.2.0')

  return (
    <main>
      <h3>Options Page!</h3>

      <h6>v{version}</h6>

      <a href="https://github.com/riipandi/chrome-ext-kepo" target="_blank">
        Made with 🫰 by Aris Ripandi
      </a>
    </main>
  )
}

render(<Options />, document.getElementById('app') as HTMLElement)
