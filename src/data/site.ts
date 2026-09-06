/**
 * Global site configuration — edit these values to personalize the portfolio.
 * Everything here is safe to change without touching component code.
 */

export const site = {
  name: "Waseem Kohli",
  role: "Flutter Developer & AI Builder",
  shortTagline: "Flutter Developer • AI Builder • Creative Technologist",
  headline: "Building digital experiences with code & AI",
  location: "Available worldwide — remote",
  email: "waseemkohliw@gmail.com",
  /**
   * Profile photo. Drop your image at `public/profile.jpg` (or change the path).
   * If the file is missing, the UI gracefully shows a stylized monogram instead —
   * nothing breaks, so you can add the photo whenever you like.
   */
  photo: "/profile.jpg",
  // Used for <title>, meta description and Open Graph.
  seo: {
    title: "Waseem Kohli — Flutter Developer & AI Builder",
    description:
      "Waseem Kohli is a Flutter developer, AI builder and creative technologist crafting premium mobile apps, AI-powered products and interactive web experiences.",
    // Change to your deployed domain for correct canonical + OG URLs.
    url: "https://portfolio-eight-bice-82.vercel.app",
    ogImage: "/og.png",
    keywords: [
      "Waseem Kohli",
      "Flutter Developer",
      "AI Builder",
      "Creative Technologist",
      "Dart",
      "Firebase",
      "React",
      "Next.js",
      "Portfolio",
    ],
  },
  intro:
    "I design and build fast, thoughtful digital products — Flutter apps, AI-powered tools and interactive web experiences. I care about the details: motion that feels natural, interfaces that stay out of the way, and code that's a pleasure to maintain.",
} as const;

