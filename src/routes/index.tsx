import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/shadcn/button'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-xl">Notes made for Developers</h1>
      <Link to="/notes">
        <Button size={'sm'}>Get Started</Button>
      </Link>
    </div>
  )
}
