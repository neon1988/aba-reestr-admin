import{c as t,f as a,h as r,C as l}from"./index-B6qH9XSO.js";const i=t({name:"QToolbarTitle",props:{shrink:Boolean},setup(o,{slots:e}){const s=a(()=>"q-toolbar__title ellipsis"+(o.shrink===!0?" col-shrink":""));return()=>r("div",{class:s.value},l(e.default))}}),c=t({name:"QToolbar",props:{inset:Boolean},setup(o,{slots:e}){const s=a(()=>"q-toolbar row no-wrap items-center"+(o.inset===!0?" q-toolbar--inset":""));return()=>r("div",{class:s.value,role:"toolbar"},l(e.default))}});export{c as Q,i as a};