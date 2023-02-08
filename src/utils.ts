import { parse } from 'tldts'

export function isValidDomain(url: string): boolean {
  const v = parse(url)
  if (!url || !v.domain) return false
  const re = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi
  return re.test(v.domain)
}

export async function getClientInfo() {
  const response = await fetch('https://ipwho.is')
  return await response.json()
}

export async function getHostInfo(url: string) {
  const response = await fetch('https://api.geekflare.com/dnsrecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'e5d1ebb9-d1b7-4ad3-9090-335dfe422e9e',
    },
    body: JSON.stringify({ url, types: ['A'] }),
  })
  return await response.json()
}

export function getPageTitle() {
  const tag = document.querySelector('title') as HTMLSpanElement
  return tag?.innerText ?? 'undefined'
}

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
