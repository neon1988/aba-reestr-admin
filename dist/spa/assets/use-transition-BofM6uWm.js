import{E as P,a as Q,at as f,g as q,f as a,c as A,r as g,i as E,o as M,h as s,ad as O,C as U,aL as W,w as x}from"./index-B6qH9XSO.js";function _(){let e=null;const n=q();function i(){e!==null&&(clearTimeout(e),e=null)}return P(i),Q(i),{removeTimeout:i,registerTimeout(r,o){i(),f(n)===!1&&(e=setTimeout(()=>{e=null,r()},o))}}}const G={ratio:[String,Number]};function J(e,n){return a(()=>{const i=Number(e.ratio||(n!==void 0?n.value:void 0));return isNaN(i)!==!0&&i>0?{paddingBottom:`${100/i}%`}:null})}const K=1.7778,X=A({name:"QImg",props:{...G,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:K},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:n,emit:i}){const r=g(e.initialRatio),o=J(e,r),S=q(),{registerTimeout:$,removeTimeout:h}=_(),{registerTimeout:L,removeTimeout:b}=_(),y=a(()=>e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null),N=a(()=>e.errorSrc!==void 0?{src:e.errorSrc,__qerror:!0}:null),l=[g(null),g(y.value)],u=g(0),d=g(!1),m=g(!1),z=a(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),k=a(()=>({width:e.width,height:e.height})),D=a(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition q-img__image--`),I=a(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));function R(){if(b(),e.loadingShowDelay===0){d.value=!0;return}L(()=>{d.value=!0},e.loadingShowDelay)}function T(){b(),d.value=!1}function B({target:t}){f(S)===!1&&(h(),r.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,w(t,1))}function w(t,c){c===1e3||f(S)===!0||(t.complete===!0?H(t):$(()=>{w(t,c+1)},50))}function H(t){f(S)!==!0&&(u.value=u.value^1,l[u.value].value=null,T(),t.getAttribute("__qerror")!=="true"&&(m.value=!1),i("load",t.currentSrc||t.src))}function j(t){h(),T(),m.value=!0,l[u.value].value=N.value,l[u.value^1].value=y.value,i("error",t)}function C(t){const c=l[t].value,v={key:"img_"+t,class:D.value,style:I.value,alt:e.alt,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...c};return u.value===t?Object.assign(v,{class:v.class+"current",onLoad:B,onError:j}):v.class+="loaded",s("div",{class:"q-img__container absolute-full",key:"img"+t},s("img",v))}function F(){return d.value===!1?s("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},U(n[m.value===!0?"error":"default"])):s("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},n.loading!==void 0?n.loading():e.noSpinner===!0?void 0:[s(W,{color:e.spinnerColor,size:e.spinnerSize})])}{let t=function(){x(()=>e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null,c=>{h(),m.value=!1,c===null?(T(),l[u.value^1].value=y.value):R(),l[u.value].value=c},{immediate:!0})};E.value===!0?M(t):t()}return()=>{const t=[];return o.value!==null&&t.push(s("div",{key:"filler",style:o.value})),l[0].value!==null&&t.push(C(0)),l[1].value!==null&&t.push(C(1)),t.push(s(O,{name:"q-transition--fade"},F)),s("div",{key:"main",class:z.value,style:k.value,role:"img","aria-label":e.alt},t)}}}),Y={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function Z(e,n=()=>{},i=()=>{}){return{transitionProps:a(()=>{const r=`q-transition--${e.transitionShow||n()}`,o=`q-transition--${e.transitionHide||i()}`;return{appear:!0,enterFromClass:`${r}-enter-from`,enterActiveClass:`${r}-enter-active`,enterToClass:`${r}-enter-to`,leaveFromClass:`${o}-leave-from`,leaveActiveClass:`${o}-leave-active`,leaveToClass:`${o}-leave-to`}}),transitionStyle:a(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}export{X as Q,Y as a,Z as b,G as c,J as d,_ as u};