import { render } from 'preact'
import { useState } from 'preact/hooks'
import 'virtual:windi.css'

const metadata = [
  { id: 1, name: 'Page loading time', value: '2.867 ms' },
  { id: 1, name: 'ISP Name', value: 'PT Telekomunikasi Indonesia' },
  { id: 1, name: 'ISP Country', value: 'IDN / Indonesia' },
  { id: 1, name: 'ISP Region', value: 'JK / Jakarta' },
  { id: 2, name: 'Server IPv4 address', value: '192.111.111.111' },
  // { id: 3, name: 'Server IPv6 address', value: '2001:448a:3053:87d:bca2:1692:dea4:40ca' },
  { id: 2, name: 'Server domain name', value: 'ripandis.com' },
]

const Popup = () => {
  const [version] = useState('0.1.0')

  return (
    <div className="w-100 bg-white">
      <header className="py-2.5 px-3.5 bg-green-500 text-white flex items-center justify-between">
        <div>
          <h1 className="font-medium text-sm">
            Your IP : <span className="hover:underline cursor-pointer">192.168.1.1</span>
          </h1>
        </div>
        <div>
          <a
            href="https://github.com/riipandi/chrome-ext-kepo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 h-5 hover:text-green-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          </a>
        </div>
      </header>

      <main className="pb-2 pt-1">
        <div className="flex flex-col">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900">
                  Metadata
                </th>
                <th className="py-2 pl-3 pr-4 text-right text-xs font-semibold text-gray-900">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {metadata.map((meta) => (
                <tr key={meta.id} className="border-t border-gray-200">
                  <td className="py-2 pl-4 pr-3 text-gray-900 text-xs">{meta.name}</td>
                  <td className="py-2 px-3 font-mono text-xs text-right text-gray-500">
                    {meta.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

render(<Popup />, document.getElementById('app') as HTMLElement)
