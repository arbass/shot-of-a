"use strict";(()=>{var W=()=>{let c=document.querySelectorAll("[book-now-button]");c.length&&c.forEach(t=>{let f=t.getAttribute("book-now-button");if(f!=""){let i=document.querySelector("[catalog-page-city]").getAttribute("catalog-page-city"),r=f.split(";").filter(n=>n.trim()!==""),d=[];r.forEach(n=>{let o=n.split("@")[0],e=n.split("@")[1];o===i&&(t.setAttribute("href",e),t.classList.remove("hide"))})}})};var I=()=>{let c=document.querySelectorAll("[location-dropdown]"),t=document.querySelectorAll("[nav-home-link]"),f=document.querySelectorAll("[home-page-city-links]");if(c.length){let H=function(){return new Promise((l,s)=>{navigator.geolocation.getCurrentPosition(l,s)})},E=function(){let l=!1;a.forEach(s=>{s.textContent.toUpperCase()===m.toUpperCase()&&(b=s,l=!0,P())})},P=function(){v.textContent=b.textContent,v.classList.remove("opacity-0"),A.classList.remove("hide"),c.forEach(s=>{s.classList.remove("opacity-0")}),document.querySelectorAll("[city-dropdown-name-placeholder]").forEach(s=>{s.classList.remove("opacity-0")})},C=function(l){let s=l.getAttribute("location-dropdown_button")||l.getAttribute("home-page-city-links"),S=l.getAttribute("href");console.log(`Saving city: ${s}, link: ${S}`),localStorage.setItem("savedCity",s),k(l),A.classList.add("hide"),window.location.href=S},k=function(l){let s=l.getAttribute("location-dropdown_button")||l.getAttribute("home-page-city-links");document.querySelectorAll("[city-dropdown-name-placeholder]").forEach(h=>{h.textContent=s,h.classList.remove("opacity-0")}),c.forEach(h=>{h.classList.remove("opacity-0")})},M=function(l){let s=!1;a.forEach(S=>{if(S.getAttribute("location-dropdown_button").toUpperCase()===l.toUpperCase()){let h=S;console.log(`Found city button: ${h.textContent}, link: ${h.getAttribute("href")}`),b=h,k(h),s=!0}}),s||(console.log("City not found, setting to default city"),E())};var d=H,n=E,o=P,e=C,p=k,u=M;let m="New York",a=document.querySelectorAll("[section_menu] [location-dropdown_button], [location-dropdown_list] [location-dropdown_button]"),y=document.querySelector('[is-your-city-new-york="yes"]'),g=document.querySelector('[is-your-city-new-york="no"]'),L=document.querySelector('[is-your-city-new-york="ok"]'),_=document.querySelector("[city-detector-tip-close]"),A=document.querySelector("[city-detector-tip]"),v=document.querySelector("[city-guess]"),J=document.querySelector("[city-question]"),Q=document.querySelector("[location-dropdown_list]"),b;async function Y(){if(!navigator.geolocation){E();return}try{let l=await H(),s=l.coords.latitude,S=l.coords.longitude;await j(s,S)}catch{E()}}async function j(l,s){let S=new google.maps.Geocoder,h=new google.maps.LatLng(l,s);S.geocode({latLng:h},function(x,z){if(z==google.maps.GeocoderStatus.OK)if(x[1]){let T;for(let w=0;w<x[0].address_components.length;w++)for(let q=0;q<x[0].address_components[w].types.length;q++)if(x[0].address_components[w].types[q]=="locality"){T=x[0].address_components[w];break}if(T){let w=!1;a.forEach(q=>{q.textContent.toUpperCase()===T.long_name.toUpperCase()&&(b=q,w=!0,P())}),w||E()}else E()}else E();else E()})}if(y.addEventListener("click",function(){C(b)}),g.addEventListener("click",function(){A.classList.add("hide"),Q.classList.add("w--open")}),_.addEventListener("click",function(){A.classList.add("hide")}),localStorage.getItem("savedCity")){let l=localStorage.getItem("savedCity");console.log(`Loaded saved city: ${l}`),M(l),c.forEach(s=>{s.classList.remove("opacity-0")})}else Y();a.forEach(l=>{l.addEventListener("click",function(){C(l),k(l),c.forEach(s=>{s.classList.remove("opacity-0")})})}),t.forEach(l=>{l.addEventListener("click",function(){if(b){let s=b.getAttribute("href");console.log(`Navigating to city: ${b.textContent}, link: ${s}`),window.location.href=s}else{E();let s=b.getAttribute("href");console.log(`Navigating to default city: ${b.textContent}, link: ${s}`),window.location.href=s}})}),f.forEach(l=>{l.addEventListener("click",function(s){s.preventDefault(),C(l)})})}let r=document.querySelector("body").getAttribute("parallel-page-type");if(r==="event"||r==="individual"){let a=document.querySelector(`[parallel-page-links-parent="${r}"]`).querySelectorAll("[exp-city]"),y=document.querySelectorAll("[parallel-location-dropdown_list] [location-dropdown_button]");a.forEach(g=>{let L=g.getAttribute("exp-city");y.forEach(_=>{let A=_.getAttribute("location-dropdown_button");if(L===A){let v=g.getAttribute("href");console.log(`Matching city: ${L}. Updating link to: ${v}`),_.setAttribute("href",v)}})})}};var N=()=>{let c=document.querySelector("[catalog-page-city]");if(c){let t=c.getAttribute("catalog-page-city");document.querySelectorAll("[exp-collection-item]").forEach(i=>{function r(){let e=i.querySelector("[exp-columns_slider-header-meta-item=best]"),u=i.getAttribute("value-best").split(";");u.forEach((m,a)=>{m===""&&u.splice(a,1)}),u.forEach(m=>{m===t&&e.classList.remove("hide")})}function d(){let e=document.querySelectorAll("[icon-age]"),p=i.querySelector("[exp-columns_slider-header-meta-item=age]"),m=i.getAttribute("value-age").split(";");m.forEach((a,y)=>{a===""&&m.splice(y,1)}),m.forEach(a=>{let y=a.split("@");y[0]===t&&e.forEach(g=>{let L=g.getAttribute("icon-age");if(y[1]===L){let _=g,A=p,v=document.createElement("div");v.innerHTML=_.innerHTML,A.appendChild(v)}})})}function n(){let e=i.querySelector("[exp-columns_slider-header-meta-item=price]"),u=i.getAttribute("value-price").split(";");u.forEach((m,a)=>{m===""&&u.splice(a,1)}),u.forEach(m=>{let a=m.split("@");if(a[0]===t){let y=a[0],g=a[1];if(y===t){e.classList.remove("hide");let L=e.querySelector('[exp-columns_slider-header-meta-item="price-text-value"]');L.textContent=g}}})}function o(){let e=i.querySelector("[exp-columns_slider-header-meta-item=count]"),u=i.getAttribute("value-count").split(";");u.forEach((m,a)=>{m===""&&u.splice(a,1)}),u.forEach(m=>{let a=m.split("@");if(a[0]===t){let y=a[0],g=a[1];if(y===t){e.classList.remove("hide");let L=e.querySelector('[exp-columns_slider-header-meta-item="count-text-value"]');L.textContent=g}}})}r(),d(),n(),o()})}};var $=()=>{let c=document.querySelectorAll("[this-is-a-city-page]");c.length&&c.forEach(t=>{document.querySelectorAll("[exp-variants-dropdown]").forEach(i=>{i.querySelectorAll("[exp-dropdown-button-list-new]").forEach(d=>{d.querySelectorAll("svg").forEach(e=>{e.classList.add("hide")}),d.querySelectorAll("[exp-city-dropdown]").forEach(e=>{e.querySelector("[exp-city-dropdown-list]").classList.add("hide"),e.addEventListener("click",function(){if(localStorage.getItem("savedCity")){let u=localStorage.getItem("savedCity");e.querySelectorAll("a").forEach(a=>{a.getAttribute("exp-city-dropdown-city-slug")===u&&(window.location.href=a.href)})}else alert("Please select the required city from the website menu.")})})})})})};var D=()=>{if(document.querySelectorAll("[abs-link-for-append]").length){let t=document.querySelector("[abs-link-exp-individual]"),f=document.querySelector("[abs-link-exp-group]"),i=document.querySelectorAll("[exp-slider-individual]"),r=document.querySelectorAll("[exp-slider-group]"),d=document.querySelector("[page-city-current]").getAttribute("page-city-current");i.forEach(n=>{let o=t.cloneNode(!0);o.classList.remove("hide");let e=o.getAttribute("href")+"#"+n.getAttribute("exp-name");o.setAttribute("href",e),n.appendChild(o)}),r.forEach(n=>{let o=f.cloneNode(!0);o.classList.remove("hide");let e=o.getAttribute("href")+"#"+n.getAttribute("exp-name");o.setAttribute("href",e),n.appendChild(o)})}};var O=()=>{let c=document.querySelectorAll("[video-on-hover]");c.length&&c.forEach(t=>{t.isPlaying=!1,t.videoLoaded=!1;let f=n=>{let o=n.querySelector("[put-src-here]");if(o){let u=o.getAttribute("put-src-here");u&&o.getAttribute("src")!==u&&o.setAttribute("src",u)}let e=n.querySelector("[abs-video-for-hover-hided]");e&&e.classList.remove("hide");let p=n.querySelector("video");if(p)if(n.videoLoaded)n.isPlaying||p.play().then(()=>{n.isPlaying=!0}).catch(u=>{console.error("Error playing video:",u)});else{let u=()=>{n.videoLoaded=!0,p.play().then(()=>{n.isPlaying=!0}).catch(m=>{console.error("Error playing video:",m)}),p.removeEventListener("canplaythrough",u)};p.addEventListener("canplaythrough",u),p.load()}},i=n=>{let o=n.querySelector("[abs-video-for-hover-hided]");o&&o.classList.add("hide");let e=n.querySelector("video");e&&n.isPlaying&&(e.pause(),n.isPlaying=!1)},r=()=>{window.innerWidth>=992&&f(t)},d=()=>{window.innerWidth>=992&&i(t)};if(t.addEventListener("pointerenter",r),t.addEventListener("pointerleave",d),window.innerWidth<992){let n=t.closest(".swiper-slide");if(n){let o=new MutationObserver(e=>{for(let p of e)p.type==="attributes"&&p.attributeName==="class"&&(n.classList.contains("swiper-slide-active")?f(t):i(t))});o.observe(n,{attributes:!0}),n.classList.contains("swiper-slide-active")&&f(t),t.mutationObserver=o}}})};var U=()=>{let c=document.querySelectorAll("[catalog-item-exp]");c.length&&c.forEach(t=>{let f=t.querySelector("[catalog-item-exp-gallery-item]"),i=t.querySelector("[ctatalog-video]"),r=t.querySelector("[abs-video-for-hover]"),d=t.querySelector("[put-src-here]");f.appendChild(i);let n=function(){if(window.innerWidth>=992){if(d){let p=d.getAttribute("put-src-here");p&&d.setAttribute("src",p)}r&&r.classList.remove("hide");let e=r.querySelector("video");if(e){let p=e.cloneNode(!0);e.parentNode.replaceChild(p,e),e=p,e.addEventListener("canplay",()=>{e.play().catch(u=>{})}),e.addEventListener("play",()=>{}),e.addEventListener("pause",()=>{}),e.addEventListener("timeupdate",function(){}),e.addEventListener("canplaythrough",()=>{})}}},o=function(){if(window.innerWidth>=992){r&&r.classList.add("hide");let e=r.querySelector("video");e&&e.pause()}};f.addEventListener("mouseover",n),f.addEventListener("mouseout",o)})};var F=()=>{let c=document.querySelectorAll(".section_faq");c.length&&c.forEach(t=>{t.querySelectorAll(".cl-i_faq").length||t.classList.add("hide")})};var V=()=>{document.querySelectorAll('[form-custom-dropdwn="component"]').length&&document.querySelectorAll('[form-custom-dropdwn="component"]').forEach(t=>{t.addEventListener("change",f=>{if(f.target.type==="radio"){let r=f.target.nextElementSibling;r&&r.getAttribute("form-custom-dropdwn")!=="radio-label"&&(r=null);let d=t.querySelector('[form-custom-dropdwn="placeholder"]');r&&d&&(d.textContent=r.textContent,d.classList.add("label-is-active")),r&&r.classList.add("label-is-active"),t.querySelectorAll('[form-custom-dropdwn="radio-label"]').forEach(o=>{o!==r&&o.classList.remove("label-is-active")})}})})};V();var R=()=>{let c=document.querySelector(".menu-standart-trigger-city");if(c){let i=function(){c.getBoundingClientRect().bottom<0?document.querySelectorAll("[toggle-class-here-selector]").forEach(o=>{let e=o.getAttribute("toggle-class-here-selector");e&&o.classList.remove(e)}):document.querySelectorAll("[toggle-class-here-selector]").forEach(o=>{let e=o.getAttribute("toggle-class-here-selector");e&&o.classList.add(e)})},r=function(){i()};var t=i,f=r;i(),window.addEventListener("scroll",r)}};var B=()=>{let c=document.querySelector(".menu-standart-trigger");if(c){let i=function(){c.getBoundingClientRect().bottom<0?document.querySelectorAll("[toggle-class-here]").forEach(o=>{let e=o.getAttribute("toggle-class-here");e&&o.classList.add(e)}):document.querySelectorAll("[toggle-class-here]").forEach(o=>{let e=o.getAttribute("toggle-class-here");e&&o.classList.remove(e)})},r=function(){i()};var t=i,f=r;i(),window.addEventListener("scroll",r)}};var G=()=>{let c=document.querySelector(".exp-columns_inner"),t=document.querySelector(".dropdown-placeholder.is-exp-filter.is-new");if(console.log(t.textContent),c&&t.textContent!="All"&t.textContent!="ALL"){let i=c.querySelector(".location-dropdown_list.is-form").querySelectorAll(".w-dyn-item"),r=i[0].cloneNode(!0),d=i[0].parentNode;r.querySelector("a").textContent="ALL";let n=window.location.pathname,o=n.substring(0,n.lastIndexOf("/"));r.querySelector("a").setAttribute("href",o),d.insertBefore(r,i[0])}};var K=()=>{let c=document.querySelectorAll("[colored-slider]");c.length&&c.forEach(t=>{let i=t.getAttribute("colored-slider").split(",").map(d=>d.trim());t.querySelectorAll(".swiper-slide").forEach((d,n)=>{let o=n%i.length;d.style.backgroundColor=i[o]})})};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{I(),V(),N(),K(),D(),O(),U(),B(),R(),$(),F(),W(),G()});})();
