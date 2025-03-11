export function createButton(options = {}) {
  return {
    state: {
      isLoading: false,
      disabled: options.disabled || false
    },
    methods: {
      setLoading(loading) {
        this.isLoading = loading;
      },
      click() {
        if (!this.isLoading && !this.disabled) {
          options.onClick?.();
        }
      }
    },
    template: `
      <button 
        class="btn ${options.variant || 'primary'}"
        @click="click"
        :disabled="disabled || isLoading"
      >
        {{ isLoading ? 'Carregando...' : options.text }}
      </button>
    `
  };
} 