import{M as C,N as h,r as E,o as b,_ as D,Q as r,R as l,S as s,V as c,T as a,U as p,W as n,Y as f,Z as S,a1 as B}from"./index-B6qH9XSO.js";import{a as x,Q as F}from"./QToolbar-By_3Imut.js";import{Q as v}from"./QChip-D8J7Tj8H.js";import{Q as A}from"./QCardSection-Gp9p4F5O.js";import{Q as P}from"./QCardActions-DacgwXvn.js";import{Q as T}from"./QCard-CrCXEKdn.js";import{Q as j,a as q}from"./QInnerLoading-BJccYjER.js";import{Q as N}from"./QPage-CKg0Pufy.js";import{u as H}from"./use-quasar-Bn2HnLU4.js";import{a as R,b as V,r as L}from"./specialists-CHCHckgD.js";import{S as z}from"./StatusEnums-Cpn04w7a.js";import{S as I}from"./SpecialistPhoto-CJEqdsS-.js";import{D as M}from"./DateTime-CJmFyMW9.js";import{u as O}from"./stat-store-CQM1p85T.js";import{F as G}from"./FilesList-BO8Aocd6.js";import"./use-dark-BGndNJUA.js";import"./use-transition-BofM6uWm.js";import"./ImageFullscreen-B6FQkzyS.js";import"./QDialog-ItVBQ28c.js";import"./focus-manager-BJWzFvJg.js";import"./format-DyQxkAtJ.js";import"./QItem-CiC-A5wx.js";import"./QList-D8Q5Jqt9.js";import"./QBanner-dnlPN2T_.js";const U=C({__name:"ShowPage",props:{id:{type:Number,required:!0}},setup(_,{expose:e}){e();const d=_,t=H(),g=h(),m=O(),o=E(!1),i=E(null),y=async()=>{o.value=!0;try{const u=await R(d.id);i.value=u.data.data}finally{o.value=!1}},Q=async()=>{if(i.value){o.value=!0;try{const u=await V(i.value.id);i.value=u.data.specialist,t.notify({message:u.data.message,color:"positive",position:"top",timeout:3e3}),await m.fetchStats()}finally{o.value=!1}}},k=async()=>{if(i.value){o.value=!0;try{const u=await L(i.value.id);i.value=u.data.specialist,t.notify({message:u.data.message,color:"positive",position:"top",timeout:3e3}),await m.fetchStats()}finally{o.value=!1}}};b(()=>{y()});const w={props:d,$q:t,router:g,statStore:m,loading:o,specialist:i,fetchSpecialistHandler:y,approveSpecialistHandler:Q,rejectSpecialistHandler:k,get StatusEnum(){return z},SpecialistPhoto:I,DateTime:M,FilesList:G};return Object.defineProperty(w,"__isScriptSetup",{enumerable:!1,value:!0}),w}}),W={class:"text-h6"},Y={class:"q-mt-sm"},Z={class:"q-mt-sm"},J={key:3,class:"q-mt-sm"};function K(_,e,d,t,g,m){return t.specialist?(r(),l(N,{key:0,padding:""},{default:s(()=>[a(F,null,{default:s(()=>[a(p,{flat:"",icon:"arrow_back",onClick:e[0]||(e[0]=o=>t.router.go(-1))}),a(x,null,{default:s(()=>e[1]||(e[1]=[n("Информация о специалисте")])),_:1})]),_:1}),a(t.SpecialistPhoto,{specialist:t.specialist,fullscreen:!0,size:"14rem",width:224,height:224,class:"q-mb-md cursor-pointer"},null,8,["specialist"]),a(T,{bordered:""},{default:s(()=>[a(A,null,{default:s(()=>[f("div",W,S(t.specialist.firstname)+" "+S(t.specialist.lastname),1),t.specialist.status===t.StatusEnum.Accepted?(r(),l(v,{key:0,color:"green","text-color":"white",icon:"check"},{default:s(()=>e[2]||(e[2]=[n(" Подтверждён ")])),_:1})):t.specialist.status===t.StatusEnum.Rejected?(r(),l(v,{key:1,color:"red","text-color":"white",icon:"block"},{default:s(()=>e[3]||(e[3]=[n(" Отклонён ")])),_:1})):t.specialist.status===t.StatusEnum.OnReview?(r(),l(v,{key:2,color:"orange","text-color":"white",icon:"hourglass_empty"},{default:s(()=>e[4]||(e[4]=[n(" На проверке ")])),_:1})):c("",!0),f("div",Y,"Телефон: "+S(t.specialist.phone),1),f("div",Z,[e[5]||(e[5]=n(" Дата регистрации: ")),a(t.DateTime,{"raw-date":t.specialist.created_at},null,8,["raw-date"])]),t.specialist.files?(r(),B("div",J,[e[6]||(e[6]=n(" Документы: ")),a(t.FilesList,{files:t.specialist.files},null,8,["files"])])):c("",!0)]),_:1}),a(P,null,{default:s(()=>[t.specialist.status!=t.StatusEnum.Accepted&&!t.loading?(r(),l(p,{key:0,label:"Подтвердить",color:"green",onClick:t.approveSpecialistHandler})):c("",!0),t.specialist.status!=t.StatusEnum.Rejected&&!t.loading?(r(),l(p,{key:1,label:"Отклонить",color:"red",onClick:t.rejectSpecialistHandler})):c("",!0)]),_:1})]),_:1}),a(q,{showing:t.loading},{default:s(()=>[a(j,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})):c("",!0)}const Qt=D(U,[["render",K],["__file","ShowPage.vue"]]);export{Qt as default};
