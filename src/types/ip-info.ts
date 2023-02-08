export type IPInfoType = {
  ip: string
  success: boolean
  type: string
  continent: string
  continent_code: string
  country: string
  country_code: string
  region: string
  region_code: string
  city: string
  latitude: string
  longitude: string
  is_eu: boolean
  postal: number
  calling_code: number
  capital: string
  borders: string
  flag: {
    img: string
    emoji: any
    emoji_unicode: string
  }
  connection: {
    asn: number
    org: string
    isp: string
    domain: string
  }
  timezone: {
    id: string
    abbr: string
    is_dst: boolean
    offset: number
    utc: string
    current_time: Date | string
  }
}
