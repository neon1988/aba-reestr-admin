import{c as X,k as v,h,F as he,b as Y,ay as pe,w as O,az as Re,o as Fe,g as W,e as de,aA as be,aB as je,t as x,l as E,C as Qe,aC as Ke,H as Pe,ao as I,r as S,i as Ue,au as fe,at as Xe,M as Ye,an as Ge,aD as Je,aE as Ze,aF as et,ak as tt,aG as ot,N as nt,_ as it,S as lt,T as rt,U as at,$ as le,aH as re,aI as st,V as ut,W as ct}from"./index-BWeAa12D.js";import{b as Se,c as dt,a as ft}from"./focus-manager-zjdVGI5d.js";const jt=X({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const o=v(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>h("div",{class:o.value},he(t.default))}});function mt(e,t,o){let n;function i(){n!==void 0&&(pe.remove(n),n=void 0)}return Y(()=>{e.value===!0&&i()}),{removeFromHistory:i,addToHistory(){n={condition:()=>o.value===!0,handler:t},pe.add(n)}}}const vt={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},gt=["beforeShow","show","beforeHide","hide"];function ht({showing:e,canShow:t,hideOnRouteChange:o,handleShow:n,handleHide:i,processOnMount:s}){const l=W(),{props:r,emit:d,proxy:w}=l;let f;function p(c){e.value===!0?b(c):m(c)}function m(c){if(r.disable===!0||c!==void 0&&c.qAnchorHandled===!0||t!==void 0&&t(c)!==!0)return;const _=r["onUpdate:modelValue"]!==void 0;_===!0&&(d("update:modelValue",!0),f=c,de(()=>{f===c&&(f=void 0)})),(r.modelValue===null||_===!1)&&y(c)}function y(c){e.value!==!0&&(e.value=!0,d("beforeShow",c),n!==void 0?n(c):d("show",c))}function b(c){if(r.disable===!0)return;const _=r["onUpdate:modelValue"]!==void 0;_===!0&&(d("update:modelValue",!1),f=c,de(()=>{f===c&&(f=void 0)})),(r.modelValue===null||_===!1)&&T(c)}function T(c){e.value!==!1&&(e.value=!1,d("beforeHide",c),i!==void 0?i(c):d("hide",c))}function k(c){r.disable===!0&&c===!0?r["onUpdate:modelValue"]!==void 0&&d("update:modelValue",!1):c===!0!==e.value&&(c===!0?y:T)(f)}O(()=>r.modelValue,k),o!==void 0&&Re(l)===!0&&O(()=>w.$route.fullPath,()=>{o.value===!0&&e.value===!0&&b()}),s===!0&&Fe(()=>{k(r.modelValue)});const F={show:m,hide:b,toggle:p};return Object.assign(w,F),F}const Qt=[Element,String],wt=[null,document,document.body,document.scrollingElement,document.documentElement];function Kt(e,t){let o=je(t);if(o===void 0){if(e==null)return window;o=e.closest(".scroll,.scroll-y,.overflow-auto")}return wt.includes(o)?window:o}function He(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function $e(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}function ze(e,t,o=0){const n=arguments[3]===void 0?performance.now():arguments[3],i=He(e);if(o<=0){i!==t&&me(e,t);return}requestAnimationFrame(s=>{const l=s-n,r=i+(t-i)/Math.max(l,o)*l;me(e,r),r!==t&&ze(e,t,o-l,s)})}function Ve(e,t,o=0){const n=arguments[3]===void 0?performance.now():arguments[3],i=$e(e);if(o<=0){i!==t&&ve(e,t);return}requestAnimationFrame(s=>{const l=s-n,r=i+(t-i)/Math.max(l,o)*l;ve(e,r),r!==t&&Ve(e,t,o-l,s)})}function me(e,t){if(e===window){window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,t);return}e.scrollTop=t}function ve(e,t){if(e===window){window.scrollTo(t,window.pageYOffset||window.scrollY||document.body.scrollTop||0);return}e.scrollLeft=t}function Ut(e,t,o){if(o){ze(e,t,o);return}me(e,t)}function Xt(e,t,o){if(o){Ve(e,t,o);return}ve(e,t)}let Q;function Yt(){if(Q!==void 0)return Q;const e=document.createElement("p"),t=document.createElement("div");be(e,{width:"100%",height:"200px"}),be(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const o=e.offsetWidth;t.style.overflow="scroll";let n=e.offsetWidth;return o===n&&(n=t.clientWidth),t.remove(),Q=o-n,Q}function yt(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let D=0,ae,se,A,ue=!1,_e,Te,qe,C=null;function pt(e){bt(e)&&Qe(e)}function bt(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=Ke(e),o=e.shiftKey&&!e.deltaX,n=!o&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),i=o||n?e.deltaY:e.deltaX;for(let s=0;s<t.length;s++){const l=t[s];if(yt(l,n))return n?i<0&&l.scrollTop===0?!0:i>0&&l.scrollTop+l.clientHeight===l.scrollHeight:i<0&&l.scrollLeft===0?!0:i>0&&l.scrollLeft+l.clientWidth===l.scrollWidth}return!0}function xe(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function K(e){ue!==!0&&(ue=!0,requestAnimationFrame(()=>{ue=!1;const{height:t}=e.target,{clientHeight:o,scrollTop:n}=document.scrollingElement;(A===void 0||t!==window.innerHeight)&&(A=o-t,document.scrollingElement.scrollTop=n),n>A&&(document.scrollingElement.scrollTop-=Math.ceil((n-A)/8))}))}function ke(e){const t=document.body,o=window.visualViewport!==void 0;if(e==="add"){const{overflowY:n,overflowX:i}=window.getComputedStyle(t);ae=$e(window),se=He(window),_e=t.style.left,Te=t.style.top,qe=window.location.href,t.style.left=`-${ae}px`,t.style.top=`-${se}px`,i!=="hidden"&&(i==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),n!=="hidden"&&(n==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,x.is.ios===!0&&(o===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",K,E.passiveCapture),window.visualViewport.addEventListener("scroll",K,E.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",xe,E.passiveCapture))}x.is.desktop===!0&&x.is.mac===!0&&window[`${e}EventListener`]("wheel",pt,E.notPassive),e==="remove"&&(x.is.ios===!0&&(o===!0?(window.visualViewport.removeEventListener("resize",K,E.passiveCapture),window.visualViewport.removeEventListener("scroll",K,E.passiveCapture)):window.removeEventListener("scroll",xe,E.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=_e,t.style.top=Te,window.location.href===qe&&window.scrollTo(ae,se),A=void 0)}function St(e){let t="add";if(e===!0){if(D++,C!==null){clearTimeout(C),C=null;return}if(D>1)return}else{if(D===0||(D--,D>0))return;if(t="remove",x.is.ios===!0&&x.is.nativeMobile===!0){C!==null&&clearTimeout(C),C=setTimeout(()=>{ke(t),C=null},100);return}}ke(t)}function _t(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,St(t))}}}function ge(){let e=null;const t=W();function o(){e!==null&&(clearTimeout(e),e=null)}return Pe(o),Y(o),{removeTimeout:o,registerTimeout(n,i){o(),I(t)===!1&&(e=setTimeout(()=>{e=null,n()},i))}}}const Ee=["B","KB","MB","GB","TB","PB"];function Gt(e,t=1){let o=0;for(;parseInt(e,10)>=1024&&o<Ee.length-1;)e/=1024,++o;return`${e.toFixed(t)}${Ee[o]}`}function Jt(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Zt(e,t,o){return o<=t?t:Math.min(o,Math.max(t,e))}function eo(e,t=2,o="0"){if(e==null)return e;const n=""+e;return n.length>=t?n:new Array(t-n.length+1).join(o)+n}const Tt={ratio:[String,Number]};function qt(e,t){return v(()=>{const o=Number(e.ratio||(t!==void 0?t.value:void 0));return isNaN(o)!==!0&&o>0?{paddingBottom:`${100/o}%`}:null})}const xt=1.7778,to=X({name:"QImg",props:{...Tt,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:xt},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:t,emit:o}){const n=S(e.initialRatio),i=qt(e,n),s=W(),{registerTimeout:l,removeTimeout:r}=ge(),{registerTimeout:d,removeTimeout:w}=ge(),f=v(()=>e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null),p=v(()=>e.errorSrc!==void 0?{src:e.errorSrc,__qerror:!0}:null),m=[S(null),S(f.value)],y=S(0),b=S(!1),T=S(!1),k=v(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),F=v(()=>({width:e.width,height:e.height})),c=v(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition q-img__image--`),_=v(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));function N(){if(w(),e.loadingShowDelay===0){b.value=!0;return}d(()=>{b.value=!0},e.loadingShowDelay)}function P(){w(),b.value=!1}function G({target:a}){I(s)===!1&&(r(),n.value=a.naturalHeight===0?.5:a.naturalWidth/a.naturalHeight,R(a,1))}function R(a,q){q===1e3||I(s)===!0||(a.complete===!0?H(a):l(()=>{R(a,q+1)},50))}function H(a){I(s)!==!0&&(y.value=y.value^1,m[y.value].value=null,P(),a.getAttribute("__qerror")!=="true"&&(T.value=!1),o("load",a.currentSrc||a.src))}function J(a){r(),P(),T.value=!0,m[y.value].value=p.value,m[y.value^1].value=f.value,o("error",a)}function j(a){const q=m[a].value,$={key:"img_"+a,class:c.value,style:_.value,alt:e.alt,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...q};return y.value===a?Object.assign($,{class:$.class+"current",onLoad:G,onError:J}):$.class+="loaded",h("div",{class:"q-img__container absolute-full",key:"img"+a},h("img",$))}function Z(){return b.value===!1?h("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},he(t[T.value===!0?"error":"default"])):h("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},t.loading!==void 0?t.loading():e.noSpinner===!0?void 0:[h(Xe,{color:e.spinnerColor,size:e.spinnerSize})])}{let a=function(){O(()=>e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null,q=>{r(),T.value=!1,q===null?(P(),m[y.value^1].value=f.value):N(),m[y.value].value=q},{immediate:!0})};Ue.value===!0?Fe(a):a()}return()=>{const a=[];return i.value!==null&&a.push(h("div",{key:"filler",style:i.value})),m[0].value!==null&&a.push(j(0)),m[1].value!==null&&a.push(j(1)),a.push(h(fe,{name:"q-transition--fade"},Z)),h("div",{key:"main",class:k.value,style:F.value,role:"img","aria-label":e.alt},a)}}});function kt(){let e;const t=W();function o(){e=void 0}return Pe(o),Y(o),{removeTick:o,registerTick(n){e=n,de(()=>{e===n&&(I(t)===!1&&e(),e=void 0)})}}}const Et={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function Ct(e,t=()=>{},o=()=>{}){return{transitionProps:v(()=>{const n=`q-transition--${e.transitionShow||t()}`,i=`q-transition--${e.transitionHide||o()}`;return{appear:!0,enterFromClass:`${n}-enter-from`,enterActiveClass:`${n}-enter-active`,enterToClass:`${n}-enter-to`,leaveFromClass:`${i}-leave-from`,leaveActiveClass:`${i}-leave-active`,leaveToClass:`${i}-leave-to`}}),transitionStyle:v(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}const ce=[],Bt=X({name:"QPortal",setup(e,{slots:t}){return()=>t.default()}});function Lt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Ft(e,t,o,n){const i=S(!1),s=S(!1);let l=null;const r={},d=Lt(e);function w(p){if(p===!0){Se(r),s.value=!0;return}s.value=!1,i.value===!1&&(d===!1&&l===null&&(l=Ze(!1,n)),i.value=!0,ce.push(e.proxy),dt(r))}function f(p){if(s.value=!1,p!==!0)return;Se(r),i.value=!1;const m=ce.indexOf(e.proxy);m!==-1&&ce.splice(m,1),l!==null&&(et(l),l=null)}return Ye(()=>{f(!0)}),e.proxy.__qPortal=!0,Ge(e.proxy,"contentEl",()=>t.value),{showPortal:w,hidePortal:f,portalIsActive:i,portalIsAccessible:s,renderPortal:()=>d===!0?o():i.value===!0?[h(Je,{to:l},h(Bt,o))]:void 0}}const B=[];let V;function Pt(e){V=e.keyCode===27}function Ht(){V===!0&&(V=!1)}function $t(e){V===!0&&(V=!1,tt(e,27)===!0&&B[B.length-1](e))}function Me(e){window[e]("keydown",Pt),window[e]("blur",Ht),window[e]("keyup",$t),V=!1}function zt(e){x.is.desktop===!0&&(B.push(e),B.length===1&&Me("addEventListener"))}function Ce(e){const t=B.indexOf(e);t!==-1&&(B.splice(t,1),B.length===0&&Me("removeEventListener"))}const L=[];function De(e){L[L.length-1](e)}function Vt(e){x.is.desktop===!0&&(L.push(e),L.length===1&&document.body.addEventListener("focusin",De))}function Be(e){const t=L.indexOf(e);t!==-1&&(L.splice(t,1),L.length===0&&document.body.removeEventListener("focusin",De))}let U=0;const Mt={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},Le={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]},Dt=X({name:"QDialog",inheritAttrs:!1,props:{...vt,...Et,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,backdropFilter:String,position:{type:String,default:"standard",validator:e=>["standard","top","bottom","left","right"].includes(e)}},emits:[...gt,"shake","click","escapeKey"],setup(e,{slots:t,emit:o,attrs:n}){const i=W(),s=S(null),l=S(!1),r=S(!1);let d=null,w=null,f,p;const m=v(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:y}=_t(),{registerTimeout:b}=ge(),{registerTick:T,removeTick:k}=kt(),{transitionProps:F,transitionStyle:c}=Ct(e,()=>Le[e.position][0],()=>Le[e.position][1]),_=v(()=>c.value+(e.backdropFilter!==void 0?`;backdrop-filter:${e.backdropFilter};-webkit-backdrop-filter:${e.backdropFilter}`:"")),{showPortal:N,hidePortal:P,portalIsAccessible:G,renderPortal:R}=Ft(i,s,Ne,"dialog"),{hide:H}=ht({showing:l,hideOnRouteChange:m,handleShow:Ae,handleHide:Ie,processOnMount:!0}),{addToHistory:J,removeFromHistory:j}=mt(l,H,m),Z=v(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${Mt[e.position]}`+(r.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),a=v(()=>l.value===!0&&e.seamless!==!0),q=v(()=>e.autoClose===!0?{onClick:Oe}:{}),$=v(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${a.value===!0?"modal":"seamless"}`,n.class]);O(()=>e.maximized,u=>{l.value===!0&&oe(u)}),O(a,u=>{y(u),u===!0?(Vt(ne),zt(te)):(Be(ne),Ce(te))});function Ae(u){J(),w=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,oe(e.maximized),N(),r.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),T(M)):k(),b(()=>{if(i.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:g,bottom:z}=document.activeElement.getBoundingClientRect(),{innerHeight:ye}=window,ie=window.visualViewport!==void 0?window.visualViewport.height:ye;g>0&&z>ie/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-ie,z>=ye?1/0:Math.ceil(document.scrollingElement.scrollTop+z-ie/2))),document.activeElement.scrollIntoView()}p=!0,s.value.click(),p=!1}N(!0),r.value=!1,o("show",u)},e.transitionDuration)}function Ie(u){k(),j(),we(!0),r.value=!0,P(),w!==null&&(((u&&u.type.indexOf("key")===0?w.closest('[tabindex]:not([tabindex^="-"])'):void 0)||w).focus(),w=null),b(()=>{P(!0),r.value=!1,o("hide",u)},e.transitionDuration)}function M(u){ft(()=>{let g=s.value;if(g!==null){if(u!==void 0){const z=g.querySelector(u);if(z!==null){z.focus({preventScroll:!0});return}}g.contains(document.activeElement)!==!0&&(g=g.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||g.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||g.querySelector("[autofocus], [data-autofocus]")||g,g.focus({preventScroll:!0}))}})}function ee(u){u&&typeof u.focus=="function"?u.focus({preventScroll:!0}):M(),o("shake");const g=s.value;g!==null&&(g.classList.remove("q-animate--scale"),g.classList.add("q-animate--scale"),d!==null&&clearTimeout(d),d=setTimeout(()=>{d=null,s.value!==null&&(g.classList.remove("q-animate--scale"),M())},170))}function te(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&ee():(o("escapeKey"),H()))}function we(u){d!==null&&(clearTimeout(d),d=null),(u===!0||l.value===!0)&&(oe(!1),e.seamless!==!0&&(y(!1),Be(ne),Ce(te))),u!==!0&&(w=null)}function oe(u){u===!0?f!==!0&&(U<1&&document.body.classList.add("q-body--dialog"),U++,f=!0):f===!0&&(U<2&&document.body.classList.remove("q-body--dialog"),U--,f=!1)}function Oe(u){p!==!0&&(H(u),o("click",u))}function We(u){e.persistent!==!0&&e.noBackdropDismiss!==!0?H(u):e.noShake!==!0&&ee()}function ne(u){e.allowFocusOutside!==!0&&G.value===!0&&ot(s.value,u.target)!==!0&&M('[tabindex]:not([tabindex="-1"])')}Object.assign(i.proxy,{focus:M,shake:ee,__updateRefocusTarget(u){w=u||null}}),Y(we);function Ne(){return h("div",{role:"dialog","aria-modal":a.value===!0?"true":"false",...n,class:$.value},[h(fe,{name:"q-transition--fade",appear:!0},()=>a.value===!0?h("div",{class:"q-dialog__backdrop fixed-full",style:_.value,"aria-hidden":"true",tabindex:-1,onClick:We}):null),h(fe,F.value,()=>l.value===!0?h("div",{ref:s,class:Z.value,style:c.value,tabindex:-1,...q.value},he(t.default)):null)])}return R}}),At=nt({__name:"ImageFullscreen",props:{show:{type:Boolean,required:!0}},emits:["update:show"],setup(e,{expose:t,emit:o}){t();const n=e,i=v(()=>n.show),s=o;function l(){s("update:show",!1)}const r={props:n,show:i,emit:s,closeFullscreen:l};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}}),It={class:"q-pa-lg absolute-top-right"},Ot={class:"q-pa-lg absolute-bottom-right"};function Wt(e,t,o,n,i,s){return lt(),rt(Dt,{modelValue:n.show,"onUpdate:modelValue":t[0]||(t[0]=l=>n.show=l),maximized:"","full-width":"","full-height":"",onKeydown:st(n.closeFullscreen,["esc"])},{default:at(()=>[le("div",{class:"fullscreen",style:{width:"100%",height:"100%",position:"relative"},onClick:n.closeFullscreen},[re(e.$slots,"default"),re(e.$slots,"top-right",{},()=>[le("div",It,[ut(ct,{icon:"close",color:"white",round:"","text-color":"black",onClick:n.closeFullscreen})])]),le("div",Ot,[re(e.$slots,"right-bottom")])])]),_:3},8,["modelValue"])}const oo=it(At,[["render",Wt],["__file","ImageFullscreen.vue"]]);export{oo as I,jt as Q,gt as a,ge as b,ht as c,mt as d,Zt as e,_t as f,Kt as g,He as h,$e as i,Ut as j,Xt as k,Yt as l,to as m,Jt as n,Gt as o,eo as p,Et as q,Ct as r,Qt as s,vt as u};
