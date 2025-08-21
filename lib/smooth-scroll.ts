/**
 * Smooth scroll utility that's more performant than CSS scroll-behavior
 */
export function initSmoothScroll() {
  // Only run on client
  if (typeof window === "undefined") return

  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  // Add click event listeners
  anchorLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll)
  })

  // Smooth scroll function
  function smoothScroll(e: Event) {
    e.preventDefault()

    const link = e.currentTarget as HTMLAnchorElement
    const targetId = link.getAttribute("href")

    if (!targetId || targetId === "#") return

    const targetElement = document.querySelector(targetId)

    if (!targetElement) return

    // Get the target's position
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition

    // Adjust this value for faster/slower scrolling
    const duration = Math.min(800, Math.abs(distance / 2))

    let startTime: number | null = null

    // Animation function
    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // Easing function - easeInOutQuad
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

      window.scrollTo(0, startPosition + distance * ease(progress))

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    // Start animation
    requestAnimationFrame(animation)
  }

  // Also handle hash changes from browser navigation
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash
    if (hash) {
      const targetElement = document.querySelector(hash)
      if (targetElement) {
        // Add a small delay to ensure the browser has finished any native scrolling
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 100)
      }
    }
  })
}
