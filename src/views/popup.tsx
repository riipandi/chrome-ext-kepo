import { render } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { parse } from 'tldts'
import 'virtual:windi.css'

import { PopUpLayout } from '../components/Layout'
import { MetaSection } from '../components/MetaSection'
import { IPInfoType } from '../types'
import { classNames, getClientInfo, parseClientMeta, parseHostMeta } from '../utils'

const Popup = () => {
  const [activeTabId, setActiveTabId] = useState<number>(1)
  const [currentDomain, setCurrentDomain] = useState<string>('')
  const [clientInfo, setClientInfo] = useState<IPInfoType | undefined>(undefined)
  const [serverInfo, setServerInfo] = useState<any | undefined>(undefined)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async ([currentTab]) => {
      const domain = parse(currentTab.url || '').domain || ''
      const hostname = parse(currentTab.url || '').hostname || ''
      setCurrentDomain(hostname)
      setClientInfo(await getClientInfo())
      setServerInfo(await parseHostMeta(domain))
    })
  }, [])

  const metadata = useMemo(() => {
    return {
      clientMeta: parseClientMeta(clientInfo),
      serverMeta: serverInfo,
    }
  }, [currentDomain, clientInfo, serverInfo])

  if (!clientInfo || !serverInfo) {
    return (
      <PopUpLayout domain={currentDomain}>
        <div className="h-9 py-2 px-3">Loading information...</div>
      </PopUpLayout>
    )
  }

  return (
    <PopUpLayout domain={currentDomain}>
      <main className="block">
        <nav className="isolate flex divide-x divide-gray-200" aria-label="Tabs">
          {[
            { id: 1, name: 'Website Info' },
            { id: 2, name: 'Client Info' },
          ].map((tab, tabIdx) => (
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
          className={classNames(activeTabId > 2 && 'hidden')}
          metadata={activeTabId == 1 ? metadata.serverMeta : metadata.clientMeta}
          currentDomain={activeTabId == 1 ? currentDomain : ''}
        />
      </main>
    </PopUpLayout>
  )
}

render(<Popup />, document.getElementById('app') as HTMLElement)
