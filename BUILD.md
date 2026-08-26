# Documentação Técnica de Build - Atalhos Pessoais

Este documento descreve o processo técnico para gerar o pacote de distribuição da extensão "Atalhos Pessoais".

---

## Pré-requisitos

Para executar o processo de build, é necessário ter o **Python 3.x** instalado no sistema. O script utiliza bibliotecas padrão do Python (`os`, `shutil`, `zipfile`), portanto, não há dependências externas obrigatórias para o build principal, embora exista um arquivo `requirements.txt` na pasta `python` para ferramentas auxiliares de imagem.

---

## Estrutura do Processo

O build é automatizado pelo script `python/build.py`. Ele realiza as seguintes etapas:

1.  **Limpeza**: Remove diretórios de builds anteriores (da versão atual) para garantir uma compilação limpa.
2.  **Preparação de Estrutura**: Cria a pasta `build/{nome_extensao}` e subpastas necessárias.
3.  **Cópia de Ativos**: Copia as pastas de recursos estáticos (`css`, `html`, `icons`, `images`, `force-darkmode`) da pasta `src` para o diretório de build.
4.  **Processamento de Scripts**:
    *   Copia os arquivos JavaScript necessários.
    *   Realiza o "de-modeling" dos arquivos de configuração, renomeando `config_model.js` para `config.js` e `listas_model.js` para `listas.js`.
5.  **Manifesto**: Copia o `manifest.json` para a raiz do pacote.
6.  **Versionamento**: Lê a versão atual definida no `manifest.json` para nomear a pasta final (ex: `Atalhos-3.17.0`).
7.  **Empacotamento**: Gera um arquivo `.zip` contendo todos os arquivos prontos para distribuição.

---

## Como Gerar o Build

1.  Abra o terminal na raiz do projeto.
2.  Execute o script de build:
    ```bash
    python python/build.py
    ```
3.  O resultado será gerado na pasta `build/`, contendo tanto a pasta descompactada quanto o arquivo `.zip` com a versão correspondente.

---

## Configurações de Build

As configurações padrão de quais arquivos e pastas são incluídos estão definidas no dicionário `dicionario_default` dentro do arquivo `python/build.py`. Caso novos recursos sejam adicionados ao projeto (como novas pastas em `src`), elas devem ser incluídas na lista `pastas_copiar` deste script.

`versao` - Recebe valor de forma automatizada com o valor da versão do manifest.

<!-- `diretorio_raiz` -  -->

<!-- `diretorio_raiz_conteudo` -  -->

<!-- `diretorio_saida` -  -->

`caminho_manifest` - Por padão na raiz do projeto, se alterado o local deve passado o caminho.

`pasta_final` - Nome da pasta onde ficará todo o conteúdo da extensão.

`pasta_final_conteudo` - Caminho que fircará todo conteúdo estáticco. O caminho deve conter o nome da pasta base (definido em `pasta_final`).

`pastas_copiar` - Pastas que serão copiadas por completo, nome e contúdos.

`pastas_final` - Nome da pasta onde ficarão todos os arquivos copiados de forma unitária.

`arquivos` - Lista python com todos os arquivos que devem ser copiados e que não estão em `pastas_copiar`

`arquivos_renomear` - Dicionário python com nomes e caminho dos arquivos que devem ser renomeados. `key`: `value` -> `nome_atual`: `nome_final`. `key`: Deve conter o caminho relativo do arquivo que será renomeado, desconsiderendo o diretório base do projeto, `value`: Deve conter o nome final do arquivo, e conter o nome final

Deve conter o caminho relativo do arquivo que será renomeado, desconsiderendo o diretório base do projeto, mas com o nome final deste mesmo.

> `key`: `value` -> `'src/js/config_model.js'`: `'src/js/config.js'`, o arquivo 'config_model.js' será renomeado para 'config.js'.

---

## Configurações de Build com outras configurações

Ao executar somente `python python/build.py` é gerado um release com as configrações padrão. Para manter a configurações quie você deseja é recomendado que os arquivos `src/js/config_model.js` e `src/js/listas_model.js` sejam duplicados e suas copias renomeadas como desejar.

Após copiar, renomear ambos os arquivos, faça o mesmo com o arquivo `python/release_config_model.py`.

Feito isso nesse novo arquivo que foi gerado baseado em `release_config_model` altere os caminhos de `listas_model.js` e `config_model` dentro de `arquivos` 

```python
## Antes da alteração
'arquivos' : ['src/js/utils.js',
            'src/js/listas_model.js', ## ALTERAR
            'src/js/script.js',
            'src/js/config_model.js' ## ALTERAR
            ]


## Alterado
'arquivos' : ['src/js/utils.js',
            'src/js/listas_Empresa.js',
            'src/js/script.js',
            'src/js/config_Empresa.js'
            ]
```

Altere também os valores em `arquivos_renomear` no mesmo arquivo

```python
## Antes da alteração
'arquivos_renomear' : {
    'src/js/config_model.js': 'src/js/config.js' ## ALTERAR
    ,'src/js/listas_model.js': 'src/js/listas.js' ## ALTERAR
    }

## Alterado
'arquivos_renomear' : {
    'src/js/config_Empresa.js': 'src/js/config.js'
    ,'src/js/listas_Empresa.js': 'src/js/listas.js'
    }
```

### Pontos de atenção
No release final da extensão os arquivos `src/js/config.js` e `src/js/listas.js` devem estar com estes nomes, caso estejam com nomes diferentes, e que não tenham sido definidas no `manifest.json`, a extensão provavlelmente não deve funcionar.