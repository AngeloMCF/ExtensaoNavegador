try {
    const version = chrome.runtime.getManifest().version;
    const versionElement = document.getElementById('version')
    versionElement.textContent = typeof (version) == typeof ('v0.0.0') ? version : 'v0.0.0';
}
catch (e) {
    console.error('Erro ao obter a versão da extensão:', e);
}


const btn = document.getElementById('btnSw');
const logo = document.getElementById('logo-img');
var bbtn = document.getElementById("btnSw").addEventListener("click", SwitchTheme);


if (!localStorage.getItem('version')) {
    localStorage.setItem('version', version);
}
else if (localStorage.getItem('version') != version) {
    // console.log('Atualizou versão', localStorage.getItem('version'), '->', version)
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

    switch (new Date().getMonth() /*0-11*/) {
        case 11: // Dezembro
            // reveillon
            if (new Date().getDate() >= 27) {
                imagens.logo_dark = imagens.logo_light = imagens.logo_reveillon
                break;
            }
            imagens.logo_dark = imagens.logo_light = imagens.logo_natal
            break;
        case 9: // Outubro
            imagens.logo_dark = imagens.logo_light = imagens.logo_halloween
            break;
        case 3: // Abril
            imagens.logo_dark = imagens.logo_light = imagens.logo_pascoa
            break;
        case 0: // Janeiro
            // reveillon
            if (new Date().getDate() <= 7) {
                imagens.logo_dark = imagens.logo_light = imagens.logo_reveillon
                break;
            }
            break;
        default:
            break;
    }
}

function forceSwitchTheme() {
    switchMonth();
    SwitchTheme(); // default é dark
    SwitchTheme(); // RTA para corrigir bug de tema
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
        logo.src = imagens.logo_light

    };

    if (themelight) {
        theme = 'dark'
        themelight.id = theme
        btn.innerHTML = 'Dark'
        logo.src = imagens.logo_dark

    };

    localStorage.setItem('color-mode', theme);
    localStorage.getItem('color-mode');
};

if (localTheme == 'light') {
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
            console.log(localStorage.getItem('SuporteUrl'));

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
        // console.log(localStorage.getItem('SuporteUrl'));
    };

}

document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('link-suporte').addEventListener('click', function(event) {
    //     event.preventDefault(); 
    linkSuporte();
    // });
});
