import{a6 as o,O as p,r as i,k as h,_ as g,S as c,T as m,U as d,a3 as _,X as f,V as w,a7 as y}from"./index-B5fKhRmK.js";import{Q as C}from"./use-transition-4mtm_1Sm.js";import{I as v}from"./ImageFullscreen-Dk6LiqVP.js";const F=(r,a=1)=>o.get("/centers",{params:{status:r,page:a}}),j=r=>o.get(`/centers/${r}`),q=r=>o.put(`/centers/${r}/approve`),z=r=>o.put(`/centers/${r}/reject`),b=p({__name:"CenterPhoto",props:{center:{type:Object,required:!0},size:{type:String,default:"3rem"},fullscreen:{type:Boolean,default:!1},width:{type:Number||null,default:null},height:{type:Number||null,default:null},quality:{type:Number||null,default:null}},setup(r,{expose:a}){a();const e=r,t=i(!1),n=i(e.center.photo?.url||null),u=h(()=>{if(!n.value)return"";try{const l=new URL(n.value);return e.width&&l.searchParams.set("w",e.width.toString()),e.height&&l.searchParams.set("h",e.height.toString()),e.quality&&l.searchParams.set("q",e.quality.toString()),l.toString()}catch{}return n.value}),s={props:e,showFullscreen:t,url:n,computedImageUrl:u,ImageFullscreen:v};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}}),I=["src","alt"];function S(r,a,e,t,n,u){return c(),m(y,{size:e.size,rounded:"",onClick:a[1]||(a[1]=s=>t.url&&(t.showFullscreen=!0))},{default:d(()=>[t.url?(c(),_("img",{key:0,src:t.computedImageUrl,alt:e.center.name,class:"avatar-image"},null,8,I)):f("",!0),e.fullscreen&&t.url?(c(),m(t.ImageFullscreen,{key:1,show:t.showFullscreen,"onUpdate:show":a[0]||(a[0]=s=>t.showFullscreen=s)},{default:d(()=>[w(C,{src:t.url,"spinner-color":"primary","spinner-size":"82px",width:"100%",height:"100%",fit:"scale-down"},null,8,["src"])]),_:1},8,["show"])):f("",!0)]),_:1},8,["size"])}const B=g(b,[["render",S],["__scopeId","data-v-f2fa8c43"],["__file","CenterPhoto.vue"]]);export{B as C,j as a,q as b,F as g,z as r};
