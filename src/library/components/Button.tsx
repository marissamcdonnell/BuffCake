import type { ComponentProps } from 'react'
import { cn } from '../utils/cn.ts'

// No tailwind-merge here, so variants must not set the same property as each other or as base.
const VARIANTS = {
  primary: 'rounded-full bg-berry py-3 font-display text-lg font-bold text-white',
  outline: 'rounded-full border-2 border-frosting px-4 font-display',
  tile: 'flex flex-col items-center rounded-2xl border-2 border-transparent bg-white p-2 hover:border-frosting aria-pressed:border-berry aria-pressed:bg-frosting',
} as const

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof VARIANTS
}

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => (
  <button
    type="button"
    className={cn('transition disabled:opacity-40', VARIANTS[variant], className)}
    {...props}
  />
)
