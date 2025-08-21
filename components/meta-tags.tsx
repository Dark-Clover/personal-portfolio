import Head from "next/head"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
}

export default function MetaTags({
  title = "Usman Arshad | Developer Portfolio",
  description = "Full-stack developer specializing in web and mobile applications with expertise in Firebase, React, and Flutter.",
  keywords = "developer, web development, mobile apps, firebase, react, flutter, portfolio",
  ogImage = "/opengraph-image.png",
  ogUrl = "https://usmanarshad.com",
}: MetaTagsProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Head>
  )
}
