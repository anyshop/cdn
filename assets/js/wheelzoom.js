window.wheelzoom=function(){function o(m,t){if(m&&m.nodeName&&"IMG"===m.nodeName){var s,d,u,c,l,v,o,n,g={},a=function(e){m.removeEventListener("wheelzoom.destroy",a),m.removeEventListener("wheelzoom.reset",w),m.removeEventListener("load",b),m.removeEventListener("mouseup",f),m.removeEventListener("mousemove",i),m.removeEventListener("mousedown",h),m.removeEventListener("wheel",r),m.style.backgroundImage=e.backgroundImage,m.style.backgroundRepeat=e.backgroundRepeat,m.src=e.src}.bind(null,{backgroundImage:m.style.backgroundImage,backgroundRepeat:m.style.backgroundRepeat,src:m.src});m.addEventListener("wheelzoom.destroy",a),t=t||{},Object.keys(E).forEach(function(e){g[e]=void 0!==t[e]?t[e]:E[e]}),m.complete&&b(),m.addEventListener("load",b)}function p(){0<l?l=0:l<s-u&&(l=s-u),0<v?v=0:v<d-c&&(v=d-c),m.style.backgroundSize=u+"px "+c+"px",m.style.backgroundPosition=l+"px "+v+"px"}function w(){u=s,c=d,l=v=0,p()}function r(e){var t=0;e.preventDefault(),e.deltaY?t=e.deltaY:e.wheelDelta&&(t=-e.wheelDelta);var o=m.getBoundingClientRect(),n=e.pageX-o.left-window.pageXOffset,a=e.pageY-o.top-window.pageYOffset,r=(n-l)/u,i=(a-v)/c;t<0?(u+=u*g.zoom,c+=c*g.zoom):(u-=u*g.zoom,c-=c*g.zoom),g.maxZoom&&(u=Math.min(s*g.maxZoom,u),c=Math.min(d*g.maxZoom,c)),l=n-u*r,v=a-c*i,u<=s||c<=d?w():p()}function i(e){e.preventDefault(),l+=e.pageX-o.pageX,v+=e.pageY-o.pageY,o=e,p()}function f(){document.removeEventListener("mouseup",f),document.removeEventListener("mousemove",i)}function h(e){e.preventDefault(),o=e,document.addEventListener("mousemove",i),document.addEventListener("mouseup",f)}function b(){var e=Math.max(g.initialZoom,1);if(m.src!==n){var t=window.getComputedStyle(m,null);s=parseInt(t.width,10),d=parseInt(t.height,10),l=-((u=s*e)-s)/2,v=-((c=d*e)-d)/2,function(e){e.style.backgroundRepeat="no-repeat",e.style.backgroundImage='url("'+e.src+'")',n="data:image/svg+xml;base64,"+window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="'+e.naturalWidth+'" height="'+e.naturalHeight+'"></svg>'),e.src=n}(m),m.style.backgroundSize=u+"px "+c+"px",m.style.backgroundPosition=l+"px "+v+"px",m.addEventListener("wheelzoom.reset",w),m.addEventListener("wheel",r),m.addEventListener("mousedown",h)}}}var E={zoom:.1,maxZoom:!1,initialZoom:1};return"function"!=typeof window.btoa?function(e){return e}:function(e,t){return e&&e.length?Array.prototype.forEach.call(e,o,t):e&&e.nodeName&&o(e,t),e}}();