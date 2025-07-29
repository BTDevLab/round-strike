'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Plus, Shield, Star, Sword } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  type: 'weapon' | 'armor' | 'consumable';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  quantity?: number;
  damage?: number;
  defense?: number;
  effect?: string;
  equipped?: boolean;
}

interface Skill {
  id: number;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  manaCost: number;
  damage?: number;
  effect?: string;
}

export default function CharacterOverview() {
  const [activeTab, setActiveTab] = useState('inventory');

  // Mock data for inventory
  const [inventory, setInventory] = useState<Item[]>([
    {
      id: 1,
      name: 'Iron Sword',
      type: 'weapon',
      rarity: 'common',
      damage: 25,
      equipped: true,
    },
    {
      id: 2,
      name: 'Steel Shield',
      type: 'armor',
      rarity: 'rare',
      defense: 15,
      equipped: true,
    },
    {
      id: 3,
      name: 'Health Potion',
      type: 'consumable',
      rarity: 'common',
      quantity: 5,
      effect: 'Restores 50 HP',
    },
    {
      id: 4,
      name: 'Mana Potion',
      type: 'consumable',
      rarity: 'common',
      quantity: 3,
      effect: 'Restores 30 MP',
    },
    { id: 5, name: 'Dragon Blade', type: 'weapon', rarity: 'legendary', damage: 45 },
    {
      id: 6,
      name: 'Magic Scroll',
      type: 'consumable',
      rarity: 'epic',
      quantity: 2,
      effect: 'Casts Fireball',
    },
  ]);

  // Mock data for skills
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: 'Slash Attack',
      level: 3,
      maxLevel: 5,
      description: 'A powerful sword strike',
      manaCost: 10,
      damage: 30,
    },
    {
      id: 2,
      name: 'Shield Block',
      level: 2,
      maxLevel: 5,
      description: 'Reduces incoming damage',
      manaCost: 5,
    },
    {
      id: 3,
      name: 'Heal',
      level: 1,
      maxLevel: 3,
      description: 'Restores health over time',
      manaCost: 15,
    },
    {
      id: 4,
      name: 'Fire Strike',
      level: 1,
      maxLevel: 4,
      description: 'Elemental fire damage',
      manaCost: 20,
      damage: 40,
    },
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500';
      case 'rare':
        return 'bg-blue-500';
      case 'epic':
        return 'bg-purple-500';
      case 'legendary':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const equipItem = (itemId: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          // Unequip other items of the same type
          const updatedInventory = prev.map((i) =>
            i.type === item.type && i.id !== itemId ? { ...i, equipped: false } : i,
          );
          return { ...item, equipped: !item.equipped };
        }
        return item;
      }),
    );
  };

  const upgradeSkill = (skillId: number) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === skillId && skill.level < skill.maxLevel
          ? { ...skill, level: skill.level + 1 }
          : skill,
      ),
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Character Info Header à esquerda */}
            <div className="w-full md:w-1/3">
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 h-full">
                <CardHeader>
                  <div className="flex flex-col items-center gap-6">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      width={100}
                      height={100}
                      alt="Character Avatar"
                      className="rounded-full border-2 border-purple-400"
                    />
                    <div className="w-full">
                      <CardTitle className="text-2xl text-white text-center md:text-left">
                        Chafundiffornio
                      </CardTitle>
                      <CardDescription className="text-gray-300 text-center md:text-left">
                        Knight - Level 1
                      </CardDescription>
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-400">Health</p>
                          <Progress
                            value={100}
                            className="h-2 bg-gray-700"
                          />
                          <p className="text-xs text-white">100/100</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Mana</p>
                          <Progress
                            value={80}
                            className="h-2 bg-gray-700"
                          />
                          <p className="text-xs text-white">80/100</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Attack</p>
                          <p className="text-lg font-bold text-white">45</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Defense</p>
                          <p className="text-lg font-bold text-white">25</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
            {/* Tabs à direita */}
            <div className="w-full md:w-2/3">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-purple-500/30">
                  <TabsTrigger
                    value="inventory"
                    className="data-[state=active]:bg-purple-600 text-white cursor-pointer"
                  >
                    Inventory
                  </TabsTrigger>
                  <TabsTrigger
                    value="equipment"
                    className="data-[state=active]:bg-purple-600 text-white cursor-pointer"
                  >
                    Equipment
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="data-[state=active]:bg-purple-600 text-white cursor-pointer"
                  >
                    Skills
                  </TabsTrigger>
                </TabsList>
                {/* Inventory Tab */}
                <TabsContent
                  value="inventory"
                  className="space-y-4"
                >
                  <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white">Inventory</CardTitle>
                      <CardDescription className="text-gray-300">
                        Manage your items and consumables
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        {inventory.map((item) => (
                          <Card
                            key={item.id}
                            className="bg-black/40 border-purple-500/30 hover:bg-black/60 transition-colors cursor-pointer p-0"
                            onClick={() =>
                              item.type !== 'consumable' && equipItem(item.id)
                            }
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  className={`${getRarityColor(
                                    item.rarity,
                                  )} text-white text-xs`}
                                >
                                  {item.rarity}
                                </Badge>
                                {item.equipped && (
                                  <Badge className="bg-green-600 text-white text-xs">
                                    Equipped
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-white font-semibold text-sm mb-1">
                                {item.name}
                              </h3>
                              {item.damage && (
                                <p className="text-red-400 text-xs">
                                  Damage: {item.damage}
                                </p>
                              )}
                              {item.defense && (
                                <p className="text-blue-400 text-xs">
                                  Defense: {item.defense}
                                </p>
                              )}
                              {item.quantity && (
                                <p className="text-gray-300 text-xs">
                                  Qty: {item.quantity}
                                </p>
                              )}
                              {item.effect && (
                                <p className="text-gray-400 text-xs mt-1">
                                  {item.effect}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Equipment Tab */}
                <TabsContent
                  value="equipment"
                  className="space-y-4"
                >
                  <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white">Equipment</CardTitle>
                      <CardDescription className="text-gray-300">
                        Currently equipped items
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Weapon Slot */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Sword className="h-5 w-5" />
                            Weapon
                          </h3>
                          {inventory
                            .filter((item) => item.type === 'weapon' && item.equipped)
                            .map((weapon) => (
                              <Card
                                key={weapon.id}
                                className="bg-black/40 border-purple-500/30"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-white font-semibold">
                                        {weapon.name}
                                      </h4>
                                      <p className="text-red-400 text-sm">
                                        Damage: {weapon.damage}
                                      </p>
                                      <Badge
                                        className={`${getRarityColor(
                                          weapon.rarity,
                                        )} text-white text-xs mt-1`}
                                      >
                                        {weapon.rarity}
                                      </Badge>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => equipItem(weapon.id)}
                                      className="bg-black/40 hover:bg-black/30 border-purple-400 text-purple-200 hover:text-purple-100 cursor-pointer"
                                    >
                                      Unequip
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                        {/* Armor Slot */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Armor
                          </h3>
                          {inventory
                            .filter((item) => item.type === 'armor' && item.equipped)
                            .map((armor) => (
                              <Card
                                key={armor.id}
                                className="bg-black/40 border-purple-500/30"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h4 className="text-white font-semibold">
                                        {armor.name}
                                      </h4>
                                      <p className="text-blue-400 text-sm">
                                        Defense: {armor.defense}
                                      </p>
                                      <Badge
                                        className={`${getRarityColor(
                                          armor.rarity,
                                        )} text-white text-xs mt-1`}
                                      >
                                        {armor.rarity}
                                      </Badge>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => equipItem(armor.id)}
                                      className="bg-black/40 hover:bg-black/30 border-purple-400 text-purple-200 hover:text-purple-100 cursor-pointer"
                                    >
                                      Unequip
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Skills Tab */}
                <TabsContent
                  value="skills"
                  className="space-y-4"
                >
                  <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white">Skills</CardTitle>
                      <CardDescription className="text-gray-300">
                        Upgrade and manage your abilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill) => (
                          <Card
                            key={skill.id}
                            className="bg-black/40 border-purple-500/30"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-white font-semibold">{skill.name}</h3>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-400" />
                                  <span className="text-white text-sm">
                                    {skill.level}/{skill.maxLevel}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm mb-2">
                                {skill.description}
                              </p>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-blue-400 text-sm">
                                  Mana Cost: {skill.manaCost}
                                </span>
                                {skill.damage && (
                                  <span className="text-red-400 text-sm">
                                    Damage: {skill.damage}
                                  </span>
                                )}
                              </div>
                              <Progress
                                value={(skill.level / skill.maxLevel) * 100}
                                className="h-2 bg-gray-700 mb-2"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => upgradeSkill(skill.id)}
                                disabled={skill.level >= skill.maxLevel}
                                className="w-full bg-black/40 hover:bg-black/30 border-purple-400 text-purple-200 hover:text-purple-100 cursor-pointer"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Upgrade
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          {/* Battle Start Section alinhado embaixo */}
          <div className="w-full">
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardContent className="p-2">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-white">Ready for Battle?</h2>
                  <p className="text-gray-300">
                    Make sure your equipment and skills are ready before entering combat.
                  </p>
                  <Link href="/battle">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Start Battle
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
