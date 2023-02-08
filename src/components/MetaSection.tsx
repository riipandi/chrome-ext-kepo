import { classNames } from '../utils'

interface MetaSectionProps {
  currentTabDomain?: string
  metadata: any
}

export const MetaSection = ({ currentTabDomain, metadata }: MetaSectionProps) => {
  return (
    <div className="flex flex-col pb-2 pt-1">
      <table className="min-w-full">
        <thead className="sr-only">
          <tr>
            <th className="py-2 pl-4 pr-3 text-left text-xs font-semibold text-gray-900">
              Metadata
            </th>
            <th className="py-2 pl-3 pr-4 text-right text-xs font-semibold text-gray-900">Value</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((meta: any, idx: number) => (
            <tr key={meta.name} className={classNames(idx > 0 && 'border-t border-gray-200')}>
              <td className="py-2 pl-4 pr-3 text-gray-900 text-xs">{meta.name}</td>
              <td className="py-2 px-3 font-mono text-xs text-right text-gray-500">
                {meta.value || '-'}
              </td>
            </tr>
          ))}

          {currentTabDomain && (
            <>
              <tr className="border-t border-gray-200">
                <td className="py-2 pl-4 pr-3 text-gray-900 text-xs">Host NS Lookup</td>
                <td className="py-2 px-3 italic text-xs hover:text-blue-500 text-right text-gray-500">
                  <a
                    href={`https://dmns.app/${currentTabDomain}/dns-records`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here for more details
                  </a>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 pl-4 pr-3 text-gray-900 text-xs">WHOIS Domain</td>
                <td className="py-2 px-3 italic text-xs hover:text-blue-500 text-right text-gray-500">
                  <a
                    href={`https://dmns.app/${currentTabDomain}/whois`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here for more details
                  </a>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}
