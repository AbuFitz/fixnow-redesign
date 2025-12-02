export const BUSINESS_INFO = {
  name: "FixNow Mechanics",
  phone: "07354 915941",
  email: "fixnowmechanics@outlook.com",
  address: "Hemel Hempstead, HP2 7DE",
  hours: {
    weekday: "Mon-Sat: 7am - 10pm",
    weekend: "Sun: 8am - 8pm",
  },
  coverage: "45-mile radius",
  whatsapp: "https://wa.me/447354915941",
} as const;

export const SERVICES = [
  {
    id: "diagnostics",
    name: "Diagnostics",
    description: "Full vehicle diagnostic scans to identify any issues with your car's systems.",
    price: "From £45",
    icon: "Monitor",
  },
  {
    id: "brakes",
    name: "Brakes",
    description: "Brake pad replacement, disc replacement, and full brake system servicing.",
    price: "From £80",
    icon: "CircleDot",
  },
  {
    id: "servicing",
    name: "Servicing",
    description: "Full and interim services to keep your vehicle running smoothly.",
    price: "From £120",
    icon: "Settings",
  },
  {
    id: "electrical",
    name: "Electrical & Battery",
    description: "Battery replacement, alternator repairs, and electrical fault finding.",
    price: "From £40",
    icon: "Zap",
  },
  {
    id: "suspension",
    name: "Suspension",
    description: "Shock absorbers, springs, and full suspension system repairs.",
    price: "From £100",
    icon: "ArrowUpDown",
  },
  {
    id: "general",
    name: "General Repairs",
    description: "Oil changes, filter replacements, and general mechanical repairs.",
    price: "From £50",
    icon: "Wrench",
  },
] as const;

export const LOCATIONS = [
  {
    slug: "watford",
    name: "Watford",
    postcodes: ["WD17", "WD18", "WD19", "WD23", "WD24", "WD25"],
    description: "Mobile mechanic services throughout Watford and surrounding areas.",
  },
  {
    slug: "st-albans",
    name: "St Albans",
    postcodes: ["AL1", "AL2", "AL3", "AL4"],
    description: "Professional mobile mechanic services across St Albans.",
  },
  {
    slug: "luton",
    name: "Luton",
    postcodes: ["LU1", "LU2", "LU3", "LU4", "LU5", "LU6", "LU7"],
    description: "Reliable mobile mechanic services in Luton and nearby areas.",
  },
  {
    slug: "dunstable",
    name: "Dunstable",
    postcodes: ["LU5", "LU6"],
    description: "Expert mobile mechanic services throughout Dunstable.",
  },
  {
    slug: "milton-keynes",
    name: "Milton Keynes",
    postcodes: ["MK1", "MK2", "MK3", "MK4", "MK5", "MK6", "MK7", "MK8", "MK9", "MK10", "MK11", "MK12", "MK13", "MK14", "MK15"],
    description: "Comprehensive mobile mechanic services across Milton Keynes.",
  },
  {
    slug: "aylesbury",
    name: "Aylesbury",
    postcodes: ["HP17", "HP18", "HP19", "HP20", "HP21", "HP22"],
    description: "Mobile mechanic services covering Aylesbury and the Vale.",
  },
  {
    slug: "stevenage",
    name: "Stevenage",
    postcodes: ["SG1", "SG2"],
    description: "Quality mobile mechanic services throughout Stevenage.",
  },
  {
    slug: "hatfield",
    name: "Hatfield",
    postcodes: ["AL9", "AL10"],
    description: "Professional mobile mechanic services in Hatfield.",
  },
  {
    slug: "north-london",
    name: "North London",
    postcodes: ["N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "N9", "N10", "N11", "N12", "N13", "N14", "N15", "N16", "N17", "N18", "N19", "N20", "N21", "N22", "EN1", "EN2", "EN3", "EN4", "EN5"],
    description: "Mobile mechanic services across North London and Enfield areas.",
  },
] as const;
