import{a as h,Q}from"./QToolbar-BVmsPAij.js";import{N as k,O as x,P,o as y,_ as v,S as s,T as u,U as t,V as a,Y as m,W as b,a3 as d,a4 as w,a5 as C,X as c,a0 as S}from"./index-B5fKhRmK.js";import{Q as I}from"./QCardSection-CkOy_myj.js";import{Q as W}from"./use-transition-4mtm_1Sm.js";import{a as B,b as p,Q as _}from"./QItem-RUTCmYHM.js";import{Q as V}from"./QList-CuUpRKuw.js";import{Q as T}from"./QBanner-DJVY2J7f.js";import{Q as E}from"./QPagination-y4JE_fTs.js";import{Q as L,a as N}from"./QInnerLoading-DS7qhBsl.js";import{Q as D}from"./QPage-6isNs5ct.js";import{g as q}from"./worksheets-Dfn_Hftz.js";import"./use-dark-CI_1RVc7.js";import"./QInput-Cq_516xi.js";import"./focus-manager-BJWzFvJg.js";import"./format-DyQxkAtJ.js";const O=k("worksheets",{state:()=>({worksheets:[],meta:{},currentPage:1,loading:!1}),actions:{async fetchWorksheets(){this.loading=!0;try{const n=await q(this.currentPage);this.worksheets=n.data.data,this.meta=n.data.meta,this.currentPage=this.meta.current_page}catch{}finally{this.loading=!1}},setPage(n){this.currentPage=n}}}),U=x({__name:"IndexPage",setup(n,{expose:o}){o();const i=P(),e=O(),f=l=>{e.currentPage=l,e.fetchWorksheets()},g=l=>{i.push({name:"worksheets.edit",params:{id:l.id}})};y(()=>{e.fetchWorksheets()});const r={router:i,store:e,handlePageChange:f,viewWorksheet:g};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}}),j={key:1,class:"q-mt-md text-center"},z={key:2,class:"q-pa-lg flex flex-center"};function A(n,o,i,e,f,g){return s(),u(D,{padding:""},{default:t(()=>[a(Q,null,{default:t(()=>[a(h,null,{default:t(()=>o[1]||(o[1]=[m("Библиотека")])),_:1})]),_:1}),a(I,null,{default:t(()=>[a(b,{label:"Создать материал",color:"green",to:{name:"worksheets.create"}})]),_:1}),e.store.worksheets.length>0?(s(),u(V,{key:0},{default:t(()=>[(s(!0),d(C,null,w(e.store.worksheets,r=>(s(),u(B,{onClick:l=>e.viewWorksheet(r),key:r.id,clickable:""},{default:t(()=>[a(p,{avatar:""},{default:t(()=>[r.cover?(s(),u(W,{key:0,src:r.cover.url,alt:"cover",width:"50px",height:"50px"},null,8,["src"])):c("",!0)]),_:2},1024),a(p,null,{default:t(()=>[a(_,{class:"text-h6",lines:"1"},{default:t(()=>[m(S(r.title),1)]),_:2},1024),a(_,{caption:""})]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})):(s(),d("div",j,[a(T,null,{default:t(()=>o[2]||(o[2]=[m(" Нет вебинаров ")])),_:1})])),e.store.meta.last_page>1?(s(),d("div",z,[e.store.meta?(s(),u(E,{key:0,modelValue:e.store.currentPage,"onUpdate:modelValue":[o[0]||(o[0]=r=>e.store.currentPage=r),e.handlePageChange],min:1,max:e.store.meta.last_page,"max-pages":7,"boundary-numbers":""},null,8,["modelValue","max"])):c("",!0)])):c("",!0),a(N,{showing:e.store.loading},{default:t(()=>[a(L,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})}const oe=v(U,[["render",A],["__file","IndexPage.vue"]]);export{oe as default};
