var debug = false

const btnHome = document.getElementById('m-home');
const btnWiki = document.getElementById('m-wiki');
const btnPullRequest = document.getElementById('m-pullrequest');
const home = document.getElementById('home');
const wiki = document.getElementById('wiki');


if (debug) {
    console.log('imagens');
    console.table(imagens);
}

/**
 *
 * Cria e adiciona a div de título e conteúdo ao html
 * @param  div_id
 * @example <div id="prod-header" class="modal-content"><h1>Produção</h1></div>
 * <div id="prod" class="grid-container">
 */
function addDiv(div_id = String, page = String) {
    var dt = document.getElementById(page);
    var div_id = div_id.slice(1);

    // CRIA HEADER
    var header = document.createElement('div');
    header.setAttribute('id', div_id + '-header');
    header.setAttribute('class', 'modal-content sep');

    // CRIA content
    var content = document.createElement('div');
    content.setAttribute('id', div_id);
    content.setAttribute('class', 'grid-container');

    try {

        dt.append(header)
        dt.append(content)
    }
    catch (e) {
        console.log('addDiv falhou');
        console.log(e);
    }

    if (debug) {
        console.log({
            'func addDiv - div_id: ': div_id,
            'func addDiv - header: ': header,
            'func addDiv - content: ': content
        }, 'func addDiv')
    }
}

/**
 *
 * @param {*} txt
 * @returns Link element
 */
function MakeLinkElement(txt = String()) {

    var link = document.createElement('a')
    link.setAttribute('href', txt.slice(txt.indexOf('href') + 6, txt.indexOf('" ')));
    link.setAttribute('title', txt.slice(txt.indexOf('title=') + 7, txt.indexOf('"><h1>')));
    link.setAttribute('target', '_blank');
    link.textContent = txt.slice(txt.indexOf('<h1>') + 4, txt.indexOf('</h1>'));

    return link
}

/**
 * Mapeia os dados a serem inseridos como Headers de cada seção.
 * @param {*} divId id que será usado para a div
 * @param {*} NomeH1 Texto H1 exibido em tela
 * @returns Dicionário com os valores preenchidos
 */
function DivConstruct(divId = String(), NomeH1 = String()) {
    var divContent = document.querySelector(divId);
    var idHeader = divId + '-header';
    var divHeader = document.querySelector(idHeader);
    var textHeader = document.createElement('h1');

    NomeH1.includes('<a') ? textHeader.appendChild(MakeLinkElement(NomeH1)) : textHeader.textContent = NomeH1;

    const dados = { divHeader, idHeader, textHeader, divContent };
    if (debug) { console.log(dados, 'func DivConstruct') };

    return dados;
};


function popContent(objt = { divHeader: Element, idHeader: String, textHeader: Element, divContent: Element },
    lista = Array(), chave_url = String(), chave = String("Chave não infromada")) {
    if (objt.divHeader) {
        try {

            objt.divHeader.append(objt.textHeader);
            if (debug) { console.log(objt.divHeader, 'objt.divHeader') };

            for (i in lista) {

                const conteudo = document.createElement('div');

                if (lista[i][chave_url] || lista[i].isolado) {

                    conteudo.setAttribute('class', 'grid-item');

                    if (lista[i][chave_url]) {

                        const link = document.createElement('a');
                        link.setAttribute('href', lista[i][chave_url]);

                        link.setAttribute('target', (lista[i].target != undefined && lista[i].target.length > 0) ? lista[i].target : '_blank');

                        if (lista[i].title || chave == "HML") {
                            if (chave == "HML") {
                                for (base in BasesHML) {
                                    for (cliente in BasesHML[base].Clientes) {
                                        if (BasesHML[base].Clientes[cliente].toLowerCase() === lista[i].nome.toLowerCase())
                                            var _base = BasesHML[base].base
                                    }
                                }
                                if (!_base) {
                                    _base = lista[i].HML_BASE ? lista[i].HML_BASE : 'Base não informada';
                                }
                            }

                            link.setAttribute('title', chave == "HML" && _base ? _base : lista[i].title);
                        };
                        link.textContent = lista[i].nome;
                        conteudo.append(link);
                    }
                    else {
                        conteudo.setAttribute('class', 'grid-item half-hidden');
                        conteudo.append(document.createElement('p').textContent = lista[i].nome);
                    }

                    objt.divContent.append(conteudo);

                    if (debug) {
                        console.log({
                            'objt': objt,
                            'conteudo': conteudo,
                            'link': link,

                        }, 'func popContent')
                    };

                    // SOMENTE ESTÉTICA
                    if (lista[i].isolado) {
                        for (var i = 0; i < 3; i++) {
                            const vazio = document.createElement('div');
                            vazio.setAttribute('class', 'grid-item');
                            objt.divContent.append(vazio);
                        };
                    };
                }
                else if (lista[i].isolado) {
                    // SOMENTE ESTÉTICA
                    if (lista[i].isolado) {
                        for (var i = 0; i < 3; i++) {
                            const vazio = document.createElement('div');
                            vazio.setAttribute('class', 'grid-item');
                            objt.divContent.append(vazio);
                        };
                    };

                }
                else {

                    if (lista[i].icone) {
                        conteudo.setAttribute('clas', 'grid-item half-hidden')
                        const texto_tooltip = 'Copiar'
                        const id = lista[i].id ? lista[i].id : 'btn-' + lista[i].nome.toLowerCase().normalize('NFD').replace(/[\s\u0300-\u036f]/g, '');

                        const button = document.createElement('button');
                        button.setAttribute('id', id);
                        button.setAttribute('class', 'copy-btn half-hidden tooltip');
                        button.setAttribute('data-tooltip', texto_tooltip);
                        button.onclick = () => copyToClipBoard(id);
                        button.textContent = lista[i].nome;

                        const img = document.createElement('img');

                        img.alt = 'icone';
                        img.width = 12;
                        img.height = 12;
                        img.setAttribute('style', 'vertical-align: middle; margin-right: 8px; margin-left: 4px;');
                        img.setAttribute('class', 'tooltip copy-icon');
                        img.setAttribute('src', icons.copy_dark);
                        // img.setAttribute('src', icons.copy_light);

                        button.append(img);
                        conteudo.append(button)
                    }

                    if (["PROD", "HML", "DEV"].includes(chave)) {
                        conteudo.setAttribute('class', 'grid-item half-hidden');
                        conteudo.append(document.createElement('p').textContent = lista[i].nome);
                    }
                    // else if (lista[i].nome && lista[i].textOnly) {
                    //     conteudo.setAttribute('class', 'grid-item half-hidden');
                    //     const p = document.createElement('p')
                    //     p.textContent = lista[i].nome
                    //     conteudo.append(p);
                    // }
                    objt.divContent.append(conteudo);
                }

            };
        }
        catch (e) {
            console.log('fail popContent ' + chave);
            console.log(e);
        };
    };
};

function switchPage() {
    const classActive = 'active';
    const classIncative = 'inative';

    ids = ['m-home', 'm-wiki', 'm-pullrequest'];

    id = btnHome.classList.contains(classActive) ? 'm-wiki' : 'm-home';

    switch (id) {
        case 'm-home':
            btnHome.setAttribute('class', classActive);
            btnWiki.setAttribute('class', classIncative);
            btnPullRequest.setAttribute('class', classIncative);
            home.removeAttribute('class', 'hidden');
            wiki.setAttribute('class', 'hidden');
            break;
        case 'm-wiki':
            btnHome.setAttribute('class', classIncative);
            btnWiki.setAttribute('class', classActive);
            btnPullRequest.setAttribute('class', classIncative);
            home.setAttribute('class', 'hidden');
            wiki.removeAttribute('class', 'hidden');
            break;

        default:
            break;
    }

    if (!Boolean(parseInt(localStorage.getItem('habilitaPR')))) {
        if (debug) { console.log(document.getElementById('m-pullrequest')); }
        document.getElementById('m-pullrequest').setAttribute('class', 'hidden')
    }

}


function initHome() {

    validarConexao();

    for (item in NomesTela) {

        addDiv(NomesTela[item].id, NomesTela[item].page);

        dadosDiv = new DivConstruct(NomesTela[item].id, NomesTela[item].h1);
        popContent(
            dadosDiv,
            NomesTela[item].lista,
            NomesTela[item].chave_url,
            NomesTela[item].chave
        );

    };

    try {
        btnHome.addEventListener('click', switchPage);
        btnWiki.addEventListener('click', switchPage);
    }
    catch (e) {
        console.log(`switchPage falhou: ${e}`);
    }

    if (!Boolean(parseInt(localStorage.getItem('habilitaPR')))) {
        if (debug) { console.log(document.getElementById('m-pullrequest')); }
        document.getElementById('m-pullrequest').setAttribute('class', 'hidden')
    };

    if (!Boolean(parseInt(localStorage.getItem('habilitaTools')))) {
        if (debug) { console.log(document.getElementById('habilitaTools')); }
        document.getElementById('tools-header').setAttribute('class', 'hidden')
        document.getElementById('tools').setAttribute('class', 'hidden')
    };

};


let defaultConfig = {
    'advancedMode': advancedMode ? 1 : 0,
    'color-mode': 'dark',
    'habilitaPR': 0,
    'habilitaTools': 0,
    'theme-Christmas': permitirNatal ? 1 : 0,
    'theme-Halloween': permitirHalloween ? 1 : 0,
    'theme-Easter': permitirEaster ? 1 : 0,
    'theme-Carnaval': permitirCarnaval ? 1 : 0,
    'theme-Reveillon': permitirReveillon ? 1 : 0,
    'numeroParticulas': numeroParticulas ?? 30
};

function setDefaultConfig() {
    if (debug) console.log('setDefaultConfig');

    for (i in defaultConfig) {
        if (debug) console.log(`defaultConfig: ${i} : ${defaultConfig[i]} `);

        if (localStorage.getItem(i) === null)
            localStorage.setItem(i, defaultConfig[i])

    };

}


function init() {
    if (debug)
        console.log('init')

    setDefaultConfig();
    try {
        window.onload = loadTheme();
    }
    catch (e) {
        console.error('loadTheme falhou', e);
    }
};


function gravarlocal(element) {
    let isForced = localStorage.getItem('force');

    if (element.dataset.name.includes('theme') || element.dataset.name.includes('habilita')) {
        localStorage.setItem(element.dataset.name, element.checked ? 1 : 0);
    }

    if (element.dataset.name.includes('theme')) {
        let key = element.dataset.name.replace('theme-', '').toLowerCase();

        if (element.checked) {
            document.getElementById(`allow-force-${key}`).classList.remove('hidden')
        }
        else {
            document.getElementById(`allow-force-${key}`).classList.add('hidden')
            document.getElementById(`force-${key}`).checked = false

            if (localStorage.getItem('force') === key)
                localStorage.removeItem('force')

        }
    }
    else if (element.dataset.name.includes('force')) {

        if (element.checked) {

            if (isForced)
                document.getElementById(`force-${isForced}`).checked = false
            localStorage.setItem('force', element.dataset.name.replace('force-', ''))
        }
        else {
            localStorage.removeItem('force')
        }
    }

    if (debug) { console.table(localStorage); }

    // TODO: padronizar id de tema festivo
    // tem bug on/off do tema
    switchMonth();
};


function initConfig() {
    if (debug) { console.table(localStorage); }

    validarConexao();

    document.getElementById('cleanCache').addEventListener('click', LimpalocalStorage)

    for (i in defaultConfig) {
        if (debug) console.log(`initConfig -> defaultConfig: ${i} : ${defaultConfig[i]} `);

        let key = i.replace('theme-', '').toLowerCase();

        if (i.toLowerCase().includes('theme') || i.toLowerCase().includes('habilita')) {
            document.getElementById(i).addEventListener('click', function () { gravarlocal(this); });
            document.getElementById(i).checked = Boolean(parseInt(localStorage.getItem(i)))
        }

        if (i.toLowerCase().includes('theme') && Boolean(parseInt(localStorage.getItem(i)))) {
            document.getElementById(`force-${key}`).addEventListener('click', function () { gravarlocal(this); });
            document.getElementById(`allow-force-${key}`).classList.remove('hidden')
            document.getElementById(`force-${key}`).checked = localStorage.getItem('force') === key;
        }

    }
};

window.onload = init()

switch (window.location.pathname) {
    case '/src/html/popup.html':
        window.onload = initHome();
        break;
    case '/src/html/pullrequest.html':
        window.onload = validarConexao();
        break;
    case '/src/html/config.html':
        window.onload = initConfig();
        break;
    default:
        break;
}

if (document.querySelector('.pointer')) {

    try {
        document.addEventListener('mousemove', (event) => {
            const cursorElement = document.querySelector('.pointer');
            const x = event.clientX;
            const y = event.clientY + window.scrollY;

            cursorElement.style.left = 20 + x + 'px';
            cursorElement.style.top = 10 + y + 'px';
        });
    }
    catch { }
}