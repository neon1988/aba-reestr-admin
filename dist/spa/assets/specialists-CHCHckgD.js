import{ab as t}from"./index-B6qH9XSO.js";const i=(s,a=1)=>t.get("/specialists",{params:{status:s,page:a}}),p=s=>t.get(`/specialists/${s}`),c=s=>t.put(`/specialists/${s}/approve`),o=s=>t.put(`/specialists/${s}/reject`);export{p as a,c as b,i as g,o as r};
