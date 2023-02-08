import { parse } from 'tldts'
import { IPInfoType } from './types'
import { WhoisType } from './types/whois'

function isValidDomain(url: string): boolean {
  const v = parse(url)
  if (!url || !v.domain) return false
  const re = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi
  return re.test(v.domain)
}

async function getClientInfo(): Promise<IPInfoType> {
  const response = await fetch('https://kepo.deno.dev/ip')
  return await response.json()
}

async function getRemoteInfo(host: string): Promise<IPInfoType> {
  const response = await fetch(`https://kepo.deno.dev/host-ip/${host}`)
  return await response.json()
}

async function getDomainWhois(domain: string): Promise<WhoisType> {
  const response = await fetch(`https://kepo.deno.dev/whois/${domain}`)
  const result = await response.json()
  return result
}

function getPageTitle() {
  const tag = document.querySelector('title') as HTMLSpanElement
  return tag?.innerText ?? 'undefined'
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function formatDate(dateString: Date | string | undefined): string | undefined {
  if (!dateString) return undefined
  const date = new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZoneName: 'short',
  })
  return date.toString()
}

async function parseClientInfo() {
  const userInfo = await getClientInfo()
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

async function parseServerInfo(url: string) {
  const serverInfo = await getRemoteInfo(parse(url).hostname as string)
  const whoisData = await getDomainWhois(parse(url).domain as string)

  return [
    // { name: 'Page loading time', value: null },
    { name: 'Host IPv4 address', value: serverInfo?.ip },
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

export {
  classNames,
  formatDate,
  getClientInfo,
  getDomainWhois,
  getPageTitle,
  getRemoteInfo,
  isValidDomain,
  parseClientInfo,
  parseServerInfo,
}
