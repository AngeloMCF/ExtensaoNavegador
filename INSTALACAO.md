# Guia de Instalação da Extensão

Este guia orienta como instalar a extensão "Atalhos Pessoais" em navegadores baseados em Chromium (Google Chrome, Microsoft Edge, Brave, etc.).

## Instalação em Modo Desenvolvedor (Recomendado para Testes)

Como esta é uma extensão personalizada, a instalação é feita através do modo de desenvolvedor do navegador:

1.  **Gerar os arquivos**: Certifique-se de que o build foi gerado (veja o arquivo `BUILD.md`) ou utilize a pasta `src` diretamente se estiver em ambiente de desenvolvimento.
2.  **Acessar Extensões**:
    *   No Chrome: Digite `chrome://extensions/` na barra de endereços.
    *   No Edge: Digite `edge://extensions/` na barra de endereços.
3.  **Ativar Modo do Desenvolvedor**: No canto superior direito da página de extensões, ative a chave **"Modo do desenvolvedor"**.
4.  **Carregar Extensão**:
    *   Clique no botão **"Carregar sem compactação"** (Load unpacked).
    *   Selecione a pasta onde os arquivos da extensão estão localizados. 
    *   **Nota**: Se você gerou o build, selecione a pasta dentro de `build/Atalhos-{versao}/Atalhos`. Se estiver desenvolvendo, selecione a pasta raiz do projeto (onde está o `manifest.json`).
5.  **Fixar no Navegador**: Clique no ícone de quebra-cabeça (Extensões) na barra de ferramentas do navegador e clique no ícone de "alfinete" ao lado de "Atalhos Pessoais" para facilitar o acesso.

## Atualização da Extensão

Sempre que houver mudanças no código ou um novo build for gerado:

1.  Vá até a página de extensões (`chrome://extensions/`).
2.  Localize o card da extensão "Atalhos Pessoais".
3.  Clique no ícone de **"Atualizar"** (seta circular) para recarregar os arquivos.

## Solução de Problemas

*   **Erro de Manifesto**: Certifique-se de que selecionou a pasta que contém diretamente o arquivo `manifest.json`.
*   **Ícone não aparece**: Verifique se a pasta `src/images` foi incluída corretamente no build.
*   **Permissões**: A extensão solicita permissões para `sidePanel` e `tabs`. Certifique-se de aceitar os avisos caso apareçam durante a instalação.
