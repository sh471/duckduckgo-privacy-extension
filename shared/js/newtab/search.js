import { css, html, LitElement } from 'lit'
import { cssReset } from './css'

export class Search extends LitElement {
    static styles = [
        cssReset,
        css`
          .root {
            display: flex;
            padding-bottom: 8px;
            padding-top: 40px;
          }

          .logo {
            width: 40px;
            height: 40px;
            display: block;
            margin-right: 16px;
            flex-shrink: 0;
          }
          @media (min-width: 850px) {
            .logo {
              margin-left: -56px;
            }
          }
          .img {
            width: 100%;
          }

          .search {
            flex: 1;
          }

          .form {
            padding-left: 10px;
            padding-right: 10px;
            display: flex;
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.06);
            border-radius: 8px;
          }

          .text {
            height: 40px;
            flex: 1;
            appearance: none;
            border: none;
          }

          .text:focus {
            outline: 0;
            background: transparent;
          }
          .submit {
            appearance: none;
            border: none;
            background: transparent;
            cursor: pointer;
          }
        `
    ]

    static properties = {}

    render () {
        return html`
            <div class="root">
                <a class="logo" href="https://duckduckgo.com">
                    <img src="dax.png" alt="" class="img">
                </a>
                <div class="search">
                    <form action="https://duckduckgo.com" class="form">
                        <input type="hidden" name="hps" value="1">
                        <input
                            class="text"
                            type="text"
                            autocomplete="off"
                            name="q"
                            tabindex="1"
                            value=""
                            autocapitalize="off"
                            autocorrect="off"
                            placeholder="Search the web without being tracked">
                        <input type="submit" tabindex="2" class="submit"/>
                    </form>
                </div>
            </div>
        `
    }

    get toggle () {
        return html`
            <button class="toggle">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M6.34112 1.3667C7.01973 -0.00830328 8.98044 -0.00830042 9.65904 1.3667L11.025 4.13442C11.076 4.23772 11.1745 4.30932 11.2885 4.32588L14.3429 4.76971C15.8603 4.9902 16.4662 6.85495 15.3682 7.92524L13.158 10.0796C13.0755 10.16 13.0379 10.2759 13.0574 10.3894L13.5791 13.4314C13.8383 14.9427 12.2521 16.0952 10.8948 15.3816L8.16295 13.9454C8.06099 13.8918 7.93918 13.8918 7.83721 13.9454L5.10531 15.3816C3.7481 16.0952 2.16185 14.9427 2.42106 13.4314L2.9428 10.3894C2.96227 10.2759 2.92463 10.16 2.84214 10.0796L0.631989 7.92524C-0.466019 6.85495 0.139879 4.9902 1.65728 4.76971L4.71164 4.32588C4.82564 4.30932 4.92419 4.23772 4.97517 4.13442L6.34112 1.3667ZM8.31394 2.03055C8.18555 1.77041 7.81461 1.77042 7.68622 2.03055L6.32027 4.79827C6.0508 5.34428 5.5299 5.72274 4.92734 5.8103L1.87298 6.25412C1.5859 6.29583 1.47128 6.64862 1.67901 6.85111L3.88916 9.00548C4.32518 9.43049 4.52414 10.0428 4.42121 10.643L3.89947 13.685C3.85043 13.9709 4.15053 14.1889 4.4073 14.0539L7.1392 12.6177C7.67815 12.3344 8.32201 12.3344 8.86096 12.6177L11.5929 14.0539C11.8496 14.1889 12.1497 13.9709 12.1007 13.685L11.5789 10.643C11.476 10.0428 11.675 9.43049 12.111 9.00548L14.3212 6.85111C14.5289 6.64862 14.4143 6.29583 14.1272 6.25412L11.0728 5.8103C10.4703 5.72274 9.94936 5.34428 9.67989 4.79827L8.31394 2.03055Z"
                          fill="black" fill-opacity="0.84"/>
                </svg>
                <span class="toggle-text">Hide Most Visited Sites</span>
            </button>
        `
    }
}

customElements.define('ddg-search', Search)
