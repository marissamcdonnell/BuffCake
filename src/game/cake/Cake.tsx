import { cn } from '../../library/utils/cn.ts'
import { BIG_SMILE_BUFF, MAX_BUFF, SWEATBAND_BUFF } from '../game.consts.ts'
import { GAME_LABELS } from '../game.strings.ts'

type CakeProps = {
  buff: number
  flexing: boolean
}

export const Cake = ({ buff, flexing }: CakeProps) => {
  const growth = buff / MAX_BUFF // 0 → 1
  const bicep = 6 + growth * 22
  const armWidth = 5 + growth * 6

  return (
    <svg
      viewBox="0 0 300 240"
      className={cn('w-full max-w-sm', flexing && 'animate-flex')}
      role="img"
      aria-label={GAME_LABELS.cakeImage(buff)}
    >
      {/* plate */}
      <ellipse cx="150" cy="220" rx="110" ry="12" fill="#e7e2ea" />

      {/* arms: shoulder → elbow → fist, bicep bulge at the elbow */}
      {[-1, 1].map((side) => {
        const shoulderX = 150 + side * 70
        const elbowX = 150 + side * 112
        const fistX = 150 + side * 104
        return (
          <g key={side} stroke="var(--color-sponge)" strokeLinecap="round" fill="none">
            <path
              d={`M ${shoulderX} 150 L ${elbowX} 140 L ${fistX} 92`}
              strokeWidth={armWidth}
              strokeLinejoin="round"
            />
            <circle
              cx={(shoulderX + elbowX) / 2 + side * 4}
              cy={140 - bicep * 0.4}
              r={bicep}
              fill="var(--color-sponge)"
              stroke="none"
            />
            <circle cx={fistX} cy={88} r={armWidth + 3} fill="var(--color-sponge)" stroke="none" />
          </g>
        )
      })}

      {/* bottom tier */}
      <rect x="70" y="140" width="160" height="70" rx="12" fill="var(--color-sponge)" />
      <path
        d="M70 152 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0"
        fill="none"
        stroke="var(--color-frosting)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* top tier */}
      <rect x="95" y="88" width="110" height="56" rx="10" fill="var(--color-sponge)" />
      <rect x="95" y="84" width="110" height="16" rx="8" fill="var(--color-frosting)" />

      {buff >= SWEATBAND_BUFF && (
        <rect x="93" y="104" width="114" height="8" rx="4" fill="var(--color-berry)" />
      )}

      {/* face */}
      <circle cx="132" cy="122" r="4" fill="var(--color-cocoa)" />
      <circle cx="168" cy="122" r="4" fill="var(--color-cocoa)" />
      <path
        d={buff >= BIG_SMILE_BUFF ? 'M136 132 q14 10 28 0' : 'M138 134 q12 6 24 0'}
        fill="none"
        stroke="var(--color-cocoa)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* cherry */}
      <circle cx="150" cy="78" r="9" fill="var(--color-berry)" />
      <path d="M150 70 q4 -12 12 -14" fill="none" stroke="#4a7c3a" strokeWidth="2.5" />
    </svg>
  )
}
