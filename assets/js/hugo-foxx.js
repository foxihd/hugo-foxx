const getElement = id => document.getElementById(id);
const getElements = selector => document.querySelectorAll(selector);
const a11y = getElement('has-a11y');
const rootSty = document.styleSheets[1].cssRules[0].style;
const bodySty = document.body;
const a11ySty = document.createElement('style');
a11ySty.textContent = `@font-face{font-family:'a11y-ui';src:url(data:font/woff2;base64,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)}
@supports (writing-mode:sideways-lr){body>footer{padding:1rem 1ex 6rem}}#has-a11y-summary,#a11y{position:fixed;bottom:3rem;right:1ex}#a11y{--border:1pt solid var(--fg);display:grid;position:fixed;right:4rem;bottom:3rem;z-index:3;border-radius:9pt;background:var(--bg);padding:1rem;width:max-content;max-width:calc(100vw - 3rem);line-height:1;gap:1pc}#doc-panel{border-top:1pt solid #80808022;border-bottom:1pt solid #80808022;width:var(--golden-ratio);padding:0;display:flex;gap:1ex;margin-top:3.14rem}@media only screen and (max-width:1024px){#a11y{right:1.5rem;bottom:6rem}}#noLocalStorage{margin:auto;max-width:21rem;font-size:1rem}button,input,label{cursor:pointer}#a11y-menu,fieldset{margin:0;border:none;padding:0}menu input,#a11y input[type='checkbox'],#a11y input[type='radio']{position:absolute;clip-path:circle(0)}#a11y-menu,#setColorScheme,#setContrast>div,#setFontSize>label{display:flex;flex-wrap:wrap;justify-content:space-around;width:100%;white-space:nowrap}menu>.has-aria-label,#lightSwitchIndicator,#setContrast{display:flex;position:relative;flex-direction:column-reverse;align-items:center;justify-content:center}#setContrast{flex:1;margin:0 0 0 1ex;border-left:1pt dotted var(--g18);padding-left:1ex}.has-aria-label::before{display:block;font-family:var(--rm),serif;content:attr(aria-label)}menu>.has-aria-label{padding:1pt 1ex;color:var(--fg);font-size:.9rem}#lightSwitchIndicator::after{color:inherit;font-size:1rem}#fontSizeState::after{font-size:.5em;content:'pt'}#has-a11y-summary::before{font-family:'a11y-ui';content:'\\e900'}#setContrast input + label::before{font-family:'a11y-ui';content:'\\e904\\a0'}#setContrast input:checked + label::before{content:'\\e903\\a0'}menu>.has-aria-label::after{font:1.4em 'a11y-ui'}#resetButton::after{content:'\\e90f'}#closeButton::after{content:'\\e913'}#shareButton::after{content:'\\e912'}#printButton::after{content:'\\e90c'}#bionReadButton::before{font:1.2rem 'a11y-ui';content:'\\e901'}.button{border:1pt solid #0000;border-radius:5pt;background:inherit;transition:.1s}#a11y-menu .button{box-shadow:2pt 2pt #0000}#a11y,#a11y-menu .button:hover{border:var(--border);box-shadow:2pt 2pt #80808080}#lightSwitch + label>#lightSwitchIcon{--ray-size:calc(var(--size) * -.4);--offset-orthogonal:calc(var(--size) * .65);--offset-diagonal:calc(var(--size) * .45);transform:scale(.75);--size:1.414em;display:block;outline:none;border-radius:2em;box-shadow:inset 0 0 0 var(--size),calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),var(--offset-orthogonal) 0 0 var(--ray-size),0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),0 var(--offset-orthogonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);width:var(--size);height:var(--size);color:#fa0;content:'';transition:1s}#lightSwitch:checked + label>#lightSwitchIcon{transform:scale(1);box-shadow:inset calc(var(--size) * .33) calc(var(--size) * -.25) 0}#setContrast label{transition:99ms;border-radius:1pc;padding:2pt 7pt 2pt 3pt;font-size:1rem}#setContrast input:checked + label{background:var(--fg);color:var(--bg)}#saveButton{flex:1;border:var(--border)!important;background:inherit;color:var(--fg);font:inherit}#fontSize{accent-color:var(--ac)}#bionReadButton{padding:0 1ex;display:flex;align-items:center;-webkit-transform-origin:left;transform-origin:left}#doc-panel .button:hover,#doc-panel .button:focus,input:checked + #bionReadButton{background:#80808022;-webkit-transform:scale(.8);transform:scale(.8)}
.act > a {color: var(--fg)}.act ~ .act > a, .act .act > a  {color: var(--ac)}
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
<summary id="has-a11y-summary" style="top:unset" aria-labelledby="a11y-label">
  <span id="a11y-label" class="hide">${i18nAppearance}</span>
</summary>
<!-- a11y console -->
<fieldset id="a11y" role="region" aria-label="${i18nAppearance}">
  <!-- setColorScheme -->
  <div id="setColorScheme" role="group" aria-label="${i18nColorsettings}">
    <!-- lightSwitch -->
    <input id="lightSwitch" type="checkbox" onclick="setColor()">
    <label id="lightSwitchIndicator" class="has-desc button" for="lightSwitch" aria-label="${i18nDarkmode}" aria-description="${i18nLight}" style="margin:0;padding:1ex;gap:1ex;min-width:4rem">
        <div id="lightSwitchIcon" aria-hidden="true"></div>
    </label>
    <!-- setContrast -->
    <fieldset id="setContrast">
      <legend style="padding-top:1ex;width:100%;text-align:center;font-size:1rem">${i18nContrast}</legend>
      <div>
        <input id="lessContrast" type="radio" name="setContrast" value="less" onclick="setColor()">
          <label class="button" for="lessContrast"><span>${i18nLesscontrast}</span></label>
        <input id="defaultContrast"type="radio" name="setContrast" value="default" onclick="setColor()">
          <label class="button" for="defaultContrast"><span>${i18nDefaultcontrast}</span></label>
        <input id="moreContrast" class="button" type="radio" name="setContrast" value="more" onclick="setColor()">
          <label class="button" for="moreContrast"><span>${i18nMorecontrast}</span></label>
      </div>
    </fieldset>
  </div>
  <!-- setFontSize -->
  <div id="setFontSize" class="has-aria-label" aria-label="${i18nFontsize}">
    <label style="flex-direction:row-reverse" for="fontSize" aria-label="${i18nFontsize}">
      <input id="fontSize" type="range" min="8" max="12" step="0.5" oninput="setFontSize()" style="flex:1">
      <output id="fontSizeState" for="fontSize" role="status" aria-live="polite" style="width:5rem;text-align:center;color:var(--ac);font-size:2em">10</output>
    </label>
  </div>
  <!-- a11y-menu -->
  <menu id="a11y-menu" class="hide" role="toolbar" aria-label="${i18nMenucontrols}" style="gap:5pt"></menu>
  <!-- noLocalStorage -->
  <center id="noLocalStorage" class="hide" role="alert">${i18nNolocalstorage}</center>
</fieldset>
<div role="presentation" aria-hidden="true" style="position:fixed;top:0;right:0;bottom:0;left:0;backdrop-filter:brightness(96%);" onclick="closeA11y()"></div>
`;

// Close console
const closeA11y = () => a11y.removeAttribute('open');

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

function scheme() {
    return lightSwitch.checked ? 'dark' : 'light';
}

function contrast() {
    return lessContrast.checked 
        ? 'less' 
        : (moreContrast.checked 
            ? 'more' 
            : 'default');
}

function setColor() {
    {{ $lite := site.Params.style.light }}
    {{ $dark := site.Params.style.dark }}
    {{ if site.Params.logo.logomark }}
        const logomark = getElement('logomark');
        const logomarkDark = getElement('logomark--dark');
        if (logomarkDark) {
            logomark.style.display = lightSwitch.checked ? 'none' : 'inline-block';
            logomarkDark.style.display = lightSwitch.checked ? 'inline-block' : 'none';
        }
    {{ end }}
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
    lightSwitchIndicator.setAttribute('aria-description', (lightSwitch.checked ? i18nDark : i18nLight));
    bodySty.setAttribute('data-scheme', (lightSwitch.checked ? 'dark' : 'light'));
    bodySty.setAttribute('style', styles[scheme()][contrast()]);
}

// Font size functions
function setFontSize() {
    fontSizeState.value = fontSize.value;
    rootSty.setProperty('--fontScale', fontSize.value / 10);
}

// Initialize localStorage
function hasLocalStorage() {
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

    // Read settings from localStorage
    if (!localStorage.getItem('scheme') && !localStorage.getItem('contrast')) {
        matchMediaColor();
    } else {
        lightSwitch.checked = localStorage.scheme == 'dark';
        getElement(localStorage.contrast + 'Contrast').checked = true;
        setColor();
    }

    if (localStorage.getItem('fontSize')) {
        fontSize.value = localStorage.fontSize;
        setFontSize();
    }

}

function addEvent(element, event, handler) {
    if (element) {
        if (element.attachEvent) {
            return element.attachEvent('on' + event, handler);
        }
        return element.addEventListener(event, handler, false);
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
    setTimeout(() => rootSty.setProperty('--flashGuard', 'background 1s ease-in'), 99);
});

// DocPanel
const docPanel = getElement('doc-panel');
docPanel.innerHTML = `
<input id="bionReadSwitch" type="checkbox" onclick="bionRead()" aria-label="${i18nBionread}">
<label id="bionReadButton" class="button textssc" for="bionReadSwitch"><b>bion</b>read</label>
<button id="printButton" class="button has-aria-label" onclick="window.print()" aria-label="${i18nPrint}" style="margin-left:auto;" ></button>
<button id="shareButton" class="button has-aria-label" style="display:none;" onclick="navigator.share({title: document.title, url: window.location.href})" aria-label="${i18nShare}"></button>
`
docPanel.removeAttribute('style');

if (navigator.share && location.protocol === 'https:') {
    getElement('shareButton').removeAttribute('style');
}

// BionRead
bionReadSwitch.checked = false;
function bionRead() {
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
                        if (len < 2)
                            return `<b>${word}</b>`;
                        const mid = Math.ceil(len / 2);
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