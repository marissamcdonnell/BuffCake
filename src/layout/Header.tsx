import { HEADER_LABELS } from './layout.strings.ts'

export const Header = () => (
  <header className="text-center">
    <h1 className="font-display text-4xl font-bold text-berry">{HEADER_LABELS.title}</h1>
    <p className="text-sm text-cocoa/70">{HEADER_LABELS.tagline}</p>
  </header>
)
