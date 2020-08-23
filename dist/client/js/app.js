!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.daki=t():e.daki=t()}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class o{constructor(e,t,n={}){this.control=e,this.deleteControl=t,this.options=n,"object"==typeof t&&(this.options=t,this.deleteControl=e,this.control=null),this.controlEl=this.control?document.querySelector(this.control):null,this.setEventListener()}async delete(e){const t=e.target.closest(this.deleteControl);if(!t)return;e.preventDefault();if(!confirm("Do you want to delete?"))return;const n=t.getAttribute("href"),o=await fetch(n);(await o.json()).error||this.options&&this.options.parent&&e.target.closest(this.options.parent).remove()}setEventListener(){if(this.controlEl)return void this.controlEl.addEventListener("click",e=>this.delete(e));document.querySelectorAll(this.deleteControl).forEach(e=>{e.addEventListener("click",e=>this.delete(e))})}}var i=function(e,t,n={}){return new o(e,t,n)};const s=document.getElementById("media-list"),r=document.getElementById("file-browser"),l=document.getElementById("file-trigger-browser"),d=document.getElementById("file-preview"),a=document.getElementById("form-upload-button"),c=document.getElementById("form-upload"),u=document.getElementById("form-upload-control");let m=!1;const h={element:null},f={init:!1,modalStack:[],openOverlay:()=>{document.getElementById("modal").classList.remove("hidden"),document.body.classList.add("overflow-hidden")},closeOverlay:()=>{document.getElementById("modal").classList.add("hidden"),document.body.classList.remove("overflow-hidden")}};class p{constructor(e,t,n={}){n={...h,...n},this.control="object"==typeof e?e:document.querySelectorAll(e),0!==this.control.length&&(this.element=document.querySelector(t),this.options=n,this.closeControl=this.element.querySelectorAll(".modal-close"),this._setEventListener(),f.init||this._initGlobal())}showEvent(e){e.preventDefault(),f.modalStack.length>0?f.modalStack[f.modalStack.length-1].hide():f.openOverlay(),this.show(),this._show(),f.modalStack.push(this)}hideEvent(e){e.target.closest(".modal-close")&&(e.preventDefault(),this.hide(),this._hide())}_show(){document.getElementById("modal").scrollTop=0}_hide(){if(f.modalStack.pop(),0===f.modalStack.length)return f.closeOverlay();f.modalStack[f.modalStack.length-1].show()}hide(){this.element.classList.add("hidden")}show(){this.element.classList.remove("hidden")}_setEventListener(){for(const e of this.closeControl)e.addEventListener("click",e=>this.hideEvent(e));for(const e of this.control)e.addEventListener("click",e=>this.showEvent(e))}_initGlobal(){document.getElementById("modal").addEventListener("click",e=>p.hideGlobal(e)),document.addEventListener("keydown",e=>p.hideGlobal(e)),f.init=!0}static hideGlobal(e){if(0!==f.modalStack.length&&"INPUT"!==e.target.tagName&&"TEXTAREA"!==e.target.tagName&&("modal"===e.target.id||27===e.keyCode)){if(f.modalStack.pop().hide(),0===f.modalStack.length)return f.closeOverlay();f.modalStack[f.modalStack.length-1].show()}}}class y{constructor(e,t,n={}){this.control=e,this.form=t,this.options=n,"object"==typeof t&&(this.control=null,this.form=e,this.options=t),this.controlEl=this.control?document.querySelector(this.control):null,this.isSubmitted=!1,this.setEvents()}async submit(e){if(e.preventDefault(),this.isSubmitted)return;this.isSubmitted=!0;const t=e.target;console.log(t);const n=new FormData(t),o=t.getAttribute("action"),i=t.querySelector(".form-submit-text");console.log(i);const s=t.querySelector("button[type=submit]"),r=s.innerText;s.innerText="...",i.innerText="",i.classList.remove("text-indigo-500"),i.classList.remove("text-red-500");try{const e=await fetch(o,{method:"post",body:n});(await e.json()).error?(i.innerText="Submit failed, please check data and try again.",i.classList.add("text-red-500")):(i.innerText="Submit successed.",i.classList.add("text-indigo-500"))}catch(e){console.log(e),i.innerText="Please try again.",i.classList.add("text-red-500")}s.innerText=r,this.isSubmitted=!1}setEvents(){this.controlEl?this.controlEl.addEventListener("submit",e=>this.submit(e)):document.querySelectorAll(this.form).forEach(e=>{e.addEventListener("submit",e=>this.submit(e))})}}const g=document.querySelectorAll(".thing-trans");r&&a&&a&&s&&(l.addEventListener("click",e=>{m||r.click()}),r.addEventListener("change",e=>{if(r.files&&r.files[0]){const e=r.files[0];if("image/png"!==e.type&&"image/jpg"!==e.type&&"image/jpeg"!==e.type&&"image/gif"!==e.type)return d.setAttribute("src",""),r.value="",u.classList.remove("flex"),void u.classList.add("hidden");const t=new FileReader;t.onload=function(e){d.setAttribute("src",e.target.result),u.classList.remove("hidden"),u.classList.add("flex")},t.readAsDataURL(e)}}),a.addEventListener("click",async e=>{if(e.preventDefault(),m)return;if(!r.files||!r.files[0])return;m=!0,a.innerHTML="...";const t=new FormData;t.append("file",r.files[0]);const n=await fetch("/file",{method:"POST",credentials:"same-origin",body:t});m=!1,d.setAttribute("src",""),r.value="",u.classList.remove("flex"),u.classList.add("hidden"),a.innerHTML="+";const o=await n.json();((e,t)=>{const n=document.createElement("div");n.className="media-file flex justify-center items-center w-150px h-150px shadow mr-4 mb-4 p-2 relative",n.innerHTML=`\n    <img class="max-h-full" src="${t}">\n    <div class="absolute right-3 bottom-3">\n      <a class="media-file-del font-bold cursor-pointer py-1 px-2 text-sm rounded border border-red-700 bg-red-600 focus:outline-none text-white" href="/file/${e}/delete">x</a>\n    </div>\n  `,s.insertBefore(n,c.nextSibling)})(o.id,o.file)}),i("#media-list",".media-file-del",{parent:".media-file"})),i(".thing-delete",{parent:".thing"}),((e,t,n={})=>{new y(e,t,n)})("body",".form-data",{}),function(e,t,n={}){new p(e,t,n)}(g,"#thing-trans-modal"),g.forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const n=e.getAttribute("href"),o=await fetch(n),i=await o.text();document.getElementById("thing-trans-modal").querySelector(".modal-container").innerHTML=i})})}])}));
//# sourceMappingURL=app.js.map