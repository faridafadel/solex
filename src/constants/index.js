import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3,bigShoe4, customer1, customer2, shoe4, shoe5, shoe6, shoe7, shoe9, shoe10, shoe11, shoe12, shoe13, shoe14, shoe15, shoe16, shoe17, shoe18, shoe19, shoe20, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3,thumbnailShoe4 } from "../assets/images";

export const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#about-us", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/cart", label: "Cart" },
    { href: "/#contact-us", label: "Contact Us" },
    { href: "/signin", label: "Sign-in/Register" },
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
    {
        thumbnail: thumbnailShoe4,
        bigShoe: bigShoe4,
    },
];

export const statistics = [
    { value: '10k+', label: 'Brands' },
    { value: '800+', label: 'Shops' },
    { value: '500k+', label: 'Customers' },
];

export const products = [
    {
        imgURL: shoe4,
        name: "Solex Fusion X",
        price: "EGP 20,000.20",
        priceValue: 20000.2,
        category: "Running",
        popular: true,
        rating: 4.8,
        reviewsCount: 321,
        description: "Built for daily miles with lightweight cushioning and responsive bounce.",
    },
    {
        imgURL: shoe5,
        name: "Solex Ultra Boost",
        price: "EGP 21,000.20",
        priceValue: 21000.2,
        category: "Training",
        popular: true,
        rating: 4.7,
        reviewsCount: 264,
        description: "Stable support and smooth transitions for gym and high-intensity sessions.",
    },
    {
        imgURL: shoe6,
        name: "Volt Runner Pro",
        price: "EGP 22,000.20",
        priceValue: 22000.2,
        category: "Running",
        popular: true,
        rating: 4.9,
        reviewsCount: 412,
        description: "Energy-return foam and breathable mesh for consistent performance.",
    },
    {
        imgURL: shoe7,
        name: "Lunar Blaze Elite",
        price: "EGP 23,000.20",
        priceValue: 23000.2,
        category: "Basketball",
        popular: true,
        rating: 4.6,
        reviewsCount: 198,
        description: "Explosive court grip with ankle support for quick directional changes.",
    },
    {
        imgURL: shoe9,
        name: "Street Flex1",
        price: "EGP 17,500.00",
        priceValue: 17500,
        category: "Lifestyle",
        popular: false,
        rating: 4.3,
        reviewsCount: 96,
    },
    {
        imgURL: shoe10,
        name: "Turo Sprint Pro",
        price: "EGP 25,300.00",
        priceValue: 25300,
        category: "Running",
        popular: false,
        rating: 4.5,
        reviewsCount: 174,
    },
    {
        imgURL: shoe11,
        name: "Court Master Mid",
        price: "EGP 19,900.00",
        priceValue: 19900,
        category: "Basketball",
        popular: false,
        rating: 4.4,
        reviewsCount: 132,
    },
    {
        imgURL: shoe12,
        name: "Daily Move Lite",
        price: "EGP 16,800.00",
        priceValue: 16800,
        category: "Lifestyle",
        popular: false,
        rating: 4.2,
        reviewsCount: 88,
    },
    {
        imgURL: shoe13,
        name: "Stride X Trainer",
        price: "EGP 24,400.00",
        priceValue: 24400,
        category: "Training",
        popular: false,
        rating: 4.6,
        reviewsCount: 156,
    },
    {
        imgURL: shoe14,
        name: "Peak Trail Grip",
        price: "EGP 27,200.00",
        priceValue: 27200,
        category: "Running",
        popular: false,
        rating: 4.7,
        reviewsCount: 201,
    },
    {
        imgURL: shoe15,
        name: "Solex Force 1",
        price: "EGP 26,100.00",
        priceValue: 26100,
        category: "Lifestyle",
        popular: true,
        rating: 4.9,
        reviewsCount: 455,
        description: "Iconic street silhouette with modern comfort upgrades for all-day wear.",
    },
    {
        imgURL: shoe16,
        name: "Solex Air Max 1",
        price: "EGP 24,900.00",
        priceValue: 24900,
        category: "Running",
        popular: true,
        rating: 4.8,
        reviewsCount: 389,
        description: "Classic low-profile runner with durable traction and smooth ride.",
    },
    {
        imgURL: shoe17,
        name: "Solex Jordan1",
        price: "EGP 28,500.00",
        priceValue: 28500,
        category: "Basketball",
        popular: true,
        rating: 5.0,
        reviewsCount: 502,
        description: "Premium build and heritage design inspired by elite basketball performance.",
    },
    {
        imgURL: shoe18,
        name: "Solex Force 2",
        price: "EGP 23,700.00",
        priceValue: 23700,
        category: "Lifestyle",
        popular: false,
        rating: 4.4,
        reviewsCount: 145,
    },
    {
        imgURL: shoe19,
        name: "Solex Waffle Racer",
        price: "EGP 21,600.00",
        priceValue: 21600,
        category: "Running",
        popular: false,
        rating: 4.5,
        reviewsCount: 167,
    },
    {
        imgURL: shoe20,
        name: "Solex Cortex",
        price: "EGP 20,300.00",
        priceValue: 20300,
        category: "Lifestyle",
        popular: false,
        rating: 4.6,
        reviewsCount: 210,
    },
];

products.forEach((product) => {
    const isWomen = product.category === "Lifestyle" || product.category === "Running";
    product.availability = product.availability || "In Stock";
    product.gender = product.gender || (isWomen ? "Women" : "Men");
    const colorMap = {
        Running: "Blue",
        Training: "Red",
        Basketball: "Green",
        Lifestyle: "Black",
    };
    product.color = product.color || colorMap[product.category] || "Gray";
    product.sizes = product.sizes || ["36", "37", "38", "39", "40", "41"];
    product.type = product.type || "Shoes";
    product.vendor = product.vendor || "Solex";
    product.sku = product.sku || `SLX-${product.name.replace(/\s+/g, "-").toUpperCase()}`;
});

export const services = [
        {
            imgURL: truckFast,
            label: "Quick Delivery",
            subtext: "Enjoy seamless shopping with our fast and reliable delivery service."
        },
        {
            imgURL: shieldTick,
            label: "Payment Security",
            subtext: "Experience worry-free transactions with our secure payment options."
        },
        {
            imgURL: support,
            label: "Dedicated Support",
            subtext: "Our dedicated team is here to assist you every step of the way."
        },
    ];
    
    export const reviews = [
        {
            imgURL: customer1,
            customerName: 'John Smith',
            rating: 4.5,
            feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
        },
        {
            imgURL: customer2,
            customerName: 'Jane Doe',
            rating: 4.5,
            feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
        }
    ];
    

export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Solex Force 1", link: "/products?product=Solex%20Force%201" },
            { name: "Solex Air Max 1", link: "/products?product=Solex%20Air%20Max%201" },
            { name: "Solex Jordan1", link: "/products?product=Solex%20Jordan1" },
            { name: "Solex Force 2", link: "/products?product=Solex%20Force%202" },
            { name: "Solex Waffle Racer", link: "/products?product=Solex%20Waffle%20Racer" },
            { name: "Solex Cortex", link: "/products?product=Solex%20Cortex" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/about" },
            { name: "FAQs", link: "/faqs" },
            { name: "How it works", link: "/how-it-works" },
            { name: "Privacy policy", link: "/privacy-policy" },
            { name: "Payment policy", link: "/payment-policy" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@solex.com", link: "mailto:customer@solex.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];