import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Mail, Play, Shield, Star, Sword, Users, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
              <Sword className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Round Strike</span>
          </div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#gameplay"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Gameplay
          </Link>
          <Link
            href="#download"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Download
          </Link>
          <Link
            href="#community"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Community
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge
                variant="secondary"
                className="bg-purple-600/20 text-purple-200 border-purple-400/30"
              >
                Now Available in Early Access
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
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Play Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-600 hover:bg-purple-200 hover:text-purple-800 px-8 py-3"
                >
                  {/* <Download className="mr-2 h-5 w-5" /> */}
                  Register your account
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>50K+ Players</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Preview */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-white">
                Experience Epic Battles
              </h2>
              <div className="w-full max-w-4xl">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  width={800}
                  height={400}
                  alt="Round Strike gameplay screenshot"
                  className="mx-auto rounded-lg shadow-2xl border border-purple-500/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Game Features
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Discover what makes Round Strike the ultimate RPG experience
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Sword className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Strategic Combat</CardTitle>
                  <CardDescription className="text-gray-300">
                    Master turn-based battles with deep tactical gameplay and combo
                    systems
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Character Progression</CardTitle>
                  <CardDescription className="text-gray-300">
                    Customize your hero with unique skills, abilities, and legendary
                    equipment
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Multiplayer Guilds</CardTitle>
                  <CardDescription className="text-gray-300">
                    Join forces with other players in epic guild battles and raids
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Magical Abilities</CardTitle>
                  <CardDescription className="text-gray-300">
                    Harness the power of elemental magic and devastating special attacks
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Epic Storyline</CardTitle>
                  <CardDescription className="text-gray-300">
                    Experience a rich narrative with memorable characters and plot twists
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">Regular Updates</CardTitle>
                  <CardDescription className="text-gray-300">
                    New content, features, and events added regularly to keep the
                    adventure fresh
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold text-white">50K+</div>
                <div className="text-gray-300">Active Players</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold text-white">100+</div>
                <div className="text-gray-300">Unique Weapons</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold text-white">25+</div>
                <div className="text-gray-300">Epic Dungeons</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold text-white">4.8★</div>
                <div className="text-gray-300">Player Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section
          id="community"
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Join the Adventure
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                  Get the latest updates, exclusive content, and be the first to know
                  about new features and events.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border-purple-400/30 text-white placeholder:text-gray-400"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  Join 10,000+ players getting exclusive updates.{' '}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section
          id="download"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-t border-purple-500/30"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Begin Your Quest?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                  Download Round Strike now and start your epic adventure. Free to play
                  with optional premium content.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download for PC
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-200 hover:bg-purple-600/20 px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Play in Browser
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                Available on Windows, Mac, and Linux • Minimum 4GB RAM recommended
              </p>
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
