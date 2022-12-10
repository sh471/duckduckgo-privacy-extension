import { css, html, LitElement } from 'lit'

export class StatRow extends LitElement {
    static styles = [
        css`
          *, *:before, *:after {
            box-sizing: border-box;
          }
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
            display: flex;
            flex: 1;
            width: 60%;
          }
          
          .bar-inner {
            display: flex;
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
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 16px;
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
        displayName: { type: String },
        favicon: { type: String },
        index: { type: Number },
        percentage: { type: Number }
    }

    get countText() {
        if (this.index === 0) {
            return html`${this.count} attempt${this.count === 1 ? '' : 's'}`
        }
        return html`${this.count}`
    }

    render () {
        return html`
            <li>
                <div class="name">
                <span class="company-icon">
                    <img src=${this.favicon} alt="" class="img"/>
                </span>
                    <span class="company-name">${this.displayName}</span>
                </div>
                <div class="bar">
                    <div class="bar-inner" style="min-width: ${this.percentage}%; max-width: 60%">${this.countText}</div>
                </div>
            </li>
        `
    }
}

customElements.define('ddg-stat-row', StatRow)
