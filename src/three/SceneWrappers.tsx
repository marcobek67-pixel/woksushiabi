/**
 * Canvas yordamchilari:
 *  - Scene3DBoundary — xato bo'lsa rasmga fallback (past darajali qurilmalar)
 *  - useVisible — IntersectionObserver bilan ko'rinish holati
 *  - VisibleCanvas — ko'rinmaganda render'ni to'xtatuvchi Canvas
 */
import { Component, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'

interface BoundaryProps {
  fallback: string
  alt: string
  children: ReactNode
}

export class Scene3DBoundary extends Component<BoundaryProps> {
  state = { error: false }

  static getDerivedStateFromError() {
    return { error: true }
  }

  componentDidCatch() {
    // WebGL context yo'qolishi yoki 3D xato — jim o'tkazamiz
  }

  render() {
    if (this.state.error) {
      return (
        <img
          src={this.props.fallback}
          alt={this.props.alt}
          className="h-full w-full object-cover"
        />
      )
    }
    return this.props.children
  }
}

export function useVisible<T extends HTMLElement>(rootMargin = '250px') {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  const [everVisible, setEverVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setEverVisible(true)
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, visible, everVisible }
}

interface VisibleCanvasProps extends CanvasProps {
  wrapperClassName?: string
}

export function VisibleCanvas({ wrapperClassName, children, ...canvasProps }: VisibleCanvasProps) {
  const { ref, visible, everVisible } = useVisible<HTMLDivElement>()
  return (
    <div ref={ref} className={wrapperClassName ?? 'absolute inset-0'}>
      {everVisible && (
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          style={{ position: 'absolute', inset: 0 }}
          {...canvasProps}
        >
          {children}
        </Canvas>
      )}
    </div>
  )
}
