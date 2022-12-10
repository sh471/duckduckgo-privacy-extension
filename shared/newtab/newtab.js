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

  // shared/js/newtab/feedHeader.js
  var FeedHeader = class extends s4 {
    render() {
      return y`
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
            ${this.resetButton}
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
  __publicField(FeedHeader, "properties", {
    totalCount: { type: Number },
    reset: { type: Function }
  });
  customElements.define("ddg-feed-header", FeedHeader);

  // shared/js/newtab/statRow.js
  var StatRow = class extends s4 {
    get countText() {
      if (this.index === 0) {
        return y`${this.count} attempt${this.count === 1 ? "" : "s"}`;
      }
      return y`${this.count}`;
    }
    render() {
      return y`
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
        `;
    }
  };
  __publicField(StatRow, "styles", [
    i`
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
  ]);
  __publicField(StatRow, "properties", {
    count: { type: Number },
    displayName: { type: String },
    favicon: { type: String },
    index: { type: Number },
    percentage: { type: Number }
  });
  customElements.define("ddg-stat-row", StatRow);

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

  // shared/js/newtab/feed.js
  var Feed = class extends s4 {
    render() {
      if (this.trackerCompanies.length === 0) {
        return null;
      }
      const max = this.trackerCompanies[0].count;
      return y`
            <h2>Blocked over the last hour</h2>
            <ul>
                ${c4(this.trackerCompanies, (x2) => x2.name, (item, index) => {
        const percentage = Math.min(item.count * 100 / max, 100);
        return y`
                        <ddg-stat-row 
                            .count=${item.count} 
                            .displayName=${item.displayName} 
                            .percentage=${percentage} 
                            .favicon=${item.favicon} 
                            .index=${index}></ddg-stat-row>
                    `;
      })}
            </ul>`;
    }
  };
  __publicField(Feed, "properties", {
    trackerCompanies: { type: Array }
  });
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

  // shared/js/newtab/css.js
  var cssReset = i`
  :host {
    display: block;
  }
  * {
    box-sizing: border-box;
  }
`;

  // shared/js/newtab/top-sites.js
  var TopSites = class extends s4 {
    constructor() {
      super(...arguments);
      __publicField(this, "topSites", []);
      __publicField(this, "state", "idle");
    }
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      getTopSites().then((x2) => {
        this.topSites = x2;
        return this.requestUpdate();
      });
    }
    render() {
      if (this.topSites.length === 0) {
        return null;
      }
      return y`
            <div class="root">
                <ul class="list">
                    ${c4(this.topSites, (x2) => x2.title, (x2) => {
        return y`
                            <li class="item"><ddg-top-site .url=${x2.url} .favicon=${x2.favicon} .title=${x2.title}></ddg-top-site></li>
                        `;
      })}
                </ul>
                <div class="control">
                    ${this.toggle}
                </div>
            </div>
        `;
    }
    get toggle() {
      return y`
        <button class="toggle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.34112 1.3667C7.01973 -0.00830328 8.98044 -0.00830042 9.65904 1.3667L11.025 4.13442C11.076 4.23772 11.1745 4.30932 11.2885 4.32588L14.3429 4.76971C15.8603 4.9902 16.4662 6.85495 15.3682 7.92524L13.158 10.0796C13.0755 10.16 13.0379 10.2759 13.0574 10.3894L13.5791 13.4314C13.8383 14.9427 12.2521 16.0952 10.8948 15.3816L8.16295 13.9454C8.06099 13.8918 7.93918 13.8918 7.83721 13.9454L5.10531 15.3816C3.7481 16.0952 2.16185 14.9427 2.42106 13.4314L2.9428 10.3894C2.96227 10.2759 2.92463 10.16 2.84214 10.0796L0.631989 7.92524C-0.466019 6.85495 0.139879 4.9902 1.65728 4.76971L4.71164 4.32588C4.82564 4.30932 4.92419 4.23772 4.97517 4.13442L6.34112 1.3667ZM8.31394 2.03055C8.18555 1.77041 7.81461 1.77042 7.68622 2.03055L6.32027 4.79827C6.0508 5.34428 5.5299 5.72274 4.92734 5.8103L1.87298 6.25412C1.5859 6.29583 1.47128 6.64862 1.67901 6.85111L3.88916 9.00548C4.32518 9.43049 4.52414 10.0428 4.42121 10.643L3.89947 13.685C3.85043 13.9709 4.15053 14.1889 4.4073 14.0539L7.1392 12.6177C7.67815 12.3344 8.32201 12.3344 8.86096 12.6177L11.5929 14.0539C11.8496 14.1889 12.1497 13.9709 12.1007 13.685L11.5789 10.643C11.476 10.0428 11.675 9.43049 12.111 9.00548L14.3212 6.85111C14.5289 6.64862 14.4143 6.29583 14.1272 6.25412L11.0728 5.8103C10.4703 5.72274 9.94936 5.34428 9.67989 4.79827L8.31394 2.03055Z" fill="black" fill-opacity="0.84"/>
            </svg>
            <span class="toggle-text">Hide Most Visited Sites</span>
        </button>
        `;
    }
  };
  __publicField(TopSites, "styles", [
    cssReset,
    i`
          .list {
            display: grid;
            margin: 0;
            padding: 0;
            list-style: none;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 24px;
          }
          .item {
            //width: 64px;
          }
          .control {
            max-width: 328px;
            margin: 0 auto;
            margin-top: 20px;
          }
          .toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background: transparent;
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 8px;
            padding: 9.5px 0;
            cursor: pointer;
          }
          .toggle:hover {
            background: rgba(0, 0, 0, 0.06);
          }
          .toggle:active {
            background: rgba(0, 0, 0, 0.12);
          }
          .toggle svg {
            display: block;
            margin-right: 8px;
          }
          .toggle-text {
            font-size: 14px;
            font-weight: 700;
            line-height: 14px;
            letter-spacing: 0em;
            text-align: left;
          }
        `
  ]);
  __publicField(TopSites, "properties", {
    topSites: {
      type: Array,
      state: true
    }
  });
  customElements.define("ddg-top-sites", TopSites);
  function getTopSites() {
    return new Promise((res) => {
      window.chrome.topSites.get((sites) => {
        const filtered = sites.filter((x2) => x2.url.startsWith("http")).filter((x2) => !x2.url.startsWith("http://localhost"));
        res(filtered.map((site) => {
          return {
            ...site,
            favicon: getFaviconUrl(site.url)
          };
        }));
      });
    });
  }
  function getFaviconUrl(url) {
    return `chrome://favicon/size/32@1x/${url}`;
  }
  var TopSite = class extends s4 {
    render() {
      return y`
            <a href=${this.url}  rel="noopener" class="link">
                <span class="icon">
                    <img src=${this.favicon} alt="" class="img">
                </span>
                <span class="title">${this.title.split(" ").slice(0, 4).join(" ")}</span>
            </a>
        `;
    }
  };
  __publicField(TopSite, "styles", [
    i`
          :host {
            display: block;
          }
          * {
            box-sizing: border-box;
          }
          a, .icon, .title {
            display: block;
          }
          a {
            text-align: center;
            text-decoration: none;
          }
          .icon {
            width: 64px;
            height: 64px;
            background: rgba(0, 0, 0, 0.04);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .img {
            width: 32px;
            height: 32px;
          }
          .title {
            font-size: 10px;
            font-weight: 400;
            line-height: 13px;
            letter-spacing: 0.11999999731779099px;
            text-align: center;
            color: #000000E5;
            margin-top: 6px;
          }
        `
  ]);
  __publicField(TopSite, "properties", {
    url: { type: String },
    favicon: { type: String },
    title: { type: String }
  });
  customElements.define("ddg-top-site", TopSite);

  // node_modules/zod/lib/index.mjs
  var util;
  (function(util2) {
    util2.assertEqual = (val) => val;
    function assertIs(_arg) {
    }
    util2.assertIs = assertIs;
    function assertNever(_x) {
      throw new Error();
    }
    util2.assertNever = assertNever;
    util2.arrayToEnum = (items) => {
      const obj = {};
      for (const item of items) {
        obj[item] = item;
      }
      return obj;
    };
    util2.getValidEnumValues = (obj) => {
      const validKeys = util2.objectKeys(obj).filter((k2) => typeof obj[obj[k2]] !== "number");
      const filtered = {};
      for (const k2 of validKeys) {
        filtered[k2] = obj[k2];
      }
      return util2.objectValues(filtered);
    };
    util2.objectValues = (obj) => {
      return util2.objectKeys(obj).map(function(e5) {
        return obj[e5];
      });
    };
    util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
      const keys = [];
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
    util2.find = (arr, checker) => {
      for (const item of arr) {
        if (checker(item))
          return item;
      }
      return void 0;
    };
    util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
      return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
    }
    util2.joinValues = joinValues;
    util2.jsonStringifyReplacer = (_2, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    };
  })(util || (util = {}));
  var ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]);
  var getParsedType = (data) => {
    const t4 = typeof data;
    switch (t4) {
      case "undefined":
        return ZodParsedType.undefined;
      case "string":
        return ZodParsedType.string;
      case "number":
        return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
      case "boolean":
        return ZodParsedType.boolean;
      case "function":
        return ZodParsedType.function;
      case "bigint":
        return ZodParsedType.bigint;
      case "object":
        if (Array.isArray(data)) {
          return ZodParsedType.array;
        }
        if (data === null) {
          return ZodParsedType.null;
        }
        if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
          return ZodParsedType.promise;
        }
        if (typeof Map !== "undefined" && data instanceof Map) {
          return ZodParsedType.map;
        }
        if (typeof Set !== "undefined" && data instanceof Set) {
          return ZodParsedType.set;
        }
        if (typeof Date !== "undefined" && data instanceof Date) {
          return ZodParsedType.date;
        }
        return ZodParsedType.object;
      default:
        return ZodParsedType.unknown;
    }
  };
  var ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of"
  ]);
  var ZodError = class extends Error {
    constructor(issues) {
      super();
      this.issues = [];
      this.addIssue = (sub) => {
        this.issues = [...this.issues, sub];
      };
      this.addIssues = (subs = []) => {
        this.issues = [...this.issues, ...subs];
      };
      const actualProto = new.target.prototype;
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(this, actualProto);
      } else {
        this.__proto__ = actualProto;
      }
      this.name = "ZodError";
      this.issues = issues;
    }
    get errors() {
      return this.issues;
    }
    format(_mapper) {
      const mapper = _mapper || function(issue) {
        return issue.message;
      };
      const fieldErrors = { _errors: [] };
      const processError = (error) => {
        for (const issue of error.issues) {
          if (issue.code === "invalid_union") {
            issue.unionErrors.map(processError);
          } else if (issue.code === "invalid_return_type") {
            processError(issue.returnTypeError);
          } else if (issue.code === "invalid_arguments") {
            processError(issue.argumentsError);
          } else if (issue.path.length === 0) {
            fieldErrors._errors.push(mapper(issue));
          } else {
            let curr = fieldErrors;
            let i4 = 0;
            while (i4 < issue.path.length) {
              const el = issue.path[i4];
              const terminal = i4 === issue.path.length - 1;
              if (!terminal) {
                curr[el] = curr[el] || { _errors: [] };
              } else {
                curr[el] = curr[el] || { _errors: [] };
                curr[el]._errors.push(mapper(issue));
              }
              curr = curr[el];
              i4++;
            }
          }
        }
      };
      processError(this);
      return fieldErrors;
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
      const fieldErrors = {};
      const formErrors = [];
      for (const sub of this.issues) {
        if (sub.path.length > 0) {
          fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
          fieldErrors[sub.path[0]].push(mapper(sub));
        } else {
          formErrors.push(mapper(sub));
        }
      }
      return { formErrors, fieldErrors };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
  };
  var errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = "Required";
        } else {
          message = `Expected ${issue.expected}, received ${issue.received}`;
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
        break;
      case ZodIssueCode.unrecognized_keys:
        message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
        break;
      case ZodIssueCode.invalid_union:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
        break;
      case ZodIssueCode.invalid_enum_value:
        message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
        break;
      case ZodIssueCode.invalid_arguments:
        message = `Invalid function arguments`;
        break;
      case ZodIssueCode.invalid_return_type:
        message = `Invalid function return type`;
        break;
      case ZodIssueCode.invalid_date:
        message = `Invalid date`;
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === "object") {
          if ("startsWith" in issue.validation) {
            message = `Invalid input: must start with "${issue.validation.startsWith}"`;
          } else if ("endsWith" in issue.validation) {
            message = `Invalid input: must end with "${issue.validation.endsWith}"`;
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== "regex") {
          message = `Invalid ${issue.validation}`;
        } else {
          message = "Invalid";
        }
        break;
      case ZodIssueCode.too_small:
        if (issue.type === "array")
          message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${issue.minimum}`;
        else if (issue.type === "date")
          message = `Date must be greater than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.minimum)}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.too_big:
        if (issue.type === "array")
          message = `Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
        else if (issue.type === "string")
          message = `String must contain ${issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
        else if (issue.type === "number")
          message = `Number must be less than ${issue.inclusive ? `or equal to ` : ``}${issue.maximum}`;
        else if (issue.type === "date")
          message = `Date must be smaller than ${issue.inclusive ? `or equal to ` : ``}${new Date(issue.maximum)}`;
        else
          message = "Invalid input";
        break;
      case ZodIssueCode.custom:
        message = `Invalid input`;
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = `Intersection results could not be merged`;
        break;
      case ZodIssueCode.not_multiple_of:
        message = `Number must be a multiple of ${issue.multipleOf}`;
        break;
      default:
        message = _ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };
  var overrideErrorMap = errorMap;
  function getErrorMap() {
    return overrideErrorMap;
  }
  var makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...issueData.path || []];
    const fullIssue = {
      ...issueData,
      path: fullPath
    };
    let errorMessage = "";
    const maps = errorMaps.filter((m3) => !!m3).slice().reverse();
    for (const map of maps) {
      errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message || errorMessage
    };
  };
  function addIssueToContext(ctx, issueData) {
    const issue = makeIssue({
      issueData,
      data: ctx.data,
      path: ctx.path,
      errorMaps: [
        ctx.common.contextualErrorMap,
        ctx.schemaErrorMap,
        getErrorMap(),
        errorMap
      ].filter((x2) => !!x2)
    });
    ctx.common.issues.push(issue);
  }
  var ParseStatus = class {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      if (this.value === "valid")
        this.value = "dirty";
    }
    abort() {
      if (this.value !== "aborted")
        this.value = "aborted";
    }
    static mergeArray(status, results) {
      const arrayValue = [];
      for (const s6 of results) {
        if (s6.status === "aborted")
          return INVALID;
        if (s6.status === "dirty")
          status.dirty();
        arrayValue.push(s6.value);
      }
      return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
      const syncPairs = [];
      for (const pair of pairs) {
        syncPairs.push({
          key: await pair.key,
          value: await pair.value
        });
      }
      return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
      const finalObject = {};
      for (const pair of pairs) {
        const { key, value } = pair;
        if (key.status === "aborted")
          return INVALID;
        if (value.status === "aborted")
          return INVALID;
        if (key.status === "dirty")
          status.dirty();
        if (value.status === "dirty")
          status.dirty();
        if (typeof value.value !== "undefined" || pair.alwaysSet) {
          finalObject[key.value] = value.value;
        }
      }
      return { status: status.value, value: finalObject };
    }
  };
  var INVALID = Object.freeze({
    status: "aborted"
  });
  var OK = (value) => ({ status: "valid", value });
  var isAborted = (x2) => x2.status === "aborted";
  var isDirty = (x2) => x2.status === "dirty";
  var isValid = (x2) => x2.status === "valid";
  var isAsync = (x2) => typeof Promise !== void 0 && x2 instanceof Promise;
  var errorUtil;
  (function(errorUtil2) {
    errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
  })(errorUtil || (errorUtil = {}));
  var ParseInputLazyPath = class {
    constructor(parent, value, path, key) {
      this.parent = parent;
      this.data = value;
      this._path = path;
      this._key = key;
    }
    get path() {
      return this._path.concat(this._key);
    }
  };
  var handleResult = (ctx, result) => {
    if (isValid(result)) {
      return { success: true, data: result.value };
    } else {
      if (!ctx.common.issues.length) {
        throw new Error("Validation failed but no issues detected.");
      }
      const error = new ZodError(ctx.common.issues);
      return { success: false, error };
    }
  };
  function processCreateParams(params) {
    if (!params)
      return {};
    const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
    if (errorMap2 && (invalid_type_error || required_error)) {
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap2)
      return { errorMap: errorMap2, description };
    const customMap = (iss, ctx) => {
      if (iss.code !== "invalid_type")
        return { message: ctx.defaultError };
      if (typeof ctx.data === "undefined") {
        return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
      }
      return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
    };
    return { errorMap: customMap, description };
  }
  var ZodType = class {
    constructor(def) {
      this.spa = this.safeParseAsync;
      this.superRefine = this._refinement;
      this._def = def;
      this.parse = this.parse.bind(this);
      this.safeParse = this.safeParse.bind(this);
      this.parseAsync = this.parseAsync.bind(this);
      this.safeParseAsync = this.safeParseAsync.bind(this);
      this.spa = this.spa.bind(this);
      this.refine = this.refine.bind(this);
      this.refinement = this.refinement.bind(this);
      this.superRefine = this.superRefine.bind(this);
      this.optional = this.optional.bind(this);
      this.nullable = this.nullable.bind(this);
      this.nullish = this.nullish.bind(this);
      this.array = this.array.bind(this);
      this.promise = this.promise.bind(this);
      this.or = this.or.bind(this);
      this.and = this.and.bind(this);
      this.transform = this.transform.bind(this);
      this.default = this.default.bind(this);
      this.describe = this.describe.bind(this);
      this.isNullable = this.isNullable.bind(this);
      this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(input) {
      return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
      return ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      };
    }
    _processInputParams(input) {
      return {
        status: new ParseStatus(),
        ctx: {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        }
      };
    }
    _parseSync(input) {
      const result = this._parse(input);
      if (isAsync(result)) {
        throw new Error("Synchronous parse encountered promise.");
      }
      return result;
    }
    _parseAsync(input) {
      const result = this._parse(input);
      return Promise.resolve(result);
    }
    parse(data, params) {
      const result = this.safeParse(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    safeParse(data, params) {
      var _a;
      const ctx = {
        common: {
          issues: [],
          async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const result = this._parseSync({ data, path: ctx.path, parent: ctx });
      return handleResult(ctx, result);
    }
    async parseAsync(data, params) {
      const result = await this.safeParseAsync(data, params);
      if (result.success)
        return result.data;
      throw result.error;
    }
    async safeParseAsync(data, params) {
      const ctx = {
        common: {
          issues: [],
          contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
          async: true
        },
        path: (params === null || params === void 0 ? void 0 : params.path) || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data,
        parsedType: getParsedType(data)
      };
      const maybeAsyncResult = this._parse({ data, path: [], parent: ctx });
      const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
      return handleResult(ctx, result);
    }
    refine(check, message) {
      const getIssueProperties = (val) => {
        if (typeof message === "string" || typeof message === "undefined") {
          return { message };
        } else if (typeof message === "function") {
          return message(val);
        } else {
          return message;
        }
      };
      return this._refinement((val, ctx) => {
        const result = check(val);
        const setError = () => ctx.addIssue({
          code: ZodIssueCode.custom,
          ...getIssueProperties(val)
        });
        if (typeof Promise !== "undefined" && result instanceof Promise) {
          return result.then((data) => {
            if (!data) {
              setError();
              return false;
            } else {
              return true;
            }
          });
        }
        if (!result) {
          setError();
          return false;
        } else {
          return true;
        }
      });
    }
    refinement(check, refinementData) {
      return this._refinement((val, ctx) => {
        if (!check(val)) {
          ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
          return false;
        } else {
          return true;
        }
      });
    }
    _refinement(refinement) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "refinement", refinement }
      });
    }
    optional() {
      return ZodOptional.create(this);
    }
    nullable() {
      return ZodNullable.create(this);
    }
    nullish() {
      return this.optional().nullable();
    }
    array() {
      return ZodArray.create(this);
    }
    promise() {
      return ZodPromise.create(this);
    }
    or(option) {
      return ZodUnion.create([this, option]);
    }
    and(incoming) {
      return ZodIntersection.create(this, incoming);
    }
    transform(transform) {
      return new ZodEffects({
        schema: this,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect: { type: "transform", transform }
      });
    }
    default(def) {
      const defaultValueFunc = typeof def === "function" ? def : () => def;
      return new ZodDefault({
        innerType: this,
        defaultValue: defaultValueFunc,
        typeName: ZodFirstPartyTypeKind.ZodDefault
      });
    }
    brand() {
      return new ZodBranded({
        typeName: ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        ...processCreateParams(void 0)
      });
    }
    describe(description) {
      const This = this.constructor;
      return new This({
        ...this._def,
        description
      });
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  };
  var cuidRegex = /^c[^\s-]{8,}$/i;
  var uuidRegex = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
  var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var ZodString = class extends ZodType {
    constructor() {
      super(...arguments);
      this._regex = (regex, validation, message) => this.refinement((data) => regex.test(data), {
        validation,
        code: ZodIssueCode.invalid_string,
        ...errorUtil.errToObj(message)
      });
      this.nonempty = (message) => this.min(1, errorUtil.errToObj(message));
      this.trim = () => new ZodString({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      });
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.string) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(
          ctx2,
          {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.string,
            received: ctx2.parsedType
          }
        );
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.length < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.length > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "email") {
          if (!emailRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "email",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "uuid") {
          if (!uuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "uuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "cuid") {
          if (!cuidRegex.test(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "cuid",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "url") {
          try {
            new URL(input.data);
          } catch (_a) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "url",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "regex") {
          check.regex.lastIndex = 0;
          const testResult = check.regex.test(input.data);
          if (!testResult) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              validation: "regex",
              code: ZodIssueCode.invalid_string,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "trim") {
          input.data = input.data.trim();
        } else if (check.kind === "startsWith") {
          if (!input.data.startsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { startsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "endsWith") {
          if (!input.data.endsWith(check.value)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_string,
              validation: { endsWith: check.value },
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    _addCheck(check) {
      return new ZodString({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    email(message) {
      return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
      return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
      return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
      return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
      return this._addCheck({
        kind: "regex",
        regex,
        ...errorUtil.errToObj(message)
      });
    }
    startsWith(value, message) {
      return this._addCheck({
        kind: "startsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    endsWith(value, message) {
      return this._addCheck({
        kind: "endsWith",
        value,
        ...errorUtil.errToObj(message)
      });
    }
    min(minLength, message) {
      return this._addCheck({
        kind: "min",
        value: minLength,
        ...errorUtil.errToObj(message)
      });
    }
    max(maxLength, message) {
      return this._addCheck({
        kind: "max",
        value: maxLength,
        ...errorUtil.errToObj(message)
      });
    }
    length(len, message) {
      return this.min(len, message).max(len, message);
    }
    get isEmail() {
      return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isUUID() {
      return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isCUID() {
      return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get minLength() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxLength() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
  };
  ZodString.create = (params) => {
    return new ZodString({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodString,
      ...processCreateParams(params)
    });
  };
  function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return valInt % stepInt / Math.pow(10, decCount);
  }
  var ZodNumber = class extends ZodType {
    constructor() {
      super(...arguments);
      this.min = this.gte;
      this.max = this.lte;
      this.step = this.multipleOf;
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.number) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.number,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      let ctx = void 0;
      const status = new ParseStatus();
      for (const check of this._def.checks) {
        if (check.kind === "int") {
          if (!util.isInteger(input.data)) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_type,
              expected: "integer",
              received: "float",
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "min") {
          const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
          if (tooSmall) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "number",
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
          if (tooBig) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "number",
              inclusive: check.inclusive,
              message: check.message
            });
            status.dirty();
          }
        } else if (check.kind === "multipleOf") {
          if (floatSafeRemainder(input.data, check.value) !== 0) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.not_multiple_of,
              multipleOf: check.value,
              message: check.message
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return { status: status.value, value: input.data };
    }
    gte(value, message) {
      return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
      return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
      return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
      return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
      return new ZodNumber({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind,
            value,
            inclusive,
            message: errorUtil.toString(message)
          }
        ]
      });
    }
    _addCheck(check) {
      return new ZodNumber({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    int(message) {
      return this._addCheck({
        kind: "int",
        message: errorUtil.toString(message)
      });
    }
    positive(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    negative(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: false,
        message: errorUtil.toString(message)
      });
    }
    nonpositive(message) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    nonnegative(message) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: true,
        message: errorUtil.toString(message)
      });
    }
    multipleOf(value, message) {
      return this._addCheck({
        kind: "multipleOf",
        value,
        message: errorUtil.toString(message)
      });
    }
    get minValue() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min;
    }
    get maxValue() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max;
    }
    get isInt() {
      return !!this._def.checks.find((ch) => ch.kind === "int");
    }
  };
  ZodNumber.create = (params) => {
    return new ZodNumber({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodNumber,
      ...processCreateParams(params)
    });
  };
  var ZodBigInt = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.bigint) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodBigInt.create = (params) => {
    return new ZodBigInt({
      typeName: ZodFirstPartyTypeKind.ZodBigInt,
      ...processCreateParams(params)
    });
  };
  var ZodBoolean = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.boolean) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.boolean,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodBoolean.create = (params) => {
    return new ZodBoolean({
      typeName: ZodFirstPartyTypeKind.ZodBoolean,
      ...processCreateParams(params)
    });
  };
  var ZodDate = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.date) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.date,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      if (isNaN(input.data.getTime())) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_date
        });
        return INVALID;
      }
      const status = new ParseStatus();
      let ctx = void 0;
      for (const check of this._def.checks) {
        if (check.kind === "min") {
          if (input.data.getTime() < check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              message: check.message,
              inclusive: true,
              minimum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else if (check.kind === "max") {
          if (input.data.getTime() > check.value) {
            ctx = this._getOrReturnCtx(input, ctx);
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              message: check.message,
              inclusive: true,
              maximum: check.value,
              type: "date"
            });
            status.dirty();
          }
        } else {
          util.assertNever(check);
        }
      }
      return {
        status: status.value,
        value: new Date(input.data.getTime())
      };
    }
    _addCheck(check) {
      return new ZodDate({
        ...this._def,
        checks: [...this._def.checks, check]
      });
    }
    min(minDate, message) {
      return this._addCheck({
        kind: "min",
        value: minDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    max(maxDate, message) {
      return this._addCheck({
        kind: "max",
        value: maxDate.getTime(),
        message: errorUtil.toString(message)
      });
    }
    get minDate() {
      let min = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "min") {
          if (min === null || ch.value > min)
            min = ch.value;
        }
      }
      return min != null ? new Date(min) : null;
    }
    get maxDate() {
      let max = null;
      for (const ch of this._def.checks) {
        if (ch.kind === "max") {
          if (max === null || ch.value < max)
            max = ch.value;
        }
      }
      return max != null ? new Date(max) : null;
    }
  };
  ZodDate.create = (params) => {
    return new ZodDate({
      checks: [],
      typeName: ZodFirstPartyTypeKind.ZodDate,
      ...processCreateParams(params)
    });
  };
  var ZodUndefined = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.undefined,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodUndefined.create = (params) => {
    return new ZodUndefined({
      typeName: ZodFirstPartyTypeKind.ZodUndefined,
      ...processCreateParams(params)
    });
  };
  var ZodNull = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.null) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.null,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodNull.create = (params) => {
    return new ZodNull({
      typeName: ZodFirstPartyTypeKind.ZodNull,
      ...processCreateParams(params)
    });
  };
  var ZodAny = class extends ZodType {
    constructor() {
      super(...arguments);
      this._any = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodAny.create = (params) => {
    return new ZodAny({
      typeName: ZodFirstPartyTypeKind.ZodAny,
      ...processCreateParams(params)
    });
  };
  var ZodUnknown = class extends ZodType {
    constructor() {
      super(...arguments);
      this._unknown = true;
    }
    _parse(input) {
      return OK(input.data);
    }
  };
  ZodUnknown.create = (params) => {
    return new ZodUnknown({
      typeName: ZodFirstPartyTypeKind.ZodUnknown,
      ...processCreateParams(params)
    });
  };
  var ZodNever = class extends ZodType {
    _parse(input) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.never,
        received: ctx.parsedType
      });
      return INVALID;
    }
  };
  ZodNever.create = (params) => {
    return new ZodNever({
      typeName: ZodFirstPartyTypeKind.ZodNever,
      ...processCreateParams(params)
    });
  };
  var ZodVoid = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.undefined) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.void,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return OK(input.data);
    }
  };
  ZodVoid.create = (params) => {
    return new ZodVoid({
      typeName: ZodFirstPartyTypeKind.ZodVoid,
      ...processCreateParams(params)
    });
  };
  var ZodArray = class extends ZodType {
    _parse(input) {
      const { ctx, status } = this._processInputParams(input);
      const def = this._def;
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (def.minLength !== null) {
        if (ctx.data.length < def.minLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minLength.value,
            type: "array",
            inclusive: true,
            message: def.minLength.message
          });
          status.dirty();
        }
      }
      if (def.maxLength !== null) {
        if (ctx.data.length > def.maxLength.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxLength.value,
            type: "array",
            inclusive: true,
            message: def.maxLength.message
          });
          status.dirty();
        }
      }
      if (ctx.common.async) {
        return Promise.all(ctx.data.map((item, i4) => {
          return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i4));
        })).then((result2) => {
          return ParseStatus.mergeArray(status, result2);
        });
      }
      const result = ctx.data.map((item, i4) => {
        return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i4));
      });
      return ParseStatus.mergeArray(status, result);
    }
    get element() {
      return this._def.type;
    }
    min(minLength, message) {
      return new ZodArray({
        ...this._def,
        minLength: { value: minLength, message: errorUtil.toString(message) }
      });
    }
    max(maxLength, message) {
      return new ZodArray({
        ...this._def,
        maxLength: { value: maxLength, message: errorUtil.toString(message) }
      });
    }
    length(len, message) {
      return this.min(len, message).max(len, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodArray.create = (schema, params) => {
    return new ZodArray({
      type: schema,
      minLength: null,
      maxLength: null,
      typeName: ZodFirstPartyTypeKind.ZodArray,
      ...processCreateParams(params)
    });
  };
  var objectUtil;
  (function(objectUtil2) {
    objectUtil2.mergeShapes = (first, second) => {
      return {
        ...first,
        ...second
      };
    };
  })(objectUtil || (objectUtil = {}));
  var AugmentFactory = (def) => (augmentation) => {
    return new ZodObject({
      ...def,
      shape: () => ({
        ...def.shape(),
        ...augmentation
      })
    });
  };
  function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
      const newShape = {};
      for (const key in schema.shape) {
        const fieldSchema = schema.shape[key];
        newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
      }
      return new ZodObject({
        ...schema._def,
        shape: () => newShape
      });
    } else if (schema instanceof ZodArray) {
      return ZodArray.create(deepPartialify(schema.element));
    } else if (schema instanceof ZodOptional) {
      return ZodOptional.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodNullable) {
      return ZodNullable.create(deepPartialify(schema.unwrap()));
    } else if (schema instanceof ZodTuple) {
      return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    } else {
      return schema;
    }
  }
  var ZodObject = class extends ZodType {
    constructor() {
      super(...arguments);
      this._cached = null;
      this.nonstrict = this.passthrough;
      this.augment = AugmentFactory(this._def);
      this.extend = AugmentFactory(this._def);
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const shape = this._def.shape();
      const keys = util.objectKeys(shape);
      return this._cached = { shape, keys };
    }
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.object) {
        const ctx2 = this._getOrReturnCtx(input);
        addIssueToContext(ctx2, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx2.parsedType
        });
        return INVALID;
      }
      const { status, ctx } = this._processInputParams(input);
      const { shape, keys: shapeKeys } = this._getCached();
      const extraKeys = [];
      if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
        for (const key in ctx.data) {
          if (!shapeKeys.includes(key)) {
            extraKeys.push(key);
          }
        }
      }
      const pairs = [];
      for (const key of shapeKeys) {
        const keyValidator = shape[key];
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
      if (this._def.catchall instanceof ZodNever) {
        const unknownKeys = this._def.unknownKeys;
        if (unknownKeys === "passthrough") {
          for (const key of extraKeys) {
            pairs.push({
              key: { status: "valid", value: key },
              value: { status: "valid", value: ctx.data[key] }
            });
          }
        } else if (unknownKeys === "strict") {
          if (extraKeys.length > 0) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.unrecognized_keys,
              keys: extraKeys
            });
            status.dirty();
          }
        } else if (unknownKeys === "strip")
          ;
        else {
          throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
        }
      } else {
        const catchall = this._def.catchall;
        for (const key of extraKeys) {
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: catchall._parse(
              new ParseInputLazyPath(ctx, value, ctx.path, key)
            ),
            alwaysSet: key in ctx.data
          });
        }
      }
      if (ctx.common.async) {
        return Promise.resolve().then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            syncPairs.push({
              key,
              value: await pair.value,
              alwaysSet: pair.alwaysSet
            });
          }
          return syncPairs;
        }).then((syncPairs) => {
          return ParseStatus.mergeObjectSync(status, syncPairs);
        });
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get shape() {
      return this._def.shape();
    }
    strict(message) {
      errorUtil.errToObj;
      return new ZodObject({
        ...this._def,
        unknownKeys: "strict",
        ...message !== void 0 ? {
          errorMap: (issue, ctx) => {
            var _a, _b, _c, _d;
            const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
            if (issue.code === "unrecognized_keys")
              return {
                message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
              };
            return {
              message: defaultError
            };
          }
        } : {}
      });
    }
    strip() {
      return new ZodObject({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new ZodObject({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    setKey(key, schema) {
      return this.augment({ [key]: schema });
    }
    merge(merging) {
      const merged = new ZodObject({
        unknownKeys: merging._def.unknownKeys,
        catchall: merging._def.catchall,
        shape: () => objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
        typeName: ZodFirstPartyTypeKind.ZodObject
      });
      return merged;
    }
    catchall(index) {
      return new ZodObject({
        ...this._def,
        catchall: index
      });
    }
    pick(mask) {
      const shape = {};
      util.objectKeys(mask).map((key) => {
        if (this.shape[key])
          shape[key] = this.shape[key];
      });
      return new ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    omit(mask) {
      const shape = {};
      util.objectKeys(this.shape).map((key) => {
        if (util.objectKeys(mask).indexOf(key) === -1) {
          shape[key] = this.shape[key];
        }
      });
      return new ZodObject({
        ...this._def,
        shape: () => shape
      });
    }
    deepPartial() {
      return deepPartialify(this);
    }
    partial(mask) {
      const newShape = {};
      if (mask) {
        util.objectKeys(this.shape).map((key) => {
          if (util.objectKeys(mask).indexOf(key) === -1) {
            newShape[key] = this.shape[key];
          } else {
            newShape[key] = this.shape[key].optional();
          }
        });
        return new ZodObject({
          ...this._def,
          shape: () => newShape
        });
      } else {
        for (const key in this.shape) {
          const fieldSchema = this.shape[key];
          newShape[key] = fieldSchema.optional();
        }
      }
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    required() {
      const newShape = {};
      for (const key in this.shape) {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
      return new ZodObject({
        ...this._def,
        shape: () => newShape
      });
    }
    keyof() {
      return createZodEnum(util.objectKeys(this.shape));
    }
  };
  ZodObject.create = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
      shape: () => shape,
      unknownKeys: "strict",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
      shape,
      unknownKeys: "strip",
      catchall: ZodNever.create(),
      typeName: ZodFirstPartyTypeKind.ZodObject,
      ...processCreateParams(params)
    });
  };
  var ZodUnion = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const options = this._def.options;
      function handleResults(results) {
        for (const result of results) {
          if (result.result.status === "valid") {
            return result.result;
          }
        }
        for (const result of results) {
          if (result.result.status === "dirty") {
            ctx.common.issues.push(...result.ctx.common.issues);
            return result.result;
          }
        }
        const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return Promise.all(options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            }),
            ctx: childCtx
          };
        })).then(handleResults);
      } else {
        let dirty = void 0;
        const issues = [];
        for (const option of options) {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: []
            },
            parent: null
          };
          const result = option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          });
          if (result.status === "valid") {
            return result;
          } else if (result.status === "dirty" && !dirty) {
            dirty = { result, ctx: childCtx };
          }
          if (childCtx.common.issues.length) {
            issues.push(childCtx.common.issues);
          }
        }
        if (dirty) {
          ctx.common.issues.push(...dirty.ctx.common.issues);
          return dirty.result;
        }
        const unionErrors = issues.map((issues2) => new ZodError(issues2));
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union,
          unionErrors
        });
        return INVALID;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  ZodUnion.create = (types, params) => {
    return new ZodUnion({
      options: types,
      typeName: ZodFirstPartyTypeKind.ZodUnion,
      ...processCreateParams(params)
    });
  };
  var ZodDiscriminatedUnion = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const discriminator = this.discriminator;
      const discriminatorValue = ctx.data[discriminator];
      const option = this.options.get(discriminatorValue);
      if (!option) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_union_discriminator,
          options: this.validDiscriminatorValues,
          path: [discriminator]
        });
        return INVALID;
      }
      if (ctx.common.async) {
        return option._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      } else {
        return option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get validDiscriminatorValues() {
      return Array.from(this.options.keys());
    }
    get options() {
      return this._def.options;
    }
    static create(discriminator, types, params) {
      const options = /* @__PURE__ */ new Map();
      try {
        types.forEach((type) => {
          const discriminatorValue = type.shape[discriminator].value;
          options.set(discriminatorValue, type);
        });
      } catch (e5) {
        throw new Error("The discriminator value could not be extracted from all the provided schemas");
      }
      if (options.size !== types.length) {
        throw new Error("Some of the discriminator values are not unique");
      }
      return new ZodDiscriminatedUnion({
        typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
        discriminator,
        options,
        ...processCreateParams(params)
      });
    }
  };
  function mergeValues(a3, b2) {
    const aType = getParsedType(a3);
    const bType = getParsedType(b2);
    if (a3 === b2) {
      return { valid: true, data: a3 };
    } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
      const bKeys = util.objectKeys(b2);
      const sharedKeys = util.objectKeys(a3).filter((key) => bKeys.indexOf(key) !== -1);
      const newObj = { ...a3, ...b2 };
      for (const key of sharedKeys) {
        const sharedValue = mergeValues(a3[key], b2[key]);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newObj[key] = sharedValue.data;
      }
      return { valid: true, data: newObj };
    } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
      if (a3.length !== b2.length) {
        return { valid: false };
      }
      const newArray = [];
      for (let index = 0; index < a3.length; index++) {
        const itemA = a3[index];
        const itemB = b2[index];
        const sharedValue = mergeValues(itemA, itemB);
        if (!sharedValue.valid) {
          return { valid: false };
        }
        newArray.push(sharedValue.data);
      }
      return { valid: true, data: newArray };
    } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a3 === +b2) {
      return { valid: true, data: a3 };
    } else {
      return { valid: false };
    }
  }
  var ZodIntersection = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const handleParsed = (parsedLeft, parsedRight) => {
        if (isAborted(parsedLeft) || isAborted(parsedRight)) {
          return INVALID;
        }
        const merged = mergeValues(parsedLeft.value, parsedRight.value);
        if (!merged.valid) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_intersection_types
          });
          return INVALID;
        }
        if (isDirty(parsedLeft) || isDirty(parsedRight)) {
          status.dirty();
        }
        return { status: status.value, value: merged.data };
      };
      if (ctx.common.async) {
        return Promise.all([
          this._def.left._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }),
          this._def.right._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          })
        ]).then(([left, right]) => handleParsed(left, right));
      } else {
        return handleParsed(this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }), this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }));
      }
    }
  };
  ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
      left,
      right,
      typeName: ZodFirstPartyTypeKind.ZodIntersection,
      ...processCreateParams(params)
    });
  };
  var ZodTuple = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.array) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.array,
          received: ctx.parsedType
        });
        return INVALID;
      }
      if (ctx.data.length < this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: this._def.items.length,
          inclusive: true,
          type: "array"
        });
        return INVALID;
      }
      const rest = this._def.rest;
      if (!rest && ctx.data.length > this._def.items.length) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: this._def.items.length,
          inclusive: true,
          type: "array"
        });
        status.dirty();
      }
      const items = ctx.data.map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema)
          return null;
        return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
      }).filter((x2) => !!x2);
      if (ctx.common.async) {
        return Promise.all(items).then((results) => {
          return ParseStatus.mergeArray(status, results);
        });
      } else {
        return ParseStatus.mergeArray(status, items);
      }
    }
    get items() {
      return this._def.items;
    }
    rest(rest) {
      return new ZodTuple({
        ...this._def,
        rest
      });
    }
  };
  ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
      items: schemas,
      typeName: ZodFirstPartyTypeKind.ZodTuple,
      rest: null,
      ...processCreateParams(params)
    });
  };
  var ZodRecord = class extends ZodType {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.object) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.object,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const pairs = [];
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      for (const key in ctx.data) {
        pairs.push({
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
          value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
        });
      }
      if (ctx.common.async) {
        return ParseStatus.mergeObjectAsync(status, pairs);
      } else {
        return ParseStatus.mergeObjectSync(status, pairs);
      }
    }
    get element() {
      return this._def.valueType;
    }
    static create(first, second, third) {
      if (second instanceof ZodType) {
        return new ZodRecord({
          keyType: first,
          valueType: second,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(third)
        });
      }
      return new ZodRecord({
        keyType: ZodString.create(),
        valueType: first,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(second)
      });
    }
  };
  var ZodMap = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.map) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.map,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const keyType = this._def.keyType;
      const valueType = this._def.valueType;
      const pairs = [...ctx.data.entries()].map(([key, value], index) => {
        return {
          key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
          value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
        };
      });
      if (ctx.common.async) {
        const finalMap = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        });
      } else {
        const finalMap = /* @__PURE__ */ new Map();
        for (const pair of pairs) {
          const key = pair.key;
          const value = pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      }
    }
  };
  ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
      valueType,
      keyType,
      typeName: ZodFirstPartyTypeKind.ZodMap,
      ...processCreateParams(params)
    });
  };
  var ZodSet = class extends ZodType {
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.set) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.set,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const def = this._def;
      if (def.minSize !== null) {
        if (ctx.data.size < def.minSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: def.minSize.value,
            type: "set",
            inclusive: true,
            message: def.minSize.message
          });
          status.dirty();
        }
      }
      if (def.maxSize !== null) {
        if (ctx.data.size > def.maxSize.value) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: def.maxSize.value,
            type: "set",
            inclusive: true,
            message: def.maxSize.message
          });
          status.dirty();
        }
      }
      const valueType = this._def.valueType;
      function finalizeSet(elements2) {
        const parsedSet = /* @__PURE__ */ new Set();
        for (const element of elements2) {
          if (element.status === "aborted")
            return INVALID;
          if (element.status === "dirty")
            status.dirty();
          parsedSet.add(element.value);
        }
        return { status: status.value, value: parsedSet };
      }
      const elements = [...ctx.data.values()].map((item, i4) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i4)));
      if (ctx.common.async) {
        return Promise.all(elements).then((elements2) => finalizeSet(elements2));
      } else {
        return finalizeSet(elements);
      }
    }
    min(minSize, message) {
      return new ZodSet({
        ...this._def,
        minSize: { value: minSize, message: errorUtil.toString(message) }
      });
    }
    max(maxSize, message) {
      return new ZodSet({
        ...this._def,
        maxSize: { value: maxSize, message: errorUtil.toString(message) }
      });
    }
    size(size, message) {
      return this.min(size, message).max(size, message);
    }
    nonempty(message) {
      return this.min(1, message);
    }
  };
  ZodSet.create = (valueType, params) => {
    return new ZodSet({
      valueType,
      minSize: null,
      maxSize: null,
      typeName: ZodFirstPartyTypeKind.ZodSet,
      ...processCreateParams(params)
    });
  };
  var ZodFunction = class extends ZodType {
    constructor() {
      super(...arguments);
      this.validate = this.implement;
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.function) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.function,
          received: ctx.parsedType
        });
        return INVALID;
      }
      function makeArgsIssue(args, error) {
        return makeIssue({
          data: args,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x2) => !!x2),
          issueData: {
            code: ZodIssueCode.invalid_arguments,
            argumentsError: error
          }
        });
      }
      function makeReturnsIssue(returns, error) {
        return makeIssue({
          data: returns,
          path: ctx.path,
          errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            getErrorMap(),
            errorMap
          ].filter((x2) => !!x2),
          issueData: {
            code: ZodIssueCode.invalid_return_type,
            returnTypeError: error
          }
        });
      }
      const params = { errorMap: ctx.common.contextualErrorMap };
      const fn = ctx.data;
      if (this._def.returns instanceof ZodPromise) {
        return OK(async (...args) => {
          const error = new ZodError([]);
          const parsedArgs = await this._def.args.parseAsync(args, params).catch((e5) => {
            error.addIssue(makeArgsIssue(args, e5));
            throw error;
          });
          const result = await fn(...parsedArgs);
          const parsedReturns = await this._def.returns._def.type.parseAsync(result, params).catch((e5) => {
            error.addIssue(makeReturnsIssue(result, e5));
            throw error;
          });
          return parsedReturns;
        });
      } else {
        return OK((...args) => {
          const parsedArgs = this._def.args.safeParse(args, params);
          if (!parsedArgs.success) {
            throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
          }
          const result = fn(...parsedArgs.data);
          const parsedReturns = this._def.returns.safeParse(result, params);
          if (!parsedReturns.success) {
            throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
          }
          return parsedReturns.data;
        });
      }
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...items) {
      return new ZodFunction({
        ...this._def,
        args: ZodTuple.create(items).rest(ZodUnknown.create())
      });
    }
    returns(returnType) {
      return new ZodFunction({
        ...this._def,
        returns: returnType
      });
    }
    implement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    strictImplement(func) {
      const validatedFunc = this.parse(func);
      return validatedFunc;
    }
    static create(args, returns, params) {
      return new ZodFunction({
        args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
        returns: returns || ZodUnknown.create(),
        typeName: ZodFirstPartyTypeKind.ZodFunction,
        ...processCreateParams(params)
      });
    }
  };
  var ZodLazy = class extends ZodType {
    get schema() {
      return this._def.getter();
    }
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const lazySchema = this._def.getter();
      return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
  };
  ZodLazy.create = (getter, params) => {
    return new ZodLazy({
      getter,
      typeName: ZodFirstPartyTypeKind.ZodLazy,
      ...processCreateParams(params)
    });
  };
  var ZodLiteral = class extends ZodType {
    _parse(input) {
      if (input.data !== this._def.value) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_literal,
          expected: this._def.value
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
    get value() {
      return this._def.value;
    }
  };
  ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
      value,
      typeName: ZodFirstPartyTypeKind.ZodLiteral,
      ...processCreateParams(params)
    });
  };
  function createZodEnum(values, params) {
    return new ZodEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodEnum,
      ...processCreateParams(params)
    });
  }
  var ZodEnum = class extends ZodType {
    _parse(input) {
      if (typeof input.data !== "string") {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (this._def.values.indexOf(input.data) === -1) {
        const ctx = this._getOrReturnCtx(input);
        const expectedValues = this._def.values;
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Values() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
    get Enum() {
      const enumValues = {};
      for (const val of this._def.values) {
        enumValues[val] = val;
      }
      return enumValues;
    }
  };
  ZodEnum.create = createZodEnum;
  var ZodNativeEnum = class extends ZodType {
    _parse(input) {
      const nativeEnumValues = util.getValidEnumValues(this._def.values);
      const ctx = this._getOrReturnCtx(input);
      if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          expected: util.joinValues(expectedValues),
          received: ctx.parsedType,
          code: ZodIssueCode.invalid_type
        });
        return INVALID;
      }
      if (nativeEnumValues.indexOf(input.data) === -1) {
        const expectedValues = util.objectValues(nativeEnumValues);
        addIssueToContext(ctx, {
          received: ctx.data,
          code: ZodIssueCode.invalid_enum_value,
          options: expectedValues
        });
        return INVALID;
      }
      return OK(input.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
      values,
      typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
      ...processCreateParams(params)
    });
  };
  var ZodPromise = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.promise,
          received: ctx.parsedType
        });
        return INVALID;
      }
      const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
      return OK(promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap
        });
      }));
    }
  };
  ZodPromise.create = (schema, params) => {
    return new ZodPromise({
      type: schema,
      typeName: ZodFirstPartyTypeKind.ZodPromise,
      ...processCreateParams(params)
    });
  };
  var ZodEffects = class extends ZodType {
    innerType() {
      return this._def.schema;
    }
    _parse(input) {
      const { status, ctx } = this._processInputParams(input);
      const effect = this._def.effect || null;
      if (effect.type === "preprocess") {
        const processed = effect.transform(ctx.data);
        if (ctx.common.async) {
          return Promise.resolve(processed).then((processed2) => {
            return this._def.schema._parseAsync({
              data: processed2,
              path: ctx.path,
              parent: ctx
            });
          });
        } else {
          return this._def.schema._parseSync({
            data: processed,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      const checkCtx = {
        addIssue: (arg) => {
          addIssueToContext(ctx, arg);
          if (arg.fatal) {
            status.abort();
          } else {
            status.dirty();
          }
        },
        get path() {
          return ctx.path;
        }
      };
      checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
      if (effect.type === "refinement") {
        const executeRefinement = (acc) => {
          const result = effect.refinement(acc, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(result);
          }
          if (result instanceof Promise) {
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          }
          return acc;
        };
        if (ctx.common.async === false) {
          const inner = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          executeRefinement(inner.value);
          return { status: status.value, value: inner.value };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            return executeRefinement(inner.value).then(() => {
              return { status: status.value, value: inner.value };
            });
          });
        }
      }
      if (effect.type === "transform") {
        if (ctx.common.async === false) {
          const base = this._def.schema._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (!isValid(base))
            return base;
          const result = effect.transform(base.value, checkCtx);
          if (result instanceof Promise) {
            throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
          }
          return { status: status.value, value: result };
        } else {
          return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
            if (!isValid(base))
              return base;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
          });
        }
      }
      util.assertNever(effect);
    }
  };
  ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
      schema,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect,
      ...processCreateParams(params)
    });
  };
  ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
      schema,
      effect: { type: "preprocess", transform: preprocess },
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      ...processCreateParams(params)
    });
  };
  var ZodOptional = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.undefined) {
        return OK(void 0);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodOptional.create = (type, params) => {
    return new ZodOptional({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
      ...processCreateParams(params)
    });
  };
  var ZodNullable = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType === ZodParsedType.null) {
        return OK(null);
      }
      return this._def.innerType._parse(input);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ZodNullable.create = (type, params) => {
    return new ZodNullable({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodNullable,
      ...processCreateParams(params)
    });
  };
  var ZodDefault = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      let data = ctx.data;
      if (ctx.parsedType === ZodParsedType.undefined) {
        data = this._def.defaultValue();
      }
      return this._def.innerType._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  ZodDefault.create = (type, params) => {
    return new ZodOptional({
      innerType: type,
      typeName: ZodFirstPartyTypeKind.ZodOptional,
      ...processCreateParams(params)
    });
  };
  var ZodNaN = class extends ZodType {
    _parse(input) {
      const parsedType = this._getType(input);
      if (parsedType !== ZodParsedType.nan) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.nan,
          received: ctx.parsedType
        });
        return INVALID;
      }
      return { status: "valid", value: input.data };
    }
  };
  ZodNaN.create = (params) => {
    return new ZodNaN({
      typeName: ZodFirstPartyTypeKind.ZodNaN,
      ...processCreateParams(params)
    });
  };
  var BRAND = Symbol("zod_brand");
  var ZodBranded = class extends ZodType {
    _parse(input) {
      const { ctx } = this._processInputParams(input);
      const data = ctx.data;
      return this._def.type._parse({
        data,
        path: ctx.path,
        parent: ctx
      });
    }
    unwrap() {
      return this._def.type;
    }
  };
  var late = {
    object: ZodObject.lazycreate
  };
  var ZodFirstPartyTypeKind;
  (function(ZodFirstPartyTypeKind2) {
    ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  var stringType = ZodString.create;
  var numberType = ZodNumber.create;
  var nanType = ZodNaN.create;
  var bigIntType = ZodBigInt.create;
  var booleanType = ZodBoolean.create;
  var dateType = ZodDate.create;
  var undefinedType = ZodUndefined.create;
  var nullType = ZodNull.create;
  var anyType = ZodAny.create;
  var unknownType = ZodUnknown.create;
  var neverType = ZodNever.create;
  var voidType = ZodVoid.create;
  var arrayType = ZodArray.create;
  var objectType = ZodObject.create;
  var strictObjectType = ZodObject.strictCreate;
  var unionType = ZodUnion.create;
  var discriminatedUnionType = ZodDiscriminatedUnion.create;
  var intersectionType = ZodIntersection.create;
  var tupleType = ZodTuple.create;
  var recordType = ZodRecord.create;
  var mapType = ZodMap.create;
  var setType = ZodSet.create;
  var functionType = ZodFunction.create;
  var lazyType = ZodLazy.create;
  var literalType = ZodLiteral.create;
  var enumType = ZodEnum.create;
  var nativeEnumType = ZodNativeEnum.create;
  var promiseType = ZodPromise.create;
  var effectsType = ZodEffects.create;
  var optionalType = ZodOptional.create;
  var nullableType = ZodNullable.create;
  var preprocessType = ZodEffects.createWithPreprocess;

  // shared/js/newtab/data.js
  var jsonSchema = objectType({
    totalCount: numberType(),
    totalPeriod: enumType(["install-time"]),
    trackerCompaniesPeriod: enumType(["last-hour"]),
    trackerCompanies: arrayType(
      objectType({
        displayName: stringType(),
        count: numberType(),
        favicon: stringType().default(() => "Shield.png")
      })
    )
  });
  var _TimedCache = class {
    constructor() {
      __publicField(this, "entries", []);
    }
    clear() {
      this.entries = [];
    }
    insert(key, timestamp = Date.now()) {
      this.entries.unshift([key, timestamp]);
    }
    update(maxAgeMs = _TimedCache.HOUR, now = Date.now()) {
      const output = {};
      let evictIndex = null;
      let count = 0;
      for (let [key, date] of this.entries) {
        const age = now - date;
        if (age > maxAgeMs) {
          evictIndex = count;
          break;
        } else {
          if (!output[key])
            output[key] = { count: 0, key };
          output[key].count += 1;
          count += 1;
        }
      }
      if (evictIndex !== null) {
        this.entries.splice(evictIndex, this.entries.length - evictIndex);
      }
      return [...Object.values(output)];
    }
  };
  var TimedCache = _TimedCache;
  __publicField(TimedCache, "SEC", 1 * 1e3);
  __publicField(TimedCache, "MIN", _TimedCache.SEC * 60);
  __publicField(TimedCache, "HOUR", _TimedCache.MIN * 60);

  // shared/js/newtab/tracker-stats.js
  var TrackerStats = class extends s4 {
    constructor() {
      super(...arguments);
      __publicField(this, "trackerCompanies", []);
      __publicField(this, "trackerCompaniesPeriod", "last-hour");
      __publicField(this, "totalCount", 0);
      __publicField(this, "totalPeriod", "install-time");
      __publicField(this, "state", "waiting-for-data");
    }
    firstUpdated(_changedProperties) {
      super.firstUpdated(_changedProperties);
      this.fetchInitial();
      this.subscribeToChanges();
    }
    subscribeToChanges() {
      window.chrome.runtime.onMessage.addListener((msg) => {
        if (msg.messageType === "newTabPage.update") {
          const data = jsonSchema.parse(msg.options);
          const sorted = data.trackerCompanies.sort((a3, b2) => b2.count - a3.count);
          const listToRender = sorted.slice(0, 9);
          const other = sorted.slice(9);
          const otherTotal = other.reduce((sum, item) => sum + item.count, 0);
          if (otherTotal > 0) {
            listToRender.push({
              displayName: "Other",
              count: otherTotal,
              favicon: "Other.png"
            });
          }
          this.trackerCompanies = listToRender;
          this.trackerCompaniesPeriod = data.trackerCompaniesPeriod;
          this.totalCount = data.totalCount;
          this.totalPeriod = data.totalPeriod;
          this.requestUpdate();
        } else {
        }
      });
    }
    render() {
      return y`
            <div class="root">
                <ddg-feed-header .totalCount=${this.totalCount}></ddg-feed-header>
                <ddg-feed .trackerCompanies=${this.trackerCompanies} .reset=${this.reset}></ddg-feed>
                ${this.resetButton}
            </div>
        `;
    }
    get resetButton() {
      if (this.totalCount > 0) {
        return y`
            <div class="actions">
                <button @click=${this.reset} type="button" class="reset">Clear</button>
            </div>`;
      }
      return null;
    }
    fetchInitial() {
      window.chrome.runtime.sendMessage({ messageType: "newTabPage.update.readInitial" });
    }
    reset() {
      window.chrome.runtime.sendMessage({ messageType: "newTabPage.update.reset" });
    }
  };
  __publicField(TrackerStats, "styles", [i`
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
    `]);
  __publicField(TrackerStats, "properties", {
    trackerCompanies: { type: Array },
    trackerCompaniesPeriod: { type: String },
    totalCount: { type: Number },
    totalPeriod: { type: String },
    state: {
      type: String,
      state: true
    }
  });
  customElements.define("ddg-tracker-stats", TrackerStats);

  // shared/js/newtab/newtab.js
  var Layout = class extends s4 {
    render() {
      return y`
            <div class="root">
                <ddg-top-sites></ddg-top-sites>
                <ddg-tracker-stats></ddg-tracker-stats>
            </div>
        `;
    }
  };
  __publicField(Layout, "styles", [
    cssReset,
    i`
          ddg-top-sites {
            display: block;
            margin-top: 16px;
          }
          ddg-tracker-stats {
            display: block;
            margin-top: 90px;
          }
        `
  ]);
  customElements.define("ddg-new-tab-page", Layout);
})();
