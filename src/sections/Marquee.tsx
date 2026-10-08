/** Chegarasiz yugurib turuvchi lenta */
export function Marquee() {
  const items = ['WOK', 'SUSHI', 'LAVASH', 'BURGER', 'PITSA', 'VAFLI', 'NAMANGAN', 'TOSHBULOQ']
  const row = [...items, ...items]

  return (
    <div className="relative z-10 -mt-px overflow-hidden border-y border-white/5 bg-coal py-5">
      <div className="anim-loop flex w-max animate-marquee gap-10 whitespace-nowrap mask-fade-x">
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`font-display text-2xl font-extrabold tracking-wide md:text-4xl ${
                i % 3 === 1 ? 'text-stroke-cream' : 'text-cream/90'
              }`}
            >
              {it}
            </span>
            <span className="h-2 w-2 rotate-45 bg-ember" />
          </span>
        ))}
      </div>
    </div>
  )
}
