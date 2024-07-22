"use strict";(()=>{var H=()=>{let r=document.querySelectorAll("[book-now-button]");r.length&&r.forEach(o=>{let u=o.getAttribute("book-now-button");if(u!=""){let n=document.querySelector("[catalog-page-city]").getAttribute("catalog-page-city"),c=u.split(";").filter(i=>i.trim()!==""),s=[];c.forEach(i=>{let t=i.split("@")[0],e=i.split("@")[1];t===n&&(o.setAttribute("href",e),o.classList.remove("hide"))})}})};var N=()=>{let r=document.querySelectorAll("[location-dropdown]"),o=document.querySelectorAll("[nav-home-link]");if(r.length){let T=function(){return new Promise((a,l)=>{navigator.geolocation.getCurrentPosition(a,l)})},_=function(){let a=!1;d.forEach(l=>{l.textContent.toUpperCase()===e.toUpperCase()&&(g=l,a=!0,x())})},x=function(){v.textContent=g.textContent,v.classList.remove("opacity-0"),y.classList.remove("hide"),r.forEach(l=>{l.classList.remove("opacity-0")}),document.querySelectorAll("[city-dropdown-name-placeholder]").forEach(l=>{l.classList.remove("opacity-0")})},C=function(a){let l=a.getAttribute("location-dropdown_button"),S=a.getAttribute("href");console.log(`Saving city: ${l}, link: ${S}`),localStorage.setItem("savedCity",l),q(a),y.classList.add("hide"),window.location.href=S},q=function(a){let l=a.getAttribute("location-dropdown_button");document.querySelectorAll("[city-dropdown-name-placeholder]").forEach(h=>{h.textContent=l,h.classList.remove("opacity-0")}),r.forEach(h=>{h.classList.remove("opacity-0")})},W=function(a){let l=!1;d.forEach(S=>{if(S.getAttribute("location-dropdown_button").toUpperCase()===a.toUpperCase()){let h=S;console.log(`Found city button: ${h.textContent}, link: ${h.getAttribute("href")}`),g=h,q(h),l=!0}}),l||(console.log("City not found, setting to default city"),_())};var u=T,n=_,c=x,s=C,i=q,t=W;let e="New York",d=document.querySelectorAll("[section_menu] [location-dropdown_button], [location-dropdown_list] [location-dropdown_button]"),p=document.querySelector('[is-your-city-new-york="yes"]'),m=document.querySelector('[is-your-city-new-york="no"]'),f=document.querySelector('[is-your-city-new-york="ok"]'),b=document.querySelector("[city-detector-tip-close]"),y=document.querySelector("[city-detector-tip]"),v=document.querySelector("[city-guess]"),P=document.querySelector("[city-question]"),w=document.querySelector("[location-dropdown_list]"),g;async function K(){if(!navigator.geolocation){_();return}try{let a=await T(),l=a.coords.latitude,S=a.coords.longitude;await Q(l,S)}catch{_()}}async function Q(a,l){let S=new google.maps.Geocoder,h=new google.maps.LatLng(a,l);S.geocode({latLng:h},function(E,Y){if(Y==google.maps.GeocoderStatus.OK)if(E[1]){let k;for(let L=0;L<E[0].address_components.length;L++)for(let A=0;A<E[0].address_components[L].types.length;A++)if(E[0].address_components[L].types[A]=="locality"){k=E[0].address_components[L];break}if(k){let L=!1;d.forEach(A=>{A.textContent.toUpperCase()===k.long_name.toUpperCase()&&(g=A,L=!0,x())}),L||_()}else _()}else _();else _()})}if(p.addEventListener("click",function(){C(g)}),m.addEventListener("click",function(){y.classList.add("hide"),w.classList.add("w--open")}),b.addEventListener("click",function(){y.classList.add("hide")}),localStorage.getItem("savedCity")){let a=localStorage.getItem("savedCity");console.log(`Loaded saved city: ${a}`),W(a),r.forEach(l=>{l.classList.remove("opacity-0")})}else K();d.forEach(a=>{a.addEventListener("click",function(){C(a),q(a),r.forEach(l=>{l.classList.remove("opacity-0")})})}),o.forEach(a=>{a.addEventListener("click",function(){if(g){let l=g.getAttribute("href");console.log(`Navigating to city: ${g.textContent}, link: ${l}`),window.location.href=l}else{_();let l=g.getAttribute("href");console.log(`Navigating to default city: ${g.textContent}, link: ${l}`),window.location.href=l}})})}};var $=()=>{let r=document.querySelector("[catalog-page-city]");if(r){let o=r.getAttribute("catalog-page-city");document.querySelectorAll("[exp-collection-item]").forEach(n=>{function c(){let e=n.querySelector("[exp-columns_slider-header-meta-item=best]"),p=n.getAttribute("value-best").split(";");p.forEach((m,f)=>{m===""&&p.splice(f,1)}),p.forEach(m=>{m===o&&e.classList.remove("hide")})}function s(){let e=document.querySelectorAll("[icon-age]"),d=n.querySelector("[exp-columns_slider-header-meta-item=age]"),m=n.getAttribute("value-age").split(";");m.forEach((f,b)=>{f===""&&m.splice(b,1)}),m.forEach(f=>{let b=f.split("@");b[0]===o&&e.forEach(y=>{let v=y.getAttribute("icon-age");if(b[1]===v){let P=y,w=d,g=document.createElement("div");g.innerHTML=P.innerHTML,w.appendChild(g)}})})}function i(){let e=n.querySelector("[exp-columns_slider-header-meta-item=price]"),p=n.getAttribute("value-price").split(";");p.forEach((m,f)=>{m===""&&p.splice(f,1)}),p.forEach(m=>{let f=m.split("@");if(f[0]===o){let b=f[0],y=f[1];if(b===o){e.classList.remove("hide");let v=e.querySelector('[exp-columns_slider-header-meta-item="price-text-value"]');v.textContent=y}}})}function t(){let e=n.querySelector("[exp-columns_slider-header-meta-item=count]"),p=n.getAttribute("value-count").split(";");p.forEach((m,f)=>{m===""&&p.splice(f,1)}),p.forEach(m=>{let f=m.split("@");if(f[0]===o){let b=f[0],y=f[1];if(b===o){e.classList.remove("hide");let v=e.querySelector('[exp-columns_slider-header-meta-item="count-text-value"]');v.textContent=y}}})}c(),s(),i(),t()})}};var D=()=>{let r=document.querySelectorAll("[this-is-a-city-page]");r.length&&r.forEach(o=>{let u=document.querySelector("[this-is-a-city-page]").getAttribute("this-is-a-city-page");console.log(u);let n=document.querySelectorAll("[exp-dropdown-button-list]");n.forEach(s=>{s.querySelectorAll(".icon-embed-custom").forEach(t=>{t.classList.add("hide")})}),document.querySelectorAll("[exp-city-dropdown-list]").forEach(s=>{s.classList.add("hide")}),n.forEach(s=>{s.addEventListener("click",function(){s.querySelectorAll("a").forEach(t=>{if(t.getAttribute("exp-city")===u){let e=t.getAttribute("href");window.location.href=e}})})})})};var I=()=>{if(document.querySelectorAll("[abs-link-for-append]").length){let o=document.querySelector("[abs-link-exp-individual]"),u=document.querySelector("[abs-link-exp-group]"),n=document.querySelectorAll("[exp-slider-individual]"),c=document.querySelectorAll("[exp-slider-group]"),s=document.querySelector("[page-city-current]").getAttribute("page-city-current");n.forEach(i=>{let t=o.cloneNode(!0);t.classList.remove("hide");let e=t.getAttribute("href")+"#"+i.getAttribute("exp-name");t.setAttribute("href",e),i.appendChild(t)}),c.forEach(i=>{let t=u.cloneNode(!0);t.classList.remove("hide");let e=t.getAttribute("href")+"#"+i.getAttribute("exp-name");t.setAttribute("href",e),i.appendChild(t)})}};var M=()=>{let r=document.querySelectorAll("[video-on-hover]");r.length&&r.forEach(o=>{let u=!1,n=!1,c=function(){if(window.innerWidth>=992){let i=o.querySelector("[put-src-here]");if(i){let d=i.getAttribute("put-src-here");d&&i.getAttribute("src")!==d&&i.setAttribute("src",d)}let t=o.querySelector("[abs-video-for-hover-hided]");t&&t.classList.remove("hide");let e=o.querySelector("video");if(e)if(n)u||e.play().then(()=>{u=!0}).catch(d=>{console.error("Error playing video:",d)});else{let d=()=>{n=!0,e.play().then(()=>{u=!0}).catch(p=>{console.error("Error playing video:",p)}),e.removeEventListener("canplaythrough",d)};e.addEventListener("canplaythrough",d),e.load()}}},s=function(){if(window.innerWidth>=992){let i=o.querySelector("[abs-video-for-hover-hided]");i&&i.classList.add("hide");let t=o.querySelector("video");t&&u&&(t.pause(),u=!1)}};o.addEventListener("pointerenter",c),o.addEventListener("pointerleave",s)})};var U=()=>{let r=document.querySelectorAll("[catalog-item-exp]");r.length&&r.forEach(o=>{let u=o.querySelector("[catalog-item-exp-gallery-item]"),n=o.querySelector("[ctatalog-video]"),c=o.querySelector("[abs-video-for-hover]"),s=o.querySelector("[put-src-here]");u.appendChild(n);let i=function(){if(window.innerWidth>=992){if(s){let d=s.getAttribute("put-src-here");d&&s.setAttribute("src",d)}c&&c.classList.remove("hide");let e=c.querySelector("video");if(e){let d=e.cloneNode(!0);e.parentNode.replaceChild(d,e),e=d,e.addEventListener("canplay",()=>{e.play().catch(p=>{})}),e.addEventListener("play",()=>{}),e.addEventListener("pause",()=>{}),e.addEventListener("timeupdate",function(){}),e.addEventListener("canplaythrough",()=>{})}}},t=function(){if(window.innerWidth>=992){c&&c.classList.add("hide");let e=c.querySelector("video");e&&e.pause()}};u.addEventListener("mouseover",i),u.addEventListener("mouseout",t)})};var F=()=>{let r=document.querySelectorAll(".section_faq");r.length&&r.forEach(o=>{o.querySelectorAll(".cl-i_faq").length||o.classList.add("hide")})};var V=()=>{document.querySelectorAll('[form-custom-dropdwn="component"]').length&&document.querySelectorAll('[form-custom-dropdwn="component"]').forEach(o=>{o.addEventListener("change",u=>{if(u.target.type==="radio"){let c=u.target.nextElementSibling;c&&c.getAttribute("form-custom-dropdwn")!=="radio-label"&&(c=null);let s=o.querySelector('[form-custom-dropdwn="placeholder"]');c&&s&&(s.textContent=c.textContent,s.classList.add("label-is-active")),c&&c.classList.add("label-is-active"),o.querySelectorAll('[form-custom-dropdwn="radio-label"]').forEach(t=>{t!==c&&t.classList.remove("label-is-active")})}})})};V();var O=()=>{let r=document.querySelector(".menu-standart-trigger-city");if(r){let n=function(){r.getBoundingClientRect().bottom<0?document.querySelectorAll("[toggle-class-here-selector]").forEach(t=>{let e=t.getAttribute("toggle-class-here-selector");e&&t.classList.remove(e)}):document.querySelectorAll("[toggle-class-here-selector]").forEach(t=>{let e=t.getAttribute("toggle-class-here-selector");e&&t.classList.add(e)})},c=function(){n()};var o=n,u=c;n(),window.addEventListener("scroll",c)}};var R=()=>{let r=document.querySelector(".menu-standart-trigger");if(r){let n=function(){r.getBoundingClientRect().bottom<0?document.querySelectorAll("[toggle-class-here]").forEach(t=>{let e=t.getAttribute("toggle-class-here");e&&t.classList.add(e)}):document.querySelectorAll("[toggle-class-here]").forEach(t=>{let e=t.getAttribute("toggle-class-here");e&&t.classList.remove(e)})},c=function(){n()};var o=n,u=c;n(),window.addEventListener("scroll",c)}};var G=()=>{let r=document.querySelectorAll("[colored-slider]");r.length&&r.forEach(o=>{let n=o.getAttribute("colored-slider").split(",").map(s=>s.trim());o.querySelectorAll(".swiper-slide").forEach((s,i)=>{let t=i%n.length;s.style.backgroundColor=n[t]})})};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{N(),V(),$(),G(),I(),M(),U(),R(),O(),D(),F(),H()});})();