import { css, html, LitElement } from 'lit'

export class FeedHeader extends LitElement {

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

    static properties = {
        totalCount: { type: Number }
    }

    render () {
        return html`
            <div class="root">
            <span class="shield">
                <img src="shield.png" alt="">
            </span>
                <span class="title">
                ${this.totalCount} tracking attempts blocked
            </span>
                <span class="subtitle">
                Since using the DuckDuckGo Extension
            </span>
            </div>
        `
    }
}

customElements.define('ddg-feed-header', FeedHeader)
