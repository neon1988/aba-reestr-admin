import{a6 as e}from"./index-B5fKhRmK.js";const n=(t,l=1)=>e.get("/bulletins",{params:{status:t,page:l}}),u=t=>e.get(`/bulletins/${t}`),a=(t,l)=>e.put(`/bulletins/${t}`,l),i=t=>e.put(`/bulletins/${t}/approve`),p=t=>e.put(`/bulletins/${t}/reject`);export{u as a,i as b,n as g,p as r,a as u};