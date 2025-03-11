/**
 * Reactive state management system
 */

const subscribers = new WeakMap();

/**
 * Creates a reactive state object
 * @param {Object} initialState - Initial state object
 * @returns {Proxy} Reactive state proxy
 */
export function createReactiveState(initialState = {}) {
  return new Proxy(initialState, {
    get(target, key) {
      // Track dependency
      const currentEffect = getCurrentEffect();
      if (currentEffect) {
        track(target, key, currentEffect);
      }
      return target[key];
    },

    set(target, key, value) {
      const oldValue = target[key];
      target[key] = value;
      
      // Trigger updates if value changed
      if (oldValue !== value) {
        trigger(target, key);
      }
      return true;
    }
  });
}

/**
 * Tracks dependencies between reactive properties and effects
 * @param {Object} target - Target object
 * @param {string|symbol} key - Property key
 * @param {Function} effect - Effect function
 */
function track(target, key, effect) {
  let depsMap = subscribers.get(target);
  if (!depsMap) {
    depsMap = new Map();
    subscribers.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  deps.add(effect);
}

/**
 * Triggers effects for a reactive property
 * @param {Object} target - Target object
 * @param {string|symbol} key - Property key
 */
function trigger(target, key) {
  const depsMap = subscribers.get(target);
  if (!depsMap) return;

  const deps = depsMap.get(key);
  if (!deps) return;

  deps.forEach(effect => {
    // Schedule effect in microtask to avoid multiple updates
    queueMicrotask(() => effect());
  });
}

let currentEffect = null;

/**
 * Gets the current effect being tracked
 * @returns {Function|null} Current effect
 */
export function getCurrentEffect() {
  return currentEffect;
}

/**
 * Watches for changes in a reactive property
 * @param {Function} getter - Getter function that accesses reactive properties
 * @param {Function} callback - Callback to run when dependencies change
 */
export function watch(getter, callback) {
  const effect = () => {
    const oldEffect = currentEffect;
    currentEffect = effect;
    const value = getter();
    currentEffect = oldEffect;
    callback(value);
  };
  effect();
}

/**
 * Creates a computed property
 * @param {Function} getter - Getter function that computes the value
 * @returns {Object} Computed property object
 */
export function computed(getter) {
  let value;
  let dirty = true;

  const effect = () => {
    dirty = true;
  };

  return {
    get value() {
      if (dirty) {
        const oldEffect = currentEffect;
        currentEffect = effect;
        value = getter();
        currentEffect = oldEffect;
        dirty = false;
      }
      return value;
    }
  };
}
