import{O as h,P as D,r as E,o as b,_ as B,S as r,T as l,U as s,X as c,V as a,W as p,Y as n,$ as f,a0 as S,a3 as x}from"./index-B5fKhRmK.js";import{a as F,Q as P}from"./QToolbar-BVmsPAij.js";import{Q as g}from"./QChip-NOoku7Xo.js";import{Q as A}from"./QCardSection-CkOy_myj.js";import{Q as T}from"./QCardActions-c7eJt_Iw.js";import{Q as j}from"./QCard-DxAewxH7.js";import{Q as q,a as H}from"./QInnerLoading-DS7qhBsl.js";import{Q as V}from"./QPage-6isNs5ct.js";import{u as N}from"./use-quasar-DWv_aFJr.js";import{a as R,S as L,b as O,r as z}from"./SpecialistPhoto-BxeTyaXt.js";import{S as I}from"./StatusEnums-Cpn04w7a.js";import{D as G}from"./DateTime-Deg1fSWP.js";import{u as M}from"./stat-store-Cg1KhQC1.js";import{F as U}from"./FilesList-BmK5fN-o.js";import"./use-dark-CI_1RVc7.js";import"./use-transition-4mtm_1Sm.js";import"./ImageFullscreen-Dk6LiqVP.js";import"./focus-manager-BJWzFvJg.js";import"./format-DyQxkAtJ.js";import"./QItem-RUTCmYHM.js";import"./QList-CuUpRKuw.js";import"./QBanner-DJVY2J7f.js";const W=h({__name:"ShowPage",props:{id:{type:String,required:!0}},setup(v,{expose:e}){e();const d=v,t=N(),_=D(),m=M(),i=E(!1),u=E(null),y=async o=>{i.value=!0;try{const C=await R(o);u.value=C.data.data}finally{i.value=!1}},Q=async()=>{if(u.value){i.value=!0;try{const o=await O(u.value.id);u.value=o.data.specialist,t.notify({message:o.data.message,color:"positive",position:"top",timeout:3e3}),await m.fetchStats()}finally{i.value=!1}}},k=async()=>{if(u.value){i.value=!0;try{const o=await z(u.value.id);u.value=o.data.specialist,t.notify({message:o.data.message,color:"positive",position:"top",timeout:3e3}),await m.fetchStats()}finally{i.value=!1}}};b(()=>{y(d.id)});const w={props:d,$q:t,router:_,statStore:m,loading:i,specialist:u,fetchSpecialistHandler:y,approveSpecialistHandler:Q,rejectSpecialistHandler:k,get StatusEnum(){return I},SpecialistPhoto:L,DateTime:G,FilesList:U};return Object.defineProperty(w,"__isScriptSetup",{enumerable:!1,value:!0}),w}}),X={class:"text-h6"},Y={class:"q-mt-sm"},J={class:"q-mt-sm"},K={key:3,class:"q-mt-sm"};function Z(v,e,d,t,_,m){return t.specialist?(r(),l(V,{key:0,padding:""},{default:s(()=>[a(P,null,{default:s(()=>[a(p,{flat:"",icon:"arrow_back",onClick:e[0]||(e[0]=i=>t.router.go(-1))}),a(F,null,{default:s(()=>e[1]||(e[1]=[n("Информация о специалисте")])),_:1})]),_:1}),a(t.SpecialistPhoto,{specialist:t.specialist,fullscreen:!0,size:"14rem",width:224,height:224,class:"q-mb-md cursor-pointer"},null,8,["specialist"]),a(j,{bordered:""},{default:s(()=>[a(A,null,{default:s(()=>[f("div",X,S(t.specialist.firstname)+" "+S(t.specialist.lastname),1),t.specialist.status===t.StatusEnum.Accepted?(r(),l(g,{key:0,color:"green","text-color":"white",icon:"check"},{default:s(()=>e[2]||(e[2]=[n(" Подтверждён ")])),_:1})):t.specialist.status===t.StatusEnum.Rejected?(r(),l(g,{key:1,color:"red","text-color":"white",icon:"block"},{default:s(()=>e[3]||(e[3]=[n(" Отклонён ")])),_:1})):t.specialist.status===t.StatusEnum.OnReview?(r(),l(g,{key:2,color:"orange","text-color":"white",icon:"hourglass_empty"},{default:s(()=>e[4]||(e[4]=[n(" На проверке ")])),_:1})):c("",!0),f("div",Y,"Телефон: "+S(t.specialist.phone),1),f("div",J,[e[5]||(e[5]=n(" Дата регистрации: ")),a(t.DateTime,{"raw-date":t.specialist.created_at},null,8,["raw-date"])]),t.specialist.files?(r(),x("div",K,[e[6]||(e[6]=n(" Документы: ")),a(t.FilesList,{files:t.specialist.files},null,8,["files"])])):c("",!0)]),_:1}),a(T,null,{default:s(()=>[t.specialist.status!=t.StatusEnum.Accepted&&!t.loading?(r(),l(p,{key:0,label:"Подтвердить",color:"green",onClick:t.approveSpecialistHandler})):c("",!0),t.specialist.status!=t.StatusEnum.Rejected&&!t.loading?(r(),l(p,{key:1,label:"Отклонить",color:"red",onClick:t.rejectSpecialistHandler})):c("",!0)]),_:1})]),_:1}),a(H,{showing:t.loading},{default:s(()=>[a(q,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})):c("",!0)}const Et=B(W,[["render",Z],["__file","ShowPage.vue"]]);export{Et as default};