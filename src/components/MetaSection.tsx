import { classNames } from '../utils'

interface MetaSectionProps {
  currentDomain?: string
  metadata: any
  className?: string
}

export const MetaSection = ({ currentDomain, metadata, className }: MetaSectionProps) => {
  return (
    <div className={classNames(className && className, 'flex flex-col pb-2 pt-1')}>
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
          {metadata?.map((meta: any, idx: number) => (
            <tr key={meta.name} className={classNames(idx > 0 && 'border-t border-gray-200')}>
              <td className="py-2 pl-4 pr-3 text-gray-900 text-xs">{meta.name}</td>
              <td className="py-2 px-3 font-mono text-xs text-right text-gray-500">
                {meta.url ? (
                  <a
                    href={meta.url}
                    className="hover:text-blue-500"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {meta.value}
                  </a>
                ) : (
                  <span>{meta.value || '-'}</span>
                )}
              </td>
            </tr>
          ))}

          {/* {currentDomain && (
            <>
              <tr className="border-t border-gray-200">
                <td className="py-2 pl-4 pr-3 text-gray-900 text-xs">Host NS Lookup</td>
                <td className="py-2 px-3 font-mono text-xs text-right text-gray-500">
                  <a
                    href={`https://dmns.app/${currentDomain}/dns-records`}
                    className="hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here for more details
                  </a>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="py-2 pl-4 pr-3 text-gray-900 text-xs">WHOIS Domain</td>
                <td className="py-2 px-3 font-mono text-xs text-right text-gray-500">
                  <a
                    href={`https://dmns.app/${currentDomain}/whois`}
                    className="hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here for more details
                  </a>
                </td>
              </tr>
            </>
          )} */}
        </tbody>
      </table>
    </div>
  )
}
