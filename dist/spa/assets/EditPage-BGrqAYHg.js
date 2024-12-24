import{a as B,Q as D}from"./QToolbar-By_3Imut.js";import{Q as F}from"./use-transition-BofM6uWm.js";import{Q as t}from"./QInput-jbpBbB-l.js";import{Q as y}from"./QCardSection-Gp9p4F5O.js";import{M as E,N as U,r as w,o as x,a8 as N,_ as S,Q as p,R as V,S as l,T as a,W as A,V as I,Y as s,U as b}from"./index-B6qH9XSO.js";import{Q as P}from"./QCardActions-DacgwXvn.js";import{Q as T}from"./QCard-CrCXEKdn.js";import{Q as k}from"./QForm-CRAoDmLE.js";import{Q as q,a as z}from"./QInnerLoading-BJccYjER.js";import{Q as M}from"./QPage-CKg0Pufy.js";import{u as O,a as f,U as R,b as j}from"./UploadFileComponent-Bfw95-WG.js";import{b as G}from"./conferences-D9au8ret.js";import"./use-dark-BGndNJUA.js";import"./focus-manager-BJWzFvJg.js";import"./client-CkZ3x0JN.js";import"./QBadge-CKCjPtL-.js";import"./QChip-D8J7Tj8H.js";import"./format-DyQxkAtJ.js";const L=E({__name:"EditPage",props:{id:{}},setup(v,{expose:e}){e();const n=U(),r=v,m=O("patch",()=>`/conferences/${r.id}`,{cover:void 0,title:"",description:"",start_at:"",end_at:"",stream_url:"",price:"",file:void 0}),d=w(!0);function o(u){return new Date(u).toISOString().slice(0,16)}const g=async()=>{try{const{data:u}=await G(r.id);u.data.start_at&&(u.data.start_at=o(u.data.start_at)),u.data.end_at&&(u.data.end_at=o(u.data.end_at)),m.setData(u.data)}catch{f("Не удалось загрузить данные мероприятия","negative"),n.push("/conferences")}finally{d.value=!1}},_=()=>{m.submit().then(()=>{f("Мероприятие успешно обновлён","success"),n.push("/conferences")}).catch(u=>{const{response:i}=u;if(i.status===422){const{opts:Q}=j(i.data);N.create(Q.value)}else f(i.data.message,"negative")})},C=()=>{n.push("/conferences")};x(()=>{g()});const c={router:n,props:r,form:m,loading:d,formatDateForInput:o,loadConferenceData:g,submit:_,cancel:C,UploadFileComponent:R};return Object.defineProperty(c,"__isScriptSetup",{enumerable:!1,value:!0}),c}}),W={class:"row q-col-gutter-sm"},Y={class:"col-6"},H={class:"col-6"};function J(v,e,n,r,m,d){return p(),V(M,{padding:""},{default:l(()=>[a(D,null,{default:l(()=>[a(B,null,{default:l(()=>e[16]||(e[16]=[A("Редактирование мероприятия")])),_:1})]),_:1}),a(k,{onSubmit:r.submit,valid:r.form.valid},{default:l(()=>[a(T,null,{default:l(()=>[a(y,null,{default:l(()=>[a(r.UploadFileComponent,{modelValue:r.form.cover,"onUpdate:modelValue":e[0]||(e[0]=o=>r.form.cover=o),label:"Выбрать обложку",error:r.form.invalid("cover"),"error-message":r.form.errors.cover,onChange:e[1]||(e[1]=o=>r.form.validate("cover"))},null,8,["modelValue","error","error-message"]),r.form.cover?(p(),V(F,{key:0,src:r.form.cover.url,"spinner-color":"white",class:"q-mb-sm",style:{height:"10rem","max-width":"10rem"}},null,8,["src"])):I("",!0),a(t,{modelValue:r.form.title,"onUpdate:modelValue":e[2]||(e[2]=o=>r.form.title=o),label:"Название мероприятия","lazy-rules":"",error:r.form.invalid("title"),"error-message":r.form.errors.title,onBlur:e[3]||(e[3]=o=>r.form.validate("title"))},null,8,["modelValue","error","error-message"]),a(t,{modelValue:r.form.description,"onUpdate:modelValue":e[4]||(e[4]=o=>r.form.description=o),label:"Описание мероприятия",type:"textarea",autogrow:"",error:r.form.invalid("description"),"error-message":r.form.errors.description,onBlur:e[5]||(e[5]=o=>r.form.validate("description"))},null,8,["modelValue","error","error-message"]),a(t,{modelValue:r.form.stream_url,"onUpdate:modelValue":e[6]||(e[6]=o=>r.form.stream_url=o),label:"Ссылка на трансляцию",error:r.form.invalid("stream_url"),"error-message":r.form.errors.stream_url,onBlur:e[7]||(e[7]=o=>r.form.validate("stream_url"))},null,8,["modelValue","error","error-message"]),a(t,{modelValue:r.form.price,"onUpdate:modelValue":e[8]||(e[8]=o=>r.form.price=o),label:"Цена",type:"number",prefix:"₽",error:r.form.invalid("price"),"error-message":r.form.errors.price,onBlur:e[9]||(e[9]=o=>r.form.validate("price"))},null,8,["modelValue","error","error-message"]),s("div",W,[s("div",Y,[a(t,{modelValue:r.form.start_at,"onUpdate:modelValue":e[10]||(e[10]=o=>r.form.start_at=o),label:"Дата начала",type:"datetime-local",error:r.form.invalid("start_at"),"error-message":r.form.errors.start_at,onBlur:e[11]||(e[11]=o=>r.form.validate("start_at"))},null,8,["modelValue","error","error-message"])]),s("div",H,[a(t,{modelValue:r.form.end_at,"onUpdate:modelValue":e[12]||(e[12]=o=>r.form.end_at=o),label:"Дата окончания",type:"datetime-local",error:r.form.invalid("end_at"),"error-message":r.form.errors.end_at,onBlur:e[13]||(e[13]=o=>r.form.validate("end_at"))},null,8,["modelValue","error","error-message"])])]),a(r.UploadFileComponent,{modelValue:r.form.file,"onUpdate:modelValue":e[14]||(e[14]=o=>r.form.file=o),label:"Выбрать обложку",error:r.form.invalid("file"),"error-message":r.form.errors.file,onChange:e[15]||(e[15]=o=>r.form.validate("file"))},null,8,["modelValue","error","error-message"])]),_:1}),a(P,{align:"right"},{default:l(()=>[a(b,{label:"Сохранить изменения",type:"submit",color:"primary",loading:r.form.processing,icon:"save"},null,8,["loading"]),a(b,{label:"Отмена",color:"grey-6",flat:"",onClick:r.cancel,icon:"close"})]),_:1})]),_:1})]),_:1},8,["valid"]),a(z,{showing:r.loading},{default:l(()=>[a(q,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})}const vr=S(L,[["render",J],["__file","EditPage.vue"]]);export{vr as default};
