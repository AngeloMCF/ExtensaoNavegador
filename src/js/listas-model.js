const BasesHML = [
    {
        base: 'BaseExmploEast',
        Clientes: ['exemplo']
    },
    {
        base: 'BaseExmploWest',
        Clientes: ['epsilon']
    },
    {
        base: 'BaseExmploNorth',
        Clientes: ['alpha', 'beta', 'gamma', 'delta', 'zeta', , 'ro']
    },
    {
        base: 'BaseExmploSouth',
        Clientes: ['Omega']
    },
    {
        base: '-[IsoladoBaseExmploEast] -[IsoladoBaseExmploWest] -[IsoladoBaseExmploNorth] -[IsoladoBaseExmploSouth]',
        Clientes: ['ambiente isolado']
    }
]

const Clientes = [
    // {
    //     // MODELO
    //     nome: "CLIENTE",
    //     PROD_URL: "URL_PRODUCAO",        // (opcional) usado para setar ambiente de produção
    //     HML_URL: "URL_HMOLOGACAO",       // (opcional) usado para setar ambiente de homologação
    //     DEV_URL: "URL_DESENVOLVIEMTO",   // (opcional) usado para setar ambiente de desenvolvimento
    //     HML_BASE: "BASE_HOMOLG_CLIENTE", // (opcional) usado para setar base de homologação
    //          ** Se comentado HML_URL ou DEV_URL ou HML_BASE, não irá aparecer o link  mas o nome do cliente é exibido
    //     isolado: true                    // (opcional) usado para setar ambiente isolado (default false)    
    //     title: "Exemplo de Mensagem"     // (opcional) usado para setar título do link
    //     textOnly: true                   // (opcional) usado para exibir apenas o nome do cliente, sem link
    //                                      //            usar somente qunado existe um html dentro de ./src/hml/
    //                                      //            se passado em link regular não irá funcionar 

    // },
    {
        nome: "Ambiente Isolado",
        // PROD_URL: "https://www.AmbienteIsolado.com",
        HML_URL: "https://homologacao.AmbienteIsolado.com",
        DEV_URL: "https://desenvolvimento.AmbienteIsolado.com",
        isolado: true,
        title: "Ambiente isolado para testes e desenvolvimento",
    },
    {
        nome: "Exemplo",
        PROD_URL: "https://www.Exemplo.com",
        HML_URL: "https://homologacao.Exemplo.com",
        DEV_URL: "https://desenvolvimento.Exemplo.com",
    },
    {
        nome: "Alpha",
        PROD_URL: "https://www.Alpha.com",
        HML_URL: "https://homologacao.Alpha.com",
        DEV_URL: "https://desenvolvimento.Alpha.com",
    },
    {
        nome: "Beta",
        PROD_URL: "https://www.Beta.com",
        HML_URL: "https://homologacao.Beta.com",
        DEV_URL: "https://desenvolvimento.Beta.com",

    },
    {
        nome: "Gamma",
        PROD_URL: "https://www.Gamma.com",
        HML_URL: "https://homologacao.Gamma.com",
        // DEV_URL: "https://desenvolvimento.Gamma.com",
    },
    {
        nome: "Delta",
        PROD_URL: "https://www.Delta.com",
        HML_URL: "https://homologacao.Delta.com",
        DEV_URL: "https://desenvolvimento.Delta.com",
    },
    {
        nome: "Epsilon",
        PROD_URL: "https://www.Epsilon.com",
        // HML_URL: "https://homologacao.Epsilon.com",
        DEV_URL: "https://desenvolvimento.Epsilon.com",
    },
    {
        nome: "Zeta",
        // PROD_URL: "https://www.Zeta.com",
        // HML_URL: "https://homologacao.Zeta.com",
        // DEV_URL: "https://desenvolvimento.Zeta.com",
    },
    {
        nome: "Omega",
        PROD_URL: "https://www.Omega.com",
        HML_URL: "https://homologacao.Omega.com",
        DEV_URL: "https://desenvolvimento.Omega.com",
    },
    {
        nome: "Ro",
        PROD_URL: "https://www.Ro.com",
        HML_URL: "https://homologacao.Ro.com",
        DEV_URL: "https://desenvolvimento.Ro.com",
    },
];

const Tools = [
    {
        nome: "SQL Formatter",
        URL: "https://sql-format.com/"
    },
    {
        nome: "HTML Formatter",
        URL: "https://webformatter.com/html"
    },
    {
        nome: "HTML Entities",
        URL: "https://arquivo.devmedia.com.br/artigos/devmedia/html-entities.html",
        title: "Caractere Especial HTML"
    },
    {
        nome: "Gerador CPF",
        URL: "https://www.4devs.com.br/gerador_de_cpf",
    },
    {
        nome: "ChatGPT",
        URL: "https://chatgpt.com/",
    },
    {
        nome: "HTML Viewer",
        URL: "https://html.onlineviewer.net/",
    }
];

const textosCopiar = [
    {
        nome: "Almoço",
        icone: true
    },
    {
        nome: "Boa tarde, entrando em reunião, assim que puder retorno.",
        icone: true,
        id: "mensagem-reuniao"
    }
];

const Wiki = [
    {
        nome: 'Codificação de URL',
        url: 'https://developers.google.com/maps/url-encoding?hl=pt-br'
    },
    {
        nome: 'Commits Semânticos',
        url: 'https://blog.geekhunter.com.br/o-que-e-commit-e-como-usar-commits-semanticos/'
    },
    {
        nome: 'Devicon',
        url: 'https://devicon.dev/'
    },
    {
        nome: 'Flaticon',
        url: 'https://www.flaticon.com/'
    },
    {
        nome: 'loiane',
        url: 'https://loiane.training/'
    }
];

const Pages = [
    {
        nome: "Pull requests",
        URL: "./pullrequest.html",
        target: '_self'
    },
    {
        nome: "Outlook",
        URL: "https://outlook.office.com/mail/"
    },
    {
        nome: "Whatsapp",
        URL: "https://web.whatsapp.com/"
    },
    {
        nome: "Status Code",
        URL: "https://http.cat/" // :)
    }
];

// Não implementado, colocar direto na pagina(html) de pull request
const pullRequest = [
    {
        nome: 'Banco Exmplo',
        URL: ""
    },
    {
        nome: 'Exmplo East',
        URL: ""
    },
    {
        nome: 'Base Exmplo West',
        URL: ""
    },
    {
        nome: 'Base Exmplo North',
        URL: ""
    },
    {
        nome: 'Base Exmplo South',
        URL: ""
    }
]

