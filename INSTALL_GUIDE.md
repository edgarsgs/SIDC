# Guia rápido de instalação da Suite SIDC

Este guia mostra o passo a passo mais simples para testar o app e ver a opção de instalar.

## Passo a passo completo

1. Abra o navegador.
2. Se você ainda não tem Python instalado, instale primeiro (veja a seção abaixo).
3. Abra o app por um servidor local usando `http://localhost:8000`.
4. Quando o app abrir, veja se aparece um botão **Instalar** ou **Adicionar à tela inicial**.
5. Se aparecer, clique/tap para instalar.
6. Se não aparecer, abra o menu do navegador e procure por **Instalar** ou **Adicionar à tela inicial**.

> O app precisa ser aberto por um link válido (`https` ou `http://localhost`), não pelo arquivo local `file://`.

## Como abrir o app

1. Abra o navegador.
2. Abra o link do app no navegador.
   - Se você já publicou o app, use o link público.
   - Se estiver testando localmente, use um servidor local e abra `http://localhost:8000`.

> Não abra o app diretamente pelo arquivo `index.html` com o caminho `file://`. Essa forma não mostra a opção de instalar.

## Como instalar Python

Se você instalou a versão portátil, use o caminho completo do `python.exe`:

1. Abra o Prompt de Comando.
2. Digite o caminho completo para o Python portátil. Por exemplo:
   ```text
   C:\Users\seu-usuario\Downloads\python-portable\python.exe --version
   ```
3. Se aparecer a versão do Python, ele está funcionando.

Se quiser testar o app localmente com essa versão portátil, rode:

```text
C:\Users\seu-usuario\Downloads\python-portable\python.exe -m http.server 8000
```

Depois abra o navegador em:

```text
http://localhost:8000
```

Se preferir, instale o Python oficial e marque **Add Python to PATH** para poder usar apenas `python` no terminal.

## Como selecionar o Python no VS Code

1. Abra o VS Code.
2. Pressione `Ctrl+Shift+P` para abrir a Paleta de Comandos.
3. Digite `Python: Select Interpreter` e selecione essa opção.
4. Escolha o `python.exe` da sua versão portátil.
5. Se o Python portátil não aparecer, escolha `Enter interpreter path` > `Find...`.
6. Navegue até a pasta do Python portátil e selecione `python.exe`.

Depois disso, abra um terminal integrado no VS Code e digite:

```text
python --version
```

Se o comando mostrar a versão do Python, a seleção foi feita com sucesso.

## Como iniciar o servidor local

1. Abra o prompt de comando na pasta do projeto.
2. Digite:
   ```text
   python -m http.server 8000
   ```
3. Abra o navegador e entre em:
   ```text
   http://localhost:8000
   ```

## Como instalar o app

1. Quando o app abrir no navegador a partir de um link válido (`https` ou `localhost`), procure um aviso ou botão de instalação.
2. Se aparecer **Instalar** ou **Adicionar à tela inicial**, toque ou clique nele.
3. Se não aparecer, abra o menu do navegador e procure por:
   - **Instalar**
   - **Adicionar à área de trabalho**
   - **Adicionar à tela inicial**

> Se o app estiver aberto como arquivo local (`file://`), o navegador pode não mostrar essas opções.

## Após a instalação

- O app abrirá como um aplicativo, sem a barra de endereços.
- Ele será exibido como um ícone no computador ou celular.
- Basta clicar nesse ícone para abrir o app.

## Dica importante

- Use este app em um navegador moderno como Chrome, Edge ou Firefox.
- O app funciona melhor quando acessado por uma página segura (`https`) ou a partir do link publicado.
