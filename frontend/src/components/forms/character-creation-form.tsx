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
import { Class } from '@/types/class';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

interface CharacterCreationFormProps {
  onCharacterCreated: () => void;
  onCloseDialog: () => void;
  onAuthError: () => void;
}

export default function CharacterCreationForm({
  onCharacterCreated,
  onCloseDialog,
  onAuthError,
}: CharacterCreationFormProps) {
  const [characterClass, setCharacterClass] = useState('knight');
  const [characterName, setCharacterName] = useState('');
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function that handles the Create Character button
  const handleInput = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        onAuthError();
        return;
      }

      const selectedClass = classes.find(
        (cls) => cls.name.toLowerCase() === characterClass,
      );
      if (!selectedClass) {
        console.error('Selected class not found.');
        setError('Please select a valid character class.');
        return;
      }

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
      onCharacterCreated();
      onCloseDialog();
      console.log(
        'Character successfully created! Attempting to show toast for:',
        characterName,
      );
      toast.success(`${characterName} is ready for battle!`);
    } catch (error: any) {
      console.error('Error creating character:', error);
      setError(error.message || 'An unexpected error occurred.');
    }
  };

  const handleCharacterNameInput = (value: string) => {
    setCharacterName(value);
    if (error && error.includes('character name')) {
      setError(null);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesResponse = await fetch(`${API_URL}/classes`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!classesResponse.ok) {
          const errorData = await classesResponse.json();
          throw new Error(errorData.error || 'Failed to retrieve classes');
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
    <div className="flex w-full max-w-sm flex-col place-content-center gap-6">
      {loading && <p>Loading classes...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

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
                    <Label htmlFor="character-name-input">Character Name</Label>
                    <Input
                      id="character-name-input"
                      placeholder="Character name"
                      onChange={(e) => handleCharacterNameInput(e.target.value)}
                      value={characterName}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleInput}
                    disabled={!characterName.trim()}
                  >
                    Create a {cls.name}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
