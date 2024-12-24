import{a as B,Q as y}from"./QToolbar-By_3Imut.js";import{Q as C}from"./use-transition-BofM6uWm.js";import{Q as t}from"./QInput-jbpBbB-l.js";import{Q as w}from"./QCardSection-Gp9p4F5O.js";import{M as U,N as E,r as F,o as x,a8 as N,_ as S,Q as V,R as b,S as u,T as a,W as I,V as A,Y as s,U as c}from"./index-B6qH9XSO.js";import{Q as P}from"./QCardActions-DacgwXvn.js";import{Q as T}from"./QCard-CrCXEKdn.js";import{Q as k}from"./QForm-CRAoDmLE.js";import{Q as W,a as q}from"./QInnerLoading-BJccYjER.js";import{Q as z}from"./QPage-CKg0Pufy.js";import{u as M,a as f,U as O,b as R}from"./UploadFileComponent-Bfw95-WG.js";import{b as j}from"./webinars-C43lZx4l.js";import"./use-dark-BGndNJUA.js";import"./focus-manager-BJWzFvJg.js";import"./client-CkZ3x0JN.js";import"./QBadge-CKCjPtL-.js";import"./QChip-D8J7Tj8H.js";import"./format-DyQxkAtJ.js";const G=U({__name:"EditPage",props:{id:{}},setup(v,{expose:e}){e();const i=E(),r=v,m=M("patch",()=>`/webinars/${r.id}`,{title:"",description:"",start_at:"",end_at:"",cover:void 0,stream_url:"",price:"",record_file:void 0}),d=F(!0);function o(l){return new Date(l).toISOString().slice(0,16)}const g=async()=>{try{const{data:l}=await j(r.id);l.data.start_at&&(l.data.start_at=o(l.data.start_at)),l.data.end_at&&(l.data.end_at=o(l.data.end_at)),m.setData(l.data)}catch{f("Не удалось загрузить данные вебинара","negative"),i.push("/webinars")}finally{d.value=!1}},_=()=>{m.submit().then(()=>{f("Вебинар успешно обновлён","success"),i.push("/webinars")}).catch(l=>{const{response:n}=l;if(n.status===422){const{opts:Q}=R(n.data);N.create(Q.value)}else f(n.data.message,"negative")})},D=()=>{i.push("/webinars")};x(()=>{g()});const p={router:i,props:r,form:m,loading:d,formatDateForInput:o,loadWebinarData:g,submit:_,cancel:D,UploadFileComponent:O};return Object.defineProperty(p,"__isScriptSetup",{enumerable:!1,value:!0}),p}}),L={class:"row q-col-gutter-sm"},Y={class:"col-6"},H={class:"col-6"};function J(v,e,i,r,m,d){return V(),b(z,{padding:""},{default:u(()=>[a(y,null,{default:u(()=>[a(B,null,{default:u(()=>e[16]||(e[16]=[I("Редактирование вебинара")])),_:1})]),_:1}),a(k,{onSubmit:r.submit,valid:r.form.valid},{default:u(()=>[a(T,null,{default:u(()=>[a(w,null,{default:u(()=>[a(r.UploadFileComponent,{modelValue:r.form.cover,"onUpdate:modelValue":e[0]||(e[0]=o=>r.form.cover=o),label:"Выбрать обложку",error:r.form.invalid("cover"),"error-message":r.form.errors.cover,onChange:e[1]||(e[1]=o=>r.form.validate("cover"))},null,8,["modelValue","error","error-message"]),r.form.cover?(V(),b(C,{key:0,src:r.form.cover.url,"spinner-color":"white",class:"q-mb-sm",style:{height:"10rem","max-width":"10rem"}},null,8,["src"])):A("",!0),a(t,{modelValue:r.form.title,"onUpdate:modelValue":e[2]||(e[2]=o=>r.form.title=o),label:"Название вебинара","lazy-rules":"",error:r.form.invalid("title"),"error-message":r.form.errors.title,onBlur:e[3]||(e[3]=o=>r.form.validate("title"))},null,8,["modelValue","error","error-message"]),a(t,{modelValue:r.form.description,"onUpdate:modelValue":e[4]||(e[4]=o=>r.form.description=o),label:"Описание вебинара",type:"textarea",autogrow:"",error:r.form.invalid("description"),"error-message":r.form.errors.description,onBlur:e[5]||(e[5]=o=>r.form.validate("description"))},null,8,["modelValue","error","error-message"]),a(t,{modelValue:r.form.stream_url,"onUpdate:modelValue":e[6]||(e[6]=o=>r.form.stream_url=o),label:"Ссылка на трансляцию",error:r.form.invalid("stream_url"),"error-message":r.form.errors.stream_url,onBlur:e[7]||(e[7]=o=>r.form.validate("stream_url"))},null,8,["modelValue","error","error-message"]),a(t,{modelValue:r.form.price,"onUpdate:modelValue":e[8]||(e[8]=o=>r.form.price=o),label:"Цена",type:"number",prefix:"₽",error:r.form.invalid("price"),"error-message":r.form.errors.price,onBlur:e[9]||(e[9]=o=>r.form.validate("price"))},null,8,["modelValue","error","error-message"]),s("div",L,[s("div",Y,[a(t,{modelValue:r.form.start_at,"onUpdate:modelValue":e[10]||(e[10]=o=>r.form.start_at=o),label:"Дата начала",type:"datetime-local",error:r.form.invalid("start_at"),"error-message":r.form.errors.start_at,onBlur:e[11]||(e[11]=o=>r.form.validate("start_at"))},null,8,["modelValue","error","error-message"])]),s("div",H,[a(t,{modelValue:r.form.end_at,"onUpdate:modelValue":e[12]||(e[12]=o=>r.form.end_at=o),label:"Дата окончания",type:"datetime-local",error:r.form.invalid("end_at"),"error-message":r.form.errors.end_at,onBlur:e[13]||(e[13]=o=>r.form.validate("end_at"))},null,8,["modelValue","error","error-message"])])]),a(r.UploadFileComponent,{modelValue:r.form.record_file,"onUpdate:modelValue":e[14]||(e[14]=o=>r.form.record_file=o),label:"Выбрать файл",error:r.form.invalid("record_file"),"error-message":r.form.errors.record_file,onChange:e[15]||(e[15]=o=>r.form.validate("record_file"))},null,8,["modelValue","error","error-message"])]),_:1}),a(P,{align:"right"},{default:u(()=>[a(c,{label:"Сохранить изменения",type:"submit",color:"primary",loading:r.form.processing,icon:"save"},null,8,["loading"]),a(c,{label:"Отмена",color:"grey-6",flat:"",onClick:r.cancel,icon:"close"})]),_:1})]),_:1})]),_:1},8,["valid"]),a(q,{showing:r.loading},{default:u(()=>[a(W,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})}const vr=S(G,[["render",J],["__file","EditPage.vue"]]);export{vr as default};
