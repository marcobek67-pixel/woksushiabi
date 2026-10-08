import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeading({ eyebrow, title, align = 'center', className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7 }}
      className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.4em] text-ember md:text-xs">
        <span className="h-1 w-1 rounded-full bg-ember" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-black leading-[1.05] text-cream md:text-6xl">
        {title}
      </h2>
    </motion.div>
  )
}
