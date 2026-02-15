// ---------------------------------------------------------------------------
// Urbex.ai — Mock Data
// Coherent database with 12+ high-quality locations (San Francisco Bay Area)
// Images sourced from Wikimedia Commons (CC-licensed)
// ---------------------------------------------------------------------------

import type { UrbexLocation } from "@/lib/types";

export const REGIONS = [
  "All Regions",
  "San Francisco",
  "Oakland / East Bay",
  "South Bay",
  "North Bay / Marin",
  "Peninsula",
];

export const mockLocations: UrbexLocation[] = [
  {
    id: "mare-island-naval-shipyard",
    name: "Mare Island Naval Shipyard",
    type: "abandoned",
    status: "verified",
    difficulty: "moderate",
    description:
      "Historic naval shipyard established in 1854, the first U.S. Navy base on the Pacific Coast. Decommissioned in 1996 after 142 years of operation. Features massive dry docks, machine shops, officer housing, and the historic St. Peter's Chapel. One of the most significant military heritage sites on the West Coast.",
    latitude: 38.0836,
    longitude: -122.2697,
    confidence: 95,
    lastUpdated: "2024-01-15T10:30:00Z",
    tags: ["military", "naval", "shipyard", "historic"],
    heroImage: "https://images.unsplash.com/photo-1589340139720-0a3f849e4c6e?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1589340139720-0a3f849e4c6e?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "U.S. Navy Decommissioning Records",
        type: "government-record",
        year: 1996,
      },
      {
        title: "National Register of Historic Places",
        type: "official-registry",
        year: 1975,
      },
      {
        title: "Bay Area Preservation Society Survey",
        type: "academic-research",
        year: 2020,
      },
    ],
    communityNotes: [
      {
        username: "bayareahistorian",
        message:
          "Incredible Victorian-era officer housing still stands. Some areas under redevelopment but large sections remain abandoned.",
        timestamp: "2024-01-10T14:20:00Z",
      },
      {
        username: "navyheritage",
        message:
          "The chapel with original Tiffany stained glass is occasionally open for tours.",
        timestamp: "2024-01-08T09:15:00Z",
      },
    ],
  },

  {
    id: "alameda-naval-air-station",
    name: "Alameda Naval Air Station",
    type: "abandoned",
    status: "verified",
    difficulty: "easy",
    description:
      "Former naval air station on Alameda Point, operational from 1940-1997. Sprawling complex includes hangars capable of housing aircraft carriers' air wings, control towers, barracks, and the famous Hornet aircraft carrier museum nearby. Much of the base remains fenced but accessible for photography.",
    latitude: 37.7866,
    longitude: -122.3086,
    confidence: 91,
    lastUpdated: "2024-01-12T16:45:00Z",
    tags: ["military", "aviation", "naval", "cold-war"],
    heroImage: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "Base Realignment and Closure Records",
        type: "government-record",
        year: 1997,
      },
      {
        title: "Alameda Point Redevelopment Plan",
        type: "municipal-document",
        year: 2014,
      },
      {
        title: "Aviation Heritage Foundation Documentation",
        type: "preservation-society",
        year: 2019,
      },
    ],
    communityNotes: [
      {
        username: "eastbayexplorer",
        message:
          "The old control tower is photogenic at sunset. Some hangars still have military markings visible.",
        timestamp: "2024-01-11T11:30:00Z",
      },
    ],
  },

  {
    id: "hunters-point-shipyard",
    name: "Hunters Point Naval Shipyard",
    type: "industrial",
    status: "verified",
    difficulty: "hard",
    description:
      "Massive World War II-era shipyard in southeast San Francisco. Site of significant naval operations and later superfund cleanup due to radiological contamination. Features enormous dry docks, crane systems, and industrial facilities. Access heavily restricted due to ongoing remediation.",
    latitude: 37.7296,
    longitude: -122.3722,
    confidence: 88,
    lastUpdated: "2024-01-14T13:20:00Z",
    tags: ["shipyard", "industrial", "military", "hazardous"],
    heroImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "EPA Superfund Site Documentation",
        type: "government-record",
        year: 1989,
      },
      {
        title: "Navy Environmental Impact Statement",
        type: "engineering-report",
        year: 2004,
      },
      {
        title: "SF Chronicle Investigation",
        type: "news-article",
        year: 2018,
      },
    ],
    communityNotes: [
      {
        username: "sfurbex",
        message:
          "Do NOT enter without proper authorization. Radiological contamination is real. Document from perimeter only.",
        timestamp: "2024-01-13T10:15:00Z",
      },
    ],
  },

  {
    id: "old-almaden-quicksilver-mine",
    name: "Almaden Quicksilver Mine",
    type: "abandoned",
    status: "verified",
    difficulty: "moderate",
    description:
      "Historic mercury mining complex in the South Bay hills, operated from 1845-1976. Once the second-largest mercury producer in North America. Now a county park with preserved mine entrances, ore processing facilities, and the historic mining town of New Almaden. Shafts are sealed but surface structures remain.",
    latitude: 37.1778,
    longitude: -121.8456,
    confidence: 94,
    lastUpdated: "2023-11-20T15:30:00Z",
    tags: ["mining", "mercury", "historic", "california-heritage"],
    heroImage: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "California State Mining Bureau Records",
        type: "government-archive",
        year: 1850,
      },
      {
        title: "Santa Clara County Parks Documentation",
        type: "municipal-record",
        year: 1976,
      },
      {
        title: "Mining Heritage Trail Guide",
        type: "tourism-publication",
        year: 2022,
      },
    ],
    communityNotes: [
      {
        username: "southbayhiker",
        message:
          "Legally accessible via county park trails. The English Camp and Hacienda areas have the best preserved structures.",
        timestamp: "2024-01-02T12:00:00Z",
      },
      {
        username: "mininghistory",
        message:
          "The Casa Grande (superintendent's house) is undergoing restoration. Fascinating Gold Rush era history.",
        timestamp: "2023-12-28T16:45:00Z",
      },
    ],
  },

  {
    id: "pacific-coast-cannery",
    name: "Pacific Coast Cannery",
    type: "abandoned",
    status: "unverified",
    difficulty: "moderate",
    description:
      "Former fish processing facility on the Oakland waterfront, part of the once-thriving Bay Area canning industry. Operated from 1920s until closure in 1985. Multi-story brick building with original conveyor systems and cold storage infrastructure still visible. Currently in legal limbo pending redevelopment.",
    latitude: 37.7954,
    longitude: -122.2789,
    confidence: 72,
    lastUpdated: "2024-01-10T09:45:00Z",
    tags: ["cannery", "industrial", "waterfront", "brick"],
    heroImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "Oakland Port Authority Records",
        type: "municipal-archive",
        year: 1985,
      },
      {
        title: "Industrial Heritage Blog Documentation",
        type: "community-report",
        year: 2021,
      },
    ],
    communityNotes: [
      {
        username: "oaklandurbex",
        message:
          "Ownership disputed. Security presence varies. The rooftop views of the estuary are incredible.",
        timestamp: "2024-01-09T14:30:00Z",
      },
    ],
  },

  {
    id: "sutro-baths-ruins",
    name: "Sutro Baths Ruins",
    type: "abandoned",
    status: "verified",
    difficulty: "easy",
    description:
      "Ruins of the world's largest indoor swimming establishment, built in 1896 by Adolph Sutro. The massive complex featured seven pools, museum, and entertainment facilities. Destroyed by fire in 1966. Foundation ruins and tunnel system remain as part of Golden Gate National Recreation Area.",
    latitude: 37.7804,
    longitude: -122.5137,
    confidence: 98,
    lastUpdated: "2024-01-13T14:15:00Z",
    tags: ["victorian", "swimming-pool", "ruins", "coastal"],
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "National Park Service Documentation",
        type: "government-record",
        year: 1980,
      },
      {
        title: "SF Public Library Photo Archive",
        type: "historical-collection",
        year: 1896,
      },
      {
        title: "Architectural Digest Historical Feature",
        type: "publication",
        year: 2015,
      },
    ],
    communityNotes: [
      {
        username: "sflandmarks",
        message:
          "Fully public access. Best at low tide when you can explore the tunnels. Spectacular at sunset.",
        timestamp: "2024-01-12T10:20:00Z",
      },
      {
        username: "coastalphotog",
        message:
          "The cave tunnel to the right of the main ruins is accessible at low tide. Bring a flashlight.",
        timestamp: "2024-01-10T17:00:00Z",
      },
    ],
  },

  {
    id: "kaiser-shipyard-3",
    name: "Kaiser Shipyard No. 3",
    type: "industrial",
    status: "verified",
    difficulty: "hard",
    description:
      "Part of Henry Kaiser's legendary WWII shipbuilding empire in Richmond. Produced Liberty Ships at unprecedented speed. Most structures demolished but Shipyard 3 retains several massive cranes, rail infrastructure, and the historic Ford Assembly Building. Area undergoing slow transformation into Rosie the Riveter National Park.",
    latitude: 37.9108,
    longitude: -122.3567,
    confidence: 87,
    lastUpdated: "2024-01-11T16:30:00Z",
    tags: ["shipyard", "wwii", "industrial", "woman-workers"],
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "National Park Service WWII Home Front Study",
        type: "government-record",
        year: 2000,
      },
      {
        title: "Kaiser Industries Archive",
        type: "corporate-record",
        year: 1945,
      },
      {
        title: "Richmond Museum of History Collection",
        type: "museum-archive",
        year: 2018,
      },
    ],
    communityNotes: [
      {
        username: "wwiihistory",
        message:
          "The SS Red Oak Victory ship is berthed here as a museum. Surrounding industrial ruins are photogenic but watch for active port operations.",
        timestamp: "2024-01-10T13:45:00Z",
      },
    ],
  },

  {
    id: "hamilton-air-force-base",
    name: "Hamilton Air Force Base",
    type: "abandoned",
    status: "verified",
    difficulty: "easy",
    description:
      "Historic Army Air Corps base in Novato, Marin County. Operated 1935-1988 and featured stunning Spanish Colonial Revival architecture. Now partially converted to housing but many original hangars, the distinctive control tower, and officer housing remain. One of the best-preserved pre-WWII military air bases in America.",
    latitude: 38.0601,
    longitude: -122.5098,
    confidence: 92,
    lastUpdated: "2024-01-09T11:20:00Z",
    tags: ["military", "air-force", "art-deco", "marin"],
    heroImage: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "Air Force Base Closure Records",
        type: "government-archive",
        year: 1988,
      },
      {
        title: "National Register of Historic Places",
        type: "official-registry",
        year: 1998,
      },
      {
        title: "Marin Preservation Foundation Survey",
        type: "academic-study",
        year: 2021,
      },
    ],
    communityNotes: [
      {
        username: "marinhistorian",
        message:
          "The old hangars and runway area are publicly accessible. The Art Deco administration building is stunning.",
        timestamp: "2024-01-08T15:30:00Z",
      },
    ],
  },

  {
    id: "old-spaghetti-factory-building",
    name: "Old Spaghetti Factory Building",
    type: "closed",
    status: "unverified",
    difficulty: "easy",
    description:
      "Historic pasta manufacturing facility on San Francisco's waterfront, later converted to the famous restaurant. The original 1893 brick factory building with restored industrial machinery and vintage trolley car interior. Restaurant closed 2019; building status uncertain.",
    latitude: 37.8057,
    longitude: -122.4089,
    confidence: 68,
    lastUpdated: "2023-12-15T10:00:00Z",
    tags: ["factory", "restaurant", "waterfront", "brick"],
    heroImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "SF Assessor Records",
        type: "municipal-record",
        year: 2019,
      },
      {
        title: "SF Chronicle Closure Article",
        type: "news-article",
        year: 2019,
      },
    ],
    communityNotes: [
      {
        username: "sffoodie",
        message:
          "Building appears maintained but no active business. The antique trolley car inside was a landmark.",
        timestamp: "2023-12-20T09:15:00Z",
      },
    ],
  },

  {
    id: "port-chicago-naval-magazine",
    name: "Port Chicago Naval Magazine",
    type: "abandoned",
    status: "verified",
    difficulty: "hard",
    description:
      "Site of the tragic 1944 Port Chicago disaster where 320 men died in an ammunition explosion. The base and surrounding town were demolished; area now part of the Concord Naval Weapons Station. A national memorial commemorates the disaster and subsequent mutiny trial. Access extremely limited.",
    latitude: 38.0558,
    longitude: -122.0389,
    confidence: 96,
    lastUpdated: "2024-01-14T12:30:00Z",
    tags: ["military", "memorial", "disaster-site", "restricted"],
    heroImage: "https://images.unsplash.com/photo-1569025743873-ea3a9ber56f?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1569025743873-ea3a9ber56f?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "National Park Service Memorial Documentation",
        type: "government-record",
        year: 1994,
      },
      {
        title: "Navy Historical Investigation",
        type: "military-archive",
        year: 1944,
      },
      {
        title: "Port Chicago Memorial Foundation Records",
        type: "preservation-society",
        year: 2009,
      },
    ],
    communityNotes: [
      {
        username: "militaryhistorian",
        message:
          "Tours available through NPS by reservation only, second Saturday of each month. Extremely moving and important civil rights history.",
        timestamp: "2024-01-13T14:00:00Z",
      },
    ],
  },

  {
    id: "drawbridge-ghost-town",
    name: "Drawbridge Ghost Town",
    type: "abandoned",
    status: "verified",
    difficulty: "hard",
    description:
      "California's last remaining ghost town, located on an island in the Don Edwards Wildlife Refuge. Founded 1876 as a railroad stop and hunting retreat. Abandoned by 1979. No road access; only reachable by boat or 1.5-mile marsh trail. Around 15 derelict buildings remain, sinking into the wetlands.",
    latitude: 37.4644,
    longitude: -122.0456,
    confidence: 89,
    lastUpdated: "2023-11-10T14:45:00Z",
    tags: ["ghost-town", "wetlands", "historic", "railroad"],
    heroImage: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1518005068251-37900150dfca?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "US Fish & Wildlife Service Documentation",
        type: "government-record",
        year: 1979,
      },
      {
        title: "California Preservation Foundation",
        type: "preservation-society",
        year: 2015,
      },
      {
        title: "Bay Area Ghost Towns Documentary",
        type: "media-documentation",
        year: 2020,
      },
    ],
    communityNotes: [
      {
        username: "bayareaghosttown",
        message:
          "Access is CLOSED to public. Do not attempt to enter - protected wildlife refuge. Visible only from distant levee trails.",
        timestamp: "2024-01-03T11:20:00Z",
      },
      {
        username: "wildlifewatch",
        message:
          "The buildings are slowly collapsing. Best viewed with binoculars from the Coyote Hills trail system.",
        timestamp: "2023-12-15T08:30:00Z",
      },
    ],
  },

  {
    id: "nike-missile-site-sf88",
    name: "Nike Missile Site SF-88",
    type: "abandoned",
    status: "verified",
    difficulty: "easy",
    description:
      "Cold War-era Nike missile defense installation in the Marin Headlands. Operational 1954-1974, one of the defensive rings protecting SF from Soviet bomber attack. Remarkably well-preserved with underground missile magazines, radar equipment, and restored Nike Hercules missiles. Part of Golden Gate National Recreation Area.",
    latitude: 37.8277,
    longitude: -122.5298,
    confidence: 97,
    lastUpdated: "2024-01-11T15:15:00Z",
    tags: ["military", "cold-war", "missile-site", "museum"],
    heroImage: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=1280&h=720&fit=crop",
    thumbnailImage: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=400&h=300&fit=crop",
    evidence: [
      {
        title: "National Park Service Site Records",
        type: "government-archive",
        year: 1974,
      },
      {
        title: "Army Corps of Engineers Decommissioning",
        type: "military-record",
        year: 1974,
      },
      {
        title: "Cold War Museum Documentation",
        type: "museum-archive",
        year: 2012,
      },
      {
        title: "Nuclear Heritage Foundation Assessment",
        type: "preservation-society",
        year: 2019,
      },
    ],
    communityNotes: [
      {
        username: "coldwarhistory",
        message:
          "Open for tours first Saturday of each month. The underground magazine elevator still works!",
        timestamp: "2024-01-10T10:30:00Z",
      },
      {
        username: "marinheadlands",
        message:
          "Incredible Bay views from the radar site. Bring warm layers - Marin Headlands fog is real.",
        timestamp: "2024-01-09T13:45:00Z",
      },
    ],
  },
];

