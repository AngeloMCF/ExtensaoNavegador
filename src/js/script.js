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

                var conteudo = document.createElement('div');

                if (lista[i][chave_url]) {

                    conteudo.setAttribute('class', 'grid-item');

                    var link = document.createElement('a');
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
                            var vazio = document.createElement('div');
                            vazio.setAttribute('class', 'grid-item');
                            objt.divContent.append(vazio);
                        };
                    };
                }
                else {
                    if ((["PROD", "HML", "DEV"].includes(chave)
                        || (lista[i].nome && lista[i].textOnly))) {
                        conteudo.setAttribute('class', 'grid-item half-hidden');
                        conteudo.append(document.createElement('p').textContent = lista[i].nome);
                        objt.divContent.append(conteudo);
                    }
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

    // id = btnHome.classList.contains(classActive) ? 'm-wiki' : 'm-home';

    // ids.forEach(id => {
    //     if (id === id) {
    //         document.getElementById(id).classList.remove(classIncative);
    //         document.getElementById(id).classList.add(classActive);
    //     } else {
    //         document.getElementById(id).classList.remove(classActive);
    //         document.getElementById(id).classList.add(classIncative);
    //     }
    // });

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

}


function initHome() {

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

    validarConexao()

    try {
        forceSwitchTheme()
    }
    catch (e) {
        console.log('forceSwitchTheme falhou');
        console.log(e);
    }

    try {
        btnHome.addEventListener('click', switchPage);
        btnWiki.addEventListener('click', switchPage);
    }
    catch (e) {
        console.log('switchPage falhou');
        console.log(e);
    }

};

switch (window.location.pathname) {
    case '/src/html/popup.html':
        window.onload = initHome()
        break;
    case '/src/html/pullrequest.html':
        window.onload = validarConexao()
        break;

    default:
        break;
}
