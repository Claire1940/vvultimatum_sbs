export type BossCard = {
  title: string;
  description: string;
  href: string;
  badge?: "New" | "Popular";
};

export const BOSS_CARDS: BossCard[] = [
  { title: "Gelum Boss Guide", description: "First tutorial boss at Fort Adams.", href: "/bosses/gelum" },
  { title: "Dragonfly Boss Guide", description: "Area boss in Sweetwater Pass.", href: "/bosses/dragonfly" },
  { title: "King Croc Boss Guide", description: "Area boss in The Marsh.", href: "/bosses/king-croc" },
  { title: "Securis Boss Guide", description: "Advanced boss in Arctic Plains. Required for Quincy Schrift.", href: "/bosses/securis" },
  { title: "Shikai Spirit Boss", description: "Inner world boss fight for Shinigami Shikai unlock.", href: "/bosses/shikai-spirit" },
  { title: "Resurreccion Spirit Boss", description: "Inner world boss fight for Hollow Resurreccion unlock.", href: "/bosses/resurreccion-spirit" },
  { title: "Rogue Commander Boss", description: "Area boss in Arctic Plains with Minions. May be related to Quincy progression.", href: "/bosses/rogue-commander", badge: "New" },
  { title: "The Everfrosted Boss", description: "Ice-themed boss. 6.8% badge earn rate a rare encounter.", href: "/bosses/everfrosted", badge: "New" },
  { title: "The Gelid Dweller Boss", description: "Newly activated boss with 7,953+ kills. A dangerous late-game encounter.", href: "/bosses/gelid-dweller", badge: "New" },
  { title: "Cinder of the Broken Sky", description: "Fire/ash themed endgame boss. Throne of Ash badge holder.", href: "/bosses/cinder-broken-sky", badge: "New" },
  { title: "Devourer of Hosts", description: "Endgame boss with rapidly growing kill counts. Cleanser of Flesh badge.", href: "/bosses/devourer-hosts", badge: "New" },
  { title: "Wandering Swordsman", description: "Mysterious NPC named Junichiro. A deadly wandering boss encounter.", href: "/bosses/wandering-swordsman", badge: "New" },
  { title: "Arctic Hermit God", description: "Parry-heavy hidden boss in Arctic Cave. Can heal itself.", href: "/bosses/arctic-hermit-god", badge: "New" },
  { title: "Sakkaku (Schrift Boss)", description: "Quincy Schrift unlock boss with two-phase resurrection mechanic.", href: "/bosses/sakkaku", badge: "New" },
  { title: "Locations & Drops Table", description: "All boss locations, drop tables, and respawn timers in one reference.", href: "/boss-locations-drops-respawn-times", badge: "Popular" },
  { title: "Masked Warrior & Big Hollow", description: "Two distinct Soul Society bosses scheduled spawn vs random world event.", href: "/bosses/masked-warrior", badge: "New" },
  { title: "Argus Boss Guide", description: "Arctic Tundra boss confirmed by YouTube gameplay footage.", href: "/bosses/argus", badge: "New" },
  { title: "Mammoth Boss Guide", description: "Large beast-type Arctic boss, Lv40-60 encounter.", href: "/bosses/mammoth", badge: "New" },
  { title: "Kraus Bach Boss Guide", description: "Story Boss in Soul Society Outskirts, Lv1-30 mission encounter.", href: "/bosses/kraus-bach", badge: "New" },
  { title: "Shamballa Boss Guide", description: "Master of the Dark Arts The Marsh area boss, drops 2 Boss Chests.", href: "/bosses/shamballa", badge: "New" },
  { title: "Parasite Boss Guide", description: "Timed world boss in Human World, spawns every EVEN hour at XX:20.", href: "/bosses/parasite", badge: "New" },
  { title: "Calamitas Boss Guide", description: "Cinder of the Broken Sky Hueco Mundo boss, drops Pendant of Youth.", href: "/bosses/calamitas", badge: "New" },
  { title: "Waltz Luftwaffe Boss Guide", description: "Rogue Commander Arctic Plains timed boss, ODD hour spawn.", href: "/bosses/waltz-luftwaffe", badge: "New" },
  { title: "Evocator Boss Guide", description: "The Soulcatcher Arctic Plains area boss.", href: "/bosses/evocator", badge: "New" },
  { title: "Frigus Boss Guide", description: "Master of the North Arctic Plains boss, drops 3 Boss Chests.", href: "/bosses/frigus", badge: "New" },
  { title: "Lord Nivis Boss Guide", description: "Heir of the Dead Arctic Plains timed boss, ODD hour spawn.", href: "/bosses/lord-nivis", badge: "New" },
  { title: "Masked Fiend Boss Guide", description: "Mission Boss in Soul Society Outskirts, triggered through quest progression.", href: "/bosses/masked-fiend", badge: "New" },
  { title: "King of Hueco Mundo Boss Guide", description: "Mysterious endgame boss in Hueco Mundo true name unknown.", href: "/bosses/king-of-hueco-mundo", badge: "New" }
];
