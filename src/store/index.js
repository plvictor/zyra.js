import { createReactiveState } from '../core';

export function createStore(initialState = {}) {
  const subscribers = new Set();
  
  const store = {
    state: createReactiveState(initialState),
    
    // Inscreve componentes para atualizações
    subscribe(callback) {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
    
    // Atualiza estado
    commit(key, value) {
      this.state[key] = value;
      subscribers.forEach(callback => callback());
    },
    
    // Ações assíncronas
    async dispatch(action, payload) {
      if (typeof this.actions[action] === 'function') {
        await this.actions[action](payload);
      }
    },
    
    // Define ações disponíveis
    actions: {}
  };
  
  return store;
} 