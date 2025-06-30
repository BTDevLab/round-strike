import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const characters = [
  {
    id: 1,
    name: 'Elara, The Swiftblade',
    level: 32,
    class: 'Rogue',
    image: '/placeholder.svg?height=120&width=120',
  },
  {
    id: 2,
    name: 'Kael, The Stormcaller',
    level: 27,
    class: 'Mage',
    image: '/placeholder.svg?height=120&width=120',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
            Choose Your Champion
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-2">
            Select an existing hero or forge a new legend.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-start w-full max-w-6xl">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Carousel className="relative mb-4">
              <CarouselContent>
                {characters.map((char) => (
                  <CarouselItem key={char.id}>
                    <div>
                      <Card className="flex flex-col items-center p-4 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 transition-all duration-200 cursor-pointer">
                        <Image
                          src={char.image}
                          width={120}
                          height={120}
                          alt=""
                          className="rounded-full object-cover border-2 border-purple-400"
                        />
                        <CardTitle className="text-xl font-semibold text-white">
                          {char.name}
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-sm">
                          Level {char.level} - {char.class}
                        </CardDescription>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-transparent border-none shadow-none hover:bg-purple-700/30 p-2 cursor-pointer text-gray-300 hover:text-white" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-transparent border-none shadow-none hover:bg-purple-700/30 p-2 cursor-pointer text-gray-300 hover:text-white" />
            </Carousel>

            <Link href="">
              <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white text-md px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200">
                Start Game
              </Button>
            </Link>
          </div>

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Link
              href="/character-creation"
              className="block"
            >
              <Card className="flex flex-col items-center justify-center p-6 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:from-purple-800/60 hover:to-pink-800/60 transition-all duration-200 cursor-pointer">
                <Plus className="h-32 w-32 text-purple-300" />
                <CardDescription className="text-xl font-semibold text-white text-center">
                  Create a new character
                </CardDescription>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
