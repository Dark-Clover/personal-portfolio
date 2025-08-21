import { initSmoothScroll } from "./smooth-scroll"

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations() {
  // Only run on client
  if (typeof window === "undefined") return

  // Initialize smooth scrolling
  initSmoothScroll()

  // Add resource hints
  addResourceHints()

  // Set up performance monitoring
  setupPerformanceMonitoring()

  // Set up image lazy loading
  setupImageLazyLoading()

  // Optimize third-party scripts
  optimizeThirdPartyScripts()

  // Set up connection preloading
  preloadConnections()
}

/**
 * Add resource hints for better performance
 */
function addResourceHints() {
  // Preconnect to critical domains
  const preconnectDomains = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"]

  preconnectDomains.forEach((domain) => {
    const link = document.createElement("link")
    link.rel = "preconnect"
    link.href = domain
    link.crossOrigin = "anonymous"
    document.head.appendChild(link)
  })

  // Preload critical assets
  const criticalAssets = [{ path: "/profile-image.png", type: "image" }]

  criticalAssets.forEach((asset) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = asset.path
    link.as = asset.type
    document.head.appendChild(link)
  })
}

/**
 * Set up performance monitoring
 */
function setupPerformanceMonitoring() {
  if (process.env.NODE_ENV !== "production") return

  // Monitor long tasks
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log long tasks (tasks that block the main thread for more than 50ms)
          if (entry.duration > 50) {
            console.warn("Long task detected:", entry)
          }
        }
      })

      observer.observe({ entryTypes: ["longtask"] })
    } catch (e) {
      console.error("PerformanceObserver for longtask not supported", e)
    }
  }

  // Monitor layout shifts
  if ("PerformanceObserver" in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log significant layout shifts
          if (entry.value > 0.1) {
            console.warn("Significant layout shift detected:", entry)
          }
        }
      })

      observer.observe({ entryTypes: ["layout-shift"] })
    } catch (e) {
      console.error("PerformanceObserver for layout-shift not supported", e)
    }
  }
}

/**
 * Set up image lazy loading
 */
function setupImageLazyLoading() {
  // Use native lazy loading where available
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img:not([loading])")
    images.forEach((img) => {
      img.loading = "lazy"
    })
  }

  // Use IntersectionObserver as fallback
  else if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]")

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ""
          img.removeAttribute("data-src")
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

/**
 * Optimize third-party scripts
 */
function optimizeThirdPartyScripts() {
  // Delay non-critical third-party scripts
  window.addEventListener("load", () => {
    setTimeout(() => {
      // Load analytics or other non-critical scripts here
      // This ensures they don't compete with critical resources
    }, 2000)
  })
}

/**
 * Preload connections to origins that will be used
 */
function preloadConnections() {
  // DNS prefetch for external resources
  const dnsPrefetchDomains = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"]

  dnsPrefetchDomains.forEach((domain) => {
    const link = document.createElement("link")
    link.rel = "dns-prefetch"
    link.href = domain
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations when imported
if (typeof window !== "undefined") {
  // Wait for the document to be fully loaded
  if (document.readyState === "complete") {
    initPerformanceOptimizations()
  } else {
    window.addEventListener("load", initPerformanceOptimizations)
  }
}
