const icons = {
    copy_dark: '../icons/copy-two-paper-sheets-interface-symbol.png',
    copy_light: '../icons/copy.png'
}

try {
    const version = chrome.runtime.getManifest().version;
    const versionElement = document.getElementById('version')
    versionElement.textContent = typeof (version) == typeof ('v0.0.0') ? `v${version}` : 'v0.0.0';
}
catch (e) {
    console.error('Erro ao obter a versão da extensão:', e);
}

const btn = document.getElementById('btnSw');
document.getElementById("btnSw").addEventListener("click", SwitchTheme);

if (!localStorage.getItem('version')) {
    localStorage.setItem('version', version);
}
else if (localStorage.getItem('version') != version) {
    localStorage.setItem('version', version);
    LimpalocalStorage();
}

var localTheme = localStorage.getItem('color-mode');

if (!localTheme) {
    localStorage.setItem('color-mode', 'dark');
    localTheme = localStorage.getItem('color-mode');
};

function LimpalocalStorage() {
    localStorage.clear()
    console.log('Limpa localStorage')
}

function switchMonth() {
    const date = new Date();
    var updateHtml = true;
    var bodyElement = document.body;
    const headElement = document.head;
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';

    const sep = bodyElement.getElementsByClassName('sep')[0];
    const pointer = document.createElement('div');
    pointer.classList.add("pointer");


    switch (date.getMonth() /*0-11*/) {
        case 11: // Dezembro
            // reveillon
            if (date.getDate() >= 27) {
                linkElement.href = '../css/style-reveillon.css';
                bodyElement.setAttribute('id', 'reveillon-' + localTheme);
                bodyElement.setAttribute('class', localTheme);
                break;
            }

            linkElement.href = '../css/style-christmas.css';
            bodyElement.setAttribute('id', 'christmas');
            bodyElement.setAttribute('class', localTheme);

            if (!bodyElement.getElementsByClassName('snowflake')[0]) {
                for (var i = 0; i < 6; i++) {
                    const snowflake = document.createElement('div');
                    snowflake.setAttribute('class', 'snowflake');
                    snowflake.innerHTML = '❄';
                    if (localTheme === 'light') {
                        snowflake.style = "color: var(--color-text)";

                    }
                    sep.append(snowflake);
                };
            }

            break;
        case 9: // Outubro
            linkElement.href = '../css/style-halloween.css';
            bodyElement.setAttribute('id', 'halloween-' + localTheme);
            
            console.log(document.getElementsByClassName('pointer')[0], 'hi')
            if (!document.getElementsByClassName('pointer')[0]){
                pointer.innerHTML = "👻";
                sep.after(pointer)
            }

            // sep.classList.add('pumpkins');

            break;
        case 3: // Abril
            linkElement.href = '../css/style-easter.css';
            bodyElement.setAttribute('id', 'easter-' + localTheme);
            break;
        case 0: // Janeiro
            // reveillon
            if (date.getDate() <= 7) {
                linkElement.href = '../css/style-reveillon.css';
                bodyElement.setAttribute('id', 'reveillon-' + localTheme);
                bodyElement.setAttribute('class', localTheme);
                break;
            }
        default:
            updateHtml = false
            break;
    }

    if (updateHtml) {
        headElement.append(linkElement)
    }
}

/** @deprecated use a loadTheme no lugar */
function forceSwitchTheme() {
    switchMonth();
    SwitchTheme(); // default é dark
    SwitchTheme(); // RTA para corrigir bug de tema
}

function capitalizarPrimeiraLetra(str) {
    if (!str)
        return "";

    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loadTheme() {
    btn.innerHTML = capitalizarPrimeiraLetra(localTheme)
    switchMonth();
}

/**
 * Altera o tema entre LIGHT e DARK
 */
function SwitchTheme() {
    var themedark = document.getElementById('dark');
    var themelight = document.getElementById('light');
    var theme

    // TODO: Corrigir bug de tema, dando erro de id qunado chamdo duas vezes
    // switch (localStorage.getItem('color-mode')) {
    //     case 'dark':
    //         theme = 'light'
    //         elemento = document.getElementById('dark');
    //         elemento.id = 'light';
    //         btn.innerHTML = 'Light'
    //         logo.src = imagens.logo_light

    //         if (debug) { console.log('func SwitchTheme - Dark to Light') };
    //         break;
    //     case 'light':
    //         theme = 'dark'
    //         elemento = document.getElementById('light');
    //         elemento.id = 'dark';
    //         btn.innerHTML = 'Dark'
    //         logo.src = imagens.logo_dark
    //         if (debug) { console.log('func SwitchTheme - Light to dark') };
    //     default:
    //         break;
    // }


    if (themedark) {
        theme = 'light'
        themedark.id = theme
        btn.innerHTML = 'Light'
    };

    if (themelight) {
        theme = 'dark'
        themelight.id = theme
        btn.innerHTML = 'Dark'
    };

    localStorage.setItem('color-mode', theme);
    localTheme = localStorage.getItem('color-mode');
    switchMonth()
};

if (localTheme === 'light') {
    SwitchTheme();
}

function validarConexao() {
    try {
        document.getElementsByClassName('connected')[0].className = navigator.onLine ? 'online' : 'offline'
    }
    catch {
        console.log('Erro ao validar conexão')
    }
}


function Log(dados, values = String('log')) {
    console.log(
        dados, values
    )
}

function linkSuporte() {

    suporteElement = document.querySelector('#link-suporte');

    if (
        (!suporteElement.getAttribute('href') || suporteElement.getAttribute('href') === '#')
        && (SuporteUrl !== '#' || SuporteUrl !== '')
        && SuporteUrl !== suporteElement.getAttribute('href')) {

        if (!localStorage.getItem('SuporteUrl') || localStorage.getItem('SuporteUrl') !== SuporteUrl) {

            if (SuporteUrl.includes('www.')) {
                SuporteUrl = SuporteUrl.replace('www.', 'http://');
                // console.log('Adicionando http:// ao link de suporte', SuporteUrl);
            }

            if (/^\d/.test(SuporteUrl)) {
                // TODO: Adicionar validação de URL
            }

            if (!SuporteUrl.includes('http')) {
                SuporteUrl = 'http://' + SuporteUrl;
            }

            localStorage.setItem('SuporteUrl', SuporteUrl);
        }

        suporteElement.setAttribute('href', SuporteUrl);
        suporteElement.setAttribute('title', SuporteMensagem);
    };

}

function copyToClipBoard(idDoElemento) {

    const elemento = document.getElementById(idDoElemento);

    if (elemento) {
        const texto_tooltip = elemento.getAttribute('data-tooltip');
        navigator.clipboard.writeText(elemento.textContent)
        elemento.setAttribute('data-tooltip', 'Copiado');

        setTimeout(() => {
            elemento.setAttribute('data-tooltip', texto_tooltip);
        }, 2000);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('link-suporte').addEventListener('click', function(event) {
    //     event.preventDefault(); 
    linkSuporte();
    // });
});
