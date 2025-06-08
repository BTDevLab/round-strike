import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogIn, Pencil, Star, Users } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <main className="flex flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge
                variant="secondary"
                className="bg-purple-600/20 text-purple-200 border-purple-400/30"
              >
                Now in Development
              </Badge>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  Round Strike
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
                  Embark on an epic turn-based RPG adventure. Master strategic combat,
                  forge legendary weapons, and unite with allies to save the realm.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 cursor-pointer"
                >
                  <LogIn className="h-5 w-5" />
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-600 hover:bg-purple-200 hover:text-purple-800 px-8 py-3 cursor-pointer"
                >
                  <Pencil className="h-5 w-5" />
                  <Link href="/register">Create your account</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>10/10 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>2 Players (for now)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
