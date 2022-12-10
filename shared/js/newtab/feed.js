import { css, html, LitElement } from 'lit'
import { repeat } from 'lit/directives/repeat.js'

export class Feed extends LitElement {

    static properties = {
        trackerCompanies: { type: Array }
    }
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
        if (this.trackerCompanies.length === 0) {
            return null;
        }
        const max = this.trackerCompanies[0].count;
        return html`
            <h2>Blocked over the last hour</h2>
            <ul>
                ${repeat(this.trackerCompanies, (x) => x.name, (item, index) => {
                    const percentage = Math.min((item.count * 100) / max, 100);
                    return html`
                        <ddg-stat-row 
                            .count=${item.count} 
                            .displayName=${item.displayName} 
                            .percentage=${percentage} 
                            .favicon=${item.favicon} 
                            .index=${index}></ddg-stat-row>
                    `
                })}
            </ul>`
    }
}

customElements.define('ddg-feed', Feed)
