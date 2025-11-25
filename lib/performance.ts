// lib/performance.ts
// Performance optimization utilities

/**
 * Debounce search queries to reduce API calls
 */
export function createSearchDebounce(delay: number = 300) {
  let timeoutId: NodeJS.Timeout;

  return (callback: () => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}

/**
 * Batch API requests to reduce network overhead
 */
export async function batchFetch<T>(
  requests: Array<() => Promise<T>>,
  batchSize: number = 5
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map((req) => req()));
    results.push(...batchResults);
  }

  return results;
}

/**
 * Memoize function results based on arguments
 * Useful for expensive computations in render
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

/**
 * Intersect Observer helper for lazy rendering
 * Useful for virtualization or lazy loading
 */
export function observeElement(
  element: Element,
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(element);

  return () => observer.disconnect();
}

/**
 * Request idle callback with fallback
 * Useful for non-urgent tasks
 */
export function runWhenIdle(callback: () => void) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback, { timeout: 2000 });
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * Preload resources to improve perceived performance
 */
export function preloadResource(href: string, as: string) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as as any;
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Calculate optimal page size based on viewport
 */
export function getOptimalPageSize(defaultSize: number = 20): number {
  if (typeof window === "undefined") return defaultSize;

  const height = window.innerHeight;
  const itemHeight = 80; // Approximate height of a list item
  const viewportItems = Math.floor(height / itemHeight);

  return Math.max(defaultSize, viewportItems * 2);
}
