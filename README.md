# Zyra.js

A lightweight, intuitive JavaScript framework for building modern web applications.

## Features

- 🚀 **Lightweight**: Less than 5KB gzipped
- 🎯 **Simple API**: Intuitive and easy to learn
- ⚡ **Fast**: Optimized for performance
- 🔄 **Reactive**: Built-in state management
- 📱 **Responsive**: Mobile-first approach
- 🛠️ **Modular**: Use only what you need
- 🌐 **Cross-browser**: Works in all modern browsers

## Installation

```bash
npm install zyra.js
```

Or include it directly in your HTML:

```html
<script src="https://cdn.zyrajs.dev/zyra.min.js"></script>
```

## Quick Start

```javascript
import { createApp } from 'zyra.js';

const app = createApp({
  state: {
    count: 0
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  template: `
    <div>
      <h1>Counter: {{ count }}</h1>
      <button @click="increment">Increment</button>
    </div>
  `
});

app.mount('#app');
```

## Documentation

For detailed documentation, visit [https://zyrajs.dev/docs](https://zyrajs.dev/docs)

## Examples

Check out our [examples repository](https://github.com/paulo-victor/zyra.js-examples) for more examples and use cases.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE)
