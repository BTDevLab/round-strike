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
import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface Class {
  ID: string;
  name: string;
  description: string;
  base_strength: number;
  base_intelligence: number;
  base_dexterity: number;
  base_defense: number;
  base_max_hp: number;
  base_max_mp: number;
}

export default function CharacterCreationPage() {
  // Function that handle the Create Character button
  const handleInput = async () => {
    try {
      // Retreive JWT from the local storage
      const token = localStorage.getItem('token');
      // TODO. CHECK IF THATS CORRECT. I PERSONALLY DON'T THINK IT SHOULD BE LIKE THIS
      // SHOULD IT REDIRECT TO LOGIN IF TOKEN NOT FOUND?
      if (!token) {
        router.push('/login');
        return;
      }
      // END TODO...

      const selectedClass = classes.find(
        (cls) => cls.name.toLowerCase() === characterClass,
      );
      if (!selectedClass) {
        console.error('Selected class not found.');
        return;
      }

      // Calls character API to create user character
      const res = await fetch(`${API_URL}/characters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },

        body: JSON.stringify({ name: characterName, class_id: selectedClass.ID }),
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
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Calls class API to retreive class ID from class name
        const classesResponse = await fetch(`${API_URL}/classes`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!classesResponse.ok) {
          const errorData = await classesResponse.json();
          throw new Error(errorData.error || 'Failed to retreive classes');
        }

        const classesData = await classesResponse.json();
        const fetchedClasses = classesData.message;

        setClasses(fetchedClasses);
        setLoading(false);

        if (fetchedClasses.length > 0) {
          setCharacterClass(fetchedClasses[0].name.toLowerCase());
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-sm flex-col place-content-center gap-6">
        {loading && <p>Loading classes...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <Tabs
            defaultValue={characterClass}
            onValueChange={setCharacterClass}
          >
            <TabsList className="w-full">
              {classes.map((cls) => (
                <TabsTrigger
                  key={cls.ID}
                  value={cls.name.toLowerCase()}
                >
                  {cls.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {classes.map((cls) => (
              <TabsContent
                value={cls.name.toLowerCase()}
                key={cls.ID}
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
        )}
      </div>
    </main>
  );
}
