"use client"

import Head from "next/head"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export default function MetaTags({
  title = "Usman Arshad - Full-Stack Developer & IT Student",
  description = "Full-stack developer specializing in web and mobile applications with expertise in Firebase, React, and Flutter. Based in Islamabad, Pakistan.",
  keywords = "Full-Stack Developer, React Developer, Next.js, Firebase, Flutter, Web Development, Mobile Development, Pakistan, Islamabad, Bahria University",
  image = "/og-image.png",
  url = "https://usman-portfolio.vercel.app",
  type = "website"
}: MetaTagsProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Usman Arshad" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Usman Arshad Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@usmaniii" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Usman Portfolio" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data / Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Usman Arshad",
            "jobTitle": "Full-Stack Developer",
            "description": description,
            "url": url,
            "image": image,
            "sameAs": [
              "https://github.com/Dark-Clover",
              "https://www.linkedin.com/in/usman-arshad-647235247",
              "https://www.instagram.com/usmaniii"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Triadic Marketing Media"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": "Bahria University"
            },
            "knowsAbout": [
              "React", "Next.js", "TypeScript", "Firebase", "Flutter", 
              "Web Development", "Mobile Development", "Full-Stack Development"
            ]
          })
        }}
      />
    </Head>
  )
}
