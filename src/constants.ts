import { TestimonyCardProps } from "./components/common/TestimonialCarousel";
import { MenuCategoryType } from "./hooks/useMenuPageSearchParams";
import { Product } from "./models/types";
import { SplitScreenSectionType } from "./pages/Homepage";
import { RewardPerksType, RewardsInfoType } from "./pages/Rewards";

export const PESOSIGN: string = "₱";

export const TESTIMONIALS: TestimonyCardProps[] = [
  {
    id: 1,
    iconUrl:
      "src/assets/profile/images/stefan-stefancik-QXevDflbl8A-unsplash.jpg",
    name: "Andrea Meredith Vance",
    role: "CTO, Nexora Technologies",
    testimony: `"I can’t imagine starting my day without this coffee! It’s smooth, bold, and gives me the perfect kick to stay sharp during long coding sessions. Whether I’m deep in problem-solving or brainstorming the next big innovation at Nexora, this is the fuel that keeps me going!"`,
  },
  {
    id: 2,
    iconUrl: "src/assets/profile/images/rayul-_M6gy9oHgII-unsplash.jpg",
    name: "Mark Patton",
    role: "Software Developer, Nexora Technologies",
    testimony:
      '"I’ve tasted coffee from all over, but nothing compares to this! The rich aroma and perfectly balanced flavors make every cup an experience. Whether I’m on the go or unwinding after a long day, this is my go-to brew."',
  },
  {
    id: 3,
    iconUrl: "src/assets/profile/images/fatane-rahimi-Agv-xPQBO60-unsplash.jpg",
    name: "Hayley Crowell",
    role: "Novelist, Indie Musician",
    testimony:
      '"Every sip feels like a warm hug! The deep, chocolatey notes and smooth finish make this my go-to for songwriting sessions. It’s like creativity in a cup!"',
  },
  {
    id: 4,
    iconUrl:
      "src/assets/profile/images/rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg",
    name: "Alexandra Smith",
    role: "Marketing Director",
    testimony:
      '"The perfect balance of strength and smoothness! Whether I’m leading a meeting or catching up on emails, this coffee keeps me focused and ready to tackle the day."',
  },
  {
    id: 5,
    iconUrl: "src/assets/profile/images/warren-tHiGKAJxaA8-unsplash.jpg",
    name: "Alex Barrett",
    role: "Cybersecurity Specialist and Underground DJ",
    testimony: `"Cybersecurity is all about precision, and so is great coffee. This blend is rich, bold, and exactly what I need to stay sharp. I wouldn’t trust anything else to get me through those late-night coding sessions!"`,
  },
];

export const SECTIONS: SplitScreenSectionType[] = [
  {
    id: 1,
    imgUrl: "src/assets/nathan-dumlao-zEdCT0qrodE-unsplash.jpg",
    alt: "Black Coffee and Latte",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "More to sip and savor",
    content: `Enjoy a rich selection of coffee, plus freshly baked pastries made to pair perfectly with your favorite brew. Whether you're in the mood for a bold espresso or a sweet treat, there’s always something delicious waiting for you.`,
    textColor: "text-milky-white",
    contentBGColor: "bg-black-coffee",
  },
  {
    id: 2,
    imgUrl: "src/assets/tabitha-turner-F0Wd4djYvSA-unsplash.jpg",
    alt: "Creamy Latte",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "Crafted for every cup",
    content: `We take pride in every pour. From carefully sourced beans to expertly brewed espresso, each cup is made with precision and passion. Whether you prefer a bold, rich roast or a smooth, creamy latte, our coffee is crafted to bring out the best in every sip.`,
    textColor: "text-black-coffee",
    contentBGColor: "bg-light-caramel",
  },
  {
    id: 3,
    imgUrl: "src/assets/mike-kenneally-TD4DBagg2wE-unsplash.jpg",
    alt: "Coffee Beans",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "Freshly brewed, just for you",
    content:
      "Great coffee starts with great beans. We carefully select and roast each batch to highlight the unique flavors of every origin. Whether it’s a hand-poured single origin or a classic espresso, every drink is made to order, just the way you like it.",
    contentBGColor: "bg-royal-brown",
    textColor: "text-milky-white",
  },
  {
    id: 4,
    imgUrl: "src/assets/conor-brown-sqkXyyj4WdE-unsplash.jpg",
    alt: "Croissant",
    buttonLink: "/",
    buttonText: "Learn more",
    title: "Beyond the basics",
    content:
      "We’re more than just coffee. From flaky croissants to decadent desserts, our pastries are baked fresh to complement every cup. Looking for something savory? Our selection of bites makes the perfect pairing for any moment of the day.",
    contentBGColor: "bg-golden-brown",
    textColor: "text-milky-white",
  },
];

export const rewardsInfo: RewardsInfoType[] = [
  {
    imgUrl: "src/assets/reward/nathan-dumlao-pnmRtTHWqDM-unsplash.jpg",
    value: "20",
    header: "A sip on us",
    description:
      "Enjoy a free hot or iced coffee of your choice, on the house!",
  },
  {
    imgUrl: "src/assets/reward/alex-duong-Ko7oE49VF6Q-unsplash.jpg",
    value: "40",
    header: "A Sweet Pair",
    description: `Enjoy a freshly brewed café latte or classic brewed coffee,
                  paired with a delicious pastry of your choice!`,
  },
  {
    imgUrl: "src/assets/reward/demi-deherrera-L-sm1B4L1Ns-unsplash.jpg",
    value: "60",
    header: "The Perfect Brew",
    description: `Upgrade your coffee experience with a handcrafted specialty
                  drink—any size, any flavor!`,
  },
  {
    imgUrl: "src/assets/reward/jojo-yuen-sharemyfoodd-xG-jonH_fx0-unsplash.jpg",
    value: "95",
    header: "Coffee Lover’s Delight",
    description: `Indulge with a full café experience: a premium drink + pastry
                  + a surprise gift from us!`,
  },
];

export const RewardPerks: RewardPerksType[] = [
  {
    header: "Exciting Rewards",
    description: `Unlock free drinks, food, and more—plus, enjoy a special treat on your birthday
`,
    imgUrl: "src/assets/reward/birthday-cake-svgrepo-com.svg",
    imgAlt: "Birthday Cake",
    dialogHeader: "Exclusive Rewards & more",
    dialogDescription:
      "Every purchase brings you closer to free handcrafted drinks, delicious treats, and exclusive perks. As a KAFY Rewards member, you’ll also receive a special birthday treat, because celebrations should always come with great coffee.",
    dialogImgUrl: "src/assets/reward/stars-shine-svgrepo-com.svg",
    diaImgAlt: "exclusive rewards",
  },
  {
    header: "Seamless Ordering",
    description: `Breeze through checkout with saved favorites and effortless pre-ordering.`,
    imgUrl: "src/assets/reward/credit-card-svgrepo-com.svg",
    imgAlt: "Card",
    dialogHeader: "Fast, Fresh, and Just a Tap/Swipe Away.",
    dialogDescription:
      "With Kafy's order-ahead feature, your favorite drinks and snacks are just a tap away. Save your go-to orders, pay effortlessly, and pick up your items without the wait. Your coffee, your way—ready when you are.",
    dialogImgUrl: "src/assets/reward/credit-card-payment-svgrepo-com.svg",
    diaImgAlt: "exclusive rewards",
  },
  {
    header: "Unlock Rewards Faster",
    description: `Rack up points quicker with bonus challenges, double-point days, and exclusive offers.`,
    imgUrl: "src/assets/reward/iced-coffee-cold-drink-svgrepo-com.svg",
    imgAlt: "food and drink",
    dialogHeader: "Exclusive Promos & more",
    dialogDescription:
      "Earn Kafy points even faster with special promotions like Double Point Days, personalized challenges, and surprise bonuses. Whether it’s an extra boost for your morning coffee or a game to win more rewards, there’s always a way to get free drinks and treats faster.",
    dialogImgUrl: "src/assets/reward/calendar-svgrepo-com.svg",
    diaImgAlt: "exclusive rewards",
  },
];

export const RewardsPerksHeader = "Limitless Perks";
export const RewardsPerksDescription = `Sign up for effortless ordering, exclusive perks, and—yes—free coffee. Because every great sip deserves a great reward.`;

// URLs
export const BASE_URL = "http://localhost:5000";
export const AUTH_SIGN_IN = "/auth/signin";
export const AUTH_SIGN_UP = "/auth/signup";
export const AUTH_SIGN_OUT = "/auth/signout";
export const AUTH_ME = "/auth/me";
export const MENU = "/api/menu";
export const PLACE_ORDER = "/api/order";
export const ORDERS_PAGE = "/api/orders";

// AXIOS ERROR CODE: for axios errors not
export enum AxiosErrorCode {
  NetworkError = "ERR_NETWORK",
}

// EXPECTED ERROR NAMES FROM THE BACKEND - ERROR NAMES USED FOR IDENTIFYING IF THE ERROR IS A ZodError, AuthApiError(Supabase), Error... etc
export enum ApiErrorName {
  ZodError = "ZodError",
  AuthApiError = "AuthApiError",
  UnexpectedError = "Error",
  AuthSessionMissingError = "AuthSessionMissingError",
}

// Custom Error Message
export enum CustomErrorMessage {
  NoInternetConnectionMessage = "You are offline. Check your internet connection.",
}

export const SomethingWenWrongText = {
  header: "Whoops! Something went wrong.",
  description:
    "Please try again later or contact support if the issue persists.",
};

export const ActiveSaleText: { info: string; activeSale: string } = {
  info: "This discount is automatically applied during ongoing promotional periods. No promo/discount code needed. just add items to your cart and enjoy exclusive savings while the sale lasts!",
  activeSale: "No deals at the moment, but stay tuned!",
};

export const PageNotFoundText = {
  header: "Looks like this page doesn't exist!",
  description: "Return to the homepage and continue exploring.",
};

export const FREE_SHIPPING_THRESHOLD = 450;

type MockOrderSummaryValuesType = {
  delivery: number;
  tax: number;
};

export const MockOrderSummaryValues: MockOrderSummaryValuesType = {
  delivery: 45,
  tax: 15,
};

type OrderSummaryTextValuesType = {
  delivery: string;
  tax: string;
  coupon: string;
};

export const OrderSummaryTextValues: OrderSummaryTextValuesType = {
  delivery:
    "This fee covers the estimated cost to deliver your order based on your location and order size. It may vary depending on distance and availability.",
  tax: "This amount includes applicable local taxes based on your billing address and the items in your order.",
  coupon:
    "Enter a valid coupon code to receive discounts or special offers. Only one coupon can be applied per order. Restrictions may apply.",
};

// ? MOCK
export const MockExtendedDescription =
  "Each cup begins with handpicked beans grown in the highlands of the Philippines, locally and ethically sourced to ensure quality and sustainability. Roasted to highlight their natural character, our blends are smooth, aromatic, and layered with subtle notes that make every sip a true celebration of Filipino craftsmanship. Carefully crafted for everyday coffee lovers, Kafy's brews offer a comforting balance of richness, flavor, and warmth — made fresh and served with care, just the way Filipinos like it.";

export type MenuSidebarCategoryItemsType = {
  name: MenuCategoryType;
  active: boolean;
};
export type MenuSidebarCategoriesType = {
  id: number;
  title: string;
  items: MenuSidebarCategoryItemsType[];
};
export const MenuSidebarCategories: MenuSidebarCategoriesType[] = [
  {
    id: 1,
    title: "Drinks",
    items: [
      { name: "hot", active: false },
      {
        name: "cold",
        active: false,
      },
    ],
  },
  {
    id: 2,
    title: "Food",
    items: [
      { name: "pastries", active: false },
      { name: "snacks", active: false },
      { name: "lunch", active: false },
      { name: "treats", active: false },
    ],
  },
];

export type MenuDrinkCategoriesType = {
  id: number;
  category: string;
  img_url: string;
};

export const MenuDrinkCategories: MenuDrinkCategoriesType[] = [
  {
    id: 1,
    category: "Hot Coffee",
    img_url:
      "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    category: "Cold Coffee",
    img_url:
      "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export type MenuFoodCategoriesType = {
  id: number;
  category: string;
  img_url: string;
};

export const MenuFoodCategories: MenuFoodCategoriesType[] = [
  {
    id: 3,
    category: "Pastries",
    img_url:
      "https://images.unsplash.com/photo-1609590981063-d495e2914ce4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    category: "Lunch",
    img_url:
      "https://plus.unsplash.com/premium_photo-1672242676674-f4349cc6470e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    category: "Treats",
    img_url:
      "https://images.unsplash.com/photo-1700649405390-574054e0d190?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
//?

export const MenuItemsMockData: Product[] = [
  {
    id: 1,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Black Coffee",
    description: "Classic hot black coffee.",
    is_available: true,
    category: "hot",
    price: 90,
    image_url:
      "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Latte",
    description: "Espresso with steamed milk.",
    is_available: true,
    category: "hot",
    price: 140,
    image_url:
      "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Caramel Latte",
    description: "A sweet latte with caramel syrup.",
    is_available: true,
    category: "hot",
    price: 170,
    image_url:
      "https://images.unsplash.com/photo-1599398054066-846f28917f38?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam.",
    is_available: true,
    category: "hot",
    price: 150,
    image_url:
      "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Americano",
    description: "Espresso diluted with hot water.",
    is_available: true,
    category: "hot",
    price: 120,
    image_url:
      "https://images.unsplash.com/photo-1532004491497-ba35c367d634?auto=format&fit=crop&q=80&w=1887",
  },
  {
    id: 6,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Espresso",
    description: "A single espresso shot.",
    is_available: true,
    category: "hot",
    price: 100,
    image_url:
      "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=1887",
  },
  {
    id: 7,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Macchiato",
    description: "Espresso with a small amount of foam.",
    is_available: true,
    category: "hot",
    price: 120,
    image_url:
      "https://images.unsplash.com/photo-1557772611-722dabe20327?auto=format&fit=crop&q=80&w=1887",
  },
  {
    id: 8,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Mocha",
    description: "Chocolate espresso drink with steamed milk and foam.",
    is_available: true,
    category: "hot",
    price: 170,
    image_url:
      "https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?auto=format&fit=crop&q=80&w=1887",
  },
  {
    id: 9,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Hot Chocolate",
    description: "Hot chocolate with milk.",
    is_available: true,
    category: "hot",
    price: 140,
    image_url:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=60&w=800",
  },
  {
    id: 10,
    created_at: "2025-07-01T05:31:56.115117+00:00",
    updated_at: null,
    name: "Chai Latte",
    description: "A flavorful chai tea latte.",
    is_available: false,
    category: "hot",
    price: 150,
    image_url:
      "https://images.unsplash.com/photo-1578899952107-9c390f1af1b7?w=900",
  },
];
