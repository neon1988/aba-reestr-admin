import{Q as mt}from"./QChip-NOoku7Xo.js";import{i as yt,d as bt,a as Tt,c as At,e as St,j as Et,f as _e,b as Ot}from"./QInput-Cq_516xi.js";import{r as z,k as j,g as Ze,y as Ft,B as Je,s as $t,h as V,c as _t,aq as Ct,x as wt,aB as xt,L as Pt,ag as It}from"./index-B5fKhRmK.js";import{h as Lt}from"./format-DyQxkAtJ.js";import{i as H,b as be,S as B,a as U,d as K,g as ae,r as Q,o as Nt,e as jt,f as Dt,h as Mt,M as Te,j as Rt,s as Bt,k as Ut,l as X,m as Ae,n as Vt,t as W,p as ce,q as ke,u as Gt,v as ne,w as et,x as de,y as qt,z as zt,A as ee,B as tt,C as Kt,D as Wt,U as Ce,E as Yt,F as Ht,G as Qt,c as q,H as Xt,I as Zt,J as Jt,K as kt,L as ge,N as we,O as xe}from"./client-eJeKpGNL.js";function G(e,t,n,r){const i=[];return e.forEach(a=>{r(a)===!0?i.push(a):t.push({failedPropValidation:n,file:a})}),i}function Z(e){e&&e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),Je(e)}const en={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},tn=["rejected"];function nn({editable:e,dnd:t,getFileInput:n,addFilesToQueue:r}){const{props:i,emit:a,proxy:s}=Ze(),f=z(null),u=j(()=>i.accept!==void 0?i.accept.split(",").map(d=>(d=d.trim(),d==="*"?"*/":(d.endsWith("/*")&&(d=d.slice(0,d.length-1)),d.toUpperCase()))):null),h=j(()=>parseInt(i.maxFiles,10)),g=j(()=>parseInt(i.maxTotalSize,10));function o(d){if(e.value)if(d!==Object(d)&&(d={target:null}),d.target!==null&&d.target.matches('input[type="file"]')===!0)d.clientX===0&&d.clientY===0&&Ft(d);else{const w=n();w&&w!==d.target&&w.click(d)}}function p(d){e.value&&d&&r(null,d)}function T(d,w,P,x){let v=Array.from(w||d.target.files);const F=[],I=()=>{F.length!==0&&a("rejected",F)};if(i.accept!==void 0&&u.value.indexOf("*/")===-1&&(v=G(v,F,"accept",A=>u.value.some($=>A.type.toUpperCase().startsWith($)||A.name.toUpperCase().endsWith($))),v.length===0))return I();if(i.maxFileSize!==void 0){const A=parseInt(i.maxFileSize,10);if(v=G(v,F,"max-file-size",$=>$.size<=A),v.length===0)return I()}if(i.multiple!==!0&&v.length!==0&&(v=[v[0]]),v.forEach(A=>{A.__key=A.webkitRelativePath+A.lastModified+A.name+A.size}),x===!0){const A=P.map($=>$.__key);v=G(v,F,"duplicate",$=>A.includes($.__key)===!1)}if(v.length===0)return I();if(i.maxTotalSize!==void 0){let A=x===!0?P.reduce(($,l)=>$+l.size,0):0;if(v=G(v,F,"max-total-size",$=>(A+=$.size,A<=g.value)),v.length===0)return I()}if(typeof i.filter=="function"){const A=i.filter(v);v=G(v,F,"filter",$=>A.includes($))}if(i.maxFiles!==void 0){let A=x===!0?P.length:0;if(v=G(v,F,"max-files",()=>(A++,A<=h.value)),v.length===0)return I()}if(I(),v.length!==0)return v}function C(d){Z(d),t.value!==!0&&(t.value=!0)}function m(d){Je(d),(d.relatedTarget!==null||$t.is.safari!==!0?d.relatedTarget!==f.value:document.elementsFromPoint(d.clientX,d.clientY).includes(f.value)===!1)===!0&&(t.value=!1)}function O(d){Z(d);const w=d.dataTransfer.files;w.length!==0&&r(null,w),t.value=!1}function E(d){if(t.value===!0)return V("div",{ref:f,class:`q-${d}__dnd absolute-full`,onDragenter:Z,onDragover:Z,onDragleave:m,onDrop:O})}return Object.assign(s,{pickFiles:o,addFiles:p}),{pickFiles:o,addFiles:p,onDragover:C,onDragleave:m,processFiles:T,getDndNode:E,maxFilesNumber:h,maxTotalSizeNumber:g}}const ki=_t({name:"QFile",inheritAttrs:!1,props:{...yt,...bt,...en,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...Tt,...tn],setup(e,{slots:t,emit:n,attrs:r}){const{proxy:i}=Ze(),a=At(),s=z(null),f=z(!1),u=St(e),{pickFiles:h,onDragover:g,onDragleave:o,processFiles:p,getDndNode:T}=nn({editable:a.editable,dnd:f,getFileInput:c,addFilesToQueue:y}),C=Et(e),m=j(()=>Object(e.modelValue)===e.modelValue?"length"in e.modelValue?Array.from(e.modelValue):[e.modelValue]:[]),O=j(()=>_e(m.value)),E=j(()=>m.value.map(b=>b.name).join(", ")),d=j(()=>Lt(m.value.reduce((b,N)=>b+N.size,0))),w=j(()=>({totalSize:d.value,filesNumber:m.value.length,maxFiles:e.maxFiles})),P=j(()=>({tabindex:-1,type:"file",title:"",accept:e.accept,capture:e.capture,name:u.value,...r,id:a.targetUid.value,disabled:a.editable.value!==!0})),x=j(()=>"q-file q-field--auto-height"+(f.value===!0?" q-file--dnd":"")),v=j(()=>e.multiple===!0&&e.append===!0);function F(b){const N=m.value.slice();N.splice(b,1),A(N)}function I(b){const N=m.value.indexOf(b);N!==-1&&F(N)}function A(b){n("update:modelValue",e.multiple===!0?b:b[0])}function $(b){b.keyCode===13&&wt(b)}function l(b){(b.keyCode===13||b.keyCode===32)&&h(b)}function c(){return s.value}function y(b,N){const M=p(b,N,m.value,v.value),ue=c();ue!=null&&(ue.value=""),M!==void 0&&((e.multiple===!0?e.modelValue&&M.every(ht=>m.value.includes(ht)):e.modelValue===M[0])||A(v.value===!0?m.value.concat(M):M))}function S(){return[V("input",{class:[e.inputClass,"q-file__filler"],style:e.inputStyle})]}function R(){if(t.file!==void 0)return m.value.length===0?S():m.value.map((N,M)=>t.file({index:M,file:N,ref:this}));if(t.selected!==void 0)return m.value.length===0?S():t.selected({files:m.value,ref:this});if(e.useChips===!0)return m.value.length===0?S():m.value.map((N,M)=>V(mt,{key:"file-"+M,removable:a.editable.value,dense:!0,textColor:e.color,tabindex:e.tabindex,onRemove:()=>{F(M)}},()=>V("span",{class:"ellipsis",textContent:N.name})));const b=e.displayValue!==void 0?e.displayValue:E.value;return b.length!==0?[V("div",{class:e.inputClass,style:e.inputStyle,textContent:b})]:S()}function L(){const b={ref:s,...P.value,...C.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:y};return e.multiple===!0&&(b.multiple=!0),V("input",b)}return Object.assign(a,{fieldClass:x,emitValue:A,hasValue:O,inputRef:s,innerValue:m,floatingLabel:j(()=>O.value===!0||_e(e.displayValue)),computedCounter:j(()=>{if(e.counterLabel!==void 0)return e.counterLabel(w.value);const b=e.maxFiles;return`${m.value.length}${b!==void 0?" / "+b:""} (${d.value})`}),getControlChild:()=>T("file"),getControl:()=>{const b={ref:a.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:e.tabindex};return a.editable.value===!0&&Object.assign(b,{onDragover:g,onDragleave:o,onKeydown:$,onKeyup:l}),V("div",b,[L()].concat(R()))}}),Object.assign(i,{removeAtIndex:F,removeFile:I,getNativeElement:()=>s.value}),Ct(i,"nativeEl",()=>s.value),Ot(a)}});var rn="[object Symbol]";function oe(e){return typeof e=="symbol"||H(e)&&be(e)==rn}function nt(e,t){for(var n=-1,r=e==null?0:e.length,i=Array(r);++n<r;)i[n]=t(e[n],n,e);return i}var an=1/0,Pe=B?B.prototype:void 0,Ie=Pe?Pe.toString:void 0;function rt(e){if(typeof e=="string")return e;if(U(e))return nt(e,rt)+"";if(oe(e))return Ie?Ie.call(e):"";var t=e+"";return t=="0"&&1/e==-an?"-0":t}var on=/\s/;function sn(e){for(var t=e.length;t--&&on.test(e.charAt(t)););return t}var un=/^\s+/;function ln(e){return e&&e.slice(0,sn(e)+1).replace(un,"")}var Le=NaN,fn=/^[-+]0x[0-9a-f]+$/i,cn=/^0b[01]+$/i,dn=/^0o[0-7]+$/i,gn=parseInt;function Ne(e){if(typeof e=="number")return e;if(oe(e))return Le;if(K(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=K(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=ln(e);var n=cn.test(e);return n||dn.test(e)?gn(e.slice(2),n?2:8):fn.test(e)?Le:+e}var ve=ae(Q,"WeakMap");function vn(e,t){for(var n=-1,r=e==null?0:e.length;++n<r&&t(e[n],n,e)!==!1;);return e}var pn=Nt(Object.keys,Object),hn=Object.prototype,mn=hn.hasOwnProperty;function yn(e){if(!jt(e))return pn(e);var t=[];for(var n in Object(e))mn.call(e,n)&&n!="constructor"&&t.push(n);return t}function Se(e){return Dt(e)?Mt(e):yn(e)}var bn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Tn=/^\w*$/;function An(e,t){if(U(e))return!1;var n=typeof e;return n=="number"||n=="symbol"||n=="boolean"||e==null||oe(e)?!0:Tn.test(e)||!bn.test(e)||t!=null&&e in Object(t)}var Sn="Expected a function";function Ee(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw new TypeError(Sn);var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],a=n.cache;if(a.has(i))return a.get(i);var s=e.apply(this,r);return n.cache=a.set(i,s)||a,s};return n.cache=new(Ee.Cache||Te),n}Ee.Cache=Te;var En=500;function On(e){var t=Ee(e,function(r){return n.size===En&&n.clear(),r}),n=t.cache;return t}var Fn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,$n=/\\(\\)?/g,_n=On(function(e){var t=[];return e.charCodeAt(0)===46&&t.push(""),e.replace(Fn,function(n,r,i,a){t.push(i?a.replace($n,"$1"):r||n)}),t});function Cn(e){return e==null?"":rt(e)}function se(e,t){return U(e)?e:An(e,t)?[e]:_n(Cn(e))}var wn=1/0;function Oe(e){if(typeof e=="string"||oe(e))return e;var t=e+"";return t=="0"&&1/e==-wn?"-0":t}function it(e,t){t=se(t,e);for(var n=0,r=t.length;e!=null&&n<r;)e=e[Oe(t[n++])];return n&&n==r?e:void 0}function re(e,t,n){var r=e==null?void 0:it(e,t);return r===void 0?n:r}function Fe(e,t){for(var n=-1,r=t.length,i=e.length;++n<r;)e[i+n]=t[n];return e}var je=B?B.isConcatSpreadable:void 0;function xn(e){return U(e)||Rt(e)||!!(je&&e&&e[je])}function Pn(e,t,n,r,i){var a=-1,s=e.length;for(n||(n=xn),i||(i=[]);++a<s;){var f=e[a];n(f)?Fe(i,f):i[i.length]=f}return i}function In(e){var t=e==null?0:e.length;return t?Pn(e):[]}function Ln(e){return Bt(Ut(e,void 0,In),e+"")}function Nn(e,t,n){var r=-1,i=e.length;t<0&&(t=-t>i?0:i+t),n=n>i?i:n,n<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var a=Array(i);++r<i;)a[r]=e[r+t];return a}function jn(e,t){return e&&X(t,Se(t),e)}function Dn(e,t){return e&&X(t,Ae(t),e)}function Mn(e,t){for(var n=-1,r=e==null?0:e.length,i=0,a=[];++n<r;){var s=e[n];t(s,n,e)&&(a[i++]=s)}return a}function at(){return[]}var Rn=Object.prototype,Bn=Rn.propertyIsEnumerable,De=Object.getOwnPropertySymbols,$e=De?function(e){return e==null?[]:(e=Object(e),Mn(De(e),function(t){return Bn.call(e,t)}))}:at;function Un(e,t){return X(e,$e(e),t)}var Vn=Object.getOwnPropertySymbols,ot=Vn?function(e){for(var t=[];e;)Fe(t,$e(e)),e=Vt(e);return t}:at;function Gn(e,t){return X(e,ot(e),t)}function st(e,t,n){var r=t(e);return U(e)?r:Fe(r,n(e))}function pe(e){return st(e,Se,$e)}function ut(e){return st(e,Ae,ot)}var he=ae(Q,"DataView"),me=ae(Q,"Promise"),ye=ae(Q,"Set"),Me="[object Map]",qn="[object Object]",Re="[object Promise]",Be="[object Set]",Ue="[object WeakMap]",Ve="[object DataView]",zn=W(he),Kn=W(ce),Wn=W(me),Yn=W(ye),Hn=W(ve),D=be;(he&&D(new he(new ArrayBuffer(1)))!=Ve||ce&&D(new ce)!=Me||me&&D(me.resolve())!=Re||ye&&D(new ye)!=Be||ve&&D(new ve)!=Ue)&&(D=function(e){var t=be(e),n=t==qn?e.constructor:void 0,r=n?W(n):"";if(r)switch(r){case zn:return Ve;case Kn:return Me;case Wn:return Re;case Yn:return Be;case Hn:return Ue}return t});var Qn=Object.prototype,Xn=Qn.hasOwnProperty;function Zn(e){var t=e.length,n=new e.constructor(t);return t&&typeof e[0]=="string"&&Xn.call(e,"index")&&(n.index=e.index,n.input=e.input),n}function Jn(e,t){var n=t?ke(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}var kn=/\w*$/;function er(e){var t=new e.constructor(e.source,kn.exec(e));return t.lastIndex=e.lastIndex,t}var Ge=B?B.prototype:void 0,qe=Ge?Ge.valueOf:void 0;function tr(e){return qe?Object(qe.call(e)):{}}var nr="[object Boolean]",rr="[object Date]",ir="[object Map]",ar="[object Number]",or="[object RegExp]",sr="[object Set]",ur="[object String]",lr="[object Symbol]",fr="[object ArrayBuffer]",cr="[object DataView]",dr="[object Float32Array]",gr="[object Float64Array]",vr="[object Int8Array]",pr="[object Int16Array]",hr="[object Int32Array]",mr="[object Uint8Array]",yr="[object Uint8ClampedArray]",br="[object Uint16Array]",Tr="[object Uint32Array]";function Ar(e,t,n){var r=e.constructor;switch(t){case fr:return ke(e);case nr:case rr:return new r(+e);case cr:return Jn(e,n);case dr:case gr:case vr:case pr:case hr:case mr:case yr:case br:case Tr:return Gt(e,n);case ir:return new r;case ar:case ur:return new r(e);case or:return er(e);case sr:return new r;case lr:return tr(e)}}var Sr="[object Map]";function Er(e){return H(e)&&D(e)==Sr}var ze=ne&&ne.isMap,Or=ze?et(ze):Er,Fr="[object Set]";function $r(e){return H(e)&&D(e)==Fr}var Ke=ne&&ne.isSet,_r=Ke?et(Ke):$r,Cr=1,wr=2,xr=4,lt="[object Arguments]",Pr="[object Array]",Ir="[object Boolean]",Lr="[object Date]",Nr="[object Error]",ft="[object Function]",jr="[object GeneratorFunction]",Dr="[object Map]",Mr="[object Number]",ct="[object Object]",Rr="[object RegExp]",Br="[object Set]",Ur="[object String]",Vr="[object Symbol]",Gr="[object WeakMap]",qr="[object ArrayBuffer]",zr="[object DataView]",Kr="[object Float32Array]",Wr="[object Float64Array]",Yr="[object Int8Array]",Hr="[object Int16Array]",Qr="[object Int32Array]",Xr="[object Uint8Array]",Zr="[object Uint8ClampedArray]",Jr="[object Uint16Array]",kr="[object Uint32Array]",_={};_[lt]=_[Pr]=_[qr]=_[zr]=_[Ir]=_[Lr]=_[Kr]=_[Wr]=_[Yr]=_[Hr]=_[Qr]=_[Dr]=_[Mr]=_[ct]=_[Rr]=_[Br]=_[Ur]=_[Vr]=_[Xr]=_[Zr]=_[Jr]=_[kr]=!0;_[Nr]=_[ft]=_[Gr]=!1;function Y(e,t,n,r,i,a){var s,f=t&Cr,u=t&wr,h=t&xr;if(n&&(s=i?n(e,r,i,a):n(e)),s!==void 0)return s;if(!K(e))return e;var g=U(e);if(g){if(s=Zn(e),!f)return Kt(e,s)}else{var o=D(e),p=o==ft||o==jr;if(de(e))return qt(e,f);if(o==ct||o==lt||p&&!i){if(s=u||p?{}:zt(e),!f)return u?Gn(e,Dn(s,e)):Un(e,jn(s,e))}else{if(!_[o])return i?e:{};s=Ar(e,o,f)}}a||(a=new ee);var T=a.get(e);if(T)return T;a.set(e,s),_r(e)?e.forEach(function(O){s.add(Y(O,t,n,O,e,a))}):Or(e)&&e.forEach(function(O,E){s.set(E,Y(O,t,n,E,e,a))});var C=h?u?ut:pe:u?Ae:Se,m=g?void 0:C(e);return vn(m||e,function(O,E){m&&(E=O,O=e[E]),tt(s,E,Y(O,t,n,E,e,a))}),s}var ei=1,ti=4;function J(e){return Y(e,ei|ti)}var ni="__lodash_hash_undefined__";function ri(e){return this.__data__.set(e,ni),this}function ii(e){return this.__data__.has(e)}function ie(e){var t=-1,n=e==null?0:e.length;for(this.__data__=new Te;++t<n;)this.add(e[t])}ie.prototype.add=ie.prototype.push=ri;ie.prototype.has=ii;function ai(e,t){for(var n=-1,r=e==null?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}function oi(e,t){return e.has(t)}var si=1,ui=2;function dt(e,t,n,r,i,a){var s=n&si,f=e.length,u=t.length;if(f!=u&&!(s&&u>f))return!1;var h=a.get(e),g=a.get(t);if(h&&g)return h==t&&g==e;var o=-1,p=!0,T=n&ui?new ie:void 0;for(a.set(e,t),a.set(t,e);++o<f;){var C=e[o],m=t[o];if(r)var O=s?r(m,C,o,t,e,a):r(C,m,o,e,t,a);if(O!==void 0){if(O)continue;p=!1;break}if(T){if(!ai(t,function(E,d){if(!oi(T,d)&&(C===E||i(C,E,n,r,a)))return T.push(d)})){p=!1;break}}else if(!(C===m||i(C,m,n,r,a))){p=!1;break}}return a.delete(e),a.delete(t),p}function li(e){var t=-1,n=Array(e.size);return e.forEach(function(r,i){n[++t]=[i,r]}),n}function fi(e){var t=-1,n=Array(e.size);return e.forEach(function(r){n[++t]=r}),n}var ci=1,di=2,gi="[object Boolean]",vi="[object Date]",pi="[object Error]",hi="[object Map]",mi="[object Number]",yi="[object RegExp]",bi="[object Set]",Ti="[object String]",Ai="[object Symbol]",Si="[object ArrayBuffer]",Ei="[object DataView]",We=B?B.prototype:void 0,le=We?We.valueOf:void 0;function Oi(e,t,n,r,i,a,s){switch(n){case Ei:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case Si:return!(e.byteLength!=t.byteLength||!a(new Ce(e),new Ce(t)));case gi:case vi:case mi:return Wt(+e,+t);case pi:return e.name==t.name&&e.message==t.message;case yi:case Ti:return e==t+"";case hi:var f=li;case bi:var u=r&ci;if(f||(f=fi),e.size!=t.size&&!u)return!1;var h=s.get(e);if(h)return h==t;r|=di,s.set(e,t);var g=dt(f(e),f(t),r,i,a,s);return s.delete(e),g;case Ai:if(le)return le.call(e)==le.call(t)}return!1}var Fi=1,$i=Object.prototype,_i=$i.hasOwnProperty;function Ci(e,t,n,r,i,a){var s=n&Fi,f=pe(e),u=f.length,h=pe(t),g=h.length;if(u!=g&&!s)return!1;for(var o=u;o--;){var p=f[o];if(!(s?p in t:_i.call(t,p)))return!1}var T=a.get(e),C=a.get(t);if(T&&C)return T==t&&C==e;var m=!0;a.set(e,t),a.set(t,e);for(var O=s;++o<u;){p=f[o];var E=e[p],d=t[p];if(r)var w=s?r(d,E,p,t,e,a):r(E,d,p,e,t,a);if(!(w===void 0?E===d||i(E,d,n,r,a):w)){m=!1;break}O||(O=p=="constructor")}if(m&&!O){var P=e.constructor,x=t.constructor;P!=x&&"constructor"in e&&"constructor"in t&&!(typeof P=="function"&&P instanceof P&&typeof x=="function"&&x instanceof x)&&(m=!1)}return a.delete(e),a.delete(t),m}var wi=1,Ye="[object Arguments]",He="[object Array]",k="[object Object]",xi=Object.prototype,Qe=xi.hasOwnProperty;function Pi(e,t,n,r,i,a){var s=U(e),f=U(t),u=s?He:D(e),h=f?He:D(t);u=u==Ye?k:u,h=h==Ye?k:h;var g=u==k,o=h==k,p=u==h;if(p&&de(e)){if(!de(t))return!1;s=!0,g=!1}if(p&&!g)return a||(a=new ee),s||Yt(e)?dt(e,t,n,r,i,a):Oi(e,t,u,n,r,i,a);if(!(n&wi)){var T=g&&Qe.call(e,"__wrapped__"),C=o&&Qe.call(t,"__wrapped__");if(T||C){var m=T?e.value():e,O=C?t.value():t;return a||(a=new ee),i(m,O,n,r,a)}}return p?(a||(a=new ee),Ci(e,t,n,r,i,a)):!1}function gt(e,t,n,r,i){return e===t?!0:e==null||t==null||!H(e)&&!H(t)?e!==e&&t!==t:Pi(e,t,n,r,gt,i)}var fe=function(){return Q.Date.now()},Ii="Expected a function",Li=Math.max,Ni=Math.min;function ji(e,t,n){var r,i,a,s,f,u,h=0,g=!1,o=!1,p=!0;if(typeof e!="function")throw new TypeError(Ii);t=Ne(t)||0,K(n)&&(g=!!n.leading,o="maxWait"in n,a=o?Li(Ne(n.maxWait)||0,t):a,p="trailing"in n?!!n.trailing:p);function T(v){var F=r,I=i;return r=i=void 0,h=v,s=e.apply(I,F),s}function C(v){return h=v,f=setTimeout(E,t),g?T(v):s}function m(v){var F=v-u,I=v-h,A=t-F;return o?Ni(A,a-I):A}function O(v){var F=v-u,I=v-h;return u===void 0||F>=t||F<0||o&&I>=a}function E(){var v=fe();if(O(v))return d(v);f=setTimeout(E,m(v))}function d(v){return f=void 0,p&&r?T(v):(r=i=void 0,s)}function w(){f!==void 0&&clearTimeout(f),h=0,r=u=i=f=void 0}function P(){return f===void 0?s:d(fe())}function x(){var v=fe(),F=O(v);if(r=arguments,i=this,u=v,F){if(f===void 0)return C(u);if(o)return clearTimeout(f),f=setTimeout(E,t),T(u)}return f===void 0&&(f=setTimeout(E,t)),s}return x.cancel=w,x.flush=P,x}function Di(e){var t=e==null?0:e.length;return t?e[t-1]:void 0}function Mi(e,t){return t.length<2?e:it(e,Nn(t,0,-1))}function Ri(e,t){return gt(e,t)}function Bi(e,t){return t=se(t,e),e=Mi(e,t),e==null||delete e[Oe(Di(t))]}function Ui(e){return Ht(e)?void 0:e}var Vi=1,Gi=2,qi=4,Xe=Ln(function(e,t){var n={};if(e==null)return n;var r=!1;t=nt(t,function(a){return a=se(a,e),r||(r=a.length>1),a}),X(e,ut(e),n),r&&(n=Y(n,Vi|Gi|qi,Ui));for(var i=t.length;i--;)Bi(n,t[i]);return n});function zi(e,t,n,r){if(!K(e))return e;t=se(t,e);for(var i=-1,a=t.length,s=a-1,f=e;f!=null&&++i<a;){var u=Oe(t[i]),h=n;if(u==="__proto__"||u==="constructor"||u==="prototype")return e;if(i!=s){var g=f[u];h=void 0,h===void 0&&(h=K(g)?g:Qt(t[i+1])?[]:{})}tt(f,u,h),f=f[u]}return e}function vt(e,t,n){return e==null?e:zi(e,t,n)}const Ki=(e,t={})=>{const n={errorsChanged:[],touchedChanged:[],validatingChanged:[],validatedChanged:[]};let r=!1,i=!1;const a=l=>l!==i?(i=l,n.validatingChanged):[];let s=[];const f=l=>{const c=[...new Set(l)];return s.length!==c.length||!c.every(y=>s.includes(y))?(s=c,n.validatedChanged):[]},u=()=>s.filter(l=>typeof o[l]>"u");let h=[];const g=l=>{const c=[...new Set(l)];return h.length!==c.length||!c.every(y=>h.includes(y))?(h=c,n.touchedChanged):[]};let o={};const p=l=>{const c=Yi(l);return Ri(o,c)?[]:(o=c,n.errorsChanged)},T=l=>{const c={...o};return delete c[te(l)],p(c)},C=()=>Object.keys(o).length>0;let m=1500;const O=l=>{m=l,v.cancel(),v=x()};let E=t,d=null,w=[],P=null;const x=()=>ji(l=>{e({get:(c,y={},S={})=>q.get(c,A(y),F(S,l,y)),post:(c,y={},S={})=>q.post(c,A(y),F(S,l,y)),patch:(c,y={},S={})=>q.patch(c,A(y),F(S,l,y)),put:(c,y={},S={})=>q.put(c,A(y),F(S,l,y)),delete:(c,y={},S={})=>q.delete(c,A(y),F(S,l,y))}).catch(c=>Xt(c)||Zt(c)&&c.response?.status===422?null:Promise.reject(c))},m,{leading:!0,trailing:!0});let v=x();const F=(l,c,y={})=>{const S={...l,...c},R=Array.from(S.validate??h);return{...c,...Jt(l,c),validate:R,timeout:S.timeout??5e3,onValidationError:(L,b)=>([...f([...s,...R]),...p(kt(Xe({...o},R),L.data.errors))].forEach(N=>N()),S.onValidationError?S.onValidationError(L,b):Promise.reject(b)),onSuccess:L=>(f([...s,...R]).forEach(b=>b()),S.onSuccess?S.onSuccess(L):L),onPrecognitionSuccess:L=>([...f([...s,...R]),...p(Xe({...o},R))].forEach(b=>b()),S.onPrecognitionSuccess?S.onPrecognitionSuccess(L):L),onBefore:()=>S.onBeforeValidation&&S.onBeforeValidation({data:y,touched:h},{data:E,touched:w})===!1||(S.onBefore||(()=>!0))()===!1?!1:(P=h,d=y,!0),onStart:()=>{a(!0).forEach(L=>L()),(S.onStart??(()=>null))()},onFinish:()=>{a(!1).forEach(L=>L()),w=P,E=d,P=d=null,(S.onFinish??(()=>null))()}}},I=(l,c,y)=>{if(typeof l>"u"){v(y??{});return}if(ge(c)&&!r){console.warn('Precognition file validation is not active. Call the "validateFiles" function on your form to enable it.');return}l=te(l),re(E,l)!==c&&(g([l,...h]).forEach(S=>S()),v(y??{}))},A=l=>r===!1?pt(l):l,$={touched:()=>h,validate(l,c,y){return typeof l=="object"&&!("target"in l)&&(y=l,l=c=void 0),I(l,c,y),$},touch(l){const c=Array.isArray(l)?l:[te(l)];return g([...h,...c]).forEach(y=>y()),$},validating:()=>i,valid:u,errors:()=>o,hasErrors:C,setErrors(l){return p(l).forEach(c=>c()),$},forgetError(l){return T(l).forEach(c=>c()),$},reset(...l){if(l.length===0)g([]).forEach(c=>c());else{const c=[...h];l.forEach(y=>{c.includes(y)&&c.splice(c.indexOf(y),1),vt(E,y,re(t,y))}),g(c).forEach(y=>y())}return $},setTimeout(l){return O(l),$},on(l,c){return n[l].push(c),$},validateFiles(){return r=!0,$}};return $},Wi=e=>Object.keys(e).reduce((t,n)=>({...t,[n]:Array.isArray(e[n])?e[n][0]:e[n]}),{}),Yi=e=>Object.keys(e).reduce((t,n)=>({...t,[n]:typeof e[n]=="string"?[e[n]]:e[n]}),{}),te=e=>typeof e!="string"?e.target.name:e,pt=e=>{const t={...e};return Object.keys(t).forEach(n=>{const r=t[n];if(r!==null){if(ge(r)){delete t[n];return}if(Array.isArray(r)){t[n]=r.filter(i=>!ge(i));return}if(typeof r=="object"){t[n]=pt(t[n]);return}}}),t},ea=(e,t,n,r={})=>{const i=J(n),a=Object.keys(i),s=z([]),f=z([]),u=Ki(o=>o[we(e)](xe(t),g.data(),r),i).on("validatingChanged",()=>{g.validating=u.validating()}).on("validatedChanged",()=>{s.value=u.valid()}).on("touchedChanged",()=>{f.value=u.touched()}).on("errorsChanged",()=>{g.hasErrors=u.hasErrors(),g.errors=Wi(u.errors()),s.value=u.valid()}),h=o=>({...o,precognitive:!1,onStart:()=>{g.processing=!0,(o.onStart??(()=>null))()},onFinish:()=>{g.processing=!1,(o.onFinish??(()=>null))()},onValidationError:(p,T)=>(u.setErrors(p.data.errors),o.onValidationError?o.onValidationError(p):Promise.reject(T))});let g={...J(i),data(){const o=J(xt(g));return a.reduce((p,T)=>({...p,[T]:o[T]}),{})},setData(o){return Object.keys(o).forEach(p=>{g[p]=o[p]}),g},touched(o){return f.value.includes(o)},touch(o){return u.touch(o),g},validate(o,p){return typeof o=="object"&&!("target"in o)&&(p=o,o=void 0),typeof o>"u"?u.validate(p):(o=te(o),u.validate(o,re(g.data(),o),p)),g},validating:!1,valid(o){return s.value.includes(o)},invalid(o){return typeof g.errors[o]<"u"},errors:{},hasErrors:!1,setErrors(o){return u.setErrors(o),g},forgetError(o){return u.forgetError(o),g},reset(...o){const p=J(i);return o.length===0?a.forEach(T=>g[T]=p[T]):o.forEach(T=>vt(g,T,re(p,T))),u.reset(...o),g},setValidationTimeout(o){return u.setTimeout(o),g},processing:!1,async submit(o={}){return q[we(e)](xe(t),g.data(),h(o))},validateFiles(){return u.validateFiles(),g},validator(){return u}};return g=Pt(g),g},ta=(e,t="info")=>{It.create({message:e,color:t==="success"?"green":t==="negative"?"red":"blue",position:"top",timeout:3e3,actions:[{label:"Закрыть",color:"white",handler:()=>{}}]})};function na(e){let t="";return Object.entries(e.errors).forEach(([,r])=>{t+=`<li>${r}</li>`}),{opts:z({color:"red",textColor:"white",icon:"error",message:`<ul class="q-ma-none q-pa-sm">${t}</ul>`,caption:e.message,html:!0})}}export{ki as Q,ta as a,na as b,ea as u};
