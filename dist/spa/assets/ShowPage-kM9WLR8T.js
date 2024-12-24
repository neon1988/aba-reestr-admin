import{M as q,N as T,r as b,o as _,_ as P,Q as a,R as f,S as o,V as s,T as r,U as D,W as n,Z as l,Y as t,a1 as c}from"./index-B6qH9XSO.js";import{a as j,Q as H}from"./QToolbar-By_3Imut.js";import{Q as p}from"./QChip-D8J7Tj8H.js";import{Q as y}from"./QSeparator-BbCRG37a.js";import{Q as C}from"./QCardSection-Gp9p4F5O.js";import{Q as k}from"./QCard-CrCXEKdn.js";import{Q as N}from"./QCardActions-DacgwXvn.js";import{Q as R,a as V}from"./QInnerLoading-BJccYjER.js";import{Q as L}from"./QPage-CKg0Pufy.js";import{u as z}from"./use-quasar-Bn2HnLU4.js";import{a as I,C as M,b as O,r as G}from"./CenterPhoto-DrS6neFD.js";import{S as U}from"./StatusEnums-Cpn04w7a.js";import{D as W}from"./DateTime-CJmFyMW9.js";import{u as Y}from"./stat-store-CQM1p85T.js";import{F as Z}from"./FilesList-BO8Aocd6.js";import"./use-dark-BGndNJUA.js";import"./use-transition-BofM6uWm.js";import"./ImageFullscreen-B6FQkzyS.js";import"./QDialog-ItVBQ28c.js";import"./focus-manager-BJWzFvJg.js";import"./format-DyQxkAtJ.js";import"./QItem-CiC-A5wx.js";import"./QList-D8Q5Jqt9.js";import"./QBanner-dnlPN2T_.js";const J=q({__name:"ShowPage",props:{id:{type:String,required:!0}},setup(S,{expose:e}){e();const v=S,u=z(),E=T(),g=Y(),d=b(!1),i=b(null),w=async m=>{d.value=!0;try{const A=await I(m);i.value=A.data.data}finally{d.value=!1}},B=async()=>{if(i.value){d.value=!0;try{const m=await O(i.value.id);i.value=m.data.center,u.notify({message:m.data.message,color:"positive",position:"top",timeout:3e3}),await g.fetchStats()}finally{d.value=!1}}},x=async()=>{if(i.value){d.value=!0;try{const m=await G(i.value.id);i.value=m.data.center,u.notify({message:m.data.message,color:"positive",position:"top",timeout:3e3}),await g.fetchStats()}finally{d.value=!1}}},F=()=>{E.go(-1)};_(()=>{w(v.id)});const Q={props:v,$q:u,router:E,statStore:g,loading:d,center:i,fetchCenterHandler:w,approveCenterHandler:B,rejectCenterHandler:x,goBack:F,get StatusEnum(){return U},DateTime:W,FilesList:Z,CenterPhoto:M};return Object.defineProperty(Q,"__isScriptSetup",{enumerable:!1,value:!0}),Q}}),K={key:3},X={key:4},h={key:0},$={key:1},uu={key:0,class:"q-mt-sm"};function eu(S,e,v,u,E,g){return u.center?(a(),f(L,{key:0,padding:""},{default:o(()=>[r(H,{class:"q-mb-md"},{default:o(()=>[r(D,{flat:"",icon:"arrow_back",onClick:u.goBack,class:"q-mr-md"}),r(j,null,{default:o(()=>[n(l(u.center.name)+" - Центр",1)]),_:1})]),_:1}),r(u.CenterPhoto,{center:u.center,size:"14rem",fullscreen:!0,alt:"Фото центра",class:"q-mb-md cursor-pointer",width:224,height:224},null,8,["center"]),r(k,{class:"q-mb-md",bordered:""},{default:o(()=>[r(C,null,{default:o(()=>[u.center.status===u.StatusEnum.Accepted?(a(),f(p,{key:0,color:"green","text-color":"white",icon:"check"},{default:o(()=>e[0]||(e[0]=[n(" Подтверждён ")])),_:1})):u.center.status===u.StatusEnum.Rejected?(a(),f(p,{key:1,color:"red","text-color":"white",icon:"block"},{default:o(()=>e[1]||(e[1]=[n(" Отклонён ")])),_:1})):u.center.status===u.StatusEnum.OnReview?(a(),f(p,{key:2,color:"orange","text-color":"white",icon:"hourglass_empty"},{default:o(()=>e[2]||(e[2]=[n(" На проверке ")])),_:1})):s("",!0),e[9]||(e[9]=t("div",{class:"text-h6"},"Основная информация",-1)),r(y,{class:"q-my-sm"}),t("div",null,[e[3]||(e[3]=t("strong",null,"Юридическое название:",-1)),n(" "+l(u.center.legal_name),1)]),t("div",null,[e[4]||(e[4]=t("strong",null,"ИНН:",-1)),n(" "+l(u.center.inn),1)]),u.center.kpp?(a(),c("div",K,[e[5]||(e[5]=t("strong",null,"КПП:",-1)),n(" "+l(u.center.kpp),1)])):s("",!0),t("div",null,[e[6]||(e[6]=t("strong",null,"Страна:",-1)),n(" "+l(u.center.country),1)]),u.center.region?(a(),c("div",X,[e[7]||(e[7]=t("strong",null,"Регион:",-1)),n(" "+l(u.center.region),1)])):s("",!0),t("div",null,[e[8]||(e[8]=t("strong",null,"Город:",-1)),n(" "+l(u.center.city),1)])]),_:1})]),_:1}),r(k,{class:"q-mb-md",bordered:""},{default:o(()=>[r(C,null,{default:o(()=>[e[13]||(e[13]=t("div",{class:"text-h6"},"Контактная информация",-1)),r(y,{class:"q-my-sm"}),t("div",null,[e[10]||(e[10]=t("strong",null,"Телефон:",-1)),n(" "+l(u.center.phone),1)]),u.center.services?(a(),c("div",h,[e[11]||(e[11]=t("strong",null,"Услуги:",-1)),n(" "+l(u.center.services),1)])):s("",!0),u.center.intensives?(a(),c("div",$,[e[12]||(e[12]=t("strong",null,"Интенсивы:",-1)),n(" "+l(u.center.intensives),1)])):s("",!0)]),_:1})]),_:1}),r(k,{class:"q-mb-md",bordered:""},{default:o(()=>[r(C,null,{default:o(()=>[e[18]||(e[18]=t("div",{class:"text-h6"},"Дата создания и обновления",-1)),r(y,{class:"q-my-sm"}),t("div",null,[e[14]||(e[14]=t("strong",null,"Создано:",-1)),e[15]||(e[15]=n("  ")),r(u.DateTime,{"raw-date":u.center.created_at},null,8,["raw-date"])]),t("div",null,[e[16]||(e[16]=t("strong",null,"Обновлено:",-1)),e[17]||(e[17]=n("  ")),r(u.DateTime,{"raw-date":u.center.updated_at},null,8,["raw-date"])])]),_:1})]),_:1}),u.center.files?(a(),c("div",uu,[e[19]||(e[19]=n(" Документы: ")),r(u.FilesList,{files:u.center.files},null,8,["files"])])):s("",!0),r(N,null,{default:o(()=>[u.center.status!=u.StatusEnum.Accepted&&!u.loading?(a(),f(D,{key:0,label:"Подтвердить",color:"green",onClick:u.approveCenterHandler})):s("",!0),u.center.status!=u.StatusEnum.Rejected&&!u.loading?(a(),f(D,{key:1,label:"Отклонить",color:"red",onClick:u.rejectCenterHandler})):s("",!0)]),_:1}),r(V,{showing:u.loading},{default:o(()=>[r(R,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})):s("",!0)}const Bu=P(J,[["render",eu],["__file","ShowPage.vue"]]);export{Bu as default};
