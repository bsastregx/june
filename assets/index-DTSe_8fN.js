var Pa=a=>{throw TypeError(a)};var Da=(a,t,e)=>t.has(a)||Pa("Cannot "+e);var Ma=(a,t,e)=>(Da(a,t,"read from private field"),e?e.call(a):t.get(a)),Ra=(a,t,e)=>t.has(a)?Pa("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e),Xe=(a,t,e,d)=>(Da(a,t,"write to private field"),d?d.call(a,e):t.set(a,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee=globalThis,ka=Ee.ShadowRoot&&(Ee.ShadyCSS===void 0||Ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,As=Symbol(),Oa=new WeakMap;let Js=class{constructor(t,e,d){if(this._$cssResult$=!0,d!==As)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ka&&t===void 0){const d=e!==void 0&&e.length===1;d&&(t=Oa.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),d&&Oa.set(e,t))}return t}toString(){return this.cssText}};const Ss=a=>new Js(typeof a=="string"?a:a+"",void 0,As),Ks=(a,t)=>{if(ka)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const d=document.createElement("style"),o=Ee.litNonce;o!==void 0&&d.setAttribute("nonce",o),d.textContent=e.cssText,a.appendChild(d)}},qa=ka?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const d of t.cssRules)e+=d.cssText;return Ss(e)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ys,defineProperty:Xs,getOwnPropertyDescriptor:Qs,getOwnPropertyNames:Zs,getOwnPropertySymbols:to,getPrototypeOf:eo}=Object,dt=globalThis,Ha=dt.trustedTypes,ao=Ha?Ha.emptyScript:"",Qe=dt.reactiveElementPolyfillSupport,oe=(a,t)=>a,Te={toAttribute(a,t){switch(t){case Boolean:a=a?ao:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},xa=(a,t)=>!Ys(a,t),za={attribute:!0,type:String,converter:Te,reflect:!1,useDefault:!1,hasChanged:xa};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),dt.litPropertyMetadata??(dt.litPropertyMetadata=new WeakMap);let Ot=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=za){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const d=Symbol(),o=this.getPropertyDescriptor(t,d,e);o!==void 0&&Xs(this.prototype,t,o)}}static getPropertyDescriptor(t,e,d){const{get:o,set:r}=Qs(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:o,set(s){const l=o==null?void 0:o.call(this);r==null||r.call(this,s),this.requestUpdate(t,l,d)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??za}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;const t=eo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){const e=this.properties,d=[...Zs(e),...to(e)];for(const o of d)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[d,o]of e)this.elementProperties.set(d,o)}this._$Eh=new Map;for(const[e,d]of this.elementProperties){const o=this._$Eu(e,d);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const d=new Set(t.flat(1/0).reverse());for(const o of d)e.unshift(qa(o))}else t!==void 0&&e.push(qa(t));return e}static _$Eu(t,e){const d=e.attribute;return d===!1?void 0:typeof d=="string"?d:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const d of e.keys())this.hasOwnProperty(d)&&(t.set(d,this[d]),delete this[d]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ks(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var d;return(d=e.hostConnected)==null?void 0:d.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var d;return(d=e.hostDisconnected)==null?void 0:d.call(e)})}attributeChangedCallback(t,e,d){this._$AK(t,d)}_$ET(t,e){var r;const d=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,d);if(o!==void 0&&d.reflect===!0){const s=(((r=d.converter)==null?void 0:r.toAttribute)!==void 0?d.converter:Te).toAttribute(e,d.type);this._$Em=t,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){var r,s;const d=this.constructor,o=d._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const l=d.getPropertyOptions(o),n=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:Te;this._$Em=o;const c=n.fromAttribute(e,l.type);this[o]=c??((s=this._$Ej)==null?void 0:s.get(o))??c,this._$Em=null}}requestUpdate(t,e,d,o=!1,r){var s;if(t!==void 0){const l=this.constructor;if(o===!1&&(r=this[t]),d??(d=l.getPropertyOptions(t)),!((d.hasChanged??xa)(r,e)||d.useDefault&&d.reflect&&r===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(l._$Eu(t,d))))return;this.C(t,e,d)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:d,reflect:o,wrapped:r},s){d&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,s??e??this[t]),r!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||d||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var d;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[r,s]of o){const{wrapped:l}=s,n=this[r];l!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,s,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(d=this._$EO)==null||d.forEach(o=>{var r;return(r=o.hostUpdate)==null?void 0:r.call(o)}),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(d=>{var o;return(o=d.hostUpdated)==null?void 0:o.call(d)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};Ot.elementStyles=[],Ot.shadowRootOptions={mode:"open"},Ot[oe("elementProperties")]=new Map,Ot[oe("finalized")]=new Map,Qe==null||Qe({ReactiveElement:Ot}),(dt.reactiveElementVersions??(dt.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=globalThis,Ga=a=>a,Le=de.trustedTypes,Na=Le?Le.createPolicy("lit-html",{createHTML:a=>a}):void 0,Es="$lit$",st=`lit$${Math.random().toFixed(9).slice(2)}$`,Cs="?"+st,so=`<${Cs}>`,St=document,be=()=>St.createComment(""),ue=a=>a===null||typeof a!="object"&&typeof a!="function",wa=Array.isArray,oo=a=>wa(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",Ze=`[ 	
\f\r]`,te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ua=/-->/g,Va=/>/g,ht=RegExp(`>|${Ze}(?:([^\\s"'>=/]+)(${Ze}*=${Ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wa=/'/g,Ja=/"/g,js=/^(?:script|style|textarea|title)$/i,Fs=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),u=Fs(1),_t=Fs(2),Et=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Ka=new WeakMap,ft=St.createTreeWalker(St,129);function Bs(a,t){if(!wa(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Na!==void 0?Na.createHTML(t):t}const ro=(a,t)=>{const e=a.length-1,d=[];let o,r=t===2?"<svg>":t===3?"<math>":"",s=te;for(let l=0;l<e;l++){const n=a[l];let c,h,v=-1,m=0;for(;m<n.length&&(s.lastIndex=m,h=s.exec(n),h!==null);)m=s.lastIndex,s===te?h[1]==="!--"?s=Ua:h[1]!==void 0?s=Va:h[2]!==void 0?(js.test(h[2])&&(o=RegExp("</"+h[2],"g")),s=ht):h[3]!==void 0&&(s=ht):s===ht?h[0]===">"?(s=o??te,v=-1):h[1]===void 0?v=-2:(v=s.lastIndex-h[2].length,c=h[1],s=h[3]===void 0?ht:h[3]==='"'?Ja:Wa):s===Ja||s===Wa?s=ht:s===Ua||s===Va?s=te:(s=ht,o=void 0);const $=s===ht&&a[l+1].startsWith("/>")?" ":"";r+=s===te?n+so:v>=0?(d.push(c),n.slice(0,v)+Es+n.slice(v)+st+$):n+st+(v===-2?l:$)}return[Bs(a,r+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),d]};class ge{constructor({strings:t,_$litType$:e},d){let o;this.parts=[];let r=0,s=0;const l=t.length-1,n=this.parts,[c,h]=ro(t,e);if(this.el=ge.createElement(c,d),ft.currentNode=this.el.content,e===2||e===3){const v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(o=ft.nextNode())!==null&&n.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(const v of o.getAttributeNames())if(v.endsWith(Es)){const m=h[s++],$=o.getAttribute(v).split(st),j=/([.?@])?(.*)/.exec(m);n.push({type:1,index:r,name:j[2],strings:$,ctor:j[1]==="."?lo:j[1]==="?"?no:j[1]==="@"?co:We}),o.removeAttribute(v)}else v.startsWith(st)&&(n.push({type:6,index:r}),o.removeAttribute(v));if(js.test(o.tagName)){const v=o.textContent.split(st),m=v.length-1;if(m>0){o.textContent=Le?Le.emptyScript:"";for(let $=0;$<m;$++)o.append(v[$],be()),ft.nextNode(),n.push({type:2,index:++r});o.append(v[m],be())}}}else if(o.nodeType===8)if(o.data===Cs)n.push({type:2,index:r});else{let v=-1;for(;(v=o.data.indexOf(st,v+1))!==-1;)n.push({type:7,index:r}),v+=st.length-1}r++}}static createElement(t,e){const d=St.createElement("template");return d.innerHTML=t,d}}function Vt(a,t,e=a,d){var s,l;if(t===Et)return t;let o=d!==void 0?(s=e._$Co)==null?void 0:s[d]:e._$Cl;const r=ue(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==r&&((l=o==null?void 0:o._$AO)==null||l.call(o,!1),r===void 0?o=void 0:(o=new r(a),o._$AT(a,e,d)),d!==void 0?(e._$Co??(e._$Co=[]))[d]=o:e._$Cl=o),o!==void 0&&(t=Vt(a,o._$AS(a,t.values),o,d)),t}class io{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:d}=this._$AD,o=((t==null?void 0:t.creationScope)??St).importNode(e,!0);ft.currentNode=o;let r=ft.nextNode(),s=0,l=0,n=d[0];for(;n!==void 0;){if(s===n.index){let c;n.type===2?c=new ke(r,r.nextSibling,this,t):n.type===1?c=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(c=new po(r,this,t)),this._$AV.push(c),n=d[++l]}s!==(n==null?void 0:n.index)&&(r=ft.nextNode(),s++)}return ft.currentNode=St,o}p(t){let e=0;for(const d of this._$AV)d!==void 0&&(d.strings!==void 0?(d._$AI(t,d,e),e+=d.strings.length-2):d._$AI(t[e])),e++}}class ke{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,d,o){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=d,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Vt(this,t,e),ue(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==Et&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):oo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&ue(this._$AH)?this._$AA.nextSibling.data=t:this.T(St.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:d}=t,o=typeof d=="number"?this._$AC(t):(d.el===void 0&&(d.el=ge.createElement(Bs(d.h,d.h[0]),this.options)),d);if(((r=this._$AH)==null?void 0:r._$AD)===o)this._$AH.p(e);else{const s=new io(o,this),l=s.u(this.options);s.p(e),this.T(l),this._$AH=s}}_$AC(t){let e=Ka.get(t.strings);return e===void 0&&Ka.set(t.strings,e=new ge(t)),e}k(t){wa(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let d,o=0;for(const r of t)o===e.length?e.push(d=new ke(this.O(be()),this.O(be()),this,this.options)):d=e[o],d._$AI(r),o++;o<e.length&&(this._$AR(d&&d._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var d;for((d=this._$AP)==null?void 0:d.call(this,!1,!0,e);t!==this._$AB;){const o=Ga(t).nextSibling;Ga(t).remove(),t=o}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class We{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,d,o,r){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,d.length>2||d[0]!==""||d[1]!==""?(this._$AH=Array(d.length-1).fill(new String),this.strings=d):this._$AH=g}_$AI(t,e=this,d,o){const r=this.strings;let s=!1;if(r===void 0)t=Vt(this,t,e,0),s=!ue(t)||t!==this._$AH&&t!==Et,s&&(this._$AH=t);else{const l=t;let n,c;for(t=r[0],n=0;n<r.length-1;n++)c=Vt(this,l[d+n],e,n),c===Et&&(c=this._$AH[n]),s||(s=!ue(c)||c!==this._$AH[n]),c===g?t=g:t!==g&&(t+=(c??"")+r[n+1]),this._$AH[n]=c}s&&!o&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class lo extends We{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}}class no extends We{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class co extends We{constructor(t,e,d,o,r){super(t,e,d,o,r),this.type=5}_$AI(t,e=this){if((t=Vt(this,t,e,0)??g)===Et)return;const d=this._$AH,o=t===g&&d!==g||t.capture!==d.capture||t.once!==d.once||t.passive!==d.passive,r=t!==g&&(d===g||o);o&&this.element.removeEventListener(this.name,this,d),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class po{constructor(t,e,d){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=d}get _$AU(){return this._$AM._$AU}_$AI(t){Vt(this,t)}}const ta=de.litHtmlPolyfillSupport;ta==null||ta(ge,ke),(de.litHtmlVersions??(de.litHtmlVersions=[])).push("3.3.2");const vo=(a,t,e)=>{const d=(e==null?void 0:e.renderBefore)??t;let o=d._$litPart$;if(o===void 0){const r=(e==null?void 0:e.renderBefore)??null;d._$litPart$=o=new ke(t.insertBefore(be(),r),r,void 0,e??{})}return o._$AI(a),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xt=globalThis;let M=class extends Ot{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=vo(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Et}};var $s;M._$litElement$=!0,M.finalized=!0,($s=xt.litElementHydrateSupport)==null||$s.call(xt,{LitElement:M});const ea=xt.litElementPolyfillSupport;ea==null||ea({LitElement:M});(xt.litElementVersions??(xt.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=a=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(a,t)}):customElements.define(a,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ho={attribute:!0,type:String,converter:Te,reflect:!1,hasChanged:xa},bo=(a=ho,t,e)=>{const{kind:d,metadata:o}=e;let r=globalThis.litPropertyMetadata.get(o);if(r===void 0&&globalThis.litPropertyMetadata.set(o,r=new Map),d==="setter"&&((a=Object.create(a)).wrapped=!0),r.set(e.name,a),d==="accessor"){const{name:s}=e;return{set(l){const n=t.get.call(this);t.set.call(this,l),this.requestUpdate(s,n,a,!0,l)},init(l){return l!==void 0&&this.C(s,void 0,a,l),l}}}if(d==="setter"){const{name:s}=e;return function(l){const n=this[s];t.call(this,l),this.requestUpdate(s,n,a,!0,l)}}throw Error("Unsupported decorator location: "+d)};function b(a){return(t,e)=>typeof e=="object"?bo(a,t,e):((d,o,r)=>{const s=o.hasOwnProperty(r);return o.constructor.createProperty(r,d),s?Object.getOwnPropertyDescriptor(o,r):void 0})(a,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Z(a){return b({...a,state:!0,attribute:!1})}const uo=a=>!!a.shadowRoot&&a.shadowRoot.children.length!==0,go=(a,t)=>a.splice(t,1)[0],Is=new WeakMap,Ce=new WeakMap,mo=(a,t)=>{const e=a.getRootNode();if(e instanceof ShadowRoot||e instanceof Document){Is.set(a,e),Ce.has(e)||Ce.set(e,new WeakMap);const d=Ce.get(e),o=d.get(t)??0;o===0&&e.adoptedStyleSheets.push(t),d.set(t,o+1)}},yo=(a,t)=>{const e=Is.get(a);if(!e)return;const d=Ce.get(e);if(!d)return;const o=d.get(t);if(o!==void 0)if(o===1){const r=e.adoptedStyleSheets.findIndex(s=>s===t);r!==-1&&go(e.adoptedStyleSheets,r),d.delete(t)}else d.set(t,o-1)},_o=()=>new Promise(a=>setTimeout(a)),qt=[],Ya=()=>{var a;return(a=qt.at(-1))==null?void 0:a.batchComplete},fo=a=>((t=>{(()=>{const e=qt.at(-1);return e===void 0||e.updatesCount>=1024})()&&(()=>{const e=Ya(),d=e?e.finally(_o):Promise.resolve();qt.push({batchComplete:d,updatesCount:0}),d.finally(()=>qt.shift())})(),qt.at(-1).updatesCount+=t?1:2})(a),qt.length===1?void 0:Ya());var Xa;const Ts=Symbol("kasstor-component-metadata"),W=a=>function(t){const{globalStyles:e,tag:d,styles:o,shadow:r}=a,{prototype:s}=t,l=customElements.get(d);if(l&&l!==t)return l;if(r===!1)s.createRenderRoot=function(){return this};else{const{delegatesFocus:c,formAssociated:h,mode:v}=r??{};h===!0&&(t.formAssociated=!0),t.shadowRootOptions={delegatesFocus:c??!1,mode:v??"open"},o&&(t.styles=Ss(o))}let n=e;if(r===!1&&o&&(n=n?o+" "+n:o),n){const c=new CSSStyleSheet;c.replaceSync(n),s.globalStyles=c}return s[Ts]=a.metadata,customElements.define(d,t),t};var Ut;class J extends(Xa=M,Xa){constructor(){super();Ra(this,Ut);Xe(this,Ut,uo(this));const e=this.willUpdate;this.willUpdate=function(d){var o;(o=this.kasstorObserveCallback)==null||o.call(this,d),this.hasUpdated||this.firstWillUpdate(d),e.call(this,d)}}get wasServerSideRendered(){return Ma(this,Ut)}set wasServerSideRendered(e){Xe(this,Ut,e)}get kstMetadata(){return this[Ts]}connectedCallback(){super.connectedCallback(),this.globalStyles&&mo(this,this.globalStyles)}async scheduleUpdate(){const e=fo(this.hasUpdated);e!==void 0&&await e,super.scheduleUpdate()}firstWillUpdate(e){}disconnectedCallback(){super.disconnectedCallback(),this.globalStyles&&yo(this,this.globalStyles)}}Ut=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ko={CHILD:2},xo=a=>(...t)=>({_$litDirective$:a,values:t});class wo{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,d){this._$Ct=t,this._$AM=e,this._$Ci=d}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const $o='@charset "UTF-8";:host{display:inline-flex}.jb{--_p: var(--brand, var(--gx));--_ph: var(--brand-h, var(--gx-h));--_on: var(--brand-on, var(--gx-on));--_a: var(--brand-a, var(--gx-a));--_f: var(--brand, var(--gx));--_sec-bg: #111;--_sec-on: #fff;--_sec-h-bg: color-mix(in srgb, var(--_p) 15%, #111);--_sec-h-on: #fff;--_ter-bg: #fff;--_ter-on: #111;--_ter-h-bg: color-mix(in srgb, var(--_p) 15%, #fff);--_ter-h-on: var(--_p);--_out-bd: var(--black);--_out-t: var(--black);--_txt: var(--black);--_dis-bg: var(--grey-200);--_dis-t: var(--grey-500);display:inline-flex;align-items:center;justify-content:center;gap:var(--sp-2);height:48px;padding:var(--sp-2) var(--sp-5);min-width:128px;font:var(--label);border:1px solid transparent;border-radius:var(--r-full);background:transparent;color:var(--_txt);cursor:pointer;outline:none;box-sizing:border-box;transition:background var(--duration-fast) var(--ease),color var(--duration-fast) var(--ease),border-color var(--duration-fast) var(--ease),box-shadow var(--duration-fast) var(--ease),transform var(--duration-fast) var(--ease)}.jb:active:not(:disabled){transform:scale(.97)}.jb:disabled{cursor:not-allowed}.jb:focus-visible{outline:2px solid var(--_f);outline-offset:2px}.jb__i{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:20px;height:20px}.jb__i ::slotted(svg){width:100%;height:100%}.jb__i[hidden]{display:none}.jb--has-icon{padding-inline-start:20px}.jb--pri{background:var(--_p);color:var(--_on)}.jb--pri:hover:not(:disabled){background:var(--_ph);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--pri:disabled{background:var(--_dis-bg);color:var(--_dis-t)}.jb--sec{background:var(--_sec-bg);color:var(--_sec-on)}.jb--sec:hover:not(:disabled){background:var(--_sec-h-bg);color:var(--_sec-h-on);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--sec:disabled{background:var(--_dis-bg);color:var(--_dis-t)}.jb--ter{background:var(--_ter-bg);color:var(--_ter-on);box-shadow:var(--shadow-sm)}.jb--ter:hover:not(:disabled){background:var(--_ter-h-bg);color:var(--_ter-h-on);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--ter:disabled{background:var(--_dis-bg);color:var(--_dis-t)}.jb--out{background:transparent;color:var(--_out-t);border-color:var(--_out-bd)}.jb--out:hover:not(:disabled){border-color:var(--grey-300);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--out:disabled{border-color:var(--_dis-bg);color:var(--_dis-t)}.jb--pln{background:transparent;color:var(--_txt);border:none;border-radius:0;min-width:auto;padding:var(--sp-2) 0}.jb--pln:hover:not(:disabled){text-decoration:underline;text-underline-offset:3px}.jb--pln:disabled{color:var(--_dis-t)}.jb--ico{background:transparent;color:var(--_txt);border:none;border-radius:var(--r-sm);min-width:auto;height:auto;padding:var(--sp-2);gap:0}.jb--ico:hover:not(:disabled){opacity:.7}.jb--ico:disabled{color:var(--_dis-t)}.jb--ico.jb--has-icon{padding-inline-start:var(--sp-2)}:host-context([data-surface=dark]) .jb{--_txt: #fff;--_out-bd: #fff;--_out-t: #fff;--_dis-bg: #2a2f35;--_dis-t: #707880}:host-context([data-surface=dark]) .jb--out:hover:not(:disabled){border-color:transparent;background:#ffffff14}:host-context([data-surface=dark]) .jb--out.jb--hover{border-color:transparent;background:#ffffff14}.jb--pri.jb--hover{background:var(--_ph);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--sec.jb--hover{background:var(--_sec-h-bg);color:var(--_sec-h-on);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--ter.jb--hover{background:var(--_ter-h-bg);color:var(--_ter-h-on);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--out.jb--hover{border-color:var(--grey-300);transform:translateY(-1px);box-shadow:var(--shadow-md)}.jb--pln.jb--hover{text-decoration:underline;text-underline-offset:3px}.jb--ico.jb--hover{opacity:.7}.jb.jb--focus{outline:2px solid var(--_f);outline-offset:2px}.jb.jb--active{transform:scale(.97)}.jb--pri.jb--active{background:var(--_ph);box-shadow:var(--shadow-md)}.jb--sec.jb--active{background:var(--_sec-h-bg);color:var(--_sec-h-on);box-shadow:var(--shadow-md)}.jb--ter.jb--active{background:var(--_ter-h-bg);color:var(--_ter-h-on);box-shadow:var(--shadow-md)}.jb--out.jb--active{border-color:var(--grey-300);box-shadow:var(--shadow-md)}.jb--pln.jb--active{text-decoration:underline;text-underline-offset:3px}.jb--ico.jb--active{opacity:.7}@media(prefers-reduced-motion:reduce){.jb{transition:none}}';var Ao=Object.defineProperty,So=Object.getOwnPropertyDescriptor,It=(a,t,e,d)=>{for(var o=d>1?void 0:d?So(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Ao(t,e,o),o};let it=class extends J{constructor(){super(...arguments),this.variant="primary",this.disabled=!1,this.label="",this.iconOnly=!1,this.forceState="",this._hasIcon=!1}_variantClass(){return{primary:"jb--pri",secondary:"jb--sec",tertiary:"jb--ter",outline:"jb--out",plain:"jb--pln",icon:"jb--ico"}[this.variant]??"jb--pri"}_onIconSlotChange(a){const t=a.target;this._hasIcon=t.assignedNodes({flatten:!0}).length>0}render(){const a=this.forceState,t=`jb ${this._variantClass()}${this._hasIcon?" jb--has-icon":""}${a?" jb--"+a:""}`;return u`
      <button
        type="button"
        class=${t}
        ?disabled=${this.disabled}
        aria-label=${this.label||(this.iconOnly?"button":g)}
      >
        <span class="jb__i" ?hidden=${!this._hasIcon}>
          <slot name="icon" @slotchange=${this._onIconSlotChange}></slot>
        </span>
        ${this.iconOnly?g:u`<slot>${this.label}</slot>`}
      </button>
    `}};It([b({type:String,reflect:!0})],it.prototype,"variant",2);It([b({type:Boolean,reflect:!0})],it.prototype,"disabled",2);It([b({type:String})],it.prototype,"label",2);It([b({type:Boolean,attribute:"icon-only"})],it.prototype,"iconOnly",2);It([b({type:String,attribute:"force-state",reflect:!0})],it.prototype,"forceState",2);It([Z()],it.prototype,"_hasIcon",2);it=It([W({tag:"june-button",styles:$o})],it);const Eo='@charset "UTF-8";:host{display:inline-flex}.lam-eyebrow{display:inline-flex;align-items:center;gap:var(--sp-2);padding-block:var(--sp-2);padding-inline:var(--sp-2) var(--sp-4);border:.5px solid var(--black);border-radius:var(--r-full);max-width:100%}.lam-eyebrow--no-icon{padding-inline-start:var(--sp-4)}.lam-eyebrow__icon{width:32px;height:32px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--black);background:var(--eyebrow-fill, var(--card-border));border-radius:50%}.lam-eyebrow__tag{font:var(--body-s);padding:2px var(--sp-2);background:var(--eyebrow-fill, var(--card-border));border-radius:var(--r-xs);color:var(--black);flex-shrink:0}.lam-eyebrow__body{display:flex;align-items:center;gap:var(--sp-1);min-width:0}.lam-eyebrow__text{font:var(--body-xs);color:var(--black);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.lam-eyebrow__dash{font:var(--body-xs);color:var(--black);flex-shrink:0}.lam-eyebrow__cta{display:flex;align-items:center;gap:var(--sp-1);font:var(--body-xs-strong);color:var(--black);text-decoration:none;flex-shrink:0;white-space:nowrap;min-height:24px;padding:2px 0}.lam-eyebrow__chevron{width:6px;height:9px;display:inline-flex;transition:transform var(--duration-fast) var(--ease)}.lam-eyebrow__cta{transition:color var(--duration-fast) var(--ease)}.lam-eyebrow__cta:hover{color:var(--brand, var(--gx))}.lam-eyebrow__cta:hover .lam-eyebrow__chevron{transform:translate(3px)}.lam-eyebrow__cta:focus-visible{outline:2px solid var(--brand, var(--gx));outline-offset:2px;border-radius:var(--r-xs)}.lam-eyebrow:hover{border-color:var(--grey-400);transition:border-color var(--duration-fast) var(--ease)}@keyframes eyebrow-reveal{0%{opacity:0;transform:translateY(6px)}}.lam-eyebrow{animation:eyebrow-reveal var(--duration) var(--ease) backwards}@media(prefers-reduced-motion:reduce){.lam-eyebrow{animation:none}.lam-eyebrow__cta,.lam-eyebrow__chevron{transition:none}.lam-eyebrow__cta:hover .lam-eyebrow__chevron{transform:none}}:host-context([data-surface=dark]) .lam-eyebrow{border-color:#ffffff40}:host-context([data-surface=dark]) .lam-eyebrow:hover{border-color:#ffffff73}:host-context([data-surface=dark]) .lam-eyebrow__cta:hover{color:var(--white)}:host-context([data-surface=dark]) .lam-eyebrow__cta:focus-visible{outline-color:var(--white)}';var Co=Object.defineProperty,jo=Object.getOwnPropertyDescriptor,Tt=(a,t,e,d)=>{for(var o=d>1?void 0:d?jo(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Co(t,e,o),o};const Fo=u`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,Bo=u`<svg width="6" height="9" viewBox="0 0 6 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 1 5 4.5 1 8"/></svg>`;let lt=class extends J{constructor(){super(...arguments),this.showIcon=!0,this.tagText="",this.bodyText="",this.ctaText="",this.ctaHref="#",this.showCta=!0}render(){const a=`lam-eyebrow${this.showIcon?"":" lam-eyebrow--no-icon"}`;return u`
      <div class=${a}>
        ${this.showIcon?u`<div class="lam-eyebrow__icon"><slot name="icon">${Fo}</slot></div>`:g}
        ${this.tagText?u`<span class="lam-eyebrow__tag">${this.tagText}</span>`:g}
        <div class="lam-eyebrow__body">
          <span class="lam-eyebrow__text">${this.bodyText}</span>
          ${this.showCta?u`
              <span class="lam-eyebrow__dash">\u2014</span>
              <a class="lam-eyebrow__cta" href=${this.ctaHref}>${this.ctaText} <span class="lam-eyebrow__chevron">${Bo}</span></a>
            `:g}
        </div>
      </div>
    `}};Tt([b({type:Boolean,attribute:"show-icon"})],lt.prototype,"showIcon",2);Tt([b({type:String,attribute:"tag-text"})],lt.prototype,"tagText",2);Tt([b({type:String,attribute:"body-text"})],lt.prototype,"bodyText",2);Tt([b({type:String,attribute:"cta-text"})],lt.prototype,"ctaText",2);Tt([b({type:String,attribute:"cta-href"})],lt.prototype,"ctaHref",2);Tt([b({type:Boolean,attribute:"show-cta"})],lt.prototype,"showCta",2);lt=Tt([W({tag:"june-eyebrow",styles:Eo})],lt);const Io=":host{display:block}.blk{display:flex;flex-direction:column;gap:var(--sp-8);padding:var(--sp-10);background:var(--card)}.blk__header{display:flex;flex-direction:column;gap:var(--sp-4)}.blk__header--center{align-items:center;text-align:center}.blk__content{display:flex;flex-direction:column;gap:var(--sp-8)}.blk__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--sp-8)}.blk__grid--3col{grid-template-columns:repeat(3,1fr)}.blk--left{flex-direction:row;align-items:flex-start}.blk--left .blk__header{flex:0 0 400px;position:sticky;inset-block-start:var(--sp-5)}.blk--left .blk__content{flex:1}";var To=Object.defineProperty,Lo=Object.getOwnPropertyDescriptor,Xt=(a,t,e,d)=>{for(var o=d>1?void 0:d?Lo(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&To(t,e,o),o};let Ct=class extends J{constructor(){super(...arguments),this.align="top",this.columns=2,this.showHeader=!0,this.showFooter=!1,this.showButtons=!1}render(){return u`
      <div class="blk ${this.align==="left"?"blk--left":""}">
        ${this.showHeader?u`<div class="blk__header"><slot name="header"></slot></div>`:g}
        <div class="blk__content">
          <div
            class="blk__grid ${this.columns===3?"blk__grid--3col":""}"
          >
            <slot></slot>
          </div>
        </div>
        ${this.showFooter?u`<slot name="footer"></slot>`:g}
      </div>
    `}};Xt([b({type:String})],Ct.prototype,"align",2);Xt([b({type:Number})],Ct.prototype,"columns",2);Xt([b({type:Boolean})],Ct.prototype,"showHeader",2);Xt([b({type:Boolean})],Ct.prototype,"showFooter",2);Xt([b({type:Boolean})],Ct.prototype,"showButtons",2);Ct=Xt([W({tag:"june-blocks",styles:Io})],Ct);const Po=":host{display:block}.blk__card{background:var(--grey-50);border-radius:var(--r-md);padding:var(--sp-6);display:flex;flex-direction:column;gap:var(--sp-5);transition:transform var(--duration-fast) var(--ease),box-shadow var(--duration-fast) var(--ease)}.blk__card:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}.blk__card-top{display:flex;flex-direction:column;gap:var(--sp-2)}.blk__card-icon{width:32px;height:32px;max-width:48px;max-height:48px;display:flex;align-items:center;justify-content:center;color:var(--grey-400)}::slotted(svg),.blk__card-icon svg{width:24px;height:24px}.blk__card-title{font:var(--title-4);color:var(--black)}.blk__card-body{font:var(--body-m);color:var(--text)}.blk__card-link{display:inline-flex;align-items:center;gap:var(--sp-1);font:var(--link);color:var(--black);text-decoration:underline;text-underline-offset:3px;transition:color var(--duration-fast) var(--ease)}.blk__card-link:hover{color:var(--brand, var(--gx))}.blk__card-link svg{width:24px;height:24px}@media(prefers-reduced-motion:reduce){.blk__card{transition:none}.blk__card:hover{transform:none}}";var Do=Object.defineProperty,Mo=Object.getOwnPropertyDescriptor,xe=(a,t,e,d)=>{for(var o=d>1?void 0:d?Mo(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Do(t,e,o),o};const Ro=_t`<path d="M7 17L17 7"/><path d="M7 7h10v10"/>`;let Wt=class extends J{constructor(){super(...arguments),this.cardTitle="",this.body="",this.linkText="",this.linkHref="#"}render(){return u`
      <div class="blk__card">
        <div class="blk__card-top">
          <div class="blk__card-icon"><slot name="icon"></slot></div>
          <div class="blk__card-title">${this.cardTitle}</div>
        </div>
        <div class="blk__card-body">${this.body}</div>
        ${this.linkText?u`<a class="blk__card-link" href="${this.linkHref}"
              >${this.linkText} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ro}</svg></a>`:g}
      </div>
    `}};xe([b({type:String})],Wt.prototype,"cardTitle",2);xe([b({type:String})],Wt.prototype,"body",2);xe([b({type:String})],Wt.prototype,"linkText",2);xe([b({type:String})],Wt.prototype,"linkHref",2);Wt=xe([W({tag:"june-block-card",styles:Po})],Wt);const Oo='@charset "UTF-8";:host{display:block}.lam-container{position:relative;padding:var(--sp-10);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--sp-6);background:var(--card);color:var(--black)}.lam-container>*{position:relative;z-index:1}.lam-container--img-full{--_overlay-from: var(--overlay-dark);--_overlay-to: var(--overlay-medium);background-size:cover;background-position:center;min-height:var(--_hero-min-h, 560px)}.lam-container--img-full:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;background:linear-gradient(180deg,var(--_overlay-from) 0%,var(--_overlay-to) 100%);z-index:0}.lam-container--img-full .lam-info ::slotted(*){color:var(--white, #fff)}.lam-info{display:flex;flex-direction:column;align-items:center;gap:var(--sp-4);max-width:940px;width:100%;text-align:center}.lam-cta{display:flex;gap:var(--sp-5);align-items:center;justify-content:center}:host([align=left]) .lam-info{align-items:flex-start;text-align:start}:host([align=left]) .lam-cta{justify-content:flex-start}.lam-split{display:flex;background:var(--card);overflow:hidden}.lam-split__content{flex:11;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:var(--sp-6);padding-block:var(--sp-10);padding-inline:var(--sp-8);color:var(--black);overflow:hidden;min-width:0}.lam-split__content .lam-info{align-items:flex-start;text-align:start}.lam-split__content .lam-cta{justify-content:flex-start}.lam-split__image{flex:9;overflow:hidden;min-height:100%;position:relative}.lam-split__image ::slotted(img){width:100%;height:100%;object-fit:cover}.lam-bottom-image{width:100%;height:var(--_bottom-img-h, 400px);overflow:hidden}.lam-bottom-image ::slotted(img){width:100%;height:100%;object-fit:cover}';var qo=Object.defineProperty,Ho=Object.getOwnPropertyDescriptor,Qt=(a,t,e,d)=>{for(var o=d>1?void 0:d?Ho(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&qo(t,e,o),o};let jt=class extends J{constructor(){super(...arguments),this.align="center",this.imagePosition="none",this.showEyebrow=!0,this.showSecondary=!0,this.showPlain=!0}_renderContent(){return u`
      ${this.showEyebrow?u`<slot name="eyebrow"></slot>`:g}
      <div class="lam-info">
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </div>
      <div class="lam-cta">
        <slot name="cta"></slot>
      </div>
    `}_renderNone(){return u`
      <div class="lam-container">
        ${this._renderContent()}
      </div>
    `}_renderFull(){return u`
      <div class="lam-container lam-container--img-full">
        ${this._renderContent()}
      </div>
    `}_renderRight(){return u`
      <div class="lam-split">
        <div class="lam-split__content">
          ${this._renderContent()}
        </div>
        <div class="lam-split__image">
          <slot name="image"></slot>
        </div>
      </div>
    `}_renderBottom(){return u`
      <div>
        <div class="lam-container">
          ${this._renderContent()}
        </div>
        <div class="lam-bottom-image">
          <slot name="image"></slot>
        </div>
      </div>
    `}render(){switch(this.imagePosition){case"full":return this._renderFull();case"right":return this._renderRight();case"bottom":return this._renderBottom();case"none":default:return this._renderNone()}}};Qt([b({type:String,reflect:!0})],jt.prototype,"align",2);Qt([b({type:String,reflect:!0,attribute:"image-position"})],jt.prototype,"imagePosition",2);Qt([b({type:Boolean,attribute:"show-eyebrow"})],jt.prototype,"showEyebrow",2);Qt([b({type:Boolean,attribute:"show-secondary"})],jt.prototype,"showSecondary",2);Qt([b({type:Boolean,attribute:"show-plain"})],jt.prototype,"showPlain",2);jt=Qt([W({tag:"june-look-at-me",styles:Oo})],jt);const zo='@charset "UTF-8";:host{display:block}.sat{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--sp-10) var(--_section-px, var(--sp-10));gap:var(--sp-10);background:var(--card);color:var(--black)}.sat__header{display:flex;flex-direction:column;align-items:center;gap:var(--sp-4);width:940px;max-width:100%;text-align:center}.sat__header--left{align-items:flex-start;text-align:start;width:100%}.sat__feature{display:flex;gap:var(--sp-9);width:100%;align-items:flex-start}.sat__feature--right{flex-direction:row-reverse}.sat__text{flex:1 0 0;display:flex;flex-direction:column;align-items:flex-start;gap:var(--sp-6);min-width:0}.sat__icon{width:64px;height:64px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.sat__icon ::slotted(*){width:64px;height:64px}.sat__info{display:flex;flex-direction:column;align-items:flex-start;gap:var(--sp-4);width:100%}.sat__cta{display:flex;gap:var(--sp-5);align-items:center}.sat__media{flex:1 0 0;display:flex;flex-direction:column;justify-content:center;gap:var(--sp-2);align-self:stretch;min-width:0}.sat__media-wrap{flex:1 0 0;position:relative;min-height:0;overflow:hidden}.sat__media-wrap ::slotted(img){position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;display:block;object-fit:cover}.sat__footer{display:flex;align-items:center;justify-content:center}';var Go=Object.defineProperty,No=Object.getOwnPropertyDescriptor,$a=(a,t,e,d)=>{for(var o=d>1?void 0:d?No(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Go(t,e,o),o};let Pe=class extends J{constructor(){super(...arguments),this.textPosition="left",this.headerAlign="center"}render(){const a=this.textPosition==="right",t=this.headerAlign==="left";return u`
      <div class="sat">
        <div class="sat__header ${t?"sat__header--left":""}"
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </div>

        <div class="sat__feature ${a?"sat__feature--right":""}">
          <div class="sat__text">
            <div class="sat__icon">
              <slot name="icon"></slot>
            </div>
            <div class="sat__info">
              <slot name="kicker"></slot>
              <slot name="feature-title"></slot>
              <slot name="feature-body"></slot>
            </div>
            <div class="sat__cta">
              <slot name="cta"></slot>
            </div>
          </div>

          <div class="sat__media">
            <div class="sat__media-wrap">
              <slot name="media"></slot>
            </div>
            <slot name="caption"></slot>
          </div>
        </div>

        <div class="sat__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `}};$a([b({type:String,reflect:!0,attribute:"text-position"})],Pe.prototype,"textPosition",2);$a([b({type:String,reflect:!0,attribute:"header-align"})],Pe.prototype,"headerAlign",2);Pe=$a([W({tag:"june-show-and-tell",styles:zo})],Pe);const Uo='@charset "UTF-8";:host{display:block}.isl{padding:var(--sp-10);background:var(--card)}.isl__card{display:flex;background:var(--grey-50);border-radius:var(--r-3xl);overflow:hidden}.isl__card--right{flex-direction:row-reverse}.isl__text{flex:1 0 0;display:flex;flex-direction:column;align-items:flex-start;gap:var(--sp-6);padding:var(--sp-10) var(--sp-8);min-width:0}.isl__logo{max-width:160px;max-height:48px}.isl__logo ::slotted(*){display:block;max-width:100%;height:auto}.isl__banner{display:inline-flex;align-items:center;gap:var(--sp-2);padding:var(--sp-2) var(--sp-3);border:1px solid var(--card-border);border-radius:var(--r-full)}.isl__info{display:flex;flex-direction:column;align-items:flex-start;gap:var(--sp-4);width:100%}.isl__cta{display:flex;gap:var(--sp-5);align-items:center}.isl__media{flex:1 0 0;position:relative;min-width:0;align-self:stretch}.isl__media-wrap{position:absolute;top:0;right:0;bottom:0;left:0}.isl__media-wrap ::slotted(img){width:100%;height:100%;display:block;object-fit:cover}';var Vo=Object.defineProperty,Wo=Object.getOwnPropertyDescriptor,Ls=(a,t,e,d)=>{for(var o=d>1?void 0:d?Wo(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Vo(t,e,o),o};let ia=class extends J{constructor(){super(...arguments),this.textPosition="left"}render(){const a=this.textPosition==="right";return u`
      <div class="isl">
        <div class="isl__card ${a?"isl__card--right":""}">
          <div class="isl__text">
            <div class="isl__logo">
              <slot name="logo"></slot>
            </div>
            <div class="isl__banner">
              <slot name="banner"></slot>
            </div>
            <div class="isl__info">
              <slot name="kicker"></slot>
              <slot name="title"></slot>
              <slot name="body"></slot>
            </div>
            <div class="isl__cta">
              <slot name="cta"></slot>
            </div>
          </div>

          <div class="isl__media">
            <div class="isl__media-wrap">
              <slot name="media"></slot>
            </div>
          </div>
        </div>
      </div>
    `}};Ls([b({type:String,reflect:!0,attribute:"text-position"})],ia.prototype,"textPosition",2);ia=Ls([W({tag:"june-island",styles:Uo})],ia);const Jo='@charset "UTF-8";:host{display:block}.jf{--_label-c: var(--black);--_input-bg: var(--input-bg, var(--card));--_input-bd: var(--input-border, var(--card-border));--_input-c: var(--black);--_focus-bd: var(--brand, var(--gx));--_error-c: var(--error);--_error-bg: var(--error-bg);--_hint-c: var(--grey-500);--_dis-bg: var(--input-disabled-bg, var(--grey-200));--_dis-c: var(--input-disabled-text, var(--grey-400));--_req-c: var(--grey-500);display:flex;flex-direction:column;gap:var(--sp-1)}.jf__label{font:var(--body-s-strong);color:var(--_label-c);cursor:pointer}.jf__required{font:var(--body-xs);color:var(--_req-c);margin-inline-start:var(--sp-1)}.jf__wrap{position:relative;display:flex;align-items:center}.jf__input,.jf__textarea,.jf__select{width:100%;box-sizing:border-box;height:44px;padding:var(--sp-2) var(--sp-3);font:var(--body-s);color:var(--_input-c);background:var(--_input-bg);border:2px solid var(--_input-bd);border-radius:var(--r-sm);outline:none;transition:border-color var(--duration-fast) var(--ease),box-shadow var(--duration-fast) var(--ease),background var(--duration-fast) var(--ease)}.jf__textarea{height:auto;resize:vertical;min-height:calc(var(--sp-2) * 2 + 44px + 22px)}.jf__select{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding-inline-end:calc(var(--sp-3) * 2 + 12px);cursor:pointer}.jf__input::placeholder,.jf__textarea::placeholder{color:var(--grey-400)}.jf__input:hover:not(:focus):not(:disabled),.jf__textarea:hover:not(:focus):not(:disabled),.jf__select:hover:not(:focus):not(:disabled){border-color:var(--grey-400)}.jf__input:focus,.jf__textarea:focus,.jf__select:focus{border-color:var(--_focus-bd);box-shadow:0 0 0 1px var(--_focus-bd)}.jf__input:disabled,.jf__textarea:disabled,.jf__select:disabled{background:var(--_dis-bg);color:var(--_dis-c);border-color:transparent;cursor:not-allowed}.jf--error .jf__input,.jf--error .jf__textarea,.jf--error .jf__select{border-color:var(--_error-c);background:var(--_error-bg)}.jf--error .jf__input:focus,.jf--error .jf__textarea:focus,.jf--error .jf__select:focus{box-shadow:0 0 0 1px var(--_error-c)}.jf__chevron{position:absolute;inset-inline-end:var(--sp-3);inset-block-start:50%;transform:translateY(-50%);pointer-events:none;display:flex;color:var(--grey-500)}.jf__hint{font:var(--body-xs);color:var(--_hint-c)}.jf__error{display:flex;align-items:flex-start;gap:var(--sp-1);font:var(--body-xs);color:var(--_error-c)}.jf__error-icon{display:flex;align-items:center;flex-shrink:0;margin-block-start:var(--sp-0);color:var(--_error-c)}.jf--hover .jf__input,.jf--hover .jf__textarea,.jf--hover .jf__select{border-color:var(--grey-400)}.jf--focus .jf__input,.jf--focus .jf__textarea,.jf--focus .jf__select{border-color:var(--_focus-bd);box-shadow:0 0 0 1px var(--_focus-bd)}.jf--disabled .jf__input,.jf--disabled .jf__textarea,.jf--disabled .jf__select{background:var(--_dis-bg);color:var(--_dis-c);border-color:transparent;cursor:not-allowed}:host-context([data-brand=gx]) .jf{--_focus-bd: var(--gx)}:host-context([data-brand=nx]) .jf{--_focus-bd: var(--nx)}:host-context([data-brand=ge]) .jf{--_focus-bd: var(--ge)}@media(prefers-reduced-motion:reduce){.jf__input,.jf__textarea,.jf__select{transition:none}}';var Ko=Object.defineProperty,Yo=Object.getOwnPropertyDescriptor,B=(a,t,e,d)=>{for(var o=d>1?void 0:d?Yo(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Ko(t,e,o),o};let Xo=0;const Qo=_t`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="5" x2="8" y2="9"/><circle cx="8" cy="11.5" r="0.5" fill="currentColor" stroke="none"/></svg>`,Zo=_t`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;let F=class extends J{constructor(){super(...arguments),this.type="text",this.label="",this.value="",this.placeholder="",this.hint="",this.error="",this.required=!1,this.disabled=!1,this.readonly=!1,this.name="",this.options=[],this.rows=4,this.showRequiredText=!1,this.forceState="",this.placeholderSelect="Select one",this.requiredText="(required)",this.errorText="",this._uid=++Xo}get _inputId(){return`jf-input-${this._uid}`}get _hintId(){return`jf-hint-${this._uid}`}get _errorId(){return`jf-error-${this._uid}`}focusInput(){var t;const a=(t=this.shadowRoot)==null?void 0:t.querySelector(".jf__input, .jf__textarea, .jf__select");a==null||a.focus()}_onInput(a){const t=a.target;this.value=t.value,this.dispatchEvent(new CustomEvent("jf-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}_onChange(a){const t=a.target;this.value=t.value,this.dispatchEvent(new CustomEvent("jf-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_onSelectKeydown(a){if(a.key==="ArrowDown"||a.key==="ArrowUp"){a.preventDefault();const t=a.target,e=a.key==="ArrowDown"?1:-1,d=t.selectedIndex+e;d>=0&&d<t.options.length&&(t.selectedIndex=d,this.value=t.value,this.dispatchEvent(new CustomEvent("jf-change",{detail:{value:this.value},bubbles:!0,composed:!0})))}}_describedBy(){const a=[];return this.hint&&a.push(this._hintId),this.error&&a.push(this._errorId),a.length?a.join(" "):g}_rootClasses(){const a=["jf"];return(this.error||this.forceState==="error")&&a.push("jf--error"),this.forceState&&this.forceState!=="error"&&a.push(`jf--${this.forceState}`),a.join(" ")}render(){const a=this.type==="dropdown"&&!this.placeholder?this.placeholderSelect:this.placeholder,t=this.disabled||this.forceState==="disabled";return u`
      <div class=${this._rootClasses()}>
        <label class="jf__label" for=${this._inputId}>
          ${this.label}${this.showRequiredText&&this.required?u`<span class="jf__required">${this.requiredText}</span>`:g}
        </label>

        <div class="jf__wrap">
          ${this.type==="textarea"?this._renderTextarea(a,t):this.type==="dropdown"?this._renderSelect(a,t):this._renderInput(a,t)}
        </div>

        ${this.hint?u`<span class="jf__hint" id=${this._hintId}>${this.hint}</span>`:g}

        ${this.error||this.forceState==="error"?u`
            <div class="jf__error" id=${this._errorId} role="alert" aria-live="assertive">
              <span class="jf__error-icon">${Qo}</span>
              ${this.error||this.errorText}
            </div>`:g}
      </div>
    `}_renderInput(a,t){return u`
      <input
        class="jf__input"
        id=${this._inputId}
        type=${this.type}
        .value=${this.value}
        placeholder=${a||g}
        ?disabled=${t}
        ?readonly=${this.readonly}
        ?required=${this.required}
        name=${this.name||g}
        aria-describedby=${this._describedBy()}
        aria-invalid=${this.error?"true":g}
        aria-required=${this.required?"true":g}
        @input=${this._onInput}
      />
    `}_renderTextarea(a,t){return u`
      <textarea
        class="jf__textarea"
        id=${this._inputId}
        rows=${this.rows}
        .value=${this.value}
        placeholder=${a||g}
        ?disabled=${t}
        ?readonly=${this.readonly}
        ?required=${this.required}
        name=${this.name||g}
        aria-describedby=${this._describedBy()}
        aria-invalid=${this.error?"true":g}
        aria-required=${this.required?"true":g}
        @input=${this._onInput}
      ></textarea>
    `}_renderSelect(a,t){return u`
      <select
        class="jf__select"
        id=${this._inputId}
        ?disabled=${t}
        ?required=${this.required}
        name=${this.name||g}
        aria-describedby=${this._describedBy()}
        aria-invalid=${this.error?"true":g}
        aria-required=${this.required?"true":g}
        @change=${this._onChange}
        @keydown=${this._onSelectKeydown}
      >
        ${a?u`<option value="" disabled ?selected=${!this.value}>${a}</option>`:g}
        ${this.options.map(e=>u`
          <option value=${e.value} ?selected=${e.value===this.value}>${e.label}</option>
        `)}
      </select>
      <span class="jf__chevron">${Zo}</span>
    `}};B([b({type:String,reflect:!0})],F.prototype,"type",2);B([b({type:String})],F.prototype,"label",2);B([b({type:String})],F.prototype,"value",2);B([b({type:String})],F.prototype,"placeholder",2);B([b({type:String})],F.prototype,"hint",2);B([b({type:String})],F.prototype,"error",2);B([b({type:Boolean,reflect:!0})],F.prototype,"required",2);B([b({type:Boolean,reflect:!0})],F.prototype,"disabled",2);B([b({type:Boolean,reflect:!0})],F.prototype,"readonly",2);B([b({type:String})],F.prototype,"name",2);B([b({type:Array})],F.prototype,"options",2);B([b({type:Number})],F.prototype,"rows",2);B([b({type:Boolean,attribute:"show-required-text"})],F.prototype,"showRequiredText",2);B([b({type:String,attribute:"force-state",reflect:!0})],F.prototype,"forceState",2);B([b({type:String,attribute:"placeholder-select"})],F.prototype,"placeholderSelect",2);B([b({type:String,attribute:"required-text"})],F.prototype,"requiredText",2);B([b({type:String,attribute:"error-text"})],F.prototype,"errorText",2);F=B([W({tag:"june-field",styles:Jo})],F);const td='@charset "UTF-8";:host{display:block}.lm{display:flex;align-items:center;gap:var(--sp-10);padding:var(--sp-10) var(--_section-px, var(--sp-10));background:var(--grey-50);color:var(--black)}.lm__text{flex:1 1 0%;display:flex;flex-direction:column;gap:var(--sp-6);min-width:0}.lm__cta{display:flex;gap:var(--sp-5);align-items:center;flex-shrink:0}@media(max-width:1024px){.lm{flex-direction:column;align-items:flex-start;gap:var(--sp-6);padding:var(--sp-9) var(--sp-8)}.lm__cta{gap:var(--sp-5)}}@media(max-width:640px){.lm{padding:var(--sp-8) var(--sp-5)}.lm__text{gap:var(--sp-5)}.lm__cta{flex-direction:column;align-items:flex-start;gap:var(--sp-4)}}';var ed=Object.getOwnPropertyDescriptor,ad=(a,t,e,d)=>{for(var o=d>1?void 0:d?ed(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=s(o)||o);return o};let Qa=class extends J{render(){return u`
      <div class="lm">
        <div class="lm__text">
          <slot name="title"></slot>
          <slot name="body"></slot>
        </div>
        <div class="lm__cta">
          <slot name="cta"></slot>
        </div>
      </div>
    `}};Qa=ad([W({tag:"june-learn-more",styles:td})],Qa);const sd='@charset "UTF-8";:host{display:block}.scb{padding:var(--sp-10) var(--_section-px, var(--sp-10));background:var(--grey-50)}.scb__inner{display:flex;gap:var(--sp-8);align-items:flex-start;justify-content:center}.scb__info{flex:1 0 0;display:flex;flex-direction:column;align-items:flex-start;padding-block-start:var(--sp-4);min-width:0}.scb__text{display:flex;flex-direction:column;gap:var(--sp-4);padding-block-end:var(--sp-6);width:100%}.scb__avatar{width:var(--_avatar-size, 130px);height:var(--_avatar-size, 130px);position:relative;flex-shrink:0}.scb__avatar ::slotted(img){width:100%;height:100%;display:block;object-fit:cover;border-radius:50%}.scb__avatar-ring{position:absolute;top:0;right:0;bottom:0;left:0;border-radius:50%;border:var(--_ring-width, 3px) solid var(--gx);pointer-events:none}:host-context([data-brand=gx]) .scb__avatar-ring{border-color:var(--gx)}:host-context([data-brand=nx]) .scb__avatar-ring{border-color:var(--nx)}:host-context([data-brand=ge]) .scb__avatar-ring{border-color:var(--ge)}.scb__form{flex:1 0 0;display:flex;flex-direction:column;gap:var(--sp-4);min-width:0}';var od=Object.getOwnPropertyDescriptor,dd=(a,t,e,d)=>{for(var o=d>1?void 0:d?od(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=s(o)||o);return o};let Za=class extends J{render(){return u`
      <div class="scb">
        <div class="scb__inner">
          <div class="scb__info">
            <div class="scb__text">
              <slot name="title"></slot>
              <slot name="body"></slot>
            </div>
            <div class="scb__avatar">
              <slot name="avatar"></slot>
              <div class="scb__avatar-ring"></div>
            </div>
          </div>

          <div class="scb__form">
            <slot name="form"></slot>
          </div>
        </div>
      </div>
    `}};Za=dd([W({tag:"june-smiley-contact-box",styles:sd})],Za);const Ps='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',Aa='<svg width="6" height="9" viewBox="0 0 6 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 1 5 4.5 1 8"/></svg>',Sa='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',Ds='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Ms='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',Rs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',Os='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',qs='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',ct='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="16" height="11" rx="1.5"/><path d="M6 17h8M10 14v3"/></svg>',pt='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="12" height="16" rx="1.5"/><path d="M9 16h2"/></svg>',vt='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="2" width="9" height="16" rx="1.5"/><path d="M9 16h2"/></svg>',rd='<svg class="blk__card-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12.5l9-9M5.5 3.5h7v7"/></svg>',x='<svg class="si" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',id='<svg fill="none" viewBox="0 0 64 64"><path fill="var(--icon-accent)" d="M27.13 14.16a1.34 1.34 0 0 1 2.36 0l5.1 9.33q.2.34.54.54l9.33 5.1c.94.51.94 1.85 0 2.36l-9.33 5.1q-.35.2-.53.54l-5.11 9.33c-.51.94-1.85.94-2.36 0l-5.1-9.33q-.2-.35-.54-.53l-9.33-5.11a1.34 1.34 0 0 1 0-2.36l9.33-5.1q.34-.2.54-.54z"/><path fill="var(--icon-line)" d="M44.87 40.61a.38.38 0 0 1 .67 0L47 43.27q.06.1.16.15l2.65 1.45c.27.15.27.53 0 .67L47.15 47a.4.4 0 0 0-.16.16l-1.45 2.65a.38.38 0 0 1-.67 0l-1.45-2.65a.4.4 0 0 0-.15-.16l-2.66-1.45a.38.38 0 0 1 0-.67l2.66-1.45a.4.4 0 0 0 .15-.15z"/></svg>',ld='<svg fill="none" viewBox="0 0 64 64"><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M32.51 51.3a17.05 17.05 0 1 0 0-34.1 17.05 17.05 0 0 0 0 34.1Z"/><path fill="var(--icon-fill)" d="M32.51 25.35a8.17 8.17 0 1 0 0-16.35 8.17 8.17 0 0 0 0 16.35"/><path fill="var(--icon-accent)" d="M15.46 39.7a5.46 5.46 0 1 0 0-10.92 5.46 5.46 0 0 0 0 10.92"/><path fill="var(--icon-accent)" d="M49.42 39.66a5.46 5.46 0 1 0 0-10.93 5.46 5.46 0 0 0 0 10.93"/><path fill="var(--icon-line)" d="M32.51 55a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4"/></svg>',nd='<svg fill="none" viewBox="0 0 64 64"><path fill="var(--icon-fill)" d="M60.4 24.16a15.16 15.16 0 1 0-15.2 15.16c2.47 0 4.78-.58 6.82-1.63l5.77 1.12c.22.04.43-.15.37-.37l-.94-5.09a15 15 0 0 0 3.13-9.19z"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M7.02 49.65q-.43 0-.88-.14A4.65 4.65 0 0 1 3 45.09V24.36a3.73 3.73 0 0 1 3.73-3.73h36.39a3.73 3.73 0 0 1 3.73 3.73v21.67a3.73 3.73 0 0 1-3.73 3.73H16.99L9.47 55v-5.33H7.04z"/><path fill="var(--icon-accent)" d="M11.53 32.14a3.99 3.99 0 1 0 0-7.98 3.99 3.99 0 0 0 0 7.98"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M7.54 38.8h23.25"/></svg>',cd='<svg fill="none" viewBox="-1 -1 66 66"><path fill="var(--icon-fill)" d="M15.62 53.07V25.75A15.8 15.8 0 0 1 31.37 10a15.8 15.8 0 0 1 15.75 15.75v27.32z"/><path fill="var(--icon-fill)" d="M15.66 24.66A15.8 15.8 0 0 1 31.37 10a15.8 15.8 0 0 1 15.67 14.14"/><path fill="var(--icon-bg)" d="M48.58 24.74H14.17a14.17 14.17 0 0 0 0 28.34h34.41a14.17 14.17 0 1 0 0-28.34Z"/><path fill="var(--icon-accent)" d="M47.96 54c8.35 0 15.11-6.78 15.11-15.15s-6.76-15.16-15.1-15.16A15.15 15.15 0 0 0 47.96 54"/><path fill="var(--icon-line)" d="M43.59 29.3a5.53 5.53 0 1 0-.02-11.05 5.53 5.53 0 0 0 .02 11.05"/><path fill="none" stroke="var(--icon-line)" stroke-miterlimit="10" d="M48.58 24.74H14.17a14.17 14.17 0 0 0 0 28.34h34.41a14.17 14.17 0 1 0 0-28.34Z"/></svg>',pd='<svg fill="none" viewBox="0 0 64 64"><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M56.65 9H6.35C5.6 9 5 9.74 5 10.66v9.68c0 .92.6 1.66 1.35 1.66h50.3c.75 0 1.35-.74 1.35-1.66v-9.68C58 9.74 57.4 9 56.65 9Z"/><path fill="var(--icon-line)" d="M12.14 17.1a1.85 1.85 0 1 0 0-3.69 1.85 1.85 0 0 0 0 3.7"/><path fill="var(--icon-fill)" d="M56.92 26H6.08c-.6 0-1.08.55-1.08 1.23v9.54c0 .68.48 1.23 1.08 1.23h50.84c.6 0 1.08-.55 1.08-1.23v-9.54c0-.68-.48-1.23-1.08-1.23"/><path fill="var(--icon-line)" d="M12.14 33.86a1.85 1.85 0 1 0 0-3.7 1.85 1.85 0 0 0 0 3.7"/><path fill="var(--icon-accent)" d="M56.92 42H6.08c-.6 0-1.08.6-1.08 1.33v10.34C5 54.4 5.48 55 6.08 55h50.84c.6 0 1.08-.6 1.08-1.33V43.33c0-.73-.48-1.33-1.08-1.33"/><path fill="var(--icon-line)" d="M12.14 50.59a1.85 1.85 0 1 0 0-3.7 1.85 1.85 0 0 0 0 3.7"/></svg>',vd='<svg fill="none" viewBox="0 0 64 64"><path fill="var(--icon-line)" d="m33.76 41.81 5.91-16.45h1.7l5.91 16.45H46l-1.81-5.04h-7.4l-1.8 5.04zm6.72-15.39-3.34 9.32h6.67zM53.13 42c-2.37 0-4.07-1.15-4.07-3.42 0-2.79 2.67-3.64 5.64-3.64h2.5v-1.08c0-2.25-.92-3.22-3.03-3.22-1.82 0-3.1.78-3.38 2.56h-1.2c.28-2.53 2.35-3.6 4.62-3.6 2.51 0 4.21 1.2 4.21 4.26v7.96H57.2v-1.84c-.76 1.17-2.04 2.02-4.07 2.02m.1-.98c2.2 0 3.97-1.3 3.97-3.09v-2.04h-2.46c-2.5 0-4.46.52-4.46 2.69 0 1.54.97 2.44 2.94 2.44"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M27.88 14H6.43c-1.24 0-2.24 1-2.24 2.24v21.92c0 1.24 1 2.24 2.24 2.24h21.45c1.24 0 2.24-1 2.24-2.24V16.24c0-1.24-1-2.24-2.24-2.24Z"/><path fill="var(--icon-accent)" d="m23.22 27.19-6.06-6.07-6.07 6.07 6.07 6.07z"/><path fill="var(--icon-accent)" d="M58.34 14h-4.15c-.3 0-.53.24-.53.53v4.15c0 .3.24.53.53.53h4.15c.3 0 .53-.24.53-.53v-4.15c0-.3-.24-.53-.53-.53"/><path stroke="var(--icon-fill)" stroke-miterlimit="10" stroke-width=".5" d="m57.28 16.22-1.01 1.02-1.02-1.02"/><path fill="var(--icon-line)" d="m29.53 49.78-4.54-13.1c-.07-.22.14-.42.35-.32l12.15 5.42c.23.1.19.45-.06.5l-6 1.09a.3.3 0 0 0-.21.21l-1.19 6.17c-.05.26-.42.29-.5.04z"/></svg>',hd='<svg fill="none" viewBox="0 0 64 64"><path fill="var(--icon-fill)" d="M27.22 9.13H4v37.66h23.22z"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M58.74 9.5v37.03H36.5V9.5z"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M11.1 32.63V55h41.3v-7.95"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M51.96 21.1v15.3h-24.7"/><path fill="var(--icon-line)" d="M11.15 35.2a2.57 2.57 0 1 0 0-5.14 2.57 2.57 0 0 0 0 5.14"/><path fill="var(--icon-accent)" d="M51.95 23.56a3.1 3.1 0 1 0 0-6.18 3.1 3.1 0 0 0 0 6.18"/></svg>',bd='<svg fill="none" viewBox="0 0 64 64"><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M39.5 26.43V10h15.6"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M59.85 30.25 39.5 10"/><path fill="var(--icon-line)" d="M59.4 36.48H39.8V55h19.6z"/><path fill="var(--icon-fill)" d="M31.93 28.2H4v26.78h27.93z"/><path fill="var(--icon-accent)" d="M31.93 9H4v13.69h27.93z"/></svg>',ud='<svg fill="none" viewBox="0 0 64 64"><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M32 55a23 23 0 1 0 0-46 23 23 0 0 0 0 46Z"/><path fill="var(--icon-accent)" d="M23.7 33.88v-8.4l8.1-3.84 8.52 3.84v8.4c-2.06 7.3-8.3 8.48-8.3 8.48-7.5-2.28-8.3-8.48-8.3-8.48z"/><path stroke="var(--icon-fill)" stroke-miterlimit="10" d="m34.97 29.2-4.1 3.97L29 31.2"/></svg>',gd='<svg fill="none" viewBox="0 0 64 64"><path fill="var(--icon-fill)" d="M31.69 31.58a4.5 4.5 0 1 0-8.98 0 4.5 4.5 0 0 0 8.98 0"/><path fill="var(--icon-fill)" d="M17.35 49.03a9.85 9.85 0 0 1 19.68 0"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M51.12 14.88H3.27c-.7 0-1.27.57-1.27 1.27v37.58c0 .7.57 1.27 1.27 1.27h47.85c.7 0 1.27-.57 1.27-1.27V16.15c0-.7-.57-1.27-1.27-1.27Z"/><path stroke="var(--icon-line)" stroke-miterlimit="10" d="M52.4 20.58H2"/><path fill="var(--icon-fill)" stroke="var(--icon-accent)" stroke-miterlimit="10" d="M50.67 32.16a11.58 11.58 0 1 0 0-23.16 11.58 11.58 0 0 0 0 23.16Z"/><path fill="var(--icon-accent)" d="m48.29 16.08 6.84 4.4-6.86 4.6z"/></svg>',me=["ai","api","chatbot","cloud","data","design-system","patterns","scalability","security","webinar"],Ea={ai:id,api:ld,chatbot:nd,cloud:cd,data:pd,"design-system":vd,patterns:hd,scalability:bd,security:ud,webinar:gd};var md=Object.defineProperty,yd=Object.getOwnPropertyDescriptor,Ca=(a,t,e,d)=>{for(var o=d>1?void 0:d?yd(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&md(t,e,o),o};const Hs=[{id:"start",label:"Get started",icon:_t`<svg class="sidebar__section-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h12M8 2l6 6-6 6"/></svg>`,items:[{page:"getting-started",label:"Introduction"},{page:"tokens-export",label:"Tokens export"}]},{id:"foundations",label:"Foundations",icon:_t`<svg class="sidebar__section-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 8s2.8-4.5 6.5-4.5S14.5 8 14.5 8s-2.8 4.5-6.5 4.5S1.5 8 1.5 8z"/><circle cx="8" cy="8" r="2"/></svg>`,items:[{page:"typography",label:"Typography"},{page:"spacing",label:"Spacing"},{page:"colors",label:"Colors"},{page:"shadows",label:"Shadows"},{page:"breakpoints",label:"Breakpoints"},{page:"illustrations",label:"Illustrations"}]},{id:"components",label:"Components",icon:_t`<svg class="sidebar__section-ico" viewBox="-0.5 -0.5 17 17" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`,items:[{page:"button",label:"Button"},{page:"eyebrow",label:"Eyebrow"},{page:"field",label:"Field"}]},{id:"stencils",label:"Stencils",icon:_t`<svg class="sidebar__section-ico" viewBox="-0.5 -0.5 17 17" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="1" width="14" height="6" rx="1"/><rect x="1" y="9" width="14" height="6" rx="1"/></svg>`,items:[{page:"look-at-me",label:"Look at Me"},{page:"show-and-tell",label:"Show and Tell"},{page:"island",label:"Island"},{page:"blocks",label:"Blocks"},{page:"smiley-contact-box",label:"Smiley Contact Box"},{page:"learn-more",label:"Learn More"},{page:"card-row",label:"Card Row"},{page:"deep-dive",label:"Deep Dive",badge:"new"}]}],zs={};Hs.forEach(a=>a.items.forEach(t=>{zs[t.page]=a.label}));let De=class extends M{constructor(){super(...arguments),this._activePage="getting-started",this._collapsed=new Set}createRenderRoot(){return this}setActive(a){this._activePage=a,this.requestUpdate()}_toggleSection(a){if(document.body.classList.contains("sidebar-collapsed")){document.body.classList.remove("sidebar-collapsed");return}this._collapsed.has(a)?this._collapsed.delete(a):this._collapsed.add(a),this.requestUpdate()}_navigate(a){this._activePage=a,this.dispatchEvent(new CustomEvent("navigate",{detail:a,bubbles:!0,composed:!0})),window.matchMedia("(max-width: 700px)").matches&&document.body.classList.add("sidebar-collapsed")}render(){return u`
      <aside class="sidebar" role="navigation" aria-label="Design system navigation">
        <div class="sidebar__top">
          <button class="sidebar__collapse" id="sidebarCollapse"
            aria-label="Collapse sidebar" aria-expanded="true"
            @click=${this._onCollapse}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="14" height="14" rx="2"/>
              <line x1="7" y1="2" x2="7" y2="16"/>
            </svg>
            <span class="sidebar__tooltip">Expand</span>
          </button>
        </div>

        <nav class="sidebar__nav" id="sidebarNav" @keydown=${this._onNavKeydown}>
          ${Hs.map(a=>this._renderSection(a))}
        </nav>

        <div class="sidebar__footer">
          June DS v0.1
        </div>
      </aside>
    `}_renderSection(a){const t=this._collapsed.has(a.id);return u`
      <div class="sidebar__section ${t?"collapsed":""}" data-section=${a.id}>
        <button class="sidebar__section-label"
          aria-expanded=${!t}
          @click=${()=>this._toggleSection(a.id)}>
          <span>${a.icon}</span>
          <span class="sidebar__section-name">${a.label}</span>
          <span class="sidebar__tooltip">${a.label}</span>
        </button>
        <div class="sidebar__items">
          ${a.items.map(e=>u`
            <button class="sidebar__item ${e.page===this._activePage?"active":""}"
              data-page=${e.page}
              aria-current=${e.page===this._activePage?"page":"false"}
              @click=${()=>this._navigate(e.page)}>
              ${e.label}
              ${e.badge?u`<span class="sidebar__badge sidebar__badge--${e.badge}">${e.badge}</span>`:""}
            </button>
          `)}
        </div>
      </div>
    `}_onCollapse(){const a=document.body.classList.toggle("sidebar-collapsed"),t=this.querySelector("#sidebarCollapse");t&&(t.setAttribute("aria-expanded",String(!a)),t.setAttribute("aria-label",a?"Expand sidebar":"Collapse sidebar"))}_onNavKeydown(a){const t=[...this.querySelectorAll(".sidebar__item")],e=t.indexOf(document.activeElement);e!==-1&&(a.key==="ArrowDown"?(a.preventDefault(),t[(e+1)%t.length].focus()):a.key==="ArrowUp"?(a.preventDefault(),t[(e-1+t.length)%t.length].focus()):(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),t[e].click()))}};Ca([Z()],De.prototype,"_activePage",2);Ca([Z()],De.prototype,"_collapsed",2);De=Ca([Q("sidebar-nav")],De);var _d=Object.defineProperty,fd=Object.getOwnPropertyDescriptor,Gs=(a,t,e,d)=>{for(var o=d>1?void 0:d?fd(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&_d(t,e,o),o};let la=class extends M{constructor(){super(...arguments),this._dark=!1,this._prefersDark=window.matchMedia("(prefers-color-scheme: dark)"),this._onSchemeChange=a=>{localStorage.getItem("june-dm")===null&&(this._dark=a.matches,this._apply())}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback();const a=localStorage.getItem("june-dm");a!==null?this._dark=a==="1":this._dark=this._prefersDark.matches,this._apply(),this._prefersDark.addEventListener("change",this._onSchemeChange)}disconnectedCallback(){super.disconnectedCallback(),this._prefersDark.removeEventListener("change",this._onSchemeChange)}_apply(){document.body.classList.toggle("dm",this._dark)}_toggle(){this._dark=!this._dark,this._apply(),localStorage.setItem("june-dm",this._dark?"1":"0")}render(){return u`
      <label class="dm-toggle" for="dm-check">
        <input
          type="checkbox"
          id="dm-check"
          role="switch"
          .checked=${this._dark}
          aria-checked=${this._dark?"true":"false"}
          aria-label="Modo oscuro"
          @change=${this._toggle}
        >
        <span class="dm-toggle__track" aria-hidden="true"></span>
        <span class="dm-toggle__label">Dark</span>
      </label>
    `}};Gs([Z()],la.prototype,"_dark",2);la=Gs([Q("dark-mode-toggle")],la);var kd=Object.getOwnPropertyDescriptor,xd=(a,t,e,d)=>{for(var o=d>1?void 0:d?kd(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=s(o)||o);return o};let ts=class extends M{createRenderRoot(){return this}render(){return u`<div class="copy-toast" id="copy-toast" role="status" aria-live="polite"></div>`}};ts=xd([Q("copy-toast")],ts);var wd=Object.defineProperty,$d=Object.getOwnPropertyDescriptor,Ns=(a,t,e,d)=>{for(var o=d>1?void 0:d?$d(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&wd(t,e,o),o};const Ad="/topbar-icon.png";let na=class extends M{constructor(){super(...arguments),this._currentPage="getting-started",this._handleResize=()=>{window.innerWidth<=700&&document.body.classList.add("sidebar-collapsed")},this._handleBackdropClick=a=>{if(window.matchMedia("(max-width: 500px)").matches&&!document.body.classList.contains("sidebar-collapsed")){const t=this.querySelector(".sidebar"),e=this.querySelector("#sidebarOpen");t&&!t.contains(a.target)&&e&&!e.contains(a.target)&&document.body.classList.add("sidebar-collapsed")}}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),window.innerWidth<=700&&document.body.classList.add("sidebar-collapsed"),window.addEventListener("resize",this._handleResize),document.addEventListener("click",this._handleBackdropClick)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this._handleResize),document.removeEventListener("click",this._handleBackdropClick)}_onNavigate(a){this._currentPage=a.detail,this.dispatchEvent(new CustomEvent("page-change",{detail:a.detail,bubbles:!0}))}_openSidebar(){document.body.classList.remove("sidebar-collapsed")}render(){return u`
      <a href="#page" class="skip-link">Skip to content</a>

      <div class="layout">
        <header class="topbar" role="banner" aria-label="June DS">
          <div class="topbar__left">
            <button class="topbar__open" id="sidebarOpen" aria-label="Open sidebar" @click=${this._openSidebar}>
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="14" height="14" rx="2"/>
                <line x1="7" y1="2" x2="7" y2="16"/>
              </svg>
            </button>
            <img class="topbar__ico" src=${Ad} alt="June DS" />
            <span class="topbar__logo">June DS</span>
          </div>
          <div class="topbar__right">
            <brand-switcher></brand-switcher>
            <dark-mode-toggle></dark-mode-toggle>
          </div>
        </header>

        <div class="body-area">
          <sidebar-nav @navigate=${this._onNavigate}></sidebar-nav>

          <main class="app-content" role="main">
            <div class="content">
              <div class="content__inner" id="page" data-page-id=${this._currentPage}>
                <slot></slot>
              </div>
            </div>
          </main>
        </div>
      </div>

      <button class="scroll-top" id="scrollTop" aria-label="Back to top" @click=${this._scrollTop}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>

      <copy-toast></copy-toast>
    `}firstUpdated(){const a=this.querySelector(".content"),t=this.querySelector("#scrollTop");a&&t&&a.addEventListener("scroll",()=>{t.classList.toggle("visible",a.scrollTop>300)})}_scrollTop(){const a=this.querySelector(".content");a&&a.scrollTo({top:0,behavior:"smooth"})}get currentPage(){return this._currentPage}set currentPage(a){this._currentPage=a;const t=this.querySelector("sidebar-nav");t&&t.setActive(a);const e=this.querySelector(".content__inner");e&&e.setAttribute("data-page-id",a)}};Ns([Z()],na.prototype,"_currentPage",2);na=Ns([Q("app-shell")],na);var Sd=Object.defineProperty,Ed=Object.getOwnPropertyDescriptor,Je=(a,t,e,d)=>{for(var o=d>1?void 0:d?Ed(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Sd(t,e,o),o};const es=[{id:"gx",label:"GeneXus",color:"var(--gx)"},{id:"nx",label:"Next",color:"var(--nx)"},{id:"ge",label:"GEAI",color:"var(--ge)"}];let ye=class extends M{constructor(){super(...arguments),this._brand="gx",this._open=!1,this._visible=!0,this._onBrandAwareChange=a=>{this._visible=a.detail,this._visible||(this._open=!1)},this._onDocClick=a=>{this.contains(a.target)||(this._open=!1)}}createRenderRoot(){return this}_select(a){var t;this._brand=a,this._open=!1,this.dispatchEvent(new CustomEvent("brand-change",{detail:a,bubbles:!0,composed:!0})),(t=this.querySelector(".brand-chip__trigger"))==null||t.focus()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._onDocClick),document.addEventListener("brand-aware-change",this._onBrandAwareChange)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._onDocClick),document.removeEventListener("brand-aware-change",this._onBrandAwareChange)}_focusSelected(){this._open&&this.updateComplete.then(()=>{const a=this.querySelector(".brand-chip__opt.on");a==null||a.focus()})}_onTriggerKeydown(a){(a.key==="ArrowDown"||a.key==="ArrowUp")&&(a.preventDefault(),this._open=!0,this.updateComplete.then(()=>{var o;const t=[...this.querySelectorAll(".brand-chip__opt")],e=t.findIndex(r=>r.classList.contains("on")),d=a.key==="ArrowDown"?Math.min(e+1,t.length-1):Math.max(e-1,0);(o=t[d])==null||o.focus()}))}_onMenuKeydown(a){var d,o,r,s,l;const t=[...this.querySelectorAll(".brand-chip__opt")],e=t.indexOf(document.activeElement);e!==-1&&(a.key==="ArrowDown"?(a.preventDefault(),(d=t[Math.min(e+1,t.length-1)])==null||d.focus()):a.key==="ArrowUp"?(a.preventDefault(),(o=t[Math.max(e-1,0)])==null||o.focus()):a.key==="Home"?(a.preventDefault(),(r=t[0])==null||r.focus()):a.key==="End"?(a.preventDefault(),(s=t[t.length-1])==null||s.focus()):a.key==="Escape"&&(a.preventDefault(),this._open=!1,(l=this.querySelector(".brand-chip__trigger"))==null||l.focus()))}render(){if(!this._visible)return u``;const a=es.find(t=>t.id===this._brand);return u`
      <div class="brand-chip" data-open="${this._open}">
        <button class="brand-chip__trigger"
          @click=${()=>{this._open=!this._open,this._focusSelected()}}
          @keydown=${this._onTriggerKeydown}
          aria-haspopup="listbox" aria-expanded=${this._open}>
          <span class="dot" style="background:${a.color}"></span>
          ${a.label}
          <svg class="brand-chip__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="brand-chip__menu" role="listbox" @keydown=${this._onMenuKeydown}>
          ${es.map(t=>u`
            <button class="brand-chip__opt ${t.id===this._brand?"on":""}"
              role="option" aria-selected=${t.id===this._brand}
              tabindex=${t.id===this._brand?0:-1}
              @click=${()=>this._select(t.id)}>
              <span class="dot" style="background:${t.color}"></span>
              ${t.label}
            </button>
          `)}
        </div>
      </div>
    `}};Je([Z()],ye.prototype,"_brand",2);Je([Z()],ye.prototype,"_open",2);Je([Z()],ye.prototype,"_visible",2);ye=Je([Q("brand-switcher")],ye);var Cd=Object.defineProperty,jd=Object.getOwnPropertyDescriptor,Ke=(a,t,e,d)=>{for(var o=d>1?void 0:d?jd(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Cd(t,e,o),o};let _e=class extends M{constructor(){super(...arguments),this.tabs=[],this.label="Sections",this._active=0}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._restoreActiveTab()}_restoreActiveTab(){var e;const a=window.location.hash.slice(1);if(!a)return;const t=(e=document.querySelector("#page"))==null?void 0:e.getAttribute("data-page-id");if(t&&a.startsWith(t+"-")){const d=a.slice(t.length+1),o=this.tabs.findIndex(r=>r.toLowerCase().replace(/\s+/g,"-").replace(/&/g,"")===d);o>=0&&(this._active=o)}}_select(a){var e;this._active=a,this.dispatchEvent(new CustomEvent("tab-change",{detail:a,bubbles:!0}));const t=(e=document.querySelector("#page"))==null?void 0:e.getAttribute("data-page-id");if(t&&this.tabs[a]){const d=this.tabs[a].toLowerCase().replace(/\s+/g,"-").replace(/&/g,"");window.history.replaceState(null,"",`#${t}-${d}`)}}_onKeydown(a,t){var d;let e=-1;a.key==="ArrowRight"?e=(t+1)%this.tabs.length:a.key==="ArrowLeft"?e=(t-1+this.tabs.length)%this.tabs.length:a.key==="Home"?e=0:a.key==="End"&&(e=this.tabs.length-1),e>=0&&(a.preventDefault(),this._select(e),(d=this.querySelectorAll(".tabs button")[e])==null||d.focus())}render(){return u`
      <div class="tabs" role="tablist" aria-label=${this.label}>
        ${this.tabs.map((a,t)=>u`
          <button
            class=${t===this._active?"on":""}
            role="tab"
            aria-selected=${t===this._active}
            tabindex=${t===this._active?0:-1}
            id="tab-${t}"
            aria-controls="panel-${t}"
            @click=${()=>this._select(t)}
            @keydown=${e=>this._onKeydown(e,t)}
          >${a}</button>
        `)}
      </div>
      ${this.tabs.map((a,t)=>u`
        <div
          class="pane ${t===this._active?"on":""}"
          role="tabpanel"
          id="panel-${t}"
          aria-labelledby="tab-${t}"
        >
          <slot name="panel-${t}"></slot>
        </div>
      `)}
    `}};Ke([b({type:Array})],_e.prototype,"tabs",2);Ke([b({type:String})],_e.prototype,"label",2);Ke([Z()],_e.prototype,"_active",2);_e=Ke([Q("tab-panel")],_e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ca extends wo{constructor(t){if(super(t),this.it=g,t.type!==ko.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===g||t==null)return this._t=void 0,this.it=t;if(t===Et)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ca.directiveName="unsafeHTML",ca.resultType=1;const Fd=xo(ca);function R(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/(&lt;\/?)([\w-]+)/g,'$1<span class="ck">$2</span>').replace(/\s([\w-]+)=/g,' <span class="cv">$1</span>=').replace(/"([^"]*)"/g,'"<span class="cs">$1</span>"').replace(/(&lt;!--.*?--&gt;)/g,'<span class="cc">$1</span>')}const Ye='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';function i(a,t){return`<span class="snip" data-copy-token="${t}"><span class="snip__val">${a}</span><button class="snip__btn" aria-label="Copy ${t}">${Ye}</button></span>`}function p(a){return`<span class="snip" data-copy-color="${a}"><span class="snip__val">${a}</span><button class="snip__btn" aria-label="Copy ${a}">${Ye}</button></span>`}function S(a){navigator.clipboard.writeText(a).catch(()=>{})}let as=0;function C(a){const t=document.getElementById("copy-toast");t&&(t.innerHTML=a,t.classList.add("show"),clearTimeout(as),as=window.setTimeout(()=>t.classList.remove("show"),1500))}function Bd(){let a=document.querySelector(".snip-live-region");a||(a=document.createElement("div"),a.setAttribute("aria-live","polite"),a.setAttribute("aria-atomic","true"),a.className="sr-only snip-live-region",document.body.appendChild(a)),document.querySelectorAll(".snip").forEach(t=>{const e=t,d=e.dataset.copyToken||e.dataset.copyColor;if(!d)return;e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",`Copy ${d}`);const o=async()=>{try{await S(d),e.classList.add("copied"),setTimeout(()=>e.classList.remove("copied"),1500),a&&(a.textContent=`Copied ${d}`,setTimeout(()=>a.textContent="",2e3))}catch(r){console.error("Copy failed:",r),a&&(a.textContent="Copy failed")}};e.addEventListener("click",o),e.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),o())})})}var Id=Object.defineProperty,Td=Object.getOwnPropertyDescriptor,ja=(a,t,e,d)=>{for(var o=d>1?void 0:d?Td(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Id(t,e,o),o};let Me=class extends M{constructor(){super(...arguments),this.code="",this.label="HTML"}createRenderRoot(){return this}_copy(){S(this.code),C("Copied!")}render(){return u`
      <div class="code-snippet">
        <div class="code-snippet__head">
          <span class="code-snippet__label">${this.label}</span>
          <button class="code-snippet__copy" @click=${this._copy} aria-label="Copy code">Copy</button>
        </div>
        <pre class="code-snippet__pre">${Fd(R(this.code))}</pre>
      </div>
    `}};ja([b()],Me.prototype,"code",2);ja([b()],Me.prototype,"label",2);Me=ja([Q("code-snippet")],Me);var Ld=Object.defineProperty,Pd=Object.getOwnPropertyDescriptor,Fa=(a,t,e,d)=>{for(var o=d>1?void 0:d?Pd(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=(d?s(t,e,o):s(o))||o);return d&&o&&Ld(t,e,o),o};let Re=class extends M{constructor(){super(...arguments),this.value="",this.isStatic=!1}createRenderRoot(){return this}_copy(){this.isStatic||(S(this.value),C(`Copied ${this.value}`))}render(){return u`
      <span
        class="tok ${this.isStatic?"tok--static":""}"
        tabindex=${this.isStatic?-1:0}
        role=${this.isStatic?"text":"button"}
        @click=${this._copy}
        @keydown=${a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),this._copy())}}
      >${this.value}</span>
    `}};Fa([b()],Re.prototype,"value",2);Fa([b({type:Boolean,attribute:"static"})],Re.prototype,"isStatic",2);Re=Fa([Q("token-pill")],Re);var Dd=Object.getOwnPropertyDescriptor,Md=(a,t,e,d)=>{for(var o=d>1?void 0:d?Dd(t,e):t,r=a.length-1,s;r>=0;r--)(s=a[r])&&(o=s(o)||o);return o};let ss=class extends M{createRenderRoot(){return this}render(){return u`
      <div class="pg-controls">
        <slot></slot>
      </div>
    `}};ss=Md([Q("playground-controls")],ss);const Rd="/hero-logo.png",Od=`
<style>
.landing { padding: var(--sp-8) 0 var(--sp-7); }
.landing__hero {
  width: 96px;
  height: 96px;
  border-radius: 16px;
  margin-bottom: var(--sp-5);
  user-select: none;
  -webkit-user-drag: none;
}
.landing__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--black);
  margin-bottom: var(--sp-4);
}
.landing__desc {
  font: var(--body-m);
  color: var(--grey-600);
  max-width: 720px;
  margin-bottom: var(--sp-7);
}
.landing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--sp-4);
  margin-bottom: var(--sp-7);
}
.landing__card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--r-lg);
  padding: var(--sp-5);
  display: flex; flex-direction: column;
}
.landing__card-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  color: var(--black);
  margin-bottom: var(--sp-2);
}
.landing__card-desc {
  font: var(--body-s);
  font-weight: 400;
  color: var(--grey-600);
  line-height: 1.5;
}
.landing__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-5);
  padding-top: var(--sp-5);
  border-top: 1px solid var(--card-border);
}
.landing__meta-item {
  font: var(--body-xs);
  font-weight: 400;
  color: var(--grey-600);
}
.landing__meta-val {
  font-weight: 500;
  color: var(--black);
}
@media (max-width: 640px) {
  .landing__title { font-size: 32px; }
  .landing__grid { grid-template-columns: 1fr; }
}
</style>

<div class="landing">
  <img class="landing__hero" src="${Rd}" alt="June DS" />
  <h1 class="landing__title">June DS</h1>
  <p class="landing__desc">
    The living reference for genexus.com — switch brands, try every state, copy tokens. Everything runs in the browser.
  </p>
  <div class="landing__grid">
    <div class="landing__card">
      <span class="landing__card-title">Components</span>
      <span class="landing__card-desc">Ready-made building blocks. Multi-brand, accessible, responsive.</span>
    </div>
    <div class="landing__card">
      <span class="landing__card-title">Tokens</span>
      <span class="landing__card-desc">Exportable CSS custom properties. Zero dependencies.</span>
    </div>
    <div class="landing__card">
      <span class="landing__card-title">Theming</span>
      <span class="landing__card-desc">Three brands, one token base. Colors that adapt across identities.</span>
    </div>
  </div>

  <div class="landing__meta">
    <div class="landing__meta-item"><span class="landing__meta-val">3</span> brands</div>
    <div class="landing__meta-item"><span class="landing__meta-val">10</span> components</div>
    <div class="landing__meta-item"><span class="landing__meta-val">6</span> foundations</div>
    <div class="landing__meta-item"><span class="landing__meta-val">0</span> dependencies</div>
    <div class="landing__meta-item"><span class="landing__meta-val">WCAG 2.2</span> AA</div>
  </div>
</div>
`,qd={title:"Getting Started",desc:"",tabs:["Overview"],content:[Od],hideHeader:!0},Hd=`
<style>
.export-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--sp-4); margin-bottom: var(--sp-5); }
.export-card { border: 1px solid var(--card-border); border-radius: var(--r-lg); padding: var(--sp-5); background: var(--card); display: flex; flex-direction: column; }
.export-card__icon { width: 40px; height: 40px; border-radius: var(--r-md); background: var(--grey-100); display: flex; align-items: center; justify-content: center; margin-bottom: var(--sp-3); }
.export-card__icon svg { width: 20px; height: 20px; color: var(--grey-600); }
.export-card__title { font: var(--title-5); color: var(--black); margin-bottom: var(--sp-1); }
.export-card__desc { font: var(--body-s); font-weight: 400; color: var(--grey-600); margin-bottom: var(--sp-4); flex: 1; }
.export-card__btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--r-sm); font-size: 14px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--card-border); background: var(--card); color: var(--black); transition: all .15s; text-decoration: none; }
.export-card__btn:hover { border-color: var(--black); color: var(--black); background: var(--grey-100); }
.export-card__btn svg { width: 14px; height: 14px; }
</style>

<div class="export-grid">
  <div class="export-card">
    <div class="export-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg></div>
    <div class="export-card__title">tokens.json</div>
    <div class="export-card__desc">All tokens in W3C DTCG format. Ready for Style Dictionary or Theo.</div>
    <a class="export-card__btn" href="tokens.json" download>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Download tokens.json
    </a>
  </div>
  <div class="export-card">
    <div class="export-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div>
    <div class="export-card__title">CSS custom properties</div>
    <div class="export-card__desc">Copy the <code class="tok tok--static">:root</code> block directly into your project.</div>
    <button class="export-card__btn" data-action="copy-root-tokens">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      Copy :root CSS
    </button>
  </div>
</div>
`;function zd(){var a;(a=document.getElementById("page"))==null||a.addEventListener("click",t=>{const e=t.target.closest("[data-action]");e&&e.dataset.action==="copy-root-tokens"&&window._juneCopyRootTokens()})}const Gd={title:"Tokens export",desc:"Take the system with you. CSS custom properties, JSON — pick your format.",tabs:["Export"],content:[Hd],init:zd},Nd=`
    <div class="spec-group"><div class="spec-group-title">Title</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 1</span><span class="spec-detail">Graphik Semibold · 46 / 60</span></div><div class="spec-sample" style="font:var(--title-1)">Future-proof enterprise systems</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 2</span><span class="spec-detail">Graphik Semibold · 36 / 48</span></div><div class="spec-sample" style="font:var(--title-2)">Build fast. Built to last.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 3</span><span class="spec-detail">Graphik Semibold · 26 / 36</span></div><div class="spec-sample" style="font:var(--title-3)">Orchestrate AI agents</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 4</span><span class="spec-detail">Graphik Semibold · 20 / 30</span></div><div class="spec-sample" style="font:var(--title-4)">Low-code for professional developers</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Title 5</span><span class="spec-detail">Graphik Semibold · 17 / 26</span></div><div class="spec-sample" style="font:var(--title-5)">Reduce technical debt at scale</div></div>
    </div>
    <div class="spec-group"><div class="spec-group-title">Highlight</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Highlight L</span><span class="spec-detail">Graphik Light · 26 / 36</span></div><div class="spec-sample" style="font:var(--highlight-l)">The platform that generates native code and evolves with your business.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Highlight M</span><span class="spec-detail">Graphik Light · 20 / 30</span></div><div class="spec-sample" style="font:var(--highlight-m)">Accelerate your go-to-market without losing control.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Highlight S</span><span class="spec-detail">Graphik Light · 17 / 26</span></div><div class="spec-sample" style="font:var(--highlight-s)">AI-powered enterprise platform for the next decade.</div></div>
    </div>
    <div class="spec-group"><div class="spec-group-title">Body</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body M</span><span class="spec-detail">Rubik Light · 17 / 26</span></div><div class="spec-sample" style="font:var(--body-m);max-width:560px">Design sophisticated solutions without the complexity. The right approach makes all the difference.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body M Strong</span><span class="spec-detail">Rubik Medium · 17 / 26</span></div><div class="spec-sample" style="font:var(--body-m-strong);max-width:560px">Design sophisticated solutions without the complexity. The right approach makes all the difference.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body S</span><span class="spec-detail">Rubik Light · 14 / 22</span></div><div class="spec-sample" style="font:var(--body-s);max-width:560px">Implementing sophisticated designs in software solutions can be complex. However, with the right tools it is possible to improve quality and reduce cost.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body S Strong</span><span class="spec-detail">Rubik Medium · 14 / 22</span></div><div class="spec-sample" style="font:var(--body-s-strong);max-width:560px">Implementing sophisticated designs in software solutions can be complex. However, with the right tools it is possible to improve quality and reduce cost.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body XS</span><span class="spec-detail">Rubik Light · 12 / 20</span></div><div class="spec-sample" style="font:var(--body-xs);max-width:560px">By submitting this form, you agree to receive communications with updates, resources and useful tips.</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Body XS Strong</span><span class="spec-detail">Rubik Medium · 12 / 20</span></div><div class="spec-sample" style="font:var(--body-xs-strong);max-width:560px">By submitting this form, you agree to receive communications with updates, resources and useful tips.</div></div>
    </div>
    <div class="spec-group"><div class="spec-group-title">Label &amp; Link</div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Label</span><span class="spec-detail">Rubik Medium · 17 / 26</span></div><div class="spec-sample" style="font:var(--label)">Explore all features</div></div>
      <div class="spec-row"><div class="spec-meta"><span class="spec-name">Link</span><span class="spec-detail">Rubik Light · 17 / 17</span></div><div class="spec-sample" style="font:var(--link)"><span style="text-decoration:underline">Check all industries</span></div></div>
    </div>`,Ud=`
    <div class="vcard"><div class="vcard__head"><span class="vcard__name">Key rules</span></div>
      <div class="vcard__body" style="padding:0;">
        <table class="tok-table">
          <thead><tr><th>Rule</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>Graphik attracts, Rubik sustains</td><td>Graphik (Title, Highlight) is for headlines and callouts. Rubik (Body, Label, Link) is for sustained reading and UI.</td></tr>
            <tr><td>Title vs Highlight</td><td>Same size, different weight. Title (semibold) anchors sections — short and direct. Highlight (light) accompanies as subheading — longer, more fluid.</td></tr>
            <tr><td>Strong = inline emphasis</td><td>Body M Strong is not an alternative heading — it's for highlighting words within a Body M paragraph.</td></tr>
            <tr><td>Name ≠ HTML tag</td><td>"Title 3" can be an <code class="cls">&lt;h2&gt;</code>, a <code class="cls">&lt;span&gt;</code>, or a <code class="cls">&lt;p&gt;</code>. Semantics are defined by document structure, not visual style.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="vcard"><div class="vcard__head"><span class="vcard__name">When to use each level</span></div>
      <div class="vcard__body" style="padding:0">
        <table class="tok-table"><thead><tr><th>Style</th><th>Use for</th><th>Don't use for</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:600">Title 1–2</td><td>Heroes, splash, closing CTAs, impact numbers</td><td>Cards, internal UI</td></tr>
          <tr><td style="font-weight:600">Title 3–5</td><td>Section titles, card headers, modal titles</td><td>Long paragraphs — semibold fatigues</td></tr>
          <tr><td style="font-weight:600">Highlight L–S</td><td>Hero subheadings, featured descriptions, pull quotes</td><td>Extended body text</td></tr>
          <tr><td style="font-weight:600">Body M / S / XS</td><td>Paragraphs, descriptions, reading content</td><td>Headlines — lacks weight to anchor</td></tr>
          <tr><td style="font-weight:600">Label</td><td>Buttons, form labels, tabs, navigation</td><td>Paragraphs — too dense for reading</td></tr>
          <tr><td style="font-weight:600">Link</td><td>Inline CTAs, breadcrumbs, "Read more"</td><td>Buttons — use Button component</td></tr>
        </tbody></table>
      </div>
    </div>`,Vd=Nd+Ud,Wd=`
<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Font families</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Valor</th></tr></thead>
      <tbody>
        <tr><td>${i("--font-display","--font-display")}</td><td>'Graphik', 'Rubik', sans-serif</td></tr>
        <tr><td>${i("--font-body","--font-body")}</td><td>'Rubik', sans-serif</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens shorthand</span><span class="vcard__sub">Usar con font: var(--token)</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Peso</th><th>Size / LH</th><th>Familia</th></tr></thead>
      <tbody>
        <tr><td>${i("--title-1","--title-1")}</td><td>600</td><td>46 / 60</td><td>Graphik</td></tr>
        <tr><td>${i("--title-2","--title-2")}</td><td>600</td><td>36 / 48</td><td>Graphik</td></tr>
        <tr><td>${i("--title-3","--title-3")}</td><td>600</td><td>26 / 36</td><td>Graphik</td></tr>
        <tr><td>${i("--title-4","--title-4")}</td><td>600</td><td>20 / 30</td><td>Graphik</td></tr>
        <tr><td>${i("--title-5","--title-5")}</td><td>600</td><td>17 / 26</td><td>Graphik</td></tr>
        <tr><td>${i("--highlight-l","--highlight-l")}</td><td>300</td><td>26 / 36</td><td>Graphik</td></tr>
        <tr><td>${i("--highlight-m","--highlight-m")}</td><td>300</td><td>20 / 30</td><td>Graphik</td></tr>
        <tr><td>${i("--highlight-s","--highlight-s")}</td><td>300</td><td>17 / 26</td><td>Graphik</td></tr>
        <tr><td>${i("--body-m","--body-m")}</td><td>300</td><td>17 / 26</td><td>Rubik</td></tr>
        <tr><td>${i("--body-m-strong","--body-m-strong")}</td><td>500</td><td>17 / 26</td><td>Rubik</td></tr>
        <tr><td>${i("--body-s","--body-s")}</td><td>300</td><td>14 / 22</td><td>Rubik</td></tr>
        <tr><td>${i("--body-s-strong","--body-s-strong")}</td><td>500</td><td>14 / 22</td><td>Rubik</td></tr>
        <tr><td>${i("--body-xs","--body-xs")}</td><td>300</td><td>12 / 20</td><td>Rubik</td></tr>
        <tr><td>${i("--body-xs-strong","--body-xs-strong")}</td><td>500</td><td>12 / 20</td><td>Rubik</td></tr>
        <tr><td>${i("--label","--label")}</td><td>500</td><td>17 / 26</td><td>Rubik</td></tr>
        <tr><td>${i("--link","--link")}</td><td>300</td><td>17 / 17</td><td>Rubik</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,Jd={title:"Typography",desc:"Graphik grabs attention, Rubik keeps you reading. One scale, two families, role-based naming.",tabs:["Type scale","Tokens"],content:[Vd,Wd]},os=[["none",0,"Explicit zero spacing, reset gaps"],["0",2,"Sub-grid gap, hairline dividers"],["1",4,"Icon-to-text spacing, minimum internal gap"],["2",8,"Badge/chip inner padding, compact list gaps"],["3",12,"Input padding, form element gaps"],["4",16,"Card padding, list item gaps, small section margins"],["5",24,"Container padding, content group gaps"],["6",32,"Section margins, modal padding"],["7",48,"Main page block separation"],["8",64,"Hero padding, major section separation"],["9",80,"Full-width section breathing room"],["10",128,"Large hero vertical padding"],["11",172,"Section horizontal padding (desktop)"],["12",240,"Maximum horizontal breathing room"]],Kd=[["0",2,2,null,2,null],["1",4,4,null,4,null],["2",8,8,null,8,null],["3",12,12,null,12,null],["4",16,16,null,16,null],["5",24,24,null,16,"--sp-4"],["6",32,24,"--sp-5",16,"--sp-4"],["7",48,32,"--sp-6",24,"--sp-5"],["8",64,32,"--sp-6",24,"--sp-5"],["9",80,48,"--sp-7",24,"--sp-5"],["10",128,64,"--sp-8",24,"--sp-5"],["11",172,64,"--sp-8",24,"--sp-5"],["12",240,80,"--sp-9",32,"--sp-6"]],Yd=[["0",2,2,null,2,null],["1",4,4,null,4,null],["2",8,8,null,8,null],["3",12,12,null,12,null],["4",16,16,null,8,"--sp-2"],["5",24,24,null,16,"--sp-4"],["6",32,32,null,24,"--sp-5"],["7",48,48,null,32,"--sp-6"],["8",64,48,"--sp-7",32,"--sp-6"],["9",80,64,"--sp-8",48,"--sp-7"],["10",128,80,"--sp-9",64,"--sp-8"]];function ds(a,t){return t?`${a}px ${i(t,t)}`:`${a}px`}function Xd(a){const[t,e,d,o,r,s]=a;return`<tr${!o&&!s?' style="color:var(--grey-400)"':""}><td>${i(`--sp-${t}`,`--sp-${t}`)}</td><td>${e}px</td><td>${ds(d,o)}</td><td>${ds(r,s)}</td></tr>`}function rs(a,t){return`<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">${a}</span></div>
  <div class="vcard__body" style="padding:0">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Desktop</th><th>Tablet</th><th>Mobile</th></tr></thead>
      <tbody>
${t.map(e=>`        ${Xd(e)}`).join(`
`)}
      </tbody>
    </table>
  </div>
</div>`}const Qd=`
<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Spacing scale</span><span class="vcard__sub">Base 4 · 14 levels</span></div>
  <div class="vcard__body" style="padding:24px">
    <div style="display:flex;flex-direction:column;gap:20px">
${os.map(([a,t])=>`      <div style="display:flex;align-items:center;gap:16px">
        <span style="width:100px;display:flex;justify-content:flex-start">${i(`--sp-${a}`,`--sp-${a}`)}</span>
        <div style="width:${t}px;height:24px;background:var(--bar-accent);border-radius:2px;flex-shrink:0"></div>
        <span style="font-size:12px;color:var(--grey-600);font-family:var(--font-body)">${t}px</span>
      </div>`).join(`
`)}
    </div>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">When to use each level</span></div>
  <div class="vcard__body" style="padding:0">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Value</th><th>Recommended use</th></tr></thead>
      <tbody>
${os.map(([a,t,e])=>`        <tr><td>${i(`--sp-${a}`,`--sp-${a}`)}</td><td>${t}px</td><td>${e}</td></tr>`).join(`
`)}
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Principles</span></div>
  <div class="vcard__body" style="padding:var(--sp-5);">
    <div style="font:var(--body-xs);font-weight:400;color:var(--grey-600)">
      <p style="margin-bottom:12px"><strong>Base 4.</strong> All values are multiples of 4px, except <code class="tok tok--static">--sp-none</code> (0px) and <code class="tok tok--static">--sp-0</code> (2px) which serve as explicit zero and sub-grid unit respectively.</p>
      <p style="margin-bottom:12px"><strong>Non-linear progression.</strong> The scale grows faster at higher levels. sp-1 to sp-4 grow by 4px; sp-7 to sp-12 jump 16–112px.</p>
      <p><strong>Semantic tokens.</strong> Always use <code class="tok tok--static">var(--sp-*)</code>. Never hardcode <code class="tok tok--static">24px</code> — if the scale changes, everything breaks.</p>
    </div>
  </div>
</div>
`,Zd=`
${rs("Horizontal spacing",Kd)}

${rs("Vertical spacing",Yd)}

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">How to read this</span></div>
  <div class="vcard__body" style="padding:var(--sp-5);">
    <div style="font:var(--body-xs);font-weight:400;color:var(--grey-600)">
      <p><strong style="font-weight:600">These are not auto-adaptive tokens.</strong> They are the replacement guide when you write media queries per breakpoint. Dimmed rows stay the same across all sizes. Highlighted rows show the target token to use at each breakpoint.</p>
    </div>
  </div>
</div>
`,tr={title:"Spacing",desc:"Fourteen levels of breathing room, all built on a 4px beat.",tabs:["Scale","Responsive"],content:[Qd,Zd]},er={foundation:{$description:"Colores base de marca","fuchsia-500":{$value:"#E02B58",$type:"color"},"fuchsia-700":{$value:"#D2285D",$type:"color"},"blue-500":{$value:"#0F62FE",$type:"color"},"royal-blue-500":{$value:"#5BA7FF",$type:"color"},"royal-blue-700":{$value:"#437DC0",$type:"color"},"lime-500":{$value:"#BFD732",$type:"color"},"lime-700":{$value:"#8CC63F",$type:"color"},"green-900":{$value:"#113033",$type:"color"}},neutral:{$description:"Escala de grises para texto, bordes y fondos",black:{$value:"#111111",$type:"color"},"grey-900":{$value:"#1B1F23",$type:"color"},"grey-800":{$value:"#3B4044",$type:"color"},"grey-700":{$value:"#5A5F63",$type:"color"},"grey-600":{$value:"#6E7277",$type:"color"},"grey-500":{$value:"#969BA0",$type:"color"},"grey-400":{$value:"#B5B5B5",$type:"color"},"grey-300":{$value:"#D9D9D9",$type:"color"},"grey-200":{$value:"#EEEEEE",$type:"color"},"grey-100":{$value:"#F5F5F5",$type:"color"},white:{$value:"#FFFFFF",$type:"color"}},surface:{$description:"Fondos de pagina y superficies",bg:{$value:"#fafafa",$type:"color"},"june-surface":{$value:"#ffffff",$type:"color"},card:{$value:"#ffffff",$type:"color"},"card-border":{$value:"#e0e0e0",$type:"color"},"card-head":{$value:"#f5f5f5",$type:"color"},"surface-alternative":{$value:"#F5F5F5",$type:"color"}},accent:{$description:"Paleta para fondos, cards y badges","purple-900":{$value:"#903085",$type:"color"},"purple-600":{$value:"#E47FF4",$type:"color"},"orange-900":{$value:"#BE560B",$type:"color"},"orange-500":{$value:"#FFA235",$type:"color"},"green-900":{$value:"#113033",$type:"color"},"green-500":{$value:"#A9F3D0",$type:"color"},"green-200":{$value:"#D3F7E9",$type:"color"},"green-50":{$value:"#EFFAFA",$type:"color"},"blue-900":{$value:"#151F2B",$type:"color"},"blue-50":{$value:"#F5F9FF",$type:"color"}},state:{$description:"Feedback visual: errores, exito y alertas",error:{$value:"#E74131",$type:"color"},success:{$value:"#02A08B",$type:"color"},warning:{$value:"#FF8000",$type:"color"},"error-bg":{$value:"#FFF0F0",$type:"color"}},"text-icon-border":{$description:"Primitivos compartidos para texto, iconos y bordes",positive:{$value:"#111111",$type:"color"},negative:{$value:"#FFFFFF",$type:"color"},disabled:{$value:"#6E7277",$type:"color"}},brand:{gx:{base:{$value:"#E02B58"},hover:{$value:"#D2285D"},on:{$value:"#FFFFFF"}},nx:{base:{$value:"#5BA7FF"},hover:{$value:"#437DC0"},on:{$value:"#111111"}},ge:{base:{$value:"#BFD732"},hover:{$value:"#8CC63F"},on:{$value:"#111111"}}}},L={color:er},Lt={};for(const[a,t]of Object.entries(L.color.foundation))a.startsWith("$")||(Lt[a]=t.$value);for(const[a,t]of Object.entries(L.color.neutral))a.startsWith("$")||(Lt[a]=t.$value);for(const[a,t]of Object.entries(L.color.surface))a.startsWith("$")||(Lt[a]=t.$value);for(const[a,t]of Object.entries(L.color.accent))a.startsWith("$")||(Lt[a]=t.$value);for(const[a,t]of Object.entries(L.color.state))a.startsWith("$")||(Lt[a]=t.$value);for(const[a,t]of Object.entries(L.color["text-icon-border"]))a.startsWith("$")||(Lt[a]=t.$value);function ar(a){const t=a.replace("#",""),[e,d,o]=[0,2,4].map(r=>{const s=parseInt(t.substring(r,r+2),16)/255;return s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)});return .2126*e+.7152*d+.0722*o}function sr(a){return a.startsWith("#")?ar(a)>.179:!0}const or={gx:{primary:L.color.brand.gx.base.$value,hover:L.color.brand.gx.hover.$value,onPrimary:L.color.brand.gx.on.$value,alias:"fuchsia-500",hoverAlias:"fuchsia-700",onPrimaryAlias:"white"},nx:{primary:L.color.brand.nx.base.$value,hover:L.color.brand.nx.hover.$value,onPrimary:L.color.brand.nx.on.$value,alias:"royal-blue-500",hoverAlias:"royal-blue-700",onPrimaryAlias:"black"},ge:{primary:L.color.brand.ge.base.$value,hover:L.color.brand.ge.hover.$value,onPrimary:L.color.brand.ge.on.$value,alias:"lime-500",hoverAlias:"lime-700",onPrimaryAlias:"black"}},y=or,A=a=>[a.primary,a.alias],Dt=a=>[a.hover,a.hoverAlias],Y=a=>[a.onPrimary,a.onPrimaryAlias];Object.entries(L.color.accent).filter(([a])=>!a.startsWith("$")).map(([a,t])=>[a,t.$value]);function f(a,t){const e=Lt[a]||"#000",d=t!=null&&t.light?";border-bottom:1px solid var(--card-border)":"";return`<div class="swatch"><div class="swatch__color" style="background:${`var(--${a}, ${e})`}${d}"><button class="swatch__copy" data-copy-color="${e}">Copy</button></div><div class="swatch__info"><div class="swatch__name">${a}</div><div class="swatch__val">${e}</div></div></div>`}const dr=`
<style>
.swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--sp-3); }
.swatch { border-radius: var(--r-md); overflow: hidden; border: 1px solid var(--card-border); }
.swatch__color { height: 72px; position: relative; }
.swatch__info { padding: 10px 12px; background: var(--card); }
.swatch__name { font: var(--body-xs-strong); color: var(--black); margin-bottom: 2px; }
.swatch__val { font-family: var(--font-mono); font-size: 11px; color: var(--grey-600); }
.swatch__copy { position: absolute; top: 6px; right: 6px; background: rgba(0,0,0,0.4); color: #fff; border: none; border-radius: var(--r-xs); padding: 2px 6px; font-size: 11px; font-weight: 600; cursor: pointer; opacity: 0; transition: opacity var(--duration-fast) var(--ease); }
.swatch:hover .swatch__copy { opacity: 1; }
.color-section { margin-bottom: var(--sp-6); }
.color-section__title { font: var(--body-s-strong); color: var(--black); margin-bottom: var(--sp-4); }
.color-section__subtitle { font: var(--body-xs); font-weight: 400; color: var(--grey-600); margin-bottom: var(--sp-3); }
.vcard__sub { font-size: 12px; color: var(--grey-600); font-weight: 400; margin-left: 8px; }
.vcard__body .color-section:last-child { margin-bottom: 0; }
</style>

<!-- ═══ 1. Foundation ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Foundation</span>
    <span class="vcard__sub">Brand base colors</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${f(y.gx.alias)}
        ${f(y.gx.hoverAlias)}
        ${f(y.nx.alias)}
        ${f(y.nx.hoverAlias)}
        ${f(y.ge.alias,{light:!0})}
        ${f(y.ge.hoverAlias)}
      </div>
    </div>
    <div class="color-section">
      <div class="color-section__title">Gradient</div>
      <div class="swatch-grid">
        <div class="swatch"><div class="swatch__color" style="background:var(--gradient-blue)"><button class="swatch__copy" data-copy-color="var(--gradient-blue)">Copy</button></div><div class="swatch__info"><div class="swatch__name">gradient-blue</div><div class="swatch__val">148deg · #11151C → #5BA7FF</div></div></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ 2. Neutral ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Neutral</span>
    <span class="vcard__sub">Greyscale for text, borders, and backgrounds</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${f("black")}
        ${f("grey-900")}
        ${f("grey-800")}
        ${f("grey-700")}
        ${f("grey-600")}
        ${f("grey-500")}
        ${f("grey-400")}
        ${f("grey-300",{light:!0})}
        ${f("grey-200",{light:!0})}
        ${f("grey-100",{light:!0})}
        ${f("white",{light:!0})}
      </div>
    </div>
  </div>
</div>

<!-- ═══ 3. Surfaces ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Surfaces</span>
    <span class="vcard__sub">Page backgrounds and surfaces</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${f("june-surface",{light:!0})}
        ${f("surface-alternative",{light:!0})}
      </div>
    </div>
  </div>
</div>

<!-- ═══ 4. Accent Colors ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Accent Colors</span>
    <span class="vcard__sub">Palette for backgrounds, cards, and badges</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="color-section__title">Purple</div>
      <div class="swatch-grid">
        ${f("purple-900")}
        ${f("purple-600")}
      </div>
    </div>

    <div class="color-section">
      <div class="color-section__title">Orange</div>
      <div class="swatch-grid">
        ${f("orange-900")}
        ${f("orange-500")}
      </div>
    </div>

    <div class="color-section">
      <div class="color-section__title">Green</div>
      <div class="swatch-grid">
        ${f("green-900")}
        ${f("green-500")}
        ${f("green-200",{light:!0})}
        ${f("green-50",{light:!0})}
      </div>
    </div>

    <div class="color-section">
      <div class="color-section__title">Blue</div>
      <div class="swatch-grid">
        ${f("blue-900")}
        ${f("blue-50",{light:!0})}
      </div>
    </div>

  </div>
</div>

<!-- ═══ 5. State ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">State</span>
    <span class="vcard__sub">Visual feedback: errors, success, and alerts</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${f("error")}
        ${f("success")}
        ${f("warning")}
      </div>
    </div>
  </div>
</div>

<!-- ═══ 6. Text / Icon / Border ═══ -->
<div class="vcard">
  <div class="vcard__head">
    <span class="vcard__name">Text / Icon / Border</span>
    <span class="vcard__sub">Shared primitives</span>
  </div>
  <div class="vcard__body">
    <div class="color-section">
      <div class="swatch-grid">
        ${f("positive")}
        ${f("negative",{light:!0})}
        ${f("disabled")}
      </div>
    </div>
  </div>
</div>
`;function aa(a,t){const e=sr(a)?"border:1px solid #e0e0e0;":"";return`<span class="sw" style="background:${a};${e}"></span><span class="snip" data-copy-color="${a}"><span class="snip__val">${a}</span><button class="snip__btn" aria-label="Copy ${a}">${Ye}</button></span>`}function P(a,t,e,d,o){return`<tr><td><span class="snip" data-copy-token="${a}"><span class="snip__val">${a}</span><button class="snip__btn" aria-label="Copy var(--${a})">${Ye}</button></span></td><td class="sem-info">${o||""}</td><td>${aa(t[0],t[1])}</td><td>${aa(e[0],e[1])}</td><td>${aa(d[0],d[1])}</td></tr>`}function w(a,t,e,d){return P(a,[t,e],[t,e],[t,e],d)}function Mt(a,t){return`<div class="vcard"><div class="vcard__head"><span class="vcard__name">${a}</span></div><div class="vcard__body" style="padding:0"><table class="tok-table sem-table"><thead><tr><th>Token</th><th>Info</th><th><span class="sem-dot" style="background:var(--gx)"></span>GeneXus</th><th><span class="sem-dot" style="background:var(--nx)"></span>Next</th><th><span class="sem-dot" style="background:var(--ge)"></span>GEAI</th></tr></thead><tbody>
${t}
</tbody></table></div></div>`}const rr=`
<style>
.sem-table { table-layout: fixed; }
.sem-table th:nth-child(1) { width: 30%; }
.sem-table th:nth-child(2) { width: 20%; }
.sem-table td { font-family: var(--font-mono); font-size: 11px; vertical-align: middle; }
.sem-table td:first-child { font-family: inherit; font-size: inherit; }
.sem-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: var(--sp-2); vertical-align: middle; }
.sem-info { font-family: var(--font-body); font-size: 12px; color: var(--grey-600); font-style: italic; }
</style>

${Mt("Surface",`
${w("june-surface","#FFFFFF","white","Elevaciones via --shadow-* (xs→2xl)")}
${w("june-surface__alternative","#F5F5F5","grey-100")}
`)}
${Mt("Action",`
${P("june-action__primary",A(y.gx),A(y.nx),A(y.ge))}
${P("june-action__primary--hover",Dt(y.gx),Dt(y.nx),Dt(y.ge))}
${w("june-action__secondary","#111111","black")}
${w("june-action__secondary--hover","#111111","black")}
${w("june-action__secondary--on-dark","#FFFFFF","white","Inverts on dark/accent surface")}
${P("june-action__secondary--on-dark--hover",["#FADFE6","color-mix(gx 15%, white)"],["#E6F2FF","color-mix(nx 15%, white)"],["#F5F9E0","color-mix(ge 15%, white)"],"color-mix(in srgb, brand 15%, #fff)")}
${w("june-action__disabled","#EEEEEE","grey-200")}
`)}
${Mt("Text",`
${w("june-text__on-surface","#111111","black")}
${w("june-text__on-surface--disabled","#6E7277","grey-600")}
${P("june-text__on-action--primary",Y(y.gx),Y(y.nx),Y(y.ge))}
${P("june-text__on-action--primary-hover",Y(y.gx),Y(y.nx),Y(y.ge))}
${w("june-text__on-action--secondary","#FFFFFF","white")}
${P("june-text__on-action--secondary-hover",A(y.gx),A(y.nx),A(y.ge))}
${w("june-text__on-action--secondary--on-dark","#111111","black","Inverts on dark/accent surface")}
${P("june-text__on-action--secondary--on-dark-hover",A(y.gx),A(y.nx),A(y.ge),"Brand color on white background")}
${w("june-text__on-action--disabled","#969BA0","grey-500")}
${w("june-text-placeholder__on-surface","#969BA0","grey-500","Fixed color — light surfaces are always similar")}
${w("june-text-placeholder__on-primary","rgba(255,255,255,0.6)","white 60%","Opacity instead of fixed color: adapts to any dark/brand background")}
${w("june-link__content","#111111","black","Link — always with underline")}
${P("june-link__content--hover",A(y.gx),A(y.nx),A(y.ge),"Link hover")}
${w("june-text__on-background--dark","#FFFFFF","white","On dark background")}
${w("june-text__on-background--light","#111111","black","On light background")}
`)}
${Mt("Icon",`
${w("june-icon__on-surface","#111111","black","Action icons")}
${w("june-icon__on-surface--disabled","#969BA0","grey-500")}
${P("june-icon__on-surface--hover",A(y.gx),A(y.nx),A(y.ge))}
${P("june-icon__primary",A(y.gx),A(y.nx),A(y.ge))}
${P("june-icon__primary--hover",Dt(y.gx),Dt(y.nx),Dt(y.ge))}
${P("june-icon__on-action-primary",Y(y.gx),Y(y.nx),Y(y.ge))}
${w("june-icon__on-action--secondary","#FFFFFF","white")}
${w("june-icon__on-action--disabled","#969BA0","grey-500")}
${w("june-icon__on-background--dark","#FFFFFF","white","On dark background")}
${w("june-icon__on-background--light","#111111","black","On light background")}
`)}
${Mt("Border",`
${w("june-border__on-surface","#111111","black")}
${P("june-border__primary",A(y.gx),A(y.nx),A(y.ge))}
${w("june-border__neutral-level-1","#D9D9D9","grey-300")}
${w("june-border__neutral-level-2","#969BA0","grey-500")}
${w("june-border__disabled","#B5B5B5","grey-400")}
${w("june-border__on-background--dark","#FFFFFF","white","On dark background")}
${w("june-border__on-background--light","#111111","black","On light background")}
`)}
${Mt("State",`
${w("june-state__error","#E74131","error")}
${w("june-state__success","#02A08B","success")}
${w("june-state__warning","#FF8000","warning")}
`)}
`;function ir(){var a;(a=document.getElementById("page"))==null||a.addEventListener("click",t=>{const e=t.target.closest(".swatch__copy[data-copy-color]");e&&(S(e.dataset.copyColor),C("Copied "+e.dataset.copyColor))})}const lr={title:"Colors",desc:"Three brands, one palette. Semantic tokens that shift identity without losing harmony.",tabs:["Primitives","Semantic"],content:[dr,rr],init:ir},nr=`
<style>
.shadow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--sp-5); margin-bottom: var(--sp-6); }
.shadow-card { background: var(--card); border-radius: var(--r-lg); padding: var(--sp-4); display: flex; flex-direction: column; gap: var(--sp-3); border: 1px solid var(--card-border); }
.shadow-demo { background: #ffffff; border-radius: var(--r-md); height: 80px; border: 1px solid var(--card-border); }
body.dm .shadow-demo { background: #2a2f38; border-color: #353a44; }
.shadow-name { font: var(--body-xs); font-weight: 600; color: var(--black); }
.shadow-val { font-family: var(--font-mono); font-size: 11px; color: var(--grey-600); line-height: 1.6; word-break: break-all; }
</style>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Elevation scale</span></div>
  <div class="vcard__body" style="padding: var(--sp-5);">
    <div class="shadow-grid">
      <div class="shadow-card" data-shadow="xs">
        <div class="shadow-demo" style="box-shadow: var(--shadow-xs);"></div>
        <div><div class="shadow-name">xs</div><div>${i("--shadow-xs","--shadow-xs")}</div><div class="shadow-val">0 1px 2px rgba(0,0,0,0.06)</div></div>
      </div>
      <div class="shadow-card" data-shadow="sm">
        <div class="shadow-demo" style="box-shadow: var(--shadow-sm);"></div>
        <div><div class="shadow-name">sm</div><div>${i("--shadow-sm","--shadow-sm")}</div><div class="shadow-val">0 1px 4px rgba(0,0,0,0.08),<br>0 1px 2px rgba(0,0,0,0.04)</div></div>
      </div>
      <div class="shadow-card" data-shadow="md">
        <div class="shadow-demo" style="box-shadow: var(--shadow-md);"></div>
        <div><div class="shadow-name">md</div><div>${i("--shadow-md","--shadow-md")}</div><div class="shadow-val">0 4px 12px rgba(0,0,0,0.10),<br>0 1px 3px rgba(0,0,0,0.06)</div></div>
      </div>
      <div class="shadow-card" data-shadow="lg">
        <div class="shadow-demo" style="box-shadow: var(--shadow-lg);"></div>
        <div><div class="shadow-name">lg</div><div>${i("--shadow-lg","--shadow-lg")}</div><div class="shadow-val">0 8px 24px rgba(0,0,0,0.12),<br>0 2px 6px rgba(0,0,0,0.06)</div></div>
      </div>
      <div class="shadow-card" data-shadow="xl">
        <div class="shadow-demo" style="box-shadow: var(--shadow-xl);"></div>
        <div><div class="shadow-name">xl</div><div>${i("--shadow-xl","--shadow-xl")}</div><div class="shadow-val">0 16px 48px rgba(0,0,0,0.14),<br>0 4px 12px rgba(0,0,0,0.08)</div></div>
      </div>
      <div class="shadow-card" data-shadow="2xl">
        <div class="shadow-demo" style="box-shadow: var(--shadow-2xl);"></div>
        <div><div class="shadow-name">2xl</div><div>${i("--shadow-2xl","--shadow-2xl")}</div><div class="shadow-val">0 32px 64px rgba(0,0,0,0.18),<br>0 8px 20px rgba(0,0,0,0.10)</div></div>
      </div>
    </div>
  </div>
</div>

`,cr=`
<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Valor</th><th>Uso</th></tr></thead>
      <tbody>
        <tr><td>${i("--shadow-xs","--shadow-xs")}</td><td><code class="tok tok--static">0 1px 2px rgba(0,0,0,0.06)</code></td><td>Inputs, badges</td></tr>
        <tr><td>${i("--shadow-sm","--shadow-sm")}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 1px 4px … + 0 1px 2px …</td><td>Buttons, topbar</td></tr>
        <tr><td>${i("--shadow-md","--shadow-md")}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 4px 12px … + 0 1px 3px …</td><td>Dropdowns</td></tr>
        <tr><td>${i("--shadow-lg","--shadow-lg")}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 8px 24px … + 0 2px 6px …</td><td>Drawers</td></tr>
        <tr><td>${i("--shadow-xl","--shadow-xl")}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 16px 48px … + 0 4px 12px …</td><td>Modals, large panels</td></tr>
        <tr><td>${i("--shadow-2xl","--shadow-2xl")}</td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-600)">0 32px 64px … + 0 8px 20px …</td><td>Full overlays, hero cards</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,pr={title:"Shadows",desc:"Six levels of depth that tell the eye where to look.",tabs:["Elevation","Tokens"],content:[nr,cr]},vr=`
<style>
.bp-layout-band { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: var(--sp-4); }
.bp-layout-cell { background: var(--card-head); padding: var(--sp-5); display: flex; flex-direction: column; gap: var(--sp-2); border-radius: var(--r-md); }
.bp-layout-cell__range { font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--black); letter-spacing: -.01em; }
.bp-layout-cell__label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--grey-500); }
.bp-layout-cell__desc { font: var(--body-xs); font-weight: 400; color: var(--grey-600); margin-top: var(--sp-1); }
.bp-layout-cell__tok { margin-top: auto; padding-top: var(--sp-3); }
.bp-layout-cell .tok { background: var(--card); border: 1px solid var(--card-border); }
.bp-layout-cell--active { background: var(--grey-50); }
.bp-pill { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: var(--r-full); background: #e5eeff; color: #2a3460; border: 1px solid #5b7ccc; width: fit-content; }
</style>

<div class="vcard" style="margin-bottom: var(--sp-5);">
  <div class="vcard__head">
    <span class="vcard__name">Layout breakpoints</span>
    <span style="font-size:12px; color:var(--grey-600); margin-left:auto;">2 points where layout changes</span>
  </div>
  <div class="vcard__body" style="padding: var(--sp-5);">
    <div class="bp-layout-band">
      <div class="bp-layout-cell">
        <div class="bp-pill">Mobile</div>
        <div class="bp-layout-cell__range">&lt; 640px</div>
        <div class="bp-layout-cell__desc">Single column. Reduced typography and padding.</div>
        <div class="bp-layout-cell__tok">${i("max-width: 639px","max-width: 639px")}</div>
      </div>
      <div class="bp-layout-cell">
        <div class="bp-pill">Tablet</div>
        <div class="bp-layout-cell__range">640px – 759px</div>
        <div class="bp-layout-cell__desc">Single column. Image below content.</div>
        <div class="bp-layout-cell__tok">${i("--bp-tablet","--bp-tablet")}</div>
      </div>
      <div class="bp-layout-cell">
        <div class="bp-pill">Desktop</div>
        <div class="bp-layout-cell__range">≥ 760px</div>
        <div class="bp-layout-cell__desc">Two columns. Image on left or right.</div>
        <div class="bp-layout-cell__tok">${i("--bp-desktop","--bp-desktop")}</div>
      </div>
    </div>
    <div class="code-snippet" style="margin-top: var(--sp-4);">
      <div class="code-snippet__head">
        <span class="code-snippet__label">CSS</span>
        <button class="code-snippet__copy" data-copy-snippet="bp-css-example">Copy</button>
      </div>
      <pre class="code-snippet__pre"><code id="bp-css-example"><span class="ck">.lam-container</span> { <span class="ck">flex-direction</span>: <span class="cv">row</span>; } <span class="cc">/* desktop: 2 columns */</span>

<span class="ck">@media (max-width: 759px)</span> { <span class="cc">/* tablet */</span>
  <span class="ck">.lam-container</span> { <span class="ck">flex-direction</span>: <span class="cv">column</span>; }
}
<span class="ck">@media (max-width: 639px)</span> { <span class="cc">/* mobile */</span>
  <span class="ck">.lam-title</span> { <span class="ck">font-size</span>: <span class="cn">26px</span>; }
}</code></pre>
    </div>
  </div>
</div>
`,hr=[["xxs","--bp-desktop-xs",380],["xs","--bp-desktop-s",440],["s","--bp-desktop-m",512],["m","--bp-desktop-l",640],["l","--bp-desktop-xl",760],["xl","--bp-desktop-2xl",940],["xxl","--bp-desktop-3xl",1440]],br=`
<div class="vcard" style="margin-bottom:var(--sp-5)">
  <div class="vcard__head"><span class="vcard__name">Named content widths</span><span style="font-size:12px;color:var(--grey-600);font-weight:400;margin-left:8px">Desktop only · 7 sizes</span></div>
  <div class="vcard__body" style="padding:0">
    <table class="tok-table">
      <thead><tr><th>Name</th><th>Token</th><th>Desktop</th></tr></thead>
      <tbody>
${hr.map(([a,t,e])=>`        <tr><td><code class="tok tok--static">${a}</code></td><td>${i(t,t)}</td><td>${e}px</td></tr>`).join(`
`)}
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Collapse behavior</span></div>
  <div class="vcard__body" style="padding:var(--sp-5);">
    <div style="font:var(--body-xs);font-weight:400;color:var(--grey-600)">
      <p style="margin-bottom:12px"><strong>Tablet.</strong> All sizes collapse to 640px, except xxl which becomes 768px.</p>
      <p style="margin-bottom:12px"><strong>Mobile.</strong> All sizes collapse to 380px, except xxl which becomes 428px.</p>
      <p><strong>Not yet adopted.</strong> These tokens are available but not adopted yet by components. The content widths only differentiate in desktop.</p>
    </div>
  </div>
</div>
`;function ur(){var a;(a=document.getElementById("page"))==null||a.addEventListener("click",t=>{const e=t.target.closest("[data-copy-snippet]");if(e){const d=e.dataset.copySnippet,o=d?document.getElementById(d):null;o&&(S(o.textContent||""),C("Copied!"))}})}const gr={title:"Breakpoints",desc:"Where layouts adapt. From phone to widescreen, nothing breaks.",tabs:["Viewport","Content widths"],content:[vr,br],init:ur},k=a=>a.replace("<svg",'<svg slot="icon"'),mr=`
<div class="pg-dm-notice">
  <span class="pg-dm-notice__tag">Coming soon</span>
  <span>Dark mode for June DS components. Previews show the light version.</span>
</div>

<div data-surface="light">

<div class="anatomy-wrap">
  <div class="vcard__head"><span class="vcard__name">Anatomy</span></div>
  <div class="anatomy" id="btn-anatomy">
    <div class="anatomy__btn">
      <june-button variant="primary" style="pointer-events:none;">
        ${k(x)}Label
      </june-button>
    </div>
    <div class="anatomy__label" style="top:12px; left:50%; transform:translateX(-50%);">height: 48px</div>
    <div class="anatomy__label" style="bottom:12px; left:20px;">padding: 8px 24px (20px with icon)</div>
    <div class="anatomy__label" style="top:50%; right:20px; transform:translateY(-50%);">border-radius: 1000px</div>
    <div class="anatomy__label" style="bottom:12px; right:20px;">gap: 8px</div>
    <div class="anatomy__label" style="top:12px; left:20px;">Medium (500) · 17px/26px · Rubik</div>
    <div class="anatomy__label" style="bottom:12px; left:50%; transform:translateX(-50%);">min-width: 128px</div>
  </div>
</div>

<div class="matrix">
  <div class="matrix__head">
    <span class="matrix__title">State matrix</span>
    <span class="matrix__subtitle">Hover each cell to inspect</span>
  </div>
  <div class="matrix__scroll">
  <div class="matrix__grid" id="btn-matrix">
    <div class="matrix__colhead"></div>
    <div class="matrix__colhead">Primary</div>
    <div class="matrix__colhead">Secondary</div>
    <div class="matrix__colhead">Tertiary</div>
    <div class="matrix__colhead">Outline</div>
    <div class="matrix__colhead">Plain</div>
    <div class="matrix__colhead">Icon</div>

    <div class="matrix__rowlabel">Enabled</div>
    <div class="matrix__cell"><june-button variant="primary">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add">${k(x)}</june-button></div>

    <div class="matrix__rowlabel">Hover</div>
    <div class="matrix__cell"><june-button variant="primary" force-state="hover">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" force-state="hover">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" force-state="hover">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" force-state="hover">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" force-state="hover">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" force-state="hover">${k(x)}</june-button></div>

    <div class="matrix__rowlabel">Focus</div>
    <div class="matrix__cell"><june-button variant="primary" force-state="focus">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" force-state="focus">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" force-state="focus">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" force-state="focus">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" force-state="focus">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" force-state="focus">${k(x)}</june-button></div>

    <div class="matrix__rowlabel">Active</div>
    <div class="matrix__cell"><june-button variant="primary" force-state="active">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" force-state="active">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" force-state="active">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" force-state="active">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" force-state="active">${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" force-state="active">${k(x)}</june-button></div>

    <div class="matrix__rowlabel">Disabled</div>
    <div class="matrix__cell"><june-button variant="primary" disabled>${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="secondary" disabled>${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="tertiary" disabled>${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="outline" disabled>${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="plain" disabled>${k(x)}Label</june-button></div>
    <div class="matrix__cell"><june-button variant="icon" icon-only label="Add" disabled>${k(x)}</june-button></div>
  </div>
  </div>
</div>

<div style="margin-top:var(--sp-5);">
  <div class="matrix">
    <div class="matrix__head"><span class="matrix__title">Focus ring test</span></div>
    <div class="matrix__scroll">
    <div class="matrix__grid" id="btn-focus-body">
      <div class="matrix__colhead"></div>
      <div class="matrix__colhead">Primary</div>
      <div class="matrix__colhead">Secondary</div>
      <div class="matrix__colhead">Tertiary</div>
      <div class="matrix__colhead">Outline</div>
      <div class="matrix__colhead">Plain</div>
      <div class="matrix__colhead">Icon</div>

      <div class="matrix__rowlabel">Tab →</div>
      <div class="matrix__cell"><june-button variant="primary">Primary</june-button></div>
      <div class="matrix__cell"><june-button variant="secondary">Secondary</june-button></div>
      <div class="matrix__cell"><june-button variant="tertiary">Tertiary</june-button></div>
      <div class="matrix__cell"><june-button variant="outline">Outline</june-button></div>
      <div class="matrix__cell"><june-button variant="plain">Plain</june-button></div>
      <div class="matrix__cell"><june-button variant="icon" icon-only label="Star">${k(Sa)}</june-button></div>
    </div>
    </div>
  </div>
</div>


</div>
`,yr=`
<style>
.vcard[id^="btn-"] { scroll-margin-top: 80px; }
</style>

<div class="vcard" id="btn-estructura"><div class="vcard__head"><span class="vcard__name">Structure</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>
    <tr><td>Height</td><td>48px ${i("--sp-7","--sp-7")}</td></tr>
    <tr><td>Padding</td><td>8px 24px ${i("--sp-2","--sp-2")} ${i("--sp-5","--sp-5")}</td></tr>
    <tr><td>Gap</td><td>8px ${i("--sp-2","--sp-2")}</td></tr>
    <tr><td>Min-width</td><td>128px</td></tr>
    <tr><td>Border</td><td>1px solid transparent</td></tr>
    <tr><td>Border radius</td><td>100px ${i("--r-full","--r-full")}</td></tr>
    <tr><td>Icon</td><td>20×20px</td></tr>
    <tr><td>Font</td><td>Medium (500) · 17px/26px · Rubik ${i("--label","--label")}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-motion"><div class="vcard__head"><span class="vcard__name">States & Motion</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>State</th><th>Effect</th><th>Applies to</th></tr></thead><tbody>
    <tr><td>Hover</td><td>${i("translateY(-1px)","translateY(-1px)")} + ${i("--shadow-md","--shadow-md")}</td><td>Primary, Secondary, Tertiary, Outline</td></tr>
    <tr><td>Focus</td><td>outline: ${i("2px solid","2px solid")} ${i("--brand","--brand")}<br><span style="display:block;margin-top:6px;">outline-offset: ${i("2px","2px")}</span></td><td>All variants</td></tr>
    <tr><td>Active</td><td>${i("scale(0.97)","scale(0.97)")}</td><td>All variants</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Transition</th><th>Value</th></tr></thead><tbody>
    <tr><td>Duration / Easing</td><td>120ms ${i("--duration-fast","--duration-fast")} · ${i("--ease","--ease")}</td></tr>
    <tr><td>Properties</td><td>background, color, border-color, box-shadow, transform</td></tr>
    <tr><td>Reduced motion</td><td>${i("prefers-reduced-motion: reduce","prefers-reduced-motion: reduce")} → ${i("transition: none","transition: none")}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-colores-marca"><div class="vcard__head"><span class="vcard__name">Colors by brand</span><span style="font-size:12px;font-weight:400;color:var(--grey-600);margin-left:var(--sp-2);">For cross-brand consistency auditing</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Role</th><th>Info</th><th><span class="dot" style="background:#E02B58;width:7px;height:7px;border-radius:50%;display:inline-block"></span> GeneXus</th><th><span class="dot" style="background:#5BA7FF;width:7px;height:7px;border-radius:50%;display:inline-block"></span> Next</th><th><span class="dot" style="background:#BFD732;width:7px;height:7px;border-radius:50%;display:inline-block"></span> GEAI</th></tr></thead><tbody>
    <tr><td>Primary bg</td><td></td><td><span class="sw" style="background:#E02B58"></span>${p("#E02B58")}</td><td><span class="sw" style="background:#5BA7FF"></span>${p("#5BA7FF")}</td><td><span class="sw" style="background:#BFD732;border:1px solid #e0e0e0"></span>${p("#BFD732")}</td></tr>
    <tr><td>Primary hover</td><td></td><td><span class="sw" style="background:#D2285D"></span>${p("#D2285D")}</td><td><span class="sw" style="background:#437DC0"></span>${p("#437DC0")}</td><td><span class="sw" style="background:#8CC63F"></span>${p("#8CC63F")}</td></tr>
    <tr><td>Text on primary</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td></tr>
    <tr><td>Secondary bg</td><td></td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td></tr>
    <tr><td>Secondary text</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td></tr>
    <tr><td>Secondary hover bg</td><td style="font-family:var(--font-body);font-size:12px;font-style:italic">color-mix: brand 15% + #111111</td><td><span class="sw" style="background:#30151C"></span>${p("#30151C")}</td><td><span class="sw" style="background:#1C2835"></span>${p("#1C2835")}</td><td><span class="sw" style="background:#2B2F16"></span>${p("#2B2F16")}</td></tr>
    <tr><td>Secondary hover text</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td></tr>
    <tr><td>Tertiary bg</td><td></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td></tr>
    <tr><td>Tertiary text</td><td></td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td></tr>
    <tr><td>Tertiary hover bg</td><td style="font-family:var(--font-body);font-size:12px;font-style:italic">color-mix: brand 15% + #FFFFFF</td><td><span class="sw" style="background:#FADFE6;border:1px solid #e0e0e0"></span>${p("#FADFE6")}</td><td><span class="sw" style="background:#E6F2FF;border:1px solid #e0e0e0"></span>${p("#E6F2FF")}</td><td><span class="sw" style="background:#F5F9E0;border:1px solid #e0e0e0"></span>${p("#F5F9E0")}</td></tr>
    <tr><td>Tertiary hover text</td><td></td><td><span class="sw" style="background:#E02B58"></span>${p("#E02B58")}</td><td><span class="sw" style="background:#5BA7FF"></span>${p("#5BA7FF")}</td><td><span class="sw" style="background:#BFD732;border:1px solid #e0e0e0"></span>${p("#BFD732")}</td></tr>
    <tr><td>Outline border</td><td></td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td></tr>
    <tr><td>Outline text</td><td></td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Special case (dark surface)</th><th>Values</th></tr></thead><tbody>
    <tr><td>Outline hover</td><td>border: ${i("transparent","transparent")} + bg: ${i("rgba(255,255,255,0.08)","rgba(255,255,255,0.08)")}</td></tr>
    <tr><td>Disabled (all variants)</td><td>bg: <span class="sw" style="background:#2A2F35"></span>${p("#2A2F35")} + color: <span class="sw" style="background:#707880"></span>${p("#707880")}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-colores-estado"><div class="vcard__head"><span class="vcard__name">Colors by state</span><span style="font-size:12px;font-weight:400;color:var(--grey-600);margin-left:var(--sp-2);">For token-based implementation</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Variant</th><th>Background</th><th>Color</th><th>Border</th></tr></thead><tbody>
    <tr><td>Primary</td><td>${i("--brand","--brand")}</td><td>${i("--brand-on","--brand-on")}</td><td>transparent</td></tr>
    <tr><td>Primary hover</td><td>${i("--brand-h","--brand-h")}</td><td>${i("--brand-on","--brand-on")}</td><td>transparent</td></tr>
    <tr><td>Secondary</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td>transparent</td></tr>
    <tr><td>Secondary hover</td><td><code class="tok tok--static">color-mix(brand 15%, #111)</code></td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td>transparent</td></tr>
    <tr><td>Tertiary</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")}</td><td><span class="sw" style="background:#111111"></span>${p("#111111")}</td><td>transparent</td></tr>
    <tr><td>Tertiary hover</td><td><code class="tok tok--static">color-mix(brand 15%, #fff)</code></td><td>${i("--brand","--brand")}</td><td>transparent</td></tr>
    <tr><td>Outline</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td></tr>
    <tr><td>Outline hover</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td><span class="sw" style="background:#D9D9D9;border:1px solid #e0e0e0"></span>${i("--grey-300","--grey-300")}</td></tr>
    <tr><td>Plain</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td>transparent</td></tr>
    <tr><td>Plain hover</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td>transparent<span style="margin-left:var(--sp-2);font-family:var(--font-body);font-size:12px;color:var(--grey-500);font-style:italic">+ underline</span></td></tr>
    <tr><td>Icon</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td>transparent</td></tr>
    <tr><td>Icon hover</td><td>transparent</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")}</td><td>transparent<span style="margin-left:var(--sp-2);font-family:var(--font-body);font-size:12px;color:var(--grey-500);font-style:italic">+ opacity: 0.7</span></td></tr>
    <tr><td>Disabled (all)</td><td><span class="sw" style="background:#EEEEEE;border:1px solid #e0e0e0"></span>${i("--grey-200","--grey-200")}</td><td><span class="sw" style="background:#969BA0"></span>${i("--grey-500","--grey-500")}</td><td>transparent</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-accessibility"><div class="vcard__head"><span class="vcard__name">Accessibility</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Criterion</th><th>Implementation</th></tr></thead><tbody>
    <tr><td>Semantics</td><td>Native <code class="tok tok--static">&lt;button&gt;</code> in Shadow DOM</td></tr>
    <tr><td>Focus visible</td><td><code class="tok tok--static">:focus-visible</code> with outline 2px + offset 2px</td></tr>
    <tr><td>Icon only</td><td><code class="tok tok--static">aria-label</code> required via prop <code class="tok tok--static">label</code></td></tr>
    <tr><td>Contrast</td><td>≥ 4.5:1 text, ≥ 3:1 large text (all brands + dark)</td></tr>
    <tr><td>Keyboard</td><td>Tab → navigate, Enter/Space → activate</td></tr>
    <tr><td>Reduced motion</td><td>Transitions removed with <code class="tok tok--static">prefers-reduced-motion</code></td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="btn-api"><div class="vcard__head"><span class="vcard__name">API</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th style="width:15%">Type</th><th style="width:15%">Default</th><th>Description</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">variant</code></td><td>string</td><td><code class="tok tok--static">primary</code></td><td>primary | secondary | tertiary | outline | plain | icon</td></tr>
    <tr><td><code class="tok tok--static">disabled</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Disables the button</td></tr>
    <tr><td><code class="tok tok--static">label</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Accessible text. Required for icon</td></tr>
    <tr><td><code class="tok tok--static">icon-only</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Hides the text slot</td></tr>
    <tr><td><code class="tok tok--static">force-state</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>hover | focus | active. Showcase/testing only</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Slot</th><th>Description</th></tr></thead><tbody>
    <tr><td>(default)</td><td>Button label. Hidden with <code class="tok tok--static">icon-only</code></td></tr>
    <tr><td><code class="tok tok--static">icon</code></td><td><code class="tok tok--static">&lt;svg slot="icon"&gt;</code> — 20×20px, adjusts left padding</td></tr>
  </tbody></table>
  <div class="table-note">
    Does not emit custom events — uses the native <code class="tok tok--static">click</code> from the inner <code class="tok tok--static">&lt;button&gt;</code>.
  </div>
</div></div>



`,_r={title:"Button",desc:"The hardest-working element in the UI. Six variants, every brand, always accessible.",tabs:["Preview","Specs"],content:[mr,yr],brandAware:!0},fr=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <div class="pg-controls__group"><label style="font-size:11px;color:var(--grey-500);font-family:var(--font-mono);">Tag</label><input type="text" value="New" id="eb-tag-text" class="eb-input" style="width:80px;" /></div>
    <div class="pg-controls__group"><label style="font-size:11px;color:var(--grey-500);font-family:var(--font-mono);">Body</label><input type="text" value="Globant Enterprise AI is here" id="eb-text" class="eb-input" style="width:240px;" /></div>
    <div class="pg-controls__group"><label style="font-size:11px;color:var(--grey-500);font-family:var(--font-mono);">CTA</label><input type="text" value="Read more" id="eb-cta-text" class="eb-input" style="width:100px;" /></div>
  </div>
</div>

<div class="pg-preview" id="eb-pg-preview" style="display:flex; align-items:center; justify-content:center; min-height:240px; padding:40px 24px; background:var(--blue-900, #151F2B); --eyebrow-fill:rgba(180,210,255,0.2);" data-surface="dark">
  <div id="eb-preview"></div>
</div>

<div class="pg-sticky" id="eb-sticky">
  <span class="pg-controls__label pg-controls__stencil">Eyebrow</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="eb-icon" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Icon</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="eb-tag" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Tag</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="eb-cta" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>CTA</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="eb-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="eb-code"></code></pre>
</div>
`,kr=`
<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Component tree</span></div>
  <div class="vcard__body" style="padding:24px;">
    <pre class="anatomy__tree">Eyebrow
├── Icon (optional)
│   └── SVG 18×18 in circle 32×32
├── Tag (optional)
│   └── Text label ("New", "Beta", etc.)
├── Body
│   ├── Text (news/announcement)
│   ├── Dash "—" (if CTA present)
│   └── CTA (optional)
│       ├── Label
│       └── Chevron icon</pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>Icon</td><td>true / false</td><td>Circular icon on the left</td></tr>
        <tr><td>Tag</td><td>true / false</td><td>Highlighted label (e.g. "New", "Beta")</td></tr>
        <tr><td>Tag Text</td><td>string</td><td>Tag text. Default: "New"</td></tr>
        <tr><td>Text</td><td>string</td><td>Announcement text. Truncates with ellipsis</td></tr>
        <tr><td>CTA</td><td>true / false</td><td>Call to action with chevron</td></tr>
        <tr><td>CTA Text</td><td>string</td><td>CTA label. Default: "Read more"</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Specifications</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Padding</td><td>8px 16px 8px 8px ${i("--sp-2","--sp-2")} ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Gap</td><td>8px ${i("--sp-2","--sp-2")}</td></tr>
        <tr><td>Border</td><td>0.5px solid ${i("--black","--black")}</td></tr>
        <tr><td>Border radius</td><td>100px ${i("--r-full","--r-full")}</td></tr>
        <tr><td>Icon size</td><td>32×32px, border-radius: 50%</td></tr>
        <tr><td>Icon background</td><td><span class="sw" style="background:#e0e0e0"></span>${i("--eyebrow-fill","--eyebrow-fill")} fallback ${i("--card-border","--card-border")}</td></tr>
        <tr><td>Tag font</td><td>Light (300) · 14px/22px · Rubik ${i("--body-s","--body-s")}</td></tr>
        <tr><td>Tag padding</td><td>2px 8px</td></tr>
        <tr><td>Tag background</td><td><span class="sw" style="background:#e0e0e0"></span>${i("--eyebrow-fill","--eyebrow-fill")} fallback ${i("--card-border","--card-border")}</td></tr>
        <tr><td>Tag border-radius</td><td>4px ${i("--r-xs","--r-xs")}</td></tr>
        <tr><td>Text font</td><td>Light (300) · 12px/20px · Rubik ${i("--body-xs","--body-xs")}</td></tr>
        <tr><td>CTA font</td><td>Medium (500) · 12px/20px · Rubik ${i("--body-xs-strong","--body-xs-strong")}</td></tr>
        <tr><td>Chevron</td><td>6×9px</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Surface adaptation</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Surface</th><th>Custom property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td style="font-weight:600"><span class="sw" style="background:#fff;border:1px solid #e0e0e0;"></span>Light</td><td>${i("--eyebrow-fill","--eyebrow-fill")}</td><td>Not defined — falls back to ${i("--card-border","--card-border")}</td></tr>
        <tr style="border-bottom:none"><td rowspan="2" style="font-weight:600;border-bottom:1px solid var(--card-border)"><span class="sw" style="background:#151F2B;border:1px solid var(--grey-300);"></span>Dark</td><td style="border-bottom:none">${i("--eyebrow-fill","--eyebrow-fill")}</td><td style="border-bottom:none"><span class="sw" style="background:rgba(180,210,255,0.2);border:1px solid #e0e0e0;"></span><code class="tok tok--static">rgba(180,210,255,0.2)</code> — background tint</td></tr>
        <tr><td>Border (CSS rule)</td><td><span class="sw" style="background:rgba(255,255,255,0.25);border:1px solid #e0e0e0"></span><code class="tok tok--static">rgba(255,255,255,0.25)</code> — automatic via <code>[data-surface="dark"]</code></td></tr>
        <tr><td style="font-weight:600"><span class="sw" style="background:#E5EEFF;border:1px solid #e0e0e0;"></span>Accent</td><td>${i("--eyebrow-fill","--eyebrow-fill")}</td><td><span class="sw" style="background:rgba(0,60,180,0.18);border:1px solid #e0e0e0;"></span><code class="tok tok--static">rgba(0,60,180,0.18)</code> — background tint</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Design Tokens</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
      <tbody>
        <tr><td>${i("--sp-2","--sp-2")}</td><td>8px</td><td>Vertical padding, gap between elements</td></tr>
        <tr><td>${i("--sp-4","--sp-4")}</td><td>16px</td><td>Right horizontal padding</td></tr>
        <tr><td>${i("--r-full","--r-full")}</td><td>100px</td><td>Container border radius</td></tr>
        <tr><td>${i("--r-xs","--r-xs")}</td><td>4px</td><td>Tag border radius</td></tr>
        <tr><td>${i("--black","--black")}</td><td>var(--black)</td><td>Border color, text, icons</td></tr>
        <tr><td>${i("--eyebrow-fill","--eyebrow-fill")}</td><td>var(--card-border)</td><td>Icon and tag background (overrideable by stencil)</td></tr>
        <tr><td>${i("--card-border","--card-border")}</td><td><span class="sw" style="background:#e0e0e0"></span>#e0e0e0</td><td>Fallback when --eyebrow-fill is not defined</td></tr>
        <tr><td>${i("--body-s","--body-s")}</td><td>Light (300) · 14px/22px · Rubik</td><td>Tag font</td></tr>
        <tr><td>${i("--body-xs","--body-xs")}</td><td>Light (300) · 12px/20px · Rubik</td><td>Text font</td></tr>
        <tr><td>${i("--body-xs-strong","--body-xs-strong")}</td><td>Medium (500) · 12px/20px · Rubik</td><td>CTA font</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;function sa(){const a=document.getElementById("eb-icon"),t=document.getElementById("eb-tag"),e=document.getElementById("eb-cta"),d=document.getElementById("eb-tag-text"),o=document.getElementById("eb-text"),r=document.getElementById("eb-cta-text");if(!a||!t||!e||!d||!o||!r)return;const s=a.checked,l=t.checked,n=e.checked,c=d.value||"New",h=o.value||"Announcement text",v=r.value||"Read more",m=["lam-eyebrow"];s||m.push("lam-eyebrow--no-icon");let $='<div class="'+m.join(" ")+'" role="status">';s&&($+='<span class="lam-eyebrow__icon" aria-hidden="true">'+Ps+"</span>"),l&&($+='<span class="lam-eyebrow__tag">'+c+"</span>"),$+='<div class="lam-eyebrow__body">',$+='<span class="lam-eyebrow__text">'+h+"</span>",n&&($+='<span class="lam-eyebrow__dash" aria-hidden="true">—</span>',$+='<a class="lam-eyebrow__cta" href="#">'+v+' <span aria-hidden="true">'+Aa+"</span></a>"),$+="</div></div>";const j=document.getElementById("eb-preview");j&&(j.innerHTML=$);let E='<div class="'+m.join(" ")+`">
`;s&&(E+=`  <span class="lam-eyebrow__icon"><!-- bell icon --></span>
`),l&&(E+='  <span class="lam-eyebrow__tag">'+c+`</span>
`),E+=`  <div class="lam-eyebrow__body">
`,E+='    <span class="lam-eyebrow__text">'+h+`</span>
`,n&&(E+=`    <span class="lam-eyebrow__dash">—</span>
`,E+='    <a class="lam-eyebrow__cta" href="#">'+v+` ›</a>
`),E+=`  </div>
</div>`;const q=document.getElementById("eb-code");q&&(q.innerHTML=R(E))}const xr={title:"Eyebrow",desc:"The quiet attention-grabber. An inline banner with icon, tag, and call to action.",tabs:["Preview","Specs"],content:[fr,kr],init(){["eb-icon","eb-tag","eb-cta"].forEach(d=>{const o=document.getElementById(d);o&&o.addEventListener("change",sa)}),["eb-tag-text","eb-text","eb-cta-text"].forEach(d=>{const o=document.getElementById(d);o&&o.addEventListener("input",sa)});const e=document.getElementById("eb-copy-btn");e&&e.addEventListener("click",()=>{const d=document.getElementById("eb-code");d&&(S(d.textContent||""),C("Copied!"))}),sa()}};function D(a,t){const e=Array.from(a.querySelectorAll("button"));function d(o){e.forEach(r=>{r.classList.remove("on"),r.setAttribute("aria-checked","false"),r.setAttribute("tabindex","-1")}),o.classList.add("on"),o.setAttribute("aria-checked","true"),o.setAttribute("tabindex","0"),t&&t(o)}e.forEach((o,r)=>{o.addEventListener("click",()=>d(o)),o.addEventListener("keydown",s=>{let l=-1;s.key==="ArrowRight"||s.key==="ArrowDown"?(s.preventDefault(),l=(r+1)%e.length):(s.key==="ArrowLeft"||s.key==="ArrowUp")&&(s.preventDefault(),l=(r-1+e.length)%e.length),l>=0&&(e[l].focus(),d(e[l]))})}),e.forEach(o=>{o.setAttribute("tabindex",o.classList.contains("on")?"0":"-1")})}function wr(){document.querySelectorAll(".tok:not([tabindex])").forEach(a=>{a.setAttribute("tabindex","0"),a.setAttribute("role","button"),a.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),a.click())})})}function $r(){document.querySelectorAll(".sw:not([data-sw-ready])").forEach(a=>{var d,o;a.setAttribute("data-sw-ready","");const e=(o=(d=(a.getAttribute("style")||"").match(/background:\s*([^;\"]+)/))==null?void 0:d[1])==null?void 0:o.trim();e&&(a.setAttribute("role","button"),a.setAttribute("tabindex","0"),a.style.cursor="pointer",a.title=`Copy ${e}`,a.addEventListener("click",()=>{is(e)}),a.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),is(e))}))})}function is(a){S(a),C("Copied!")}function ut(a,t,e,d="none",o=0){let r="blk__card",s="";return d==="accent"?(r+=" blk__card--accent",s=' style="--_accent:'+qe[o%qe.length]+'"'):d==="outlined"&&(r+=" blk__card--outlined"),'<div class="'+r+'"'+s+'><div class="blk__card-top">'+('<div class="blk__card-icon">'+a+"</div>")+'<div class="blk__card-title">'+t+'</div></div><div class="blk__card-body">'+e+'</div><a class="blk__card-link" href="#">Link '+rd+"</a></div>"}const Rt=[ut(Ds,"AI-Powered Development","Build intelligent applications with integrated AI agents that understand your business logic and automate complex workflows."),ut(Rs,"Low-Code Platform","Create enterprise applications visually with a powerful low-code environment that generates native, optimized code."),ut(Ms,"Enterprise Security","Built-in security features including role-based access control, data encryption, and compliance certifications."),ut(qs,"Multi-Platform Deploy","Deploy once, run anywhere. Generate native apps for web, mobile, and desktop from a single knowledge base."),ut(Os,"Scalable Architecture","Start small and grow. Our architecture scales seamlessly from prototype to millions of users."),ut(Sa,"Developer Experience","Intuitive tools, comprehensive documentation, and a vibrant community to accelerate your development.")],je=[{icon:Ds,title:"AI-Powered Development",body:"Build intelligent applications with integrated AI agents that understand your business logic and automate complex workflows."},{icon:Rs,title:"Low-Code Platform",body:"Create enterprise applications visually with a powerful low-code environment that generates native, optimized code."},{icon:Ms,title:"Enterprise Security",body:"Built-in security features including role-based access control, data encryption, and compliance certifications."},{icon:qs,title:"Multi-Platform Deploy",body:"Deploy once, run anywhere. Generate native apps for web, mobile, and desktop from a single knowledge base."},{icon:Os,title:"Scalable Architecture",body:"Start small and grow. Our architecture scales seamlessly from prototype to millions of users."},{icon:Sa,title:"Developer Experience",body:"Intuitive tools, comprehensive documentation, and a vibrant community to accelerate your development."}];function oa(a){const t=je[a];return ut(t.icon,t.title,t.body,Nt,a)}let Jt="top",Oe="left",Ft=2,Ba=1440,Nt="none";const qe=["#34C759","#00BCD4","#5BA7FF","#FF9500","#AF52DE","#30D5C8"];function Ar(){const a=Ba<=1023,e=a||Ft===3;[document.getElementById("blk-align-sep"),document.getElementById("blk-align-label"),document.getElementById("blk-align-pills")].forEach(d=>{d&&(d.style.display=e?"none":"")}),e&&Jt==="left"&&(Jt="top",document.querySelectorAll("#blk-align-pills button").forEach(d=>d.classList.toggle("on",d.dataset.val==="top"))),[document.getElementById("blk-cols-sep"),document.getElementById("blk-cols-label"),document.getElementById("blk-cols-pills")].forEach(d=>{d&&(d.style.display=a?"none":"")}),a&&(Ft=2,document.querySelectorAll("#blk-cols-pills button").forEach(d=>d.classList.toggle("on",d.dataset.val==="2")))}function ls(a,t){Ba=a;let e;if(a<=639?e="mobile":a<=1023?e="tablet":e="desktop",t){const s=t.closest(".lam-device-bar");s&&s.querySelectorAll(".lam-device").forEach(l=>l.classList.remove("on")),t.classList.add("on")}const d=document.getElementById("blk-viewport");if(d){d.setAttribute("data-bp",e),e==="desktop"&&a>=940?(d.style.width="100%",d.style.maxWidth="none",d.style.margin="0"):(d.style.width=a+"px",d.style.maxWidth="100%",d.style.margin="0 auto");const s=document.getElementById("blk-breakout");s&&(s.style.padding=e==="desktop"&&a>=940?"0":"24px")}const o=e.charAt(0).toUpperCase()+e.slice(1),r=document.getElementById("blk-width-label");r&&(r.textContent=o+" · "+a+"px"),gt()}function Sr(a,t){const e=document.getElementById("blk-code");if(!e)return;const d=Ft===3,o=Jt==="left"&&!d,r=Oe==="center";let s='<div class="blk'+(o?" blk--left":"")+`">
`;a&&(s+='  <div class="blk__header'+(r?" blk__header--center":"")+`">
`,s+=`    <h3 class="blk__title">Title</h3>
    <p class="blk__desc">Description</p>
`,s+=`    <button class="jb jb--sec">Get started</button>
`,s+=`  </div>
`),s+=`  <div class="blk__content">
`;const l=d?3:2;s+='    <div class="blk__grid'+(d?" blk__grid--3col":"")+`">
`;const n="blk__card"+(Nt==="accent"?" blk__card--accent":"")+(Nt==="outlined"?" blk__card--outlined":"");for(let c=0;c<l;c++)Nt==="accent"?s+='      <div class="'+n+'" style="--_accent:'+qe[c%qe.length]+`">...</div>
`:s+='      <div class="'+n+`">...</div>
`;s+=`    </div>
`,s+=`  </div>
`,t&&(s+=`  <a class="blk__footer-link" href="#">View more</a>
`),s+="</div>",e.innerHTML=R(s)}function gt(){const a=document.getElementById("blk-live");if(!a)return;Ar();const t=Jt==="left"&&Ft!==3,e=Oe==="center";a.className="blk"+(t?" blk--left":"");const d=a.querySelector(".blk__content");if(!d)return;const o=a.querySelector(".blk__header"),r=document.getElementById("blk-footer"),s=document.getElementById("blk-show-intro"),l=document.getElementById("blk-show-more"),n=s?s.checked:!0,c=l?l.checked:!0;o&&(o.style.display=n?"":"none",o.className="blk__header"+(e?" blk__header--center":"")),[document.getElementById("blk-intro-align-sep"),document.getElementById("blk-intro-align-label"),document.getElementById("blk-intro-align-pills")].forEach(m=>{m&&(m.style.display=n?"":"none")});let v="";if(Ft===3){v+='<div class="blk__grid blk__grid--3col">';for(let m=0;m<3&&m<je.length;m++)v+=oa(m);v+="</div>"}else for(let m=0;m<je.length;m+=2)v+='<div class="blk__grid">',v+=oa(m),m+1<je.length&&(v+=oa(m+1)),v+="</div>";t&&c&&(v+='<a class="blk__footer-link" href="#">View more</a>'),d.innerHTML=v,r&&(r.style.display=!t&&c?"":"none"),Sr(n,c)}function Er(){Jt="top",Oe="left",Ft=2,Nt="none",Ba=1440,ls(1440,document.querySelector("#blk-breakout .lam-device")),gt();const a=document.getElementById("blk-device-bar");a&&a.querySelectorAll(".lam-device").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.dataset.width||"1440",10);a.querySelectorAll(".lam-device").forEach(n=>{n.classList.remove("on"),n.setAttribute("aria-checked","false")}),s.classList.add("on"),s.setAttribute("aria-checked","true"),ls(l,s)})}),["blk-show-intro","blk-show-more"].forEach(s=>{const l=document.getElementById(s);l&&l.addEventListener("change",()=>gt())});const t=document.getElementById("blk-copy-btn");t&&t.addEventListener("click",()=>{const s=document.getElementById("blk-code");s&&(S(s.textContent||""),C("Copied!"))});const e=document.getElementById("blk-align-pills");e&&D(e,s=>{Jt=s.dataset.val||"top",gt()});const d=document.getElementById("blk-intro-align-pills");d&&D(d,s=>{Oe=s.dataset.val||"left",gt()});const o=document.getElementById("blk-cols-pills");o&&D(o,s=>{Ft=parseInt(s.dataset.val||"2",10),gt()});const r=document.getElementById("blk-border-pills");r&&D(r,s=>{Nt=s.dataset.val||"none",gt()})}const Cr=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="blk-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${vt}
      </button>
    </div>
    <span class="pg-controls__sep" id="blk-align-sep"></span>
    <span class="pg-controls__label" id="blk-align-label">Align</span>
    <div class="btn-pills" id="blk-align-pills" role="radiogroup" aria-label="Title alignment">
      <button class="on" data-val="top" role="radio" aria-checked="true">Top</button>
      <button data-val="left" role="radio" aria-checked="false">Left</button>
    </div>
    <span class="pg-controls__sep" id="blk-intro-align-sep"></span>
    <span class="pg-controls__label" id="blk-intro-align-label">Align intro</span>
    <div class="btn-pills" id="blk-intro-align-pills" role="radiogroup" aria-label="Intro alignment">
      <button class="on" data-val="left" role="radio" aria-checked="true">Left</button>
      <button data-val="center" role="radio" aria-checked="false">Center</button>
    </div>
    <span class="pg-controls__sep" id="blk-cols-sep"></span>
    <span class="pg-controls__label" id="blk-cols-label">Columns</span>
    <div class="btn-pills" id="blk-cols-pills" role="radiogroup" aria-label="Column count">
      <button class="on" data-val="2" role="radio" aria-checked="true">2</button>
      <button data-val="3" role="radio" aria-checked="false">3</button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="blk-breakout">
    <div class="lam-viewport" id="blk-viewport" data-bp="desktop">
      <div class="blk" id="blk-live" data-surface="light">
        <div class="blk__header">
          <h3 class="blk__title">Build the future</h3>
          <p class="blk__desc">Everything you need to create enterprise-grade applications that scale with your business.</p>
          <div class="blk__btn-wrap" style="margin-top:var(--sp-2)">
            <button class="jb jb--sec">Get started</button>
          </div>
        </div>
        <div class="blk__content">
          <div class="blk__grid">${Rt[0]+Rt[1]}</div>
          <div class="blk__grid">${Rt[2]+Rt[3]}</div>
          <div class="blk__grid">${Rt[4]+Rt[5]}</div>
        </div>
        <a class="blk__footer-link" href="#" id="blk-footer">View more</a>
      </div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="blk-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="blk-sticky">
  <span class="pg-controls__label pg-controls__stencil">Blocks</span>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Border</span>
  <div class="btn-pills" id="blk-border-pills" role="radiogroup" aria-label="Border style">
    <button class="on" data-val="none" role="radio" aria-checked="true">None</button>
    <button data-val="accent" role="radio" aria-checked="false">Left accent</button>
    <button data-val="outlined" role="radio" aria-checked="false">Outlined</button>
  </div>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="blk-show-intro" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Intro</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="blk-show-more" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>View More (CTA)</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="blk-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="blk-code"></code></pre>
</div>
`,jr=`
<div class="vcard" style="margin-bottom: var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Blocks — Props API</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Prop / Class</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">.blk</code></td><td><code class="tok tok--static">class</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Base component class. Always required.</td></tr>
        <tr><td><code class="tok tok--static">.blk__header--center</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Centers the header content (title, description, CTA).</td></tr>
        <tr><td><code class="tok tok--static">.blk--left</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">top</td><td>Horizontal layout: title on the left, cards on the right.</td></tr>
        <tr><td><code class="tok tok--static">.blk__grid--3col</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">2col</td><td>3-column grid instead of 2.</td></tr>
        <tr><td><code class="tok tok--static">.blk__header</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Container for title, description and CTA button.</td></tr>
        <tr><td><code class="tok tok--static">.blk__card</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Individual card with icon, title, body and link.</td></tr>
        <tr><td><code class="tok tok--static">.blk__card-icon</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>32x32 icon container. Accepts SVG or image.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens used</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Token</th><th>Value (light)</th><th>Usage</th></tr></thead>
      <tbody>
        <tr><td>${i("--grey-50","--grey-50")}</td><td><span class="sw" style="background:#F7F7F7;border:1px solid #e0e0e0"></span>${p("#F7F7F7")}</td><td>Card background</td></tr>
        <tr><td>${i("--r-md","--r-md")}</td><td>8px</td><td>Card border-radius</td></tr>
        <tr><td>${i("--sp-6","--sp-6")}</td><td>32px</td><td>Card padding</td></tr>
        <tr><td>${i("--sp-8","--sp-8")}</td><td>64px</td><td>Grid gap, section gap</td></tr>
        <tr><td>${i("--sp-5","--sp-5")}</td><td>24px</td><td>Gap between elements inside card</td></tr>
        <tr><td>${i("--h2","--h2")}</td><td>Semibold (600) · 36px/48px · Graphik (alias, resolves to ${i("--title-2","--title-2")})</td><td>Section title</td></tr>
        <tr><td>${i("--highlight-m","--highlight-m")}</td><td>Light (300) · 20px/30px · Graphik</td><td>Section description</td></tr>
        <tr><td>${i("--title-4","--title-4")}</td><td>Semibold (600) · 20px/30px · Graphik</td><td>Card title</td></tr>
        <tr><td>${i("--body-m","--body-m")}</td><td>Light (300) · 17px/26px · Rubik</td><td>Card body text</td></tr>
        <tr><td>${i("--link","--link")}</td><td>Light (300) · 17px/17px · Rubik</td><td>Card link, footer link</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-top: var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Breakpoints</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Breakpoint</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">&gt; 768px</code></td><td>Full layout. 2 or 3 columns depending on variant.</td></tr>
        <tr><td><code class="tok tok--static">&le; 768px</code></td><td>Left title switches to top. 3col switches to 2col.</td></tr>
        <tr><td><code class="tok tok--static">&le; 640px</code></td><td>Everything stacks to 1 column. Title reduces to ${i("--title-5","--title-5")}.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-top: var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Motion</span></div>
  <div class="vcard__body" style="padding: 0;">
    <table class="tok-table">
      <thead><tr><th>Interaction</th><th>Property</th><th>Value</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td>Card hover</td><td><code class="tok tok--static">transform</code></td><td>translateY(-2px)</td><td>${i("--duration-fast","--duration-fast")} · ${i("--ease","--ease")}</td></tr>
        <tr><td>Card hover</td><td><code class="tok tok--static">box-shadow</code></td><td><code class="tok tok--static">0 4px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)</code></td><td>${i("--shadow-md","--shadow-md")}</td></tr>
        <tr><td>Link hover</td><td><code class="tok tok--static">color</code></td><td>${i("--brand","--brand")}</td><td>${i("--duration-fast","--duration-fast")} · ${i("--ease","--ease")}</td></tr>
        <tr><td>reduced-motion</td><td colspan="3">transform and transition disabled. Only shadow change persists.</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,Fr={title:"Blocks",desc:"A grid of feature cards that scales, reflows, and never loses its rhythm.",tabs:["Preview","Specs"],content:[Cr,jr],wide:!0,brandAware:!0,init:Er},pa="/lam-sample.png",Br=`<img src="${pa}" alt="Sample" style="width:100%;height:100%;min-height:300px;object-fit:cover;display:block" />`;let Ia="desktop",va="center",wt="none",ha=!0,re=!0,ie=!0,He=1440,Gt=null,Ae=null;function kt(){const a=Ia==="mobile",t=va==="left",e=wt==="right",d=wt==="bottom",o=wt==="full",r=document.getElementById("lam-combo-label"),s=o?"Img Full":e?"Img Right":d?"Img Bottom":"No Image",l=[];ha||l.push("media"),re||l.push("eyebrow"),ie||l.push("tertiary");let n=He+"px · "+(t?"Left":"Center")+" · "+s;l.length&&(n+=" · -"+l.join(" -")),r&&(r.textContent=n);const c=e&&He>768,h=t||c,v=h?"flex-start":"center",m=h?"left":"center",$=h?"flex-start":"center",j=Gt?'<img src="'+Gt+'" alt="" style="width:100%;height:100%;object-fit:cover;" />':Br,E=a?"GEAI is here":"GeneXus Enterprise AI is here",q='<div class="lam-eyebrow" role="status" aria-label="News: '+E+'"><span class="lam-eyebrow__icon" aria-hidden="true">'+Ps+'</span><span class="lam-eyebrow__tag">New</span><div class="lam-eyebrow__body"><span class="lam-eyebrow__text">'+E+'</span><span class="lam-eyebrow__dash" aria-hidden="true">—</span><a class="lam-eyebrow__cta" href="#">Read more <span aria-hidden="true">'+Aa+"</span></a></div></div>",I='<div class="lam-info" style="align-items:'+v+"; text-align:"+m+';">'+'<div class="lam-kicker">AI-Powered Enterprise Platform</div>'+'<h1 class="lam-title">Create enterprise software 10x faster</h1><div class="lam-paragraph">Build, integrate, and evolve mission-critical applications with the power of AI and low-code development.</div></div>',Pt='<div class="lam-cta" style="justify-content:'+$+';"><button class="jb jb--sec">Get started</button>'+(ie?'<button class="jb jb--ter">Watch demo</button>':"")+"</div>",z="",tt=(re?q:"")+I+Pt,we='<div class="lam-bottom-image">'+j+"</div>";let G;if(a){const $e='<div class="lam-mobile-content" style="align-items:'+v+"; text-align:"+m+';">'+tt+"</div>";o?G='<div class="lam-mobile-wrapper lam-mobile-wrapper--img-full"><img class="lam-container__bg" src="'+(Gt||pa)+'" alt="" loading="lazy" />'+z+$e+"</div>":G='<div class="lam-mobile-wrapper">'+z+$e+(e||d?'<div class="lam-mobile-image">'+j+"</div>":"")+"</div>"}else if(e)G='<div class="lam-split"><div class="lam-split__content" style="align-items:'+v+"; text-align:"+m+';">'+tt+'</div><div class="lam-split__image">'+j+"</div></div>";else if(d)G=z+'<div class="lam-container" style="align-items:'+v+';">'+tt+"</div>"+we;else if(o){const $e=Gt||pa;G=z+'<div class="lam-container lam-container--img-full" style="align-items:'+v+';"><img class="lam-container__bg" src="'+$e+'" alt="" loading="lazy" />'+tt+"</div>"}else G=z+'<div class="lam-container" style="align-items:'+v+';">'+tt+"</div>";const Zt=document.getElementById("lam-preview");Zt&&(Zt.innerHTML=G);let _="";const et="  ";o&&!a?_+=`<div class="lam-container lam-container--img-full">
`:a&&o?(_+=`<div class="lam-mobile-wrapper lam-mobile-wrapper--img-full">
`,_+=et+`<div class="lam-mobile-content">
`):a?(_+=`<div class="lam-mobile-wrapper">
`,_+=et+`<div class="lam-mobile-content">
`):e?(_+=`<div class="lam-split">
`,_+=et+`<div class="lam-split__content">
`):_+=`<div class="lam-container">
`;const N=e||a?"    ":et;re&&(_+=N+`<div class="lam-eyebrow">...</div>
`),_+=N+`<div class="lam-info">
`,_+=N+`  <div class="lam-kicker">Kicker text</div>
`,_+=N+`  <h1 class="lam-title">Title</h1>
`,_+=N+`  <div class="lam-paragraph">Paragraph</div>
`,_+=N+`</div>
`,_+=N+`<div class="lam-cta">
`,_+=N+`  <button class="jb jb--sec">Secondary</button>
`,ie&&(_+=N+`  <button class="jb jb--ter">Tertiary</button>
`),_+=N+`</div>
`,a?(_+=et+`</div>
`,(e||d)&&(_+=et+`<div class="lam-mobile-image"><img src="..." alt="..." /></div>
`),_+="</div>"):e?(_+=et+`</div>
`,_+=et+`<div class="lam-split__image"><img src="..." alt="..." /></div>
`,_+="</div>"):d?_+=`</div>
<div class="lam-bottom-image"><img src="..." alt="..." /></div>`:_+="</div>";const La=document.getElementById("lam-code");La&&(La.innerHTML=R(_))}function Ir(a,t){He=a;let e;if(a<=639?e="mobile":a<=1023?e="tablet":e="desktop",Ia=e,t){const n=t.closest(".lam-device-bar");n&&n.querySelectorAll(".lam-device").forEach(c=>c.classList.remove("on")),t.classList.add("on")}const d=document.getElementById("lam-viewport");if(d){d.setAttribute("data-bp",e),e==="desktop"&&a>=940?(d.style.width="100%",d.style.maxWidth="none",d.style.margin="0"):(d.style.width=a+"px",d.style.maxWidth="100%",d.style.margin="0 auto");const n=document.getElementById("lam-breakout");n&&(n.style.padding=e==="desktop"&&a>=940?"0":"24px")}const o=e.charAt(0).toUpperCase()+e.slice(1),r=document.getElementById("lam-width-label");r&&(r.textContent=o+" · "+a+"px");const s=e==="mobile"||e==="tablet",l=document.querySelectorAll("#lam-img-pills button");l.forEach(n=>{n.textContent.trim()==="Right"&&(n.style.display=s?"none":"")}),s&&wt==="right"&&(wt="none",l.forEach(n=>{n.classList.toggle("on",n.textContent.trim()==="None")})),kt()}function Tr(a){if(!a.files||!a.files[0])return;const t=new FileReader;t.onload=e=>{Gt=e.target.result;const d=document.getElementById("lam-clear-img");d&&(d.style.display="flex");const o=document.getElementById("lam-upload-label");if(o){const r=o.querySelector("svg");r&&(r.style.display="none"),o.childNodes[2]&&(o.childNodes[2].textContent=" "+a.files[0].name.slice(0,18))}kt()},t.readAsDataURL(a.files[0])}function Lr(){Gt=null;const a=document.getElementById("lam-clear-img");a&&(a.style.display="none");const t=document.getElementById("lam-upload-label");if(t){const e=t.querySelector("svg");e&&(e.style.display=""),t.childNodes[2]&&(t.childNodes[2].textContent=`
        Upload image
      `)}kt()}function Pr(){He=1440,Ia="desktop",va="center",wt="none",ha=!0,re=!0,ie=!0,kt();const a=document.getElementById("lam-width-label");a&&(a.textContent="Desktop · 1440px"),Ae&&Ae.abort(),Ae=new AbortController;const t={signal:Ae.signal},e=document.getElementById("lam-device-bar");e&&e.querySelectorAll(".lam-device").forEach(c=>{c.addEventListener("click",()=>{const h=parseInt(c.dataset.width||"1440",10);e.querySelectorAll(".lam-device").forEach(v=>{v.classList.remove("on"),v.setAttribute("aria-checked","false")}),c.classList.add("on"),c.setAttribute("aria-checked","true"),Ir(h,c)},t)});const d=document.getElementById("lam-align-pills");d&&D(d,c=>{va=c.dataset.val||"center",kt()});const o=document.getElementById("lam-img-pills");o&&D(o,c=>{wt=c.dataset.val||"none",kt()}),Object.entries({"lam-show-logo":c=>{ha=c},"lam-show-eyebrow":c=>{re=c},"lam-show-secondary":c=>{ie=c}}).forEach(([c,h])=>{const v=document.getElementById(c);v&&v.addEventListener("change",()=>{h(v.checked),kt()},t)});const s=document.getElementById("lam-upload-input");s&&s.addEventListener("change",()=>Tr(s),t);const l=document.getElementById("lam-clear-img");l&&l.addEventListener("click",Lr,t);const n=document.getElementById("lam-copy-btn");n&&n.addEventListener("click",()=>{const c=document.getElementById("lam-code");c&&(S(c.textContent||""),C("Copied!"))})}const Dr=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="lam-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${vt}
      </button>
    </div>
    <span class="pg-controls__sep"></span>
    <span class="pg-controls__label">Align</span>
    <div class="btn-pills" id="lam-align-pills" role="radiogroup" aria-label="Text alignment">
      <button class="on" data-val="center" role="radio" aria-checked="true">Center</button>
      <button data-val="left" role="radio" aria-checked="false">Left</button>
    </div>
    <span class="pg-controls__sep"></span>
    <span class="pg-controls__label">Image</span>
    <div class="btn-pills" id="lam-img-pills" role="radiogroup" aria-label="Image position">
      <button class="on" data-val="none" role="radio" aria-checked="true">None</button>
      <button data-val="full" role="radio" aria-checked="false">Full</button>
      <button data-val="right" role="radio" aria-checked="false">Right</button>
      <button data-val="bottom" role="radio" aria-checked="false">Bottom</button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="lam-breakout">
    <div class="lam-viewport" id="lam-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="lam-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="lam-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="lam-sticky">
  <span class="pg-controls__label pg-controls__stencil">Look at Me</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lam-show-eyebrow" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Eyebrow</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lam-show-secondary" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Tertiary (CTA)</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="lam-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="lam-code"></code></pre>
</div>
`,Mr=`
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">LookAtMe</span>
├── <span style="color:var(--black);font-weight:500;">SiteNav</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   └── Logo + Hamburger
│
├── <span style="color:var(--black);font-weight:500;">Container</span>
│   ├── <span style="color:var(--black);font-weight:500;">Logo</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   ├── <span style="color:var(--black);font-weight:500;">Eyebrow</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   ├── Notification icon
│   │   ├── Tag
│   │   ├── News text
│   │   ├── Dash separator
│   │   └── CTA
│   ├── <span style="color:var(--black);font-weight:500;">Information</span>
│   │   ├── Kicker <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   ├── Title
│   │   └── Paragraph
│   └── <span style="color:var(--black);font-weight:500;">CTA</span>
│       ├── Button Secondary
│       └── Button Tertiary <span style="color:var(--grey-500);font-style:italic;">(optional)</span></pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Device</td><td>Desktop (1440), Tablet (768), Mobile (428)</td><td>Scales typography, padding and layout.</td></tr>
        <tr><td>Alignment</td><td>Center, Left</td><td>Center: everything centered. Left: align-items flex-start + text-align left.</td></tr>
        <tr><td>Image</td><td>None, Full, Right, Bottom</td><td>Full: background with overlay. Right: horizontal split. Bottom: image below the content.</td></tr>
        <tr><td>Slots</td><td>Media, Eyebrow, Tertiary</td><td>Individual toggles to show/hide each hero slot.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Responsive specs</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Desktop</th><th>Tablet</th><th>Mobile</th></tr></thead>
      <tbody>
        <tr><td>Container padding</td><td>${i("--sp-10","--sp-10")}</td><td>${i("--sp-9","--sp-9")} ${i("--sp-8","--sp-8")}</td><td>${i("--sp-8","--sp-8")} ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Split content padding</td><td>${i("--sp-10","--sp-10")} ${i("--sp-8","--sp-8")}</td><td>${i("--sp-9","--sp-9")} ${i("--sp-8","--sp-8")}</td><td>${i("--sp-8","--sp-8")} ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Container gap</td><td>${i("--sp-6","--sp-6")}</td><td>${i("--sp-5","--sp-5")}</td><td>${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Info max-width</td><td colspan="3">940px</td></tr>
        <tr><td>Title font</td><td>${i("--h2","--h2")}</td><td>${i("--h2","--h2")}</td><td>${i("--h2","--h2")}</td></tr>
        <tr><td>Side image (Right)</td><td>576px fixed</td><td colspan="2">100% stacked · 400px / 300px</td></tr>
        <tr><td>Bottom image</td><td>400px</td><td>320px</td><td>240px</td></tr>
        <tr><td>CTA gap</td><td colspan="2">${i("--sp-5","--sp-5")}</td><td>${i("--sp-4","--sp-4")}, wrap</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,Rr={title:"Look at Me",desc:"First impression, fully yours. The hero section that adapts to any story.",tabs:["Preview","Specs"],content:[Dr,Mr],wide:!0,brandAware:!0,init:()=>{Pr()}};let X="desktop",ba="left",le=!0,ne=!0,ce=!0,pe=!1;const ns="/lam-sample.png";function Or(a,t){if(X=a<=639?"mobile":a<=1023?"tablet":"desktop",t){const s=t.closest(".lam-device-bar");s&&s.querySelectorAll(".lam-device").forEach(l=>l.classList.remove("on")),t.classList.add("on")}const e=document.getElementById("sat-viewport");if(e){e.setAttribute("data-bp",X),X==="desktop"?(e.style.width="100%",e.style.maxWidth="none",e.style.margin="0"):(e.style.width=a+"px",e.style.maxWidth="100%",e.style.margin="0 auto");const s=document.getElementById("sat-breakout");s&&(s.style.padding=X==="desktop"?"0":"24px")}const d=document.getElementById("sat-pos-group");d&&(d.style.display=X==="desktop"?"contents":"none");const o=X.charAt(0).toUpperCase()+X.slice(1),r=document.getElementById("sat-width-label");r&&(r.textContent=o+" · "+a+"px"),Fe()}function Fe(){const a=ba==="right",t=document.getElementById("sat-combo-label");if(t){const n=["Text "+(a?"Right":"Left")],c=[];le||c.push("icon"),ne||c.push("kicker"),ce||c.push("caption"),pe||c.push("footer"),c.length&&n.push("-"+c.join(" -")),t.textContent=n.join(" · ")}let e=`<div class="sat">
`;e+=`  <div class="sat__header">
`,e+='    <h1 class="sat__title">'+(X==="mobile"?"Future-proof enterprise systems. Built fast.<br>Built to last.":"Future-proof enterprise systems.<br>Built fast. Built to last.")+`</h1>
`,e+=`    <p class="sat__subtitle">GeneXus is the Agentic Low-Code platform that generates native code, orchestrates AI agents and evolves with your business.</p>
`,e+=`  </div>
`,e+='  <div class="sat__feature'+(a?" sat__feature--right":"")+`">
`,e+=`    <div class="sat__text">
`,le&&(e+='      <div class="sat__icon"><img src="'+ns+`" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:var(--r-xs);" /></div>
`),e+=`      <div class="sat__info">
`,ne&&(e+=`        <div class="sat__kicker">Productivity</div>
`),e+=`        <h2 class="sat__feature-title">Develop intelligent enterprise applications</h2>
`,e+=`        <p class="sat__body">Build smart applications and agents with a platform that combines generative and symbolic AI throughout development. Design assistants that automate tasks and work hand in hand with your people and systems.</p>
`,e+=`      </div>
`,e+=`      <div class="sat__cta">
`,e+=`        <button class="jb jb--sec">Learn more</button>
`,e+=`        <button class="jb jb--ter">Explore</button>
`,e+=`      </div>
`,e+=`    </div>
`,e+=`    <div class="sat__media">
`,e+='      <div class="sat__media-wrap"><img src="'+ns+`" alt="Platform screenshot" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;" /></div>
`,ce&&(e+=`      <p class="sat__caption">Powered by deterministic and generative AI.</p>
`),e+=`    </div>
`,e+=`  </div>
`,pe&&(e+=`  <div class="sat__footer">
`,e+=`    <button class="jb jb--ter">Explore</button>
`,e+=`  </div>
`),e+="</div>";const o=document.getElementById("sat-preview");o&&(o.innerHTML=e);let r="";const s="  ";r+=`<div class="sat">
`,r+=s+`<div class="sat__header">
`,r+=s+s+`<h1 class="sat__title">Main title</h1>
`,r+=s+s+`<p class="sat__subtitle">Strapline text</p>
`,r+=s+`</div>
`,r+=s+'<div class="sat__feature'+(a?" sat__feature--right":"")+`">
`,r+=s+s+`<div class="sat__text">
`,le&&(r+=s+s+s+`<div class="sat__icon"><img src="..." alt="..." /></div>
`),r+=s+s+s+`<div class="sat__info">
`,ne&&(r+=s+s+s+s+`<div class="sat__kicker">Kicker</div>
`),r+=s+s+s+s+`<h2 class="sat__feature-title">Title</h2>
`,r+=s+s+s+s+`<p class="sat__body">Body text</p>
`,r+=s+s+s+`</div>
`,r+=s+s+s+`<div class="sat__cta">
`,r+=s+s+s+s+`<button class="jb jb--sec">Label</button>
`,r+=s+s+s+s+`<button class="jb jb--ter">Label</button>
`,r+=s+s+s+`</div>
`,r+=s+s+`</div>
`,r+=s+s+`<div class="sat__media">
`,r+=s+s+s+`<div class="sat__media-wrap"><img src="..." alt="..." /></div>
`,ce&&(r+=s+s+s+`<p class="sat__caption">Caption text</p>
`),r+=s+s+`</div>
`,r+=s+`</div>
`,pe&&(r+=s+`<div class="sat__footer">
`,r+=s+s+`<button class="jb jb--ter">Label +</button>
`,r+=s+`</div>
`),r+="</div>";const l=document.getElementById("sat-code");l&&(l.innerHTML=R(r))}function qr(){X="desktop",ba="left",le=!0,ne=!0,ce=!0,pe=!1,Fe();const a=document.getElementById("sat-width-label");a&&(a.textContent="Desktop · 1440px");const t=document.getElementById("sat-device-bar");t&&t.querySelectorAll(".lam-device").forEach(r=>{r.addEventListener("click",()=>{const s=parseInt(r.dataset.width||"1440",10);t.querySelectorAll(".lam-device").forEach(l=>{l.classList.remove("on"),l.setAttribute("aria-checked","false")}),r.classList.add("on"),r.setAttribute("aria-checked","true"),Or(s,r)})});const e=document.getElementById("sat-pos-pills");e&&D(e,r=>{ba=r.dataset.val||"left",Fe()}),Object.entries({"sat-show-icon":r=>{le=r},"sat-show-kicker":r=>{ne=r},"sat-show-caption":r=>{ce=r},"sat-show-footer":r=>{pe=r}}).forEach(([r,s])=>{const l=document.getElementById(r);l&&l.addEventListener("change",()=>{s(l.checked),Fe()})});const o=document.getElementById("sat-copy-btn");o&&o.addEventListener("click",()=>{const r=document.getElementById("sat-code");r&&(S(r.textContent||""),C("Copied!"))})}const Hr=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="sat-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${vt}
      </button>
    </div>
    <span id="sat-pos-group" style="display:contents;">
      <span class="pg-controls__sep"></span>
      <span class="pg-controls__label">Text Position</span>
      <div class="btn-pills" id="sat-pos-pills" role="radiogroup" aria-label="Text position">
        <button class="on" data-val="left" role="radio" aria-checked="true">Left</button>
        <button data-val="right" role="radio" aria-checked="false">Right</button>
      </div>
    </span>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="sat-breakout" style="padding:0;">
    <div class="lam-viewport" id="sat-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="sat-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="sat-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="sat-sticky">
  <span class="pg-controls__label pg-controls__stencil">Show and Tell</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="sat-show-icon" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Icon</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="sat-show-kicker" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Kicker</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="sat-show-caption" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Caption</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" id="sat-show-footer" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>View more (CTA)</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="sat-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="sat-code"></code></pre>
</div>
`,zr=`
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">ShowAndTell</span>
├── <span style="color:var(--black);font-weight:500;">Header</span> (centered, 940px max)
│   ├── Title → h2 (responsive alias)
│   └── Subtitle → highlight-l
│
├── <span style="color:var(--black);font-weight:500;">Feature</span>
│   ├── <span style="color:var(--black);font-weight:500;">Text</span>
│   │   ├── Icon (64×64) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   ├── <span style="color:var(--black);font-weight:500;">Information</span>
│   │   │   ├── Kicker → highlight-m / highlight-s (mobile) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   │   ├── Title → h2 (responsive alias)
│   │   │   └── Body → body-l
│   │   └── CTA (button slot)
│   └── <span style="color:var(--black);font-weight:500;">Media</span>
│       ├── Image (object-fit cover)
│       └── Caption → body-s <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│
└── <span style="color:var(--black);font-weight:500;">View more (CTA)</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
    └── Action button (slot)</pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Text Position</td><td>Left, Right</td><td>Reverses the order of the text/media columns.</td></tr>
        <tr><td>Icon</td><td>Visible / Hidden</td><td>64×64 icon above the text area.</td></tr>
        <tr><td>Kicker</td><td>Visible / Hidden</td><td>Pre-title text in the feature area.</td></tr>
        <tr><td>Caption</td><td>Visible / Hidden</td><td>Descriptive text below the image.</td></tr>
        <tr><td>View more (CTA)</td><td>Visible / Hidden</td><td>Centered action button at the bottom.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Container padding</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Container gap</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Header gap</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Header width</td><td>940px</td></tr>
        <tr><td>Feature gap</td><td>80px ${i("--sp-9","--sp-9")}</td></tr>
        <tr><td>Text column gap</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Info gap</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Media gap</td><td>8px ${i("--sp-2","--sp-2")}</td></tr>
        <tr><td>Title (header)</td><td>Semibold (600) · Graphik ${i("--h2","--h2")} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Subtitle</td><td>Light (300) · 26px/36px · Graphik ${i("--highlight-l","--highlight-l")}</td></tr>
        <tr><td>Kicker (desktop/tablet)</td><td>Light (300) · 20px/30px · Graphik ${i("--highlight-m","--highlight-m")}</td></tr>
        <tr><td>Kicker (mobile)</td><td>Light (300) · 17px/26px · Graphik ${i("--highlight-s","--highlight-s")}</td></tr>
        <tr><td>Feature title</td><td>Semibold (600) · 36px/48px · Graphik ${i("--h2","--h2")} (responsive alias)</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Caption</td><td>Light (300) · 12px/20px · Rubik ${i("--body-xs","--body-xs")} · ${i("--grey-500","--grey-500")}</td></tr>
        <tr><td>Icon size</td><td>64×64</td></tr>
        <tr><td>Background</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")} (light) / <span class="sw" style="background:#212121"></span>${p("#212121")} (dark) ${i("--card","--card")}</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,Gr={title:"Show and Tell",desc:"Tell the story on one side, show it on the other. Split layout with a centered headline.",tabs:["Preview","Specs"],content:[Hr,zr],wide:!0,brandAware:!0,init:()=>{qr()}},Nr='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 6.5L21 12l-7 2.5L12 21l-2-6.5L3 12l7-2.5z"/></svg>';let H="desktop",ua="left",ga="bottom",ve=!0,he=!0;const Ur="/lam-sample.png",cs="AI-powered features available";function Vr(a,t){if(H=a<=639?"mobile":a<=1023?"tablet":"desktop",t){const l=t.closest(".lam-device-bar");l&&l.querySelectorAll(".lam-device").forEach(n=>n.classList.remove("on")),t.classList.add("on")}const e=document.getElementById("isl-viewport");if(e){e.setAttribute("data-bp",H),H==="desktop"?(e.style.width="100%",e.style.maxWidth="none",e.style.margin="0"):(e.style.width=a+"px",e.style.maxWidth="100%",e.style.margin="0 auto");const l=document.getElementById("isl-breakout");l&&(l.style.padding=H==="desktop"?"0":"24px")}const d=document.getElementById("isl-pos-group");d&&(d.style.display=H==="desktop"?"contents":"none");const o=document.getElementById("isl-media-group");o&&(o.style.display=H==="tablet"||H==="mobile"?"contents":"none");const r=H.charAt(0).toUpperCase()+H.slice(1),s=document.getElementById("isl-width-label");s&&(s.textContent=r+" · "+a+"px"),ee()}function ee(){const a=ua==="right",t=H==="tablet"||H==="mobile"?ga==="top":a,e=document.getElementById("isl-combo-label");if(e){const n=["Text "+(a?"Right":"Left")],c=[];ve||c.push("eyebrow"),he||c.push("kicker"),c.length&&n.push("-"+c.join(" -")),e.textContent=n.join(" · ")}let d=`<div class="isl">
`;d+='  <div class="isl__card'+(t?" isl__card--right":"")+`">
`,d+=`    <div class="isl__text">
`,ve&&(d+='      <div class="lam-eyebrow" role="status" aria-label="News: '+cs+'">',d+='<span class="lam-eyebrow__icon" aria-hidden="true">'+Nr+"</span>",d+='<span class="lam-eyebrow__tag">New</span>',d+='<div class="lam-eyebrow__body">',d+='<span class="lam-eyebrow__text">'+cs+"</span>",d+='<span class="lam-eyebrow__dash" aria-hidden="true">—</span>',d+='<a class="lam-eyebrow__cta" href="#">Read more <span aria-hidden="true">'+Aa+"</span></a>",d+=`</div></div>
`),d+=`      <div class="isl__info">
`,he&&(d+=`        <div class="isl__kicker">Productivity</div>
`),d+=`        <h2 class="isl__title">Develop intelligent enterprise applications</h2>
`,d+=`        <p class="isl__body">Build smart applications and agents with a platform that combines generative and symbolic AI throughout development.</p>
`,d+=`      </div>
`,d+=`      <div class="isl__cta">
`,d+=`        <button class="jb jb--sec">Get started</button>
`,d+=`        <button class="jb jb--ter">Learn more</button>
`,d+=`      </div>
`,d+=`    </div>
`,d+=`    <div class="isl__media">
`,d+='      <img src="'+Ur+`" alt="Platform screenshot" />
`,d+=`    </div>
`,d+=`  </div>
`,d+="</div>";const o=document.getElementById("isl-preview");o&&(o.innerHTML=d);let r="";const s="  ";r+=`<div class="isl">
`,r+=s+'<div class="isl__card'+(t?" isl__card--right":"")+`">
`,r+=s+s+`<div class="isl__text">
`,ve&&(r+=s+s+s+`<div class="lam-eyebrow">
`,r+=s+s+s+s+`<span class="lam-eyebrow__icon"><!-- icon --></span>
`,r+=s+s+s+s+`<span class="lam-eyebrow__tag">New</span>
`,r+=s+s+s+s+`<div class="lam-eyebrow__body">
`,r+=s+s+s+s+s+`<span class="lam-eyebrow__text">Text</span>
`,r+=s+s+s+s+s+`<span class="lam-eyebrow__dash">—</span>
`,r+=s+s+s+s+s+`<a class="lam-eyebrow__cta" href="#">CTA</a>
`,r+=s+s+s+s+`</div>
`,r+=s+s+s+`</div>
`),r+=s+s+s+`<div class="isl__info">
`,he&&(r+=s+s+s+s+`<div class="isl__kicker">Kicker</div>
`),r+=s+s+s+s+`<h2 class="isl__title">Title</h2>
`,r+=s+s+s+s+`<p class="isl__body">Body text</p>
`,r+=s+s+s+`</div>
`,r+=s+s+s+`<div class="isl__cta">
`,r+=s+s+s+s+`<button class="jb jb--sec">Secondary</button>
`,r+=s+s+s+s+`<button class="jb jb--ter">Tertiary</button>
`,r+=s+s+s+`</div>
`,r+=s+s+`</div>
`,r+=s+s+`<div class="isl__media">
`,r+=s+s+s+`<img src="..." alt="..." />
`,r+=s+s+`</div>
`,r+=s+`</div>
`,r+="</div>";const l=document.getElementById("isl-code");l&&(l.innerHTML=R(r))}function Wr(){H="desktop",ua="left",ga="bottom",ve=!0,he=!0,ee();const a=document.getElementById("isl-width-label");a&&(a.textContent="Desktop · 1440px");const t=document.getElementById("isl-device-bar");t&&t.querySelectorAll(".lam-device").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.dataset.width||"1440",10);t.querySelectorAll(".lam-device").forEach(n=>{n.classList.remove("on"),n.setAttribute("aria-checked","false")}),s.classList.add("on"),s.setAttribute("aria-checked","true"),Vr(l,s)})});const e=document.getElementById("isl-pos-pills");e&&D(e,s=>{ua=s.dataset.val||"left",ee()});const d=document.getElementById("isl-media-pills");d&&D(d,s=>{ga=s.dataset.val||"bottom",ee()}),Object.entries({"isl-show-eyebrow":s=>{ve=s},"isl-show-kicker":s=>{he=s}}).forEach(([s,l])=>{const n=document.getElementById(s);n&&n.addEventListener("change",()=>{l(n.checked),ee()})});const r=document.getElementById("isl-copy-btn");r&&r.addEventListener("click",()=>{const s=document.getElementById("isl-code");s&&(S(s.textContent||""),C("Copied!"))})}const Jr=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="isl-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${vt}
      </button>
    </div>
    <span id="isl-pos-group" style="display:contents;">
      <span class="pg-controls__sep"></span>
      <span class="pg-controls__label">Text Position</span>
      <div class="btn-pills" id="isl-pos-pills" role="radiogroup" aria-label="Text position">
        <button class="on" data-val="left" role="radio" aria-checked="true">Left</button>
        <button data-val="right" role="radio" aria-checked="false">Right</button>
      </div>
    </span>
    <span id="isl-media-group" style="display:none;">
      <span class="pg-controls__sep"></span>
      <span class="pg-controls__label">Media</span>
      <div class="btn-pills" id="isl-media-pills" role="radiogroup" aria-label="Media position">
        <button data-val="top" role="radio" aria-checked="false">Top</button>
        <button class="on" data-val="bottom" role="radio" aria-checked="true">Bottom</button>
      </div>
    </span>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="isl-breakout" style="padding:0;">
    <div class="lam-viewport" id="isl-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="isl-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="isl-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="isl-sticky">
  <span class="pg-controls__label pg-controls__stencil">Island</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="isl-show-eyebrow" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Eyebrow</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="isl-show-kicker" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Kicker</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="isl-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="isl-code"></code></pre>
</div>
`,Kr=`
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Island</span>
├── <span style="color:var(--black);font-weight:500;">Card</span> (grey-50, border-radius r-xl)
│   ├── <span style="color:var(--black);font-weight:500;">Text</span> (padding sp-10 / sp-8 responsive)
│   │   ├── Logo <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   ├── <span style="color:var(--black);font-weight:500;">Eyebrow</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   │   ├── Icon (32×32)
│   │   │   ├── Tag → body-m
│   │   │   ├── Text → body-s
│   │   │   └── CTA → body-s-strong
│   │   ├── <span style="color:var(--black);font-weight:500;">Information</span>
│   │   │   ├── Kicker → highlight-m <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   │   ├── Title → h1 (responsive)
│   │   │   └── Body → body-l (desktop) / highlight-l (tablet)
│   │   └── CTA (secondary + tertiary buttons)
│   └── <span style="color:var(--black);font-weight:500;">Media</span> (edge-to-edge, object-fit cover)
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Text Position</td><td>Left, Right</td><td>Reverses the order of the text/media columns (row-reverse).</td></tr>
        <tr><td>Logo</td><td>Visible / Hidden</td><td>Logo or image above the eyebrow.</td></tr>
        <tr><td>Eyebrow</td><td>Visible / Hidden</td><td>Eyebrow component with icon, tag, text and CTA.</td></tr>
        <tr><td>Kicker</td><td>Visible / Hidden</td><td>Pre-title text in the information area.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Section padding (desktop)</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Section padding (tablet)</td><td>80px 64px ${i("--sp-9","--sp-9")} ${i("--sp-8","--sp-8")}</td></tr>
        <tr><td>Section padding (mobile)</td><td>64px 24px ${i("--sp-8","--sp-8")} ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Section background</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")} (light) / <span class="sw" style="background:#212121"></span>${p("#212121")} (dark) ${i("--card","--card")}</td></tr>
        <tr><td>Card background</td><td><span class="sw" style="background:#F7F7F7;border:1px solid #e0e0e0"></span>${p("#F7F7F7")} ${i("--grey-50","--grey-50")}</td></tr>
        <tr><td>Card border-radius (desktop)</td><td>32px ${i("--r-3xl","--r-3xl")}</td></tr>
        <tr><td>Card border-radius (tablet)</td><td>24px ${i("--r-2xl","--r-2xl")}</td></tr>
        <tr><td>Card border-radius (mobile)</td><td>16px ${i("--r-xl","--r-xl")}</td></tr>
        <tr><td>Text padding (desktop)</td><td>128px block, 64px inline ${i("--sp-10","--sp-10")} / ${i("--sp-8","--sp-8")}</td></tr>
        <tr><td>Text padding (tablet)</td><td>64px block, 32px inline ${i("--sp-8","--sp-8")} / ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Text padding (mobile)</td><td>48px block, 24px inline ${i("--sp-7","--sp-7")} / ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Text gap</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Info gap</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>CTA gap</td><td>24px ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Eyebrow</td><td>lam-eyebrow component (see Eyebrow docs)</td></tr>
        <tr><td>Kicker (desktop/tablet)</td><td>Light (300) · 20px/30px · Graphik ${i("--highlight-m","--highlight-m")}</td></tr>
        <tr><td>Kicker (mobile)</td><td>Light (300) · 17px/26px · Graphik ${i("--highlight-s","--highlight-s")}</td></tr>
        <tr><td>Title</td><td>Semibold (600) · 36px/48px · Graphik ${i("--h2","--h2")}</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Media</td><td>Edge-to-edge, object-fit cover</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,Yr={title:"Island",desc:"Content meets media in a rounded card — compact, versatile, always on brand.",tabs:["Preview","Specs"],content:[Jr,Kr],wide:!0,brandAware:!0,init:()=>{Wr()}},Xr=`
<div id="fld-playground" style="background:var(--grey-50);border:1px solid var(--card-border);border-radius:var(--r-lg);padding:var(--sp-5);display:flex;flex-direction:column;gap:var(--sp-5);">
  <div style="display:flex;align-items:flex-start;justify-content:center;padding:var(--sp-6) var(--sp-4);">
    <june-field id="fld-pg-field" type="email" label="Email address" placeholder="you@example.com" hint="We'll never share your email" style="width:100%;max-width:360px;"></june-field>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:var(--sp-3) var(--sp-4);align-items:end;justify-content:center;">
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-type" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Type</label>
      <select id="fld-pg-type" class="eb-input" style="width:100px;">
        <option value="text">text</option>
        <option value="email" selected>email</option>
        <option value="password">password</option>
        <option value="number">number</option>
        <option value="tel">tel</option>
        <option value="url">url</option>
        <option value="search">search</option>
        <option value="textarea">textarea</option>
        <option value="dropdown">dropdown</option>
      </select>
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-label" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Label</label>
      <input id="fld-pg-label" type="text" value="Email address" class="eb-input" style="width:120px;" />
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-placeholder" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Placeholder</label>
      <input id="fld-pg-placeholder" type="text" value="you@example.com" class="eb-input" style="width:130px;" />
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-hint" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Hint</label>
      <input id="fld-pg-hint" type="text" value="We'll never share your email" class="eb-input" style="width:200px;" />
    </div>
    <div class="pg-controls__group" style="flex-direction:column;align-items:flex-start;gap:var(--sp-1);">
      <label for="fld-pg-error" style="font-size:11px;color:var(--grey-500);font-family:var(--font-body);">Error</label>
      <input id="fld-pg-error" type="text" value="" placeholder="(empty)" class="eb-input" style="width:180px;" />
    </div>
    <label style="display:flex;align-items:center;gap:4px;font-size:12px;font-family:var(--font-body);color:var(--grey-500);cursor:pointer;height:30px;"><input type="checkbox" id="fld-pg-required" /> required</label>
    <label style="display:flex;align-items:center;gap:4px;font-size:12px;font-family:var(--font-body);color:var(--grey-500);cursor:pointer;height:30px;"><input type="checkbox" id="fld-pg-disabled" /> disabled</label>
  </div>
  <div class="code-snippet" style="margin-top:var(--sp-4);">
    <div class="code-snippet__head">
      <span class="code-snippet__label">HTML</span>
      <button class="code-snippet__copy" id="fld-copy-btn">Copy</button>
    </div>
    <pre class="code-snippet__pre"><code id="fld-code"></code></pre>
  </div>
</div>

<div class="matrix" style="margin-top:var(--sp-6);">
  <div class="matrix__head">
    <span class="matrix__title">State matrix</span>
    <span class="matrix__subtitle">Each column shows a type, each row a state</span>
  </div>
  <div class="matrix__scroll">
  <div class="matrix__grid" id="fld-matrix" style="grid-template-columns: 120px repeat(3, 1fr);">
    <div class="matrix__colhead"></div>
    <div class="matrix__colhead">Text</div>
    <div class="matrix__colhead">Dropdown</div>
    <div class="matrix__colhead">Textarea</div>

    <div class="matrix__rowlabel">Inactive</div>
    <div class="matrix__cell"><june-field type="text" label="Label" placeholder="Placeholder" hint="Helper text" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" hint="Helper text" .options='${JSON.stringify([{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" placeholder="Placeholder" hint="Helper text" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Active</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="User input" hint="Helper text" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" value="1" hint="Helper text" .options='${JSON.stringify([{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="User input text" hint="Helper text" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Hover</div>
    <div class="matrix__cell"><june-field type="text" label="Label" placeholder="Placeholder" force-state="hover" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" force-state="hover" .options='${JSON.stringify([{value:"1",label:"Option 1"}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" placeholder="Placeholder" force-state="hover" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Focus</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="User input" force-state="focus" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" value="1" force-state="focus" .options='${JSON.stringify([{value:"1",label:"Option 1"}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="User input" force-state="focus" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Error</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="Invalid" error="This field is required" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" error="Please select an option" .options='${JSON.stringify([{value:"1",label:"Option 1"}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="Too short" error="Minimum 20 characters" rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Disabled</div>
    <div class="matrix__cell"><june-field type="text" label="Label" value="Read only" disabled style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Label" disabled .options='${JSON.stringify([{value:"1",label:"Option 1"}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Label" value="Read only" disabled rows="2" style="width:100%;"></june-field></div>

    <div class="matrix__rowlabel">Required</div>
    <div class="matrix__cell"><june-field type="text" label="Email" required show-required-text placeholder="you@example.com" hint="We'll never share your email" style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="dropdown" label="Country" required show-required-text hint="Select your country" .options='${JSON.stringify([{value:"us",label:"United States"},{value:"uy",label:"Uruguay"}])}' style="width:100%;"></june-field></div>
    <div class="matrix__cell"><june-field type="textarea" label="Message" required show-required-text placeholder="Tell us more..." rows="2" style="width:100%;"></june-field></div>
  </div>
  </div>
</div>

<div style="margin-top:var(--sp-5);">
  <div class="vcard">
    <div class="vcard__head"><span class="vcard__name">Focus ring test</span></div>
    <div class="vcard__body" id="fld-focus-body" style="display:flex;flex-direction:column;gap:16px;padding:24px;">
      <span class="vcard__state">Tab →</span>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
        <june-field type="text" label="First name" placeholder="Jane"></june-field>
        <june-field type="email" label="Email" placeholder="jane@example.com" required show-required-text></june-field>
        <june-field type="dropdown" label="Role" .options='${JSON.stringify([{value:"dev",label:"Developer"},{value:"des",label:"Designer"},{value:"pm",label:"PM"}])}'></june-field>
      </div>
      <june-field type="textarea" label="Comments" placeholder="Any additional comments..." hint="Optional. Max 500 characters." rows="3"></june-field>
    </div>
  </div>
</div>
`,Qr=`
<style>
.vcard[id^="fld-"] { scroll-margin-top: 80px; }
</style>

<div class="vcard" id="fld-api" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">API</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th style="width:15%">Type</th><th style="width:15%">Default</th><th>Description</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">type</code></td><td>string</td><td><code class="tok tok--static">text</code></td><td>text | email | password | number | tel | url | search | textarea | dropdown</td></tr>
    <tr><td><code class="tok tok--static">label</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Label text. Required for a11y</td></tr>
    <tr><td><code class="tok tok--static">value</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Current field value</td></tr>
    <tr><td><code class="tok tok--static">placeholder</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Placeholder text. In dropdown uses <code class="tok tok--static">placeholder-select</code> if empty</td></tr>
    <tr><td><code class="tok tok--static">hint</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Helper text, linked via <code class="tok tok--static">aria-describedby</code></td></tr>
    <tr><td><code class="tok tok--static">error</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Error message. Non-empty activates error state + <code class="tok tok--static">role="alert"</code></td></tr>
    <tr><td><code class="tok tok--static">name</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Field name for forms</td></tr>
    <tr><td><code class="tok tok--static">required</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Required field (<code class="tok tok--static">aria-required</code>)</td></tr>
    <tr><td><code class="tok tok--static">disabled</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Disabled field</td></tr>
    <tr><td><code class="tok tok--static">readonly</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Read only</td></tr>
    <tr><td><code class="tok tok--static">options</code></td><td>{value, label}[]</td><td><code class="tok tok--static">[]</code></td><td>Options for dropdown</td></tr>
    <tr><td><code class="tok tok--static">rows</code></td><td>number</td><td><code class="tok tok--static">4</code></td><td>Visible rows for textarea</td></tr>
    <tr><td><code class="tok tok--static">show-required-text</code></td><td>boolean</td><td><code class="tok tok--static">false</code></td><td>Shows "(required)" text next to the label</td></tr>
    <tr><td><code class="tok tok--static">placeholder-select</code></td><td>string</td><td><code class="tok tok--static">Select one</code></td><td>Placeholder for dropdown when <code class="tok tok--static">placeholder</code> is empty</td></tr>
    <tr><td><code class="tok tok--static">required-text</code></td><td>string</td><td><code class="tok tok--static">(required)</code></td><td>Text shown by <code class="tok tok--static">show-required-text</code>. Customizable for i18n</td></tr>
    <tr><td><code class="tok tok--static">error-text</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>Fallback error text when <code class="tok tok--static">force-state="error"</code> and <code class="tok tok--static">error</code> is empty</td></tr>
    <tr><td><code class="tok tok--static">force-state</code></td><td>string</td><td><code class="tok tok--static">""</code></td><td>hover | focus | error | disabled. Showcase only</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Event</th><th style="width:15%">Trigger</th><th style="width:15%">Bubbles</th><th>Detail</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">jf-input</code></td><td>Each keystroke</td><td>Yes (composed)</td><td><code class="tok tok--static">{ value: string }</code></td></tr>
    <tr><td><code class="tok tok--static">jf-change</code></td><td>Selection changes</td><td>Yes (composed)</td><td><code class="tok tok--static">{ value: string }</code></td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">focusInput()</code></td><td>Moves focus to the internal input/textarea/select. Use for programmatic focus in form validation</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="fld-estructura" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Structure & Motion</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>
    <tr><td>Input height</td><td>44px</td></tr>
    <tr><td>Padding</td><td>8px 12px ${i("--sp-2","--sp-2")} ${i("--sp-3","--sp-3")}</td></tr>
    <tr><td>Border</td><td><strong>2px</strong> solid ${i("--input-border","--input-border")} (a11y override, WCAG 1.4.11)</td></tr>
    <tr><td>Border radius</td><td>6px ${i("--r-sm","--r-sm")}</td></tr>
    <tr><td>Label font</td><td>Medium (500) · 14px/22px · Rubik ${i("--body-s-strong","--body-s-strong")}</td></tr>
    <tr><td>Input font</td><td>Light (300) · 14px/22px · Rubik ${i("--body-s","--body-s")}</td></tr>
    <tr><td>Secondary text</td><td>Light (300) · 12px/20px · Rubik ${i("--body-xs","--body-xs")} — hint, error, required</td></tr>
    <tr><td>Gap (label → input)</td><td>4px ${i("--sp-1","--sp-1")}</td></tr>
    <tr><td>Transition</td><td>120ms ${i("--duration-fast","--duration-fast")} · ${i("--ease","--ease")}</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="fld-colores-estado" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Colors by state</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>State</th><th>Border</th><th>Background</th><th>Text</th><th>Placeholder</th></tr></thead><tbody>
    <tr><td>Inactive</td><td><span class="sw" style="background:#e0e0e0;border:1px solid #ccc"></span>${i("--input-border","--input-border")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${i("--input-bg","--input-bg")}</td><td><span class="sw" style="background:#1a1a1a"></span>${i("--black","--black")}</td><td><span class="sw" style="background:#757575"></span>${i("--grey-400","--grey-400")}</td></tr>
    <tr><td>Hover</td><td><span class="sw" style="background:#757575"></span>${i("--grey-400","--grey-400")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${i("--input-bg","--input-bg")}</td><td><span class="sw" style="background:#1a1a1a"></span>${i("--black","--black")}</td><td>—</td></tr>
    <tr><td>Focus</td><td><span class="sw" style="background:var(--brand,#e02b58)"></span>${i("--brand","--brand")}</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${i("--input-bg","--input-bg")}</td><td><span class="sw" style="background:#1a1a1a"></span>${i("--black","--black")}</td><td>—</td></tr>
    <tr><td>Error</td><td><span class="sw" style="background:#D93025"></span>${i("--error","--error")}</td><td><span class="sw" style="background:#FFF0F0;border:1px solid #e0e0e0"></span>${i("--error-bg","--error-bg")}</td><td><span class="sw" style="background:#1a1a1a"></span>${i("--black","--black")}</td><td>—</td></tr>
    <tr><td>Disabled</td><td>transparent</td><td><span class="sw" style="background:#e5e5e5;border:1px solid #ccc"></span>${i("--input-disabled-bg","--input-disabled-bg")}</td><td><span class="sw" style="background:#757575"></span>${i("--input-disabled-text","--input-disabled-text")}</td><td>—</td></tr>
  </tbody></table>
  <div class="table-note">
    <strong>Focus ring:</strong> border 2px ${i("--brand","--brand")} + <code class="tok tok--static">box-shadow: 0 0 0 1px</code> of the same color. On error, ring uses ${i("--error","--error")}.
  </div>
</div></div>

<div class="vcard" id="fld-colores-marca"><div class="vcard__head"><span class="vcard__name">Colors by brand</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Brand</th><th>Focus border + ring</th><th>Token</th></tr></thead><tbody>
    <tr><td>GeneXus</td><td><span class="sw" style="background:#E02B58"></span>${p("#E02B58")}</td><td>${i("--gx","--gx")}</td></tr>
    <tr><td>Next</td><td><span class="sw" style="background:#5BA7FF"></span>${p("#5BA7FF")}</td><td>${i("--nx","--nx")}</td></tr>
    <tr><td>GEAI</td><td><span class="sw" style="background:#BFD732;border:1px solid #e0e0e0"></span>${p("#BFD732")}</td><td>${i("--ge","--ge")}</td></tr>
  </tbody></table>
</div></div>

`;function ps(a){const t=(a.type==="textarea","june-field"),e=[];return a.type!=="text"&&e.push(`type="${a.type}"`),e.push(`label="${a.label}"`),a.placeholder&&e.push(`placeholder="${a.placeholder}"`),a.hint&&e.push(`hint="${a.hint}"`),a.error&&e.push(`error="${a.error}"`),a.required&&e.push("required show-required-text"),a.disabled&&e.push("disabled"),a.type==="dropdown"&&e.push('.options="${[...]}"'),`<${t}
  ${e.join(`
  `)}
></${t}>`}function Zr(){const a=document.querySelector("#fld-playground > div:first-child");if(!a)return;const t=[{value:"opt1",label:"Option 1"},{value:"opt2",label:"Option 2"},{value:"opt3",label:"Option 3"}],e=document.getElementById("fld-pg-type"),d=document.getElementById("fld-pg-label"),o=document.getElementById("fld-pg-placeholder"),r=document.getElementById("fld-pg-hint"),s=document.getElementById("fld-pg-error"),l=document.getElementById("fld-pg-required"),n=document.getElementById("fld-pg-disabled"),c=document.getElementById("fld-code"),h=document.getElementById("fld-copy-btn"),v={text:{label:"Full name",placeholder:"John Doe",hint:"As it appears on your ID"},email:{label:"Email address",placeholder:"you@example.com",hint:"We'll never share your email"},password:{label:"Password",placeholder:"Enter your password",hint:"At least 8 characters"},number:{label:"Amount",placeholder:"0",hint:""},tel:{label:"Phone number",placeholder:"+1 (555) 000-0000",hint:"Include country code"},url:{label:"Website",placeholder:"https://example.com",hint:""},search:{label:"Search",placeholder:"Search...",hint:""},textarea:{label:"Message",placeholder:"Write your message...",hint:"Max 500 characters"},dropdown:{label:"Choose an option",placeholder:"Select one",hint:""}};e&&e.addEventListener("change",()=>{const I=v[e.value];I&&(d&&(d.value=I.label),o&&(o.value=I.placeholder),r&&(r.value=I.hint),s&&(s.value=""),l&&(l.checked=!1),n&&(n.checked=!1))}),customElements.whenDefined("june-field").then(()=>{const I=document.getElementById("fld-pg-field");I&&(I.options=t)});function m(){return[e==null?void 0:e.value,d==null?void 0:d.value,o==null?void 0:o.value,r==null?void 0:r.value,s==null?void 0:s.value,l==null?void 0:l.checked,n==null?void 0:n.checked].join("|")}let $=m();function j(){const I=(e==null?void 0:e.value)||"text",Pt=(d==null?void 0:d.value)||"Label",z=(o==null?void 0:o.value)||"",tt=(r==null?void 0:r.value)||"",we=(s==null?void 0:s.value)||"",G=(l==null?void 0:l.checked)||!1,Zt=(n==null?void 0:n.checked)||!1,_=document.createElement("june-field");_.id="fld-pg-field",_.style.width="100%",_.style.maxWidth="360px",_.type=I,_.label=Pt,_.placeholder=z,_.hint=tt,_.error=we,_.required=G,_.disabled=Zt,_.showRequiredText=G,I==="dropdown"&&(_.options=t),a.replaceChildren(_),c&&(c.innerHTML=R(ps({type:I,label:Pt,placeholder:z,hint:tt,error:we,required:G,disabled:Zt}))),$=m()}let E=!0;function q(){!E||!document.getElementById("fld-playground")||(m()!==$&&j(),requestAnimationFrame(q))}requestAnimationFrame(q);const K=new MutationObserver(()=>{document.getElementById("fld-playground")||(E=!1,K.disconnect())});K.observe(document.getElementById("page"),{childList:!0}),h&&h.addEventListener("click",()=>{c&&(S(c.textContent||""),C("Copied!"))}),c&&(c.innerHTML=R(ps({type:"email",label:"Email address",placeholder:"you@example.com",hint:"We'll never share your email",error:"",required:!1,disabled:!1})))}function ti(){document.querySelectorAll('june-field[type="dropdown"]').forEach(a=>{const t=a.getAttribute(".options");if(t)try{a.options=JSON.parse(t)}catch{}})}const ei={title:"Field",desc:"Every form input, one component. Accessible by default, validation built in.",tabs:["Preview","Specs"],content:[Xr,Qr],brandAware:!0,init(){ti(),Zr()}};let mt="desktop",ze=!0,Ge=!0,$t="light";const ai='<img src="/hero-logo.png" alt="June" />';function si(a,t){if(mt=a<=639?"mobile":a<=1023?"tablet":"desktop",t){const r=t.closest(".lam-device-bar");r&&r.querySelectorAll(".lam-device").forEach(s=>s.classList.remove("on")),t.classList.add("on")}const e=document.getElementById("scb-viewport");if(e){e.setAttribute("data-bp",mt),mt==="desktop"?(e.style.width="100%",e.style.maxWidth="none",e.style.margin="0"):(e.style.width=a+"px",e.style.maxWidth="100%",e.style.margin="0 auto");const r=document.getElementById("scb-breakout");r&&(r.style.padding=mt==="desktop"&&a>=940?"0":"24px")}const d=mt.charAt(0).toUpperCase()+mt.slice(1),o=document.getElementById("scb-width-label");o&&(o.textContent=d+" · "+a+"px"),ae()}function vs(){return $t==="dark"?" scb--dark":$t==="accent"?" scb--accent":""}function ae(){const a=document.getElementById("scb-preview");a&&a.setAttribute("data-surface",$t==="light"?"light":"dark");let t='<div class="scb'+vs()+`">
`;t+=`  <div class="scb__inner">
`,t+=`    <div class="scb__info">
`,t+=`      <div class="scb__text">
`,t+=`        <h2 class="scb__title">Form title example</h2>
`,Ge&&(t+=`        <p class="scb__body">This is an example body text for the contact box.</p>
`),t+=`      </div>
`,ze&&(t+=`      <div class="scb__avatar">
`,t+="        "+ai+`
`,t+=`        <div class="scb__avatar-ring"></div>
`,t+=`      </div>
`),t+=`    </div>
`,t+=`    <div class="scb__form">
`,t+=`      <june-field label="Name" placeholder="Your name"></june-field>
`,t+=`      <june-field label="Email" type="email" placeholder="you@example.com"></june-field>
`,t+=`      <june-field label="Subject" placeholder="How can we help?"></june-field>
`,t+=`      <june-field label="Message" type="textarea" placeholder="Tell us more..." rows="5"></june-field>
`;const e=$t==="light"?"jb--sec":"jb--ter";t+=`      <div style="padding-top:var(--sp-2);">
`,t+='        <button class="jb '+e+`" style="border-radius:var(--r-full);">Send</button>
`,t+=`      </div>
`,t+=`    </div>
`,t+=`  </div>
`,t+="</div>";const d=document.getElementById("scb-preview");d&&(d.innerHTML=t);let o="";const r="  ",s=$t==="light"?"scb":"scb"+vs();o+='<div class="'+s+`">
`,o+=r+`<div class="scb__inner">
`,o+=r+r+`<div class="scb__info">
`,o+=r+r+r+`<div class="scb__text">
`,o+=r+r+r+r+`<h2 class="scb__title">Title</h2>
`,Ge&&(o+=r+r+r+r+`<p class="scb__body">Body text</p>
`),o+=r+r+r+`</div>
`,ze&&(o+=r+r+r+`<div class="scb__avatar">
`,o+=r+r+r+r+`<img src="avatar.jpg" alt="Contact" />
`,o+=r+r+r+r+`<div class="scb__avatar-ring"></div>
`,o+=r+r+r+`</div>
`),o+=r+r+`</div>
`,o+=r+r+`<div class="scb__form">
`,o+=r+r+r+`<june-field label="Name" placeholder="..."></june-field>
`,o+=r+r+r+`<june-field label="Email" type="email" placeholder="..."></june-field>
`,o+=r+r+r+`<june-field label="Subject" placeholder="..."></june-field>
`,o+=r+r+r+`<june-field label="Message" type="textarea" rows="5"></june-field>
`,o+=r+r+r+'<button class="jb '+e+`">Send</button>
`,o+=r+r+`</div>
`,o+=r+`</div>
`,o+="</div>";const l=document.getElementById("scb-code");l&&(l.innerHTML=R(o))}function oi(){mt="desktop",ze=!0,Ge=!0,$t="light",ae();const a=document.getElementById("scb-width-label");a&&(a.textContent="Desktop · 1440px");const t=document.getElementById("scb-device-bar");t&&t.querySelectorAll(".lam-device").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.dataset.width||"1440",10);t.querySelectorAll(".lam-device").forEach(n=>{n.classList.remove("on"),n.setAttribute("aria-checked","false")}),s.classList.add("on"),s.setAttribute("aria-checked","true"),si(l,s)})});const e=document.getElementById("scb-surface-pills");e&&D(e,s=>{$t=s.dataset.val||"light",ae()}),Object.entries({"scb-show-avatar":s=>{ze=s},"scb-show-body":s=>{Ge=s}}).forEach(([s,l])=>{const n=document.getElementById(s);n&&n.addEventListener("change",()=>{l(n.checked),ae()})});const o=document.getElementById("page");o&&new MutationObserver(()=>ae()).observe(o,{attributes:!0,attributeFilter:["data-brand"]});const r=document.getElementById("scb-copy-btn");r&&r.addEventListener("click",()=>{const s=document.getElementById("scb-code");s&&(S(s.textContent||""),C("Copied!"))})}const di=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="scb-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${vt}
      </button>
    </div>
    <span class="pg-controls__sep"></span>
    <span class="pg-controls__label">Surface</span>
    <div class="btn-pills" id="scb-surface-pills" role="radiogroup" aria-label="Surface">
      <button class="on" data-val="light" role="radio" aria-checked="true">Light</button>
      <button data-val="dark" role="radio" aria-checked="false">Dark</button>
      <button data-val="accent" role="radio" aria-checked="false">Accent</button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="scb-breakout">
    <div class="lam-viewport" id="scb-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="scb-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="scb-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="scb-sticky">
  <span class="pg-controls__label pg-controls__stencil">Smiley Contact Box</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="scb-show-avatar" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Avatar</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="scb-show-body" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Body text</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="scb-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="scb-code"></code></pre>
</div>
`,ri=`
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Smiley Contact Box</span>
├── <span style="color:var(--black);font-weight:500;">Info</span> (flex column)
│   ├── <span style="color:var(--black);font-weight:500;">Text</span>
│   │   ├── Title → h2 (responsive alias: title-2 / title-3 / title-4)
│   │   └── Body → body-l <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   └── <span style="color:var(--black);font-weight:500;">Avatar</span> <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│       ├── Image (130×130, border-radius 50%)
│       └── Ring (3px solid, brand color)
└── <span style="color:var(--black);font-weight:500;">Form</span> (flex column, gap sp-4)
    ├── june-field ×3 (text)
    ├── june-field ×1 (textarea, height 160px)
    └── june-button (primary, brand-aware)
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Properties</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Values</th><th>Effect</th></tr></thead>
      <tbody>
        <tr><td>Surface</td><td>Light, Dark, Accent</td><td>Changes the background and redefines inherited tokens (input bg, borders, text) so fields adapt without internal changes.</td></tr>
        <tr><td>Avatar</td><td>Visible / Hidden</td><td>Shows/hides the avatar with brand ring.</td></tr>
        <tr><td>Body</td><td>Visible / Hidden</td><td>Shows/hides the descriptive text below the title.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Section background</td><td><span class="sw" style="background:#f5f5f5;border:1px solid #e0e0e0"></span>${p("#f5f5f5")} (light) / <span class="sw" style="background:#1a1a1a"></span>${p("#1a1a1a")} (dark) / <span class="sw" style="background:#00473F"></span>${p("#00473F")} (accent) ${i("--grey-50","--grey-50")}</td></tr>
        <tr><td>Section padding (desktop)</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Section padding (tablet)</td><td>80px 64px ${i("--sp-9","--sp-9")} ${i("--sp-8","--sp-8")}</td></tr>
        <tr><td>Section padding (mobile)</td><td>64px 24px ${i("--sp-8","--sp-8")} ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Column gap (desktop)</td><td>64px ${i("--sp-8","--sp-8")}</td></tr>
        <tr><td>Column gap (tablet)</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Column gap (mobile)</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Title</td><td>Graphik ${i("--h2","--h2")} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Text gap</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Text padding-bottom</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Avatar</td><td>130×130px, border-radius 50%</td></tr>
        <tr><td>Avatar ring</td><td>Brand color ring · 3px solid ${i("--gx","--gx")} / ${i("--nx","--nx")} / ${i("--ge","--ge")}</td></tr>
        <tr><td>Form gap</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Fields</td><td>Existing june-field component</td></tr>
        <tr><td>Button</td><td>june-button primary component, brand-aware</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Surface System</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th style="width:28%">Token</th><th>Light <code class="tok tok--static">.scb</code></th><th>Dark <code class="tok tok--static">.scb--dark</code></th><th>Accent <code class="tok tok--static">.scb--accent</code></th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">--_surf</code></td><td>—</td><td><span class="sw" style="background:#1a1a1a"></span>${p("#1a1a1a")}</td><td><span class="sw" style="background:#151F2B"></span>${p("#151F2B")} (GX/NX)<br><span style="display:block;margin-top:6px;"><span class="sw" style="background:#005D56"></span>${p("#005D56")} (GE)</span></td></tr>
        <tr><td>Background</td><td>${i("--grey-50","--grey-50")}</td><td colspan="2"><code class="tok tok--static">--_surf</code></td></tr>
        <tr><td>${i("--black","--black")}</td><td>—</td><td colspan="2"><span class="sw" style="background:#eeeef0;border:1px solid #e0e0e0"></span>${p("#eeeef0")}</td></tr>
        <tr><td>${i("--card","--card")} ${i("--input-bg","--input-bg")}</td><td>—</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 10%)</code></td></tr>
        <tr><td>${i("--card-border","--card-border")} ${i("--input-border","--input-border")}</td><td>—</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 18%)</code></td></tr>
        <tr><td>${i("--grey-400","--grey-400")}</td><td>—</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 40%)</code></td></tr>
        <tr><td>${i("--grey-500","--grey-500")}</td><td>—</td><td colspan="2"><code class="tok tok--static">color-mix(--_surf, white 50%)</code></td></tr>
        <tr><td>${i("--brand","--brand")}</td><td>—</td><td>—</td><td><code class="tok tok--static">--_surf-accent</code></td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Responsive</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th style="width:20%">Breakpoint</th><th style="width:20%">Width</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td>Desktop</td><td>1440px</td><td>2-column flex (info + form), gap ${i("--sp-8","--sp-8")}, title ${i("--h2","--h2")}.</td></tr>
        <tr><td>Tablet</td><td>768px</td><td>2 columns (info fixed 200px + form flex-1), gap ${i("--sp-4","--sp-4")}, title ${i("--title-3","--title-3")}.</td></tr>
        <tr><td>Mobile</td><td>428px</td><td>1 column (column), avatar first (order -1), gap ${i("--sp-6","--sp-6")}, title ${i("--title-3","--title-3")}.</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,ii={title:"Smiley Contact Box",desc:"Put a face on your contact form. Avatar and fields, side by side.",tabs:["Preview","Specs"],content:[di,ri],wide:!0,brandAware:!0,init:()=>{oi()}},li='<span class="jb__i"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>';let yt="desktop",Ne=!0,Ue=!0,ma=!1;function ni(a,t){if(yt=a<=639?"mobile":a<=1023?"tablet":"desktop",t){const r=t.closest(".lam-device-bar");r&&r.querySelectorAll(".lam-device").forEach(s=>s.classList.remove("on")),t.classList.add("on")}const e=document.getElementById("lm-viewport");if(e){e.setAttribute("data-bp",yt),yt==="desktop"?(e.style.width="100%",e.style.maxWidth="none",e.style.margin="0"):(e.style.width=a+"px",e.style.maxWidth="100%",e.style.margin="0 auto");const r=document.getElementById("lm-breakout");r&&(r.style.padding=yt==="desktop"&&a>=940?"0":"24px")}const d=yt.charAt(0).toUpperCase()+yt.slice(1),o=document.getElementById("lm-width-label");o&&(o.textContent=d+" · "+a+"px"),se()}function se(){let t='<div class="lm" data-surface="'+(ma?"dark":"light")+`">
`;t+=`  <div class="lm__text">
`,t+=`    <h2 class="lm__title">Unlock your potential with our platform</h2>
`,Ne&&(t+=`    <div class="lm__body">
`,t+=`      <p>Discover how our tools and resources can help you build better products, faster. Join thousands of teams already transforming their workflow.</p>
`,t+=`    </div>
`),t+=`  </div>
`,t+=`  <div class="lm__cta">
`,t+=`    <button class="jb jb--ter" style="border-radius:var(--r-full);">Get started</button>
`,Ue&&(t+='    <button class="jb jb--out" style="border-radius:var(--r-full);">Learn more '+li+`</button>
`),t+=`  </div>
`,t+="</div>";const e=document.getElementById("lm-preview");e&&(e.innerHTML=t);let d="";const o="  ";d+=`<div class="lm">
`,d+=o+`<div class="lm__text">
`,d+=o+o+`<h2 class="lm__title">Title</h2>
`,Ne&&(d+=o+o+`<div class="lm__body">
`,d+=o+o+o+`<p>Body text paragraph.</p>
`,d+=o+o+`</div>
`),d+=o+`</div>
`,d+=o+`<div class="lm__cta">
`,d+=o+o+`<button class="jb jb--ter">Tertiary</button>
`,Ue&&(d+=o+o+`<button class="jb jb--out">Outline <span class="jb__i"><!-- icon --></span></button>
`),d+=o+`</div>
`,d+="</div>";const r=document.getElementById("lm-code");r&&(r.innerHTML=R(d))}function ci(){yt="desktop",Ne=!0,Ue=!0,ma=!1,se();const a=document.getElementById("lm-width-label");a&&(a.textContent="Desktop · 1440px");const t=document.getElementById("lm-device-bar");t&&t.querySelectorAll(".lam-device").forEach(s=>{s.addEventListener("click",()=>{const l=parseInt(s.dataset.width||"1440",10);t.querySelectorAll(".lam-device").forEach(n=>{n.classList.remove("on"),n.setAttribute("aria-checked","false")}),s.classList.add("on"),s.setAttribute("aria-checked","true"),ni(l,s)})});const e=document.getElementById("lm-show-body");e&&e.addEventListener("change",()=>{Ne=e.checked,se()});const d=document.getElementById("lm-show-second-cta");d&&d.addEventListener("change",()=>{Ue=d.checked,se()});const o=document.getElementById("lm-dark-surface");o&&o.addEventListener("change",()=>{ma=o.checked,se()});const r=document.getElementById("lm-copy-btn");r&&r.addEventListener("click",()=>{const s=document.getElementById("lm-code");s&&(S(s.textContent||""),C("Copied!"))})}const pi=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="lm-device-bar" role="radiogroup" aria-label="Device size">
      <button class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button class="lam-device" data-width="375" role="radio" aria-checked="false" aria-label="Mobile 375px" title="Mobile 375px">
        ${vt}
      </button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="lm-breakout">
    <div class="lam-viewport" id="lm-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="lm-preview" data-surface="light"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="lm-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="lm-sticky">
  <span class="pg-controls__label pg-controls__stencil">Learn More</span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lm-show-body" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Body</label>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="lm-show-second-cta" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Second CTA</label>

</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button class="code-snippet__copy" id="lm-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="lm-code"></code></pre>
</div>
`,vi=`
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Learn More</span>
├── <span style="color:var(--black);font-weight:500;">Text</span> (flex column)
│   ├── Title → h2 (responsive alias: title-2 / title-3 / title-4)
│   └── Body → body-m (paragraphs) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
└── <span style="color:var(--black);font-weight:500;">CTA</span> (flex row, desktop/tablet → column on mobile)
    ├── Secondary button (june-button, pill)
    └── Tertiary button (june-button, pill) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Background</td><td><span class="sw" style="background:#F5F5F5;border:1px solid #e0e0e0"></span>${p("#F5F5F5")} ${i("--grey-50","--grey-50")}</td></tr>
        <tr><td>Dark surface bg</td><td><span class="sw" style="background:#1A1A1A"></span>${p("#1A1A1A")} ${i("--grey-900","--grey-900")}</td></tr>
        <tr><td>Section padding (desktop)</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Section padding (tablet)</td><td>80px 64px ${i("--sp-9","--sp-9")} ${i("--sp-8","--sp-8")}</td></tr>
        <tr><td>Section padding (mobile)</td><td>64px 24px ${i("--sp-8","--sp-8")} ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Gap text ↔ CTA (desktop)</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Gap text ↔ CTA (tablet/mobile)</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Title</td><td>Graphik ${i("--h2","--h2")} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Title color</td><td><span class="sw" style="background:#111111"></span>${p("#111111")} ${i("--black","--black")}</td></tr>
        <tr><td>Body</td><td>Light (300) · 17px/26px · Rubik ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Body color</td><td><span class="sw" style="background:#757575"></span>${p("#757575")} ${i("--text","--text")}</td></tr>
        <tr><td>Title ↔ body gap (desktop)</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Title ↔ body gap (mobile)</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Button gap (desktop)</td><td>24px ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Button gap (tablet/mobile)</td><td>24px ${i("--sp-5","--sp-5")}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Responsive</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th style="width:20%">Breakpoint</th><th style="width:20%">Width</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td>Desktop</td><td>1440px</td><td>Flex row: text left, CTAs right. Gap ${i("--sp-10","--sp-10")}. Title ${i("--title-2","--title-2")}.</td></tr>
        <tr><td>Tablet</td><td>768px</td><td>Flex column. Padding ${i("--sp-9","--sp-9")} ${i("--sp-8","--sp-8")}. Gap ${i("--sp-6","--sp-6")}. Buttons in row.</td></tr>
        <tr><td>Mobile</td><td>375px</td><td>Flex column. Padding ${i("--sp-8","--sp-8")} ${i("--sp-5","--sp-5")}. Title ${i("--title-3","--title-3")}. Buttons stacked.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Motion</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Interaction</th><th>Property</th><th>Value</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td>Text entrance</td><td><code class="tok tok--static">opacity</code>, <code class="tok tok--static">transform</code></td><td>fade-in + translateY(8px)</td><td>${i("--duration","--duration")} · ${i("--ease","--ease")}</td></tr>
        <tr><td>CTA entrance</td><td><code class="tok tok--static">opacity</code>, <code class="tok tok--static">transform</code></td><td>fade-in + translateY(8px), 80ms delay</td><td>${i("--duration","--duration")} · ${i("--ease","--ease")}</td></tr>
        <tr><td>reduced-motion</td><td colspan="3">All animations disabled.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard">
  <div class="vcard__head"><span class="vcard__name">Accessibility</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Feature</th><th>Implementation</th><th>Standard</th></tr></thead>
      <tbody>
        <tr><td>Semantic heading</td><td><code class="tok tok--static">&lt;h2&gt;</code> for section title</td><td>WCAG 1.3.1</td></tr>
        <tr><td>Reduced motion</td><td>Entrance animations disabled via <code class="tok tok--static">prefers-reduced-motion</code></td><td>WCAG 2.3.3</td></tr>
        <tr><td>Color contrast</td><td>Title: black on grey-50 (18.1:1). Body: text on grey-50 (5.8:1 AA).</td><td>WCAG 1.4.3</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,hi={title:"Learn More",desc:"Title, context, CTA — the section that nudges the next step.",tabs:["Preview","Specs"],content:[pi,vi],wide:!0,brandAware:!0,init:ci},bi='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12.5l9-9M5.5 3.5h7v7"/></svg>',ui='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',gi='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',Us="/lam-sample.png",mi='<img src="'+Us+'" alt="Company logo" />';let O="news",Ht="desktop",Kt=!0,nt=!0,Bt=!0,At=4,T=0,ot=!1,bt=null;function hs(a,t,e,d,o){const r="cr-tag-"+a,s="cr-title-"+a;let l='<li><article class="cr__card" aria-labelledby="'+s+'">';if(nt){const n=["center 30%","center 50%","center 70%","center 20%","center 60%","center 40%"];l+='<div class="cr__card-img"><img src="'+Us+'" alt="" style="object-position:'+n[a%n.length]+'" /></div>'}return l+='<div class="cr__card-content">',Bt&&(l+='<span class="cr__card-tag" id="'+r+'">'+t+"</span>"),l+='<h4 class="cr__card-title" id="'+s+'">'+e+"</h4>",l+='<p class="cr__card-body">'+d+"</p>",l+='<a class="cr__card-link" href="#"'+(Bt?' aria-describedby="'+r+'"':"")+">"+o+" "+bi+"</a>",l+="</div>",l+="</article></li>",l}function yi(a,t,e,d,o){const r="cr-qname-"+a;let s='<li><article class="cr__card cr__card--quote" aria-labelledby="'+r+'">';return s+='<div class="cr__card-content">',s+='<div class="cr__card-meta">',s+='<div class="cr__card-name" id="'+r+'">'+t+"</div>",s+='<div class="cr__card-role">'+e+"</div>",s+="</div>",s+='<blockquote class="cr__card-body">'+d+"</blockquote>",o&&nt&&(s+='<div class="cr__card-logo">'+mi+"</div>"),s+="</div>",s+="</article></li>",s}function bs(){let a='<li><article class="cr__card cr__card--skeleton" aria-hidden="true">';return nt&&(a+='<div class="cr__skel cr__skel--img"></div>'),a+='<div class="cr__card-content">',Bt&&(a+='<div class="cr__skel cr__skel--tag"></div>'),a+='<div class="cr__skel cr__skel--title"></div>',a+='<div class="cr__skel cr__skel--body"></div>',a+='<div class="cr__skel cr__skel--body"></div>',a+='<div class="cr__skel cr__skel--short"></div>',a+='<div class="cr__skel cr__skel--link"></div>',a+="</div>",a+="</article></li>",a}function _i(){let a='<li><article class="cr__card cr__card--quote cr__card--skeleton" aria-hidden="true">';return a+='<div class="cr__card-content">',a+='<div class="cr__card-meta">',a+='<div class="cr__skel cr__skel--title" style="width:50%"></div>',a+='<div class="cr__skel cr__skel--tag"></div>',a+="</div>",a+='<div class="cr__skel cr__skel--body"></div>',a+='<div class="cr__skel cr__skel--body"></div>',a+='<div class="cr__skel cr__skel--short"></div>',a+="</div>",nt&&(a+='<div class="cr__card-logo"><div class="cr__skel" style="width:120px;height:36px;border-radius:var(--r-xs)"></div></div>'),a+="</article></li>",a}function da(){let a='<div class="cr__nav">';a+='<button type="button" class="cr__prev" aria-label="Previous">'+ui+"</button>",a+='<div class="cr__dots" role="group" aria-label="Carousel navigation">';for(let t=0;t<At;t++){const e=t===0;a+='<button type="button" class="cr__dot'+(e?" cr__dot--on":"")+'" data-idx="'+t+'" aria-label="Go to card '+(t+1)+'"'+(e?' aria-current="true"':"")+"></button>"}return a+="</div>",a+='<button type="button" class="cr__next" aria-label="Next">'+gi+"</button>",a+="</div>",a}function ra(){return'<p class="cr__live" aria-live="polite" aria-atomic="true"></p>'}const Se=[{tag:"Product",title:"AI-Powered Insights",body:"Transform raw data into actionable intelligence with our advanced AI models and real-time analytics. Build intelligent applications that understand context.",link:"Read more"},{tag:"Engineering",title:"Scalable Infrastructure",body:"Build on a foundation designed for enterprise-grade performance, from prototype to production. Our architecture scales seamlessly with your needs.",link:"Learn more"},{tag:"Research",title:"Next-Gen Models",body:"Pushing the boundaries of what’s possible with foundation models trained on diverse, curated datasets. State-of-the-art performance across benchmarks.",link:"Explore"},{tag:"Design",title:"Adaptive Interfaces",body:"Craft experiences that adapt to user behavior with intelligent layout systems and context-aware components. Ship beautiful products faster.",link:"See details"},{tag:"Security",title:"Enterprise-Grade Safety",body:"Built-in guardrails and advanced monitoring ensure your AI deployments meet the highest standards of safety and compliance.",link:"Read more"},{tag:"Platform",title:"Developer Experience",body:"From APIs to SDKs, everything is designed to reduce friction and help your team move from idea to production in record time.",link:"Discover"}],us=[{name:"Sarah Chen",role:"CTO, Acme Corp",quote:"“The platform transformed how our engineering team ships features. We’ve cut our development cycle in half and our code quality has never been higher.”",logo:!0},{name:"Marcus Johnson",role:"VP Engineering, Scale AI",quote:"“Integration was seamless. The AI-powered tools understand our codebase and suggest meaningful improvements that our team actually wants to adopt.”",logo:!0},{name:"Elena Rodriguez",role:"Head of Product, Stripe",quote:"“The developer experience is unmatched. Our team adopted it within a week and hasn’t looked back. It fundamentally changed our workflow.”",logo:!0},{name:"David Park",role:"Lead Architect, Notion",quote:"“We replaced three internal tools with a single integration. The ROI was clear within the first month of deployment.”",logo:!0},{name:"Aisha Patel",role:"Director of Engineering, Figma",quote:"“The quality of code suggestions is remarkable. It understands our patterns and proposes changes that align with our architecture.”",logo:!0},{name:"James Wright",role:"CTO, Linear",quote:"“Our team’s velocity increased by 40% after adoption. The tooling just gets out of your way and lets you focus on building.”",logo:!0}];function gs(a,t){if(Ht=a<=639?"mobile":a<=1023?"tablet":"desktop",t){const r=t.closest(".lam-device-bar");r&&r.querySelectorAll(".lam-device").forEach(s=>s.classList.remove("on")),t.classList.add("on")}const e=document.getElementById("cr-viewport");if(e){e.setAttribute("data-bp",Ht),Ht==="desktop"?(e.style.width="100%",e.style.maxWidth="none",e.style.margin="0"):(e.style.width=a+"px",e.style.maxWidth="100%",e.style.margin="0 auto");const r=document.getElementById("cr-breakout");r&&(r.style.padding="0")}const d=Ht.charAt(0).toUpperCase()+Ht.slice(1),o=document.getElementById("cr-width-label");o&&(o.textContent=d+" · "+a+"px"),at()}function U(a){var K;const t=document.getElementById("cr-preview");if(!t)return;const e=t.querySelector(".cr__track"),d=t.querySelector(".cr__row");if(!e||!d)return;const o=e.querySelectorAll(".cr__card");if(o.length<2)return;const r=o[1].offsetLeft-o[0].offsetLeft,s=o[0].offsetWidth,l=r-s,n=o.length*s+(o.length-1)*l,c=getComputedStyle(d),h=d.clientWidth-parseFloat(c.paddingLeft)-parseFloat(c.paddingRight),v=Math.max(0,n-h),m=v>0?Math.ceil(v/r):0;T=Math.max(0,Math.min(a,m));const $=Math.min(T*r,v);e.style.transform="translateX(-"+$+"px)";const j=t.querySelector(".cr__prev"),E=t.querySelector(".cr__next");j&&(j.style.opacity=T>0?"1":"0",j.style.pointerEvents=T>0?"auto":"none"),E&&(E.style.opacity=T<m?"1":"0",E.style.pointerEvents=T<m?"auto":"none"),t.querySelectorAll(".cr__dot").forEach((I,Pt)=>{const z=Pt===T;I.classList.toggle("cr__dot--on",z),z?I.setAttribute("aria-current","true"):I.removeAttribute("aria-current")}),d&&(T>=m?d.setAttribute("data-at-end",""):d.removeAttribute("data-at-end"));const q=(K=t.closest(".cr"))==null?void 0:K.querySelector(".cr__live");q&&(q.textContent="Card "+(T+1)+" of "+At)}function fi(){T=0;const a=document.getElementById("cr-preview");if(!a)return;const t=a.querySelector(".cr__prev"),e=a.querySelector(".cr__next");t&&t.addEventListener("click",()=>U(T-1)),e&&e.addEventListener("click",()=>U(T+1)),a.querySelectorAll(".cr__dot").forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.dataset.idx||"0",10);U(r)})});const d=a.querySelector(".cr__row");if(d){d.addEventListener("keydown",l=>{l.key==="ArrowLeft"?(l.preventDefault(),U(T-1)):l.key==="ArrowRight"?(l.preventDefault(),U(T+1)):l.key==="Home"?(l.preventDefault(),U(0)):l.key==="End"&&(l.preventDefault(),U(At-1))});let o=0,r=0,s=!1;d.addEventListener("touchstart",l=>{o=l.touches[0].clientX,r=l.touches[0].clientY,s=!1},{passive:!0}),d.addEventListener("touchmove",l=>{const n=l.touches[0].clientX-o,c=l.touches[0].clientY-r;!s&&Math.abs(n)>Math.abs(c)&&Math.abs(n)>10&&(s=!0),s&&l.preventDefault()},{passive:!1}),d.addEventListener("touchend",l=>{if(!s)return;const n=l.changedTouches[0].clientX-o,c=50;n<-c?U(T+1):n>c&&U(T-1)},{passive:!0})}U(0)}function ki(){const a=document.getElementById("cr-preview");if(!a)return;const e=`
    <div class="cr" data-surface="light">
      <div class="cr__empty">
        <svg class="cr__empty-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="24" cy="24" r="20"/>
    <path d="M24 16v12M24 32h.01"/>
  </svg>
        <p class="cr__empty-text">Failed to load cards</p>
        <button type="button" class="jb jb--ter" onclick="window.crRetry()">Retry</button>
      </div>
    </div>
  `;a.innerHTML=e}function xi(){ot=!0,at()}window.crRetry=xi;function at(){const a=document.getElementById("cr-preview");if(!a)return;let t="";if(O==="news"){t+='<div class="cr" data-surface="light">',Kt&&(t+='<div class="cr__header">',t+='<div class="cr__kicker">News</div>',t+='<h3 class="cr__title">Latest updates</h3>',t+='<p class="cr__desc">Stay informed with the latest developments across our platform and research.</p>',t+="</div>"),t+='<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="Latest updates" tabindex="0">',t+='<ul class="cr__track">';for(let e=0;e<At;e++)if(ot)t+=bs();else{const d=Se[e%Se.length];t+=hs(e,d.tag,d.title,d.body,d.link)}t+="</ul>",t+="</div>",t+=da(),t+=ra(),t+="</div>"}else if(O==="quotes"){t+='<div class="cr cr--quotes" data-surface="light">',Kt&&(t+='<div class="cr__header">',t+='<div class="cr__kicker">Testimonials</div>',t+='<h3 class="cr__title">What people are saying</h3>',t+='<p class="cr__desc">Hear from the teams building with our platform every day.</p>',t+="</div>"),t+='<div class="cr__carousel">',t+='<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="Testimonials" tabindex="0">',t+='<ul class="cr__track">';for(let e=0;e<At;e++)if(ot)t+=_i();else{const d=us[e%us.length];t+=yi(e,d.name,d.role,d.quote,d.logo)}t+="</ul>",t+="</div>",t+=da(),t+="</div>",t+=ra(),t+="</div>"}else if(O==="split"){t+='<div class="cr cr--split" data-surface="light">',t+='<div class="cr__resume">',t+='<div class="cr__resume-kicker">Featured</div>',t+='<h3 class="cr__resume-title">Build the future of AI</h3>',t+='<p class="cr__resume-body">Our platform provides everything you need to create, deploy, and scale intelligent applications that transform your business.</p>',t+='<div class="cr__resume-actions">',t+='<button type="button" class="jb jb--sec">Get started</button>',t+='<button type="button" class="jb jb--ter">Learn more</button>',t+="</div>",t+="</div>",t+='<div class="cr__carousel">',t+='<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="Featured articles" tabindex="0">',t+='<ul class="cr__track">';for(let e=0;e<At;e++)if(ot)t+=bs();else{const d=Se[e%Se.length];t+=hs(e,d.tag,d.title,d.body,d.link)}t+="</ul>",t+="</div>",t+=da(),t+="</div>",t+=ra(),t+="</div>"}a.innerHTML=t,fi(),wi(),ot?(bt!==null&&clearTimeout(bt),bt=window.setTimeout(()=>{ot=!1,ki(),bt=null},1e4)):bt!==null&&(clearTimeout(bt),bt=null)}function wi(){const a=document.getElementById("cr-code");if(!a)return;const t="  ";let e="";e+='<div class="cr'+(O==="quotes"?" cr--quotes":O==="split"?" cr--split":"")+`">
`;function o(s){let l="";return l+=s+`<div class="cr__nav">
`,l+=s+t+`<button type="button" class="cr__prev" aria-label="Previous"><!-- chevron --></button>
`,l+=s+t+`<div class="cr__dots" role="group" aria-label="Carousel navigation">
`,l+=s+t+t+`<button type="button" class="cr__dot cr__dot--on" aria-label="Go to card 1" aria-current="true"></button>
`,l+=s+t+`</div>
`,l+=s+t+`<button type="button" class="cr__next" aria-label="Next"><!-- chevron --></button>
`,l+=s+`</div>
`,l}function r(s){let l="";return l+=s+`<div class="cr__row" role="region" aria-roledescription="carousel" aria-label="..." tabindex="0">
`,l+=s+t+`<ul class="cr__track">
`,O==="quotes"?(l+=s+t+t+`<li>
`,l+=s+t+t+t+`<article class="cr__card cr__card--quote" aria-labelledby="name-id">
`,l+=s+t+t+t+t+`<div class="cr__card-content">
`,l+=s+t+t+t+t+t+`<div class="cr__card-meta">
`,l+=s+t+t+t+t+t+t+`<div class="cr__card-name" id="name-id">Name</div>
`,l+=s+t+t+t+t+t+t+`<div class="cr__card-role">Role</div>
`,l+=s+t+t+t+t+t+`</div>
`,l+=s+t+t+t+t+t+`<blockquote class="cr__card-body">“Quote text”</blockquote>
`,l+=s+t+t+t+t+`</div>
`,nt&&(l+=s+t+t+t+t+`<div class="cr__card-logo"><img src="..." alt="..." /></div>
`),l+=s+t+t+t+`</article>
`,l+=s+t+t+`</li>
`,l+=s+t+t+`<!-- repeat for each quote -->
`):(l+=s+t+t+`<li>
`,l+=s+t+t+t+`<article class="cr__card" aria-labelledby="title-id">
`,nt&&(l+=s+t+t+t+t+`<div class="cr__card-img"><img src="..." alt="" /></div>
`),l+=s+t+t+t+t+`<div class="cr__card-content">
`,Bt&&(l+=s+t+t+t+t+t+`<span class="cr__card-tag" id="tag-id">Tag</span>
`),l+=s+t+t+t+t+t+`<h4 class="cr__card-title" id="title-id">Card title</h4>
`,l+=s+t+t+t+t+t+`<p class="cr__card-body">Card body text</p>
`,l+=s+t+t+t+t+t+'<a class="cr__card-link" href="#"'+(Bt?' aria-describedby="tag-id"':"")+`>Link</a>
`,l+=s+t+t+t+t+`</div>
`,l+=s+t+t+t+`</article>
`,l+=s+t+t+`</li>
`,l+=s+t+t+`<!-- repeat for each card -->
`),l+=s+t+`</ul>
`,l+=s+`</div>
`,l}O==="news"?(Kt&&(e+=t+`<div class="cr__header">
`,e+=t+t+`<div class="cr__kicker">News</div>
`,e+=t+t+`<h3 class="cr__title">Title</h3>
`,e+=t+t+`<p class="cr__desc">Description</p>
`,e+=t+`</div>
`),e+=r(t),e+=o(t)):O==="split"?(e+=t+`<div class="cr__resume">
`,e+=t+t+`<div class="cr__resume-kicker">Kicker</div>
`,e+=t+t+`<h3 class="cr__resume-title">Title</h3>
`,e+=t+t+`<p class="cr__resume-body">Body text</p>
`,e+=t+t+`<div class="cr__resume-actions">
`,e+=t+t+t+`<button type="button" class="jb jb--sec">Secondary</button>
`,e+=t+t+t+`<button type="button" class="jb jb--ter">Tertiary</button>
`,e+=t+t+`</div>
`,e+=t+`</div>
`,e+=t+`<div class="cr__carousel">
`,e+=r(t+t),e+=o(t+t),e+=t+`</div>
`):(Kt&&(e+=t+`<div class="cr__header">
`,e+=t+t+`<div class="cr__kicker">Testimonials</div>
`,e+=t+t+`<h3 class="cr__title">Title</h3>
`,e+=t+t+`<p class="cr__desc">Description</p>
`,e+=t+`</div>
`),e+=t+`<div class="cr__carousel">
`,e+=r(t+t),e+=o(t+t),e+=t+`</div>
`),e+=t+`<p class="cr__live" aria-live="polite" aria-atomic="true"></p>
`,e+="</div>",a.innerHTML=R(e)}function $i(){O="news",Ht="desktop",Kt=!0,nt=!0,Bt=!0,At=4,T=0,ot=!1,gs(1440,document.querySelector("#cr-breakout .lam-device")),at();const a=document.getElementById("cr-device-bar");a&&a.querySelectorAll(".lam-device").forEach(l=>{l.addEventListener("click",()=>{const n=parseInt(l.dataset.width||"1440",10);a.querySelectorAll(".lam-device").forEach(c=>{c.classList.remove("on"),c.setAttribute("aria-checked","false")}),l.classList.add("on"),l.setAttribute("aria-checked","true"),gs(n,l)})});const t=document.getElementById("cr-layout-pills");t&&D(t,l=>{O=l.dataset.val||"news";const n=document.getElementById("cr-desc-group");n&&(n.style.display=O==="split"?"none":"");const c=document.getElementById("cr-img-label");c&&(c.textContent=O==="quotes"?"Logo":"Image");const h=document.getElementById("cr-tag-group");h&&(h.style.display=O==="quotes"?"none":""),at()});const e=document.getElementById("cr-show-desc");e&&e.addEventListener("change",()=>{Kt=e.checked,at()});const d=document.getElementById("cr-show-img");d&&d.addEventListener("change",()=>{nt=d.checked,at()});const o=document.getElementById("cr-show-tag");o&&o.addEventListener("change",()=>{Bt=o.checked,at()});const r=document.getElementById("cr-show-skeleton");r&&r.addEventListener("change",()=>{ot=r.checked,at()});const s=document.getElementById("cr-copy-btn");s&&s.addEventListener("click",()=>{const l=document.getElementById("cr-code");l&&(S(l.textContent||""),C("Copied!"))})}const Ai=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="cr-device-bar" role="radiogroup" aria-label="Device size">
      <button type="button" class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button type="button" class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button type="button" class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${vt}
      </button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="cr-breakout" style="padding:0;">
    <div class="lam-viewport" id="cr-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="cr-preview" data-surface="light" style="overflow:visible"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="cr-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="cr-sticky">
  <span class="pg-controls__label pg-controls__stencil">Card Row</span>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Variant</span>
  <div class="btn-pills" id="cr-layout-pills" role="radiogroup" aria-label="Layout variant">
    <button type="button" class="on" data-val="news" role="radio" aria-checked="true">News</button>
    <button type="button" data-val="quotes" role="radio" aria-checked="false">Quotes</button>
    <button type="button" data-val="split" role="radio" aria-checked="false">Split News</button>
  </div>
  <span id="cr-desc-group" style="display:contents;">
    <span class="pg-controls__sep"></span>
    <label class="eb-toggle"><input type="checkbox" checked id="cr-show-desc" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Description</label>
  </span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" checked id="cr-show-img" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span><span id="cr-img-label">Image</span></label>
  <span id="cr-tag-group" style="display:contents;">
    <span class="pg-controls__sep"></span>
    <label class="eb-toggle"><input type="checkbox" checked id="cr-show-tag" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Tag</label>
  </span>
  <span class="pg-controls__sep"></span>
  <label class="eb-toggle"><input type="checkbox" id="cr-show-skeleton" /><span class="eb-toggle__track"><span class="eb-toggle__thumb"></span></span>Skeleton</label>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button type="button" class="code-snippet__copy" id="cr-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="cr-code"></code></pre>
</div>
`,Si=`
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Card Row</span>
├── <span style="color:var(--black);font-weight:500;">Header</span> <span style="color:var(--grey-500);font-style:italic;">(News / Quotes)</span>
│   ├── Title → h2 (responsive alias)
│   └── Description → highlight-s <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
├── <span style="color:var(--black);font-weight:500;">Resume</span> <span style="color:var(--grey-500);font-style:italic;">(Split News only)</span>
│   ├── Kicker → highlight-s
│   ├── Title → h2 (responsive alias)
│   ├── Body → body-l
│   └── Actions (secondary pill + tertiary)
├── <span style="color:var(--black);font-weight:500;">Carousel</span> <span style="color:var(--grey-500);font-style:italic;">(Quotes / Split: row + nav column)</span>
│   ├── <span style="color:var(--black);font-weight:500;">Row</span> (overflow: clip — carousel)
│   └── <span style="color:var(--black);font-weight:500;">Nav</span> (prev + dots + next, centered)
├── <span style="color:var(--black);font-weight:500;">Row</span> (overflow: clip — carousel) <span style="color:var(--grey-500);font-style:italic;">(News: direct child)</span>
│   ├── <span style="color:var(--black);font-weight:500;">Info Card</span> (512×760 desktop, white bg, r-md)
│   │   ├── Image (272px, r-md top) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │   └── Content (flex-col, gap sp-4)
│   │       ├── Tag (pill, grey-300 bg, r-xs) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
│   │       ├── Title → title-4 / title-5 (tablet/mobile)
│   │       ├── Body → body-l (flex: 1, overflow hidden)
│   │       └── Link (underlined, body-l)
│   └── <span style="color:var(--black);font-weight:500;">Quote Card</span> (512×760 desktop, grey-50 bg, r-md)
│       ├── Content (flex-col, gap sp-6)
│       │   ├── Meta (name + role)
│       │   └── Quote text (flex: 1, overflow hidden)
│       └── Logo (80px max-height) <span style="color:var(--grey-500);font-style:italic;">(optional)</span>
├── <span style="color:var(--black);font-weight:500;">Nav</span> (centered below cards) <span style="color:var(--grey-500);font-style:italic;">(News: direct child)</span>
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Props / Classes</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Class</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">.cr</code></td><td><code class="tok tok--static">class</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Base section class. Always required.</td></tr>
        <tr><td><code class="tok tok--static">.cr--quotes</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Quotes layout: header left (380px), quote cards right.</td></tr>
        <tr><td><code class="tok tok--static">.cr--split</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Split News: resume left (440px), info cards right.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">512×760</td><td>Info card. Fixed dimensions, white bg.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card--quote</code></td><td><code class="tok tok--static">modifier</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Quote card variant. Grey-50 bg, name+role+quote.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card-img</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">272px</td><td>Card image area (top, rounded corners). Optional.</td></tr>
        <tr><td><code class="tok tok--static">.cr__card-content</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Card content wrapper. Flex-col, fills remaining height.</td></tr>
        <tr><td><code class="tok tok--static">.cr__nav</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Navigation group: prev + dots + next, centered below cards.</td></tr>
        <tr><td><code class="tok tok--static">.cr__carousel</code></td><td><code class="tok tok--static">child</code></td><td style="font-family:var(--font-mono);font-size:11px;color:var(--grey-500)">—</td><td>Quotes/Split: wraps row + nav in a column. Takes flex:1.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Tokens & Spacing</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Section padding</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Section background</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")} ${i("--card","--card")}</td></tr>
        <tr><td>Info card bg</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")} ${i("--card","--card")}</td></tr>
        <tr><td>Info card size (desktop)</td><td>512 × 760 px</td></tr>
        <tr><td>Info card size (tablet/mobile)</td><td>327 × 464 px</td></tr>
        <tr><td>Card image height</td><td>272px (desktop)</td></tr>
        <tr><td>Quote card bg</td><td><span class="sw" style="background:#F5F5F5;border:1px solid #e0e0e0"></span>${p("#F5F5F5")} ${i("--grey-100","--grey-100")}</td></tr>
        <tr><td>Card border-radius</td><td>8px ${i("--r-md","--r-md")}</td></tr>
        <tr><td>Tag bg</td><td><span class="sw" style="background:#D9D9D9"></span>${p("#D9D9D9")} ${i("--grey-300","--grey-300")}</td></tr>
        <tr><td>Tag border-radius</td><td>4px ${i("--r-xs","--r-xs")}</td></tr>
        <tr><td>Content padding (desktop)</td><td>48px top, 32px sides/bottom ${i("--sp-7","--sp-7")} / ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Content padding (tablet/mob)</td><td>32px vert, 24px horiz ${i("--sp-6","--sp-6")} / ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Quote padding (desktop)</td><td>32px all sides ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Section title</td><td>Graphik ${i("--h2","--h2")}</td></tr>
        <tr><td>Description</td><td>Light (300) · 17px/26px · Graphik ${i("--highlight-s","--highlight-s")}</td></tr>
        <tr><td>Card title (desktop)</td><td>Semibold (600) · 20px/30px · Graphik ${i("--title-4","--title-4")}</td></tr>
        <tr><td>Card title (tablet/mobile)</td><td>Semibold (600) · 17px/26px · Graphik ${i("--title-5","--title-5")}</td></tr>
        <tr><td>Card body</td><td>Light (300) · 17px/26px · Rubik ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Card link</td><td>Light (300) · 17px/26px · Rubik, underlined ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Quote name</td><td>Light (300) · 20px/30px · Graphik ${i("--highlight-m","--highlight-m")}</td></tr>
        <tr><td>Quote role</td><td>Light (300) · 12px/20px · Rubik ${i("--body-xs","--body-xs")}</td></tr>
        <tr><td>Row gap</td><td>24px / 16px ${i("--sp-5","--sp-5")} / ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Section gap</td><td>64px → 48px → 32px ${i("--sp-8","--sp-8")} / ${i("--sp-7","--sp-7")} / ${i("--sp-6","--sp-6")}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Breakpoints</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Breakpoint</th><th style="width:20%">Cards</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">&gt; 1024px</code></td><td>512 × 760 px</td><td>Full layout. Quotes/Split side-by-side. Row overflows (carousel).</td></tr>
        <tr><td><code class="tok tok--static">≤ 1023px</code></td><td>327 × 464 px</td><td>Quotes/Split stack vertically. Title: ${i("--title-2","--title-2")}. Body: ${i("--body-m","--body-m")}.</td></tr>
        <tr><td><code class="tok tok--static">≤ 639px</code></td><td>327 × 464 px</td><td>Row gap: ${i("--sp-4","--sp-4")}. Padding: ${i("--sp-5","--sp-5")}.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Motion</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Interaction</th><th>Property</th><th>Value</th><th>Token</th></tr></thead>
      <tbody>
        <tr><td>Card hover</td><td><code class="tok tok--static">transform</code></td><td>translateY(-2px)</td><td>${i("--duration-fast","--duration-fast")} · ${i("--ease","--ease")}</td></tr>
        <tr><td>Card hover</td><td><code class="tok tok--static">box-shadow</code></td><td><code class="tok tok--static">0 4px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)</code></td><td>${i("--shadow-md","--shadow-md")}</td></tr>
        <tr><td>Link hover</td><td><code class="tok tok--static">color</code></td><td>${i("--brand","--brand")}</td><td>${i("--duration-fast","--duration-fast")} · ${i("--ease","--ease")}</td></tr>
        <tr><td>reduced-motion</td><td colspan="3">transform and transition disabled.</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-5);">
  <div class="vcard__head"><span class="vcard__name">Accessibility</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Feature</th><th>Implementation</th><th>Standard</th></tr></thead>
      <tbody>
        <tr><td>Carousel region</td><td><code class="tok tok--static">role="region"</code> + <code class="tok tok--static">aria-roledescription="carousel"</code> + <code class="tok tok--static">aria-label</code></td><td>WAI-ARIA APG</td></tr>
        <tr><td>Semantic cards</td><td><code class="tok tok--static">&lt;ul&gt;</code> &rarr; <code class="tok tok--static">&lt;li&gt;</code> &rarr; <code class="tok tok--static">&lt;article&gt;</code> with <code class="tok tok--static">aria-labelledby</code></td><td>Inclusive Components</td></tr>
        <tr><td>Full-card click</td><td>Pseudo-element <code class="tok tok--static">::after</code> on link (no nested interactives)</td><td>Adrian Roselli / Piccalilli</td></tr>
        <tr><td>Keyboard nav</td><td>Arrow Left/Right, Home/End on carousel region</td><td>WAI-ARIA APG</td></tr>
        <tr><td>Touch/swipe</td><td>Horizontal swipe with 50px threshold, direction lock</td><td>WCAG 2.5.1</td></tr>
        <tr><td>Live region</td><td><code class="tok tok--static">aria-live="polite"</code> announces "Card X of Y"</td><td>WCAG 4.1.3</td></tr>
        <tr><td>Dot navigation</td><td><code class="tok tok--static">aria-current="true"</code> on active dot, <code class="tok tok--static">aria-label</code> per dot</td><td>WAI-ARIA</td></tr>
        <tr><td>Focus indicators</td><td><code class="tok tok--static">focus-visible</code> on all interactive elements, <code class="tok tok--static">focus-within</code> on cards</td><td>WCAG 2.4.7 / 2.4.11</td></tr>
        <tr><td>High contrast</td><td><code class="tok tok--static">@media (forced-colors)</code> &mdash; borders on cards, dots, buttons</td><td>WHCM</td></tr>
        <tr><td>Reduced motion</td><td>All transforms and transitions disabled</td><td>WCAG 2.3.3</td></tr>
      </tbody>
    </table>
  </div>
</div>

`,Ei={title:"Card Row",desc:"Cards in a row, scrolling on demand. Three layouts for news, quotes, and stories.",tabs:["Preview","Specs"],content:[Ai,Si],wide:!0,brandAware:!0,init:$i},Vs=`
<style>
.il-toolbar {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-4);
  flex-wrap: wrap;
}
.il-search {
  flex: 1;
  min-width: 180px;
  padding: 8px 12px;
  border: 1px solid var(--card-border);
  border-radius: var(--r-md);
  background: var(--card);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  color: var(--grey-600);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease);
}
.il-search:focus { border-color: var(--black); }
.il-search::placeholder { color: var(--grey-400); }


.il-count {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  color: var(--grey-600);
  white-space: nowrap;
}

.il-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--sp-3);
  padding: var(--sp-4);
  border-radius: var(--r-lg);
  transition: background-color var(--duration) var(--ease);
}
.il-grid[data-surface="light"] { background: #FFFFFF; }
.il-grid[data-surface="dark"]  { background: var(--grey-900); }

.il-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3);
  border-radius: var(--r-md);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease), transform var(--duration-fast) var(--ease);
}
.il-card:hover { background: rgba(128,128,128,0.1); }
.il-card:active { transform: scale(0.97); }
.il-card__copy {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--r-xs);
  background: var(--black);
  color: #fff;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease), background var(--duration-fast) var(--ease);
  pointer-events: none;
}
.il-card:hover .il-card__copy { opacity: 1; }
.il-card__copy.copied { background: #16a34a; }

.il-card__svg {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}
.il-card__svg svg {
  width: 100%;
  height: 100%;
  display: block;
}

.il-card__name {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 300;
  line-height: 1.6;
  color: var(--grey-600);
  text-align: center;
  word-break: break-word;
  max-width: 100%;
}
.il-grid[data-surface="dark"] .il-card__name { color: var(--grey-400); }
.il-grid[data-surface="dark"] .il-card__copy { background: var(--grey-200); color: var(--grey-900); }

.il-empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--sp-6);
  font: var(--body-xs);
  font-weight: 400;
  color: var(--grey-600);
}

/* ── Showcase dark mode ── */
body.dm .il-search { background: var(--dark-card); color: var(--grey-100); border-color: var(--card-border); }
body.dm .il-search:focus { border-color: var(--black); }
</style>
`,ms=Ea[me[0]??""]||'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="var(--icon-fill)" stroke="var(--icon-line)" stroke-width="2"/><circle cx="32" cy="32" r="10" fill="var(--icon-accent)"/></svg>';function Ci(){return me.length===0?'<div class="il-empty">No illustrations found. Run <code>npm run fetch-illustrations && npm run illustrations</code> first.</div>':me.map(a=>{const t=Ea[a]||"";return`<div class="il-card" data-name="${a}" title="Click to copy SVG">
      <div class="il-card__svg" aria-hidden="true">${t}</div>
      <span class="il-card__copy" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></span>
      <div class="il-card__name">${a}</div>
    </div>`}).join("")}const ji=`${Vs}
<div class="il-toolbar">
  <input class="il-search" id="ilSearch" type="text" placeholder="Search illustrations..." aria-label="Search illustrations" />
  <div class="pills" role="radiogroup" aria-label="Surface">
    <button class="on" data-surface="light" role="radio" aria-checked="true">Light</button>
    <button data-surface="dark" role="radio" aria-checked="false">Dark</button>
  </div>
  <span class="il-count" id="ilCount">${me.length} illustration${me.length!==1?"s":""}</span>
</div>

<div class="il-grid" id="ilGrid" data-surface="light">
  ${Ci()}
</div>`,Fi=`${Vs}
<style>
.vcard[id^="il-"] { scroll-margin-top: 80px; }
</style>

<div class="vcard" id="il-tokens" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Design Tokens</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Token</th><th style="width:20%">Role</th><th>Light surface</th><th>Dark surface</th></tr></thead><tbody>
    <tr>
      <td>${i("--icon-accent","--icon-accent")}</td>
      <td>Accent (~22%)</td>
      <td><span class="sw" style="background:var(--icon-accent)"></span>${i("--brand","--brand")}</td>
      <td><span class="sw" style="background:var(--icon-accent)"></span>${i("--brand","--brand")}</td>
    </tr>
    <tr>
      <td>${i("--icon-line","--icon-line")}</td>
      <td>Line (~32%)</td>
      <td><span class="sw" style="background:var(--icon-line)"></span>color-mix(in srgb, ${i("--brand","--brand")} 15%, ${i("--grey-800","--grey-800")})</td>
      <td>color-mix(in srgb, ${i("--brand","--brand")} 15%, ${i("--grey-100","--grey-100")})</td>
    </tr>
    <tr>
      <td>${i("--icon-fill","--icon-fill")}</td>
      <td>Fill (~46%)</td>
      <td><span class="sw" style="background:var(--icon-fill);border:1px solid #e0e0e0"></span>color-mix(in srgb, ${i("--brand","--brand")} 8%, ${i("--grey-200","--grey-200")})</td>
      <td>color-mix(in srgb, ${i("--brand","--brand")} 8%, ${i("--grey-800","--grey-800")})</td>
    </tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-brand-surface" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Brand × Surface</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th></th><th>GX</th><th>NX</th><th>GE</th></tr></thead><tbody>
    <tr>
      <td>Light</td>
      ${["gx","nx","ge"].map(a=>`<td data-brand="${a}" data-surface="light" style="background:#FFFFFF;padding-left:var(--sp-3);padding-right:var(--sp-3)"><div style="width:64px;height:64px">${ms}</div></td>`).join("")}
    </tr>
    <tr>
      <td style="font-weight:600;background:var(--grey-900);color:#fff;">Dark</td>
      ${["gx","nx","ge"].map(a=>`<td data-brand="${a}" data-surface="dark" style="background:var(--grey-900);padding-left:var(--sp-3);padding-right:var(--sp-3)"><div style="width:64px;height:64px">${ms}</div></td>`).join("")}
    </tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-sizes" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Sizes</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Size</th><th>Dimensions</th><th>Use</th></tr></thead><tbody>
    <tr><td>Minimum</td><td>48 × 48px</td><td>Smallest legible size — stroke details break below this</td></tr>
    <tr><td>Default</td><td>64 × 64px</td><td>Standard product usage</td></tr>
    <tr><td>Hero</td><td>80 × 80px</td><td>Hero sections, empty states</td></tr>
    <tr><td>Maximum</td><td>96 × 96px</td><td>No visual gain beyond this</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-usage" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Usage</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Rule</th><th>Detail</th></tr></thead><tbody>
    <tr><td>Inline SVG only</td><td>Always render as inline SVG, not <code class="tok tok--static">&lt;img&gt;</code>. Using <code class="tok tok--static">&lt;img&gt;</code> breaks CSS custom property inheritance and prevents brand-aware coloring</td></tr>
    <tr><td>Decorative by default</td><td>Add <code class="tok tok--static">aria-hidden="true"</code> to the SVG container</td></tr>
    <tr><td>Meaningful context</td><td>If the illustration conveys meaning, wrap in a container with <code class="tok tok--static">role="img"</code> and <code class="tok tok--static">aria-label="..."</code></td></tr>
    <tr><td>Color composition</td><td>Accent ~22%, Line ~32%, Fill ~46%</td></tr>
    <tr><td>No gradients</td><td>Flat colors only (design system brief)</td></tr>
    <tr><td>Two systems</td><td><code class="tok tok--static">illustrations.ts</code> (tricolor) is separate from <code class="tok tok--static">icons.ts</code> (monocolor <code class="tok tok--static">currentColor</code>)</td></tr>
  </tbody></table>
</div></div>

<div class="vcard" id="il-import" style="margin-bottom:var(--sp-7);"><div class="vcard__head"><span class="vcard__name">Import</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Method</th><th>Code</th></tr></thead><tbody>
    <tr><td>Named import</td><td><code class="tok tok--static">import { illuSecurity } from '@anthropic/june-ds/icons/illustrations.js'</code></td></tr>
    <tr><td>Dynamic lookup</td><td><code class="tok tok--static">import { illustrationMap } from '@anthropic/june-ds/icons/illustrations.js'</code></td></tr>
  </tbody></table>
  <div class="table-note">
    Named exports follow the pattern <code class="tok tok--static">illu</code> + PascalCase name. Use <code class="tok tok--static">illustrationMap[name]</code> for dynamic rendering.
  </div>
</div></div>

<div class="vcard" id="il-pipeline"><div class="vcard__head"><span class="vcard__name">Pipeline</span></div><div class="vcard__body" style="padding:0;">
  <table class="tok-table"><thead><tr><th>Step</th><th>Command</th><th>Description</th></tr></thead><tbody>
    <tr><td>1. Fetch (pilot)</td><td><code class="tok tok--static">FIGMA_PAT=xxx npm run fetch-illustrations</code></td><td>Downloads pilot set (10 SVGs) from Figma API. Resumable</td></tr>
    <tr><td>1b. Fetch (all)</td><td><code class="tok tok--static">FIGMA_PAT=xxx npm run fetch-illustrations:all</code></td><td>Downloads all ~170 SVGs</td></tr>
    <tr><td>2. Process</td><td><code class="tok tok--static">npm run illustrations</code></td><td>SVGO optimize, classify colors (HSL), replace hex with <code class="tok tok--static">var(--icon-*)</code>, generate TS</td></tr>
    <tr><td>3. Review</td><td><code class="tok tok--static">raw-svg/quality-report.json</code></td><td>Flags: unknown colors, gradients, prohibited elements, mixed strokes, tight padding</td></tr>
    <tr><td>4. Verify</td><td><code class="tok tok--static">cd showcase && npm run dev</code></td><td>Check 3 brands × 2 surfaces = 6 combinations</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>Original color (HSL)</th><th>Mapped to</th></tr></thead><tbody>
    <tr><td>Blue (H: 190-250, S &gt; 40%)</td><td>${i("--icon-accent","--icon-accent")}</td></tr>
    <tr><td>Dark, low saturation (L &lt; 35%, S &lt; 15%)</td><td>${i("--icon-fill","--icon-fill")}</td></tr>
    <tr><td>Very light (L &gt; 85%)</td><td>${i("--icon-fill","--icon-fill")}</td></tr>
    <tr><td>Medium lightness (35-85%)</td><td>${i("--icon-line","--icon-line")}</td></tr>
    <tr><td>Near-black (L &lt; 5%)</td><td style="font-size:12px;color:var(--grey-600);font-style:italic">Removed (background)</td></tr>
    <tr><td>Other</td><td style="font-size:12px;color:var(--grey-600);font-style:italic">Flagged for manual review</td></tr>
  </tbody></table>
  <table class="tok-table" style="border-top:2px solid var(--card-border);"><thead><tr><th>File</th><th>Role</th></tr></thead><tbody>
    <tr><td><code class="tok tok--static">scripts/fetch-illustrations.mjs</code></td><td>Figma API → raw SVGs</td></tr>
    <tr><td><code class="tok tok--static">scripts/process-illustrations.mjs</code></td><td>Raw SVGs → tokenized <code class="tok tok--static">illustrations.ts</code></td></tr>
    <tr><td><code class="tok tok--static">raw-svg/</code></td><td>Downloaded SVGs + manifest + quality report (gitignored)</td></tr>
    <tr><td><code class="tok tok--static">src/icons/illustrations.ts</code></td><td>Auto-generated named exports (committed)</td></tr>
    <tr><td><code class="tok tok--static">src/tokens/_icon-tokens.scss</code></td><td>CSS custom properties for accent/line/fill</td></tr>
  </tbody></table>
  <div class="table-note">
    Override misclassifications in <code class="tok tok--static">COLOR_OVERRIDES</code> map inside <code class="tok tok--static">process-illustrations.mjs</code>. Figma PAT expires after 90 days.
  </div>
</div></div>`;function Bi(){const a=document.getElementById("page");if(!a)return;a.addEventListener("click",r=>{const s=r.target.closest("[data-surface]");if(!s||!s.closest('.pills[aria-label="Surface"]'))return;const l=s.dataset.surface;if(!l)return;const n=document.getElementById("ilGrid");n&&n.setAttribute("data-surface",l);const c=s.closest(".pills");c&&c.querySelectorAll("button").forEach(h=>{const v=h.dataset.surface===l;h.classList.toggle("on",v),h.setAttribute("aria-checked",String(v))})});const t=document.getElementById("ilSearch"),e=document.getElementById("ilGrid"),d=document.getElementById("ilCount");t&&e&&t.addEventListener("input",()=>{const r=t.value.toLowerCase().trim(),s=e.querySelectorAll(".il-card");let l=0;s.forEach(n=>{const c=n.dataset.name||"",h=!r||c.includes(r);n.style.display=h?"":"none",h&&l++}),d&&(d.textContent=`${l} illustration${l!==1?"s":""}`)});const o={light:{"var(--icon-accent)":"#5BA7FF","var(--icon-line)":"#111111","var(--icon-fill)":"#E2E8EF","var(--icon-bg)":"#FFFFFF"},dark:{"var(--icon-accent)":"#5BA7FF","var(--icon-line)":"#FFFFFF","var(--icon-fill)":"#3E4853","var(--icon-bg)":"#1B1F23"}};a.addEventListener("click",r=>{const s=r.target.closest(".il-card");if(!s)return;const l=s.dataset.name||"",n=Ea[l]||"",c=document.getElementById("ilGrid"),h=(c==null?void 0:c.getAttribute("data-surface"))==="dark"?"dark":"light",v=o[h],m=n.replace(/var\(--icon-[a-z]+\)/g,K=>v[K]||K).replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" ');S(m);const $=s.querySelector(".il-card__copy");$&&($.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',$.classList.add("copied"),setTimeout(()=>{$.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',$.classList.remove("copied")},1200));const j=h==="dark"?"#1B1F23":"#FFFFFF",E=h==="dark"?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.08)",q=m.replace(/width="64" height="64" /,"");C(`<span class="copy-toast__thumb" style="background:${j};border:1px solid ${E}">${q}</span> Copied: ${l}`)})}const Ii={title:"Illustrations",desc:"Spot art that breathes with your palette. Three layers: accent, line, fill.",tabs:["Catalog","Specs"],content:[ji,Fi],init:Bi},ya="/lam-sample.png",Ti='<svg class="dd__item-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line class="dd__icon-h" x1="3" y1="9" x2="15" y2="9"/><line class="dd__icon-v" x1="9" y1="3" x2="9" y2="15"/></svg>',Li='<svg class="dd__item-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line class="dd__icon-h" x1="5" y1="12" x2="19" y2="12"/><line class="dd__icon-v" x1="12" y1="5" x2="12" y2="19"/></svg>',Pi='<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12.5l9-9M5.5 3.5h7v7"/></svg>';let fe="rich",V="",zt="desktop",rt=0;const Be=[{name:"Finance",desc:"Leading financial institutions trust our platform to power intelligent automation, fraud detection, and real-time analytics across global markets.",link:"Read the story"},{name:"Healthcare",desc:"Hospitals and research labs leverage AI-driven diagnostics and patient management systems built on our enterprise-grade infrastructure.",link:"Read the story"},{name:"Technology",desc:"Top tech companies integrate our APIs to ship AI-powered features faster, from code generation to natural language search.",link:"Read the story"},{name:"Education",desc:"Universities and edtech platforms use personalized learning models to improve student outcomes at scale.",link:"Read the story"},{name:"Retail",desc:"Global retailers deploy recommendation engines and demand forecasting models that drive measurable revenue growth.",link:"Read the story"}],ys=[{name:"What is the free trial period?",desc:"The free trial lasts 14 days and includes full access to all platform features. No credit card required to start."},{name:"How does pricing scale?",desc:"Pricing is based on API usage with volume discounts. Enterprise plans include dedicated support and custom SLAs."},{name:"Can I migrate from another provider?",desc:"Yes. We provide migration tooling and dedicated onboarding support to help you transition without downtime."},{name:"What security certifications do you have?",desc:"We are SOC 2 Type II certified, GDPR compliant, and undergo annual third-party security audits."},{name:"Is there an on-premise deployment option?",desc:"Enterprise customers can deploy on-premise or in a private cloud environment. Contact sales for details."},{name:"What support channels are available?",desc:"All plans include email support. Pro and Enterprise plans add live chat and dedicated Slack channels with guaranteed response times."},{name:"How do I get started with the API?",desc:"Sign up for a free account, grab your API key from the dashboard, and follow our quickstart guide. Most teams are up and running in under an hour."}];function Di(){let a='<div class="dd"'+(V?' data-split="'+V+'"':"")+' data-surface="light">';a+='<div class="dd__header">',a+='<h2 class="dd__title">Trusted by a lot of cool companies across all industries</h2>',a+='<p class="dd__strapline">Discover how businesses worldwide leverage our platform to transform their operations and drive innovation.</p>',a+="</div>",a+='<div class="dd__body">',a+='<div class="dd__list">';for(let t=0;t<Be.length;t++){const e=Be[t],d=t===rt;a+='<div class="dd__item'+(d?" dd__item--on":"")+'" data-idx="'+t+'">',a+='<div class="dd__item-head" role="button" tabindex="0" aria-expanded="'+d+'">',a+='<span class="dd__item-name">'+e.name+"</span>",a+=Ti,a+="</div>",a+='<div class="dd__item-body">',a+='<div class="dd__item-content">',a+='<p class="dd__item-desc">'+e.desc+"</p>",a+='<a class="dd__item-link" href="#">'+e.link+" "+Pi+"</a>",a+='<div class="dd__item-media"><img src="'+ya+'" alt="'+e.name+' case study" /></div>',a+="</div>",a+="</div>",a+="</div>"}return a+='<a class="dd__footer" href="#">Check all industries</a>',a+="</div>",a+='<div class="dd__media"><img src="'+ya+'" alt="'+Be[rt].name+' case study" /></div>',a+="</div>",a+="</div>",a}function Mi(){let a='<div class="dd dd--simple"'+(V?' data-split="'+V+'"':"")+' data-surface="light">';a+='<div class="dd__body">',a+='<div class="dd__header">',a+='<h2 class="dd__title">Frequently asked questions</h2>',a+='<p class="dd__subtitle">Everything you need to know about the platform. Can’t find what you’re looking for? Contact our support team.</p>',a+="</div>",a+='<div class="dd__list">';for(let t=0;t<ys.length;t++){const e=ys[t],d=t===rt;a+='<div class="dd__item'+(d?" dd__item--on":"")+'" data-idx="'+t+'">',a+='<div class="dd__item-head" role="button" tabindex="0" aria-expanded="'+d+'">',a+='<span class="dd__item-name">'+e.name+"</span>",a+=Li,a+="</div>",a+='<div class="dd__item-body">',a+='<div class="dd__item-content">',a+='<p class="dd__item-desc">'+e.desc+"</p>",a+="</div>",a+="</div>",a+="</div>"}return a+="</div>",a+="</div>",a+="</div>",a}function _s(a){if(a===rt)return;const t=document.getElementById("dd-preview");if(!t)return;const e=t.querySelectorAll(".dd__item"),d=e[rt];if(d){d.classList.remove("dd__item--on");const r=d.querySelector(".dd__item-head");r&&r.setAttribute("aria-expanded","false")}const o=e[a];if(o){o.classList.add("dd__item--on");const r=o.querySelector(".dd__item-head");r&&r.setAttribute("aria-expanded","true")}if(fe==="rich"){const r=t.querySelector(".dd__media img");if(r){r.style.opacity="0";const s=()=>{r.removeEventListener("transitionend",s),r.src=ya,r.alt=Be[a].name+" case study",r.onload=()=>{r.style.opacity="1"},r.complete&&(r.style.opacity="1")};r.addEventListener("transitionend",s)}}rt=a,Ws()}function Ie(){const a=document.getElementById("dd-preview");a&&(a.innerHTML=fe==="simple"?Mi():Di(),Ri(),Ws())}let _a=!1;function Ri(){if(_a)return;const a=document.getElementById("dd-preview");a&&(_a=!0,a.addEventListener("click",t=>{const e=t.target.closest(".dd__item-head");if(!e)return;const d=e.closest(".dd__item");if(!d)return;const o=parseInt(d.dataset.idx||"0",10);_s(o)}),a.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target.closest(".dd__item-head");if(!e)return;t.preventDefault();const d=e.closest(".dd__item");if(!d)return;const o=parseInt(d.dataset.idx||"0",10);_s(o)}))}function fs(a,t){if(zt=a<=639?"mobile":a<=1023?"tablet":"desktop",t){const r=t.closest(".lam-device-bar");r&&r.querySelectorAll(".lam-device").forEach(s=>s.classList.remove("on")),t.classList.add("on")}const e=document.getElementById("dd-viewport");if(e){e.setAttribute("data-bp",zt),zt==="desktop"?(e.style.width="100%",e.style.maxWidth="none",e.style.margin="0"):(e.style.width=a+"px",e.style.maxWidth="100%",e.style.margin="0 auto");const r=document.getElementById("dd-breakout");r&&(r.style.padding="0")}const d=zt.charAt(0).toUpperCase()+zt.slice(1),o=document.getElementById("dd-width-label");o&&(o.textContent=d+" · "+a+"px"),Ie()}function Ws(){const a=document.getElementById("dd-code");if(!a)return;const t="  ";let e="";fe==="simple"?(e+='<div class="dd dd--simple"'+(V?' data-split="'+V+'"':"")+`>
`,e+=t+`<div class="dd__body">
`,e+=t+t+`<div class="dd__header">
`,e+=t+t+t+`<h2 class="dd__title">Title</h2>
`,e+=t+t+t+`<p class="dd__subtitle">Subtitle text</p>
`,e+=t+t+`</div>
`,e+=t+t+`<div class="dd__list">
`,e+=`
`,e+=t+t+t+`<!-- Collapsed item -->
`,e+=t+t+t+`<div class="dd__item">
`,e+=t+t+t+t+`<div class="dd__item-head" role="button" tabindex="0" aria-expanded="false">
`,e+=t+t+t+t+t+`<span class="dd__item-name">Question</span>
`,e+=t+t+t+t+t+`<svg class="dd__item-icon" ...><!-- plus/minus --></svg>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+t+`<div class="dd__item-body">
`,e+=t+t+t+t+t+`<div class="dd__item-content">
`,e+=t+t+t+t+t+t+`<p class="dd__item-desc">Answer text...</p>
`,e+=t+t+t+t+t+`</div>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+`</div>
`,e+=`
`,e+=t+t+t+`<!-- Expanded item -->
`,e+=t+t+t+`<div class="dd__item dd__item--on">
`,e+=t+t+t+t+`<div class="dd__item-head" role="button" tabindex="0" aria-expanded="true">
`,e+=t+t+t+t+t+`<span class="dd__item-name">Question</span>
`,e+=t+t+t+t+t+`<svg class="dd__item-icon" ...><!-- plus/minus --></svg>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+t+`<div class="dd__item-body">
`,e+=t+t+t+t+t+`<div class="dd__item-content">
`,e+=t+t+t+t+t+t+`<p class="dd__item-desc">Answer text...</p>
`,e+=t+t+t+t+t+`</div>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+`</div>
`,e+=`
`,e+=t+t+`</div>
`,e+=t+`</div>
`,e+="</div>"):(e+='<div class="dd"'+(V?' data-split="'+V+'"':"")+`>
`,e+=t+`<div class="dd__header">
`,e+=t+t+`<h2 class="dd__title">Title</h2>
`,e+=t+t+`<p class="dd__strapline">Strapline text</p>
`,e+=t+`</div>
`,e+=t+`<div class="dd__body">
`,e+=t+t+`<div class="dd__list">
`,e+=`
`,e+=t+t+t+`<!-- Expanded item -->
`,e+=t+t+t+`<div class="dd__item dd__item--on">
`,e+=t+t+t+t+`<div class="dd__item-head" role="button" tabindex="0" aria-expanded="true">
`,e+=t+t+t+t+t+`<span class="dd__item-name">Finance</span>
`,e+=t+t+t+t+t+`<svg class="dd__item-icon" ...><!-- plus/minus --></svg>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+t+`<div class="dd__item-body">
`,e+=t+t+t+t+t+`<div class="dd__item-content">
`,e+=t+t+t+t+t+t+`<p class="dd__item-desc">Description...</p>
`,e+=t+t+t+t+t+t+`<a class="dd__item-link" href="#">Read the story</a>
`,e+=t+t+t+t+t+t+`<div class="dd__item-media"><img src="..." alt="" /></div>
`,e+=t+t+t+t+t+`</div>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+`</div>
`,e+=`
`,e+=t+t+t+`<!-- Collapsed item -->
`,e+=t+t+t+`<div class="dd__item">
`,e+=t+t+t+t+`<div class="dd__item-head" role="button" tabindex="0" aria-expanded="false">
`,e+=t+t+t+t+t+`<span class="dd__item-name">Healthcare</span>
`,e+=t+t+t+t+t+`<svg class="dd__item-icon" ...><!-- plus/minus --></svg>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+t+`<div class="dd__item-body">
`,e+=t+t+t+t+t+`<div class="dd__item-content">...</div>
`,e+=t+t+t+t+`</div>
`,e+=t+t+t+`</div>
`,e+=`
`,e+=t+t+t+`<a class="dd__footer" href="#">Check all industries</a>
`,e+=t+t+`</div>
`,e+=t+t+`<div class="dd__media"><img src="..." alt="" /></div>
`,e+=t+`</div>
`,e+="</div>"),a.innerHTML=R(e)}function Oi(){fe="rich",V="",zt="desktop",rt=0,_a=!1,fs(1440,document.querySelector("#dd-breakout .lam-device")),Ie();const a=document.getElementById("dd-device-bar");a&&a.querySelectorAll(".lam-device").forEach(o=>{o.addEventListener("click",()=>{const r=parseInt(o.dataset.width||"1440",10);a.querySelectorAll(".lam-device").forEach(s=>{s.classList.remove("on"),s.setAttribute("aria-checked","false")}),o.classList.add("on"),o.setAttribute("aria-checked","true"),fs(r,o)})});const t=document.getElementById("dd-variant-pills");t&&D(t,o=>{fe=o.dataset.val||"rich",rt=0,Ie()});const e=document.getElementById("dd-split-pills");e&&D(e,o=>{V=o.dataset.val||"",Ie()});const d=document.getElementById("dd-copy-btn");d&&d.addEventListener("click",()=>{const o=document.getElementById("dd-code");o&&(S(o.textContent||""),C("Copied!"))})}const qi=`
<div class="pg-controls">
  <div class="pg-controls__row">
    <span class="pg-controls__label">Layout</span>
    <div class="lam-device-bar" id="dd-device-bar" role="radiogroup" aria-label="Device size">
      <button type="button" class="lam-device on" data-width="1440" role="radio" aria-checked="true" aria-label="Desktop 1440px" title="Desktop 1440px">
        ${ct}
      </button>
      <button type="button" class="lam-device" data-width="768" role="radio" aria-checked="false" aria-label="Tablet 768px" title="Tablet 768px">
        ${pt}
      </button>
      <button type="button" class="lam-device" data-width="428" role="radio" aria-checked="false" aria-label="Mobile 428px" title="Mobile 428px">
        ${vt}
      </button>
    </div>
  </div>
</div>

<div class="pg-preview">
  <div class="lam-breakout" id="dd-breakout" style="padding:0;">
    <div class="lam-viewport" id="dd-viewport" data-bp="desktop">
      <div class="lam-preview-frame" id="dd-preview" data-surface="light" style="overflow:visible"></div>
    </div>
  </div>
  <div class="lam-viewport__width-label" id="dd-width-label">Desktop &middot; 1440px</div>
</div>

<div class="pg-sticky" id="dd-sticky">
  <span class="pg-controls__label pg-controls__stencil">Deep Dive</span>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Variant</span>
  <div class="btn-pills" id="dd-variant-pills" role="radiogroup" aria-label="Layout variant">
    <button type="button" class="on" data-val="rich" role="radio" aria-checked="true">Rich</button>
    <button type="button" data-val="simple" role="radio" aria-checked="false">Simple</button>
  </div>
  <span class="pg-controls__sep"></span>
  <span class="pg-controls__label">Split</span>
  <div class="btn-pills" id="dd-split-pills" role="radiogroup" aria-label="Column split">
    <button type="button" class="on" data-val="" role="radio" aria-checked="true">Default</button>
    <button type="button" data-val="40-60" role="radio" aria-checked="false">40 / 60</button>
    <button type="button" data-val="50-50" role="radio" aria-checked="false">50 / 50</button>
    <button type="button" data-val="60-40" role="radio" aria-checked="false">60 / 40</button>
  </div>
</div>

<div class="code-snippet" style="margin-top:var(--sp-5);">
  <div class="code-snippet__head">
    <span class="code-snippet__label">HTML</span>
    <button type="button" class="code-snippet__copy" id="dd-copy-btn">Copy</button>
  </div>
  <pre class="code-snippet__pre"><code id="dd-code"></code></pre>
</div>
`,Hi=`
<div class="anatomy-wrap" style="margin-bottom:var(--sp-5);">
  <div class="anatomy__head"><span class="anatomy__head-title">Anatomy</span></div>
  <div class="anatomy__content" style="padding:var(--sp-5);overflow-x:auto;">
    <pre class="anatomy__tree"><span style="color:var(--black);font-weight:500;">Deep Dive</span>

<span style="color:var(--black);font-weight:500;">Rich variant</span> <span style="color:var(--grey-500);font-style:italic;">(.dd)</span>
├── <span style="color:var(--black);font-weight:500;">Header</span> (centered, 940px max)
│   ├── <span style="color:var(--black);font-weight:500;">Title</span> → h2 (responsive alias)
│   └── <span style="color:var(--black);font-weight:500;">Strapline</span> → highlight-l → highlight-m → highlight-s
├── <span style="color:var(--black);font-weight:500;">Body</span> (flex row desktop, column tablet/mobile)
│   ├── <span style="color:var(--black);font-weight:500;">List</span> (500px desktop, full-width tablet/mobile)
│   │   ├── <span style="color:var(--black);font-weight:500;">Item</span> (border-bottom, clickable)
│   │   │   ├── Head (name + plus icon 18px)
│   │   │   └── Content <span style="color:var(--grey-500);font-style:italic;">(expanded only)</span>
│   │   │       ├── Description → body-l
│   │   │       ├── Link → highlight-s (underlined)
│   │   │       └── Inline Image <span style="color:var(--grey-500);font-style:italic;">(tablet/mobile only)</span>
│   │   └── <span style="color:var(--black);font-weight:500;">Footer</span> → highlight-s (underlined)
│   └── <span style="color:var(--black);font-weight:500;">Media</span> (side image, r-2xl) <span style="color:var(--grey-500);font-style:italic;">(desktop only)</span>

<span style="color:var(--black);font-weight:500;">Simple variant</span> <span style="color:var(--grey-500);font-style:italic;">(.dd.dd--simple)</span>
├── <span style="color:var(--black);font-weight:500;">Body</span> (flex row desktop, column tablet/mobile)
│   ├── <span style="color:var(--black);font-weight:500;">Header</span> (left column, flex-1, sticky)
│   │   ├── Title → h2 (responsive alias)
│   │   └── Subtitle → highlight-m
│   └── <span style="color:var(--black);font-weight:500;">List</span> (right column, flex-1, pr-128)
│       ├── <span style="color:var(--black);font-weight:500;">Item</span> (border-bottom, gap 32px, clickable)
│       │   ├── Head (name + plus/minus icon 24px)
│       │   └── Content <span style="color:var(--grey-500);font-style:italic;">(expanded only)</span>
│       │       └── Description → body-l
    </pre>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Tokens &amp; Spacing — Rich</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Container bg</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")} ${i("--card","--card")}</td></tr>
        <tr><td>Container radius</td><td>24px ${i("--r-2xl","--r-2xl")}</td></tr>
        <tr><td>Container padding (desktop)</td><td>128px all sides ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Container padding (tablet)</td><td>80px TB / 48px LR ${i("--sp-9","--sp-9")} / ${i("--sp-7","--sp-7")}</td></tr>
        <tr><td>Container padding (mobile)</td><td>64px TB / 24px LR ${i("--sp-8","--sp-8")} / ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Title</td><td>Semibold (600) · Graphik ${i("--h2","--h2")} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Strapline (desktop)</td><td>Light (300) · 26px/36px · Graphik ${i("--highlight-l","--highlight-l")}</td></tr>
        <tr><td>Strapline (tablet)</td><td>Light (300) · 20px/30px · Graphik ${i("--highlight-m","--highlight-m")}</td></tr>
        <tr><td>Strapline (mobile)</td><td>Light (300) · 17px/26px · Graphik ${i("--highlight-s","--highlight-s")}</td></tr>
        <tr><td>Title→content gap (desktop)</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Column gap (desktop)</td><td>80px ${i("--sp-9","--sp-9")}</td></tr>
        <tr><td>Item border</td><td><span class="sw" style="background:#D9D9D9;border:1px solid #e0e0e0"></span>${p("#D9D9D9")} · 1px solid ${i("--grey-300","--grey-300")}</td></tr>
        <tr><td>Item name (collapsed)</td><td>Light (300) · 20px/30px · Graphik ${i("--highlight-m","--highlight-m")}</td></tr>
        <tr><td>Item name (expanded)</td><td>Semibold (600) · 20px/30px · Graphik ${i("--title-4","--title-4")}</td></tr>
        <tr><td>Item padding</td><td>24px TB + 24px right ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Description</td><td>Light (300) · 17px/26px · Rubik ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Story link</td><td>Light (300) · 17px/26px · Graphik ${i("--highlight-s","--highlight-s")}</td></tr>
        <tr><td>Content→border gap</td><td>24px ${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Side image radius</td><td>24px ${i("--r-2xl","--r-2xl")}</td></tr>
        <tr><td>Footer</td><td>Light (300) · 17px/26px · Graphik, underlined ${i("--highlight-s","--highlight-s")}</td></tr>
        <tr><td>Plus icon</td><td>18 × 18 px, ${i("--grey-500","--grey-500")}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Tokens &amp; Spacing — Simple</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Container bg</td><td><span class="sw" style="background:#FFFFFF;border:1px solid #e0e0e0"></span>${p("#FFFFFF")} ${i("--card","--card")}</td></tr>
        <tr><td>Container radius</td><td>24px ${i("--r-2xl","--r-2xl")}</td></tr>
        <tr><td>Container padding (desktop)</td><td>128px (L, T, B) · 0 (R) ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Title</td><td>Semibold (600) · Graphik ${i("--h2","--h2")} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Title→subtitle gap</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Subtitle</td><td>Light (300) · 20px/30px · Graphik ${i("--highlight-m","--highlight-m")}</td></tr>
        <tr><td>Column gap</td><td>64px ${i("--sp-8","--sp-8")}</td></tr>
        <tr><td>List right padding</td><td>128px ${i("--sp-10","--sp-10")}</td></tr>
        <tr><td>Items gap</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
        <tr><td>Item border</td><td><span class="sw" style="background:#808080"></span>${p("#808080")} · 1px solid ${i("--grey-500","--grey-500")}</td></tr>
        <tr><td>Item name</td><td>Semibold (600) · 17px/26px · Graphik ${i("--title-5","--title-5")}</td></tr>
        <tr><td>Item head padding-bottom</td><td>16px ${i("--sp-4","--sp-4")}</td></tr>
        <tr><td>Expanded body gap</td><td>22px</td></tr>
        <tr><td>Description</td><td>Light (300) · 17px/26px · Rubik ${i("--body-m","--body-m")}</td></tr>
        <tr><td>Description color</td><td><span class="sw" style="background:#3D3F40"></span>${p("#3D3F40")} ${i("--text","--text")}</td></tr>
        <tr><td>Plus/minus icon</td><td>24 × 24 px, ${i("--grey-500","--grey-500")}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Responsive</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Property</th><th>Desktop (1440)</th><th>Tablet (768)</th><th>Mobile (428)</th></tr></thead>
      <tbody>
        <tr><td>Container padding</td><td>128px ${i("--sp-10","--sp-10")}</td><td>80/48px ${i("--sp-9","--sp-9")}/${i("--sp-7","--sp-7")}</td><td>64/24px ${i("--sp-8","--sp-8")}/${i("--sp-5","--sp-5")}</td></tr>
        <tr><td>Container radius</td><td>${i("--r-2xl","--r-2xl")}</td><td>${i("--r-2xl","--r-2xl")}</td><td>0 (full-bleed)</td></tr>
        <tr><td>Layout</td><td>Two columns</td><td>Single column</td><td>Single column</td></tr>
        <tr><td>Title font (Rich)</td><td colspan="3">${i("--h2","--h2")} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Strapline (Rich)</td><td>${i("--highlight-l","--highlight-l")}</td><td>${i("--highlight-m","--highlight-m")}</td><td>${i("--highlight-s","--highlight-s")}</td></tr>
        <tr><td>Title alignment (Rich)</td><td colspan="3">center (all breakpoints)</td></tr>
        <tr><td>Image (Rich)</td><td>Side column</td><td>Inside item (475px)</td><td>Inside item (239px)</td></tr>
        <tr><td>Simple title</td><td colspan="3">${i("--h2","--h2")} (responsive alias: title-2 → title-3 → title-4)</td></tr>
        <tr><td>Simple column gap</td><td>64px ${i("--sp-8","--sp-8")}</td><td>48px ${i("--sp-7","--sp-7")}</td><td>32px ${i("--sp-6","--sp-6")}</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">States</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Element</th><th style="width:20%">State</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr>
          <td>Item head</td>
          <td><code class="tok tok--static">hover</code></td>
          <td>Name color → ${i("--brand","--brand")}</td>
        </tr>
        <tr>
          <td>Item head</td>
          <td><code class="tok tok--static">focus-visible</code></td>
          <td>outline: ${i("2px solid","2px solid")} ${i("--brand","--brand")}<br><span style="display:block;margin-top:6px;">outline-offset: ${i("2px","2px")}</span></td>
        </tr>
        <tr>
          <td>Story link <span style="color:var(--grey-500);font-style:italic;">(Rich)</span></td>
          <td><code class="tok tok--static">hover</code></td>
          <td>color → ${i("--brand","--brand")}</td>
        </tr>
        <tr>
          <td>Footer link <span style="color:var(--grey-500);font-style:italic;">(Rich)</span></td>
          <td><code class="tok tok--static">hover</code></td>
          <td>color → ${i("--brand","--brand")}</td>
        </tr>
        <tr>
          <td>All interactive</td>
          <td><code class="tok tok--static">reduced-motion</code></td>
          <td>All transitions disabled via ${i("prefers-reduced-motion: reduce","prefers-reduced-motion: reduce")}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Accessibility</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Feature</th><th>Implementation</th><th>Standard</th></tr></thead>
      <tbody>
        <tr><td>Accordion pattern</td><td><code class="tok tok--static">role="button"</code> + <code class="tok tok--static">aria-expanded</code> on item heads</td><td>WAI-ARIA APG</td></tr>
        <tr><td>Keyboard navigation</td><td>Enter / Space to expand/collapse items</td><td>WCAG 2.1.1</td></tr>
        <tr><td>Focus indicators</td><td><code class="tok tok--static">focus-visible</code> on all interactive elements</td><td>WCAG 2.4.7</td></tr>
        <tr><td>High contrast</td><td><code class="tok tok--static">@media (forced-colors)</code> — borders on items, outline on focus</td><td>WHCM</td></tr>
        <tr><td>Reduced motion</td><td>All transitions disabled</td><td>WCAG 2.3.3</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="vcard" style="margin-bottom:var(--sp-7);">
  <div class="vcard__head"><span class="vcard__name">Column Split</span></div>
  <div class="vcard__body" style="padding:0;">
    <table class="tok-table">
      <thead><tr><th>Attribute</th><th>Values</th><th>Behavior</th></tr></thead>
      <tbody>
        <tr><td><code class="tok tok--static">data-split</code></td><td>${i("40-60","40-60")}, ${i("50-50","50-50")}, ${i("60-40","60-40")}</td><td>Sets the column ratio between the two body children (first-col% / second-col%)</td></tr>
        <tr><td>Default (no attribute)</td><td>—</td><td>Original layout preserved (Rich: 500px list + flex-1 media; Simple: flex-1 header + flex-1 list)</td></tr>
        <tr><td>Desktop only</td><td>—</td><td>Tablet and mobile collapse to single column — split has no effect</td></tr>
        <tr><td>Simple + split</td><td>—</td><td>Padding resets to symmetric (list internal padding removed) so ratios are accurate</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,zi={title:"Deep Dive",desc:"Expand, collapse, explore. Accordion stencil in rich and simple variants.",tabs:["Preview","Specs"],content:[qi,Hi],wide:!0,brandAware:!0,init:Oi},Ve={"getting-started":qd,"tokens-export":Gd,typography:Jd,spacing:tr,colors:lr,shadows:pr,breakpoints:gr,blocks:Fr,button:_r,eyebrow:xr,"look-at-me":Rr,"show-and-tell":Gr,island:Yr,field:ei,"smiley-contact-box":ii,"learn-more":hi,"card-row":Ei,illustrations:Ii,"deep-dive":zi};window.copyToClipboard=S;window.showToast=C;window.hlHTML=R;window.setupRadioGroup=D;window._juneCopyRootTokens=()=>{const a=Array.from(document.styleSheets).flatMap(t=>{try{return Array.from(t.cssRules)}catch{return[]}}).filter(t=>t instanceof CSSStyleRule&&t.selectorText===":root").map(t=>t.cssText).join(`
`);S(a||":root { /* tokens */ }"),C("Copied :root tokens!")};let fa=!1;function ks(a){a.addEventListener("click",t=>{const e=t.target.closest(".tabs button");if(!e)return;const d=parseInt(e.dataset.tabIdx||"0"),o=e.dataset.tabName;a.querySelectorAll(".tabs button").forEach(s=>{s.classList.remove("on"),s.setAttribute("aria-selected","false"),s.setAttribute("tabindex","-1")}),e.classList.add("on"),e.setAttribute("aria-selected","true"),e.setAttribute("tabindex","0"),a.querySelectorAll(".pane").forEach(s=>s.classList.remove("on"));const r=a.querySelector('.pane[data-pane="'+d+'"]');if(r&&r.classList.add("on"),o){const s=a.getAttribute("data-page-id"),l=o.toLowerCase().replace(/\s+/g,"-").replace(/&/g,"");window.history.replaceState(null,"","#"+s+"-"+l)}}),a.addEventListener("keydown",t=>{const e=t.target.closest(".tabs button");if(!e)return;const d=[...a.querySelectorAll(".tabs button")],o=d.indexOf(e);let r=-1;t.key==="ArrowRight"?r=(o+1)%d.length:t.key==="ArrowLeft"?r=(o-1+d.length)%d.length:t.key==="Home"?r=0:t.key==="End"&&(r=d.length-1),r>=0&&(t.preventDefault(),d[r].focus(),d[r].click())})}document.addEventListener("click",a=>{var e,d,o;const t=a.target;if((e=t.classList)!=null&&e.contains("code-inline__copy")){const r=t.dataset.copy||((o=(d=t.parentElement)==null?void 0:d.textContent)==null?void 0:o.replace(/\s*$/,""))||"";S(r),C("Copied!")}});function Yt(a){const t=Ve[a];if(!t)return;const e=document.getElementById("page");if(!e)return;document.querySelectorAll(".sidebar__item").forEach(l=>l.classList.toggle("active",l.dataset.page===a));const d=document.querySelector(".content");d&&(d.scrollTop=0);let o="";if(!t.hideHeader){const l=zs[a];l&&(o+='<span class="page-section">'+l+"</span>"),o+='<div class="page-header">',o+='<h2 class="page-title">'+t.title+"</h2>",o+="</div>",t.desc&&(o+='<p class="page-desc">'+t.desc+"</p>")}let r=0;const s=window.location.hash.slice(1);if(s.startsWith(a+"-")){const l=s.substring(a.length+1),n=t.tabs.findIndex(c=>c.toLowerCase().replace(/\s+/g,"-").replace(/&/g,"")===l);n>=0&&(r=n)}if(t.tabs.length>1&&(o+='<div class="tabs" role="tablist" aria-label="'+(t.title||"Sections")+'">',t.tabs.forEach((l,n)=>{const c="tab-"+a+"-"+n,h="panel-"+a+"-"+n;o+='<button class="'+(n===r?"on":"")+'" data-tab-idx="'+n+'" data-tab-name="'+l+'" role="tab" aria-selected="'+(n===r)+'" id="'+c+'" aria-controls="'+h+'">'+l+"</button>"}),o+="</div>"),t.content&&t.content.length&&t.content.forEach((l,n)=>{const c="tab-"+a+"-"+n,h="panel-"+a+"-"+n;o+='<div class="pane'+(n===r?" on":"")+'" data-pane="'+n+'" role="tabpanel" id="'+h+'" aria-labelledby="'+c+'">'+l+"</div>"}),e.setAttribute("data-page-id",a),t.wide?e.setAttribute("data-wide",""):e.removeAttribute("data-wide"),e.innerHTML=o,document.dispatchEvent(new CustomEvent("brand-aware-change",{detail:!!t.brandAware})),!fa){const l=window.location.hash.slice(1);if(Ta(l)!==a){const c=new URL(window.location.href);c.hash=a,window.history.pushState({page:a},"",c)}}e.classList.remove("animate"),requestAnimationFrame(()=>{e.classList.add("animate"),wr(),$r(),Bd()}),e.querySelectorAll(".tabs button").forEach(l=>l.setAttribute("tabindex",l.classList.contains("on")?"0":"-1")),Gi(),t.init&&t.init()}function Gi(){document.querySelectorAll(".code-inline:not([data-init])").forEach(a=>{a.setAttribute("data-init","1");const t=a.innerHTML.trim(),e=a.dataset.code||t,d=(t||e).replace(/</g,"&lt;").replace(/>/g,"&gt;");a.innerHTML='<span class="code-inline__text">'+R(d)+'</span><span class="code-inline__copy" title="Copy" data-copy="'+e.replace(/"/g,"&quot;")+'"></span>'})}window.renderPage=Yt;document.addEventListener("click",a=>{const t=a.target.closest("[data-navigate]");if(t){a.preventDefault();const e=t.dataset.navigate;if(e){Yt(e);const d=document.querySelector("app-shell");d&&(d.currentPage=e)}}});document.addEventListener("navigate",(a=>{Yt(a.detail)}));document.addEventListener("click",a=>{const e=a.target.closest(".tok:not(.tok--static)");e&&(S(e.textContent||""),C("Copied "+(e.textContent||"")))});document.addEventListener("brand-change",(a=>{const t=document.getElementById("page");t&&t.setAttribute("data-brand",a.detail)}));function Ta(a){if(!a)return"getting-started";if(Ve[a])return a;const t=Object.keys(Ve).sort((e,d)=>d.length-e.length);for(const e of t)if(a.startsWith(e+"-"))return e;return"getting-started"}window.addEventListener("popstate",a=>{var d;fa=!0;const t=window.location.hash.slice(1),e=((d=a.state)==null?void 0:d.page)||Ta(t);if(Ve[e]){Yt(e);const o=document.querySelector("sidebar-nav");o&&o.setActive(e)}fa=!1});const Ni=window.location.hash.slice(1),xs=Ta(Ni),ws=document.querySelector("app-shell");ws?customElements.whenDefined("app-shell").then(async()=>{await ws.updateComplete;const a=document.getElementById("page");a&&ks(a),Yt(xs)}):document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("page");a&&ks(a),Yt(xs)});
