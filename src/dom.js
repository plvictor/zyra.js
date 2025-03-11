/**
 * DOM manipulation and virtual DOM implementation
 */

/**
 * Creates a virtual DOM node
 * @param {string} type - Node type
 * @param {Object} props - Node properties
 * @param {Array} children - Child nodes
 * @returns {Object} Virtual DOM node
 */
export function h(type, props = {}, ...children) {
  return {
    type,
    props,
    children: children.flat().map(child =>
      typeof child === 'string' || typeof child === 'number'
        ? { type: 'text', props: {}, children: [], value: String(child) }
        : child
    )
  };
}

/**
 * Renders a template with given context
 * @param {string|Function} template - Template to render
 * @param {Object} context - Render context
 * @returns {Object} Virtual DOM tree
 */
export function render(template, context) {
  if (typeof template === 'function') {
    return template(context);
  }

  // Simple template parsing
  const interpolationRegex = /{{(.*?)}}/g;
  const eventRegex = /@(\w+)="([^"]*?)"/g;
  
  // Replace event handlers
  template = template.replace(eventRegex, (match, event, handler) => {
    const key = `__event_${event}_${Date.now()}`;
    context[key] = context.methods[handler.trim()];
    return `data-event="${key}"`;
  });

  // Replace interpolations
  template = template.replace(interpolationRegex, (match, expression) => {
    expression = expression.trim();
    let value;

    if (context.computed && expression in context.computed) {
      value = context.computed[expression];
    } else if (expression in context.state) {
      value = context.state[expression];
    } else {
      try {
        value = new Function('state', `return ${expression}`)(context.state);
      } catch (e) {
        console.error(`Error evaluating expression: ${expression}`, e);
        value = '';
      }
    }

    return String(value);
  });

  // Parse HTML to virtual DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(template, 'text/html');
  return domToVirtual(doc.body.firstChild, context);
}

/**
 * Converts a DOM node to virtual DOM
 * @param {Node} node - DOM node
 * @param {Object} context - Render context
 * @returns {Object} Virtual DOM node
 */
function domToVirtual(node, context) {
  if (node.nodeType === 3) { // Text node
    return {
      type: 'text',
      props: {},
      children: [],
      value: node.textContent
    };
  }

  const props = {};
  Array.from(node.attributes || []).forEach(attr => {
    if (attr.name === 'data-event') {
      const handler = context[attr.value];
      if (handler) {
        const [, event] = attr.value.split('_');
        props[`on${event}`] = handler;
      }
    } else {
      props[attr.name] = attr.value;
    }
  });

  return {
    type: node.tagName.toLowerCase(),
    props,
    children: Array.from(node.childNodes).map(child => domToVirtual(child, context))
  };
}

/**
 * Mounts a virtual DOM tree to a real DOM node
 * @param {Object} vnode - Virtual DOM node
 * @param {Element} container - Container element
 */
export function mount(vnode, container) {
  if (vnode.type === 'text') {
    container.textContent = vnode.value;
    return;
  }

  const element = document.createElement(vnode.type);

  // Set properties
  Object.entries(vnode.props).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  // Mount children
  vnode.children.forEach(child => {
    const childElement = document.createElement('div');
    mount(child, childElement);
    element.appendChild(childElement.firstChild);
  });

  // Replace container contents
  container.innerHTML = '';
  container.appendChild(element);
}

/**
 * Updates a DOM node with changes from a virtual DOM node
 * @param {Element} element - DOM element to update
 * @param {Object} oldVNode - Old virtual DOM node
 * @param {Object} newVNode - New virtual DOM node
 */
export function patch(element, oldVNode, newVNode) {
  if (oldVNode.type !== newVNode.type) {
    const newElement = document.createElement(newVNode.type);
    element.parentNode.replaceChild(newElement, element);
    mount(newVNode, newElement);
    return;
  }

  if (newVNode.type === 'text') {
    if (oldVNode.value !== newVNode.value) {
      element.textContent = newVNode.value;
    }
    return;
  }

  // Update properties
  const oldProps = oldVNode.props;
  const newProps = newVNode.props;

  // Remove old properties
  Object.keys(oldProps).forEach(key => {
    if (!(key in newProps)) {
      if (key.startsWith('on')) {
        const event = key.slice(2).toLowerCase();
        element.removeEventListener(event, oldProps[key]);
      } else {
        element.removeAttribute(key);
      }
    }
  });

  // Set new properties
  Object.entries(newProps).forEach(([key, value]) => {
    if (oldProps[key] !== value) {
      if (key.startsWith('on')) {
        const event = key.slice(2).toLowerCase();
        if (oldProps[key]) {
          element.removeEventListener(event, oldProps[key]);
        }
        element.addEventListener(event, value);
      } else {
        element.setAttribute(key, value);
      }
    }
  });

  // Update children
  const oldChildren = oldVNode.children;
  const newChildren = newVNode.children;
  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    if (i >= oldChildren.length) {
      // Add new child
      const childElement = document.createElement('div');
      mount(newChildren[i], childElement);
      element.appendChild(childElement.firstChild);
    } else if (i >= newChildren.length) {
      // Remove old child
      element.removeChild(element.childNodes[i]);
    } else {
      // Update existing child
      patch(element.childNodes[i], oldChildren[i], newChildren[i]);
    }
  }
}
