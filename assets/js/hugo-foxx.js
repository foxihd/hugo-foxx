const getElement = id => document.getElementById(id);
const getElements = selector => document.querySelectorAll(selector);
const a11y = getElement('has-a11y');
const bodySty = document.body;
const docPanel = getElement('doc-panel');
const a11ySty = document.createElement('style');
a11ySty.textContent = `
@font-face {font-family: 'a11y-ui';src: url(data:font/woff2;base64,d09GMgABAAAAAAdMAA8AAAAAEGQAAAbxAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGhgbIByCEgZgAIMwEQgKkCiMMAs+AAE2AiQDeAQgBYNUB4E2GykNUZRQ0tZQHwnV7auYNJJklbac44X/M3jc9O8lwRLqFCq0o+ak0HZzOlOoz0tlYp1K2DzZHNn6xZiZI1/cw8Pn7W1/N9l16wIKNIOA0hEGMgDcJdD1+7V6y7CYaQlEa+n9E3v/ELdkySwkPIuGZKL1IqLToeTOErsueWmMTxwKAAHg7er5I8Dn/xS9g3wTgBYQDRQyQA7PMkpFhnP2NKgxAMgygDqEVB0PDYAgqLPK0RuRY+J4J3QAMkkRwWD896JGnKOmZ9bXBPOttd0RBCMeK1o0DYUYCpFUNAiGnhonSqQYGgpqFCU9AxWWhoqWhpqRQoQosZPRxBkBR+NYSKIaJZ+FZMqa8M0HS6AROUuuuMiIkrLyZ1dQUokWI5ZOCjoekM0UQM38AMAmNBnywZI0gJDIjqls8JWOHiGPtLMksSmAIDybsABaZlQV7UMjbBFjI+yws9MAwqTVnFW+0sn/yTIATJwmLF9pqwHyp7J/ZVjR6SPlMrMBCBqLA2hFACJFiYZNvb84OvH0AIMEiQAgCQAkM0oBgFSARAi5PSobSwIM+CehqCq1BmAbtBsiezRijjgdnB+C/LJOLdWcXQHpQL1AC4oABoCSrIkxUgY00kHAn2KM4tIcuo6JbAJzuyyNJi7/bxaJNYFAZwOhNhi04aT6cNiGuOpCoagWF5PEMWKU4Iw4Li+nDUKoaQvSI0W915caTLk9dTGJPi5KS/xnsAhCwP4kwIqhqmch4gpXPw9zUrDMc9rge1l/LsSK1hOBjmdy9xQeCBhfhJDyUrDoYN7eTmeDZSc5qeJ0uMv5gv0lh8MdXiHEtY8V92BkS51X1LmF+FqPZBjvc+n9X2iRK/XlUPGh/H2dz4XKT82yw7pVm8HxNIjJ4h4gYoEnbxSfAMJTDkKQi5DChEjPCXE9Y6dHQDtWdOvc3Y4hCPDsiPd4OEnifLsNvna9dxcriq6S73yOz2eQcTWMT6ym2xm/826exxO/92pKw/Vn2AGPoBPccAvzK3oxkOveM2PWP/tE1i1ijsh0y/lvZXu9+lOh/H3Hklxe0iR424mv4mpnrAq3QxCwwTQYZoa7nA9v6nbeCJUeCnXeFyq/Fejvf5DrchGv+f68rEtk26RuFyF0vcCK3S8Rl6EJe+xxmZO6NbeLDHbQuANCgvM8N7a2xi3EeyRD/cHAhNF19QeFrObQERNABDSWNNGm5vqsuszlyzPrsuqbmzOCCElYIupMs3jJex8MSrYZKxsbK4225EFPBg0EE5rwRDYFOhQFi+2LuzY977azeKCud6eNW7oOc6jrWtXKuLwhs+UVuzo2jC8YQUG+urZOVcuFb9rQMLKtoSMZn2PvIvaySl2G2aWuFksXaRirK/WyXGXB0OgOv3Nty678sbUx3mp+682ajP7D5f9XrcqofmmDmd/wUnq1Z9X/8oCG6gxVBm9+8y21XYMsr1qZz+fEro3pdhjLDZIkZ+OFzAv3Mx4sW3Y+8/y+fRcy6Cx0c9hm4cu9SpYbBlSnc3iCpAM8NXd6U9RT1ZjtXURrL7GL3d6H97KS7drZk2DEZb1sqDhVYZD13/mL5aJ3i+TiiiKbrejUIKuoriCj/yn/Kbx/nhFs277vpNMo8xx52pv+6qeqvKq8I6NGDNd08jpKq4pQsjrNd+W5pkrTir5bQJPl6eyR6UeEWNdn65aDJ198cCOrm16Rr9DEsbSKVmqVlJJikpjZGT3b55u8SMNbP/xeedzGOxnQ0ebpNspMuZ1s7b3K8bpjdKV5k3LbZIqmKAM9fXmG0t70exK7+KBWET51gaG6dkKPXvMrHEZ/YBR35Ojgik+O5gxrv6lsy9CWDe3+z+C89qVzmOavN6/k9Jw24OeXMyAEf3tKrRm8BeJ5vldTVWfI3m/nS2t6U9V715Ty9sy9FjZkLYJt1JaWzMo8UMqypbkHepTgWqe/IOG9nPe6JgRhAJZkP77Y9+NvY6O6/oav5hhcaZsNcmN8SJsAqF0RQODKAwtjouwCBBikFuiTG4FMyWDAlMEuLIABsBLWhp3coOGlug16qfbRboFQcpWKTwKFuUCjDRhscFTgzHdUUnE7qrGOrc9K8otAigZEJDigMAFoNAOD/R0V9BodlSKtdFTTefF+WVYXOfF4CxSZYyI4L35B0ZyJQJVW480xhdNMeNPQzsC8keL91mk10ywTtZnGhFfMDHc09pAvNk/qf4BmbYZoo8WzyMSAp+1vpyRVEtBXXns2k/FaTVuSa6fZWrUM3mQB0zykeMi1zt1Uwjk28bglB6lAMqhEg9ZbH331098ggw01jEOVarXq1GtIDFEQJVERNdEQlnBEq5ozbaIZBEiBt+zTyWxGHi1oxV6KfTX5UrRIrQA=);}
@supports (writing-mode:sideways-lr){body>footer{padding:1rem 1ex 6rem}}#has-a11y-summary,#a11y{position:fixed;bottom:3rem;right:1ex;}#a11y{--border:1pt solid var(--fg);display:grid;position:fixed;right:4rem;bottom:3rem;z-index:3;border-radius:9pt;background:var(--bg);padding:1rem;width:max-content;max-width:calc(100vw - 3rem);line-height:1;gap:1pc;}#doc-panel{display:flex;margin-top:3.14rem;border-top:1pt solid #80808022;border-bottom:1pt solid #80808022;padding:0;width:var(--golden-ratio);gap:1ex;}@media only screen and (max-width:1024px){#a11y{right:1.5rem;bottom:6rem}}#noLocalStorage{margin:auto;max-width:21rem;font-size:1rem;}button,input,label{cursor:pointer;}#a11y-menu,fieldset{margin:0;border:none;padding:0;}menu input,#a11y input[type='checkbox'],#a11y input[type='radio']{position:absolute;clip-path:circle(0);}#a11y-menu,#setColorScheme,#setContrast>div,#setFontSize>form{display:flex;flex-wrap:wrap;justify-content:space-around;width:100%;white-space:nowrap;}menu>.has-aria-label,#lightSwitchIndicator,#setContrast{display:flex;position:relative;flex-direction:column-reverse;align-items:center;justify-content:center;}#setContrast{flex:1;margin:0 0 0 1ex;border-left:1pt dotted var(--g18);padding-left:1ex;}.has-aria-label::before{display:block;font-family:var(--rm),serif;content:attr(aria-label);}menu>.has-aria-label{padding:3pt 1ex 1pt;color:var(--fg);font-size:.9rem;gap:2pt;}#lightSwitchIndicator::after{color:inherit;font-size:1rem;}#fontSizeState::after{font-size:.5em;content:'pt';}#has-a11y-summary::before{font-family:'a11y-ui';content:'\\e900';}#setContrast input + label::before{font-family:'a11y-ui';content:'\\e904\\a0';}#setContrast input:checked + label::before{content:'\\e903\\a0';}menu>.has-aria-label::after{font:1.4em 'a11y-ui';}#resetButton::after{content:'\\e90f';}#closeButton::after{content:'\\e913';}#shareButton::after{content:'\\e912';}#printButton::after{content:'\\e90c';}#bionReadButton::before{font:1.2rem 'a11y-ui';content:'\\e901';}.button{transition:.1s;border:1pt solid #0000;border-radius:5pt;background:inherit;}#a11y-menu .button{box-shadow:2pt 2pt #0000;}#a11y,#a11y-menu .button:hover{border:var(--border);box-shadow:2pt 2pt #80808080;}#lightSwitch + label>#lightSwitchIcon{--ray-size:calc(var(--size) * -.4);--offset-orthogonal:calc(var(--size) * .65);--offset-diagonal:calc(var(--size) * .45);transform:scale(.75);--size:1.414em;display:block;outline:none;border-radius:2em;box-shadow:inset 0 0 0 var(--size),calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),var(--offset-orthogonal) 0 0 var(--ray-size),0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),0 var(--offset-orthogonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);width:var(--size);height:var(--size);color:#fa0;content:'';transition:1s;}#lightSwitch:checked + label>#lightSwitchIcon{transform:scale(1);box-shadow:inset calc(var(--size) * .33) calc(var(--size) * -.25) 0;}#setContrast label{display:inline-flex;align-items:baseline;transition:99ms;border-radius:1pc;padding:2pt 5pt 2pt 3pt;font-size:1rem;}#setContrast input:checked + label{background:var(--fg);color:var(--bg);}#saveButton{flex:1;border:var(--border)!important;background:inherit;padding-top:.7ex;color:var(--fg);font:inherit;}#fontSize{accent-color:var(--ac);}#bionReadButton{display:flex;align-items:center;-webkit-transform-origin:left;transform-origin:left;padding:0 1ex;}#doc-panel .button:hover,#doc-panel .button:focus,input:checked + #bionReadButton{-webkit-transform:scale(.8);transform:scale(.8);background:#80808022;}#doc-panel button{padding:4pt 1ex 1pt;}.article + #doc-panel{width:unset}
.act > a {color: var(--ac)}.act ~ .act > a, .act .act > a  {color: var(--fg)}
body[data-flash=reduced]{--flashGuard: background 1s ease-in}
body[data-scheme=dark] {--y6a:#bf97b4;--w8u:#81b31e;--s8i:#ee819e;--n8e:#93a1c8;--m4i:#7fad90;--y4i:#ec838c;--f8a:#a19dcd;--s4n:#06abfe;--d3u:#ba9d8c;--r6a:#b6a63a;--y4a:#75a7e1;--k8i:#f0870f;--y6i:#00b3db;--o5a:#d98ca2;--c3u:#a9a0b6;--s5o:#81a7c5;--s5e:#ab98d7;--y7i:#00b1dd;--i3i:#f57f8b;--t9u:#01bc4c}
`
document.head.appendChild(a11ySty);

// Enable accessibility settings when JavaScript is permitted
a11y.classList.remove('hide');

// Render a11y element
const {
    i18nAppearance,
    i18nColorsettings,
    i18nDarkmode,
    i18nLight,
    i18nDark,
    i18nContrast,
    i18nLesscontrast,
    i18nDefaultcontrast,
    i18nMorecontrast,
    i18nFontsize,
    i18nMenucontrols,
    i18nSave,
    i18nReset,
    i18nClose,
    i18nNolocalstorage,
    i18nBionread,
    i18nPrint,
    i18nShare
} = a11y.dataset;
a11y.innerHTML = `
<summary id="has-a11y-summary" style="top:unset" aria-labelledby="a11y-label"><span id="a11y-label" class="hide">${i18nAppearance}</span></summary>
<fieldset id="a11y" role="region" aria-label="${i18nAppearance}">
  <div id="setColorScheme" role="group" aria-label="${i18nColorsettings}">
    <input id="lightSwitch" type="checkbox" onclick="setColor()"><label id="lightSwitchIndicator" class="has-desc button" for="lightSwitch" aria-label="${i18nDarkmode}" aria-description="${i18nLight}" style="margin:0;padding:1ex;gap:1ex;min-width:4rem"><div id="lightSwitchIcon" aria-hidden="true"></div></label>
    <fieldset id="setContrast">
      <legend style="padding-top:1ex;width:100%;text-align:center;font-size:1rem">${i18nContrast}</legend>
      <form onclick="setColor()">
        <input id="lessContrast" type="radio" name="setContrast" value="less"><label class="button" for="lessContrast"><span>${i18nLesscontrast}</span></label>
        <input id="defaultContrast"type="radio" name="setContrast" value="default"><label class="button" for="defaultContrast"><span>${i18nDefaultcontrast}</span></label>
        <input id="moreContrast" class="button" type="radio" name="setContrast" value="more"><label class="button" for="moreContrast"><span>${i18nMorecontrast}</span></label>
      </form>
    </fieldset>
  </div>
  <div id="setFontSize" class="has-aria-label" aria-label="${i18nFontsize}">
    <form style="flex-direction:row-reverse" oninput="setFontSize()">
      <input id="fontSize" type="range" min="8" value="10" max="12" step="0.5" aria-label="${i18nFontsize}" style="flex:1">
      <output id="fontSizeState" for="fontSize" role="status" aria-live="polite" style="width:5rem;text-align:center;color:var(--ac);font-size:2em">10</output>
    </form>
  </div>
  <menu id="a11y-menu" class="hide" role="toolbar" aria-label="${i18nMenucontrols}" style="gap:5pt"></menu>
  <div id="noLocalStorage" class="hide" role="alert">${i18nNolocalstorage}</div>
</fieldset>
<div role="presentation" aria-hidden="true" style="position:fixed;top:0;right:0;bottom:0;left:0;backdrop-filter:brightness(96%);" onclick="closeA11y()"></div>
`;

// Close console
const closeA11y = () => a11y.removeAttribute('open');

// event handler
const addEvent  = (element, event, handler) => {
    if (element) {
        if (element.attachEvent) {
            return element.attachEvent('on' + event, handler);
        }
        return element.addEventListener(event, handler, false);
    }
}

// Color scheme and contrast functions
const matchMediaColor = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        lightSwitchIndicator.setAttribute('aria-description', i18nDark);
        lightSwitch.checked = true;
    }
    if (window.matchMedia('(prefers-contrast: more)').matches) {
        moreContrast.checked = true;
    } else if (window.matchMedia('(prefers-contrast: less)').matches) {
        lessContrast.checked = true;
    } else {
        defaultContrast.checked = true;
    }
}

const scheme = () => {
    return lightSwitch.checked ? 'dark' : 'light';
}

const contrast = () => {
    return lessContrast.checked 
        ? 'less' 
        : (moreContrast.checked 
            ? 'more' 
            : 'default');
}

{{ $lite := site.Params.style.light }}
{{ $dark := site.Params.style.dark }}
const styles = {
    light: {
        default: '--off: #000; --ac: {{ or $lite.ac "#800000" }}; --bg: {{ or $lite.bg "#f9f9f9" }}; --fg: {{ or $lite.fg "#111" }}; --mid:{{ or $lite.mid "#545454" }};',
        less: '--off: #000; --ac: {{ or $lite.less.ac $lite.ac "#800000" }}; --bg: {{ or $lite.less.bg "#e7e2e2" }}; --fg: {{ or $lite.less.fg "#13253d" }}; --mid:{{ or $lite.less.mid "#444850" }};',
        more: '--off: #000; --ac: {{ or $lite.more.ac $lite.ac "#800000" }}; --bg: {{ or $lite.more.bg "#fff" }}; --fg: {{ or $lite.more.fg "#000" }}; --mid:{{ or $lite.more.mid "#595959" }};'
    },
    dark: {
        default: '--off: #fff; --ac: {{ or $dark.ac "#d5ad2a" }}; --bg: {{ or $dark.bg "#111" }}; --fg: {{ or $dark.fg "#f9f9f9" }}; --mid:{{ or $dark.mid "#9e9e9e" }};',
        less: '--off: #fff; --ac: {{ or $dark.less.ac $dark.ac "#d5ad2a" }}; --bg: {{ or $dark.less.bg "#13253d" }}; --fg: {{ or $dark.less.fg "#e7e2e2" }}; --mid:{{ or $dark.less.mid "#acafb9" }};',
        more: '--off: #fff; --ac: {{ or $dark.more.ac $dark.ac "#d5ad2a" }}; --bg: {{ or $dark.more.bg "#000" }}; --fg: {{ or $dark.more.fg "#fff" }}; --mid:{{ or $dark.more.mid "#969696" }};'
    }
};

const setColor = () => {
    bodySty.setAttribute('style', styles[scheme()][contrast()]);
    {{ if site.Params.logo.logomark }}
        const logomark = getElement('logomark');
        const logomarkDark = getElement('logomark--dark');
        if (logomarkDark) {
            logomark.style.display = lightSwitch.checked ? 'none' : 'inline-block';
            logomarkDark.style.display = lightSwitch.checked ? 'inline-block' : 'none';
        }
    {{ end }}
    lightSwitchIndicator.setAttribute('aria-description', (lightSwitch.checked ? i18nDark : i18nLight));
    bodySty.setAttribute('data-scheme', (lightSwitch.checked ? 'dark' : 'light'));
}

// Font size functions
const setFontSize = () => {
    fontSizeState.value = fontSize.value;
    document.styleSheets[1].cssRules[0].style.setProperty('--fontScale', fontSize.value / 10);
}

// Read settings from localStorage
if (!localStorage.getItem('scheme') && !localStorage.getItem('contrast')) {
    matchMediaColor();
} else {
    bodySty.setAttribute('style', styles[localStorage.scheme][localStorage.contrast]);
    lightSwitch.checked = localStorage.scheme == 'dark';
    getElement(localStorage.contrast + 'Contrast').checked = true;
    setColor();
}

if (localStorage.getItem('fontSize')) {
    fontSize.value = localStorage.fontSize;
    setFontSize();
}

// Initialize localStorage
const hasLocalStorage = () => {
    try {
        localStorage.is = 'enable';
        localStorage.removeItem('is');
        return true;
    } catch(e) {
        defaultContrast.checked = true;
        getElement('noLocalStorage').className = '';
        return false;
    };
}

if (hasLocalStorage()) {
    getElement('a11y-menu').className = '';
    getElement('a11y-menu').innerHTML = `
<button id="saveButton"  class="button" onclick="saveA11y()">${i18nSave}</button>
<button id="resetButton" class="button has-aria-label" onclick="resetA11y()" aria-label="${i18nReset}"></button>
<button id="closeButton" class="button has-aria-label" onclick="closeA11y()" aria-label="${ i18nClose}"></button>
    `;
    // Reset function
    function resetA11y() {
        localStorage.clear();
        matchMediaColor();
        fontSize.value = '';
        setTimeout(() => window.location.reload(), 100);
    }

    // Save function
    function saveA11y() {
        setTimeout(() => closeA11y(), 618);
        localStorage.scheme = scheme();
        localStorage.contrast = contrast();
        localStorage.fontSize = fontSize.value;
    }

}

// toc
addEvent(document, 'DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
            document.querySelector(`#toc a[href="#${id}"]`).parentNode.className = 'act';
        } else {
            document.querySelector(`#toc a[href="#${id}"]`).parentNode.className = '';
        }
        });
    });
    if (getElement('toc')) {
        getElements('h2[id], h3[id]').forEach((h) => {
            observer.observe(h);
        });
    }
});

// Flash guard
addEvent(document, 'DOMContentLoaded', () => {
    setTimeout(() => bodySty.setAttribute('data-flash', 'reduced'), 99);
});

{{ if site.Params.enableBionRead -}}
// DocPanel
if (docPanel) {
    const bionRead = () => {
        const safeElements = getElements('[data-bionRead-safe]');
        const mainContent = getElement('content');
        if (mainContent) {
            document.body.insertAdjacentHTML(
                'beforeend',
                '<div id="snapshot" class="hide" hidden></div>');
        }
        const snapshot = getElement('snapshot');
        if (bionReadSwitch.checked) {
            snapshot.innerHTML = mainContent.innerHTML;
            safeElements.forEach(element => {
                const targetElements = element.querySelectorAll('h1, h2, h3, h4, h5, p, a, li, blockquote');
                targetElements.forEach(el => {
                    const textWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
                    const textNodes = [];
                    let indexNode;
                    while (indexNode = textWalker.nextNode()) {
                        textNodes.push(indexNode);
                    }
                    textNodes.forEach(textNode => {
                        const fragment = document.createDocumentFragment();
                        const scratch = document.createElement('span');
                        const words = textNode.textContent.split(' ');
                        scratch.innerHTML = words.map(word => {
                            if (!word.trim())
                                return;
                            const len = word.length;
                            const mid = Math.ceil(len / 2);
                            if (len === 2)
                                return `<b>${word}</b>`;
                            return `<span><b>${word.slice(0, mid)}</b>${word.slice(mid)}</span>`;
                        }).join(' ');
                        while (scratch.firstChild) {
                            fragment.appendChild(scratch.firstChild);
                        }
                        textNode.parentNode.replaceChild(fragment, textNode);
                    });
                });
            });
        } else {
            mainContent.innerHTML = snapshot.innerHTML;
            snapshot.innerHTML = '';
        }
    }

    // render docPanel

    docPanel.innerHTML = `
<input id="bionReadSwitch" type="checkbox" onclick="bionRead()" aria-label="${i18nBionread}"><label id="bionReadButton" class="button textssc" for="bionReadSwitch"><b>bion</b>read</label>
<button id="printButton" class="button has-aria-label" onclick="window.print()" aria-label="${i18nPrint}" style="margin-left:auto; display:none;"></button>
<button id="shareButton" class="button has-aria-label" style="display:none;" onclick="navigator.share({title: document.title, url: window.location.href})" aria-label="${i18nShare}"></button>
`
    docPanel.removeAttribute('style');
    bionReadSwitch.checked = false;

    // show when API supported
    if (window.print) {
        getElement('printButton').style.removeProperty('display');
    }

    if (navigator.share && location.protocol === 'https:') {
        getElement('shareButton').removeAttribute('style');
    }
}
{{ end }}