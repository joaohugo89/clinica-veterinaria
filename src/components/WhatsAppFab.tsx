import { WhatsAppIcon } from './icons'
import { whatsappLink } from '../lib/whatsapp'

/** Botão flutuante de WhatsApp, fixo no canto inferior direito. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-lift transition hover:scale-105"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  )
}
