import { css, html, LitElement } from 'lit'
import './feedHeader.js'
import './statRow.js'
import './feed.js'
import { jsonSchema } from './data'

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

    trackerCompanies = []
    trackerCompaniesPeriod = 'last-hour'
    totalCount = 0
    totalPeriod = 'install-time'

    /** @type {"waiting-for-data" | "showing-stats"} */
    state = 'waiting-for-data'

    static properties = {
        trackerCompanies: { type: Array },
        trackerCompaniesPeriod: { type: String },
        totalCount: { type: Number },
        totalPeriod: { type: String },
        state: {
            type: String,
            state: true
        }
    }

    firstUpdated (_changedProperties) {
        super.firstUpdated(_changedProperties)
        this.fetchInitial()
        this.subscribeToChanges()
    }

    subscribeToChanges () {
        window.chrome.runtime.onMessage.addListener(msg => {
            if (msg.messageType === 'newTabPage.update') {
                const data = jsonSchema.parse(msg.options);
                const sorted = data.trackerCompanies.sort((a, b) => b.count-a.count);
                const first = sorted.slice(0, 10);
                const other = sorted.slice(10);
                const otherTotal = other.reduce((sum, item) => sum+=item.count, 0);
                this.trackerCompanies = first;
                if (otherTotal > 0) {
                    this.trackerCompanies.push({
                        name: 'Other',
                        displayName: 'Other',
                        count: otherTotal,
                        favicon: 'Shield.png',
                    })
                };
                this.trackerCompaniesPeriod = data.trackerCompaniesPeriod;
                this.totalCount = data.totalCount;
                this.totalPeriod = data.totalPeriod;
                this.requestUpdate();
                console.log('update?', data.trackerCompanies);
            } else {
                // console.log('ignoring ', msg)
            }
        })
    }


    render () {
        return html`
            <div class="root">
                <ddg-feed-header .totalCount=${this.totalCount}></ddg-feed-header>
                <ddg-feed .trackerCompanies=${this.trackerCompanies}></ddg-feed>
            </div>
        `
    }

    fetchInitial () {
        window.chrome.runtime.sendMessage({messageType: 'newTabPage.update.readInitial'})
    }
}

customElements.define('ddg-tracker-stats', TrackerStats)

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
