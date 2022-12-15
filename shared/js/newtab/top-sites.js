import { css, html, LitElement } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { cssReset } from './css'

export class TopSites extends LitElement {
    static styles = [
        cssReset,
        css`
          .list {
            display: grid;
            margin: 0;
            padding: 0;
            list-style: none;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 24px;
          }

          .item {
            //width: 64px;
          }

          .control {
            max-width: 328px;
            margin: 0 auto;
            margin-top: 20px;
          }

          .toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background: transparent;
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 8px;
            padding: 9.5px 0;
            cursor: pointer;
          }

          .toggle:hover {
            background: rgba(0, 0, 0, 0.06);
          }

          .toggle:active {
            background: rgba(0, 0, 0, 0.12);
          }

          .toggle svg {
            display: block;
            margin-right: 8px;
          }

          .toggle-text {
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
            letter-spacing: 0em;
            text-align: left;
          }
        `
    ]

    topSites = []
    /** @type {'idle' | 'permission-granted' | 'permission-denied'} */
    state = 'idle'
    static properties = {
        topSites: {
            type: Array,
            state: true
        },
        state: {
            type: String,
            state: true
        }
    }

    firstUpdated (_changedProperties) {
        super.firstUpdated(_changedProperties)
        this.updateUI()
    }

    updateUI() {
        chrome.permissions.contains(
            { permissions: ["topSites"] },
            (granted) => {
                if (granted) {
                    this.state = 'permission-granted'
                    getTopSites()
                        .then(x => {
                            this.topSites = x
                            return this.requestUpdate()
                        })
                } else {
                    this.state = 'idle'
                }
            })
    }

    toggleVisibility (e) {
        if (this.state === 'idle') {
            chrome.permissions.request({
                permissions: ['topSites']
            }, (granted) => {
                this.updateUI();
            })
        } else {
            // todo: handle toggle of view
        }
    }

    get toggleUI () {
        const text = this.state === 'idle'
            ? 'Show Most Visited Sites'
            : 'Hide Most Visited Sites'
        return html`
            <div class="control">
                <button class="toggle" @click=${this.toggleVisibility} type="button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M6.34112 1.3667C7.01973 -0.00830328 8.98044 -0.00830042 9.65904 1.3667L11.025 4.13442C11.076 4.23772 11.1745 4.30932 11.2885 4.32588L14.3429 4.76971C15.8603 4.9902 16.4662 6.85495 15.3682 7.92524L13.158 10.0796C13.0755 10.16 13.0379 10.2759 13.0574 10.3894L13.5791 13.4314C13.8383 14.9427 12.2521 16.0952 10.8948 15.3816L8.16295 13.9454C8.06099 13.8918 7.93918 13.8918 7.83721 13.9454L5.10531 15.3816C3.7481 16.0952 2.16185 14.9427 2.42106 13.4314L2.9428 10.3894C2.96227 10.2759 2.92463 10.16 2.84214 10.0796L0.631989 7.92524C-0.466019 6.85495 0.139879 4.9902 1.65728 4.76971L4.71164 4.32588C4.82564 4.30932 4.92419 4.23772 4.97517 4.13442L6.34112 1.3667ZM8.31394 2.03055C8.18555 1.77041 7.81461 1.77042 7.68622 2.03055L6.32027 4.79827C6.0508 5.34428 5.5299 5.72274 4.92734 5.8103L1.87298 6.25412C1.5859 6.29583 1.47128 6.64862 1.67901 6.85111L3.88916 9.00548C4.32518 9.43049 4.52414 10.0428 4.42121 10.643L3.89947 13.685C3.85043 13.9709 4.15053 14.1889 4.4073 14.0539L7.1392 12.6177C7.67815 12.3344 8.32201 12.3344 8.86096 12.6177L11.5929 14.0539C11.8496 14.1889 12.1497 13.9709 12.1007 13.685L11.5789 10.643C11.476 10.0428 11.675 9.43049 12.111 9.00548L14.3212 6.85111C14.5289 6.64862 14.4143 6.29583 14.1272 6.25412L11.0728 5.8103C10.4703 5.72274 9.94936 5.34428 9.67989 4.79827L8.31394 2.03055Z"
                              fill="black" fill-opacity="0.84"/>
                    </svg>
                    <span class="toggle-text">${text}</span>
                </button>
            </div>
        `
    }

    get list () {
        if (this.topSites.length === 0) {
            return html`nothing to see`
        }
        return html`
            <ul class="list">
                ${repeat(this.topSites.slice(0, 6), (x) => x.title, x => {
                    return html`
                        <li class="item">
                            <ddg-top-site .url=${x.url} .favicon=${x.favicon} .title=${x.title}></ddg-top-site>
                        </li>
                    `
                })}
            </ul>
        `
    }

    render () {
        return html`
            <div class="root">
                ${this.state === 'permission-granted'
                        ? [this.list, this.toggleUI]
                        : this.toggleUI
                }
            </div>
        `
    }
}

customElements.define('ddg-top-sites', TopSites)

function getTopSites () {
    return new Promise(res => {
        window.chrome.topSites.get(sites => {
            const filtered = sites
                .filter(x => x.url.startsWith('http'))
                .filter(x => !x.url.startsWith('http://localhost'))

            res(filtered.map(site => {
                return {
                    ...site,
                    favicon: getFaviconUrl(site.url),
                }
            }))
        })
    })
}

// utils.js
function getFaviconUrl (url) {
    // return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`
    // console.log('here?');
    return `chrome://favicon/size/32@1x/${url}`
    // return `chrome://favicon2/?size=24&scaleFactor=1x&showFallbackMonogram=&pageUrl=${encodeURIComponent(url)}`
}

class TopSite extends LitElement {

    static styles = [
        css`
          :host {
            display: block;
          }

          * {
            box-sizing: border-box;
          }

          a, .icon, .title {
            display: block;
          }

          a {
            text-align: center;
            text-decoration: none;
          }

          .icon {
            width: 64px;
            height: 64px;
            background: rgba(0, 0, 0, 0.04);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .img {
            width: 32px;
            height: 32px;
          }

          .title {
            font-size: 10px;
            font-weight: 400;
            line-height: 13px;
            letter-spacing: 0.11999999731779099px;
            text-align: center;
            color: #000000E5;
            margin-top: 6px;
          }
        `
    ]
    static properties = {
        url: { type: String },
        favicon: { type: String },
        title: { type: String },
    }

    render () {
        return html`
            <a href=${this.url} rel="noopener" class="link">
                <span class="icon">
                    <img src=${this.favicon} alt="" class="img">
                </span>
                <span class="title">${this.title.split(' ').slice(0, 4).join(' ')}</span>
            </a>
        `
    }
}

customElements.define('ddg-top-site', TopSite)
