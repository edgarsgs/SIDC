# Suite System Intelligence - Desenvolvimento de Canais

## 📋 Visão Geral

Suite modular para processamento inteligente de dados com identificação automática de processos baseada em estrutura de planilhas.

---

## 🎯 Estrutura do Projeto

```
Suite System Intelligence/
├── index.html              # Home principal (página de entrada)
├── css/
│   └── styles.css         # Estilos global (Light/Dark mode)
├── js/
│   ├── app.js            # Lógica principal da aplicação
│   ├── modules/          # Módulos de processos específicos
│   │   ├── processA.js   # Processo A - Análise de dados
│   │   ├── processB.js   # Processo B - Relatórios e métricas
│   │   ├── processC.js   # Processo C - Transformação de dados
│   │   ├── processD.js   # Processo D - Validação
│   │   ├── processE.js   # Processo E - Consolidação
│   │   └── processF.js   # Processo F - Otimização
│   └── utils/
│       └── theme.js      # Gerenciamento de tema (light/dark)
└── assets/               # Imagens, ícones, etc.
```

---

## 🎨 Design & UX

### Características de Design:
- **Estilo Apple/Google**: Interface clean, minimalista e moderna
- **Modo Escuro/Claro**: Alternância automática com preferência de sistema
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Smooth Transitions**: Animações suaves com performance otimizada
- **Acessibilidade**: Segue padrões WCAG e boas práticas de UX

### Componentes Principais:
- **Header Sticky**: Menu de navegação sempre visível
- **Hero Section**: Apresentação visual da suite
- **Módulos Grid**: Cards interativos com hover effects
- **Features Section**: Destaques da plataforma
- **Modal Sistema**: Para exibição de processos

---

## 🚀 Como Usar

### 1. Abrir a Aplicação
- Abra o arquivo `index.html` em um navegador moderno
- Ou use um servidor local (recomendado):
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Python 2
  python -m SimpleHTTPServer 8000
  
  # Node.js (com http-server)
  http-server
  ```

### 2. Navegação
- Clique nos links do menu (Home, Módulos, Sobre)
- Alterne tema com o botão 🌙/☀️
- Clique em um módulo para abrir seu processamento

### 3. Adicionar Novo Processo
1. Crie um novo arquivo em `js/modules/processX.js`
2. Adicione um novo card na seção `modules-grid` em `index.html`
3. Registre o módulo na lista `modules` do `app.js`

---

## 📱 Suporte PWA

Este projeto agora é um PWA instalável pelo navegador.

### Como testar localmente
- Rode o site em um servidor local, por exemplo:
  ```powershell
  python -m http.server 8000
  ```
- Abra `http://localhost:8000`
- O navegador deve detectar o PWA e oferecer instalação.

### O que foi adicionado
- `manifest.json` com nome, ícones e tema
- `service-worker.js` para cache offline
- `assets/icon.svg` como ícone do app
- Link de manifesto no `index.html`
- Registro do service worker no `index.html`

### Observação
- O PWA funciona melhor em `https` ou `localhost`
- Para publicar, você pode usar GitHub Pages ou qualquer servidor web seguro


---

## �️ Empacotamento com Electron

Este projeto já está configurado para ser transformado em um app desktop usando Electron.

### Como instalar dependências
- Instale o Node.js (inclui npm)
- No terminal, execute:
  ```powershell
  npm install
  ```

### Como rodar localmente como app desktop
```powershell
npm start
```

### Como gerar o instalador Windows
```powershell
npm run dist
```

> O instalador é configurado para criar atalho automaticamente no Desktop e no menu Iniciar.

---

## �📦 Estrutura de um Módulo

Cada módulo deve ter a seguinte estrutura:

```javascript
// js/modules/processX.js

class ProcessX {
    constructor() {
        this.name = 'Processo X';
        this.version = '1.0.0';
    }

    init(data) {
        // Inicializar o processo com dados
        console.log('Iniciando', this.name);
    }

    process(file) {
        // Processar arquivo
        return new Promise((resolve, reject) => {
            // Lógica de processamento
            resolve(resultado);
        });
    }

    getResult() {
        // Retornar resultado
    }
}

// Exportar instância
window.processX = new ProcessX();
```

---

## 🎨 Paleta de Cores

### Modo Claro (Light)
- Fundo Principal: `#ffffff`
- Fundo Secundário: `#f5f5f7`
- Texto Principal: `#1d1d1f`
- Acentuação: `#0071e3`

### Modo Escuro (Dark)
- Fundo Principal: `#1d1d1f`
- Fundo Secundário: `#262627`
- Texto Principal: `#f5f5f7`
- Acentuação: `#0a84ff`

---

## 🔧 Customização

### Alterar Cores
Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --accent-color: #0071e3;
    --success-color: #34c759;
    --error-color: #ff3b30;
}
```

### Alterar Fontes
Modifique a propriedade `font-family` no `body`:

```css
body {
    font-family: 'Sua Fonte', sans-serif;
}
```

---

## 📱 Responsividade

A aplicação se adapta automaticamente para:
- **Desktop**: >= 1024px (layout completo)
- **Tablet**: 768px - 1023px (layout otimizado)
- **Mobile**: < 768px (layout stack vertical)

---

## 🔒 Segurança

- ✅ Sem dependências externas (vanilla JS)
- ✅ Sem requisições de rede necessárias
- ✅ Processamento local (dados não são enviados)
- ✅ HTTPS ready

---

## 🚀 Próximos Passos (Roadmap)

- [ ] Implementar detecção automática de tipo de processo
- [ ] Integrar processamento de arquivos Excel
- [ ] Criar sistema de notificações
- [ ] Adicionar histórico de processamentos
- [ ] Implementar sistema de templates
- [ ] Adicionar exportação de resultados

---

## 📝 Notas para Desenvolvimento

### Convenções de Código:
- Use `camelCase` para variáveis e funções
- Use `PascalCase` para classes
- Use `kebab-case` para IDs e classes CSS
- Adicione comentários explicativos

### Performance:
- Minimize requisições HTTP
- Use lazy loading quando apropriado
- Otimize imagens
- Limpe listeners em destruição

### Testes:
- Teste em múltiplos navegadores
- Teste modo light e dark
- Teste responsividade em diferentes tamanhos

---

## 📄 Licença

Privado - Sistema interno

---

## 👤 Autor

Desenvolvido para Suite System Intelligence - Desenvolvimento de Canais
