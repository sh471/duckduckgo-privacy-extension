import { css, html, LitElement } from 'lit'
import './feedHeader.js'
import './statRow.js'
import './feed.js'
import './top-sites.js'
import './tracker-stats.js'
import { cssReset } from './css'


export class Layout extends LitElement {
    static styles = [
        cssReset,
        css`
          ddg-top-sites {
            display: block;
            margin-top: 16px;
          }
          ddg-tracker-stats {
            display: block;
            margin-top: 90px;
          }
        `
    ]
    render () {
        return html`
            <div class="root">
                <ddg-top-sites></ddg-top-sites>
                <ddg-tracker-stats></ddg-tracker-stats>
            </div>
        `
    }
}

customElements.define('ddg-new-tab-page', Layout);
