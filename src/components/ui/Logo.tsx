export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="abi-fire" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#E8380D" />
          <stop offset="0.55" stopColor="#FF5A1F" />
          <stop offset="1" stopColor="#E8B44A" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="#0A0908" stroke="rgba(255,90,31,0.35)" />
      <path
        d="M33.2 9c.9 7.4-6.3 11.5-6.3 18.4 0 2.9 1.6 5 3.7 5.9-1.1-2.9.4-5.5 2.5-7.1.2 3.4 2.1 5.3 3.9 7.3 1.9 2.1 3.4 4.4 3.4 7.7 0 5.9-4.9 10.3-10.9 10.3-6.3 0-11-4.6-11-10.8C18.5 28.4 27 15.9 33.2 9z"
        fill="url(#abi-fire)"
      />
      <path
        d="M32 41.5c1.9 1.6 3 3.3 3 5.4 0 2.5-2 4.4-4.4 4.4s-4.4-1.9-4.4-4.4c0-2.4 1.5-3.9 2.9-5.6.6 1.3 1.3 2 1.8 2.5.4-.9.5-1.6 1.2-2.3z"
        fill="#F5EFE6"
        opacity="0.92"
      />
    </svg>
  )
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <LogoMark size={compact ? 34 : 42} />
      <div className="leading-none">
        <div className="font-display text-lg font-extrabold tracking-[0.18em] text-cream">
          ABI
        </div>
        {!compact && (
          <div className="mt-1 text-[9px] font-semibold tracking-[0.32em] text-sand">
            WOK · SUSHI · LAVASH
          </div>
        )}
      </div>
    </div>
  )
}
