const MockTrackList = [
  {
    id:"track1",
    thumb: "https://i.scdn.co/image/ab67616d000048518940ac99f49e44f59e6f7fb3",
    title: "See You Again (feat. Kali Uchis)",
    album: "Flower Boy",
    artists: ["Tyler, The Creator", "Kali Uchis"]
  },
  {
    id:"track2",
    thumb: "https://i.scdn.co/image/ab67616d000048514718e2b124f79258be7bc452",
    title: "Starboy",
    album: "Starboy",
    artists: ["The Weeknd", "Daft Punk"]
  },
  {
    id:"track3",
    thumb: "https://i.scdn.co/image/ab67616d000048511917a0f3f4152622a040913f",
    title: "Another Love",
    album: "Long Way Down (Deluxe)",
    artists: ["Tom Odell"]
  },
  {
    id:"track4",
    thumb: "https://i.scdn.co/image/ab67616d000048518265a736a1eb838ad5a0b921",
    title: "Sweater Weather",
    album: "I Love You.",
    artists: ["The Neighbourhood"]
  },
  {
    id:"track5",
    thumb: "https://i.scdn.co/image/ab67616d00004851e787cffec20aa2a396a61647",
    title: "Lover",
    album: "Lover",
    artists: ["Taylor Swift"]
  },
  {
    id:"track6",
    thumb: "https://i.scdn.co/image/ab67616d000048518a3f0a3ca7929dea23cd274c",
    title: "lovely (with Khalid)",
    album: "lovely (with Khalid)",
    artists: ["Billie Eilish", "Khalid"]
  },
  {
    id:"track7",
    thumb: "https://i.scdn.co/image/ab67616d00004851c6e0948bbb0681ff29cdbae8",
    title: "No Role Modelz",
    album: "2014 Forest Hills Drive",
    artists: ["J. Cole"]
  },
  {
    id:"track8",
    thumb: "https://i.scdn.co/image/ab67616d00004851fc2101e6889d6ce9025f85f2",
    title: "Someone You Loved",
    album: "Divinely Uninspired To A Hellish Extent",
    artists: ["Lewis Capaldi"]
  },
  {
    id:"track9",
    thumb: "https://i.scdn.co/image/ab67616d0000485177fdcfda6535601aff081b6a",
    title: "Watermelon Sugar",
    album: "Fine Line",
    artists: ["Harry Styles"]
  },
  {
    id:"track10",
    thumb: "https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96",
    title: "Perfect",
    album: "÷ (Deluxe)",
    artists: ["Ed Sheeran"]
  },
  {
    id:"track11",
    thumb: "https://i.scdn.co/image/ab67616d000048515675e83f707f1d7271e5cf8a",
    title: "Believer",
    album: "Evolve",
    artists: ["Imagine Dragons"]
  },
  {
    id:"track12",
    thumb: "https://i.scdn.co/image/ab67616d00004851c5649add07ed3720be9d5526",
    title: "Pink + White",
    album: "Blonde",
    artists: ["Frank Ocean"]
  },
  {
    id:"track13",
    thumb: "https://i.scdn.co/image/ab67616d00004851926f43e7cce571e62720fd46",
    title: "Locked out of Heaven",
    album: "Unorthodox Jukebox",
    artists: ["Bruno Mars"]
  },
  {
    id:"track14",
    thumb: "https://i.scdn.co/image/ab67616d000048514ae1c4c5c45aabe565499163",
    title: "Do I Wanna Know?",
    album: "AM",
    artists: ["Arctic Monkeys"]
  },
  {
    id:"track15",
    thumb: "https://i.scdn.co/image/ab67616d00004851d5a8395b0d80b8c48a5d851c",
    title: "Sure Thing",
    album: "All I Want Is You",
    artists: ["Miguel"]
  },
  {
    id:"track16",
    thumb: "https://i.scdn.co/image/ab67616d000048519416ed64daf84936d89e671c",
    title: "One Dance",
    album: "Views",
    artists: ["Drake", "Wizkid"]
  },
  {
    id:"track17",
    thumb: "https://i.scdn.co/image/ab67616d00004851d304ba2d71de306812eebaf4",
    title: "Night Changes",
    album: "FOUR (Deluxe)",
    artists: ["One Direction"]
  },
  {
    id:"track18",
    thumb: "https://i.scdn.co/image/ab67616d000048519478c87599550dd73bfa7e02",
    title: "Circles",
    album: "Hollywood's Bleeding",
    artists: ["Post Malone"]
  },
  {
    id:"track19",
    thumb: "https://i.scdn.co/image/ab67616d00004851ba5db46f4b838ef6027e6f96",
    title: "Shape of You",
    album: "÷ (Deluxe)",
    artists: ["Ed Sheeran"]
  },
  {
    id:"track20",
    thumb: "https://i.scdn.co/image/ab67616d00004851e14f11f796cef9f9a82691a7",
    title: "Wake Me Up",
    album: "True",
    artists: ["Avicii"]
  },
  {
    id:"track21",
    thumb: "https://i.scdn.co/image/ab67616d000048514ae1c4c5c45aabe565499163",
    title: "Why'd You Only Call Me When You're High?",
    album: "AM",
    artists: ["Arctic Monkeys"]
  },
  {
    id:"track22",
    thumb: "https://i.scdn.co/image/ab67616d00004851926f43e7cce571e62720fd46",
    title: "When I Was Your Man",
    album: "Unorthodox Jukebox",
    artists: ["Bruno Mars"]
  },
  {
    id:"track23",
    thumb: "https://i.scdn.co/image/ab67616d000048517fcead687e99583072cc217b",
    title: "The Hills",
    album: "Beauty Behind The Madness",
    artists: ["The Weeknd"]
  },
  {
    id:"track24",
    thumb: "https://i.scdn.co/image/ab67616d000048515675e83f707f1d7271e5cf8a",
    title: "Thunder",
    album: "Evolve",
    artists: ["Imagine Dragons"]
  },
  {
    id:"track25",
    thumb: "https://i.scdn.co/image/ab67616d000048519e2f95ae77cf436017ada9cb",
    title: "Counting Stars",
    album: "Native",
    artists: ["OneRepublic"]
  },
  {
    id:"track26",
    thumb: "https://i.scdn.co/image/ab67616d000048510ae4f4d42e4a09f3a29f64ad",
    title: "The Nights",
    album: "The Days / Nights",
    artists: ["Avicii"]
  },
  {
    id:"track27",
    thumb: "https://i.scdn.co/image/ab67616d00004851232711f7d66a1e19e89e28c5",
    title: "That's What I Like",
    album: "24K Magic",
    artists: ["Bruno Mars"]
  },
  {
    id:"track28",
    thumb: "https://i.scdn.co/image/ab67616d00004851d09f96d82310d4d77c14c108",
    title: "One Kiss (with Dua Lipa)",
    album: "One Kiss (with Dua Lipa)",
    artists: ["Calvin Harris", "Dua Lipa"]
  },
  {
    id:"track29",
    thumb: "https://i.scdn.co/image/ab67616d00004851f864bcdcc245f06831d17ae0",
    title: "A Sky Full of Stars",
    album: "Ghost Stories",
    artists: ["Coldplay"]
  },
  {
    id:"track30",
    thumb: "https://i.scdn.co/image/ab67616d00004851459d675aa0b6f3b211357370",
    title: "Let Me Down Slowly",
    album: "Narrated For You",
    artists: ["Alec Benjamin"]
  },
  {
    id:"track31",
    thumb: "https://i.scdn.co/image/ab67616d00004851de03bfc2991fd5bcfde65ba3",
    title: "Stressed Out",
    album: "Blurryface",
    artists: ["Twenty One Pilots"]
  },
  {
    id:"track32",
    thumb: "https://i.scdn.co/image/ab67616d000048511f6a2a40bb692936879db730",
    title: "Call Out My Name",
    album: "My Dear Melancholy,",
    artists: ["The Weeknd"]
  },
  {
    id:"track33",
    thumb: "https://i.scdn.co/image/ab67616d00004851d7fb3e4c63020039d1cff6b2",
    title: "Young And Beautiful",
    album: "Young And Beautiful",
    artists: ["Lana Del Rey"]
  },
  {
    id:"track34",
    thumb: "https://i.scdn.co/image/ab67616d000048511376b4b16f4bfcba02dc571b",
    title: "Treat You Better",
    album: "Illuminate",
    artists: ["Shawn Mendes"]
  },
  {
    id:"track35",
    thumb: "https://i.scdn.co/image/ab67616d000048514f0fd9dad63977146e685700",
    title: "Passionfruit",
    album: "More Life",
    artists: ["Drake"]
  },
  {
    id:"track36",
    thumb: "https://i.scdn.co/image/ab67616d0000485113b3e37318a0c247b550bccd",
    title: "Photograph",
    album: "x (Deluxe Edition)",
    artists: ["Ed Sheeran"]
  },
  {
    id:"track37",
    thumb: "https://i.scdn.co/image/ab67616d00004851f54b99bf27cda88f4a7403ce",
    title: "goosebumps",
    album: "Birds In The Trap Sing McKnight",
    artists: ["Travis Scott"]
  },
  {
    id:"track38",
    thumb: "https://i.scdn.co/image/ab67616d0000485152b2a3824413eefe9e33817a",
    title: "Shake It Off",
    album: "1989 (Deluxe)",
    artists: ["Taylor Swift"]
  },
  {
    id:"track39",
    thumb: "https://i.scdn.co/image/ab67616d000048519478c87599550dd73bfa7e02",
    title: "Sunflower - Spider-Man: Into the Spider-Verse",
    album: "Hollywood's Bleeding",
    artists: ["Post Malone", "Swae Lee"]
  },
  {
    id:"track40",
    thumb: "https://i.scdn.co/image/ab67616d000048519e1cfc756886ac782e363d79",
    title: "The Less I Know The Better",
    album: "Currents",
    artists: ["Tame Impala"]
  },
  {
    id:"track41",
    thumb: "https://i.scdn.co/image/ab67616d0000485194c9217a398f5174757c0c78",
    title: "All of Me",
    album: "Love In The Future (Expanded Edition)",
    artists: ["John Legend"]
  },
  {
    id:"track42",
    thumb: "https://i.scdn.co/image/ab67616d000048514891d9b25d8919448388f3bb",
    title: "LA CANCIÓN",
    album: "OASIS",
    artists: ["J Balvin", "Bad Bunny"]
  }
]


export default MockTrackList;