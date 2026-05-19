﻿﻿﻿# Suite System Intelligence - Desenvolvimento de Canais

## 📋 Visão Geral
**Versão SIDC_v1.1.3-beta (Motor de Automação "O Piloto" - Estável)**  
A Suite SIDC é um ecossistema modular de alta performance para processamento e análise de dados, projetada com foco em UX Premium (Apple Design) e automação assistida para o time de Desenvolvimento de Canais.

---

## 🌐 Aplicação PWA

Este projeto agora funciona como um PWA instalável pelo navegador.

**Link público:** https://github.com/edgarsgs/SIDC

**Versão estável:** https://github.com/edgarsgs/SIDC/releases/tag/SIDC_v1.1.3-beta

Leia também: [Guia de instalação do PWA](INSTALL_GUIDE.md)

### 🚀 Novidades da Versão 1.1.3-beta
- **Sincronização de Módulos**: Garantia de paridade entre documentação e motor lógico.
- **Correção de Motor**: Resolvido erro de leitura de múltiplos arquivos (Blob error).
- **Integração SheetJS**: Capacidade de ler e manipular arquivos `.xlsx` nativamente no browser.
- **Motor de Cruzamento (Join)**: Lógica de PROCX baseada na raiz do CNPJ (7 dígitos) entre Armazenagem e FP98.

### 🎨 Destaques da Versão 1.0.0
- **Splash Screen Hero:** Primeira impressão focada na proposta de valor, ocultando a complexidade operacional até o início do uso.
- **Apple Search Bar:** Barra de busca estilo Spotlight com efeito *Glassmorphism* (vidro fosco) e micro-interações de foco.
- **Smart Favorites:** Sistema de acesso rápido limitado a 4 itens para manter o foco, com persistência automática via `localStorage`.
- **Canais de Governança:** Modais integrados "Sobre" (visão estratégica) e "Sugestões" (melhoria contínua e engajamento da equipe).
- **Modern UX/UI:** Feedbacks táteis via notificações *Toast*, área de *Drag & Drop* animada e transições suaves de scroll.
- **Arquitetura Pronta:** Interface preparada para o acoplamento de motores lógicos JS específicos por módulo.

### Como testar localmente
- Execute um servidor local na pasta do projeto:
  ```powershell
  python -m http.server 8000
  ```
- Abra `http://localhost:8000`
- O navegador deve detectar o app e oferecer a instalação.

### Como instalar o PWA no navegador
- No Chrome/Edge: clique no botão de instalação no endereço (ícone + ou “Instalar”) ou use o menu do navegador.
- No Firefox: use o menu do navegador e selecione “Instalar” ou “Adicionar à área de trabalho”.
- No mobile, o Chrome pode mostrar “Adicionar à tela inicial”.

### Como publicar
- Use GitHub Pages ou qualquer servidor HTTPS seguro.
- O manifesto e o service worker já estão configurados.
- Se usar GitHub Pages, publique a pasta `main` ou `docs` como site e acesse o link do GitHub Pages.

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

## 🚀 Evolução do Projeto

- [x] Splash Screen & Welcome experience
- [x] Interface Apple-inspired Search & Favorites
- [x] Canal de Feedback e Melhoria Contínua integrado
- [x] Sistema de Notificações (Toasts)
- [x] Documentação Estratégica e Protocolos de Conduta
- [ ] Implementar detecção automática de tipo de processo
- [ ] Integrar motor de processamento real (SheetJS/Excel)
- [ ] Adicionar histórico de processamentos

---

## �🛠️ Desenvolvimento em Ambientes Restritos

Se o ambiente de destino possuir restrições de instalação (sem IDE):
1. **Editor:** Utilize o `GitHub Codespaces` (pressione `.` no repositório) para editar via browser.
2. **Teste:** Utilize o Python Portátil para rodar o servidor local (conforme `INSTALL_GUIDE.md`).
3. **Logs:** Utilize o `F12` (Console do Navegador) para depuração. A aplicação detecta automaticamente o ambiente `localhost` e ativa o modo Debug.

##  Notas para Desenvolvimento

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
