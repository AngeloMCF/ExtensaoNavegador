# Documentação Técnica de Build - Atalhos Pessoais

Este documento descreve o processo técnico para gerar o pacote de distribuição da extensão "Atalhos Pessoais".

## Pré-requisitos

Para executar o processo de build, é necessário ter o **Python 3.x** instalado no sistema. O script utiliza bibliotecas padrão do Python (`os`, `shutil`, `zipfile`), portanto, não há dependências externas obrigatórias para o build principal, embora exista um arquivo `requirements.txt` na pasta `python` para ferramentas auxiliares de imagem.

## Estrutura do Processo

O build é automatizado pelo script `python/build.py`. Ele realiza as seguintes etapas:

1.  **Limpeza**: Remove diretórios de builds anteriores para garantir uma compilação limpa.
2.  **Preparação de Estrutura**: Cria a pasta `build/Atalhos` e subpastas necessárias.
3.  **Cópia de Ativos**: Copia as pastas de recursos estáticos (`css`, `html`, `icons`, `images`, `force-darkmode`) da pasta `src` para o diretório de build.
4.  **Processamento de Scripts**:
    *   Copia os arquivos JavaScript necessários.
    *   Realiza o "de-modeling" dos arquivos de configuração, renomeando `config_model.js` para `config.js` e `listas_model.js` para `listas.js`.
5.  **Manifesto**: Copia o `manifest.json` para a raiz do pacote.
6.  **Versionamento**: Lê a versão atual definida no `manifest.json` para nomear a pasta final (ex: `Atalhos-3.17.0`).
7.  **Empacotamento**: Gera um arquivo `.zip` contendo todos os arquivos prontos para distribuição.

## Como Gerar o Build

1.  Abra o terminal na raiz do projeto.
2.  Navegue até a pasta python:
    ```bash
    cd python
    ```
3.  Execute o script de build:
    ```bash
    python build.py
    ```
4.  O resultado será gerado na pasta `build/`, contendo tanto a pasta descompactada quanto o arquivo `.zip` com a versão correspondente.

## Configurações de Build

As configurações de quais arquivos e pastas são incluídos estão definidas no dicionário `dicionario` dentro do arquivo `python/build.py`. Caso novos recursos sejam adicionados ao projeto (como novas pastas em `src`), elas devem ser incluídas na lista `pastas_copiar` deste script.
