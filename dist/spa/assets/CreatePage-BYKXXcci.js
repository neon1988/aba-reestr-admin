import{a as _,Q}from"./QToolbar-By_3Imut.js";import{Q as c}from"./use-transition-BofM6uWm.js";import{Q as l}from"./QInput-jbpBbB-l.js";import{Q as C}from"./QCardSection-Gp9p4F5O.js";import{M as D,N as y,a8 as B,_ as E,Q as n,R as s,S as u,T as a,W as U,V as w,Y as i,U as d}from"./index-B6qH9XSO.js";import{Q as x}from"./QCardActions-DacgwXvn.js";import{Q as N}from"./QCard-CrCXEKdn.js";import{Q as F}from"./QForm-CRAoDmLE.js";import{Q as S,a as P}from"./QInnerLoading-BJccYjER.js";import{Q as T}from"./QPage-CKg0Pufy.js";import{u as k,U as A,a as f,b as I}from"./UploadFileComponent-Bfw95-WG.js";import"./use-dark-BGndNJUA.js";import"./focus-manager-BJWzFvJg.js";import"./client-CkZ3x0JN.js";import"./QBadge-CKCjPtL-.js";import"./QChip-D8J7Tj8H.js";import"./format-DyQxkAtJ.js";const q=D({__name:"CreatePage",setup(v,{expose:e}){e();const t=y(),r=k("post",()=>"/webinars",{title:"",description:"",start_at:"",end_at:"",cover:[],stream_url:"",price:""}),o={router:t,form:r,submit:()=>{r.submit().then(()=>{f("Вебинар успешно создан","success"),t.push("/webinars")}).catch(V=>{const{response:m}=V;if(m.status===422){const{opts:b}=I(m.data);B.create(b.value)}else f(m.data.message,"negative")})},cancel:()=>{t.push("/webinars")},UploadFileComponent:A};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}}),R={class:"row q-col-gutter-sm"},j={class:"col-6"},z={class:"col-6"};function G(v,e,t,r,g,p){return n(),s(T,{padding:""},{default:u(()=>[a(Q,null,{default:u(()=>[a(_,null,{default:u(()=>e[14]||(e[14]=[U("Создание нового вебинара")])),_:1})]),_:1}),a(F,{onSubmit:r.submit,valid:r.form.valid},{default:u(()=>[a(N,null,{default:u(()=>[a(C,null,{default:u(()=>[a(r.UploadFileComponent,{modelValue:r.form.cover,"onUpdate:modelValue":e[0]||(e[0]=o=>r.form.cover=o),label:"Выбрать обложку",error:r.form.invalid("cover"),"error-message":r.form.errors.cover,onChange:e[1]||(e[1]=o=>r.form.validate("cover"))},null,8,["modelValue","error","error-message"]),r.form.cover[0]?(n(),s(c,{key:0,src:r.form.cover[0].url,"spinner-color":"white",class:"q-mb-sm",style:{height:"10rem","max-width":"10rem"}},null,8,["src"])):w("",!0),a(l,{modelValue:r.form.title,"onUpdate:modelValue":e[2]||(e[2]=o=>r.form.title=o),label:"Название вебинара",error:r.form.invalid("title"),"error-message":r.form.errors.title,onChange:e[3]||(e[3]=o=>r.form.validate("title"))},null,8,["modelValue","error","error-message"]),a(l,{modelValue:r.form.description,"onUpdate:modelValue":e[4]||(e[4]=o=>r.form.description=o),label:"Описание вебинара",type:"textarea",error:r.form.invalid("description"),"error-message":r.form.errors.description,onChange:e[5]||(e[5]=o=>r.form.validate("description"))},null,8,["modelValue","error","error-message"]),a(l,{modelValue:r.form.stream_url,"onUpdate:modelValue":e[6]||(e[6]=o=>r.form.stream_url=o),label:"Ссылка на трансляцию",error:r.form.invalid("stream_url"),"error-message":r.form.errors.stream_url,onChange:e[7]||(e[7]=o=>r.form.validate("stream_url"))},null,8,["modelValue","error","error-message"]),a(l,{modelValue:r.form.price,"onUpdate:modelValue":e[8]||(e[8]=o=>r.form.price=o),label:"Цена",error:r.form.invalid("price"),"error-message":r.form.errors.price,onChange:e[9]||(e[9]=o=>r.form.validate("price"))},null,8,["modelValue","error","error-message"]),i("div",R,[i("div",j,[a(l,{modelValue:r.form.start_at,"onUpdate:modelValue":e[10]||(e[10]=o=>r.form.start_at=o),label:"Дата начала",type:"datetime-local",error:r.form.invalid("start_at"),"error-message":r.form.errors.start_at,onBlur:e[11]||(e[11]=o=>r.form.validate("start_at"))},null,8,["modelValue","error","error-message"])]),i("div",z,[a(l,{modelValue:r.form.end_at,"onUpdate:modelValue":e[12]||(e[12]=o=>r.form.end_at=o),label:"Дата окончания",type:"datetime-local",error:r.form.invalid("end_at"),"error-message":r.form.errors.end_at,onBlur:e[13]||(e[13]=o=>r.form.validate("end_at"))},null,8,["modelValue","error","error-message"])])])]),_:1}),a(x,null,{default:u(()=>[a(d,{label:"Создать вебинар",type:"submit",color:"primary",disabled:r.form.processing},null,8,["disabled"]),a(d,{label:"Отмена",color:"secondary",onClick:r.cancel})]),_:1})]),_:1})]),_:1},8,["valid"]),a(P,{showing:r.form.processing},{default:u(()=>[a(S,{size:"5rem",color:"primary"})]),_:1},8,["showing"])]),_:1})}const lr=E(q,[["render",G],["__file","CreatePage.vue"]]);export{lr as default};