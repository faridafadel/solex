import { connectDatabase } from "../config/database.js";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import { Review } from "../models/Review.js";
import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";
import { Contact } from "../models/Contact.js";

const products = [
  { name: "Solex Fusion X", slug: "solex-fusion-x", sku: "SLX-SOLEX-FUSION-X", category: "Running", description: "Built for daily miles with lightweight cushioning and responsive bounce.", price: 20000.2, color: "Blue", gender: "Men", sizes: ["39", "40", "41", "42", "43"], popular: true },
  { name: "Solex Ultra Boost", slug: "solex-ultra-boost", sku: "SLX-SOLEX-ULTRA-BOOST", category: "Training", description: "Stable support and smooth transitions for gym and high-intensity sessions.", price: 21000.2, color: "Black", gender: "Women", sizes: ["37", "38", "39", "40", "41"], popular: true },
  { name: "Solex Force 1", slug: "solex-force-1", sku: "SLX-SOLEX-FORCE-1", category: "Lifestyle", description: "Iconic street silhouette with modern comfort upgrades for all-day wear.", price: 26100, color: "Red", gender: "Men", sizes: ["40", "41", "42", "43", "44"], popular: true },
  { name: "Solex Jordan1", slug: "solex-jordan1", sku: "SLX-SOLEX-JORDAN1", category: "Basketball", description: "Premium build and heritage design inspired by elite basketball performance.", price: 28500, color: "Green", gender: "Women", sizes: ["38", "39", "40", "41", "42"], popular: true },
  { name: "Court Master Mid", slug: "court-master-mid", sku: "SLX-COURT-MASTER-MID", category: "Basketball", description: "High-performance basketball shoe with responsive cushioning and court traction.", price: 19900, color: "Red", gender: "Women", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Peak Trail Grip", slug: "peak-trail-grip", sku: "SLX-PEAK-TRAIL-GRIP", category: "Running", description: "Built for daily miles with lightweight cushioning and responsive bounce.", price: 27200, color: "Green", gender: "Women", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Solex Air Max 1", slug: "solex-air-max-1", sku: "SLX-SOLEX-AIR-MAX-1", category: "Running", description: "Classic low-profile runner with durable traction and smooth ride.", price: 24900, color: "Blue", gender: "Men", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Solex Force 2", slug: "solex-force-2", sku: "SLX-SOLEX-FORCE-2", category: "Lifestyle", description: "Stylish everyday sneaker that blends modern comfort with urban aesthetics.", price: 23700, color: "Green", gender: "Women", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Solex Waffle Racer", slug: "solex-waffle-racer", sku: "SLX-SOLEX-WAFFLE-RACER", category: "Running", description: "Built for daily miles with lightweight cushioning and responsive bounce.", price: 21600, color: "Red", gender: "Women", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Solex Cortex", slug: "solex-cortex", sku: "SLX-SOLEX-CORTEX", category: "Lifestyle", description: "Comfortable everyday sneakers for casual wear and all-day use.", price: 20300, color: "Blue", gender: "Men", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Daily Move Lite", slug: "daily-move-lite", sku: "SLX-DAILY-MOVE-LITE", category: "Lifestyle", description: "Stylish everyday sneaker that pairs effortlessly with any casual outfit.", price: 16800, color: "Red", gender: "Women", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Stride X Trainer", slug: "stride-x-trainer", sku: "SLX-STRIDE-X-TRAINER", category: "Training", description: "Versatile training shoe with flexible support for all workout routines.", price: 24400, color: "Red", gender: "Women", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Volt Runner Pro", slug: "volt-runner-pro", sku: "SLX-VOLT-RUNNER-PRO", category: "Running", description: "Energy-return foam and breathable mesh for consistent performance.", price: 22000.2, color: "Red", gender: "Women", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Street Flex1", slug: "street-flex1", sku: "SLX-STREET-FLEX1", category: "Lifestyle", description: "Comfortable everyday sneakers for casual wear and all-day use.", price: 17500, color: "Blue", gender: "Men", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Lunar Blaze Elite", slug: "lunar-blaze-elite", sku: "SLX-LUNAR-BLAZE-ELITE", category: "Basketball", description: "Explosive court grip with ankle support for quick directional changes.", price: 23000.2, color: "Blue", gender: "Men", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
  { name: "Turo Sprint Pro", slug: "turo-sprint-pro", sku: "SLX-TURO-SPRINT-PRO", category: "Running", description: "Built for daily miles with lightweight cushioning and responsive bounce.", price: 25300, color: "Black", gender: "Men", sizes: ["36", "37", "38", "39", "40", "41"], popular: false },
];

const seedAll = async () => {
  try {
    await connectDatabase(env.mongoUri);

    // Clear all collections
    await Promise.all([
      User.deleteMany(),
      Product.deleteMany(),
      Review.deleteMany(),
      Order.deleteMany(),
      Cart.deleteMany(),
      Contact.deleteMany(),
    ]);
    console.log("Cleared all collections.");

    // --- Seed products ---
    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products.`);

    // --- Create users (using create() so bcrypt hooks run) ---
    const ahmed = await User.create({ fullName: "Ahmed Hassan", email: "ahmed@solex.com", password: "customer123", phone: "+201001234567" });
    const mariam = await User.create({ fullName: "Mariam Youssef", email: "mariam@solex.com", password: "customer123", phone: "+201098765432" });
    const karim = await User.create({ fullName: "Karim Adel", email: "karim@solex.com", password: "customer123", phone: "+201155443322" });
    const nour = await User.create({ fullName: "Nour El-Din", email: "nour@solex.com", password: "customer123", phone: "+201200001111" });
    const sara = await User.create({ fullName: "Sara Mostafa", email: "sara@solex.com", password: "customer123", phone: "+201200002222" });
    const omar = await User.create({ fullName: "Omar Sherif", email: "omar@solex.com", password: "customer123", phone: "+201200003333" });
    const lina = await User.create({ fullName: "Lina Khaled", email: "lina@solex.com", password: "customer123", phone: "+201200004444" });
    const youssef = await User.create({ fullName: "Youssef Samir", email: "youssef@solex.com", password: "customer123", phone: "+201200005555" });
    const hana = await User.create({ fullName: "Hana Ibrahim", email: "hana@solex.com", password: "customer123", phone: "+201200006666" });
    const ali = await User.create({ fullName: "Ali Tarek", email: "ali@solex.com", password: "customer123", phone: "+201200007777" });
    const users = [ahmed, mariam, karim, nour, sara, omar, lina, youssef, hana, ali];
    console.log("Created 10 users.");

    // --- Create reviews ---
    await Review.insertMany([
      { product: createdProducts[0]._id, user: ahmed._id, rating: 5, title: "Best running shoes ever!", comment: "Extremely comfortable for my daily morning runs. The cushioning is perfect." },
      { product: createdProducts[0]._id, user: mariam._id, rating: 4, title: "Great value for money", comment: "Lightweight and breathable. Perfect for hot weather." },
      { product: createdProducts[2]._id, user: karim._id, rating: 5, title: "Iconic style", comment: "These look amazing with any outfit. Gets compliments everywhere I go." },
      { product: createdProducts[3]._id, user: ahmed._id, rating: 4, title: "Solid basketball shoe", comment: "Good ankle support and great traction on the court." },
      { product: createdProducts[1]._id, user: mariam._id, rating: 5, title: "Training essential", comment: "Perfect for my gym sessions. Stable and supportive during squats." },
      { product: createdProducts[6]._id, user: karim._id, rating: 3, title: "Decent but runs small", comment: "Good quality but I should have sized up. Order one size larger." },
      { product: createdProducts[4]._id, user: mariam._id, rating: 5, title: "Love the color!", comment: "The red is even better in person. Very comfortable for long days." },
    ]);
    console.log("Created 7 reviews.");

    // --- Create carts ---
    await Cart.insertMany([
      {
        user: ahmed._id,
        items: [
          { product: createdProducts[2]._id, quantity: 2, size: "42" },
          { product: createdProducts[4]._id, quantity: 1, size: "38" },
          { product: createdProducts[6]._id, quantity: 1, size: "40" },
        ],
      },
      {
        user: mariam._id,
        items: [
          { product: createdProducts[1]._id, quantity: 1, size: "39" },
          { product: createdProducts[8]._id, quantity: 2, size: "37" },
        ],
      },
    ]);
    console.log("Created 2 carts.");

    // --- Create orders ---
    await Order.insertMany([
      {
        user: ahmed._id,
        items: [
          { product: createdProducts[2]._id, name: createdProducts[2].name, price: createdProducts[2].price, quantity: 1, size: "42" },
          { product: createdProducts[4]._id, name: createdProducts[4].name, price: createdProducts[4].price, quantity: 2, size: "38" },
        ],
        shippingAddress: { fullName: "Ahmed Hassan", phone: "+201001234567", street: "15 Tahrir Street, Downtown", city: "Cairo" },
        totalAmount: createdProducts[2].price + createdProducts[4].price * 2,
        status: "delivered", paymentMethod: "cash",
      },
      {
        user: ahmed._id,
        items: [
          { product: createdProducts[0]._id, name: createdProducts[0].name, price: createdProducts[0].price, quantity: 1, size: "41" },
        ],
        shippingAddress: { fullName: "Ahmed Hassan", phone: "+201001234567", street: "42 New Maadi, Building 7", city: "Cairo" },
        totalAmount: createdProducts[0].price,
        status: "shipped", paymentMethod: "cash",
      },
      {
        user: mariam._id,
        items: [
          { product: createdProducts[1]._id, name: createdProducts[1].name, price: createdProducts[1].price, quantity: 1, size: "39" },
        ],
        shippingAddress: { fullName: "Mariam Youssef", phone: "+201098765432", street: "8 Mohamed Mahmoud Street, Mohandessin", city: "Giza" },
        totalAmount: createdProducts[1].price,
        status: "delivered", paymentMethod: "cash",
      },
      {
        user: karim._id,
        items: [
          { product: createdProducts[3]._id, name: createdProducts[3].name, price: createdProducts[3].price, quantity: 1, size: "42" },
          { product: createdProducts[14]._id, name: createdProducts[14].name, price: createdProducts[14].price, quantity: 1, size: "43" },
        ],
        shippingAddress: { fullName: "Karim Adel", phone: "+201155443322", street: "25 El Horreya Road, Smouha", city: "Alexandria" },
        totalAmount: createdProducts[3].price + createdProducts[14].price,
        status: "pending", paymentMethod: "cash",
      },
    ]);
    console.log("Created 4 orders.");

    // --- Create contact messages ---
    await Contact.insertMany([
      { name: "Sarah Mohamed", email: "sarah@example.com", subject: "Size inquiry", message: "Hi, I'm interested in the Solex Fusion X. Do you have size 44 in stock?" },
      { name: "Omar Ali", email: "omar@example.com", subject: "Return policy", message: "What is your return policy? I ordered the wrong size." },
      { name: "Nour El-Din", email: "nour@example.com", subject: "Shipping question", message: "How long does shipping to Alexandria usually take?" },
    ]);
    console.log("Created 3 contact messages.");

    console.log("\n--- Seed complete! ---");
    console.log("Login emails:");
    console.log("  ahmed@solex.com / customer123");
    console.log("  mariam@solex.com / customer123");
    console.log("  karim@solex.com / customer123");
    console.log("  nour@solex.com / customer123");
    console.log("  sara@solex.com / customer123");
    console.log("  omar@solex.com / customer123");
    console.log("  lina@solex.com / customer123");
    console.log("  youssef@solex.com / customer123");
    console.log("  hana@solex.com / customer123");
    console.log("  ali@solex.com / customer123");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database.", error);
    process.exit(1);
  }
};

seedAll();
