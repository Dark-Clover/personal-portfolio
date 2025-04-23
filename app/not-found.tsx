import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-9xl font-bold text-gray-700/20 absolute">404</div>
      <div className="relative z-10 text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Page Not Found</h1>
        <p className="text-foreground/70 mb-8">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
