import { css, html, LitElement } from 'lit'

export class StatRow extends LitElement {
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
            flex-shrink: 0;
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
                    ${this.count} attempt${this.count === 1 ? '' : 's'}
                </div>
            </li>
        `
    }
}

customElements.define('ddg-stat-row', StatRow)
