import { css, html, LitElement } from 'lit'
import './ddg-feed-header.js'
import './statRow.js'
import './feed.js'
import './top-sites.js'
import './search.js'
import './tracker-stats.js'
import { cssReset } from './css'


export class Layout extends LitElement {
    static styles = [
        cssReset,
        css`
          :host {
            --search-max-width: 716px; 
            --search-offset: 56px; 
          }
          ddg-search {
            display: block;
            max-width: calc(var(--search-max-width) - var(--search-offset));
            margin: 0 auto;
          }
          ddg-top-sites {
            display: block;
            margin: 0 auto;
            margin-top: 60px;
            max-width: 504px;
          }
          ddg-tracker-stats {
            display: block;
            margin: 0 auto;
            margin-top: 90px;
            max-width: 504px;
          }
        `
    ]
    firstUpdated (_changedProperties) {
        super.firstUpdated(_changedProperties)
        fetch('https://duckduckgo.com/ac/?q=nike&kl=wt-wt')
            .then(x => {
                return x.json()
            })
            .then(x => {
                console.log(x);
            })
    }

    render () {
        return html`
            <div class="root">
                <ddg-search></ddg-search>
                <ddg-top-sites></ddg-top-sites>
                <ddg-tracker-stats></ddg-tracker-stats>
            </div>
        `
    }
}

customElements.define('ddg-new-tab-page', Layout);
