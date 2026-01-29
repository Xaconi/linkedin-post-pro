/**
 * In-memory rate limit store
 *
 * Note: This works per-instance in serverless environments.
 * For production with multiple instances, consider migrating to Redis.
 */

interface RateLimitEntry {
    timestamp: number
    count: number
}

class InMemoryStore {
    private store: Map<string, RateLimitEntry> = new Map()
    private cleanupInterval: ReturnType<typeof setInterval> | null = null

    constructor() {
        // Clean up expired entries every minute
        if (typeof setInterval !== 'undefined') {
            this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
        }
    }

    /**
     * Get the timestamp of the last request for a key
     */
    get(key: string): number | null {
        const entry = this.store.get(key)
        return entry?.timestamp ?? null
    }

    /**
     * Set the timestamp for a key
     */
    set(key: string, timestamp: number): void {
        this.store.set(key, { timestamp, count: 1 })
    }

    /**
     * Check if enough time has passed since last request
     * Returns remaining wait time in seconds, or 0 if allowed
     */
    check(key: string, windowMs: number): number {
        const entry = this.store.get(key)

        if (!entry) {
            return 0
        }

        const now = Date.now()
        const elapsed = now - entry.timestamp
        const remaining = windowMs - elapsed

        if (remaining <= 0) {
            return 0
        }

        return Math.ceil(remaining / 1000)
    }

    /**
     * Record a request for a key
     */
    record(key: string): void {
        this.set(key, Date.now())
    }

    /**
     * Clean up expired entries (older than 1 minute)
     */
    private cleanup(): void {
        const now = Date.now()
        const maxAge = 60000 // 1 minute

        for (const [key, entry] of this.store.entries()) {
            if (now - entry.timestamp > maxAge) {
                this.store.delete(key)
            }
        }
    }

    /**
     * Clear all entries (for testing)
     */
    clear(): void {
        this.store.clear()
    }

    /**
     * Stop cleanup interval (for testing)
     */
    destroy(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval)
            this.cleanupInterval = null
        }
    }
}

// Singleton instance
export const rateLimitStore = new InMemoryStore()