/**
 * Simple routing system for Zyra.js
 */

import { createReactiveState } from './state';

/**
 * Creates a router instance
 * @param {Object} options - Router configuration
 * @returns {Object} Router instance
 */
export function createRouter(options = {}) {
  const {
    routes = [],
    mode = 'hash', // 'hash' or 'history'
    base = ''
  } = options;

  const state = createReactiveState({
    currentRoute: null,
    params: {},
    query: {}
  });

  const router = {
    mode,
    base,
    routes: new Map(routes.map(route => [route.path, route])),

    /**
     * Initializes the router
     */
    init() {
      window.addEventListener('popstate', () => this.handleRoute());
      if (mode === 'hash') {
        window.addEventListener('hashchange', () => this.handleRoute());
      }
      this.handleRoute();
    },

    /**
     * Navigates to a new route
     * @param {string} path - Target path
     * @param {Object} options - Navigation options
     */
    push(path, options = {}) {
      const { replace = false } = options;
      const url = this.createUrl(path);

      if (mode === 'history') {
        if (replace) {
          history.replaceState(null, '', url);
        } else {
          history.pushState(null, '', url);
        }
      } else {
        if (replace) {
          location.replace(`#${path}`);
        } else {
          location.hash = path;
        }
      }

      this.handleRoute();
    },

    /**
     * Creates a URL for the given path
     * @param {string} path - Target path
     * @returns {string} Full URL
     */
    createUrl(path) {
      if (mode === 'history') {
        return `${base}${path}`;
      }
      return `#${path}`;
    },

    /**
     * Gets the current path
     * @returns {string} Current path
     */
    getCurrentPath() {
      if (mode === 'history') {
        return location.pathname.slice(base.length) || '/';
      }
      return location.hash.slice(1) || '/';
    },

    /**
     * Parses URL parameters
     * @param {string} pattern - Route pattern
     * @param {string} path - Current path
     * @returns {Object} Parsed parameters
     */
    parseParams(pattern, path) {
      const params = {};
      const patternSegments = pattern.split('/');
      const pathSegments = path.split('/');

      patternSegments.forEach((segment, i) => {
        if (segment.startsWith(':')) {
          const paramName = segment.slice(1);
          params[paramName] = pathSegments[i];
        }
      });

      return params;
    },

    /**
     * Parses URL query string
     * @returns {Object} Parsed query parameters
     */
    parseQuery() {
      const query = {};
      const searchParams = new URLSearchParams(location.search);
      
      for (const [key, value] of searchParams) {
        query[key] = value;
      }

      return query;
    },

    /**
     * Handles route changes
     */
    handleRoute() {
      const currentPath = this.getCurrentPath();
      
      for (const [pattern, route] of this.routes) {
        if (this.matchRoute(pattern, currentPath)) {
          state.currentRoute = route;
          state.params = this.parseParams(pattern, currentPath);
          state.query = this.parseQuery();
          
          if (route.beforeEnter) {
            route.beforeEnter(state.params, state.query);
          }
          
          return;
        }
      }

      // Handle 404
      const notFoundRoute = this.routes.get('*');
      if (notFoundRoute) {
        state.currentRoute = notFoundRoute;
        state.params = {};
        state.query = this.parseQuery();
      }
    },

    /**
     * Checks if a route pattern matches a path
     * @param {string} pattern - Route pattern
     * @param {string} path - Current path
     * @returns {boolean} Whether the route matches
     */
    matchRoute(pattern, path) {
      const patternSegments = pattern.split('/');
      const pathSegments = path.split('/');

      if (patternSegments.length !== pathSegments.length) {
        return false;
      }

      return patternSegments.every((segment, i) => {
        if (segment.startsWith(':')) {
          return true;
        }
        return segment === pathSegments[i];
      });
    },

    /**
     * Gets the current route state
     * @returns {Object} Current route state
     */
    getState() {
      return {
        route: state.currentRoute,
        params: state.params,
        query: state.query
      };
    }
  };

  return router;
}
