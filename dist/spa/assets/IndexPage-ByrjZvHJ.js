import{a as h,Q}from"./QToolbar-By_3Imut.js";import{L as k,M as x,N as P,o as y,_ as v,Q as s,R as u,S as t,T as a,W as m,U as C,a1 as d,a2 as b,a3 as w,V as c,Z as S}from"./index-B6qH9XSO.js";import{Q as B}from"./QCardSection-Gp9p4F5O.js";import{Q as I}from"./use-transition-BofM6uWm.js";import{a as W,b as p,Q as _}from"./QItem-CiC-A5wx.js";import{Q as V}from"./QList-D8Q5Jqt9.js";import{Q as L}from"./QBanner-dnlPN2T_.js";import{Q as T}from"./QPagination-BsDSce5m.js";import{Q as E,a as N}from"./QInnerLoading-BJccYjER.js";import{Q as q}from"./QPage-CKg0Pufy.js";import{g as D}from"./worksheets-CPVAHWAH.js";import"./use-dark-BGndNJUA.js";import"./QInput-jbpBbB-l.js";import"./focus-manager-BJWzFvJg.js";import"./format-DyQxkAtJ.js";const M=k("worksheets",{state:()=>({worksheets:[],meta:{},currentPage:1,loading:!1}),actions:{async fetchWorksheets(){this.loading=!0;try{const n=await D(this.currentPage);this.worksheets=n.data.data,this.meta=n.data.meta,this.currentPage=this.meta.current_page}catch{}finally{this.loading=!1}},setPage(n){this.currentPage=n}}}),R=x({__name:"IndexPage",setup(n,{expose:o}){o();const i=P(),e=M(),f=l=>{e.currentPage=l,e.fetchWorksheets()},g=l=>{i.push({name:"worksheets.edit",params:{id:l.id}})};y(()=>{e.fetchWorksheets()});const r={router:i,store:e,handlePageChange:f,viewWorksheet:g};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}}),U={key:1,class:"q-mt-md text-center"},j={key:2,class:"q-pa-lg flex flex-center"};function z(n,o,i,e,f,g){return s(),u(q,{padding:""},{default:t(()=>[a(Q,null,{default:t(()=>[a(h,null,{default:t(()=>o[1]||(o[1]=[m("Библиотека")])),_:1})]),_:1}),a(B,null,{default:t(()=>[a(C,{label:"Создать материал",color:"green",to:{name:"worksheets.create"}})]),_:1}),e.store.worksheets.length>0?(s(),u(V,{key:0},{default:t(()=>[(s(!0),d(w,null,b(e.store.worksheets,r=>(s(),u(W,{onClick:l=>e.viewWorksheet(r),key:r.id,clickable:""},{default:t(()=>[a(p,{avatar:""},{default:t(()=>[r.cover?(s(),u(I,{key:0,src:r.cover.url,alt:"cover",width:"50px",height:"50px"},null,8,["src"])):c("",!0)]),_:2},1024),a(p,null,{default:t(()=>[a(_,{class:"text-h6",lines:"1"},{default:t(()=>[m(S(r.title),1)]),_:2},1024),a(_,{caption:""})]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})):(s(),d("div",U,[a(L,null,{default:t(()=>o[2]||(o[2]=[m(" Нет материалов ")])),_:1})])),e.store.meta.last_page>1?(s(),d("div",j,[e.store.meta?(s(),u(T,{key:0,modelValue:e.store.currentPage,"onUpdate:modelValue":[o[0]||(o[0]=r=>e.store.currentPage=r),e.handlePageChange],min:1,max:e.store.meta.last_page,"max-pages":7,"boundary-numbers":""},null,8,["modelValue","max"])):c("",!0)])):c("",!0),a(N,{showing:e.store.loading},{default:t(()=>[a(E,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})}const oe=v(R,[["render",z],["__file","IndexPage.vue"]]);export{oe as default};