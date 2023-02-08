import preact from 'preact'
import { AboutButton } from './Button'

export const PopUpLayout = ({
  children,
  domain,
}: {
  children: preact.ComponentChildren
  domain: string
}) => (
  <div className="w-100 bg-white">
    <header className="py-2.5 px-3.5 bg-green-500 text-white flex items-center justify-between">
      <div>
        <h1 className="font-medium text-sm">{domain}</h1>
      </div>
      <div>
        <AboutButton />
      </div>
    </header>
    {children}
  </div>
)
