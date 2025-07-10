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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function CharacterCreationPage() {
  // Function that handle the Create Character button
  const handleInput = async () => {
    try {
      console.log(`Creating character: ${characterName} of class ${characterClass}`);

      const selectedClass = classDescription.find((cls) => cls.key === characterClass);
      if (!selectedClass) {
        console.log('Error', 'Selected class not found.', 'error');
        return;
      }

      console.log('MY SELECTED CLASS', selectedClass);

      // Retreive JWT from the local storage
      const token = localStorage.getItem('token');
      // TODO. CHECK IF THATS CORRECT. I PERSONALLY DON'T THINK IT SHOULD BE LIKE THIS
      if (!token) {
        console.log("'Error', 'Authentication token not found. Please log in.', 'error'");
        router.push('/login');
        return;
      }
      // END TODO...

      const res = await fetch(`${API_URL}/characters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },

        body: JSON.stringify({ name: characterName, class_id: selectedClass.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create character.');
      }

      setCharacterName('');
      router.push('/home');
    } catch (error: any) {
      console.error('Error creating character:', error);
    }
  };

  // Function that handles the character name input field
  const handleCharacterNameInput = (value: string) => {
    setCharacterName(value);
  };

  const [characterClass, setCharacterClass] = useState('knight');
  const [characterName, setCharacterName] = useState('');
  const router = useRouter();

  const classDescription = [
    {
      key: 'knight',
      id: '98cbfb14-ff65-451f-a05e-7095db68ba7d',
      name: 'Knight',
      description:
        'A strong fighter with heavy armor. Great for taking hits and dealing solid melee damage.',
    },
    {
      key: 'cleric',
      id: '2ed39b84-d1ff-4df1-909b-50fabd4ea3c0',
      name: 'Cleric',
      description:
        'A support class that can heal and use light magic. Balanced and good for longer battles.',
    },
    {
      key: 'wizard',
      id: '5db93c49-6ca9-4bee-881e-27c5dc72e961',
      name: 'Wizard',
      description:
        'A powerful spellcaster with high damage. Fragile, but can destroy enemies from a distance.',
    },
    {
      key: 'hunter',
      id: '61a4ea3b-2703-4cf5-9b90-3e2c6701bddb',
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
                      value={characterName}
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
