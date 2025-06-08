import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogIn, Pencil, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MainLogo from '../../public/main-logo.png';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-black/20 border-b border-purple-500/20">
        <Link
          href="/"
          className="flex items-center justify-center"
        >
          <div className="flex items-center space-x-2">
            <Image
              src={MainLogo}
              alt="Round Strike Logo"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-2xl font-bold text-white">Round Strike</span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#register"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Create account
          </Link>
          <Link
            href="#login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
        </nav>
      </header>

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
                  Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-600 hover:bg-purple-200 hover:text-purple-800 px-8 py-3 cursor-pointer"
                >
                  <Pencil className="h-5 w-5" />
                  Create your account
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

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-purple-500/30 bg-black/40">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Round Strike. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
          >
            Support
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-white"
          >
            Discord
          </Link>
        </nav>
      </footer>
    </div>
  );
}
