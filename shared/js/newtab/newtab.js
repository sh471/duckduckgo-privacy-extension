import { css, html, LitElement } from 'lit'
import { repeat } from 'lit/directives/repeat.js'

class FeedHeader extends LitElement {
    static styles = [
        css`
          .root {
            padding-left: 44px;
            position: relative;
          }

          .shield {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 22px;
            height: 22px;
          }

          img {
            width: 100%;
          }

          .title {
            display: block;
            font-size: 17px;
            font-weight: 600;
            line-height: 22px;
            letter-spacing: -0.4300000071525574px;
            text-align: left;
            color: #000000D6;
            margin-bottom: 8px;
          }

          .subtitle {
            //styleName: Mac/Label (Medium);
            font-size: 13px;
            font-weight: 500;
            line-height: 13px;
            letter-spacing: -0.25px;
            text-align: left;
            color: #00000099;
          }
        `
    ]

    render () {
        return html`
            <div class="root">
            <span class="shield">
                <img src="shield.png" alt="">
            </span>
                <span class="title">
                79 tracking attempts blocked
            </span>
                <span class="subtitle">
                Since using the DuckDuckGo Extension
            </span>
            </div>
        `
    }
}

customElements.define('ddg-feed-header', FeedHeader)

class TrackerStats extends LitElement {
    static styles = [css`
      :host {
        display: block;
      }
      .root {
        padding: 1rem;
      }
      ddg-feed {
        display: block;
        margin-top: 16px;
      }
    `]

    render () {
        return html`
            <div class="root">
                <ddg-feed-header></ddg-feed-header>
                <ddg-feed></ddg-feed>
            </div>
        `
    }
}

customElements.define('ddg-tracker-stats', TrackerStats)

class Feed extends LitElement {
    static styles = [
        css`

          ul {
            margin: 0;
            padding: 0
          }

          ddg-stat-row {
            display: block;
          }

          ddg-stat-row + ddg-stat-row {
            margin-top: 12px;
          }

          h2 {
            //styleName: Mac/Label (Medium);
            font-size: 13px;
            font-weight: 500;
            line-height: 13px;
            letter-spacing: -0.25px;
            color: rgba(0, 0, 0, 0.6);
            margin-bottom: 16px;
            padding-top: 16px;
          }
        `
    ]

    render () {
        const stats = [{
            name: 'Google',
            count: '10000',
            favicon: 'Google.ico'
        }, {
            name: 'Facebook',
            count: '9000',
            favicon: 'Facebook.ico'
        }, {
            name: 'Amazon',
            count: '8000',
            favicon: 'Amazon.ico'
        }, {
            name: 'Apple',
            count: '6000',
            favicon: 'Apple.ico'
        }, {
            name: 'Yahoo',
            count: '4000',
            favicon: 'Yahoo.ico'
        }]
        return html`
            <h2>Blocked over the last hour</h2>
            <ul>
                ${repeat(stats, (x) => x.name, item => html`
                    <ddg-stat-row .count=${item.count} .name=${item.name} .favicon=${item.favicon}></ddg-stat-row>
                `)}
            </ul>`
    }
}

customElements.define('ddg-feed', Feed)

class StatRow extends LitElement {
    static styles = [
        css`
          li {
            display: flex;
          }

          .name {
            width: 40%;
            display: flex;
            flex: 1;
            font-size: 15px;
            font-weight: 600;
            line-height: 20px;
            letter-spacing: -0.23000000417232513px;
            align-items: center;
          }

          .bar {
            width: 60%;
            display: flex;
            flex: 1;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.06);
            padding: 5.5px 8px;
            align-items: center;
            font-size: 10px;
            font-weight: 600;
            line-height: 13px;
            letter-spacing: 0.11999999731779099px;
          }

          .company-icon {
            width: 32px;
            height: 32px;
            background: rgba(0, 0, 0, 0.06);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .company-name {
            margin-left: 12px;
          }

          .img {
            object-fit: contain;
            width: 22px;
            height: 22px;
          }
        `
    ]
    static properties = {
        count: { type: Number },
        name: { type: String },
        favicon: { type: String }
    }

    render () {
        return html`
            <li>
                <div class="name">
                <span class="company-icon">
                    <img src=${this.favicon} alt="" class="img"/>
                </span>
                    <span class="company-name">${this.name}</span>
                </div>
                <div class="bar">
                    ${this.count} attempts
                </div>
            </li>
        `
    }
}

customElements.define('ddg-stat-row', StatRow)

function mv3 () {
    const container = document.createElement('div')
    container.style.display = 'flex'
    container.style.flexWrap = 'wrap'
    container.style.justifyContent = 'center'

    window.chrome.topSites.get(sites => {
        for (let site of sites) {
            const d = document.createElement('div')
            d.style.width = '200px'
            d.style.textAlign = 'center'
            d.innerHTML = `
            <p>${site.title}</p>
            <div>
                <img src="${getFaviconUrl(site.url)}" style="margin: 0 auto;"/>
            </div>
            `
            container.appendChild(d)
        }
    })

    document.body.appendChild(container)
}

// utils.js
function getFaviconUrl (url) {
    return `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`
    // chrome://favicon2/?size=24&scaleFactor=1x&showFallbackMonogram=&pageUrl=http%3A%2F%2Flocalhost%3A3000%2Fhtml%2Fpopup.html%3Fstate%3Dbbc
}

// mv3();
