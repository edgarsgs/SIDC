# Suite System Intelligence - Desenvolvimento de Canais

## 📋 Visão Geral

Suite modular para processamento inteligente de dados com identificação automática de processos baseada em estrutura de planilhas.

---

## 🌐 Aplicação PWA

Este projeto agora funciona como um PWA instalável pelo navegador.

### Como testar localmente
- Execute um servidor local na pasta do projeto:
  ```powershell
  python -m http.server 8000
  ```
- Abra `http://localhost:8000`
- O navegador deve detectar o app e oferecer a instalação.

### Como publicar
- Use GitHub Pages ou qualquer servidor HTTPS seguro.
- O manifesto e o service worker já estão configurados.

---

## 📦 Estrutura de um Módulo

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


