(this.webpackJsonpcuriosity=this.webpackJsonpcuriosity||[]).push([[0],{30:function(e,t,c){},31:function(e,t,c){},32:function(e,t,c){},59:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),s=c(23),r=c.n(s),i=(c(30),c(31),c(32),c(8)),l=c(2),o=c(0);function j(){return Object(o.jsxs)("footer",{children:[Object(o.jsx)("span",{children:"CURIOCITY V1.0"}),Object(o.jsx)("span",{children:"Proyecto RUTAS"})]})}var u=c(3),d=Object(n.createContext)(),b=function(e,t){switch(t.type){case"login":return localStorage.setItem("admin",!0),{authenticated:!0};case"logout":return localStorage.setItem("admin",!1),{authenticated:!1};default:throw new Error("Unhandled action type: ".concat(t.type))}},O=function(e){var t=e.children,c=Object(n.useReducer)(b,{authenticated:localStorage.getItem("admin")}),a=Object(u.a)(c,2),s={state:a[0],dispatch:a[1]};return Object(o.jsx)(d.Provider,{value:s,children:t})},h=function(){var e=Object(n.useContext)(d);if(void 0===e)throw new Error("useAdmin must be used within a AdminProvider");return e};function m(e){var t=e.openMenu,c=void 0!==t&&t,n=e.setOpenMenu,a=h(),s=a.state.authenticated,r=a.dispatch;return Object(o.jsxs)("div",{className:"menuBar ".concat(c?"menuBar--open":""),children:[Object(o.jsx)(i.b,{to:"/publish",className:"menuBar__link",onClick:function(){return n(!1)},children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas fa-info-circle"}),"Publicar"]})}),s?Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(i.b,{to:"/applications",className:"menuBar__link",onClick:function(){return n(!1)},children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas  fa-clipboard-list"}),"Solicitudes"]})}),Object(o.jsx)(i.b,{to:"/login",className:"menuBar__link",onClick:function(){n(!1),r({type:"logout"})},children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas fa-sign-out-alt"}),"Cerrar Sesi\xf3n"]})})]}):Object(o.jsx)(i.b,{to:"/login",className:"menuBar__link",onClick:function(){return n(!1)},children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas  fa-user-cog"}),"Admin"]})})]})}function p(){var e=Object(n.useState)(!1),t=Object(u.a)(e,2),c=t[0],a=t[1],s=h(),r=s.state.authenticated,l=s.dispatch;return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("nav",{className:"header-container",children:[Object(o.jsxs)("div",{className:"logo-container",children:[Object(o.jsx)(i.b,{to:"/search",className:"link",children:Object(o.jsx)("h1",{children:"CURIOCITY"})}),Object(o.jsx)("span",{children:"Proyecto RUTAS"})]}),Object(o.jsxs)("div",{className:"links-container",children:[Object(o.jsx)(i.b,{to:"/publish",className:"link",children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas fa-info-circle"}),"Publicar"]})}),r?Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(i.b,{to:"/applications",className:"link",children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas fa-clipboard-list"}),"Solicitudes"]})}),Object(o.jsx)(i.b,{to:"/login",className:"link",onClick:function(){l({type:"logout"})},children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas fa-sign-out-alt"}),"Cerrar Sesi\xf3n"]})})]}):Object(o.jsx)(i.b,{to:"/login",className:"link",children:Object(o.jsxs)("span",{children:[Object(o.jsx)("i",{className:"fas fa-user-cog"}),"Admin"]})})]}),Object(o.jsxs)("div",{className:"menu ".concat(c?"menu--translate":""),onClick:function(){return a(!c)},children:[Object(o.jsx)("div",{className:"menu__bar ".concat(c?"menu__bar--top":"")}),Object(o.jsx)("div",{className:"menu__bar ".concat(c?"menu__bar--middle":"")}),Object(o.jsx)("div",{className:"menu__bar ".concat(c?"menu__bar--bottom":"")})]})]}),Object(o.jsx)(m,{openMenu:c,setOpenMenu:a})]})}var f=c(14),x=c.n(f),v=c.p+"static/media/mainImage.a9ba04e6.svg",N=c.p+"static/media/noResults.5fe148f1.svg",g=c.p+"static/media/noApplications.bde73ab2.svg",w=c(5),y=c.n(w),k=c(7),_="http://159.65.77.213:3000",C=function(){var e=Object(k.a)(y.a.mark((function e(t){var c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(_,"/consult"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});case 2:return c=e.sent,e.abrupt("return",c);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(k.a)(y.a.mark((function e(t){var c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(_,"/artifact/").concat(t),{method:"GET",headers:{"content-type":"application/json"}});case 2:return c=e.sent,e.abrupt("return",c);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(k.a)(y.a.mark((function e(t){var c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(_,"/create"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});case 2:return c=e.sent,e.abrupt("return",c);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(k.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(_,"/museums"),{method:"GET",headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return e.result})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(k.a)(y.a.mark((function e(t,c){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("".concat(_,"/update/").concat(t),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({action:c})}).then((function(e){return e.json()})).then((function(e){return console.log(e)})));case 1:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}();function D(e){var t,c=e.app,a=e.removeApplication,s=e.idx,r=Object(n.useState)(!1),i=Object(u.a)(r,2),l=i[0],j=i[1],d=function(e){T(c.id.value,e),a(s),j(!1)};return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsxs)("div",{className:"application ".concat(l?"rotate":""),onClick:function(){return j(!l)},children:[Object(o.jsx)("i",{className:"fas fa-clipboard-list"}),Object(o.jsx)("span",{children:c.labelArtifact.value})]}),l&&Object(o.jsxs)("div",{className:"details",children:[Object(o.jsxs)("div",{className:"row",children:[Object(o.jsxs)("div",{className:"column",children:[Object(o.jsx)("h4",{className:"label",children:"Titulo:"}),Object(o.jsx)("p",{children:c.labelArtifact.value})]}),Object(o.jsxs)("div",{className:"column",children:[Object(o.jsx)("h4",{className:"label",children:"Autor:"}),Object(o.jsx)("p",{children:c.labelCreator.value})]})]}),Object(o.jsxs)("div",{className:"row",children:[Object(o.jsxs)("div",{className:"column",children:[Object(o.jsx)("h4",{className:"label",children:"Material:"}),Object(o.jsx)("p",{children:c.labelMaterial.value})]}),Object(o.jsxs)("div",{className:"column",children:[Object(o.jsx)("h4",{className:"label",children:"Ubicacion:"}),Object(o.jsx)("p",{children:c.labelKeeper.value})]})]}),Object(o.jsx)("div",{className:"row row--fullw",children:Object(o.jsxs)("div",{className:"column",children:[Object(o.jsx)("h4",{className:"label",children:"Periodo:"}),Object(o.jsx)("p",{children:(null===(t=c.perios_l)||void 0===t?void 0:t.value)||"Desconocido"})]})}),Object(o.jsx)("div",{className:"row row--fullw",children:Object(o.jsxs)("div",{className:"column",children:[Object(o.jsx)("h4",{className:"label",children:"Descripcion:"}),Object(o.jsx)("p",{children:c.note.value})]})}),Object(o.jsxs)("div",{className:"controls",children:[Object(o.jsx)("button",{className:"approve",onClick:function(){return d("approved")},children:"Aprobar"}),Object(o.jsx)("button",{className:"decline",onClick:function(){return d("declined")},children:"Rechazar"})]})]})]})}function E(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(!0),r=Object(u.a)(s,2),i=r[0],l=r[1],j=function(e){var t=c.filter((function(t,c){return e!==c}));a(t)};return Object(n.useEffect)((function(){C({status:"Unverified"}).then((function(e){return e.json()})).then((function(e){a(e.result)})).catch((function(e){console.log(e())})).finally((function(){l(!1)}))}),[]),Object(o.jsxs)("div",{className:"applications",children:[Object(o.jsx)("h1",{children:"Solicitudes"}),i?Object(o.jsx)("div",{className:"applications__loader",children:Object(o.jsx)(x.a,{type:"Circles",color:"#313B72",height:80,width:80,visible:!0})}):c.length>0?Object(o.jsx)("div",{className:"applications__container",children:c.map((function(e,t){return Object(o.jsx)(D,{app:e,idx:t,removeApplication:j},e.id.value)}))}):Object(o.jsxs)("div",{className:"applications__empty",children:[Object(o.jsx)("img",{src:g,alt:""}),Object(o.jsx)("p",{children:"No hay nuevas solicitudes"})]})]})}function U(){var e=Object(l.h)().id,t=Object(n.useState)({}),c=Object(u.a)(t,2),a=c[0],s=c[1],r=Object(n.useState)(!0),i=Object(u.a)(r,2),j=i[0],d=i[1],b=function(){var t=Object(k.a)(y.a.mark((function t(){var c,n;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,S(e);case 3:return c=t.sent,t.next=6,c.json();case 6:n=t.sent,console.log(n),s(Object.keys(n.result[0]).reduce((function(e,t){return e[t]=n.result[0][t].value,e}),{})),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:return t.prev=14,d(!1),t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[0,11,14,17]])})));return function(){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){b()}),[]),Object(o.jsx)(o.Fragment,{children:j?Object(o.jsx)("div",{className:"loader-detail",children:Object(o.jsx)(x.a,{type:"Circles",color:"#313B72",height:100,width:100,visible:!0})}):Object(o.jsxs)("div",{className:"detail-container",children:[Object(o.jsx)("div",{className:"image-container",children:Object(o.jsx)("i",{className:"far fa-image"})}),Object(o.jsxs)("div",{className:"info-container",children:[Object(o.jsx)("h2",{children:a.artifactLabel}),Object(o.jsxs)("div",{className:"info",children:[Object(o.jsx)("span",{children:"Autor"}),Object(o.jsx)("span",{children:(null===a||void 0===a?void 0:a.authorLabel)||"Desconocido"})]}),Object(o.jsxs)("div",{className:"info",children:[Object(o.jsx)("span",{children:"Material"}),Object(o.jsx)("span",{children:a.materialLabel})]}),Object(o.jsxs)("div",{className:"info",children:[Object(o.jsx)("span",{children:"Ubicacion"}),Object(o.jsx)("span",{children:a.keeperLabel})]}),Object(o.jsxs)("div",{className:"info",children:[Object(o.jsx)("span",{children:"Periodo"}),Object(o.jsx)("span",{children:a.period_l||"Desconocido"})]}),Object(o.jsxs)("div",{className:"info",children:[Object(o.jsx)("span",{children:"Descripcion"}),Object(o.jsx)("span",{children:a.note})]})]})]})})}var B=c(15);function F(e){var t=e.infoCard,c=void 0===t?{}:t,n=c.labelArtifact,a=c.labelKeeper,s=c.labelCreator,r=c.id,i=Object(l.g)();return Object(o.jsxs)("div",{className:"card-container",children:[Object(o.jsxs)("div",{className:"card-image",children:[Object(o.jsx)("i",{className:"far fa-image"}),Object(o.jsx)("span",{children:n.value})]}),Object(o.jsxs)("div",{className:"card-row",children:[Object(o.jsx)("span",{children:"Autor"}),Object(o.jsx)("p",{children:(null===s||void 0===s?void 0:s.value)||"Desconocido"})]}),Object(o.jsxs)("div",{className:"card-row",children:[Object(o.jsx)("span",{children:"Ubicacion"}),Object(o.jsx)("p",{children:a.value})]}),Object(o.jsx)("div",{className:"card-button-container",children:Object(o.jsx)("button",{onClick:function(){i.push("/search/".concat(r.value))},children:"Ver mas..."})})]})}var I=c(16),L=c(12),M=c(25);function W(e){var t=e.label,c=e.setfields,n=e.name,a=e.fields,s=e.empty,r=e.size,i=void 0===r?"md":r,l=e.submit,j=e.textarea,u=e.fullWidth,d=e.placeholder,b=void 0===d?"Busqueda":d,O=Object(M.a)(e,["label","setfields","name","fields","empty","size","submit","textarea","fullWidth","placeholder"]),h=function(e){var t=e.target;c(Object(L.a)(Object(L.a)({},a),{},Object(I.a)({},t.name,t.value)))};return Object(o.jsxs)("div",{className:"input-container ".concat("sm"===i?"input-container-sm":""," ").concat(u&&"fullWidth"," ").concat(!t&&"input-container--center"),children:[Object(o.jsxs)("label",{children:[t&&"".concat(t,":")," "]}),j?Object(o.jsx)("textarea",Object(L.a)({placeholder:b,className:s?"empty":"",name:n,autoComplete:"off",onChange:function(e){return h(e)},onKeyDown:function(e){return"Enter"===e.key&&l()}},O)):Object(o.jsx)("input",Object(L.a)({type:"text",placeholder:b,className:s?"empty":"",name:n,autoComplete:"off",onChange:function(e){return h(e)},onKeyDown:function(e){return"Enter"===e.key&&l()}},O))]})}function R(e){var t=e.numberOfPages,c=e.activePage,n=e.setactivePage;return Object(o.jsxs)("div",{className:"pagination-container",children:[Object(o.jsx)("span",{className:"arrow",onClick:function(){return c>1&&n(c-1)},children:"<"}),Object(B.range)(1,t+1,1).map((function(e){return Object(o.jsx)("span",{className:"number ".concat(c===e?"actual":""),onClick:function(){return n(e)},children:e},e)})),Object(o.jsx)("span",{className:"arrow",onClick:function(){return c<t&&n(c+1)},children:">"})]})}c(58);function J(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)({title:"",author:"",period:"",material:"",place:""}),r=Object(u.a)(s,2),i=r[0],l=r[1],j=Object(n.useState)(1),d=Object(u.a)(j,2),b=d[0],O=d[1],h=Object(n.useState)(!1),m=Object(u.a)(h,2),p=m[0],f=m[1],g=Object(n.useState)(!0),w=Object(u.a)(g,2),_=w[0],S=w[1],A=Object(n.useState)(!1),P=Object(u.a)(A,2),T=P[0],D=P[1],E=function(){var e=Object(k.a)(y.a.mark((function e(){var t,c;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Object.values(i).every((function(e){return!e}))){e.next=21;break}return S(!1),f(!0),e.prev=3,e.next=6,C(i);case 6:return t=e.sent,e.next=9,t.json();case 9:c=e.sent,a(Object(B.chunk)(c.result,8)),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.log(e.t0);case 16:return e.prev=16,f(!1),e.finish(16);case 19:e.next=22;break;case 21:D(!0);case 22:case"end":return e.stop()}}),e,null,[[3,13,16,19]])})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){D(!1)}),[i]),Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"home-container",children:[Object(o.jsxs)("div",{className:"row",children:[Object(o.jsx)("div",{className:"row-item",children:Object(o.jsx)(W,{label:"Autor",setfields:l,fields:i,name:"author",empty:T,submit:E})}),Object(o.jsx)("div",{className:"row-item",children:Object(o.jsx)(W,{label:"Material",setfields:l,fields:i,name:"material",empty:T,submit:E})}),Object(o.jsx)("div",{className:"row-item",children:Object(o.jsx)(W,{label:"Lugar",setfields:l,fields:i,name:"place",empty:T,submit:E})})]}),Object(o.jsxs)("div",{className:"row",children:[Object(o.jsx)("div",{className:"row-item",children:Object(o.jsx)(W,{label:"Periodo",setfields:l,fields:i,name:"period",empty:T,submit:E})}),Object(o.jsx)("div",{className:"row-item",children:Object(o.jsx)(W,{label:"Titulo",setfields:l,fields:i,name:"title",empty:T,submit:E})}),Object(o.jsx)("div",{className:"control",children:Object(o.jsx)("button",{onClick:function(){return E()},disabled:p,className:p?"disabled":"",children:"Buscar"})})]}),_&&Object(o.jsx)("div",{className:"image-container",children:Object(o.jsx)("img",{src:v,alt:"",className:"pristine"})}),!_&&0===c.length&&!p&&Object(o.jsxs)("div",{className:"image-container",children:[Object(o.jsx)("span",{children:"No hay resultados"}),Object(o.jsx)("img",{src:N,alt:"",className:"noResult"})]}),p?Object(o.jsx)("div",{className:"loader-container",children:Object(o.jsx)(x.a,{type:"Circles",color:"#313B72",height:80,width:80,visible:!0})}):Object(o.jsx)("div",{className:"cards-container",children:Object(B.chunk)(c[b-1],4).map((function(e,t){return Object(o.jsx)("div",{className:"cards-row",children:e.map((function(e){return Object(o.jsx)(F,{infoCard:e},e.id.value)}))},t)}))}),c.length>0&&!p&&Object(o.jsx)(R,{numberOfPages:c.length,activePage:b,setactivePage:O})]})})}function K(){var e=Object(n.useState)({username:"",password:""}),t=Object(u.a)(e,2),c=t[0],a=t[1],s=Object(l.g)(),r=Object(n.useState)(!1),i=Object(u.a)(r,2),j=i[0],d=i[1],b=h().dispatch,O=function(e){null===e||void 0===e||e.preventDefault(),"admin"===c.username&&"admin"===c.password?(b({type:"login"}),s.push("applications")):d(!0)};return Object(o.jsx)("div",{className:"login",children:Object(o.jsxs)("form",{className:"login__container",onSubmit:O,children:[Object(o.jsx)("i",{className:"fas fa-user-cog"}),Object(o.jsx)(W,{placeholder:"Usuario",name:"username",fullWidth:!0,fields:c,setfields:a,submit:O}),Object(o.jsx)(W,{placeholder:"Contrase\xf1a",name:"password",fullWidth:!0,fields:c,setfields:a,type:"password",submit:O}),j&&Object(o.jsx)("span",{className:"login__container__error",children:"Credenciales inv\xe1lidas"}),Object(o.jsx)("button",{className:"login__button",type:"submit",children:"Ingresar"})]})})}function z(e){var t=e.museums,c=void 0===t?[]:t,n=e.onSelect,a=void 0===n?function(e){return e}:n;return Object(o.jsxs)("div",{className:"select",children:[Object(o.jsx)("span",{className:"label",children:"Ubicaci\xf3n"}),Object(o.jsxs)("div",{className:"select__container",children:[Object(o.jsxs)("select",{name:"",id:"",onChange:function(e){return a(e.target.value)},defaultValue:"DEFAULT",children:[Object(o.jsx)("option",{value:"DEFAULT",disabled:!0,children:"Seleccione un museo"}),c.map((function(e,t){return Object(o.jsx)("option",{value:t,children:e.label},t)}))]}),Object(o.jsx)("div",{className:"arrow"})]})]})}function V(){var e=Object(n.useState)({title:"",author:"",material:"",location:"",description:""}),t=Object(u.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)([]),r=Object(u.a)(s,2),i=r[0],l=r[1],j=Object(n.useState)(""),d=Object(u.a)(j,2),b=d[0],O=d[1],h=Object(n.useState)(!1),m=Object(u.a)(h,2),p=m[0],f=m[1],x=function(){var e=Object(k.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P();case 2:t=e.sent,l(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=c.title,t=c.author,n=c.material,a=c.location;return!(e&&t&&n&&a)},N=function(){var e=Object(k.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!v()){e.next=3;break}return O("Debe llenar todos los campos."),e.abrupt("return");case 3:return e.next=5,A(c);case 5:return t=e.sent,e.next=8,t.json();case 8:e.sent.ok?f(!0):O("Ocurri\xf3 un error inesperado, porfavor intentelo mas tarde.");case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){x()}),[]),Object(n.useEffect)((function(){O(!1),f(!1)}),[c]),Object(o.jsx)("div",{className:"form-wrap",children:Object(o.jsxs)("div",{className:"form-container",children:[Object(o.jsx)("h1",{children:"Agrega una nueva obra"}),Object(o.jsxs)("div",{className:"form-group",children:[Object(o.jsx)(W,{label:"T\xedtulo",fields:c,setfields:a,name:"title",fullWidth:!0,submit:N}),Object(o.jsx)(W,{label:"Autor",fields:c,setfields:a,name:"author",fullWidth:!0,submit:N}),Object(o.jsx)(W,{label:"Materiales",fields:c,setfields:a,name:"material",fullWidth:!0,submit:N}),Object(o.jsx)(W,{textarea:!0,label:"Descripci\xf3n",fields:c,setfields:a,name:"description",fullWidth:!0,submit:N}),Object(o.jsx)(z,{onSelect:function(e){a(Object(L.a)(Object(L.a)({},c),{},{location:i[e].museum}))},museums:i}),b&&Object(o.jsx)("span",{className:"form__error",children:b}),p&&Object(o.jsx)("span",{className:"form__success",children:"Los datos se han agregado exitosamente."}),Object(o.jsx)("button",{className:"btn form-button",onClick:function(){return N()},children:"Agregar"})]})]})})}function G(){return Object(o.jsxs)(i.a,{children:[Object(o.jsx)(p,{}),Object(o.jsxs)(l.d,{children:[Object(o.jsx)(l.b,{exact:!0,path:"/login",component:function(){return Object(o.jsx)(K,{})}}),Object(o.jsx)(l.b,{exact:!0,path:"/search",component:function(){return Object(o.jsx)(J,{})}}),Object(o.jsx)(l.b,{exact:!0,path:"/search/:id",component:function(){return Object(o.jsx)(U,{})}}),Object(o.jsx)(l.b,{exact:!0,path:"/publish",component:function(){return Object(o.jsx)(V,{})}}),Object(o.jsx)(l.b,{exact:!0,path:"/applications",component:function(){return Object(o.jsx)(E,{})}}),Object(o.jsx)(l.a,{to:"/search"})]}),Object(o.jsx)(j,{})]})}var Y=function(){return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(O,{children:Object(o.jsx)(G,{})})})},q=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,60)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),n(e),a(e),s(e),r(e)}))};r.a.render(Object(o.jsx)(a.a.StrictMode,{children:Object(o.jsx)(Y,{})}),document.getElementById("root")),q()}},[[59,1,2]]]);
//# sourceMappingURL=main.18b5c93a.chunk.js.map