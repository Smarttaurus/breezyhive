interface BeeIconProps {
  size?: number
  className?: string
}

export default function BeeIcon({ size = 40, className = '' }: BeeIconProps) {
  return (
    <div
      className={`bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-2xl" style={{ fontSize: size * 0.6 }}>
        🐝
      </span>
    </div>
  )
}
