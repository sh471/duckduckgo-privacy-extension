"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t4, e5, n5) {
      if (this._$cssResult$ = true, n5 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t4, this.t = e5;
    }
    get styleSheet() {
      let t4 = this.o;
      const s6 = this.t;
      if (e && void 0 === t4) {
        const e5 = void 0 !== s6 && 1 === s6.length;
        e5 && (t4 = n.get(s6)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && n.set(s6, t4));
      }
      return t4;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t4) => new o("string" == typeof t4 ? t4 : t4 + "", void 0, s);
  var i = (t4, ...e5) => {
    const n5 = 1 === t4.length ? t4[0] : e5.reduce((e6, s6, n6) => e6 + ((t5) => {
      if (true === t5._$cssResult$)
        return t5.cssText;
      if ("number" == typeof t5)
        return t5;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t4[n6 + 1], t4[0]);
    return new o(n5, t4, s);
  };
  var S = (s6, n5) => {
    e ? s6.adoptedStyleSheets = n5.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n5.forEach((e5) => {
      const n6 = document.createElement("style"), o5 = t.litNonce;
      void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e5.cssText, s6.appendChild(n6);
    });
  };
  var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
    let e5 = "";
    for (const s6 of t5.cssRules)
      e5 += s6.cssText;
    return r(e5);
  })(t4) : t4;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t4, i4) {
    switch (i4) {
      case Boolean:
        t4 = t4 ? h : null;
        break;
      case Object:
      case Array:
        t4 = null == t4 ? t4 : JSON.stringify(t4);
    }
    return t4;
  }, fromAttribute(t4, i4) {
    let s6 = t4;
    switch (i4) {
      case Boolean:
        s6 = null !== t4;
        break;
      case Number:
        s6 = null === t4 ? null : Number(t4);
        break;
      case Object:
      case Array:
        try {
          s6 = JSON.parse(t4);
        } catch (t5) {
          s6 = null;
        }
    }
    return s6;
  } };
  var a = (t4, i4) => i4 !== t4 && (i4 == i4 || t4 == t4);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t4) {
      var i4;
      this.finalize(), (null !== (i4 = this.h) && void 0 !== i4 ? i4 : this.h = []).push(t4);
    }
    static get observedAttributes() {
      this.finalize();
      const t4 = [];
      return this.elementProperties.forEach((i4, s6) => {
        const e5 = this._$Ep(s6, i4);
        void 0 !== e5 && (this._$Ev.set(e5, s6), t4.push(e5));
      }), t4;
    }
    static createProperty(t4, i4 = l) {
      if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t4, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t4)) {
        const s6 = "symbol" == typeof t4 ? Symbol() : "__" + t4, e5 = this.getPropertyDescriptor(t4, s6, i4);
        void 0 !== e5 && Object.defineProperty(this.prototype, t4, e5);
      }
    }
    static getPropertyDescriptor(t4, i4, s6) {
      return { get() {
        return this[i4];
      }, set(e5) {
        const r5 = this[t4];
        this[i4] = e5, this.requestUpdate(t4, r5, s6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t4) {
      return this.elementProperties.get(t4) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t4 = Object.getPrototypeOf(this);
      if (t4.finalize(), void 0 !== t4.h && (this.h = [...t4.h]), this.elementProperties = new Map(t4.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t5 = this.properties, i4 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
        for (const s6 of i4)
          this.createProperty(s6, t5[s6]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i4) {
      const s6 = [];
      if (Array.isArray(i4)) {
        const e5 = new Set(i4.flat(1 / 0).reverse());
        for (const i5 of e5)
          s6.unshift(c(i5));
      } else
        void 0 !== i4 && s6.push(c(i4));
      return s6;
    }
    static _$Ep(t4, i4) {
      const s6 = i4.attribute;
      return false === s6 ? void 0 : "string" == typeof s6 ? s6 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
    }
    u() {
      var t4;
      this._$E_ = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t4 = this.constructor.h) || void 0 === t4 || t4.forEach((t5) => t5(this));
    }
    addController(t4) {
      var i4, s6;
      (null !== (i4 = this._$ES) && void 0 !== i4 ? i4 : this._$ES = []).push(t4), void 0 !== this.renderRoot && this.isConnected && (null === (s6 = t4.hostConnected) || void 0 === s6 || s6.call(t4));
    }
    removeController(t4) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.splice(this._$ES.indexOf(t4) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t4, i4) => {
        this.hasOwnProperty(i4) && (this._$Ei.set(i4, this[i4]), delete this[i4]);
      });
    }
    createRenderRoot() {
      var t4;
      const s6 = null !== (t4 = this.shadowRoot) && void 0 !== t4 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s6, this.constructor.elementStyles), s6;
    }
    connectedCallback() {
      var t4;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
        var i4;
        return null === (i4 = t5.hostConnected) || void 0 === i4 ? void 0 : i4.call(t5);
      });
    }
    enableUpdating(t4) {
    }
    disconnectedCallback() {
      var t4;
      null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
        var i4;
        return null === (i4 = t5.hostDisconnected) || void 0 === i4 ? void 0 : i4.call(t5);
      });
    }
    attributeChangedCallback(t4, i4, s6) {
      this._$AK(t4, s6);
    }
    _$EO(t4, i4, s6 = l) {
      var e5;
      const r5 = this.constructor._$Ep(t4, s6);
      if (void 0 !== r5 && true === s6.reflect) {
        const h3 = (void 0 !== (null === (e5 = s6.converter) || void 0 === e5 ? void 0 : e5.toAttribute) ? s6.converter : n2).toAttribute(i4, s6.type);
        this._$El = t4, null == h3 ? this.removeAttribute(r5) : this.setAttribute(r5, h3), this._$El = null;
      }
    }
    _$AK(t4, i4) {
      var s6;
      const e5 = this.constructor, r5 = e5._$Ev.get(t4);
      if (void 0 !== r5 && this._$El !== r5) {
        const t5 = e5.getPropertyOptions(r5), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== (null === (s6 = t5.converter) || void 0 === s6 ? void 0 : s6.fromAttribute) ? t5.converter : n2;
        this._$El = r5, this[r5] = h3.fromAttribute(i4, t5.type), this._$El = null;
      }
    }
    requestUpdate(t4, i4, s6) {
      let e5 = true;
      void 0 !== t4 && (((s6 = s6 || this.constructor.getPropertyOptions(t4)).hasChanged || a)(this[t4], i4) ? (this._$AL.has(t4) || this._$AL.set(t4, i4), true === s6.reflect && this._$El !== t4 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t4, s6))) : e5 = false), !this.isUpdatePending && e5 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t5) {
        Promise.reject(t5);
      }
      const t4 = this.scheduleUpdate();
      return null != t4 && await t4, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t4;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t5, i5) => this[i5] = t5), this._$Ei = void 0);
      let i4 = false;
      const s6 = this._$AL;
      try {
        i4 = this.shouldUpdate(s6), i4 ? (this.willUpdate(s6), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
          var i5;
          return null === (i5 = t5.hostUpdate) || void 0 === i5 ? void 0 : i5.call(t5);
        }), this.update(s6)) : this._$Ek();
      } catch (t5) {
        throw i4 = false, this._$Ek(), t5;
      }
      i4 && this._$AE(s6);
    }
    willUpdate(t4) {
    }
    _$AE(t4) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.forEach((t5) => {
        var i5;
        return null === (i5 = t5.hostUpdated) || void 0 === i5 ? void 0 : i5.call(t5);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t4) {
      return true;
    }
    update(t4) {
      void 0 !== this._$EC && (this._$EC.forEach((t5, i4) => this._$EO(i4, this[i4], t5)), this._$EC = void 0), this._$Ek();
    }
    updated(t4) {
    }
    firstUpdated(t4) {
    }
  };
  d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.5.0");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
  var o3 = `lit$${(Math.random() + "").slice(9)}$`;
  var n3 = "?" + o3;
  var l2 = `<${n3}>`;
  var h2 = document;
  var r3 = (t4 = "") => h2.createComment(t4);
  var d2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
  var u = Array.isArray;
  var c2 = (t4) => u(t4) || "function" == typeof (null == t4 ? void 0 : t4[Symbol.iterator]);
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var a2 = /-->/g;
  var f = />/g;
  var _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var m = /'/g;
  var p = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var g = (t4) => (i4, ...s6) => ({ _$litType$: t4, strings: i4, values: s6 });
  var y = g(1);
  var w = g(2);
  var x = Symbol.for("lit-noChange");
  var b = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var A = h2.createTreeWalker(h2, 129, null, false);
  var E = (t4, i4) => {
    const s6 = t4.length - 1, n5 = [];
    let h3, r5 = 2 === i4 ? "<svg>" : "", d3 = v;
    for (let i5 = 0; i5 < s6; i5++) {
      const s7 = t4[i5];
      let e5, u5, c5 = -1, g2 = 0;
      for (; g2 < s7.length && (d3.lastIndex = g2, u5 = d3.exec(s7), null !== u5); )
        g2 = d3.lastIndex, d3 === v ? "!--" === u5[1] ? d3 = a2 : void 0 !== u5[1] ? d3 = f : void 0 !== u5[2] ? ($.test(u5[2]) && (h3 = RegExp("</" + u5[2], "g")), d3 = _) : void 0 !== u5[3] && (d3 = _) : d3 === _ ? ">" === u5[0] ? (d3 = null != h3 ? h3 : v, c5 = -1) : void 0 === u5[1] ? c5 = -2 : (c5 = d3.lastIndex - u5[2].length, e5 = u5[1], d3 = void 0 === u5[3] ? _ : '"' === u5[3] ? p : m) : d3 === p || d3 === m ? d3 = _ : d3 === a2 || d3 === f ? d3 = v : (d3 = _, h3 = void 0);
      const y2 = d3 === _ && t4[i5 + 1].startsWith("/>") ? " " : "";
      r5 += d3 === v ? s7 + l2 : c5 >= 0 ? (n5.push(e5), s7.slice(0, c5) + "$lit$" + s7.slice(c5) + o3 + y2) : s7 + o3 + (-2 === c5 ? (n5.push(void 0), i5) : y2);
    }
    const u4 = r5 + (t4[s6] || "<?>") + (2 === i4 ? "</svg>" : "");
    if (!Array.isArray(t4) || !t4.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(u4) : u4, n5];
  };
  var C = class {
    constructor({ strings: t4, _$litType$: i4 }, e5) {
      let l5;
      this.parts = [];
      let h3 = 0, d3 = 0;
      const u4 = t4.length - 1, c5 = this.parts, [v2, a3] = E(t4, i4);
      if (this.el = C.createElement(v2, e5), A.currentNode = this.el.content, 2 === i4) {
        const t5 = this.el.content, i5 = t5.firstChild;
        i5.remove(), t5.append(...i5.childNodes);
      }
      for (; null !== (l5 = A.nextNode()) && c5.length < u4; ) {
        if (1 === l5.nodeType) {
          if (l5.hasAttributes()) {
            const t5 = [];
            for (const i5 of l5.getAttributeNames())
              if (i5.endsWith("$lit$") || i5.startsWith(o3)) {
                const s6 = a3[d3++];
                if (t5.push(i5), void 0 !== s6) {
                  const t6 = l5.getAttribute(s6.toLowerCase() + "$lit$").split(o3), i6 = /([.?@])?(.*)/.exec(s6);
                  c5.push({ type: 1, index: h3, name: i6[2], strings: t6, ctor: "." === i6[1] ? M : "?" === i6[1] ? k : "@" === i6[1] ? H : S2 });
                } else
                  c5.push({ type: 6, index: h3 });
              }
            for (const i5 of t5)
              l5.removeAttribute(i5);
          }
          if ($.test(l5.tagName)) {
            const t5 = l5.textContent.split(o3), i5 = t5.length - 1;
            if (i5 > 0) {
              l5.textContent = s3 ? s3.emptyScript : "";
              for (let s6 = 0; s6 < i5; s6++)
                l5.append(t5[s6], r3()), A.nextNode(), c5.push({ type: 2, index: ++h3 });
              l5.append(t5[i5], r3());
            }
          }
        } else if (8 === l5.nodeType)
          if (l5.data === n3)
            c5.push({ type: 2, index: h3 });
          else {
            let t5 = -1;
            for (; -1 !== (t5 = l5.data.indexOf(o3, t5 + 1)); )
              c5.push({ type: 7, index: h3 }), t5 += o3.length - 1;
          }
        h3++;
      }
    }
    static createElement(t4, i4) {
      const s6 = h2.createElement("template");
      return s6.innerHTML = t4, s6;
    }
  };
  function P(t4, i4, s6 = t4, e5) {
    var o5, n5, l5, h3;
    if (i4 === x)
      return i4;
    let r5 = void 0 !== e5 ? null === (o5 = s6._$Co) || void 0 === o5 ? void 0 : o5[e5] : s6._$Cl;
    const u4 = d2(i4) ? void 0 : i4._$litDirective$;
    return (null == r5 ? void 0 : r5.constructor) !== u4 && (null === (n5 = null == r5 ? void 0 : r5._$AO) || void 0 === n5 || n5.call(r5, false), void 0 === u4 ? r5 = void 0 : (r5 = new u4(t4), r5._$AT(t4, s6, e5)), void 0 !== e5 ? (null !== (l5 = (h3 = s6)._$Co) && void 0 !== l5 ? l5 : h3._$Co = [])[e5] = r5 : s6._$Cl = r5), void 0 !== r5 && (i4 = P(t4, r5._$AS(t4, i4.values), r5, e5)), i4;
  }
  var V = class {
    constructor(t4, i4) {
      this.u = [], this._$AN = void 0, this._$AD = t4, this._$AM = i4;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    v(t4) {
      var i4;
      const { el: { content: s6 }, parts: e5 } = this._$AD, o5 = (null !== (i4 = null == t4 ? void 0 : t4.creationScope) && void 0 !== i4 ? i4 : h2).importNode(s6, true);
      A.currentNode = o5;
      let n5 = A.nextNode(), l5 = 0, r5 = 0, d3 = e5[0];
      for (; void 0 !== d3; ) {
        if (l5 === d3.index) {
          let i5;
          2 === d3.type ? i5 = new N(n5, n5.nextSibling, this, t4) : 1 === d3.type ? i5 = new d3.ctor(n5, d3.name, d3.strings, this, t4) : 6 === d3.type && (i5 = new I(n5, this, t4)), this.u.push(i5), d3 = e5[++r5];
        }
        l5 !== (null == d3 ? void 0 : d3.index) && (n5 = A.nextNode(), l5++);
      }
      return o5;
    }
    p(t4) {
      let i4 = 0;
      for (const s6 of this.u)
        void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t4, s6, i4), i4 += s6.strings.length - 2) : s6._$AI(t4[i4])), i4++;
    }
  };
  var N = class {
    constructor(t4, i4, s6, e5) {
      var o5;
      this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t4, this._$AB = i4, this._$AM = s6, this.options = e5, this._$Cm = null === (o5 = null == e5 ? void 0 : e5.isConnected) || void 0 === o5 || o5;
    }
    get _$AU() {
      var t4, i4;
      return null !== (i4 = null === (t4 = this._$AM) || void 0 === t4 ? void 0 : t4._$AU) && void 0 !== i4 ? i4 : this._$Cm;
    }
    get parentNode() {
      let t4 = this._$AA.parentNode;
      const i4 = this._$AM;
      return void 0 !== i4 && 11 === t4.nodeType && (t4 = i4.parentNode), t4;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t4, i4 = this) {
      t4 = P(this, t4, i4), d2(t4) ? t4 === b || null == t4 || "" === t4 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t4 !== this._$AH && t4 !== x && this.g(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : c2(t4) ? this.k(t4) : this.g(t4);
    }
    O(t4, i4 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t4, i4);
    }
    T(t4) {
      this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
    }
    g(t4) {
      this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(h2.createTextNode(t4)), this._$AH = t4;
    }
    $(t4) {
      var i4;
      const { values: s6, _$litType$: e5 } = t4, o5 = "number" == typeof e5 ? this._$AC(t4) : (void 0 === e5.el && (e5.el = C.createElement(e5.h, this.options)), e5);
      if ((null === (i4 = this._$AH) || void 0 === i4 ? void 0 : i4._$AD) === o5)
        this._$AH.p(s6);
      else {
        const t5 = new V(o5, this), i5 = t5.v(this.options);
        t5.p(s6), this.T(i5), this._$AH = t5;
      }
    }
    _$AC(t4) {
      let i4 = T.get(t4.strings);
      return void 0 === i4 && T.set(t4.strings, i4 = new C(t4)), i4;
    }
    k(t4) {
      u(this._$AH) || (this._$AH = [], this._$AR());
      const i4 = this._$AH;
      let s6, e5 = 0;
      for (const o5 of t4)
        e5 === i4.length ? i4.push(s6 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s6 = i4[e5], s6._$AI(o5), e5++;
      e5 < i4.length && (this._$AR(s6 && s6._$AB.nextSibling, e5), i4.length = e5);
    }
    _$AR(t4 = this._$AA.nextSibling, i4) {
      var s6;
      for (null === (s6 = this._$AP) || void 0 === s6 || s6.call(this, false, true, i4); t4 && t4 !== this._$AB; ) {
        const i5 = t4.nextSibling;
        t4.remove(), t4 = i5;
      }
    }
    setConnected(t4) {
      var i4;
      void 0 === this._$AM && (this._$Cm = t4, null === (i4 = this._$AP) || void 0 === i4 || i4.call(this, t4));
    }
  };
  var S2 = class {
    constructor(t4, i4, s6, e5, o5) {
      this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t4, this.name = i4, this._$AM = e5, this.options = o5, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = b;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4, i4 = this, s6, e5) {
      const o5 = this.strings;
      let n5 = false;
      if (void 0 === o5)
        t4 = P(this, t4, i4, 0), n5 = !d2(t4) || t4 !== this._$AH && t4 !== x, n5 && (this._$AH = t4);
      else {
        const e6 = t4;
        let l5, h3;
        for (t4 = o5[0], l5 = 0; l5 < o5.length - 1; l5++)
          h3 = P(this, e6[s6 + l5], i4, l5), h3 === x && (h3 = this._$AH[l5]), n5 || (n5 = !d2(h3) || h3 !== this._$AH[l5]), h3 === b ? t4 = b : t4 !== b && (t4 += (null != h3 ? h3 : "") + o5[l5 + 1]), this._$AH[l5] = h3;
      }
      n5 && !e5 && this.j(t4);
    }
    j(t4) {
      t4 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t4 ? t4 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t4) {
      this.element[this.name] = t4 === b ? void 0 : t4;
    }
  };
  var R = s3 ? s3.emptyScript : "";
  var k = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t4) {
      t4 && t4 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
  };
  var H = class extends S2 {
    constructor(t4, i4, s6, e5, o5) {
      super(t4, i4, s6, e5, o5), this.type = 5;
    }
    _$AI(t4, i4 = this) {
      var s6;
      if ((t4 = null !== (s6 = P(this, t4, i4, 0)) && void 0 !== s6 ? s6 : b) === x)
        return;
      const e5 = this._$AH, o5 = t4 === b && e5 !== b || t4.capture !== e5.capture || t4.once !== e5.once || t4.passive !== e5.passive, n5 = t4 !== b && (e5 === b || o5);
      o5 && this.element.removeEventListener(this.name, this, e5), n5 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
    }
    handleEvent(t4) {
      var i4, s6;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s6 = null === (i4 = this.options) || void 0 === i4 ? void 0 : i4.host) && void 0 !== s6 ? s6 : this.element, t4) : this._$AH.handleEvent(t4);
    }
  };
  var I = class {
    constructor(t4, i4, s6) {
      this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4) {
      P(this, t4);
    }
  };
  var L = { P: "$lit$", A: o3, M: n3, C: 1, L: E, R: V, D: c2, V: P, I: N, H: S2, N: k, U: H, B: M, F: I };
  var z = i2.litHtmlPolyfillSupport;
  null == z || z(C, N), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.5.0");
  var Z = (t4, i4, s6) => {
    var e5, o5;
    const n5 = null !== (e5 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== e5 ? e5 : i4;
    let l5 = n5._$litPart$;
    if (void 0 === l5) {
      const t5 = null !== (o5 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== o5 ? o5 : null;
      n5._$litPart$ = l5 = new N(i4.insertBefore(r3(), t5), t5, void 0, null != s6 ? s6 : {});
    }
    return l5._$AI(t4), l5;
  };

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends d {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t4, e5;
      const i4 = super.createRenderRoot();
      return null !== (t4 = (e5 = this.renderOptions).renderBefore) && void 0 !== t4 || (e5.renderBefore = i4.firstChild), i4;
    }
    update(t4) {
      const i4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = Z(i4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t4;
      super.connectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(true);
    }
    disconnectedCallback() {
      var t4;
      super.disconnectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(false);
    }
    render() {
      return x;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

  // node_modules/lit-html/directive.js
  var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e4 = (t4) => (...e5) => ({ _$litDirective$: t4, values: e5 });
  var i3 = class {
    constructor(t4) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t4, e5, i4) {
      this._$Ct = t4, this._$AM = e5, this._$Ci = i4;
    }
    _$AS(t4, e5) {
      return this.update(t4, e5);
    }
    update(t4, e5) {
      return this.render(...e5);
    }
  };

  // node_modules/lit-html/directive-helpers.js
  var { I: l4 } = L;
  var c3 = () => document.createComment("");
  var r4 = (o5, t4, i4) => {
    var n5;
    const d3 = o5._$AA.parentNode, v2 = void 0 === t4 ? o5._$AB : t4._$AA;
    if (void 0 === i4) {
      const t5 = d3.insertBefore(c3(), v2), n6 = d3.insertBefore(c3(), v2);
      i4 = new l4(t5, n6, o5, o5.options);
    } else {
      const l5 = i4._$AB.nextSibling, t5 = i4._$AM, e5 = t5 !== o5;
      if (e5) {
        let l6;
        null === (n5 = i4._$AQ) || void 0 === n5 || n5.call(i4, o5), i4._$AM = o5, void 0 !== i4._$AP && (l6 = o5._$AU) !== t5._$AU && i4._$AP(l6);
      }
      if (l5 !== v2 || e5) {
        let o6 = i4._$AA;
        for (; o6 !== l5; ) {
          const l6 = o6.nextSibling;
          d3.insertBefore(o6, v2), o6 = l6;
        }
      }
    }
    return i4;
  };
  var u2 = (o5, l5, t4 = o5) => (o5._$AI(l5, t4), o5);
  var f2 = {};
  var s5 = (o5, l5 = f2) => o5._$AH = l5;
  var m2 = (o5) => o5._$AH;
  var p2 = (o5) => {
    var l5;
    null === (l5 = o5._$AP) || void 0 === l5 || l5.call(o5, false, true);
    let t4 = o5._$AA;
    const i4 = o5._$AB.nextSibling;
    for (; t4 !== i4; ) {
      const o6 = t4.nextSibling;
      t4.remove(), t4 = o6;
    }
  };

  // node_modules/lit-html/directives/repeat.js
  var u3 = (e5, s6, t4) => {
    const r5 = /* @__PURE__ */ new Map();
    for (let l5 = s6; l5 <= t4; l5++)
      r5.set(e5[l5], l5);
    return r5;
  };
  var c4 = e4(class extends i3 {
    constructor(e5) {
      if (super(e5), e5.type !== t3.CHILD)
        throw Error("repeat() can only be used in text expressions");
    }
    ht(e5, s6, t4) {
      let r5;
      void 0 === t4 ? t4 = s6 : void 0 !== s6 && (r5 = s6);
      const l5 = [], o5 = [];
      let i4 = 0;
      for (const s7 of e5)
        l5[i4] = r5 ? r5(s7, i4) : i4, o5[i4] = t4(s7, i4), i4++;
      return { values: o5, keys: l5 };
    }
    render(e5, s6, t4) {
      return this.ht(e5, s6, t4).values;
    }
    update(s6, [t4, r5, c5]) {
      var d3;
      const a3 = m2(s6), { values: p3, keys: v2 } = this.ht(t4, r5, c5);
      if (!Array.isArray(a3))
        return this.ut = v2, p3;
      const h3 = null !== (d3 = this.ut) && void 0 !== d3 ? d3 : this.ut = [], m3 = [];
      let y2, x2, j = 0, k2 = a3.length - 1, w2 = 0, A2 = p3.length - 1;
      for (; j <= k2 && w2 <= A2; )
        if (null === a3[j])
          j++;
        else if (null === a3[k2])
          k2--;
        else if (h3[j] === v2[w2])
          m3[w2] = u2(a3[j], p3[w2]), j++, w2++;
        else if (h3[k2] === v2[A2])
          m3[A2] = u2(a3[k2], p3[A2]), k2--, A2--;
        else if (h3[j] === v2[A2])
          m3[A2] = u2(a3[j], p3[A2]), r4(s6, m3[A2 + 1], a3[j]), j++, A2--;
        else if (h3[k2] === v2[w2])
          m3[w2] = u2(a3[k2], p3[w2]), r4(s6, a3[j], a3[k2]), k2--, w2++;
        else if (void 0 === y2 && (y2 = u3(v2, w2, A2), x2 = u3(h3, j, k2)), y2.has(h3[j]))
          if (y2.has(h3[k2])) {
            const e5 = x2.get(v2[w2]), t5 = void 0 !== e5 ? a3[e5] : null;
            if (null === t5) {
              const e6 = r4(s6, a3[j]);
              u2(e6, p3[w2]), m3[w2] = e6;
            } else
              m3[w2] = u2(t5, p3[w2]), r4(s6, a3[j], t5), a3[e5] = null;
            w2++;
          } else
            p2(a3[k2]), k2--;
        else
          p2(a3[j]), j++;
      for (; w2 <= A2; ) {
        const e5 = r4(s6, m3[A2 + 1]);
        u2(e5, p3[w2]), m3[w2++] = e5;
      }
      for (; j <= k2; ) {
        const e5 = a3[j++];
        null !== e5 && p2(e5);
      }
      return this.ut = v2, s5(s6, m3), x;
    }
  });

  // shared/js/newtab/newtab.js
  var FeedHeader = class extends s4 {
    render() {
      return y`
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
        `;
    }
  };
  __publicField(FeedHeader, "styles", [
    i`
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
  ]);
  customElements.define("ddg-feed-header", FeedHeader);
  var TrackerStats = class extends s4 {
    render() {
      return y`
            <div class="root">
                <ddg-feed-header></ddg-feed-header>
                <ddg-feed></ddg-feed>
            </div>
        `;
    }
  };
  __publicField(TrackerStats, "styles", [i`
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
    `]);
  customElements.define("ddg-tracker-stats", TrackerStats);
  var Feed = class extends s4 {
    render() {
      const stats = [{
        name: "Google",
        count: "10000",
        favicon: "Google.ico"
      }, {
        name: "Facebook",
        count: "9000",
        favicon: "Facebook.ico"
      }, {
        name: "Amazon",
        count: "8000",
        favicon: "Amazon.ico"
      }, {
        name: "Apple",
        count: "6000",
        favicon: "Apple.ico"
      }, {
        name: "Yahoo",
        count: "4000",
        favicon: "Yahoo.ico"
      }];
      return y`
            <h2>Blocked over the last hour</h2>
            <ul>
                ${c4(stats, (x2) => x2.name, (item) => y`
                    <ddg-stat-row .count=${item.count} .name=${item.name} .favicon=${item.favicon}></ddg-stat-row>
                `)}
            </ul>`;
    }
  };
  __publicField(Feed, "styles", [
    i`

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
  ]);
  customElements.define("ddg-feed", Feed);
  var StatRow = class extends s4 {
    render() {
      return y`
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
        `;
    }
  };
  __publicField(StatRow, "styles", [
    i`
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
  ]);
  __publicField(StatRow, "properties", {
    count: { type: Number },
    name: { type: String },
    favicon: { type: String }
  });
  customElements.define("ddg-stat-row", StatRow);
})();
