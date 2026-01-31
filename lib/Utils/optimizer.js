"use strict";
/**
 * DECAGRAMTON OPTIMIZER
 * Smart Humanize & Anti-Delay System
 * 
 * @version 3.6.0
 * @author ZetaGo-Aurum
 */

const crypto = require("crypto");

/**
 * Human-like delay generator
 * Adds micro-jitter to avoid detection as automation
 * @param {number} baseMs - Base delay in milliseconds
 * @returns {Promise<void>}
 */
const humanDelay = async (baseMs = 100) => {
    // Add 10-30% random jitter to base delay
    const jitter = Math.floor(baseMs * (0.1 + Math.random() * 0.2));
    const actualDelay = baseMs + jitter;
    return new Promise(resolve => setTimeout(resolve, actualDelay));
};

/**
 * Smart Message Queue
 * Prevents burst sending that triggers spam detection
 */
class MessageQueue {
    constructor(minIntervalMs = 500) {
        this.queue = [];
        this.processing = false;
        this.minInterval = minIntervalMs;
        this.lastSent = 0;
    }

    async add(sendFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ sendFn, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.processing || this.queue.length === 0) return;
        this.processing = true;

        while (this.queue.length > 0) {
            const { sendFn, resolve, reject } = this.queue.shift();
            
            // Ensure minimum interval between messages
            const elapsed = Date.now() - this.lastSent;
            if (elapsed < this.minInterval) {
                await humanDelay(this.minInterval - elapsed);
            }

            try {
                const result = await sendFn();
                this.lastSent = Date.now();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }

        this.processing = false;
    }
}

/**
 * Connection Optimizer
 * Keeps connection alive with intelligent pinging
 */
class PingManager {
    constructor(ws, logger, intervalMs = 25000) {
        this.ws = ws;
        this.logger = logger;
        this.interval = intervalMs;
        this.timer = null;
        this.lastPong = Date.now();
    }

    start() {
        this.stop(); // Clear any existing timer
        this.timer = setInterval(() => this.ping(), this.interval);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    async ping() {
        if (!this.ws || !this.ws.isOpen) {
            this.stop();
            return;
        }

        try {
            // Send lightweight ping frame
            this.ws.ping?.();
            this.logger?.trace?.("Decagramton: Ping sent");
        } catch (e) {
            this.logger?.warn?.({ e }, "Ping failed");
        }
    }

    onPong() {
        this.lastPong = Date.now();
    }

    getLatency() {
        return Date.now() - this.lastPong;
    }
}

/**
 * Security Shield
 * Rate limiting and anti-spam protection
 */
class SecurityShield {
    constructor(maxRequestsPerMinute = 30) {
        this.requests = [];
        this.maxRpm = maxRequestsPerMinute;
    }

    canProceed() {
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        
        // Clean old requests
        this.requests = this.requests.filter(t => t > oneMinuteAgo);
        
        if (this.requests.length >= this.maxRpm) {
            return false;
        }
        
        this.requests.push(now);
        return true;
    }

    async waitIfNeeded() {
        if (!this.canProceed()) {
            const waitTime = 60000 - (Date.now() - this.requests[0]);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
}

module.exports = {
    humanDelay,
    MessageQueue,
    PingManager,
    SecurityShield
};
