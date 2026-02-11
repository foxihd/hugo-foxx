const getElement = id => document.getElementById(id);
const getElements = selector => document.querySelectorAll(selector);
function addEvent(element, event, handler) {
    if (element) {
        if (element.attachEvent) {
            return element.attachEvent('on' + event, handler);
        }
        return element.addEventListener(event, handler, false);
    }
}

addEvent(document, 'DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
            document.querySelector(`#toc a[href="#${id}"]`).setAttribute('style', 'color:var(--fg)');
        } else {
            document.querySelector(`#toc a[href="#${id}"]`).removeAttribute('style');
        }
        });
    });
    if (getElement('toc')) {
        getElements('h2[id], h3[id]').forEach((h) => {
            observer.observe(h);
        });
    }
});

// 
// constant block
const bodySty = document.body;
const htmlSty = document.documentElement.style;
const a11ySty = document.createElement('style');
const a11y = getElement('has-a11y');
const {
    i18nAccessibility,
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
    i18nNolocalstorage
} = a11y.dataset;

a11ySty.textContent = `@font-face{font-family: 'a11y-ui'; src: url(data:font/woff2;base64,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)}
@supports (writing-mode:sideways-lr){body>footer{padding:1rem 1ex 6rem}}#has-a11y-summary,#a11y{position:fixed;bottom:3rem;right:1ex}#has-a11y[open] summary{color:var(--ac);animation:blinking 3s step-end infinite}#a11y{--border:1pt solid var(--fg);display:grid;position:fixed;right:3.2rem;bottom:3rem;border-radius:9pt;background:var(--bg);padding:1rem;width:max-content;max-width:calc(100vw - 3rem);line-height:1;gap:1pc}@media only screen and (max-width:1024px){#a11y{right:1.5rem;bottom:6rem}}#noLocalStorage{margin:auto;max-width:21rem;font-size:1rem}button,input,label{cursor:pointer}#a11y-menu,fieldset{margin:0;border:none;padding:0}#a11y input[type='checkbox'],#a11y input[type='radio']{position:absolute;clip-path:circle(0)}#a11y-menu,#setColorScheme,#setContrast>div,#setFontSize>label{display:flex;flex-wrap:wrap;justify-content:space-around;width:100%;white-space:nowrap}#a11y-menu>.has-aria-label,#lightSwitchIndicator,#setContrast{display:flex;position:relative;flex-direction:column-reverse;align-items:center;justify-content:center}#setContrast{flex:1;margin:0 0 0 1ex;border-left:1pt dotted var(--g18);padding-left:1ex}.has-aria-label::before{display:block;font-family:var(--rm),serif;content:attr(aria-label)}#a11y-menu>.has-aria-label{background:inherit;padding:1pt 1ex;color:var(--fg);font-size:.9rem}#lightSwitchIndicator::after{color:inherit;font-size:1rem}#fontSizeState::after{font-size:.5em;content:'pt'}#has-a11y-summary::before{font-family:'a11y-ui';content:'\\e901'}#setContrast input + label::before{font-family:'a11y-ui';content:'\\e904\\a0'}#setContrast input:checked + label::before{content:'\\e903\\a0'}#resetButton::after{font:1.4em 'a11y-ui';content:'\\e90f'}#closeButton::after{font:1.4em 'a11y-ui';content:'\\e913'}.button{border:1pt solid #0000;border-radius:5pt;box-shadow:2pt 2pt #0000}#a11y,.button:hover{border:var(--border);box-shadow:2pt 2pt #80808080}#lightSwitch + label>#lightSwitchIcon{--ray-size:calc(var(--size) * -.4);--offset-orthogonal:calc(var(--size) * .65);--offset-diagonal:calc(var(--size) * .45);transform:scale(.75);--size:1.414em;display:block;outline:none;border-radius:2em;box-shadow:inset 0 0 0 var(--size),calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),var(--offset-orthogonal) 0 0 var(--ray-size),0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),0 var(--offset-orthogonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);width:var(--size);height:var(--size);color:#fa0;content:'';transition:1s}#lightSwitch:checked + label>#lightSwitchIcon{transform:scale(1);box-shadow:inset calc(var(--size) * .33) calc(var(--size) * -.25) 0}#setContrast label{transition:99ms;border-radius:1pc;padding:2pt 7pt 2pt 3pt;font-size:1rem}#setContrast input:checked + label{background:var(--fg);color:var(--bg)}#saveButton{flex:1;border:var(--border)!important;background:inherit;color:var(--fg);font-family:initial}`
document.head.appendChild(a11ySty);

// Enable accessibility settings when JavaScript is permitted
a11y.classList.remove('hide');

// Render a11y element

a11y.innerHTML = `
<summary id="has-a11y-summary" accesskey="a" aria-keyshortcuts="a">
  <span class="hide">${i18nAccessibility}</span>
</summary>
<!-- a11y console -->
<fieldset id="a11y" role="region" aria-label="${i18nAccessibility}">
  <!-- setColorScheme -->
  <div id="setColorScheme" role="group" aria-label="${i18nColorsettings}">
    <!-- lightSwitch -->
    <input id="lightSwitch" type="checkbox" onclick="setColor()">
    <label id="lightSwitchIndicator" class="has-desc button" for="lightSwitch" aria-label="${i18nDarkmode}" aria-description="${i18nLight}" style="padding:1ex;gap:1ex;min-width:4rem">
        <div id="lightSwitchIcon" aria-hidden="true"></div>
    </label>
    <!-- setContrast -->
    <fieldset id="setContrast">
      <legend style="margin:1ex auto;font-size:1rem">${i18nContrast}</legend>
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
<div class="screening" role="presentation" aria-hidden="true" onclick="closeA11y()"></div>
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
};

{{ $lite := site.Params.style.light }}
{{ $dark := site.Params.style.dark }}

function setColor() {
    const styles = {
        light: {
            default: '--off: #000; --ac: {{ or $lite.ac "#800000" }}; --bg: {{ or $lite.bg "#f9f9f9" }}; --fg: {{ or $lite.fg "#111" }}; --mid:{{ or $lite.mid "gray" }};',
            less: '--off: #000; --ac: {{ or $lite.less.ac $lite.ac "#800000" }}; --bg: {{ or $lite.less.bg "#e7e2e2" }}; --fg: {{ or $lite.less.fg "#13253d" }}; --mid:{{ or $lite.less.mid "#7d8490" }};',
            more: '--off: #000; --ac: {{ or $lite.more.ac $lite.ac "#800000" }}; --bg: {{ or $lite.more.bg "#fff" }}; --fg: {{ or $lite.more.fg "#000" }}; --mid:{{ or $lite.more.mid "gray" }};'
        },
        dark: {
            default: '--off: #111; --ac: {{ or $dark.ac "#b49123" }}; --bg: {{ or $dark.bg "#111" }}; --fg: {{ or $dark.fg "#f9f9f9" }}; --mid:{{ or $dark.mid "gray" }};',
            less: '--off: #fff; --ac: {{ or $dark.less.ac $dark.ac "#b49123" }}; --bg: {{ or $dark.less.bg "#13253d" }}; --fg: {{ or $dark.less.fg "#e7e2e2" }}; --mid:{{ or $dark.less.mid "#7d8490" }};',
            more: '--off: #fff; --ac: {{ or $dark.more.ac $dark.ac "#b49123" }}; --bg: {{ or $dark.more.bg "#000" }}; --fg: {{ or $dark.more.fg "#fff" }}; --mid:{{ or $dark.more.mid "gray" }};'
        }
    };
    const contrast = lessContrast.checked ? 'less' : (moreContrast.checked ? 'more' : 'default');
    const scheme = lightSwitch.checked ? 'dark' : 'light';
    const logomark = getElement('logomark');
    const logomarkDark = getElement('logomark--dark');
    if (logomarkDark) {
        logomark.style.display = lightSwitch.checked ? 'none' : 'inline-block';
        logomarkDark.style.display = lightSwitch.checked ? 'inline-block' : 'none';
    }
    lightSwitchIndicator.setAttribute('aria-description', (lightSwitch.checked ? i18nDark : i18nLight));
    bodySty.setAttribute('style', styles[scheme][contrast]);
};

// Flash guard
addEvent(document, 'DOMContentLoaded', () => {
    setTimeout(() => htmlSty.setProperty('--flashGuard', 'background 1s ease-in'), 99);
});


// Font size functions
function setFontSize() {
    fontSizeState.value = fontSize.value;
    htmlSty.setProperty('--fontScale', fontSize.value / 10);
};

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
};

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
    };

    // Save function
    function saveA11y() {
        setTimeout(() => closeA11y(), 618);
        localStorage.scheme = lightSwitch.checked ? 'dark' : 'light';
        localStorage.contrast = lessContrast.checked ? 'less' : (moreContrast.checked ? 'more' : 'default');
        localStorage.fontSize = fontSize.value;
    };

    // Read settings from localStorage

    if (!localStorage.getItem('scheme') && !localStorage.getItem('contrast')) {
        matchMediaColor();
    } else {
        lightSwitch.checked = localStorage.scheme !== 'light';
        setColor();
    }

    if (localStorage.getItem('fontSize')) {
        fontSize.value = localStorage.fontSize;
        setFontSize();
    }

}