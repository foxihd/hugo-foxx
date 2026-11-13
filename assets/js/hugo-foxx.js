const getElement = id => document.getElementById(id);
const getElements = selector => document.querySelectorAll(selector);
const addEvent  = (element, event, handler) => {
    if (element) {
        if (element.attachEvent) {
            return element.attachEvent('on' + event, handler);
        }
        return element.addEventListener(event, handler, false);
    }
}
const doc = getElement('doc-panel');
const sty = document.createElement('style');
sty.textContent = `
@font-face{font-family:"a11y-ui";src:url(data:font/woff2;base64,d09GMgABAAAAAAP0AA8AAAAACdwAAAObAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGhgbIByBHgZgAIMkEQgKhRSEAAssAAE2AiQDVAQgBYNUB3wbGwhRlE/OISC+ODDPZzoRKoRtGiGdhIPxZGHE42lvqfkunLoTz9Pv9/u17zmISaZ5JlkVbQyVFGhQxRKhvlIIiUb6ln++/vN6fecmL5gkM/5rD17mm6qWLsFK7raGmladM32rv0duuNv1PxQ54InL8S/8DfytKZA/SbYHLosWZT+oZQEGFGZvD9peQn+JRlG8hTR1OhBLD3EGurSLjwyG4OFMCPB9fOkb/Fr8+N2sAwbBKNOAultAv022oNum0X6oGNCCEpYtIhWEIMLqUVEqbLddHU3wgAACgmEgVCQfY7NLqFSEcVJpDDoblURBGBeJjUbnQBg3iYVOqtT6Ag/CyKzsPMRyKQ+6oHlsvgD3YT/5h2AsAFtGKWUX/kyU6v+5Xq5wHQEAq1RQQAGLCPCmILCIWcY4B5GAbNNl9A8xuNsBq5r007Dr97cHZkbXygDCBcbtAKw5BEIkkUEPFdBHozNYwTA7BzcPkG4gBYA0gAacUqD6r+jqhtIL9PUDDAxaYRtxwDMa1DICmAKsgWnQwQ+ACiAgJikQESpwNVHf3r+uhhWSbUpYH9BSufHZYumAc2yH15ynpbVfDSyPLxH5C7q9gvNZz+FbgNUOeEdrPPwOWHyvY/Gzbj3ylejIR6KlD9qgFcbAkbhXWIx9qR2Ofy2QbI4NE97oR+JaLoeLuI2XsLiu6YVOcBS4W72ffc3GNn/0QWazPalRx0/FFhSp5W2q7N6fN5qrjS061nGwWkBJLStXypjMiWOXl18G1W/W/F/r44i1/9d8zfffm5dPb2Ki9/GRjGjyZD6+9hi/zpmhO3kQWc5TNq5n7Z67hdwsTe3xU0tNXrjrdlDbE0HykZeZ/pFd90xNM/fdS/DLAwAEBHZ+cdpgj/2v6gwToYZ2pVNoeqsEJgFpVEDp+K0MUxUAOQWggTtW4bPCYQXuQMCUMKLqtY16iwChcCBAQ7EPAQpFIgJUikoE6KKbRIBuirMC6KW5L4B+G/xUULWA2KALCMg6QEQCAEMyGckajYzMZpVReVy9rCbUK9c4borXmC64XudT3rEu4EibDmN6NRmGj+x1giEtpiY902bYiC4D+m3D+QRgYd4l9wWG2x9qMSDPQNwnU8ThzcBvWvScBWAvJx61TYc2/XfTbjKqTWvvZlO26cTwiqJuWRdSbfPZOfgUpIEQEaJUaTJkypGrSLESZcpVhJFEMinKWH9XAMEQ5HhaFJyCcjMWBA==);}
#doc-panel{display:flex;margin-top:3.14rem;border-top:1pt solid #80808022;border-bottom:1pt solid #80808022;padding:0;width:var(--golden-ratio);gap:1ex;}.article + #doc-panel{width:unset;}.has-aria-label{padding:3pt 1ex 1pt;color:var(--fg);font-size:.9rem;gap:2pt;flex-direction:column;}.has-aria-label::after{display:block;font-family:var(--rm),serif;content:attr(aria-label);}#bionReadButton{align-items:center;-webkit-transform-origin:left;transform-origin:left;padding:0 1ex;}#shareButton::before{content:'\\e912';}#printButton::before{content:'\\e90c';}#bionReadButton::before{content:'\\e901';}.button::before{font:1.4em 'a11y-ui';}.button{display:flex;transition:.1s;border:1pt solid #0000;border-radius:5pt;background:inherit;cursor:pointer;padding:4pt 1ex 1pt;}.button:hover,.button:focus,input:focus + #bionReadButton,input:checked + #bionReadButton{-webkit-transform:scale(.8);transform:scale(.8);background:#80808022;}
.act > a {color: var(--ac)}.act ~ .act > a, .act .act > a  {color: var(--fg)}
body[data-flash=reduced]{--flashGuard: background 1s ease-in}
`
document.head.appendChild(sty);

// scheme
lightSwitch.checked = localStorage.lightSwitch == 'checked';

addEvent(lightSwitch, 'change', () => {
    if (lightSwitch.checked) {
        localStorage.setItem('lightSwitch', 'checked');
    } else {
        localStorage.removeItem('lightSwitch');
    }
});

addEvent(document, 'DOMContentLoaded', () => {
    // scheme
    document.documentElement.removeAttribute('class');
    // flashguard
    setTimeout(() => document.body.setAttribute('data-flash', 'reduced'), 99);
    // toc
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

// doc
if (doc) {
    // i18n
    const {
        i18nDarkmode,
        i18nLight,
        i18nDark,
        i18nFontsize,
        i18nBionread,
        i18nPrint,
        i18nShare
    } = doc.dataset;

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

    // render doc

    doc.innerHTML = `
<input id="bionReadSwitch" type="checkbox" onclick="bionRead()" aria-label="${i18nBionread}"><label id="bionReadButton" class="button textssc" for="bionReadSwitch"><b>bion</b>read</label>
<button id="printButton" class="button has-aria-label" onclick="window.print()" aria-label="${i18nPrint}" style="margin-left:auto; display:none;"></button>
<button id="shareButton" class="button has-aria-label" style="display:none;" onclick="navigator.share({title: document.title, url: window.location.href})" aria-label="${i18nShare}"></button>
`
    doc.removeAttribute('style');
    bionReadSwitch.checked = false;

    // show when API supported
    if (window.print) {
        getElement('printButton').style.removeProperty('display');
    }

    if (navigator.share && location.protocol === 'https:') {
        getElement('shareButton').removeAttribute('style');
    }
}