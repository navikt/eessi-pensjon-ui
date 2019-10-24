(this["webpackJsonpeessi-pensjon-ui"]=this["webpackJsonpeessi-pensjon-ui"]||[]).push([[25],{265:function(e,t,a){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var a=[],n=!0,l=!1,r=void 0;try{for(var c,s=e[Symbol.iterator]();!(n=(c=s.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(o){l=!0,r=o}finally{try{n||null==s.return||s.return()}finally{if(l)throw r}}return a}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}a.d(t,"a",(function(){return n}))},426:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(2),c=a.n(r),s=function(e){return l.a.createElement("img",{width:e.width||e.size||220,alt:"nav-smilende-veileder",height:e.height||e.size||220,src:a(482)})},o=function(e){return l.a.createElement("img",{width:e.width||e.size||220,alt:"nav-trist-veileder",height:e.height||e.size||220,src:a(483)})},i=function(e){var t=e.className,a=e.mood,n=void 0===a?"smilende":a;return l.a.createElement("div",{className:c()("c-psycho",t)},"trist"===n?l.a.createElement(o,{width:"130",height:"130"}):l.a.createElement(s,{width:"130",height:"130"}))};i.displayName="Psycho";t.a=i},482:function(e,t,a){e.exports=a.p+"static/media/navPensjonSmilendeOrangeVeileder.8a5aad1f.png"},483:function(e,t,a){e.exports=a.p+"static/media/navPensjonTristOrangeVeileder.d524a921.png"},959:function(e,t,a){},975:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(268),c=a(426),s=a(265),o=a(48),i=a(274),m=a(2),u=a.n(m),d=(a(959),function(e){var t=e.children,a=e.className,r=e.closeButton,m=void 0!==r&&r,d=e.mood,p=Object(n.useState)(!1),E=Object(s.a)(p,2),h=E[0],y=E[1];return h?null:l.a.createElement("div",{className:u()("c-psychoPanel",a)},l.a.createElement(o.z,{type:"normal",svg:l.a.createElement(c.a,{mood:d}),kompakt:!0},t,m?l.a.createElement("div",{className:"closeButton"},l.a.createElement("a",{href:"#close",onClick:function(e){e.preventDefault(),e.stopPropagation(),y(!0)},style:{position:"absolute",top:"5px",right:"5px"}},l.a.createElement(i.b,{kind:"nav-close"}))):null))});d.displayName="PsychoPanel";var p=d,E=a(974),h=a(275),y=a(276);E.a.registerLanguage("jsx",h.a);t.default=function(){return l.a.createElement(r.a,null,l.a.createElement(o.p,{className:"p-4"},l.a.createElement(o.u,{className:"pt-4 pb-4"},"Psycho"),l.a.createElement(o.o,null,"This component renders the EESSI Pensjon veileder's avatar, named Psycho"),l.a.createElement(o.y,{className:"pt-4 pb-4"},"Single veileder"),l.a.createElement(c.a,null),l.a.createElement(E.a,{language:"javascript",style:y.a},"<Psycho/>"),l.a.createElement(o.y,{className:"pt-4 pb-4"},"Single veileder: trist version"),l.a.createElement(c.a,{mood:"trist"}),l.a.createElement(E.a,{language:"javascript",style:y.a},"<Psycho mood='trist'/>"),l.a.createElement(o.y,{className:"pt-4 pb-4"},"Veileder panel"),l.a.createElement(p,{closeButton:!0},l.a.createElement("div",null,"Please log in to see your settings page")),l.a.createElement(E.a,{language:"javascript",style:y.a},"<PsychoPanel closeButton={true}>\n  <div>Please log in to see your settings page</div>\n </PsychoPanel>"),l.a.createElement(o.y,{className:"pt-4 pb-4"},"Component import"),l.a.createElement(E.a,{language:"javascript",style:y.a},"import { Psycho } from 'eessi-pensjon-ui'\nimport { PsychoPanel } from 'eessi-pensjon-ui'"),l.a.createElement(o.o,{className:"pb-4"},"Default component's classname: ",l.a.createElement("code",null,"c-psycho"),", ",l.a.createElement("code",null,"c-psychoPanel")),l.a.createElement(o.y,{className:"pt-4 pb-4"},"React props"),l.a.createElement("table",{className:"tabell"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Property"),l.a.createElement("th",null,"Type"),l.a.createElement("th",null,"Required"),l.a.createElement("th",null,"Description"),l.a.createElement("th",null,"Default"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"className"),l.a.createElement("td",null,l.a.createElement("code",null,"string")),l.a.createElement("td",null,"false"),l.a.createElement("td",null,"Additional classnames"),l.a.createElement("td",null,"-")),l.a.createElement("tr",null,l.a.createElement("td",null,"closeButton"),l.a.createElement("td",null,l.a.createElement("code",null,"button")),l.a.createElement("td",null,"false"),l.a.createElement("td",null,"Render a close button for the PsychoPanel "),l.a.createElement("td",null,"false")),l.a.createElement("tr",null,l.a.createElement("td",null,"mood"),l.a.createElement("td",null,l.a.createElement("code",null,"string")),l.a.createElement("td",null,"false"),l.a.createElement("td",null,"Veieder's mood. Can take two values, ",l.a.createElement("code",null,"smilende")," or ",l.a.createElement("code",null,"trist")),l.a.createElement("td",null,l.a.createElement("code",null,"smilende")))))))}}}]);
//# sourceMappingURL=25.f7cb5c28.chunk.js.map