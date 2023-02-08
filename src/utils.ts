import { parse } from 'tldts'
import { IPInfoType } from './types'

export function isValidDomain(url: string): boolean {
  const v = parse(url)
  if (!url || !v.domain) return false
  const re = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi
  return re.test(v.domain)
}

export async function getClientInfo(ip?: string) {
  const fetchAddr = ip ? `https://ipwho.is/${ip}` : 'https://ipwho.is'
  const response = await fetch(fetchAddr)
  return await response.json()
}

export async function gethostIpAddr(domain: string): Promise<string | undefined> {
  const response = await fetch(`https://networkcalc.com/api/dns/lookup/${domain}`)
  const result = await response.json()
  const records = result.records['A'][0].address
  return records
}

export async function getDomainWhois(domain: string): Promise<any | undefined> {
  const response = await fetch(`https://networkcalc.com/api/dns/whois/${domain}`)
  const result = await response.json()
  return result.whois
}

export function parseClientMeta(userInfo: IPInfoType | undefined) {
  const ispCountry = `${userInfo?.country_code || '-'} - ${userInfo?.country || '-'}`
  const ispRegion = `${userInfo?.region_code || '-'} - ${userInfo?.region || '-'}`
  const coordinates = `${userInfo?.latitude || '-'},${userInfo?.longitude || '-'}`
  const mapsUrl = `https://www.bing.com/maps/?cp=${userInfo?.latitude}~${107.6191228}&lvl=14.0`

  return [
    { name: 'Your IP Address', value: userInfo?.ip, url: null },
    { name: 'AS Number', value: userInfo?.connection.asn, url: null },
    { name: 'ISP Name', value: userInfo?.connection.isp, url: null },
    { name: 'ISP Country', value: ispCountry, url: null },
    { name: 'ISP Region', value: ispRegion, url: null },
    { name: 'ISP City', value: userInfo?.city, url: null },
    { name: 'Coordinates', value: coordinates, url: mapsUrl },
  ]
}

export async function parseHostMeta(domain: string) {
  const whoisData = await getDomainWhois(domain)
  const hostIpAddr = await gethostIpAddr(domain)
  const serverInfo: IPInfoType = await getClientInfo(hostIpAddr)
  console.log('DEBUG ~ serverInfo', serverInfo)

  return [
    // { name: 'Page loading time', value: null },
    { name: 'Host IPv4 address', value: hostIpAddr },
    { name: 'Host IPv6 address', value: null },
    { name: 'Host AS Number', value: serverInfo?.connection.asn },
    { name: 'Host ISP Name', value: serverInfo?.connection.isp },
    { name: 'Host ORG Name', value: serverInfo?.connection.org },
    { name: 'Domain Registrar Name', value: whoisData?.registrar },
    {
      name: 'Domain Registration Date',
      value: formatDate(whoisData.registry_created_date || undefined),
    },
    {
      name: 'Domain Expiration Date',
      value: formatDate(whoisData.registry_expiration_date || undefined),
    },
    { name: 'Domain Status', value: whoisData?.domain_status },
  ]
}

export function getPageTitle() {
  const tag = document.querySelector('title') as HTMLSpanElement
  return tag?.innerText ?? 'undefined'
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateString: Date | string | undefined): string | undefined {
  if (!dateString) return undefined
  const date = new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return date.toString()
}
