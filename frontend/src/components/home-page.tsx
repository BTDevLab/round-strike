'use client';

import CharacterCreationForm from '@/components/forms/character-creation-form';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCharacterStore } from '@/stores/character';
import { Loader2, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import DeleteCharacter from './forms/delete-character';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function HomePage() {
  const {
    state: { characters },
    actions: { setCharacters },
  } = useCharacterStore();

  const router = useRouter();

  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateCharDialogOpen, setIsCreateCharDialogOpen] = useState(false);

  const getCharacters = useCallback(
    async (token: string) => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/characters/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const { ok, message } = await res.json();

        if (!ok) {
          throw new Error(message || 'Failed to fetch characters');
        }

        setCharacters(message);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Failed to fetch characters:', err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setCharacters],
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCharacters(token);
      if (isDeleted) {
        setIsDeleted(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [isDeleted, getCharacters]);

  const handleCharacterCreated = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await getCharacters(token);
      } catch (error) {
        console.error('Failed to re-fetch characters after creation:', error);
      }
    }
  };

  const handleCloseCreateCharDialog = () => {
    setIsCreateCharDialogOpen(false);
  };

  const handleAuthError = () => {
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex w-screen items-center justify-center bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
        <Loader2 className="h-16 w-16 animate-spin text-purple-400" />
      </div>
    );
  }

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

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-6xl">
          {characters.length > 0 && (
            <div className="flex flex-col w-full max-w-sm flex-shrink-0">
              <Carousel className="relative mb-4">
                <CarouselContent>
                  {characters.map((char) => (
                    <CarouselItem key={char.ID}>
                      <div className="h-80 min-h-80 max-h-80 flex">
                        <Card className="relative flex flex-col items-center p-4 h-full w-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 transition-all duration-200 cursor-pointer">
                          <DeleteCharacter
                            charID={char.ID}
                            setIsDeleted={setIsDeleted}
                          />
                          <Image
                            src={'/default-avatar.png'}
                            width={120}
                            height={120}
                            alt={char.name}
                            className="rounded-full object-cover border-2 border-purple-400"
                          />
                          <CardTitle className="text-xl font-semibold text-white">
                            {char.name}
                          </CardTitle>
                          <CardDescription className="text-gray-300 text-sm">
                            {char.class.name || 'Unknown Class'} - Level {char.level}
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
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white text-md px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200 mt-2">
                  Start Game
                </Button>
              </Link>
            </div>
          )}

          <div className="flex flex-col w-full max-w-sm h-80 min-h-80 max-h-80 overflow-hidden flex-shrink-0">
            <Dialog
              open={isCreateCharDialogOpen}
              onOpenChange={setIsCreateCharDialogOpen}
            >
              <DialogTrigger asChild>
                <Card className="flex flex-col items-center justify-center p-6 h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 hover:from-purple-800/60 hover:to-pink-800/60 transition-all duration-200 cursor-pointer">
                  <Plus className="h-32 w-32 text-purple-300" />
                  <CardDescription className="text-xl font-semibold text-white text-center">
                    Create a new character
                  </CardDescription>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-purple-700">
                <DialogHeader>
                  <DialogTitle>Create New Character</DialogTitle>
                  <DialogDescription>
                    Enter your character&#39;s name and choose their class.
                  </DialogDescription>
                </DialogHeader>
                <CharacterCreationForm
                  onCharacterCreated={handleCharacterCreated}
                  onCloseDialog={handleCloseCreateCharDialog}
                  onAuthError={handleAuthError}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
