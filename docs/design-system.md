# 🎨 Sistema de Design Zyra.js

O Zyra.js inclui um sistema de design completo e flexível que ajuda você a criar interfaces bonitas e consistentes rapidamente.

## 🎯 Princípios

- **Consistência**: Design system unificado
- **Flexibilidade**: Fácil de customizar
- **Performance**: CSS mínimo e otimizado
- **Responsividade**: Mobile-first por padrão
- **Acessibilidade**: Seguindo as melhores práticas

## 🎨 Cores

### Cores Base
```css
:root {
  --zyra-primary: #4CAF50;    /* Verde */
  --zyra-secondary: #2196F3;  /* Azul */
  --zyra-success: #4CAF50;    /* Verde */
  --zyra-danger: #f44336;     /* Vermelho */
  --zyra-warning: #FFC107;    /* Amarelo */
  --zyra-info: #00BCD4;       /* Ciano */
}
```

### Tons de Cinza
```css
:root {
  --zyra-gray-100: #f8f9fa;
  --zyra-gray-200: #e9ecef;
  --zyra-gray-300: #dee2e6;
  --zyra-gray-400: #ced4da;
  --zyra-gray-500: #adb5bd;
  --zyra-gray-600: #6c757d;
  --zyra-gray-700: #495057;
  --zyra-gray-800: #343a40;
  --zyra-gray-900: #212529;
}
```

## 📏 Espaçamento

Sistema de espaçamento consistente:
```css
:root {
  --zyra-spacing-xs: 0.25rem;  /* 4px */
  --zyra-spacing-sm: 0.5rem;   /* 8px */
  --zyra-spacing-md: 1rem;     /* 16px */
  --zyra-spacing-lg: 1.5rem;   /* 24px */
  --zyra-spacing-xl: 2rem;     /* 32px */
}
```

## 🔤 Tipografia

### Família de Fontes
```css
:root {
  --zyra-font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}
```

### Tamanhos
```css
:root {
  --zyra-font-size-sm: 0.875rem;  /* 14px */
  --zyra-font-size-md: 1rem;      /* 16px */
  --zyra-font-size-lg: 1.25rem;   /* 20px */
}
```

## 🔲 Bordas e Sombras

### Border Radius
```css
:root {
  --zyra-radius-sm: 0.25rem;
  --zyra-radius-md: 0.5rem;
  --zyra-radius-lg: 1rem;
  --zyra-radius-full: 9999px;
}
```

### Sombras
```css
:root {
  --zyra-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --zyra-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --zyra-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## 🧱 Componentes Base

### Botões

```html
<!-- Variantes -->
<button class="zyra-btn zyra-btn-primary">Primary</button>
<button class="zyra-btn zyra-btn-secondary">Secondary</button>
<button class="zyra-btn zyra-btn-danger">Danger</button>

<!-- Estados -->
<button class="zyra-btn" disabled>Desabilitado</button>
```

### Inputs

```html
<!-- Input padrão -->
<input class="zyra-input" type="text">

<!-- Com estado -->
<input class="zyra-input zyra-input-error" type="text">
```

### Cards

```html
<div class="zyra-card">
  <h3 class="zyra-text-lg">Título do Card</h3>
  <p>Conteúdo do card...</p>
</div>
```

## 🛠️ Classes Utilitárias

### Layout

#### Flexbox
```html
<div class="zyra-flex">                  <!-- display: flex -->
<div class="zyra-items-center">          <!-- align-items: center -->
<div class="zyra-justify-between">       <!-- justify-content: space-between -->
<div class="zyra-gap-2">                 <!-- gap: 0.5rem -->
```

#### Grid
```html
<div class="zyra-grid">                  <!-- display: grid -->
<div class="zyra-grid-cols-2">           <!-- grid-template-columns: repeat(2, 1fr) -->
<div class="zyra-grid-cols-3">           <!-- grid-template-columns: repeat(3, 1fr) -->
```

### Espaçamento

#### Margin
```html
<div class="zyra-m-0">                   <!-- margin: 0 -->
<div class="zyra-m-1">                   <!-- margin: 0.25rem -->
<div class="zyra-m-2">                   <!-- margin: 0.5rem -->
<div class="zyra-m-3">                   <!-- margin: 1rem -->
<div class="zyra-m-4">                   <!-- margin: 1.5rem -->
```

#### Padding
```html
<div class="zyra-p-0">                   <!-- padding: 0 -->
<div class="zyra-p-1">                   <!-- padding: 0.25rem -->
<div class="zyra-p-2">                   <!-- padding: 0.5rem -->
<div class="zyra-p-3">                   <!-- padding: 1rem -->
<div class="zyra-p-4">                   <!-- padding: 1.5rem -->
```

### Tipografia

#### Tamanhos
```html
<p class="zyra-text-sm">Texto pequeno</p>
<p class="zyra-text-md">Texto médio</p>
<p class="zyra-text-lg">Texto grande</p>
```

#### Cores
```html
<p class="zyra-text-primary">Texto primário</p>
<p class="zyra-text-danger">Texto de erro</p>
<p class="zyra-text-gray">Texto em cinza</p>
```

#### Alinhamento
```html
<p class="zyra-text-center">Centralizado</p>
<p class="zyra-text-left">Esquerda</p>
<p class="zyra-text-right">Direita</p>
```

## 🎯 Customização

### Sobrescrevendo Variáveis

```css
/* No seu CSS */
:root {
  --zyra-primary: #FF5722;        /* Nova cor primária */
  --zyra-radius-md: 8px;          /* Novo border radius */
  --zyra-font-family: 'Roboto';   /* Nova fonte */
}
```

### Estendendo Classes

```css
/* Adicione suas próprias variantes */
.zyra-btn-custom {
  background: linear-gradient(45deg, var(--zyra-primary), var(--zyra-secondary));
  color: white;
}

/* Modifique componentes existentes */
.zyra-card {
  border-left: 4px solid var(--zyra-primary);
}
```

## 📱 Responsividade

O sistema de design é mobile-first por padrão. Use as classes utilitárias para criar layouts responsivos:

```html
<div class="zyra-grid zyra-grid-cols-1 md:zyra-grid-cols-2 lg:zyra-grid-cols-3">
  <!-- Conteúdo -->
</div>
```

## ♿ Acessibilidade

O sistema de design segue as melhores práticas de acessibilidade:

- Contraste de cores adequado
- Tamanhos de fonte legíveis
- Estados de foco visíveis
- Suporte a navegação por teclado
- Atributos ARIA quando necessário

## 🔍 Exemplos Práticos

### Card de Produto
```html
<div class="zyra-card zyra-p-3">
  <img class="zyra-rounded-md" src="produto.jpg" alt="Produto">
  <h3 class="zyra-text-lg zyra-font-bold zyra-m-2">Nome do Produto</h3>
  <p class="zyra-text-gray">Descrição do produto...</p>
  <div class="zyra-flex zyra-justify-between zyra-items-center zyra-mt-3">
    <span class="zyra-text-primary zyra-font-bold">R$ 99,99</span>
    <button class="zyra-btn zyra-btn-primary">Comprar</button>
  </div>
</div>
```

### Formulário
```html
<form class="zyra-card zyra-p-4">
  <div class="zyra-flex zyra-flex-col zyra-gap-3">
    <input class="zyra-input" type="text" placeholder="Nome">
    <input class="zyra-input" type="email" placeholder="Email">
    <textarea class="zyra-input" placeholder="Mensagem"></textarea>
    <button class="zyra-btn zyra-btn-primary">Enviar</button>
  </div>
</form>
``` 