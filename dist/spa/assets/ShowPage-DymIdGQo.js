import{O as C,P as x,r as p,o as h,_ as A,S as n,T as i,U as a,X as s,V as l,W as d,Y as f}from"./index-B5fKhRmK.js";import{a as P,Q as D}from"./QToolbar-BVmsPAij.js";import{Q as g}from"./QCardSection-CkOy_myj.js";import{Q as v}from"./QChip-NOoku7Xo.js";import{Q as V}from"./QInput-Cq_516xi.js";import{Q as j}from"./QCardActions-c7eJt_Iw.js";import{Q as H}from"./QCard-DxAewxH7.js";import{Q as T,a as U}from"./QInnerLoading-DS7qhBsl.js";import{Q as F}from"./QPage-6isNs5ct.js";import{u as R}from"./use-quasar-DWv_aFJr.js";import{a as I,u as N,b as O,r as q}from"./bulletins-BRYsb03t.js";import{S as z}from"./StatusEnums-Cpn04w7a.js";import{u as G}from"./stat-store-Cg1KhQC1.js";import{U as L}from"./UserPhoto-DXK6EKRq.js";import"./use-dark-CI_1RVc7.js";import"./focus-manager-BJWzFvJg.js";import"./use-transition-4mtm_1Sm.js";import"./ImageFullscreen-Dk6LiqVP.js";const M=C({__name:"ShowPage",props:{id:{type:String,required:!0}},setup(y,{expose:t}){t();const c=y,e=R(),E=x(),m=G(),u=p(!1),o=p(null),b=p(!1),w=async()=>{if(o.value){u.value=!0;try{const r=await N(o.value.id,{text:o.value.text});o.value=r.data.bulletin,b.value=!1,e.notify({message:"Объявление успешно обновлено!",color:"positive",position:"top",timeout:3e3})}catch{e.notify({message:"Ошибка при обновлении объявления!",color:"negative",position:"top",timeout:3e3})}finally{u.value=!1}}},S=async r=>{u.value=!0;try{const B=await I(r);o.value=B.data.data}finally{u.value=!1}},_=async()=>{if(o.value){u.value=!0;try{const r=await O(o.value.id);o.value=r.data.bulletin,e.notify({message:r.data.message,color:"positive",position:"top",timeout:3e3}),await m.fetchStats()}finally{u.value=!1}}},k=async()=>{if(o.value){u.value=!0;try{const r=await q(o.value.id);o.value=r.data.bulletin,e.notify({message:r.data.message,color:"positive",position:"top",timeout:3e3}),await m.fetchStats()}finally{u.value=!1}}};h(()=>{S(c.id)});const Q={props:c,$q:e,router:E,statStore:m,loading:u,bulletin:o,isEditing:b,saveEditedBulletin:w,fetchBulletinHandler:S,approveBulletinHandler:_,rejectBulletinHandler:k,get StatusEnum(){return z},UserPhoto:L};return Object.defineProperty(Q,"__isScriptSetup",{enumerable:!1,value:!0}),Q}});function W(y,t,c,e,E,m){return e.bulletin?(n(),i(F,{key:0,padding:""},{default:a(()=>[l(D,null,{default:a(()=>[l(d,{flat:"",icon:"arrow_back",onClick:t[0]||(t[0]=u=>e.router.go(-1))}),l(P,null,{default:a(()=>t[3]||(t[3]=[f("Объявление")])),_:1})]),_:1}),l(H,{bordered:""},{default:a(()=>[l(g,null,{default:a(()=>[l(e.UserPhoto,{user:e.bulletin.creator,fullscreen:!0,size:"6rem",width:224,height:224,class:"cursor-pointer"},null,8,["user"])]),_:1}),l(g,null,{default:a(()=>[e.bulletin.status===e.StatusEnum.Accepted?(n(),i(v,{key:0,color:"green","text-color":"white",icon:"check"},{default:a(()=>t[4]||(t[4]=[f(" Подтверждёно ")])),_:1})):e.bulletin.status===e.StatusEnum.Rejected?(n(),i(v,{key:1,color:"red","text-color":"white",icon:"block"},{default:a(()=>t[5]||(t[5]=[f(" Отклонёно ")])),_:1})):e.bulletin.status===e.StatusEnum.OnReview?(n(),i(v,{key:2,color:"orange","text-color":"white",icon:"hourglass_empty"},{default:a(()=>t[6]||(t[6]=[f(" На проверке ")])),_:1})):s("",!0)]),_:1}),l(g,null,{default:a(()=>[l(V,{filled:"",modelValue:e.bulletin.text,"onUpdate:modelValue":t[1]||(t[1]=u=>e.bulletin.text=u),readonly:!e.isEditing,autogrow:"",type:"textarea"},null,8,["modelValue","readonly"])]),_:1}),l(j,null,{default:a(()=>[e.bulletin.status!=e.StatusEnum.Accepted&&!e.loading&&!e.isEditing?(n(),i(d,{key:0,label:"Подтвердить",color:"green",onClick:e.approveBulletinHandler})):s("",!0),e.bulletin.status!=e.StatusEnum.Rejected&&!e.loading&&!e.isEditing?(n(),i(d,{key:1,label:"Отклонить",color:"red",onClick:e.rejectBulletinHandler})):s("",!0),!e.loading&&!e.isEditing?(n(),i(d,{key:2,label:"Редактировать",color:"blue",onClick:t[2]||(t[2]=u=>e.isEditing=!0)})):s("",!0),!e.loading&&e.isEditing?(n(),i(d,{key:3,label:"Сохранить",color:"blue",onClick:e.saveEditedBulletin})):s("",!0)]),_:1})]),_:1}),l(U,{showing:e.loading},{default:a(()=>[l(T,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})):s("",!0)}const fe=A(M,[["render",W],["__file","ShowPage.vue"]]);export{fe as default};