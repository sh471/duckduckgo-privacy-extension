import { css, html, LitElement } from 'lit'
import { jsonSchema } from './data'

class TrackerStats extends LitElement {
    static styles = [css`
      :host {
        display: block;
      }
      ddg-feed {
        display: block;
        margin-top: 16px;
      }
      ddg-top-sites {
        display: block;
        margin-top: 16px;
      }
      .reset {
        appearance: none;
        border: 0;
        box-shadow: none;
        background: transparent;
        cursor: pointer;
        color: rgba(0, 0, 0, .64)
      }
      .reset:hover {
        text-decoration: underline;
      }
      .actions {
        margin-top: 16px;
        text-align: right;
      }
    `]

    /** @type {import("z").infer<typeof jsonSchema>["trackerCompanies]} */
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
                const sorted = data.trackerCompanies.sort((a, b) => b.count - a.count);
                const listToRender = sorted.slice(0, 9);
                const other = sorted.slice(9);
                const otherTotal = other.reduce((sum, item) => sum + item.count, 0);
                if (otherTotal > 0) {
                    listToRender.push({
                        displayName: 'Other',
                        count: otherTotal,
                        favicon: 'Other.png',
                    })
                }
                this.trackerCompanies = listToRender;
                this.trackerCompaniesPeriod = data.trackerCompaniesPeriod;
                this.totalCount = data.totalCount;
                this.totalPeriod = data.totalPeriod;
                this.requestUpdate();
            } else {
                // console.log('ignoring ', msg)
            }
        })
    }

    render () {
        return html`
            <div class="root">
                <ddg-feed-header .totalCount=${this.totalCount}></ddg-feed-header>
                <ddg-feed .trackerCompanies=${this.trackerCompanies} .reset=${this.reset}></ddg-feed>
                ${this.resetButton}
            </div>
        `
    }

    get resetButton() {
        if (this.totalCount > 0) {
            return html`
            <div class="actions">
                <button @click=${this.reset} type="button" class="reset">Clear</button>
            </div>`
        }
        return null
    }

    fetchInitial () {
        window.chrome.runtime.sendMessage({messageType: 'newTabPage.update.readInitial'})
    }

    reset() {
        window.chrome.runtime.sendMessage({messageType: 'newTabPage.update.reset'})
    }
}

customElements.define('ddg-tracker-stats', TrackerStats)
