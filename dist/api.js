!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("eessi-pensjon-ui",[],e):"object"==typeof exports?exports["eessi-pensjon-ui"]=e():t["eessi-pensjon-ui"]=e()}(window,(function(){return function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/dist/",r(r.s=289)}({121:function(t,e){e.defaults={},e.set=function(t,r,o){var n=o||{},i=e.defaults,s=n.expires||i.expires,a=n.domain||i.domain,u=void 0!==n.path?n.path:void 0!==i.path?i.path:"/",c=void 0!==n.secure?n.secure:i.secure,f=void 0!==n.httponly?n.httponly:i.httponly,d=void 0!==n.samesite?n.samesite:i.samesite,h=s?new Date("number"==typeof s?(new Date).getTime()+864e5*s:s):0;document.cookie=t.replace(/[^+#$&^`|]/g,encodeURIComponent).replace("(","%28").replace(")","%29")+"="+r.replace(/[^+#$&/:<-\[\]-}]/g,encodeURIComponent)+(h&&h.getTime()>=0?";expires="+h.toUTCString():"")+(a?";domain="+a:"")+(u?";path="+u:"")+(c?";secure":"")+(f?";httponly":"")+(d?";samesite="+d:"")},e.get=function(t){for(var e=document.cookie.split(";");e.length;){var r=e.pop(),o=r.indexOf("=");if(o=o<0?r.length:o,decodeURIComponent(r.slice(0,o).replace(/^\s+/,""))===t)return decodeURIComponent(r.slice(o+1))}return null},e.erase=function(t,r){e.set(t,"",{expires:-1,domain:r&&r.domain,path:r&&r.path,secure:0,httponly:0})},e.all=function(){for(var t={},e=document.cookie.split(";");e.length;){var r=e.pop(),o=r.indexOf("=");o=o<0?r.length:o,t[decodeURIComponent(r.slice(0,o).replace(/^\s+/,""))]=decodeURIComponent(r.slice(o+1))}return t}},247:function(t,e){var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(r){var o=new Uint8Array(16);t.exports=function(){return r(o),o}}else{var n=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),n[e]=t>>>((3&e)<<3)&255;return n}}},248:function(t,e){for(var r=[],o=0;o<256;++o)r[o]=(o+256).toString(16).substr(1);t.exports=function(t,e){var o=e||0,n=r;return[n[t[o++]],n[t[o++]],n[t[o++]],n[t[o++]],"-",n[t[o++]],n[t[o++]],"-",n[t[o++]],n[t[o++]],"-",n[t[o++]],n[t[o++]],"-",n[t[o++]],n[t[o++]],n[t[o++]],n[t[o++]],n[t[o++]],n[t[o++]]].join("")}},263:function(t,e){var r=function(t){function e(){this.fetch=!1,this.DOMException=t.DOMException}return e.prototype=t,new e}("undefined"!=typeof self?self:this);!function(t){!function(e){var r="URLSearchParams"in t,o="Symbol"in t&&"iterator"in Symbol,n="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),i="FormData"in t,s="ArrayBuffer"in t;if(s)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(t){return t&&a.indexOf(Object.prototype.toString.call(t))>-1};function c(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function f(t){return"string"!=typeof t&&(t=String(t)),t}function d(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return o&&(e[Symbol.iterator]=function(){return e}),e}function h(t){this.map={},t instanceof h?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function p(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function l(t){return new Promise((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function y(t){var e=new FileReader,r=l(e);return e.readAsArrayBuffer(t),r}function b(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:n&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:i&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:r&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():s&&n&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=b(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(t)||u(t))?this._bodyArrayBuffer=b(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n&&(this.blob=function(){var t=p(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(y)}),this.text=function(){var t,e,r,o=p(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=l(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(g)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(t,e){t=c(t),e=f(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},h.prototype.delete=function(t){delete this.map[c(t)]},h.prototype.get=function(t){return t=c(t),this.has(t)?this.map[t]:null},h.prototype.has=function(t){return this.map.hasOwnProperty(c(t))},h.prototype.set=function(t,e){this.map[c(t)]=f(e)},h.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},h.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),d(t)},h.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),d(t)},h.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),d(t)},o&&(h.prototype[Symbol.iterator]=h.prototype.entries);var v=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function w(t,e){var r,o,n=(e=e||{}).body;if(t instanceof w){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new h(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new h(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),v.indexOf(o)>-1?o:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function g(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}})),e}function E(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new h(e.headers),this.url=e.url||"",this._initBody(t)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})},m.call(w.prototype),m.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];E.redirect=function(t,e){if(-1===x.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(t){e.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function O(t,r){return new Promise((function(o,i){var s=new w(t,r);if(s.signal&&s.signal.aborted)return i(new e.DOMException("Aborted","AbortError"));var a=new XMLHttpRequest;function u(){a.abort()}a.onload=function(){var t,e,r={status:a.status,statusText:a.statusText,headers:(t=a.getAllResponseHeaders()||"",e=new h,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}})),e)};r.url="responseURL"in a?a.responseURL:r.headers.get("X-Request-URL");var n="response"in a?a.response:a.responseText;o(new E(n,r))},a.onerror=function(){i(new TypeError("Network request failed"))},a.ontimeout=function(){i(new TypeError("Network request failed"))},a.onabort=function(){i(new e.DOMException("Aborted","AbortError"))},a.open(s.method,s.url,!0),"include"===s.credentials?a.withCredentials=!0:"omit"===s.credentials&&(a.withCredentials=!1),"responseType"in a&&n&&(a.responseType="blob"),s.headers.forEach((function(t,e){a.setRequestHeader(e,t)})),s.signal&&(s.signal.addEventListener("abort",u),a.onreadystatechange=function(){4===a.readyState&&s.signal.removeEventListener("abort",u)}),a.send(void 0===s._bodyInit?null:s._bodyInit)}))}O.polyfill=!0,t.fetch||(t.fetch=O,t.Headers=h,t.Request=w,t.Response=E),e.Headers=h,e.Request=w,e.Response=E,e.fetch=O}({})}(r),delete r.fetch.polyfill,(e=r.fetch).default=r.fetch,e.fetch=r.fetch,e.Headers=r.Headers,e.Request=r.Request,e.Response=r.Response,t.exports=e},264:function(t,e,r){var o=r(295),n=r(296),i=n;i.v1=o,i.v4=n,t.exports=i},289:function(t,e,r){"use strict";r.r(e);var o=r(121),n=!navigator.userAgent.includes("jsdom"),i=window.location.hostname,s=r(263),a=r.n(s),u=(r(294),r(264)),c=r.n(u);r.d(e,"fakeCall",(function(){return l})),r.d(e,"realCall",(function(){return y})),r.d(e,"call",(function(){return b}));var f,d=(f=function(t,e){return(f=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}f(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),h=function(){return(h=Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},p=function(t){function e(e){var r=this.constructor,o=t.call(this,e)||this,n=r.prototype;return Object.setPrototypeOf(o,n),o}return d(e,t),e}(Error),l=function(t){var e=t.context,r=t.expectedPayload,o=t.method,s=t.type,a=t.url;return function(t){var u=!n&&"localhost"===i;u||console.log("FAKE API REQUEST FOR "+(o||"GET")+" "+a),t({type:s.request});var c=new Promise((function(t){setTimeout((function(){var e="function"==typeof r?r():r;t(e)}),u?1:Math.floor(2e3*Math.random()))})).then((function(r){return u||(console.log("FAKE API SUCCESS FOR "+(o||"GET")+" "+a),console.log("Payload",r)),t({type:s.success,payload:r,context:e})}));return c.catch((function(t){console.error(JSON.stringify(t))})),c}},y=function(t){var e=t.body,r=t.context,n=t.cascadeFailureError,i=t.headers,s=t.method,u=t.payload,f=t.type,d=t.url;return function(t){t({type:f.request});var l=e||u;l=l?JSON.stringify(l):void 0;var y=Object(o.get)("NAV_CSRF_PROTECTION")?{NAV_CSRF_PROTECTION:Object(o.get)("NAV_CSRF_PROTECTION")}:{},b=(new Date).getTime(),m=d.match(/\?./)?d+"&ts="+b:d+"?ts="+b;return a()(m,{method:s||"GET",headers:h(h({"Content-Type":"application/json; charset=utf-8","X-Request-ID":c.a.v4()},y),i),body:l}).catch((function(t){return console.error(JSON.stringify(t)),Promise.reject(t)})).then((function(t){if(t){if(t.status>=400){var e=new p(t.statusText);return e.response=t,e.status=t.status,t.json().then((function(t){throw e.message=t.message||t.error,e.stackTrace=t.stackTrace,e})).catch((function(t){return console.error(JSON.stringify(t)),Promise.reject(e)}))}return t.json()}})).then((function(o){return t({type:f.success,payload:o,originalPayload:e,context:r})})).catch((function(o){var i=e||u;if(401===o.status)t({type:"SERVER/UNAUTHORIZED/ERROR",payload:{error:o},originalPayload:i,context:r}),n&&t({type:f.failure,payload:{error:o},originalPayload:i,context:r});else if(403===o.status)t({type:f.forbidden||f.failure,payload:{error:o},originalPayload:i,context:r});else{if(!(o.status>=500))return t({type:f.failure,payload:{error:o},originalPayload:i,context:r});t({type:"SERVER/INTERNAL/ERROR",payload:{error:o},originalPayload:i,context:r}),n&&t({type:f.failure,payload:{error:o},originalPayload:i,context:r})}}))}},b="localhost"===i?l:y},294:function(t,e){!function(t){!function(e){var r="URLSearchParams"in t,o="Symbol"in t&&"iterator"in Symbol,n="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),i="FormData"in t,s="ArrayBuffer"in t;if(s)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(t){return t&&a.indexOf(Object.prototype.toString.call(t))>-1};function c(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function f(t){return"string"!=typeof t&&(t=String(t)),t}function d(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return o&&(e[Symbol.iterator]=function(){return e}),e}function h(t){this.map={},t instanceof h?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function p(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function l(t){return new Promise((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function y(t){var e=new FileReader,r=l(e);return e.readAsArrayBuffer(t),r}function b(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:n&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:i&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:r&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():s&&n&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=b(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(t)||u(t))?this._bodyArrayBuffer=b(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n&&(this.blob=function(){var t=p(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(y)}),this.text=function(){var t,e,r,o=p(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=l(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(g)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(t,e){t=c(t),e=f(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},h.prototype.delete=function(t){delete this.map[c(t)]},h.prototype.get=function(t){return t=c(t),this.has(t)?this.map[t]:null},h.prototype.has=function(t){return this.map.hasOwnProperty(c(t))},h.prototype.set=function(t,e){this.map[c(t)]=f(e)},h.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},h.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),d(t)},h.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),d(t)},h.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),d(t)},o&&(h.prototype[Symbol.iterator]=h.prototype.entries);var v=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function w(t,e){var r,o,n=(e=e||{}).body;if(t instanceof w){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new h(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new h(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),v.indexOf(o)>-1?o:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function g(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}})),e}function E(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new h(e.headers),this.url=e.url||"",this._initBody(t)}w.prototype.clone=function(){return new w(this,{body:this._bodyInit})},m.call(w.prototype),m.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];E.redirect=function(t,e){if(-1===x.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(t){e.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function O(t,r){return new Promise((function(o,i){var s=new w(t,r);if(s.signal&&s.signal.aborted)return i(new e.DOMException("Aborted","AbortError"));var a=new XMLHttpRequest;function u(){a.abort()}a.onload=function(){var t,e,r={status:a.status,statusText:a.statusText,headers:(t=a.getAllResponseHeaders()||"",e=new h,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}})),e)};r.url="responseURL"in a?a.responseURL:r.headers.get("X-Request-URL");var n="response"in a?a.response:a.responseText;o(new E(n,r))},a.onerror=function(){i(new TypeError("Network request failed"))},a.ontimeout=function(){i(new TypeError("Network request failed"))},a.onabort=function(){i(new e.DOMException("Aborted","AbortError"))},a.open(s.method,s.url,!0),"include"===s.credentials?a.withCredentials=!0:"omit"===s.credentials&&(a.withCredentials=!1),"responseType"in a&&n&&(a.responseType="blob"),s.headers.forEach((function(t,e){a.setRequestHeader(e,t)})),s.signal&&(s.signal.addEventListener("abort",u),a.onreadystatechange=function(){4===a.readyState&&s.signal.removeEventListener("abort",u)}),a.send(void 0===s._bodyInit?null:s._bodyInit)}))}O.polyfill=!0,t.fetch||(t.fetch=O,t.Headers=h,t.Request=w,t.Response=E),e.Headers=h,e.Request=w,e.Response=E,e.fetch=O}({})}("undefined"!=typeof self?self:this)},295:function(t,e,r){var o,n,i=r(247),s=r(248),a=0,u=0;t.exports=function(t,e,r){var c=e&&r||0,f=e||[],d=(t=t||{}).node||o,h=void 0!==t.clockseq?t.clockseq:n;if(null==d||null==h){var p=i();null==d&&(d=o=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==h&&(h=n=16383&(p[6]<<8|p[7]))}var l=void 0!==t.msecs?t.msecs:(new Date).getTime(),y=void 0!==t.nsecs?t.nsecs:u+1,b=l-a+(y-u)/1e4;if(b<0&&void 0===t.clockseq&&(h=h+1&16383),(b<0||l>a)&&void 0===t.nsecs&&(y=0),y>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");a=l,u=y,n=h;var m=(1e4*(268435455&(l+=122192928e5))+y)%4294967296;f[c++]=m>>>24&255,f[c++]=m>>>16&255,f[c++]=m>>>8&255,f[c++]=255&m;var v=l/4294967296*1e4&268435455;f[c++]=v>>>8&255,f[c++]=255&v,f[c++]=v>>>24&15|16,f[c++]=v>>>16&255,f[c++]=h>>>8|128,f[c++]=255&h;for(var w=0;w<6;++w)f[c+w]=d[w];return e||s(f)}},296:function(t,e,r){var o=r(247),n=r(248);t.exports=function(t,e,r){var i=e&&r||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var s=(t=t||{}).random||(t.rng||o)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e)for(var a=0;a<16;++a)e[i+a]=s[a];return e||n(s)}}})}));
//# sourceMappingURL=api.js.map