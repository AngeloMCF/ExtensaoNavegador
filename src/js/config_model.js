
const imagens = {
    logo_light: '../images/logo-placeholder-light.png',
    logo_dark: '../images/logo-placeholder-dark.png',

    // usado para setar logo por mes comemorativo ou evento
    logo_natal: '../images/logo-placeholder-natal.png',
    logo_halloween: '../images/logo-placeholder-halloween.png',
    logo_pascoa: '../images/logo-placeholder-pascoa.png',
    logo_reveillon: '../images/logo-placeholder-reveillon.png',
}

// Deixar como "#" caso não tenha link e deixar mensagem vazia
const SuporteUrl = 'http://google.com';
const SuporteMensagem = 'Clique para acessar o portal do suporte';


// Definir aqui os blocos que irão aparecer na extensão
const NomesTela = [
    // {
    //     id :<id_da_div>,
    //     h1 : <Texto_do_titulo>,
    //     h1 : '<a href="link_do_site" target="_blank" title="Texto ao passar o mouse"><h1>Homologação</h1></a>',
    //     lista: <Lista_contendo_os_dicinarios_com_links_e_nomes>,
    //     chave_url :  <Chave_do_dicionario_com_url_alvo>,
    //     chave: 'PROD' <Chave_do_dicionario_somente_identifcar_homologação>// Não ncessário
    // },
    {
        id: "#prod",
        h1: "Produção",
        lista: Clientes,
        chave_url: "PROD_URL",
        chave: "PROD",
        page: 'home'
    }
    , {
        id: "#hml",
        h1: '<a href="#" target="_blank" title="Bases Homologação"><h1>Homologação</h1></a>',
        lista: Clientes,
        chave_url: "HML_URL",
        chave: "HML",
        page: 'home'
    }
    , {
        id: "#dev",
        h1: "Desenvolvimento",
        lista: Clientes,
        chave_url: "DEV_URL",
        chave: "DEV",
        page: 'home'
    }
    , {
        id: "#pages",
        h1: "Utilidades",
        lista: Pages,
        chave_url: "URL",
        chave: "PAGES",
        page: 'home'
    }
    , {
        id: "#tools",
        h1: "Ferramentas",
        lista: Tools,
        chave_url: "URL",
        chave: "TOOLS",
        page: 'home'
    },
    , {
        id: "#textosCopiar",
        h1: "Textos para copiar",
        lista: textosCopiar,
        chave_url: "URL",
        chave: "textosCopiar",
        page: 'home'
    },
    // Não implementado, colocar direto na pagina de pull request
    // {
    //     id :"#pr",
    //     h1 : "Pull Request",
    //     lista: pullRequest,
    //     chave_url : "URL",
    //     chave : "PullRequest",
    //     page: 'pullrequest'
    // }
    , {
        id: "#wiki",
        h1: "Wiki",
        lista: Wiki,
        chave_url: "url",
        chave: "WIKI",
        page: 'wiki'
    }
];
