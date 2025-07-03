'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CharacterCreationPage() {
  // Function that handle the Create Character button
  function handleInput() {
    console.log(`Creating character: ${charName} of class ${characterClass}`);
    setCharName('');
    router.push('/home');
  }

  // Function that handles the character name input field
  function handleCharacterNameInput(value: string) {
    setCharName(value);
  }

  const [characterClass, setCharacterClass] = useState('knight');
  const [charName, setCharName] = useState('');
  const router = useRouter();

  const classDescription = [
    {
      key: 'knight',
      name: 'Knight',
      description:
        'A strong fighter with heavy armor. Great for taking hits and dealing solid melee damage.',
    },
    {
      key: 'cleric',
      name: 'Cleric',
      description:
        'A support class that can heal and use light magic. Balanced and good for longer battles.',
    },
    {
      key: 'wizard',
      name: 'Wizard',
      description:
        'A powerful spellcaster with high damage. Fragile, but can destroy enemies from a distance.',
    },
    {
      key: 'hunter',
      name: 'Hunter',
      description:
        'A quick and agile archer. Good at striking from afar and avoiding damage.',
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-sm flex-col place-content-center gap-6">
        <Tabs
          defaultValue="knight"
          onValueChange={setCharacterClass}
        >
          <TabsList className="w-full">
            <TabsTrigger value="knight">Knight</TabsTrigger>
            <TabsTrigger value="cleric">Cleric</TabsTrigger>
            <TabsTrigger value="wizard">Wizard</TabsTrigger>
            <TabsTrigger value="hunter">Hunter</TabsTrigger>
          </TabsList>
          {classDescription.map((cls) => (
            <TabsContent
              value={cls.key}
              key={cls.key}
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{cls.name}</CardTitle>
                  <CardDescription>{cls.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-name">Name</Label>
                    <Input
                      id="tabs-demo-name"
                      placeholder="Character name"
                      onChange={(e) => handleCharacterNameInput(e.target.value)}
                      value={charName}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleInput}>Create a {cls.name}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
}
