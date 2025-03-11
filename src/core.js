/**
 * Core functionality of Zyra.js
 */

import { createReactiveState } from './state';
import { render, mount } from './dom';
import { createRouter } from './router';

/**
 * Creates a new Zyra.js application instance
 * @param {Object} options - Application configuration options
 * @returns {Object} Application instance
 */
export function createApp(options = {}) {
  const {
    state = {},
    methods = {},
    computed = {},
    template,
    components = {},
    router = null
  } = options;

  // Create reactive state
  const reactiveState = createReactiveState(state);

  // Bind methods to reactive state
  const boundMethods = {};
  Object.entries(methods).forEach(([key, method]) => {
    boundMethods[key] = method.bind(reactiveState);
  });

  // Create computed properties
  const computedProps = {};
  Object.entries(computed).forEach(([key, fn]) => {
    Object.defineProperty(computedProps, key, {
      get: () => fn.call(reactiveState),
      enumerable: true
    });
  });

  // Create app instance
  const app = {
    state: reactiveState,
    methods: boundMethods,
    computed: computedProps,
    components,
    router: router ? createRouter(router) : null,

    /**
     * Mounts the application to a DOM element
     * @param {string|Element} el - Target element or selector
     */
    mount(el) {
      const target = typeof el === 'string' ? document.querySelector(el) : el;
      if (!target) {
        throw new Error(`Target element ${el} not found`);
      }

      const vdom = render(template, {
        state: this.state,
        methods: this.methods,
        computed: this.computed,
        components: this.components
      });

      mount(vdom, target);

      // Initialize router if provided
      if (this.router) {
        this.router.init();
      }
    }
  };

  return app;
}

/**
 * Creates a new component
 * @param {Object} options - Component configuration options
 * @returns {Object} Component instance
 */
export function defineComponent(options = {}) {
  const {
    name,
    props = {},
    state = {},
    methods = {},
    computed = {},
    template
  } = options;

  return {
    name,
    props,
    state,
    methods,
    computed,
    template,
    render(props) {
      const componentState = createReactiveState({ ...state, ...props });
      
      // Bind methods
      const boundMethods = {};
      Object.entries(methods).forEach(([key, method]) => {
        boundMethods[key] = method.bind(componentState);
      });

      // Create computed properties
      const computedProps = {};
      Object.entries(computed).forEach(([key, fn]) => {
        Object.defineProperty(computedProps, key, {
          get: () => fn.call(componentState),
          enumerable: true
        });
      });

      return render(template, {
        state: componentState,
        methods: boundMethods,
        computed: computedProps
      });
    }
  };
}

const { createButton, formatters } = Zyra;

// Ou no ES modules
import { createButton, formatters } from 'zyra.js';