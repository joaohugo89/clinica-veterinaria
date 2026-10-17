/* Ícones inline (sem dependência externa). Todos herdam a cor do texto. */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function PawIcon({ width = 20, height = 20, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <circle cx="6.5" cy="9" r="2.3" />
      <circle cx="11" cy="5.8" r="2.3" />
      <circle cx="16.5" cy="7.6" r="2.3" />
      <circle cx="19.6" cy="12.4" r="1.9" />
      <path d="M12.4 12.2c2.6 0 4.9 2.3 5.4 4.3.4 1.7-.8 3-2.5 3-1 0-1.9-.4-2.9-.4s-1.9.4-2.9.4c-1.7 0-2.9-1.3-2.5-3 .5-2 2.8-4.3 5.4-4.3z" />
    </svg>
  )
}

export function PulseIcon({ width = 22, height = 22, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} aria-hidden {...rest}>
      <path d="M3 12h4l2 5 4-12 2 7h6" />
    </svg>
  )
}

export function SyringeIcon({ width = 22, height = 22, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} aria-hidden {...rest}>
      <path d="M17 3l4 4M19 5l-9.5 9.5L7 17l-2 2m0-6l6 6M13.5 8.5l2 2" />
    </svg>
  )
}

export function HospitalIcon({ width = 22, height = 22, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} aria-hidden {...rest}>
      <path d="M12 3v6M9 6h6M5 21V11a7 7 0 0114 0v10M9 21v-4h6v4" />
    </svg>
  )
}

export function HeartIcon({ width = 22, height = 22, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} aria-hidden {...rest}>
      <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" />
    </svg>
  )
}

export function CheckIcon({ width = 18, height = 18, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...rest}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function MenuIcon({ width = 18, height = 18, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...rest}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

export function CloseIcon({ width = 18, height = 18, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...rest}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function WhatsAppIcon({ width = 18, height = 18, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 00-.7.3A2.9 2.9 0 006 11a5 5 0 001.1 2.6 11.4 11.4 0 004.4 3.9c1.7.7 2 .6 2.4.5a2.5 2.5 0 001.6-1.2 2 2 0 00.1-1.2l-.2-.4z" />
    </svg>
  )
}

export function InstagramIcon({ width = 16, height = 16, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden {...rest}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon({ width = 16, height = 16, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
    </svg>
  )
}

export function YouTubeIcon({ width = 16, height = 16, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
      <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 00-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 001.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 001.8-1.8C22 15.2 22 12 22 12zM10 15V9l5 3-5 3z" />
    </svg>
  )
}

export function UserIcon({ width = 16, height = 16, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} aria-hidden {...rest}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20a7.5 7.5 0 0115 0" />
    </svg>
  )
}

export function PhoneIcon({ width = 16, height = 16, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} aria-hidden {...rest}>
      <path d="M5 3h3l2 5-2.5 1.5a12 12 0 006 6L15 13l5 2v3a2 2 0 01-2.2 2A16.5 16.5 0 013 7.2 2 2 0 015 5z" />
    </svg>
  )
}

export function StethoscopeIcon({ width = 16, height = 16, ...rest }: IconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...stroke} aria-hidden {...rest}>
      <path d="M6 3v5a4 4 0 008 0V3" />
      <path d="M10 15v1a5 5 0 0010 0v-2" />
      <circle cx="20" cy="11" r="2" />
      <path d="M10 12v3" />
    </svg>
  )
}

/** Mapas usados pelos dados em src/data/site.ts */
export const serviceIcons = {
  pulse: PulseIcon,
  syringe: SyringeIcon,
  hospital: HospitalIcon,
  heart: HeartIcon,
} as const

export const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
} as const
