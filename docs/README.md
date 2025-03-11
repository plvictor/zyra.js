# 🌟 Zyra.js

Um framework JavaScript leve, intuitivo e reativo para construir interfaces modernas.

<div align="center">
  <img src="assets/zyra-logo.png" alt="Zyra.js Logo" width="180">
  
  [![npm version](https://img.shields.io/npm/v/zyra.js.svg?style=flat)](https://www.npmjs.com/package/zyra.js)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![gzip size](https://img.badgesize.io/https://unpkg.com/zyra.js/dist/zyra.min.js?compression=gzip)](https://unpkg.com/zyra.js)
</div>

## ✨ Características

- 🚀 **Leve**: Menos de 5KB gzipped
- 🎯 **Intuitivo**: API simples e fácil de aprender
- ⚡ **Reativo**: Sistema de reatividade automática
- 🎨 **Estiloso**: Sistema de design integrado
- 📦 **Modular**: Use apenas o que precisar
- 🔧 **Extensível**: Fácil de customizar e estender

## 📦 Instalação

```bash
npm install zyra.js
```

Ou inclua diretamente via CDN:

```html
<!-- Framework -->
<script src="https://unpkg.com/zyra.js"></script>

<!-- Estilos (opcional mas recomendado) -->
<link rel="stylesheet" href="https://unpkg.com/zyra.js/dist/zyra.css">
```

## 🚀 Início Rápido

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./public/zyra.css">
  <script src="./public/zyra.min.js"></script>
</head>
<body>
  <div id="app"></div>
  
  <script>
    const app = Zyra.createApp({
      state: {
        contador: 0
      },
      methods: {
        incrementar() {
          this.contador++;
        }
      },
      template: `
        <div class="zyra-card zyra-p-3 zyra-text-center">
          <h1 class="zyra-text-lg">Contador: {{ contador }}</h1>
          <button class="zyra-btn zyra-btn-primary" @click="incrementar">
            Incrementar
          </button>
        </div>
      `
    });

    app.mount('#app');
  </script>
</body>
</html>
```

## 📚 Guia Completo

### Criando uma Aplicação

O método `createApp` é o ponto de entrada do Zyra.js:

```javascript
const app = Zyra.createApp({
  // Estado da aplicação
  state: {
    mensagem: 'Olá Mundo'
  },
  
  // Métodos
  methods: {
    saudacao() {
      alert(this.mensagem);
    }
  },
  
  // Propriedades computadas
  computed: {
    mensagemInvertida() {
      return this.mensagem.split('').reverse().join('');
    }
  },
  
  // Template
  template: `
    <div>{{ mensagem }}</div>
  `
});
```

### Sistema de Reatividade

O Zyra.js possui um sistema de reatividade automática:

```javascript
// O estado é reativo
state: {
  usuario: {
    nome: 'João',
    idade: 25
  }
}

// Mudanças são refletidas automaticamente no DOM
methods: {
  atualizarIdade() {
    this.usuario.idade++; // Atualiza a UI automaticamente
  }
}
```

### Componentes

Crie componentes reutilizáveis:

```javascript
const MeuBotao = Zyra.createButton({
  text: 'Clique Me',
  variant: 'primary',
  onClick: () => {
    alert('Clicou!');
  }
});

// Use em seu template
template: `
  <div>
    ${MeuBotao.template}
  </div>
`
```

### Sistema de Design (CSS)

O Zyra.js inclui um sistema de design completo através do `zyra.css`:

#### Variáveis CSS

```css
:root {
  --zyra-primary: #4CAF50;
  --zyra-secondary: #2196F3;
  --zyra-danger: #f44336;
  /* ... mais variáveis disponíveis */
}
```

#### Componentes Base

```html
<!-- Botões -->
<button class="zyra-btn zyra-btn-primary">Primary</button>
<button class="zyra-btn zyra-btn-secondary">Secondary</button>

<!-- Inputs -->
<input class="zyra-input" type="text">

<!-- Cards -->
<div class="zyra-card">Conteúdo</div>
```

#### Classes Utilitárias

```html
<!-- Flexbox -->
<div class="zyra-flex zyra-items-center zyra-gap-2">

<!-- Grid -->
<div class="zyra-grid zyra-grid-cols-3">

<!-- Espaçamento -->
<div class="zyra-p-3 zyra-m-2">

<!-- Tipografia -->
<p class="zyra-text-lg zyra-text-primary">
```

### Hooks e Utilitários

O framework inclui vários utilitários úteis:

```javascript
// Formatação de data
Zyra.formatters.date(new Date(), 'dd/MM/yyyy');

// Formatação de moeda
Zyra.formatters.currency(29.99); // R$ 29,99

// Limitação de texto
Zyra.formatters.truncate('Texto longo...', 20);
```

## 🎨 Personalização

### Temas

Personalize o tema alterando as variáveis CSS:

```css
:root {
  --zyra-primary: #FF5722;
  --zyra-radius-md: 8px;
  --zyra-font-family: 'Roboto', sans-serif;
}
```

### Extensões

Crie suas próprias extensões:

```javascript
Zyra.extend({
  name: 'minhaExtensao',
  install(app) {
    // Adicione funcionalidades
    app.utils.minhaFuncao = () => {};
  }
});
```

## 🔧 API Completa

### Métodos Globais

- `createApp(options)`: Cria uma nova instância da aplicação
- `createButton(options)`: Cria um componente de botão
- `formatters`: Objeto com funções de formatação

### Opções da Aplicação

```javascript
{
  state: {},        // Estado da aplicação
  methods: {},      // Métodos
  computed: {},     // Propriedades computadas
  template: '',     // Template
  components: {},   // Componentes
  router: null      // Configuração do router
}
```

### Classes CSS

#### Layout
- `zyra-flex`
- `zyra-grid`
- `zyra-items-center`
- `zyra-justify-between`

#### Espaçamento
- `zyra-p-[0-4]`
- `zyra-m-[0-4]`
- `zyra-gap-[1-3]`

#### Tipografia
- `zyra-text-[sm|md|lg]`
- `zyra-text-[primary|danger|gray]`
- `zyra-font-bold`

#### Componentes
- `zyra-btn`
- `zyra-input`
- `zyra-card`

## 📝 Exemplos

Confira nossa [coleção de exemplos](examples/) para ver mais casos de uso.

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso [guia de contribuição](CONTRIBUTING.md).

## 📄 Licença

Zyra.js é [MIT licensed](LICENSE).

## 🙏 Agradecimentos

Agradecimentos especiais a todos os contribuidores que ajudaram a tornar o Zyra.js possível. 