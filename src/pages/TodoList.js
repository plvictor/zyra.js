import { createButton } from '../components/Button';
import { formatters } from '../utils/formatters';

export function createTodoList() {
  return {
    state: {
      todos: [],
      newTodo: '',
      isLoading: false
    },
    
    methods: {
      addTodo() {
        if (!this.newTodo.trim()) return;
        
        const todo = {
          id: Date.now(),
          text: this.newTodo,
          completed: false,
          createdAt: new Date()
        };
        
        this.todos.push(todo);
        this.newTodo = '';
      },
      
      removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      
      toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      }
    },
    
    computed: {
      completedCount() {
        return this.todos.filter(todo => todo.completed).length;
      }
    },
    
    template: `
      <div class="todo-list">
        <h1>Lista de Tarefas ({{ completedCount }}/{{ todos.length }})</h1>
        
        <div class="add-todo">
          <input 
            v-model="newTodo"
            placeholder="Nova tarefa..."
            @keyup.enter="addTodo"
          >
          ${createButton({ text: 'Adicionar', onClick: 'addTodo' }).template}
        </div>
        
        <ul class="todo-items">
          <li v-for="todo in todos" :key="todo.id">
            <input 
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo.id)"
            >
            <span :class="{ completed: todo.completed }">
              {{ todo.text }}
            </span>
            <small>{{ formatters.date(todo.createdAt) }}</small>
            <button @click="removeTodo(todo.id)" class="btn-remove">
              ×
            </button>
          </li>
        </ul>
      </div>
    `
  };
} 