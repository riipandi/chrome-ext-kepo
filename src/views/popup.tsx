import { render } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { parse } from 'tldts'
import 'virtual:windi.css'

import { AboutButton } from '../components/Button'
import { MetaSection } from '../components/MetaSection'
import { classNames } from '../utils'

const tabs = [
  { id: 1, name: 'Server Info' },
  { id: 2, name: 'Client Info' },
]

const Popup = () => {
  const [currentTabDomain, setCurrentTabDomain] = useState<any | undefined>(undefined)
  const [userInfo, setClientInfo] = useState<any | undefined>(undefined)
  const [hostInfo, setHostInfo] = useState<any | undefined>(undefined)
  const [activeTabId, setActiveTabId] = useState<number>(1)

  const metadata = useMemo(() => {
    return {
      clientMeta: [
        { name: 'Your IP Address', value: null },
        { name: 'ISP Name', value: null },
        { name: 'ISP Country', value: null },
        { name: 'ISP Region', value: null },
      ],
      serverMeta: [
        { name: 'Page loading time', value: null },
        { name: 'Host IPv4 address', value: null },
        { name: 'Host IPv6 address', value: null },
      ],
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://ipwho.is`)
      const data = await response.json()
      setClientInfo(data)
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
      const url = parse(currentTab.url || '')
      const currentTabID = currentTab.id || 0

      chrome.tabs.sendMessage(currentTabID, '', (response) => {
        console.log('DEBUG ~ response', response)
        setHostInfo(response)
      })

      setCurrentTabDomain(url.domain)
      fetchData()
    })
  }, [])

  return (
    <div className="w-100 bg-white">
      <header className="py-2.5 px-3.5 bg-green-500 text-white flex items-center justify-between">
        <div>
          <h1 className="font-medium text-sm">{currentTabDomain}</h1>
        </div>
        <div>
          <AboutButton />
        </div>
      </header>

      <main className="block">
        <nav className="isolate flex divide-x divide-gray-200" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <button
              type="button"
              key={tab.name}
              className={classNames(
                activeTabId === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden bg-white p-2 text-xs font-medium text-center hover:bg-gray-50 focus:z-10',
              )}
              aria-current={activeTabId === tab.id ? 'page' : undefined}
              onClick={() => setActiveTabId(tab.id)}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  activeTabId === tab.id ? 'bg-green-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                )}
              />
            </button>
          ))}
        </nav>

        <MetaSection
          metadata={activeTabId == 1 ? metadata.serverMeta : metadata.clientMeta}
          currentTabDomain={activeTabId == 1 && currentTabDomain}
        />
      </main>
    </div>
  )
}

render(<Popup />, document.getElementById('app') as HTMLElement)
