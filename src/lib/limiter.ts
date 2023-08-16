import Bottleneck from "bottleneck"

/**
 * @typedef {Object} RateLimiterConfig
 * @property {number} size - How many jobs can be executed before the limiter stops executing jobs.
 * @property {number} increaseInterval - The interval (in milliseconds) to increase the reservoir.
 * @property {number} increaseAmount - The increment applied to the reservoir when the increaseInterval is in use.
 */

/**
 * Default configuration values matching https://docs.blockfrost.io/#section/Limits
 * burst 500 reqs/50s with 10req/1s cool-off
 * @type {RateLimiterConfig}
 */
const RATE_LIMITER_BLOCKFROST = {
  size: 500,
  increaseInterval: 1000,
  increaseAmount: 10,
}

const RATE_LIMITER_GOMAESTRO = {
  size: 10,
  increaseInterval: 1000,
  increaseAmount: 10,
}

/**
 * Returns a limiter instance with the specified configuration.
 * @param {RateLimiterConfig} config - The configuration for the limiter.
 * @returns {Bottleneck} - The limiter instance.
 */
const getLimiter = (config: any) => {
  // see Bottleneck docs https://www.npmjs.com/package/bottleneck#constructor=

  const limiter = new Bottleneck({
    reservoir: config.size,
    reservoirIncreaseAmount: config.increaseAmount,
    reservoirIncreaseInterval: config.increaseInterval,
    reservoirIncreaseMaximum: config.size,
  })

  limiter.on("error", function (error) {
    console.error(error)
  })

  return limiter
}

module.exports = {
  RATE_LIMITER_BLOCKFROST,
  getLimiter,
}
