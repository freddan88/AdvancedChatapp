(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{32:function(e,t,a){e.exports=a(67)},62:function(e,t){},66:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(29),r=a.n(n),c=a(0),l=a.n(c),s=a(31),u=a(1),i=a(30),m=a.n(i),o=a(14),E=a.n(o),b=(a(66),m()()),d=function(){var e=Object(c.useState)(""),t=Object(u.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)([]),i=Object(u.a)(r,2),m=i[0],o=i[1],d=Object(c.useState)(!1),h=Object(u.a)(d,2),p=h[0],f=h[1],g=Object(c.useState)(!1),v=Object(u.a)(g,2),O=v[0],j=v[1],N=Object(c.useState)(""),y=Object(u.a)(N,2),k=y[0],S=y[1],C=Object(c.useState)([]),x=Object(u.a)(C,2),I=x[0],w=x[1],A=Object(c.useRef)(null);b.on("chat message",(function(e){if(w([].concat(Object(s.a)(I),[e])),A.current){var t=A.current.nextElementSibling,a=A.current.lastElementChild;t.removeAttribute("disabled"),a.scrollIntoView({behavior:"smooth"})}})),b.on("user name",(function(e){var t=JSON.parse(e);o(t)})),b.on("disconnect",(function(e){o(m.filter((function(t){return t.name!==e})))}));var J=function(e){var t=e.target.value;n(t),t.length>0?j(!0):j(!1)},P=function(e){"Enter"===e.key&&U()},U=function(){a&&a.length>0&&(b.emit("user name",a),f(!0))},V=function(e){S(e.target.value)},F=function(e){if("Enter"===e.key){var t=e.target.dataset.user;if(k.length>0&&(b.emit("chat message",{currentUser:t,messageInputValue:k}),S("")),A.current)A.current.nextElementSibling.setAttribute("disabled","")}};return l.a.createElement(c.Fragment,null,l.a.createElement("header",{className:"main-header"},l.a.createElement("figure",{className:"main-header__logo"},l.a.createElement("img",{src:"https://picsum.photos/100",alt:"logo"}),l.a.createElement("figcaption",null,"ChatApp"))),l.a.createElement("aside",{className:"sidebar"},l.a.createElement("h1",null,"Connected Clients: ",m.length),E.a.map(m,(function(e,t){return l.a.createElement("div",{key:t,className:"user-indicator"},l.a.createElement("div",{className:"user-status"}),l.a.createElement("span",null,e.name))}))),p?l.a.createElement("section",{className:"main-content"},l.a.createElement("div",{className:"chatbox",ref:A},E.a.map(I,(function(e,t){var n=e.currentUser===a?"mine":"other";return l.a.createElement("article",{key:t,className:"message ".concat(n)},l.a.createElement("header",null,l.a.createElement("span",null,e.currentUser),l.a.createElement("time",{dateTime:e.time},e.time)),l.a.createElement("p",null,e.messageInputValue))}))),l.a.createElement("input",{type:"text","data-user":a,onKeyPress:F,onChange:V,placeholder:"Enter a message...",value:k})):l.a.createElement("section",{className:"overlay"},l.a.createElement("label",{htmlFor:"nick-name"},"Please enter a username:"),l.a.createElement("input",{type:"text",id:"nick-name",placeholder:"Your username...",onKeyPress:P,onChange:J,value:a}),l.a.createElement("button",{className:O?"":"disabled",onClick:U},"Confirm")))};r.a.render(l.a.createElement(d,null),document.getElementById("root"))}},[[32,1,2]]]);
//# sourceMappingURL=main.2494136c.chunk.js.map