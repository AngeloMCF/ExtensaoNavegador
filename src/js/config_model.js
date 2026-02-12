
const imagens = {
    logo_light: '../images/logo-light.png',
    logo_dark: '../images/logo-dark.png',

    // usado para setar logo por mes comemorativo ou evento
    // (opcional) logo_natal_light ou logo_natal_dark se passar este caminho busca uma imagem específica
    logo_natal: '../images/logo-natal.png',
    // logo_natal_light: '../images/logo-natal.png',
    // logo_natal_dark: '../images/logo-natal.png',
    logo_halloween: '../images/logo-halloween.png',
    // logo_halloween_light: '../images/logo-halloween.png',
    // logo_halloween_dark: '../images/logo-halloween.png',
    logo_pascoa: '../images/logo-easter.png',
    // logo_pascoa_light: '../images/logo-easter.png',
    // logo_pascoa_dark: '../images/logo-easter.png',
    logo_reveillon: '../images/logo-reveillon.png',
    // logo_reveillon_light: '../images/logo-reveillon.png',
    // logo_reveillon_dark: '../images/logo-reveillon.png',
}

// Deixar como "#" caso não tenha link e deixar mensagem vazia
const SuporteUrl = 'http://google.com';
const SuporteMensagem = 'Clique para acessar o portal do suporte';

// Alterar caso o navegador fique pesado
let numeroParticulas = 30;

localStorage.setItem('numeroParticulas', numeroParticulas);
const easterDate = new Date('2026-04-05');
const carnavalDays = 7;
const habilitaCarnaval = false;

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
    // , {
    //     id: "#textosCopiar",
    //     h1: "Textos para copiar",
    //     lista: textosCopiar,
    //     chave_url: "URL",
    //     chave: "textosCopiar",
    //     page: 'home'
    // },
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
