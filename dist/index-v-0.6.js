"use strict";(()=>{var N=()=>{let l=document.querySelectorAll("[location-dropdown]");if(l.length){let T=function(){return new Promise((i,s)=>{navigator.geolocation.getCurrentPosition(i,s)})},S=function(){let i=!1;e.forEach(s=>{s.textContent.toUpperCase()===t.toUpperCase()&&(E=s,i=!0,C())})},C=function(){g.textContent=E.textContent,g.classList.remove("opacity-0"),y.classList.remove("hide"),l.forEach(s=>{s.classList.remove("opacity-0")}),document.querySelectorAll("[city-dropdown-name-placeholder]").forEach(s=>{s.classList.remove("opacity-0")})},x=function(i){let s=i.getAttribute("location-dropdown_button"),h=i.getAttribute("href");localStorage.setItem("savedCity",s),y.classList.add("hide"),window.location.href=h},k=function(i){let s=i.getAttribute("location-dropdown_button");document.querySelectorAll("[city-dropdown-name-placeholder]").forEach(v=>{v.textContent=s,v.classList.remove("opacity-0")}),l.forEach(v=>{v.classList.remove("opacity-0")})},W=function(i){let s=!1;e.forEach(h=>{h.getAttribute("location-dropdown_button").toUpperCase()===i.toUpperCase()&&(k(h),s=!0)})};var o=T,d=S,n=C,r=x,p=k,c=W;let t="New York",e=document.querySelectorAll("[section_menu] [location-dropdown_button]"),a=document.querySelector('[is-your-city-new-york="yes"]'),f=document.querySelector('[is-your-city-new-york="no"]'),m=document.querySelector('[is-your-city-new-york="ok"]'),u=document.querySelector("[city-detector-tip-close]"),y=document.querySelector("[city-detector-tip]"),g=document.querySelector("[city-guess]"),_=document.querySelector("[city-question]"),w=document.querySelector("[location-dropdown_list]"),E;async function q(){if(!navigator.geolocation){S();return}try{let i=await T(),s=i.coords.latitude,h=i.coords.longitude;await R(s,h)}catch{S()}}async function R(i,s){let h=new google.maps.Geocoder,v=new google.maps.LatLng(i,s);h.geocode({latLng:v},function(A,G){if(G==google.maps.GeocoderStatus.OK)if(A[1]){let V;for(let b=0;b<A[0].address_components.length;b++)for(let L=0;L<A[0].address_components[b].types.length;L++)if(A[0].address_components[b].types[L]=="locality"){V=A[0].address_components[b];break}if(V){let b=!1;e.forEach(L=>{L.textContent.toUpperCase()===V.long_name.toUpperCase()&&(E=L,b=!0,C())}),b||S()}else S()}else S();else S()})}if(a.addEventListener("click",function(){x(E)}),f.addEventListener("click",function(){y.classList.add("hide"),w.classList.add("w--open")}),u.addEventListener("click",function(){y.classList.add("hide")}),localStorage.getItem("savedCity")){let i=localStorage.getItem("savedCity");W(i),l.forEach(s=>{s.classList.remove("opacity-0")})}else q();e.forEach(i=>{i.addEventListener("click",function(){x(i),k(i),l.forEach(s=>{s.classList.remove("opacity-0")})})})}};var O=()=>{let l=document.querySelector("[catalog-page-city]");if(l){let o=l.getAttribute("catalog-page-city");document.querySelectorAll("[exp-collection-item]").forEach(n=>{function r(){let e=n.querySelector("[exp-columns_slider-header-meta-item=best]"),f=n.getAttribute("value-best").split(";");f.forEach((m,u)=>{m===""&&f.splice(u,1)}),f.forEach(m=>{m===o&&e.classList.remove("hide")})}function p(){let e=document.querySelectorAll("[icon-age]"),a=n.querySelector("[exp-columns_slider-header-meta-item=age]"),m=n.getAttribute("value-age").split(";");m.forEach((u,y)=>{u===""&&m.splice(y,1)}),m.forEach(u=>{let y=u.split("@");y[0]===o&&e.forEach(g=>{let _=g.getAttribute("icon-age");if(y[1]===_){let w=g,E=a,q=document.createElement("div");q.innerHTML=w.innerHTML,E.appendChild(q)}})})}function c(){let e=n.querySelector("[exp-columns_slider-header-meta-item=price]"),f=n.getAttribute("value-price").split(";");f.forEach((m,u)=>{m===""&&f.splice(u,1)}),f.forEach(m=>{let u=m.split("@");if(u[0]===o){let y=u[0],g=u[1];if(y===o){e.classList.remove("hide");let _=e.querySelector('[exp-columns_slider-header-meta-item="price-text-value"]');_.textContent=g}}})}function t(){let e=n.querySelector("[exp-columns_slider-header-meta-item=count]"),f=n.getAttribute("value-count").split(";");f.forEach((m,u)=>{m===""&&f.splice(u,1)}),f.forEach(m=>{let u=m.split("@");if(u[0]===o){let y=u[0],g=u[1];if(y===o){e.classList.remove("hide");let _=e.querySelector('[exp-columns_slider-header-meta-item="count-text-value"]');_.textContent=g}}})}r(),p(),c(),t()})}};var U=()=>{if(document.querySelectorAll("[abs-link-for-append]").length){let o=document.querySelector("[abs-link-exp-individual]"),d=document.querySelector("[abs-link-exp-group]"),n=document.querySelectorAll("[exp-slider-individual]"),r=document.querySelectorAll("[exp-slider-group]"),p=document.querySelector("[page-city-current]").getAttribute("page-city-current");n.forEach(c=>{let t=o.cloneNode(!0);t.classList.remove("hide");let e=t.getAttribute("href")+"#"+c.getAttribute("exp-name");t.setAttribute("href",e),c.appendChild(t)}),r.forEach(c=>{let t=d.cloneNode(!0);t.classList.remove("hide");let e=t.getAttribute("href")+"#"+c.getAttribute("exp-name");t.setAttribute("href",e),c.appendChild(t)})}};var H=()=>{let l=document.querySelectorAll("[video-on-hover]");l.length&&l.forEach(o=>{let d=!1,n=!1,r=function(){if(window.innerWidth>=992){let c=o.querySelector("[put-src-here]");if(c){let a=c.getAttribute("put-src-here");a&&c.getAttribute("src")!==a&&c.setAttribute("src",a)}let t=o.querySelector("[abs-video-for-hover-hided]");t&&t.classList.remove("hide");let e=o.querySelector("video");if(e)if(n)d||e.play().then(()=>{d=!0}).catch(a=>{console.error("Error playing video:",a)});else{let a=()=>{n=!0,e.play().then(()=>{d=!0}).catch(f=>{console.error("Error playing video:",f)}),e.removeEventListener("canplaythrough",a)};e.addEventListener("canplaythrough",a),e.load()}}},p=function(){if(window.innerWidth>=992){let c=o.querySelector("[abs-video-for-hover-hided]");c&&c.classList.add("hide");let t=o.querySelector("video");t&&d&&(t.pause(),d=!1)}};o.addEventListener("pointerenter",r),o.addEventListener("pointerleave",p)})};var M=()=>{let l=document.querySelectorAll("[catalog-item-exp]");l.length&&l.forEach(o=>{let d=o.querySelector("[catalog-item-exp-gallery-item]"),n=o.querySelector("[ctatalog-video]"),r=o.querySelector("[abs-video-for-hover]"),p=o.querySelector("[put-src-here]");d.appendChild(n);let c=function(){if(window.innerWidth>=992){if(p){let a=p.getAttribute("put-src-here");a&&p.setAttribute("src",a)}r&&r.classList.remove("hide");let e=r.querySelector("video");if(e){let a=e.cloneNode(!0);e.parentNode.replaceChild(a,e),e=a,e.addEventListener("canplay",()=>{e.play().catch(f=>{})}),e.addEventListener("play",()=>{}),e.addEventListener("pause",()=>{}),e.addEventListener("timeupdate",function(){}),e.addEventListener("canplaythrough",()=>{})}}},t=function(){if(window.innerWidth>=992){r&&r.classList.add("hide");let e=r.querySelector("video");e&&e.pause()}};d.addEventListener("mouseover",c),d.addEventListener("mouseout",t)})};var P=()=>{document.querySelectorAll('[form-custom-dropdwn="component"]').length&&document.querySelectorAll('[form-custom-dropdwn="component"]').forEach(o=>{o.addEventListener("change",d=>{if(d.target.type==="radio"){let r=d.target.nextElementSibling;r&&r.getAttribute("form-custom-dropdwn")!=="radio-label"&&(r=null);let p=o.querySelector('[form-custom-dropdwn="placeholder"]');r&&p&&(p.textContent=r.textContent,p.classList.add("label-is-active")),r&&r.classList.add("label-is-active"),o.querySelectorAll('[form-custom-dropdwn="radio-label"]').forEach(t=>{t!==r&&t.classList.remove("label-is-active")})}})})};P();var D=()=>{let l=document.querySelector(".menu-standart-trigger");if(l){let n=function(){l.getBoundingClientRect().bottom<0?document.querySelectorAll("[toggle-class-here]").forEach(t=>{let e=t.getAttribute("toggle-class-here");e&&t.classList.add(e)}):document.querySelectorAll("[toggle-class-here]").forEach(t=>{let e=t.getAttribute("toggle-class-here");e&&t.classList.remove(e)})},r=function(){n()};var o=n,d=r;console.log("test +"),n(),window.addEventListener("scroll",r)}};var I=()=>{let l=document.querySelectorAll("[colored-slider]");l.length&&l.forEach(o=>{let n=o.getAttribute("colored-slider").split(",").map(p=>p.trim());o.querySelectorAll(".swiper-slide").forEach((p,c)=>{let t=c%n.length;p.style.backgroundColor=n[t]})})};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{N(),P(),O(),I(),U(),H(),M(),D()});})();
