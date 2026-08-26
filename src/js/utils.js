const icons = {
    copy_dark: '../icons/copy-two-paper-sheets-interface-symbol.png',
    copy_light: '../icons/copy.png'
};

let localTheme = localStorage.getItem('color-mode');

if (!localTheme) {
    localStorage.setItem('color-mode', 'dark');
    localTheme = localStorage.getItem('color-mode');
};


let logoImage = localTheme === 'light' ? imagens.logo_light : imagens.logo_dark
const root = document.documentElement;

let carnavalDate = new Date(easterDate);
carnavalDate.setDate(easterDate.getDate() - 46); // cai na quarta de cinzas
carnavalDate.setHours(12);

let carnvalStartDate = new Date(carnavalDate);
carnvalStartDate.setDate(carnvalStartDate.getDate() - carnavalDays);
carnvalStartDate.setHours(0);

try {
    const version = chrome.runtime.getManifest().version ?? localStorage.getItem('version');
    const versionElement = document.getElementById('version');
    versionElement.textContent = typeof (version) == typeof ('v0.0.0') ? `v${version}` : 'v0.0.0';

    if (!localStorage.getItem('version')) {
        localStorage.setItem('version', version);
    }
    else if (localStorage.getItem('version') != version) {
        localStorage.setItem('version', version);
    };
}
catch (e) {
    console.error('Erro ao obter a versão da extensão:', e);
}

const btn = document.getElementById('btnSw');
document.getElementById("btnSw").addEventListener("click", SwitchTheme);

function LimpalocalStorage() {

    if (debug) {
        console.table(localStorage);
        console.log(localStorage.getItem('version'));
    }

    localStorage.clear();

    if (debug) { console.log('Limpa localStorage'); };

    window.location.reload();
}


function addCSS() {
    if (cssAdicionar) {
        for (css in cssAdicionar) {
            let cssHeadLink = document.createElement('link');
            cssHeadLink.rel = 'stylesheet'
            cssHeadLink.type = 'text/css'
            cssHeadLink.href = `../css/${cssAdicionar[css]}`

            document.head.append(cssHeadLink)
        }
    }
}

function setLogoTheme(theme = '') {

    let logoGenericKey = 'logo_' + theme
    let logoDarkKey = logoGenericKey + '_dark'
    let logoLightKey = logoGenericKey + '_light'

    function applyLogo(image_path = '') {
        root.style.setProperty('--url-logo', `url(${image_path})`)
    }

    if (imagens[logoDarkKey] && localTheme === 'dark') {
        applyLogo(imagens[logoDarkKey])
    }
    else if (imagens[logoLightKey] && localTheme === 'light') {
        applyLogo(imagens[logoLightKey])
    }
    else if (imagens[logoGenericKey]) {
        applyLogo(imagens[logoGenericKey])
    }
}


function apllyTheme(theme) {

    let updateHtml = true;
    var bodyElement = document.body;
    const linkElement = document.createElement('link');
    const headElement = document.head;


    const sep = bodyElement.getElementsByClassName('sep')[0];
    const pointer = document.createElement('div');
    pointer.classList.add("pointer");

    linkElement.id = 'comemorative';
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';

    switch (theme) {
        case 'christmas':
            linkElement.href = '../css/style-christmas.css';
            bodyElement.setAttribute('id', 'christmas-' + localTheme);

            // TODO: fix me, for some reason when open, snowflake[1,2,3,4,5] don't fall correctly.
            // this setTimeout fix it but isn't right
            // 
            setTimeout(() => {
                if (!bodyElement.getElementsByClassName('snowflake')[0]) {
                    for (var i = 0; i < 6; i++) {
                        let snowflake = document.createElement('div');
                        snowflake.setAttribute('class', 'snowflake');
                        snowflake.innerHTML = '❄';
                        if (localTheme === 'light') {
                            snowflake.style = "color: var(--color-text)";
                        };
                        sep.append(snowflake);
                    };
                };
            }, 100);
            
            break;
        case 'halloween':
            linkElement.href = '../css/style-halloween.css';
            bodyElement.setAttribute('id', 'halloween-' + localTheme);

            if (!document.getElementsByClassName('pointer')[0]) {
                pointer.innerHTML = "👻";
                sep.after(pointer);
            };

            // sep.classList.add('pumpkins');

            break;
        case 'easter':
            linkElement.href = '../css/style-easter.css';
            bodyElement.setAttribute('id', 'easter-' + localTheme);

            break;
        case 'reveillon':
            linkElement.href = '../css/style-reveillon.css';
            bodyElement.setAttribute('id', 'reveillon-' + localTheme);

            break;
        case 'carnaval':
            linkElement.href = '../css/style-carnaval.css';
            bodyElement.setAttribute('id', 'carnaval');
            startConfetti();

            break;
        default:
            updateHtml = false;
            break;
    }


    if (updateHtml) {
        headElement.setAttribute('class', localTheme);
        headElement.append(linkElement);
        setLogoTheme(theme);
    };

}

function switchMonth() {
    let date = new Date();

    addCSS()

    if (document.getElementById('comemorative')) {
        document.getElementById('comemorative').remove()
    }

    let datePlus7 = new Date(date);
    datePlus7.setDate(datePlus7.getDate() + 7);
    let dateMinus7 = new Date(date);
    dateMinus7.setDate(dateMinus7.getDate() - 7);

    if (localStorage.getItem('force') !== null) {
        apllyTheme(localStorage.getItem('force'));
    }
    else {
        switch (date.getMonth() /*0-11*/) {
            case 11: // Dezembro
                // reveillon
                if (date.getDate() >= 27) {
                    apllyTheme('reveillon');
                    break;
                };
                apllyTheme('christmas');
                break;
            case 9: // Outubro
                apllyTheme('halloween');
                break;
            case 0: // Janeiro
                // reveillon
                if (date.getDate() <= 7) {
                    apllyTheme('reveillon')
                };
                break;
            default:
                // carnval
                if (
                    Boolean(parseInt(localStorage.getItem('theme-Carnaval')))
                    && date >= carnvalStartDate && date <= carnavalDate
                ) {
                    apllyTheme('carnaval');
                    break;
                }
                // pascoa
                else if (easterDate >= dateMinus7 && easterDate <= datePlus7) {
                    apllyTheme('easter');
                    break;
                };

                root.style.setProperty('--url-logo', `url(${logoImage})`)
                break;
        }
    }

    if (document.querySelector('.pointer')) {
        document.addEventListener('mousemove', (event) => {

            let cursorElement = document.querySelector('.pointer');
            let xPosition = event.clientX;
            let yPosition = event.clientY + window.scrollY;

            cursorElement.style.left = `${xPosition > 0 ? 20 + xPosition : - 30}px`;
            cursorElement.style.top = `${yPosition > 0 ? 10 + yPosition : - 30}px`;


        }, { signal: controller.signal });
    }

};

const controller = new AbortController();


function capitalizarPrimeiraLetra(str) {
    if (!str) return "";

    return str.charAt(0).toUpperCase() + str.slice(1);
};


function loadTheme() {
    btn.innerHTML = capitalizarPrimeiraLetra(localTheme);
    switchMonth();
};


/**
 * Altera o tema entre LIGHT e DARK
 */
function SwitchTheme() {
    var themedark = document.getElementById('dark');
    var themelight = document.getElementById('light');
    var theme;

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
        console.error('Erro ao validar conexão')
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

function habilitarConfig() {
    let doomConfig = document.getElementById('config');

    if (doomConfig && !habilitarConfiguracoes) {
        doomConfig.setAttribute('class', 'hidden')
    }
}

function createConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    /*TODO: feat mudar para config generica */
    const colors = [
        "#ff0",
        "#f0f",
        "#0ff",
        "#0f0",
        "#f00",
        "#00f"];

    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    confetti.style.left = Math.random() * window.innerWidth + "px";

    const duration = (Math.random() * 3) + 2;
    confetti.style.animationDuration = duration + "s";

    const size = Math.random() * 3 + 1;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 3000);
}


function startConfetti() {
    np = parseInt(localStorage.getItem('numeroParticulas'));

    if (np > 0) {

        for (let i = 0; i < np; i++) {
            createConfetti();
        }

        setTimeout(() => {
            startConfetti();
        }, 500);
    }
}
function removeCustomElement() {

    // Christmas
    elementsRemove = document.body.querySelectorAll('.snowflake')

    if (elementsRemove) {

        elementsRemove.forEach(element => {
            element.classList.remove('snowflake')
            element.textContent = ''
        });
    }
    // end Christmas

    // pointer
    if (document.querySelector('.pointer')) {
        controller.abort()
        document.querySelector('.pointer').remove()
    }
    // end pointer
}

function initUtil() {
    linkSuporte();
    habilitarConfig();

}

window.onload = initUtil()