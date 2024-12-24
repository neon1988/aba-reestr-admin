import{a as ee,ao as se,w as $,ap as De,o as Oe,g as te,b as N,aq as We,ar as re,p as h,l as g,z as $e,as as Ae,E as Ke,at as Qe,au as Y,c as ge,r as F,K as Re,av as Xe,h as b,aw as Ye,ax as je,ay as Ie,ac as Ue,f as k,ad as ae,C as Ge,ae as Ne}from"./index-B6qH9XSO.js";import{a as Je,u as Ze,b as et}from"./use-transition-BofM6uWm.js";import{r as ue,b as tt,a as ot}from"./focus-manager-BJWzFvJg.js";function nt(e,t,o){let n;function l(){n!==void 0&&(se.remove(n),n=void 0)}return ee(()=>{e.value===!0&&l()}),{removeFromHistory:l,addToHistory(){n={condition:()=>o.value===!0,handler:t},se.add(n)}}}const it={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},lt=["beforeShow","show","beforeHide","hide"];function st({showing:e,canShow:t,hideOnRouteChange:o,handleShow:n,handleHide:l,processOnMount:u}){const i=te(),{props:a,emit:c,proxy:m}=i;let f;function v(r){e.value===!0?T(r):w(r)}function w(r){if(a.disable===!0||r!==void 0&&r.qAnchorHandled===!0||t!==void 0&&t(r)!==!0)return;const p=a["onUpdate:modelValue"]!==void 0;p===!0&&(c("update:modelValue",!0),f=r,N(()=>{f===r&&(f=void 0)})),(a.modelValue===null||p===!1)&&P(r)}function P(r){e.value!==!0&&(e.value=!0,c("beforeShow",r),n!==void 0?n(r):c("show",r))}function T(r){if(a.disable===!0)return;const p=a["onUpdate:modelValue"]!==void 0;p===!0&&(c("update:modelValue",!1),f=r,N(()=>{f===r&&(f=void 0)})),(a.modelValue===null||p===!1)&&B(r)}function B(r){e.value!==!1&&(e.value=!1,c("beforeHide",r),l!==void 0?l(r):c("hide",r))}function L(r){a.disable===!0&&r===!0?a["onUpdate:modelValue"]!==void 0&&c("update:modelValue",!1):r===!0!==e.value&&(r===!0?P:B)(f)}$(()=>a.modelValue,L),o!==void 0&&De(i)===!0&&$(()=>m.$route.fullPath,()=>{o.value===!0&&e.value===!0&&T()}),u===!0&&Oe(()=>{L(a.modelValue)});const V={show:w,hide:T,toggle:v};return Object.assign(m,V),V}const qt=[Element,String],rt=[null,document,document.body,document.scrollingElement,document.documentElement];function Pt(e,t){let o=We(t);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return rt.includes(o)?window:o}function ye(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function be(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function xe(e,t,o=0){const n=arguments[3]===void 0?performance.now():arguments[3],l=ye(e);if(o<=0){l!==t&&J(e,t);return}requestAnimationFrame(u=>{const i=u-n,a=l+(t-l)/Math.max(i,o)*i;J(e,a),a!==t&&xe(e,t,o-i,u)})}function Ee(e,t,o=0){const n=arguments[3]===void 0?performance.now():arguments[3],l=be(e);if(o<=0){l!==t&&Z(e,t);return}requestAnimationFrame(u=>{const i=u-n,a=l+(t-l)/Math.max(i,o)*i;Z(e,a),a!==t&&Ee(e,t,o-i,u)})}function J(e,t){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,t);return}e.scrollTop=t}function Z(e,t){if(e===window){window.scrollTo(t,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=t}function Lt(e,t,o){if(o){xe(e,t,o);return}J(e,t)}function Ct(e,t,o){if(o){Ee(e,t,o);return}Z(e,t)}let D;function Ht(){if(D!==void 0)return D;const e=document.createElement("p"),t=document.createElement("div");re(e,{width:"100%",height:"200px"}),re(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const o=e.offsetWidth;t.style.overflow="scroll";let n=e.offsetWidth;return o===n&&(n=t.clientWidth),t.remove(),D=o-n,D}function at(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let H=0,j,I,_,U=!1,ce,de,fe,y=null;function ut(e){ct(e)&&$e(e)}function ct(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=Ae(e),o=e.shiftKey&&!e.deltaX,n=!o&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),l=o||n?e.deltaY:e.deltaX;for(let u=0;u<t.length;u++){const i=t[u];if(at(i,n))return n?l<0&&i.scrollTop===0?!0:l>0&&i.scrollTop+i.clientHeight===i.scrollHeight:l<0&&i.scrollLeft===0?!0:l>0&&i.scrollLeft+i.clientWidth===i.scrollWidth}return!0}function me(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function O(e){U!==!0&&(U=!0,requestAnimationFrame(()=>{U=!1;const{height:t}=e.target,{clientHeight:o,scrollTop:n}=document.scrollingElement;(_===void 0||t!==window.innerHeight)&&(_=o-t,document.scrollingElement.scrollTop=n),n>_&&(document.scrollingElement.scrollTop-=Math.ceil((n-_)/8))}))}function ve(e){const t=document.body,o=window.visualViewport!==void 0;if(e==="add"){const{overflowY:n,overflowX:l}=window.getComputedStyle(t);j=be(window),I=ye(window),ce=t.style.left,de=t.style.top,fe=window.location.href,t.style.left=`-${j}px`,t.style.top=`-${I}px`,l!=="hidden"&&(l==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),n!=="hidden"&&(n==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,h.is.ios===!0&&(o===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",O,g.passiveCapture),window.visualViewport.addEventListener("scroll",O,g.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",me,g.passiveCapture))}h.is.desktop===!0&&h.is.mac===!0&&window[`${e}EventListener`]("wheel",ut,g.notPassive),e==="remove"&&(h.is.ios===!0&&(o===!0?(window.visualViewport.removeEventListener("resize",O,g.passiveCapture),window.visualViewport.removeEventListener("scroll",O,g.passiveCapture)):window.removeEventListener("scroll",me,g.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=ce,t.style.top=de,window.location.href===fe&&window.scrollTo(j,I),_=void 0)}function dt(e){let t="add";if(e===!0){if(H++,y!==null){clearTimeout(y),y=null;return}if(H>1)return}else{if(H===0||(H--,H>0))return;if(t="remove",h.is.ios===!0&&h.is.nativeMobile===!0){y!==null&&clearTimeout(y),y=setTimeout(()=>{ve(t),y=null},100);return}}ve(t)}function ft(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,dt(t))}}}function mt(){let e;const t=te();function o(){e=void 0}return Ke(o),ee(o),{removeTick:o,registerTick(n){e=n,N(()=>{e===n&&(Qe(t)===!1&&e(),e=void 0)})}}}const G=[];function _t(e,t){do{if(e.$options.name==="QMenu"){if(e.hide(t),e.$props.separateClosePopup===!0)return Y(e)}else if(e.__qPortal===!0){const o=Y(e);return o!==void 0&&o.$options.name==="QPopupProxy"?(e.hide(t),o):e}e=Y(e)}while(e!=null)}const vt=ge({name:"QPortal",setup(e,{slots:t}){return()=>t.default()}});function wt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function pt(e,t,o,n){const l=F(!1),u=F(!1);let i=null;const a={},c=n==="dialog"&&wt(e);function m(v){if(v===!0){ue(a),u.value=!0;return}u.value=!1,l.value===!1&&(c===!1&&i===null&&(i=je(!1,n)),l.value=!0,G.push(e.proxy),tt(a))}function f(v){if(u.value=!1,v!==!0)return;ue(a),l.value=!1;const w=G.indexOf(e.proxy);w!==-1&&G.splice(w,1),i!==null&&(Ie(i),i=null)}return Re(()=>{f(!0)}),e.proxy.__qPortal=!0,Xe(e.proxy,"contentEl",()=>t.value),{showPortal:m,hidePortal:f,portalIsActive:l,portalIsAccessible:u,renderPortal:()=>c===!0?o():l.value===!0?[b(Ye,{to:i},b(vt,o))]:void 0}}const x=[];let q;function ht(e){q=e.keyCode===27}function gt(){q===!0&&(q=!1)}function yt(e){q===!0&&(q=!1,Ue(e,27)===!0&&x[x.length-1](e))}function Te(e){window[e]("keydown",ht),window[e]("blur",gt),window[e]("keyup",yt),q=!1}function bt(e){h.is.desktop===!0&&(x.push(e),x.length===1&&Te("addEventListener"))}function we(e){const t=x.indexOf(e);t!==-1&&(x.splice(t,1),x.length===0&&Te("removeEventListener"))}const E=[];function Se(e){E[E.length-1](e)}function xt(e){h.is.desktop===!0&&(E.push(e),E.length===1&&document.body.addEventListener("focusin",Se))}function pe(e){const t=E.indexOf(e);t!==-1&&(E.splice(t,1),E.length===0&&document.body.removeEventListener("focusin",Se))}let W=0;const Et={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},he={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]},Ft=ge({name:"QDialog",inheritAttrs:!1,props:{...it,...Je,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,backdropFilter:String,position:{type:String,default:"standard",validator:e=>["standard","top","bottom","left","right"].includes(e)}},emits:[...lt,"shake","click","escapeKey"],setup(e,{slots:t,emit:o,attrs:n}){const l=te(),u=F(null),i=F(!1),a=F(!1);let c=null,m=null,f,v;const w=k(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:P}=ft(),{registerTimeout:T}=Ze(),{registerTick:B,removeTick:L}=mt(),{transitionProps:V,transitionStyle:r}=et(e,()=>he[e.position][0],()=>he[e.position][1]),p=k(()=>r.value+(e.backdropFilter!==void 0?`;backdrop-filter:${e.backdropFilter};-webkit-backdrop-filter:${e.backdropFilter}`:"")),{showPortal:oe,hidePortal:ne,portalIsAccessible:ke,renderPortal:qe}=pt(l,u,ze,"dialog"),{hide:M}=st({showing:i,hideOnRouteChange:w,handleShow:Fe,handleHide:Be,processOnMount:!0}),{addToHistory:Pe,removeFromHistory:Le}=nt(i,M,w),Ce=k(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${Et[e.position]}`+(a.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),z=k(()=>i.value===!0&&e.seamless!==!0),He=k(()=>e.autoClose===!0?{onClick:Ve}:{}),_e=k(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${z.value===!0?"modal":"seamless"}`,n.class]);$(()=>e.maximized,s=>{i.value===!0&&Q(s)}),$(z,s=>{P(s),s===!0?(xt(R),bt(K)):(pe(R),we(K))});function Fe(s){Pe(),m=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,Q(e.maximized),oe(),a.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),B(C)):L(),T(()=>{if(l.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:d,bottom:S}=document.activeElement.getBoundingClientRect(),{innerHeight:le}=window,X=window.visualViewport!==void 0?window.visualViewport.height:le;d>0&&S>X/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-X,S>=le?1/0:Math.ceil(document.scrollingElement.scrollTop+S-X/2))),document.activeElement.scrollIntoView()}v=!0,u.value.click(),v=!1}oe(!0),a.value=!1,o("show",s)},e.transitionDuration)}function Be(s){L(),Le(),ie(!0),a.value=!0,ne(),m!==null&&(((s&&s.type.indexOf("key")===0?m.closest('[tabindex]:not([tabindex^="-"])'):void 0)||m).focus(),m=null),T(()=>{ne(!0),a.value=!1,o("hide",s)},e.transitionDuration)}function C(s){ot(()=>{let d=u.value;if(d!==null){if(s!==void 0){const S=d.querySelector(s);if(S!==null){S.focus({preventScroll:!0});return}}d.contains(document.activeElement)!==!0&&(d=d.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||d.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||d.querySelector("[autofocus], [data-autofocus]")||d,d.focus({preventScroll:!0}))}})}function A(s){s&&typeof s.focus=="function"?s.focus({preventScroll:!0}):C(),o("shake");const d=u.value;d!==null&&(d.classList.remove("q-animate--scale"),d.classList.add("q-animate--scale"),c!==null&&clearTimeout(c),c=setTimeout(()=>{c=null,u.value!==null&&(d.classList.remove("q-animate--scale"),C())},170))}function K(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&A():(o("escapeKey"),M()))}function ie(s){c!==null&&(clearTimeout(c),c=null),(s===!0||i.value===!0)&&(Q(!1),e.seamless!==!0&&(P(!1),pe(R),we(K))),s!==!0&&(m=null)}function Q(s){s===!0?f!==!0&&(W<1&&document.body.classList.add("q-body--dialog"),W++,f=!0):f===!0&&(W<2&&document.body.classList.remove("q-body--dialog"),W--,f=!1)}function Ve(s){v!==!0&&(M(s),o("click",s))}function Me(s){e.persistent!==!0&&e.noBackdropDismiss!==!0?M(s):e.noShake!==!0&&A()}function R(s){e.allowFocusOutside!==!0&&ke.value===!0&&Ne(u.value,s.target)!==!0&&C('[tabindex]:not([tabindex="-1"])')}Object.assign(l.proxy,{focus:C,shake:A,__updateRefocusTarget(s){m=s||null}}),ee(ie);function ze(){return b("div",{role:"dialog","aria-modal":z.value===!0?"true":"false",...n,class:_e.value},[b(ae,{name:"q-transition--fade",appear:!0},()=>z.value===!0?b("div",{class:"q-dialog__backdrop fixed-full",style:p.value,"aria-hidden":"true",tabindex:-1,onClick:Me}):null),b(ae,V.value,()=>i.value===!0?b("div",{ref:u,class:Ce.value,style:r.value,tabindex:-1,...He.value},Ge(t.default)):null)])}return qe}});export{Ft as Q,lt as a,st as b,nt as c,ft as d,ye as e,be as f,Pt as g,Lt as h,Ct as i,Ht as j,mt as k,pt as l,xt as m,we as n,_t as o,G as p,bt as q,pe as r,qt as s,it as u};