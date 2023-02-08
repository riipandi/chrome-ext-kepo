export type WhoisType = {
  domain_status: string
  domain_status_description: string
  registrar: string
  registrar_iana_id: number
  registry_domain_id: string
  registry_created_date: Date | string
  registry_expiration_date: Date | string
  abuse_email: string
  abuse_phone: string
}
