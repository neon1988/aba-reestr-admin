import{Q as d}from"./use-transition-BofM6uWm.js";import{M as h,r as i,f as p,_,Q as u,R as c,S as m,a1 as g,V as f,T as w,a4 as y}from"./index-B6qH9XSO.js";import{I as S}from"./ImageFullscreen-B6FQkzyS.js";const v=h({__name:"SpecialistPhoto",props:{specialist:{type:Object,required:!0},size:{type:String,default:"3rem"},fullscreen:{type:Boolean,default:!1},width:{type:Number||null,default:null},height:{type:Number||null,default:null},quality:{type:Number||null,default:null}},setup(n,{expose:r}){r();const e=n,t=i(!1),l=i(e.specialist.photo?.url||null),o=p(()=>{if(!l.value)return"";try{const s=new URL(l.value);return e.width&&s.searchParams.set("w",e.width.toString()),e.height&&s.searchParams.set("h",e.height.toString()),e.quality&&s.searchParams.set("q",e.quality.toString()),s.toString()}catch{}return l.value}),a={props:e,showFullscreen:t,url:l,computedImageUrl:o,ImageFullscreen:S};return Object.defineProperty(a,"__isScriptSetup",{enumerable:!1,value:!0}),a}}),b=["src","alt"];function F(n,r,e,t,l,o){return u(),c(y,{size:e.size,onClick:r[1]||(r[1]=a=>t.url&&(t.showFullscreen=!0))},{default:m(()=>[t.url?(u(),g("img",{key:0,src:t.computedImageUrl,alt:`${e.specialist.firstname||"Пользователь"}'s avatar`,class:"avatar-image"},null,8,b)):f("",!0),e.fullscreen&&t.url?(u(),c(t.ImageFullscreen,{key:1,show:t.showFullscreen,"onUpdate:show":r[0]||(r[0]=a=>t.showFullscreen=a)},{default:m(()=>[w(d,{src:t.url,"spinner-color":"primary","spinner-size":"82px",width:"100%",height:"100%",fit:"scale-down"},null,8,["src"])]),_:1},8,["show"])):f("",!0)]),_:1},8,["size"])}const x=_(v,[["render",F],["__scopeId","data-v-d5f57653"],["__file","SpecialistPhoto.vue"]]);export{x as S};