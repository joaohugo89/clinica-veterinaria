import { site } from '../data/site'

/** Monta um link wa.me com a mensagem já codificada. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
