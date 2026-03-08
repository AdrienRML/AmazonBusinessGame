import type {
  FranchiseTab, Product, CollectorPost,
  LimitedDrop, BiddingItem, TrendingItem, TopCollector,
} from '../types';

// ── Image helpers ──────────────────────────────────────────────────────────────
// loremflickr: free, no API key, tag-matched photos
const img = (tag: string, lock: number, w = 240, h = 240) =>
  `https://loremflickr.com/${w}/${h}/${tag}?lock=${lock}`;

const postImg = (tag: string, lock: number) => img(tag, lock, 300, 200);

// ── Franchise tabs ─────────────────────────────────────────────────────────────
export const FRANCHISE_TABS: FranchiseTab[] = [
  { id: 'marvel',         label: 'Marvel',            icon: '🦸', color: '#E23636' },
  { id: 'pokemon',        label: 'Pokémon',            icon: '⚡', color: '#FFCB05' },
  { id: 'action-figures', label: 'Action Figures',     icon: '🤖', color: '#00B4D8' },
  { id: 'lego',           label: 'LEGO Collectibles',  icon: '🧱', color: '#FF6B35' },
  { id: 'retro-gaming',   label: 'Retro Gaming',       icon: '🎮', color: '#7B2FBE' },
  { id: 'limited-drops',  label: 'Limited Drops',      icon: '🔥', color: '#FF4D4D' },
  { id: 'fan-cards',      label: 'Fan Cards',          icon: '🃏', color: '#06D6A0' },
];

// ── Products per franchise ─────────────────────────────────────────────────────
const PRODUCTS: Record<string, Product[]> = {
  marvel: [
    { id: 'm1', title: 'Hot Toys Iron Man MK50 1:6 Scale Figure — Avengers: Infinity War', brand: 'Hot Toys', price: 389.99, originalPrice: 439.99, rating: 4.9, reviews: 1247, badge: 'Limited', prime: true, image: img('ironman,figure', 10), category: 'Collectible Figure', franchise: 'marvel', description: 'Movie-accurate 1:6 scale Iron Man Mark 50 with LED light-up arc reactor and 30+ accessories.' },
    { id: 'm2', title: 'Sideshow Collectibles Spider-Man Premium Format Statue', brand: 'Sideshow', price: 549.00, rating: 4.8, reviews: 834, badge: 'Exclusive', prime: true, image: img('spiderman,statue', 11), category: 'Premium Statue', franchise: 'marvel', description: 'Hand-crafted polystone statue depicting Spider-Man in an iconic web-slinging pose.' },
    { id: 'm3', title: 'Hasbro Marvel Legends Retro Collection — X-Men 6-Figure Set', brand: 'Hasbro', price: 149.99, originalPrice: 179.99, rating: 4.7, reviews: 2156, badge: 'Best Seller', prime: true, image: img('xmen,figures', 12), category: 'Figure Set', franchise: 'marvel', description: 'Vintage-inspired retro packaging with Wolverine, Cyclops, Storm, Jean Grey, Beast, and Gambit.' },
    { id: 'm4', title: 'LEGO Marvel Avengers Compound Battle #76131 — 699 Pieces', brand: 'LEGO', price: 99.99, originalPrice: 119.99, rating: 4.6, reviews: 3410, badge: 'Trending', prime: true, image: img('lego,avengers', 13), category: 'LEGO Set', franchise: 'marvel', description: 'Recreate the final showdown with 6 minifigures and a detailed compound building.' },
    { id: 'm5', title: 'Amazing Fantasy #15 Facsimile Edition — CGC Graded 9.8', brand: 'Marvel Comics', price: 299.00, rating: 5.0, reviews: 312, badge: 'Limited', prime: false, image: img('comic,book,rare', 14), category: 'Graded Comic', franchise: 'marvel', description: 'Officially graded reprint of Spider-Man\'s first appearance in stunning 9.8 NM/MT condition.' },
    { id: 'm6', title: 'Iron Man Nano Gauntlet Life-Size Prop Replica', brand: 'EFX Collectibles', price: 899.00, rating: 4.9, reviews: 156, badge: 'Exclusive', prime: false, image: img('gauntlet,marvel,prop', 15), category: 'Prop Replica', franchise: 'marvel', description: 'Screen-accurate nano gauntlet replica with embedded LEDs and display case.' },
    { id: 'm7', title: 'Marvel vs Capcom Arcade1Up Cabinet — Limited Run', brand: 'Arcade1Up', price: 599.99, originalPrice: 699.99, rating: 4.5, reviews: 891, badge: 'Trending', prime: true, image: img('arcade,cabinet,gaming', 16), category: 'Gaming', franchise: 'marvel', description: 'Full-size recreation of the classic arcade cabinet with 12 Marvel games pre-loaded.' },
    { id: 'm8', title: 'Stan Lee Signed "Amazing Spider-Man" Art Print — COA', brand: 'Excelsior! Editions', price: 799.00, rating: 5.0, reviews: 89, badge: 'Limited', prime: false, image: img('artwork,signed,print', 17), category: 'Signed Art', franchise: 'marvel', description: 'Authenticated Stan Lee signature on a limited-edition Spider-Man comic art print.' },
    { id: 'm9', title: 'Marvel Funko Pop! Chase Variants — Complete 2024 Set (24 Figs)', brand: 'Funko', price: 249.99, originalPrice: 299.99, rating: 4.6, reviews: 1543, badge: 'Trending', prime: true, image: img('funko,pop,figures', 18), category: 'Funko Pop', franchise: 'marvel', description: 'Complete set of 24 chase variants from the 2024 Marvel Funko Pop collection.' },
    { id: 'm10', title: 'Thor\'s Mjolnir Stormbreaker Axe — Metal 1:1 Replica', brand: 'Factory Entertainment', price: 349.99, rating: 4.8, reviews: 672, badge: 'New', prime: true, image: img('mjolnir,thor,hammer,replica', 19), category: 'Prop Replica', franchise: 'marvel', description: 'Die-cast metal construction with genuine leather-wrapped handle and display stand.' },
    { id: 'm11', title: 'Marvel Studios: The First Ten Years — Collector\'s Edition Book', brand: 'Marvel Press', price: 75.00, rating: 4.7, reviews: 2890, badge: 'Best Seller', prime: true, image: img('artbook,movie,hardcover', 20), category: 'Art Book', franchise: 'marvel', description: 'Deluxe hardcover spanning all MCU films with exclusive concept art and behind-scenes photos.' },
    { id: 'm12', title: 'Hot Toys Black Widow Natasha Romanoff 1:6 Figure — Endgame', brand: 'Hot Toys', price: 269.99, originalPrice: 319.99, rating: 4.8, reviews: 987, badge: 'Trending', prime: true, image: img('blackwidow,figure,toy', 21), category: 'Collectible Figure', franchise: 'marvel', description: 'Hyper-realistic 1:6 figure with 28 points of articulation and fabric costume.' },
  ],
  pokemon: [
    { id: 'p1', title: 'Pokémon Charizard Holo — Base Set 1st Edition PSA 10 GEM MT', brand: 'Pokémon / PSA', price: 9999.00, rating: 5.0, reviews: 47, badge: 'Limited', prime: false, image: img('pokemon,charizard,card', 30), category: 'Graded Card', franchise: 'pokemon', description: 'The holy grail of Pokémon investing. 1st Edition Base Set Charizard in PSA 10 gem mint condition.' },
    { id: 'p2', title: 'Pokémon 25th Anniversary Golden Box — Complete Sealed', brand: 'Pokémon Company', price: 499.00, originalPrice: 599.99, rating: 4.9, reviews: 1234, badge: 'Limited', prime: false, image: img('pokemon,box,gold', 31), category: 'Sealed Box', franchise: 'pokemon', description: 'Rare sealed anniversary celebration box with promo cards and booster packs.' },
    { id: 'p3', title: 'Pokémon Scarlet & Violet: Paldean Fates Elite Trainer Box', brand: 'Pokémon Company', price: 59.99, originalPrice: 79.99, rating: 4.7, reviews: 8912, badge: 'Best Seller', prime: true, image: img('pokemon,cards,booster', 32), category: 'Booster Box', franchise: 'pokemon', description: 'Pull shiny Pokémon from the entire Paldea Pokédex in this premium trainer box.' },
    { id: 'p4', title: 'Wicked Cool Toys Pokémon Pikachu Interactive Plush 12"', brand: 'WCT', price: 39.99, rating: 4.8, reviews: 15670, badge: 'Trending', prime: true, image: img('pikachu,plush,toy', 33), category: 'Plush', franchise: 'pokemon', description: 'Reacts to touch, makes sounds, and speaks 100+ phrases. Super popular gift item.' },
    { id: 'p5', title: 'Pokémon Center Original Gengar Sleeping Cushion Plush XXL', brand: 'Pokémon Center', price: 89.99, rating: 4.9, reviews: 3421, badge: 'Exclusive', prime: true, image: img('gengar,plush,purple', 34), category: 'Plush', franchise: 'pokemon', description: 'Pokémon Center exclusive oversized sleeping Gengar cushion, soft microfiber.' },
    { id: 'p6', title: 'Nendoroid Pikachu #800 — Good Smile Company', brand: 'Good Smile', price: 54.99, originalPrice: 64.99, rating: 4.8, reviews: 6734, badge: 'Trending', prime: true, image: img('pikachu,figure,cute', 35), category: 'Nendoroid', franchise: 'pokemon', description: 'Fully articulated chibi-style Pikachu with interchangeable face plates and accessories.' },
    { id: 'p7', title: 'Pokémon Game Boy Original + Pokémon Red/Blue Bundle — Sealed', brand: 'Nintendo / Game Freak', price: 349.00, rating: 5.0, reviews: 312, badge: 'Limited', prime: false, image: img('gameboy,nintendo,retro', 36), category: 'Retro Gaming', franchise: 'pokemon', description: 'Sealed original Game Boy with factory-sealed Pokémon Red and Blue. Investment grade.' },
    { id: 'p8', title: 'Pokémon Master Ball Prop Replica — Life Size 1:1', brand: 'Factory Entertainment', price: 99.99, originalPrice: 129.99, rating: 4.7, reviews: 2156, badge: 'Trending', prime: true, image: img('pokeball,replica,purple', 37), category: 'Prop Replica', franchise: 'pokemon', description: 'Precision die-cast Master Ball replica with magnetic opening and display stand.' },
    { id: 'p9', title: 'Pokémon Charizard GX Rainbow Rare PSA 9 MINT — SM Burning Shadows', brand: 'Pokémon / PSA', price: 189.99, rating: 4.9, reviews: 1876, badge: 'Exclusive', prime: false, image: img('pokemon,rainbow,rare,card', 38), category: 'Graded Card', franchise: 'pokemon', description: 'Stunning rainbow rare Charizard GX graded PSA 9 mint — a standout in any collection.' },
    { id: 'p10', title: 'Pokémon GO Plus+ Wristband Device — White', brand: 'Nintendo', price: 49.99, rating: 4.5, reviews: 22340, badge: 'Best Seller', prime: true, image: img('pokemon,device,gadget', 39), category: 'Accessory', franchise: 'pokemon', description: 'Auto-catches Pokémon and spins PokéStops — essential for serious trainers.' },
    { id: 'p11', title: 'Pokémon Encyclopedia — Complete Pokédex Deluxe Edition', brand: 'DK Publishing', price: 35.00, rating: 4.8, reviews: 12450, badge: 'Best Seller', prime: true, image: img('pokemon,book,encyclopedia', 40), category: 'Book', franchise: 'pokemon', description: 'All 1025 Pokémon detailed with stats, moves, and lore across 440 pages.' },
    { id: 'p12', title: 'Vintage Pokémon Binder — 1999 Fossil Set Complete 62/62 PSA', brand: 'Various / PSA', price: 2499.00, rating: 5.0, reviews: 34, badge: 'Limited', prime: false, image: img('pokemon,vintage,collection', 41), category: 'Complete Set', franchise: 'pokemon', description: 'Complete PSA-graded 1999 Fossil set in a custom binder. Average PSA grade: 8.5.' },
  ],
  'action-figures': [
    { id: 'af1', title: 'Hot Toys Optimus Prime 1:6 Scale — Transformers: Rise of the Beasts', brand: 'Hot Toys', price: 499.00, rating: 4.9, reviews: 634, badge: 'Limited', prime: true, image: img('transformers,optimus,prime', 50), category: 'Collectible Figure', franchise: 'action-figures', description: 'Masterpiece-level 1:6 Optimus Prime with diecast parts and full transformation.' },
    { id: 'af2', title: 'S.H. Figuarts Dragon Ball Super Goku Ultra Instinct Sign', brand: 'Bandai Spirits', price: 89.99, originalPrice: 109.99, rating: 4.8, reviews: 3456, badge: 'Trending', prime: true, image: img('dragonball,goku,figure', 51), category: 'S.H.Figuarts', franchise: 'action-figures', description: 'Highly articulated Goku in Ultra Instinct with energy effect parts and alternate faces.' },
    { id: 'af3', title: 'Neca One-12 Collective Predator 2 Ultimate Figure — 1:12', brand: 'Mezco', price: 129.99, rating: 4.7, reviews: 1876, badge: 'Exclusive', prime: true, image: img('predator,figure,alien', 52), category: 'One-12 Collective', franchise: 'action-figures', description: 'Fully fabric-costumed Predator 2 with 30 points of articulation and film-accurate deco.' },
    { id: 'af4', title: 'McFarlane DC Multiverse Batman Beyond 7" — Gold Label', brand: 'McFarlane', price: 34.99, originalPrice: 44.99, rating: 4.6, reviews: 4521, badge: 'Best Seller', prime: true, image: img('batman,figure,dark', 53), category: 'DC Multiverse', franchise: 'action-figures', description: 'Gold Label exclusive Batman Beyond in classic suit with build-a-figure piece.' },
    { id: 'af5', title: 'MAFEX Berserk Guts Black Swordsman — Medicom Toy', brand: 'Medicom', price: 159.99, rating: 4.9, reviews: 987, badge: 'Limited', prime: false, image: img('berserk,swordsman,dark', 54), category: 'MAFEX', franchise: 'action-figures', description: 'Ultra-poseable Guts from Berserk with Dragonslayer sword and multiple accessories.' },
    { id: 'af6', title: 'Bandai PG Unicorn Gundam 00 Mode 1/60 Scale Model Kit', brand: 'Bandai', price: 249.99, originalPrice: 299.99, rating: 4.9, reviews: 2145, badge: 'Exclusive', prime: true, image: img('gundam,model,kit,robot', 55), category: 'Model Kit', franchise: 'action-figures', description: 'Perfect Grade 1/60 scale with LED unit, transformation mechanism and over 500 parts.' },
    { id: 'af7', title: 'Good Smile Racing Miku 2024 Nendoroid — TBF Edition', brand: 'Good Smile', price: 64.99, rating: 4.8, reviews: 3210, badge: 'New', prime: true, image: img('miku,nendoroid,blue,hair', 56), category: 'Nendoroid', franchise: 'action-figures', description: 'Annual racing Miku collaboration with 3 face plates and full pose capability.' },
    { id: 'af8', title: 'S.H. Figuarts Luffy Gear 5 — One Piece Film Red', brand: 'Bandai', price: 74.99, originalPrice: 89.99, rating: 4.8, reviews: 5678, badge: 'Trending', prime: true, image: img('onepiece,luffy,figure,anime', 57), category: 'S.H.Figuarts', franchise: 'action-figures', description: 'Luffy in his legendary Gear 5 form with white hair, clouds effects and cartoon expression.' },
  ],
  lego: [
    { id: 'l1', title: 'LEGO Star Wars Millennium Falcon UCS #75192 — 7541 Pieces', brand: 'LEGO', price: 849.99, rating: 4.9, reviews: 15234, badge: 'Best Seller', prime: true, image: img('lego,millennium,falcon,star wars', 60), category: 'Ultimate Collector Series', franchise: 'lego', description: 'The largest LEGO Star Wars set ever made. Minifigures of Han, Chewie, Leia and Finn included.' },
    { id: 'l2', title: 'LEGO Ideas Vincent van Gogh — The Starry Night #21333', brand: 'LEGO', price: 169.99, originalPrice: 199.99, rating: 4.8, reviews: 8921, badge: 'Trending', prime: true, image: img('lego,starrynight,art', 61), category: 'LEGO Ideas', franchise: 'lego', description: '2316 pieces recreating Van Gogh\'s masterpiece as a 3D LEGO mosaic with sculpted waves.' },
    { id: 'l3', title: 'LEGO Technic Bugatti Chiron #42083 — 3599 Pieces', brand: 'LEGO', price: 449.99, rating: 4.9, reviews: 6745, badge: 'Limited', prime: true, image: img('lego,technic,car,bugatti', 62), category: 'LEGO Technic', franchise: 'lego', description: 'Scale model of the iconic hypercar with W16 engine, working gearbox and rubber tires.' },
    { id: 'l4', title: 'LEGO Architecture Eiffel Tower #10307 — 10,001 Pieces', brand: 'LEGO', price: 629.99, rating: 4.8, reviews: 4312, badge: 'Trending', prime: true, image: img('lego,eiffel,tower,architecture', 63), category: 'LEGO Architecture', franchise: 'lego', description: 'Tallest LEGO set at 149cm. Freestanding model of the iconic Paris landmark.' },
    { id: 'l5', title: 'LEGO Harry Potter Hogwarts Castle #71043 — 6020 Pieces', brand: 'LEGO', price: 469.99, originalPrice: 519.99, rating: 4.9, reviews: 12456, badge: 'Best Seller', prime: true, image: img('lego,hogwarts,castle,harry potter', 64), category: 'LEGO Harry Potter', franchise: 'lego', description: 'The most detailed Hogwarts set ever with 4 microfigure Quidditch players and 27 characters.' },
    { id: 'l6', title: 'LEGO Creator Expert Haunted House #10273 — 3231 Pieces', brand: 'LEGO', price: 249.99, rating: 4.7, reviews: 5678, badge: 'Exclusive', prime: true, image: img('lego,haunted,house', 65), category: 'LEGO Creator', franchise: 'lego', description: 'Modular haunted house packed with gags, spooky rooms and a working ferris wheel.' },
    { id: 'l7', title: 'LEGO Technic Liebherr Crawler Crane LTR 11200 #42146', brand: 'LEGO', price: 649.99, rating: 4.8, reviews: 2145, badge: 'New', prime: true, image: img('lego,crane,technic,construction', 66), category: 'LEGO Technic', franchise: 'lego', description: '2883 piece working crawler crane with motorized functions and 8 driving modes.' },
    { id: 'l8', title: 'LEGO Icons Concorde #10318 — 2083 Pieces', brand: 'LEGO', price: 199.99, rating: 4.7, reviews: 3890, badge: 'Trending', prime: true, image: img('lego,concorde,airplane', 67), category: 'LEGO Icons', franchise: 'lego', description: 'Retire set recreation of the legendary supersonic airliner with retractable landing gear.' },
  ],
  'retro-gaming': [
    { id: 'rg1', title: 'Nintendo 64 Console Bundle — Original + 6 Games Sealed', brand: 'Nintendo', price: 449.99, rating: 4.9, reviews: 892, badge: 'Limited', prime: false, image: img('nintendo64,retro,console,game', 70), category: 'Retro Console', franchise: 'retro-gaming', description: 'Factory-sealed N64 with Super Mario 64, Zelda OoT, GoldenEye and 3 more.' },
    { id: 'rg2', title: 'Super Nintendo SNES Classic Edition — Mini Console', brand: 'Nintendo', price: 299.99, originalPrice: 349.99, rating: 4.8, reviews: 3456, badge: 'Trending', prime: true, image: img('snes,super,nintendo,classic', 71), category: 'Mini Console', franchise: 'retro-gaming', description: 'Official SNES Mini with 21 pre-loaded games including Star Fox 2. Near mint condition.' },
    { id: 'rg3', title: 'Analogue Pocket — Limited Clear Edition + Dock', brand: 'Analogue', price: 279.99, rating: 4.9, reviews: 5678, badge: 'Exclusive', prime: false, image: img('gameboy,pocket,handheld', 72), category: 'Retro Hardware', franchise: 'retro-gaming', description: 'FPGA-based handheld plays original Game Boy, GBC, GBA cartridges natively.' },
    { id: 'rg4', title: 'Sega Genesis Flashback HD — 85 Built-in Games', brand: 'Sega / AtGames', price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 8912, badge: 'Best Seller', prime: true, image: img('sega,genesis,megadrive,retro', 73), category: 'Mini Console', franchise: 'retro-gaming', description: 'Officially licensed Genesis with HDMI output and wireless controllers.' },
    { id: 'rg5', title: 'Evercade VS — Retro Cartridge System + Starter Pack', brand: 'Blaze Entertainment', price: 139.99, rating: 4.6, reviews: 3210, badge: 'Trending', prime: true, image: img('retro,cartridge,gaming,device', 74), category: 'Retro Console', franchise: 'retro-gaming', description: 'Physical cartridge system with Atari, Namco, Data East and more collections.' },
    { id: 'rg6', title: 'The Legend of Zelda: Ocarina of Time — CIB N64 VGA 85', brand: 'Nintendo / VGA', price: 599.00, rating: 5.0, reviews: 156, badge: 'Limited', prime: false, image: img('zelda,ocarina,nintendo,gold', 75), category: 'Graded Game', franchise: 'retro-gaming', description: 'VGA-graded complete-in-box OoT at 85+ — one of the most valuable N64 games.' },
  ],
  'limited-drops': [
    { id: 'ld1', title: 'One Piece Live Action Netflix — Luffy Figure Limited Run #001', brand: 'Good Smile x Netflix', price: 199.99, rating: 4.9, reviews: 234, badge: 'Limited', prime: false, image: img('onepiece,netflix,figure,straw,hat', 80), category: 'Limited Edition', franchise: 'limited-drops', description: 'Only 5000 worldwide. Celebrates the Netflix One Piece adaptation with exclusive deco.' },
    { id: 'ld2', title: 'LEGO x Adidas Originals Forum Shoe #10282 — Retired Set', brand: 'LEGO', price: 219.99, originalPrice: 169.99, rating: 4.8, reviews: 1234, badge: 'Exclusive', prime: false, image: img('lego,shoe,adidas,sneaker', 81), category: 'Retired Set', franchise: 'limited-drops', description: 'Retired LEGO collaboration set now commanding a 30% premium. 731 pieces.' },
    { id: 'ld3', title: 'Medicom Kubrick Daft Punk Pyramid Gold Edition — 2-Pack', brand: 'Medicom', price: 349.00, rating: 5.0, reviews: 87, badge: 'Limited', prime: false, image: img('daft,punk,robot,figure', 82), category: 'Designer Toy', franchise: 'limited-drops', description: 'Ultra-rare gold edition Daft Punk Kubrick set. Only 1000 produced globally.' },
    { id: 'ld4', title: 'Supreme x Funko Pop Collaboration — Set of 4', brand: 'Supreme x Funko', price: 499.00, rating: 4.7, reviews: 312, badge: 'Exclusive', prime: false, image: img('supreme,funko,pop,red', 83), category: 'Designer Toy', franchise: 'limited-drops', description: 'Exclusive Supreme-branded Funko Pop set sold only at NYC drop event.' },
  ],
  'fan-cards': [
    { id: 'fc1', title: 'Dragon Ball Z CCG Saiyan Saga — Complete Set Near Mint', brand: 'Score Entertainment', price: 799.00, rating: 4.8, reviews: 234, badge: 'Limited', prime: false, image: img('dragonball,cards,trading', 90), category: 'Complete Set', franchise: 'fan-cards', description: 'Complete 180-card Saiyan Saga set in near mint condition from the Score Entertainment era.' },
    { id: 'fc2', title: 'One Piece Card Game Romance Dawn — Booster Box', brand: 'Bandai', price: 129.99, originalPrice: 149.99, rating: 4.7, reviews: 2345, badge: 'Trending', prime: true, image: img('onepiece,cards,trading,game', 91), category: 'Booster Box', franchise: 'fan-cards', description: '24 booster packs from the first ever One Piece TCG expansion. Pull Luffy Secret Rares.' },
    { id: 'fc3', title: 'Yu-Gi-Oh! Blue-Eyes White Dragon 1st Edition LOB-001 PSA 8', brand: 'Konami / PSA', price: 1299.00, rating: 5.0, reviews: 89, badge: 'Limited', prime: false, image: img('yugioh,blueyes,trading,card', 92), category: 'Graded Card', franchise: 'fan-cards', description: 'Iconic Blue-Eyes White Dragon from the very first Legend of Blue Eyes White Dragon set.' },
    { id: 'fc4', title: 'Magic the Gathering Black Lotus Alpha — PSA 4 VG-EX', brand: 'Wizards of the Coast / PSA', price: 14999.00, rating: 5.0, reviews: 23, badge: 'Limited', prime: false, image: img('magic,gathering,rare,black', 93), category: 'Power 9', franchise: 'fan-cards', description: 'The most sought-after card in all of TCG history. Alpha Black Lotus graded PSA 4.' },
  ],
};

export function getProducts(franchiseId: string): Product[] {
  return PRODUCTS[franchiseId] ?? PRODUCTS.marvel;
}

// ── Collector Feed posts ───────────────────────────────────────────────────────
export const COLLECTOR_POSTS: CollectorPost[] = [
  {
    id: 'cf1',
    username: 'BrickMaster_DS',
    badge: '1 Star Seller',
    badgeColor: '#FFD700',
    avatarSeed: 'BrickMasterDS',
    avatarBg: '#1E4D8C',
    timeAgo: '2 years ago',
    content: 'LEGO Millennium Falcon fully built! It\'s a piece of retrocollection. Packed full of features. I\'ve been sharing my review, photos and build in this post — read more!',
    images: [postImg('lego,millennium,falcon,built', 100), postImg('lego,star,wars,build', 101), postImg('lego,spaceship,built', 102)],
    likes: 1247,
    comments: 89,
  },
  {
    id: 'cf2',
    username: 'PokeCollector_JP',
    badge: '5 Star Seller',
    badgeColor: '#FFD700',
    avatarSeed: 'PokeCollectorJP',
    avatarBg: '#C0392B',
    timeAgo: '1 year ago',
    content: 'Pokémon Charizard sell in November of their anniversary! Millions of their comments the #happen. Still the king of collectible cards after 25 years.',
    images: [postImg('pokemon,charizard,card,rare', 103)],
    likes: 3421,
    comments: 156,
  },
  {
    id: 'cf3',
    username: 'BrickMaster_US',
    badge: '1 Star Buyer',
    badgeColor: '#C0C0C0',
    avatarSeed: 'BrickMasterUS',
    avatarBg: '#27AE60',
    timeAgo: '2 years ago',
    content: 'Thank you for the LEGO Millennium Falcon haul! Best purchase of my collecting career 🚀',
    images: [],
    likes: 847,
    comments: 23,
  },
  {
    id: 'cf4',
    username: 'IronFan_UK',
    badge: 'Top Seller',
    badgeColor: '#FF9900',
    avatarSeed: 'IronFanUK',
    avatarBg: '#8E44AD',
    timeAgo: '5 hours ago',
    content: 'Marvel Iron Man figure collection 🔥 Just completed my Hot Toys Iron Man arc from MK3 to MK85. 12 years of collecting in one display case.',
    images: [postImg('ironman,figures,collection,display', 104), postImg('marvel,figures,shelf', 105)],
    likes: 2156,
    comments: 67,
  },
  {
    id: 'cf5',
    username: 'TheraPines_PP',
    badge: '1 Star Seller',
    badgeColor: '#FFD700',
    avatarSeed: 'TheraPinesPP',
    avatarBg: '#E74C3C',
    timeAgo: 'Several months ago',
    content: 'Just unboxed the absolutely gorgeous Iron Man figure collection, it really not helped the slit torments.',
    images: [],
    likes: 347,
    comments: 12,
    tags: ['VIDEO GAME', 'POKÉMON GAME', 'FIGURE'],
  },
  {
    id: 'cf6',
    username: 'GundamKing_DE',
    badge: '3 Star Seller',
    badgeColor: '#CD7F32',
    avatarSeed: 'GundamKingDE',
    avatarBg: '#2980B9',
    timeAgo: '3 days ago',
    content: 'Finally finished the PG Unicorn Gundam! 600+ parts, 40 hours of build time. The LED transformation effect is absolutely mind-blowing. Worth every penny at $250.',
    images: [postImg('gundam,model,built,white', 106), postImg('gundam,robot,display', 107), postImg('gundam,leds,glow', 108)],
    likes: 4123,
    comments: 234,
  },
];

// ── Limited Drops ──────────────────────────────────────────────────────────────
export const LIMITED_DROPS: LimitedDrop[] = [
  {
    id: 'drop1',
    title: 'LEGO Avengers Tower (New)',
    subtitle: 'N269',
    image: img('lego,avengers,tower,building', 200),
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 37 * 60 * 1000), // 2h37m from now
    stock: 580,
  },
  {
    id: 'drop2',
    title: 'Hot Toys Spider-Man 2099',
    subtitle: 'No Way Home Edition',
    image: img('spiderman,figure,limited', 201),
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 12 * 60 * 1000),
    stock: 250,
  },
];

// ── Bidding items ──────────────────────────────────────────────────────────────
export const BIDDING_ITEMS: BiddingItem[] = [
  {
    id: 'bid1',
    title: 'Pokémon Charizard Card',
    image: img('pokemon,charizard,holo,card', 210),
    currentBid: 300,
    originalPrice: 542,
    bidders: 14,
    endsIn: '12 min 24s',
    reviews: 0,
  },
  {
    id: 'bid2',
    title: 'Hot Toys Iron Man MK50',
    image: img('ironman,figure,hot toys', 211),
    currentBid: 280,
    originalPrice: 389,
    bidders: 8,
    endsIn: '2h 10m',
    reviews: 47,
  },
];

// ── Trending collectibles ──────────────────────────────────────────────────────
export const TRENDING_COLLECTIBLES: TrendingItem[] = [
  { rank: 1, title: 'Hot Toys Iron Man',     image: img('ironman,figure',    220, 60, 60), price: 389,  badge: '93% · Community Fave' },
  { rank: 2, title: 'LEGO Avengers Tower',   image: img('lego,tower',        221, 60, 60), price: 419,  badge: '87% · Community Pick', discount: 12 },
  { rank: 3, title: 'Funko Odd Cinema Thor', image: img('funko,thor,figure', 222, 60, 60), price: 29,   badge: '71% · High Rarity Drop' },
  { rank: 4, title: 'Pokémon Charizard Card',image: img('pokemon,card',      223, 60, 60), price: 599,  badge: '71% · Community Card' },
];

// ── Top collectors ─────────────────────────────────────────────────────────────
export const TOP_COLLECTORS: TopCollector[] = [
  { rank: 1, username: 'IronLegend_JP',   avatarSeed: 'IronLegendJP',  avatarBg: '#C0392B', score: 9420,  badge: '4th buyer · 72 reviews' },
  { rank: 2, username: 'CaptAmerica_KU',  avatarSeed: 'CaptAmericaKU', avatarBg: '#2980B9', score: 7810,  badge: '1st buyer · 56 reviews' },
  { rank: 3, username: 'TheMammer_UK',    avatarSeed: 'TheMammerUK',   avatarBg: '#F39C12', score: 5410,  badge: '2nd buyer · 47 reviews' },
];
