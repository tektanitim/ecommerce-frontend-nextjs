// src/data/blogData.ts

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string; // Format: "15 Dec 2025"
  imageSrc: string;
  shortDescription: string;
  fullContent: string; // HTML veya Markdown olabilir, şimdilik düz metin
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-post-1',
    slug: 'cuticle-pushers-trimmers-guide',
    title: 'Cuticle Pushers & Trimmers Guide',
    author: 'Admin',
    date: '15 Dec 2025',
    imageSrc: '/images/blog/blog-1.jpg', // public/images/blog/blog-1.jpg
    shortDescription: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
    fullContent: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      <h3>The Importance of Nail Care</h3>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
      <ul>
        <li>Regular cleaning and moisturizing</li>
        <li>Proper trimming techniques</li>
        <li>Using quality tools</li>
      </ul>
      <h4>Choosing the Right Tools</h4>
      <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
      <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
    `,
    category: 'Beauty',
    tags: ['Nail Care', 'Beauty Tips', 'Manicure']
  },
  {
    id: 'blog-post-2',
    slug: 'fashion-trends-of-2025',
    title: 'Fashion Trends of 2025: What to Expect',
    author: 'Admin',
    date: '15 Dec 2025',
    imageSrc: '/images/blog/blog-2.jpg', // public/images/blog/blog-2.jpg
    shortDescription: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    fullContent: `
      <p>The year 2025 is bringing a fresh wave of fashion innovations, blending sustainability with bold new designs. Expect a resurgence of vintage styles with a modern twist, alongside advancements in eco-friendly materials.</p>
      <h3>Sustainable Fashion on the Rise</h3>
      <p>Consumers are increasingly demanding transparency and ethical practices from brands. This year, we'll see more companies investing in recycled fabrics, upcycling initiatives, and fair trade production.</p>
      <h4>Key Trends:</h4>
      <ul>
        <li>Oversized blazers and tailored separates</li>
        <li>Vibrant color palettes, especially neon accents</li>
        <li>Comfort-first footwear, including chunky sneakers and embellished flats</li>
        <li>Gender-neutral clothing lines becoming more mainstream</li>
      </ul>
      <p>Don't be afraid to experiment with textures and layers to create unique ensembles that express your personal style.</p>
    `,
    category: 'Fashion',
    tags: ['Trends', 'Style', 'Sustainability', '2025']
  },
  {
    id: 'blog-post-3',
    slug: 'summer-outfit-ideas',
    title: 'Summer Outfit Ideas for a Stylish Season',
    author: 'Admin',
    date: '15 Dec 2025',
    imageSrc: '/images/blog/blog-3.jpg', // public/images/blog/blog-3.jpg
    shortDescription: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\'.',
    fullContent: `
      <p>Summer is here, and it's time to refresh your wardrobe with light, breathable, and stylish outfits. Whether you're heading to the beach, a city stroll, or a casual gathering, we've got you covered.</p>
      <h3>Casual Chic for Everyday</h3>
      <p>Think linen dresses, wide-leg trousers, and simple yet elegant tops. Accessories like straw hats, oversized sunglasses, and comfortable sandals will complete your look.</p>
      <h4>Beach Ready:</h4>
      <ul>
        <li>Flowy cover-ups</li>
        <li>Bold swimwear designs</li>
        <li>Water-resistant tote bags</li>
      </ul>
      <p>For evenings, a light maxi dress or tailored shorts with a silk camisole can be perfect. Don't forget your SPF!</p>
    `,
    category: 'Fashion',
    tags: ['Summer', 'Outfits', 'Style Guide']
  },
  {
    id: 'blog-post-4',
    slug: 'denim-jacket-styling',
    title: 'How to Style Your Denim Jacket: A Timeless Classic',
    author: 'Admin',
    date: '15 Dec 2025',
    imageSrc: '/images/blog/blog-4.jpg', // public/images/blog/blog-4.jpg
    shortDescription: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.',
    fullContent: `
      <p>The denim jacket is a true wardrobe staple, versatile enough to be worn in almost any season. Here's how you can elevate your denim jacket game.</p>
      <h3>Layering for All Seasons</h3>
      <p>In spring and autumn, wear it over a hoodie or a chunky knit. In summer, it's perfect over a light dress or a t-shirt. For winter, it can be a stylish layer under a heavier coat.</p>
      <h4>Outfit Ideas:</h4>
      <ul>
        <li>Denim jacket with a floral dress and sneakers</li>
        <li>Layered over a striped tee with black jeans</li>
        <li>Paired with tailored trousers for a smart-casual look</li>
        <li>Accessorize with scarves and beanies for colder days</li>
      </ul>
      <p>Experiment with different washes and fits to find the perfect denim jacket that suits your personal style.</p>
    `,
    category: 'Fashion',
    tags: ['Denim', 'Jacket', 'Style', 'Outfit Ideas']
  },
  {
    id: 'blog-post-5',
    slug: 'winter-fashion-essentials',
    title: 'Winter Fashion Essentials: Stay Warm and Stylish',
    author: 'Admin',
    date: '15 Dec 2025',
    imageSrc: '/images/blog/blog-5.jpg', // public/images/blog/blog-5.jpg
    shortDescription: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    fullContent: `
      <p>As temperatures drop, it's crucial to update your wardrobe with pieces that offer both warmth and style. Here are the must-have items for a chic winter.</p>
      <h3>Coats and Jackets</h3>
      <p>Invest in a versatile coat that can take you from day to night. Wool coats, puffer jackets, and trench coats are excellent choices.</p>
      <h4>Essential Accessories:</h4>
      <ul>
        <li>Cashmere scarves and beanies</li>
        <li>Leather gloves</li>
        <li>Warm boots (ankle boots, knee-high boots)</li>
        <li>Layering pieces like thermal tops and turtlenecks</li>
      </ul>
      <p>Don't shy away from rich, deep colors like burgundy, forest green, and navy to add a touch of sophistication to your winter looks.</p>
    `,
    category: 'Fashion',
    tags: ['Winter', 'Essentials', 'Style', 'Warmth']
  },
  {
    id: 'blog-post-6',
    slug: 'mens-grooming-tips',
    title: 'Men\'s Grooming Tips: Look Your Best Everyday',
    author: 'Admin',
    date: '15 Dec 2025',
    imageSrc: '/images/blog/blog-6.jpg', // public/images/blog/blog-6.jpg
    shortDescription: 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    fullContent: `
      <p>Grooming is an essential part of daily life for every man. A good grooming routine can boost your confidence and improve your overall appearance. Here are some simple yet effective tips.</p>
      <h3>Skincare Basics</h3>
      <p>Start with a good cleanser, follow with a moisturizer, and don't forget SPF. Exfoliate a few times a week to keep your skin fresh.</p>
      <h4>Hair Care:</h4>
      <ul>
        <li>Choose a shampoo and conditioner suited for your hair type.</li>
        <li>Regular trims keep your hair healthy and styled.</li>
        <li>Experiment with different products like pomades or gels to find your preferred hold.</li>
      </ul>
      <p>Remember, consistency is key. A few minutes each day can make a big difference.</p>
    `,
    category: 'Men\'s Fashion',
    tags: ['Grooming', 'Men\'s Style', 'Skincare', 'Hair Care']
  }
];