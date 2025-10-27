import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`card ${hover ? 'hover:shadow-xl' : ''} ${className}`}>
      {children}
    </div>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  color?: string
}

export function FeatureCard({ icon, title, description, color = 'primary' }: FeatureCardProps) {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary/10',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    indigo: 'bg-indigo-100',
  }

  return (
    <Card className="transform hover:-translate-y-1 transition-all duration-200">
      <div className={`w-14 h-14 ${colorMap[color]} rounded-xl flex items-center justify-center mb-4`}>
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  )
}
