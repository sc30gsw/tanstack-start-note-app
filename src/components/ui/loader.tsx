import { Loader2 } from 'lucide-react'

export default function Loader() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Loader2 size={48} className="animate-spin" />
    </div>
  )
}
