import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function CharacterCreationPage() {

  const classDescription: Record<string, {name: string, description: string}> = {
    knight: {
      name: 'Knight',
      description: 'A strong fighter with heavy armor. Great for taking hits and dealing solid melee damage.'
    },
    cleric: {
      name: 'Cleric',
      description: 'A support class that can heal and use light magic. Balanced and good for longer battles.'
    },
    wizard: {
      name: 'Wizard',
      description: 'A powerful spellcaster with high damage. Fragile, but can destroy enemies from a distance.'
    },
    hunter: {
      name: 'Hunter',
      description: 'A quick and agile archer. Good at striking from afar and avoiding damage.'
    }
  }

  return (
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="flex w-full max-w-sm flex-col place-content-center gap-6">
          <Tabs defaultValue="knight">
            <TabsList className="w-full">
              <TabsTrigger value="knight">Knight</TabsTrigger>
              <TabsTrigger value="cleric">Cleric</TabsTrigger>
              <TabsTrigger value="wizard">Wizard</TabsTrigger>
              <TabsTrigger value="hunter">Hunter</TabsTrigger>
            </TabsList>
            {Object.keys(classDescription).map((classKey) => (
              <TabsContent value={classKey} key={classKey}>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>{classDescription[classKey].name}</CardTitle>
                    <CardDescription>
                      {classDescription[classKey].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="tabs-demo-name">Name</Label>
                      <Input id="tabs-demo-name" placeholder="Character name" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Create a {classDescription[classKey].name}</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))} 
          </Tabs>
        </div>
      </main>
  )
}