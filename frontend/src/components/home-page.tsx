import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
            Choose Your Champion
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-2">
            Select an existing hero or forge a new legend.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full">
          {/* Existing Characters */}
          <Link
            href="/character/1"
            className="flex flex-col space-y-4"
          >
            <Card className="flex flex-col items-center p-4 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:from-purple-800/60 hover:to-pink-800/60 transition-all duration-200 cursor-pointer">
              <Image
                src="/placeholder.svg?height=120&width=120"
                width={120}
                height={120}
                alt=""
                className="rounded-full object-cover mb-3 border-2 border-purple-400"
              />
              <CardTitle className="text-xl font-semibold text-white">
                Elara, The Swiftblade
              </CardTitle>
              <CardDescription className="text-gray-300 text-sm">
                Level 32 - Rogue
              </CardDescription>
            </Card>
            <div className="flex w-full flex-row gap-4 space-x-2">
              <Button
                variant="secondary"
                className="flex-1 bg-purple-600/20 text-purple-200 hover:bg-purple-600/40 text-md cursor-pointer"
              >
                Start Game
              </Button>
            </div>
          </Link>

          {/* New Character Button */}
          <Link
            href="/character-creation"
            className="block"
          >
            <Card className="flex flex-col items-center justify-center p-6 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:from-purple-800/60 hover:to-pink-800/60 transition-all duration-200 cursor-pointer">
              <Plus className="h-32 w-32 text-purple-300" />
              <CardDescription className="text-xl font-semibold text-white">
                Create a new character
              </CardDescription>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
