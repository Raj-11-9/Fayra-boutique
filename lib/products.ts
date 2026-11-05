export const dressCategories = [
  "Punjabi Suits",
  "Salwar Suits",
  "Sarees",
  "Lehengas",
  "Anarkalis",
  "Sharara & Gharara",
  "Kurta Sets",
  "Indo-Western",
] as const;

export type DressCategory = (typeof dressCategories)[number];
export type ProductCollection = "Punjabi Edit" | "Indian Classics" | "Indo-Western";

export type Product = {
  name: string;
  note: string;
  price: string;
  priceValue: number;
  image: string;
  gallery: string[];
  category: DressCategory;
  collection: ProductCollection;
  tone: string;
  fabric: string;
  craft: string;
  silhouette: string;
  occasion: string;
  description: string;
  sizes: string[];
  crop?: string;
};

type DressDesign = {
  name: string;
  category: DressCategory;
  collection: ProductCollection;
  fabric: string;
  craft: string;
  silhouette: string;
  occasion: string;
  basePrice: number;
};

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const dressDesigns: DressDesign[] = [
  {
    name: "Phulkari Patiala Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Cotton-silk",
    craft: "Phulkari-inspired floral threadwork",
    silhouette: "Short kameez with pleated Patiala salwar and dupatta",
    occasion: "Baisakhi, family gatherings, and daytime celebrations",
    basePrice: 2999,  },
  {
    name: "Classic Patiala Salwar Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Cotton-silk",
    craft: "Hand-finished piping and woven border",
    silhouette: "Fitted kameez with a voluminous pleated Patiala salwar",
    occasion: "Everyday festivities and family visits",
    basePrice: 1799,  },
  {
    name: "Phulkari Dupatta Three-Piece Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Chanderi cotton",
    craft: "Phulkari-inspired embroidered dupatta",
    silhouette: "Straight kameez with tapered salwar and statement dupatta",
    occasion: "Lohri, Baisakhi, and festive lunches",
    basePrice: 2499,  },
  {
    name: "Punjabi Jaal-Embroidered Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Silk blend",
    craft: "All-over jaal thread embroidery",
    silhouette: "Long kameez with slim salwar and soft dupatta",
    occasion: "Engagement celebrations and evening gatherings",
    basePrice: 3299,  },
  {
    name: "Punjabi Mirror-Work Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Chanderi silk",
    craft: "Mirror accents with fine thread embroidery",
    silhouette: "Flared kameez with straight salwar",
    occasion: "Sangeet, mehndi, and festive evenings",
    basePrice: 3499,  },
  {
    name: "Punjabi Gota Patti Patiala Set",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Chiffon and cotton-silk",
    craft: "Gota patti edging and hand-finished tassels",
    silhouette: "Angrakha kameez with gathered Patiala salwar",
    occasion: "Wedding festivities and family occasions",
    basePrice: 3299,  },
  {
    name: "Punjabi Velvet Winter Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Velvet and silk",
    craft: "Zari neckline with hand-finished cuffs",
    silhouette: "Long velvet kameez with classic salwar",
    occasion: "Winter weddings and evening celebrations",
    basePrice: 3999,  },
  {
    name: "Punjabi Chikankari Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Cotton voile",
    craft: "Chikankari-inspired floral embroidery",
    silhouette: "Easy straight kameez with tapered salwar",
    occasion: "Daytime gatherings and summer celebrations",
    basePrice: 1799,  },
  {
    name: "Punjabi Angrakha Salwar Set",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Georgette",
    craft: "Dori tie detail and tonal embroidery",
    silhouette: "Angrakha wrap kameez with gathered salwar",
    occasion: "Festive dinners and intimate celebrations",
    basePrice: 2999,  },
  {
    name: "Punjabi Palazzo Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Viscose crepe",
    craft: "Scalloped dupatta with threadwork",
    silhouette: "Long straight kameez with wide palazzo trousers",
    occasion: "Celebrations, dinners, and festive work events",
    basePrice: 2299,  },
  {
    name: "Punjabi Jacket Patiala Set",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Raw silk and cotton-silk",
    craft: "Embroidered sleeveless jacket",
    silhouette: "Layered short jacket, kameez, and pleated Patiala",
    occasion: "Mehndi, sangeet, and celebratory evenings",
    basePrice: 3999,  },
  {
    name: "Punjabi Sharara Kameez Set",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Georgette and silk",
    craft: "Zari-trimmed dupatta and embroidered yoke",
    silhouette: "Knee-length kameez with flared sharara",
    occasion: "Wedding receptions and festive occasions",
    basePrice: 3499,  },
  {
    name: "Amritsari Phulkari Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Handloom cotton-silk",
    craft: "Phulkari-inspired geometric embroidery",
    silhouette: "Straight kameez, relaxed salwar, and embroidered dupatta",
    occasion: "Baisakhi and daytime celebrations",
    basePrice: 2799,  },
  {
    name: "Punjabi Wedding Salwar Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Silk and organza",
    craft: "Hand embroidery with a scalloped dupatta",
    silhouette: "Fitted kameez with fluid salwar and occasion dupatta",
    occasion: "Wedding guest dressing and family ceremonies",
    basePrice: 4499,  },
  {
    name: "Punjabi Kurti with Patiala",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Printed cotton",
    craft: "Hand-finished neckline and contrast piping",
    silhouette: "Everyday short kurti with pleated Patiala bottoms",
    occasion: "Day outings and relaxed celebrations",
    basePrice: 1499,  },
  {
    name: "Phulkari Straight Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Cotton-linen",
    craft: "Phulkari-inspired embroidered neckline",
    silhouette: "Straight kameez with narrow pants and dupatta",
    occasion: "Baisakhi gatherings and daytime events",
    basePrice: 2199,  },
  {
    name: "Patiala Festive Anarkali Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Chanderi silk",
    craft: "Antique zari edging and hand-finished pleats",
    silhouette: "Flared Anarkali kameez with a Patiala salwar",
    occasion: "Lohri, Diwali, and evening celebrations",
    basePrice: 3599,  },
  {
    name: "Punjabi Bandhani Dupatta Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Lightweight cotton-silk",
    craft: "Bandhani-inspired dupatta with zari edging",
    silhouette: "Straight kameez, gathered salwar, and printed dupatta",
    occasion: "Festive lunches and family celebrations",
    basePrice: 2399,  },
  {
    name: "Punjabi Embroidered Palazzo Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Crepe and chiffon",
    craft: "Tonal floral embroidery and soft edging",
    silhouette: "Long kameez with fluid palazzo trousers",
    occasion: "Evening dinners and celebratory occasions",
    basePrice: 2999,  },
  {
    name: "Punjabi Silk Churidar Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Silk blend",
    craft: "Fine zari border and embroidered yoke",
    silhouette: "Long kameez with fitted churidar and dupatta",
    occasion: "Religious celebrations and formal gatherings",
    basePrice: 2999,  },
  {
    name: "Punjabi Sharara Festive Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Organza and silk",
    craft: "Gota-inspired trim with embroidered cuffs",
    silhouette: "Short kameez with dramatic flared sharara",
    occasion: "Sangeet and wedding celebrations",
    basePrice: 3699,  },
  {
    name: "Punjabi Printed Cotton Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Breathable printed cotton",
    craft: "Contrast woven dupatta and neat piping",
    silhouette: "Relaxed straight kurta with an easy salwar",
    occasion: "Everyday wear and casual get-togethers",
    basePrice: 1299,  },
  {
    name: "Punjabi Occasion Jacket Suit",
    category: "Punjabi Suits",
    collection: "Punjabi Edit",
    fabric: "Brocade and crepe",
    craft: "Brocade jacket with hand-finished buttons",
    silhouette: "Long inner kurta, straight pants, and open jacket",
    occasion: "Reception dinners and formal festivities",
    basePrice: 3999,  },
  {
    name: "Classic Straight Salwar Kameez",
    category: "Salwar Suits",
    collection: "Indian Classics",
    fabric: "Cotton voile",
    craft: "Fine thread embroidery on the neckline",
    silhouette: "Straight kameez with a classic salwar and dupatta",
    occasion: "Day gatherings and everyday celebrations",
    basePrice: 1599,  },
  {
    name: "Chikankari Salwar Suit",
    category: "Salwar Suits",
    collection: "Indian Classics",
    fabric: "Cotton voile",
    craft: "Chikankari-inspired whitework embroidery",
    silhouette: "Relaxed straight kameez with tapered salwar",
    occasion: "Summer lunches and intimate gatherings",
    basePrice: 2299,  },
  {
    name: "Angrakha Salwar Suit",
    category: "Salwar Suits",
    collection: "Indian Classics",
    fabric: "Georgette",
    craft: "Dori tie and delicate sequin accents",
    silhouette: "Overlapping Angrakha kurta with slim salwar",
    occasion: "Festive evenings and family ceremonies",
    basePrice: 2499,  },
  {
    name: "Printed Cotton Salwar Suit",
    category: "Salwar Suits",
    collection: "Indian Classics",
    fabric: "Hand-block-print cotton",
    craft: "Block-print motifs with contrast piping",
    silhouette: "Easy straight kurta with relaxed salwar",
    occasion: "Everyday dressing and casual visits",
    basePrice: 1299,  },
  {
    name: "Silk Wedding Guest Salwar Suit",
    category: "Salwar Suits",
    collection: "Indian Classics",
    fabric: "Raw silk",
    craft: "Hand-finished zari and tonal embroidery",
    silhouette: "Tailored kameez with slim churidar",
    occasion: "Wedding ceremonies and formal celebrations",
    basePrice: 4299,  },
  {
    name: "Palazzo Salwar Kameez Set",
    category: "Salwar Suits",
    collection: "Indian Classics",
    fabric: "Viscose crepe",
    craft: "Embroidered hem with a light dupatta",
    silhouette: "Long straight kameez paired with fluid palazzos",
    occasion: "Office celebrations and evening outings",
    basePrice: 1899,  },
  {
    name: "Chanderi Zari Saree",
    category: "Sarees",
    collection: "Indian Classics",
    fabric: "Chanderi silk-cotton",
    craft: "Woven zari border",
    silhouette: "Lightweight six-yard saree",
    occasion: "Daytime ceremonies and festive lunches",
    basePrice: 1999,  },
  {
    name: "Banarasi Brocade Saree",
    category: "Sarees",
    collection: "Indian Classics",
    fabric: "Banarasi silk",
    craft: "Brocade-inspired floral zari weave",
    silhouette: "Traditional heirloom six-yard drape",
    occasion: "Wedding ceremonies and milestone celebrations",
    basePrice: 3999,  },
  {
    name: "Soft Organza Saree",
    category: "Sarees",
    collection: "Indian Classics",
    fabric: "Silk organza",
    craft: "Fine scalloped hand-finished edge",
    silhouette: "Airy six-yard drape with a soft fall",
    occasion: "Cocktail events and intimate weddings",
    basePrice: 2999,  },
  {
    name: "Kanjivaram-Inspired Silk Saree",
    category: "Sarees",
    collection: "Indian Classics",
    fabric: "Silk blend",
    craft: "Contrast temple-border weave",
    silhouette: "Structured six-yard drape",
    occasion: "Festive rituals and formal occasions",
    basePrice: 4999,  },
  {
    name: "Bandhani Leheriya Saree",
    category: "Sarees",
    collection: "Indian Classics",
    fabric: "Georgette",
    craft: "Bandhani- and leheriya-inspired pattern",
    silhouette: "Fluid six-yard festive drape",
    occasion: "Baisakhi, Navratri, and festive gatherings",
    basePrice: 2499,  },
  {
    name: "Embroidered Bridal Lehenga",
    category: "Lehengas",
    collection: "Indian Classics",
    fabric: "Raw silk and net",
    craft: "Dense floral hand embroidery",
    silhouette: "Structured flared bridal lehenga with dupatta",
    occasion: "Wedding ceremonies and bridal celebrations",
    basePrice: 4999,  },
  {
    name: "Mirror-Work Festive Lehenga",
    category: "Lehengas",
    collection: "Indian Classics",
    fabric: "Silk blend",
    craft: "Mirror-work accents with fine threadwork",
    silhouette: "Flared lehenga with fitted blouse and dupatta",
    occasion: "Mehndi, sangeet, and festive evenings",
    basePrice: 3999,  },
  {
    name: "Lightweight Organza Lehenga",
    category: "Lehengas",
    collection: "Indian Classics",
    fabric: "Silk organza",
    craft: "Scalloped edge and delicate sequin work",
    silhouette: "Airy layered lehenga with soft dupatta",
    occasion: "Day weddings and garden celebrations",
    basePrice: 3499,  },
  {
    name: "Velvet Zari Lehenga",
    category: "Lehengas",
    collection: "Indian Classics",
    fabric: "Velvet and silk",
    craft: "Antique zari embroidery",
    silhouette: "Full velvet skirt with a structured blouse",
    occasion: "Winter weddings and evening receptions",
    basePrice: 4799,  },
  {
    name: "Floral Printed Lehenga Set",
    category: "Lehengas",
    collection: "Indian Classics",
    fabric: "Chiffon and cotton-silk",
    craft: "Floral print with hand-finished edging",
    silhouette: "Light flared skirt with matching blouse and dupatta",
    occasion: "Daytime festivities and intimate celebrations",
    basePrice: 2299,  },
  {
    name: "Panelled Anarkali Suit",
    category: "Anarkalis",
    collection: "Indian Classics",
    fabric: "Chanderi silk",
    craft: "Hand-finished panel seams and embroidered yoke",
    silhouette: "Full-length flared Anarkali with churidar",
    occasion: "Festivals and formal family gatherings",
    basePrice: 2599,  },
  {
    name: "Floor-Length Anarkali Gown",
    category: "Anarkalis",
    collection: "Indian Classics",
    fabric: "Georgette and net",
    craft: "Sequin neckline with fine thread embroidery",
    silhouette: "Floor-length Anarkali with a sheer dupatta",
    occasion: "Reception dinners and evening celebrations",
    basePrice: 3999,  },
  {
    name: "Angrakha Anarkali Suit",
    category: "Anarkalis",
    collection: "Indian Classics",
    fabric: "Silk blend",
    craft: "Angrakha tie detail with zari edging",
    silhouette: "Wrap-front Anarkali with fitted churidar",
    occasion: "Festivals and intimate wedding functions",
    basePrice: 2799,  },
  {
    name: "Chikankari Anarkali Suit",
    category: "Anarkalis",
    collection: "Indian Classics",
    fabric: "Cotton voile",
    craft: "Chikankari-inspired all-over whitework",
    silhouette: "Lightly flared Anarkali with straight pants",
    occasion: "Daytime events and summer celebrations",
    basePrice: 2299,  },
  {
    name: "Embroidered Sharara Set",
    category: "Sharara & Gharara",
    collection: "Indian Classics",
    fabric: "Georgette and silk",
    craft: "Embroidered yoke with zari-trimmed dupatta",
    silhouette: "Short kurta with wide flared sharara trousers",
    occasion: "Sangeet, mehndi, and wedding celebrations",
    basePrice: 3499,  },
  {
    name: "Pink Embroidered Lehenga Set",
    category: "Lehengas",
    collection: "Indian Classics",
    fabric: "Silk and organza",
    craft: "Fine floral embroidery with a matching dupatta",
    silhouette: "Full flared skirt with a matching blouse and dupatta",
    occasion: "Wedding functions and festive evenings",
    basePrice: 3999,  },
  {
    name: "Chiffon Sharara Occasion Set",
    category: "Sharara & Gharara",
    collection: "Indian Classics",
    fabric: "Chiffon",
    craft: "Scalloped lace-inspired edging",
    silhouette: "Fluid tunic with tiered sharara and dupatta",
    occasion: "Family celebrations and evening occasions",
    basePrice: 2799,  },
  {
    name: "Deep Red Bridal Lehenga",
    category: "Lehengas",
    collection: "Indian Classics",
    fabric: "Velvet and silk",
    craft: "All-over embroidery with a finished hem",
    silhouette: "Full bridal skirt with an embroidered blouse and dupatta",
    occasion: "Winter weddings and formal celebrations",
    basePrice: 4999,  },
  {
    name: "Straight Kurta Trouser Set",
    category: "Kurta Sets",
    collection: "Indian Classics",
    fabric: "Cotton-linen",
    craft: "Hand-finished placket and cuff detail",
    silhouette: "Straight kurta with tailored ankle-length trousers",
    occasion: "Everyday wear and casual gatherings",
    basePrice: 1299,  },
  {
    name: "Chanderi Embroidered Kurta Set",
    category: "Kurta Sets",
    collection: "Indian Classics",
    fabric: "Chanderi cotton",
    craft: "Fine embroidered neckline and woven border",
    silhouette: "Relaxed kurta with straight pants and dupatta",
    occasion: "Festive lunches and daytime ceremonies",
    basePrice: 1899,  },
  {
    name: "Printed Cotton Kurta Set",
    category: "Kurta Sets",
    collection: "Indian Classics",
    fabric: "Hand-block-print cotton",
    craft: "Block-print motifs and contrast piping",
    silhouette: "Easy kurta with tapered pants and light dupatta",
    occasion: "Everyday outings and relaxed gatherings",
    basePrice: 1199,  },
  {
    name: "Silk Festive Kurta Set",
    category: "Kurta Sets",
    collection: "Indian Classics",
    fabric: "Raw silk",
    craft: "Zari accents and hand-finished buttons",
    silhouette: "Structured kurta with slim trousers and stole",
    occasion: "Festive evenings and family celebrations",
    basePrice: 2999,  },
  {
    name: "Draped Dhoti Co-ord",
    category: "Indo-Western",
    collection: "Indo-Western",
    fabric: "Viscose crepe",
    craft: "Hand-finished drape with embroidered belt",
    silhouette: "Modern tunic paired with a pre-draped dhoti bottom",
    occasion: "Cocktail events and modern festivities",
    basePrice: 3299,  },
  {
    name: "Silver Draped Evening Set",
    category: "Indo-Western",
    collection: "Indo-Western",
    fabric: "Embellished occasionwear",
    craft: "Silver-toned embellishment with a fluid shoulder drape",
    silhouette: "Draped, floor-length evening silhouette",
    occasion: "Reception evenings and cocktail celebrations",
    basePrice: 4999,  },
  {
    name: "Jacket-Style Saree Gown",
    category: "Indo-Western",
    collection: "Indo-Western",
    fabric: "Georgette and crepe",
    craft: "Embroidered jacket with a ready-drape finish",
    silhouette: "Pre-draped saree paired with a tailored jacket",
    occasion: "Formal evenings and modern wedding events",
    basePrice: 4299,  },
  {
    name: "Asymmetric Tunic Co-ord",
    category: "Indo-Western",
    collection: "Indo-Western",
    fabric: "Textured crepe",
    craft: "Tonal hand embellishment",
    silhouette: "Asymmetric tunic with fluid wide-leg trousers",
    occasion: "Celebratory dinners and occasion dressing",
    basePrice: 2399,  },
];

const productPhotoIds: Record<DressCategory, number[]> = {
  "Punjabi Suits": [
    39550987, 34251604, 35521738, 36311379, 37523799, 34933700, 13178920, 39287861,
    30196701, 20407212, 20407233, 28213774, 28512787, 31567628, 40666062, 19271174,
    36607719, 36552676, 34313231, 20788501, 40666089, 9036914, 40529917,
  ],
  "Salwar Suits": [36325924, 35887012, 28926432, 40546708, 14248288, 16116786],
  Sarees: [14928074, 14205210, 28943474, 37054322, 33754389],
  Lehengas: [11748805, 12668925, 12747872, 13027837, 13191611, 17001511, 29368869],
  Anarkalis: [5393856, 5393857, 5399874, 8770996],
  "Sharara & Gharara": [13636095, 33557615],
  "Kurta Sets": [20777181, 25184999, 25184995, 13584944],
  "Indo-Western": [13224228, 38876958, 30004204, 20040952],
};

const imageByDesign = new Map<string, string>();
for (const category of dressCategories) {
  const categoryDesigns = dressDesigns.filter((design) => design.category === category);
  const photoIds = productPhotoIds[category];
  if (categoryDesigns.length !== photoIds.length) {
    throw new Error(`Expected one product photo per ${category} design.`);
  }
  categoryDesigns.forEach((design, index) => {
    imageByDesign.set(design.name, `/images/products/pexels-${photoIds[index]}.webp`);
  });
}

const generatedProducts: Product[] = dressDesigns.map((design) => {
  const priceValue = design.basePrice;
  const name = design.name;
  const image = imageByDesign.get(design.name);

  if (!image) {
    throw new Error(`Missing product photo for ${design.name}.`);
  }

  return {
    name,
    note: `${design.fabric} · ${design.craft}`,
    price: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(priceValue),
    priceValue,
    image,
    gallery: [image],
    category: design.category,
    collection: design.collection,
    tone: "As pictured",
    fabric: design.fabric,
    craft: design.craft,
    silhouette: design.silhouette,
    occasion: design.occasion,
    description: `${name} pairs ${design.fabric.toLowerCase()} with ${design.craft.toLowerCase()} in a ${design.silhouette.toLowerCase()}. A considered choice for ${design.occasion.toLowerCase()}.`,
    sizes: design.category === "Sarees" ? ["Free size"] : sizeOptions,
  };
});

export const dressDesignCount = dressDesigns.length;

// Original product copy uses garment and craft references from
// https://www.incredibleindia.gov.in/en/punjab/amritsar (including Phulkari).
// Product photos are sourced from Pexels and paired by garment category; see the bundled source manifest.
export const products: Product[] = generatedProducts;

export const collectionFilters = ["All dresses", "Punjabi Edit", ...dressCategories] as const;
