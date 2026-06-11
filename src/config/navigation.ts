import { BookOpen, Code2, Flame, Map, ScrollText, Shield, Skull, Swords, Trophy, Users, Zap } from "lucide-react";

export const NAVIGATION_CONFIG = [
  { key: "races", path: "/races", icon: Users, isContentType: false },
  { key: "bosses", path: "/bosses", icon: Swords, isContentType: true },
  { key: "guides", path: "/beginner-guide", icon: BookOpen, isContentType: false },
  { key: "codes", path: "/codes", icon: Code2, isContentType: false },
  { key: "tierList", path: "/tier-list", icon: Trophy, isContentType: false },
  { key: "updates", path: "/updates", icon: Zap, isContentType: false },
] as const;

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));

export type WikiNavLink = readonly [label: string, href: string, badge?: string];

export const BOSS_LINKS: WikiNavLink[] = [
  ["Overview", "/bosses"], ["Gelum Boss Guide", "/bosses/gelum"], ["Dragonfly Boss Guide", "/bosses/dragonfly"],
  ["King Croc Boss Guide", "/bosses/king-croc"], ["Securis Boss Guide", "/bosses/securis"], ["Shikai Spirit Boss", "/bosses/shikai-spirit"],
  ["Resurreccion Spirit Boss", "/bosses/resurreccion-spirit"], ["Rogue Commander Boss", "/bosses/rogue-commander", "New"],
  ["The Everfrosted Boss", "/bosses/everfrosted", "New"], ["The Gelid Dweller Boss", "/bosses/gelid-dweller", "New"],
  ["Cinder of the Broken Sky", "/bosses/cinder-broken-sky", "New"], ["Devourer of Hosts", "/bosses/devourer-hosts", "New"],
  ["Wandering Swordsman", "/bosses/wandering-swordsman", "New"], ["Arctic Hermit God", "/bosses/arctic-hermit-god", "New"],
  ["Sakkaku (Schrift Boss)", "/bosses/sakkaku", "New"], ["Locations & Drops Table", "/boss-locations-drops-respawn-times", "Popular"],
  ["Masked Warrior & Big Hollow", "/bosses/masked-warrior", "New"], ["Argus Boss Guide", "/bosses/argus", "New"],
  ["Mammoth Boss Guide", "/bosses/mammoth", "New"], ["Kraus Bach Boss Guide", "/bosses/kraus-bach", "New"],
  ["Shamballa Boss Guide", "/bosses/shamballa", "New"], ["Parasite Boss Guide", "/bosses/parasite", "New"],
  ["Calamitas Boss Guide", "/bosses/calamitas", "New"], ["Waltz Luftwaffe Boss Guide", "/bosses/waltz-luftwaffe", "New"],
  ["Evocator Boss Guide", "/bosses/evocator", "New"], ["Frigus Boss Guide", "/bosses/frigus", "New"],
  ["Lord Nivis Boss Guide", "/bosses/lord-nivis", "New"], ["Masked Fiend Boss Guide", "/bosses/masked-fiend", "New"],
  ["King of Hueco Mundo Boss Guide", "/bosses/king-of-hueco-mundo", "New"],
] as const;

export const WIKI_NAVIGATION = [
  { title: "Getting Started", count: 14, icon: BookOpen, links: [["Overview", "/getting-started"], ["Beginner Guide", "/beginner-guide", "Popular"], ["Controls & Keybinds", "/controls"], ["Combat System", "/combat"], ["Z-Step Guide", "/combat/z-step", "New"], ["Quest System", "/quests"], ["Official Links", "/wiki-links"], ["Fastest Leveling Route", "/fastest-leveling", "New"], ["Best Farming Spots", "/best-farming-spots", "New"], ["Mobile Guide", "/mobile"], ["Console Guide", "/console"], ["PvP Guide", "/pvp", "New"], ["AFK World", "/afk-world", "New"], ["Official Group", "/group"]] },
  { title: "Races", count: 6, icon: Shield, links: [["Overview", "/races"], ["Shinigami Guide", "/races/shinigami"], ["Quincy Guide", "/races/quincy"], ["Hollow Guide", "/races/hollow"], ["Best Race to Choose", "/races/best-race", "Popular"], ["Vastocar Guide", "/races/vastocar", "New"], ["Arrancar Guide", "/races/arrancar", "New"]] },
  { title: "Bosses", count: 28, icon: Swords, links: BOSS_LINKS },
  { title: "Maps & Areas", count: 6, icon: Map, links: [["Overview", "/maps"], ["Soul Society", "/maps/soul-society"], ["Hueco Mundo", "/maps/hueco-mundo"], ["Arctic Tundra", "/maps/arctic-tundra"], ["Wandenreich", "/maps/wandenreich"], ["The Dangai", "/maps/the-dangai"], ["Human World", "/maps/human-world", "New"]] },
  { title: "Builds & Skills", count: 8, icon: Flame, links: [["Overview", "/builds"], ["Best Builds", "/builds/best-builds", "Popular"], ["Hakuda Skill Tree", "/skills/hakuda"], ["Kido Skill Tree", "/skills/kido"], ["Speed Skill Tree", "/skills/speed", "New"], ["Strength Skill Tree", "/skills/strength", "New"], ["Hakuda Styles", "/skills/hakuda-styles", "New"], ["Skill Essences", "/skills/skill-essences", "New"]] },
  { title: "Systems & Items", count: 10, icon: Zap, links: [["Overview", "/items"], ["Spirit Charms", "/charms"], ["Equipment System", "/equipment", "Updated"], ["Enemies & Monsters", "/enemies", "New"], ["World Events", "/world-events", "New"], ["Consumables", "/consumables", "New"], ["Materials", "/materials", "New"]] },
  { title: "Tier Lists", count: 7, icon: ScrollText, links: [["Overview", "/tier-list"], ["Best Hollow Traits", "/tier-list/best-hollow-traits"], ["Best Spirit Charms", "/tier-list/best-charms"], ["Weapon Tier List", "/tier-list/weapons", "New"], ["Shikai Tier List", "/tier-list/shikai", "New"], ["Schrift Tier List", "/tier-list/schrift", "New"]] },
  { title: "Progression", count: 13, icon: Skull, links: [["Overview", "/progression"], ["Hollow Progression", "/hollow-progression"], ["Shinigami Progression", "/shinigami-progression"], ["Quincy Progression", "/quincy-progression"], ["How to Get Shikai", "/how-to-get-shikai"], ["How to Get Resurreccion", "/how-to-get-resurreccion"], ["How to Get Schrift", "/how-to-get-schrift"], ["How to Get Bankai", "/how-to-get-bankai", "New"]] },
] as const;
