(this["webpackJsonpan.interrupted.stream"]=this["webpackJsonpan.interrupted.stream"]||[]).push([[0],{1:function(e,t,n){e.exports={root:"content_root__2RpRn",outerContainer:"content_outerContainer__2BZqH",innerContainer:"content_innerContainer__1BxGf",container:"content_container__3PSbZ",loader:"content_loader__2X1Q3",image:"content_image__3UnKa",show:"content_show__2_9hf",fill:"content_fill__2ah13",fadeIn:"content_fadeIn__IQHbI",textBlock:"content_textBlock__3EOpF",hidden:"content_hidden__36CWT",attachmentOverlay:"content_attachmentOverlay__1y7JM",pill:"content_pill__1Zwd3"}},12:function(e,t,n){e.exports=n(21)},17:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(8),o=n.n(c),i=(n(17),n(2)),l=n.n(i),u=n(3),s=n(4),d=n(5),f=n.n(d);function m(){return r.a.createElement("div",{className:f.a.root},r.a.createElement("div",{className:f.a.indicator},"snap"))}var h=n(1),v=n.n(h),p=n(6);function g(){return(g=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var a=new Image;a.onload=function(){return e(a)},a.onerror=function(e){return n(e)},a.src=t})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(e){var t=r.a.useState(!0),n=Object(u.a)(t,2),c=n[0],o=n[1],i=r.a.useState(null),l=Object(u.a)(i,2),s=l[0],d=l[1];return Object(a.useEffect)((function(){e&&(o(!0),function(e){return g.apply(this,arguments)}(e).then((function(e){d(e),o(!1)})))}),[e]),{image:s,loading:c}}function E(e){var t=e.image,n=r.a.useState(!1),a=Object(u.a)(n,2),c=a[0],o=a[1];if(r.a.useEffect((function(){var e=setTimeout((function(){return o(!0)}),0);return function(){return clearTimeout(e)}}),[]),0===t.height)return null;var i=t.width/t.height>1?{maxWidth:"100%",width:t.width}:{maxHeight:"100%",height:t.height};return r.a.createElement("img",{alt:"main content",src:t.src,style:i,className:Object(p.a)(v.a.image,c&&v.a.show)})}function w(e){var t=e.data;return r.a.createElement(y,{href:"https://are.na/".concat(t.user_id,"/").concat(t.slug)},r.a.createElement("h1",null,t.title),";")}function b(e){var t,n,a=e.data,c=null===a||void 0===a||null===(t=a.image)||void 0===t?void 0:t.large.url;console.log(a);var o=_(c||void 0),i=o.image,l=o.loading,u="Link"===a.class?null===(n=a.source)||void 0===n?void 0:n.url:void 0;return r.a.createElement(y,{href:u},i&&r.a.createElement(E,{image:i}),r.a.createElement("div",{className:v.a.loader,style:{opacity:l?1:0}},r.a.createElement("div",{className:v.a.fill})))}function S(e){var t,n,a,c=e.data,o=null===c||void 0===c||null===(t=c.image)||void 0===t?void 0:t.large.url;console.log(c);var i=_(o||void 0),l=i.image,u=i.loading;return r.a.createElement(y,{href:null===(n=c.attachment)||void 0===n?void 0:n.url},l&&r.a.createElement(E,{image:l}),l&&r.a.createElement("div",{className:v.a.loader,style:{opacity:u?1:0}},r.a.createElement("div",{className:v.a.fill})),r.a.createElement("div",{className:v.a.attachmentOverlay},!l&&r.a.createElement("h1",null,c.title),r.a.createElement("h1",{className:v.a.pill},null===(a=c.attachment)||void 0===a?void 0:a.extension)))}function O(e){var t=e.data,n=r.a.useRef(null),a=r.a.useState(2),c=Object(u.a)(a,2),o=c[0],i=c[1],l=r.a.useState(!1),s=Object(u.a)(l,2),d=s[0],f=s[1],m=r.a.useRef({inc:1,dir:0,flipCount:0});return r.a.useEffect((function(){var e,t=null===(e=n.current)||void 0===e?void 0:e.getBoundingClientRect().height;if(t){console.log("x",m.current.flipCount);var a=t-(window.innerHeight-10),r=m.current.flipCount>10;a>100&&!r?(m.current.dir>0&&(m.current.inc*=.25,m.current.flipCount++),m.current.dir=-1,i((function(e){return e-m.current.inc}))):a<40&&!r?(m.current.dir<0&&(m.current.inc*=.25,m.current.flipCount++),m.current.dir=1,i((function(e){return e+m.current.inc}))):f(!0)}}),[o]),t.content_html?r.a.createElement(y,null,r.a.createElement("div",{className:Object(p.a)(v.a.textBlock,!d&&v.a.hidden),ref:n,style:{position:"fixed",fontSize:"".concat(o,"rem")},dangerouslySetInnerHTML:{__html:t.content_html}})):null}function x(e){var t=e.data;switch(t.base_class){case"Block":switch(t.class){case"Attachment":return r.a.createElement(S,{data:t});case"Text":return r.a.createElement(O,{data:t});default:return r.a.createElement(b,{data:t})}case"Channel":return r.a.createElement(w,{data:t});default:return null}}function y(e){var t=e.children,n=e.href;return r.a.createElement("div",{className:v.a.root},r.a.createElement("div",{className:v.a.outerContainer},r.a.createElement("a",{className:v.a.container,href:n},r.a.createElement("div",{className:v.a.innerContainer},t))))}function k(e){var t=e.data;return t?r.a.createElement(x,{data:t}):r.a.createElement(y,null)}function j(e,t){return C.apply(this,arguments)}function C(){return(C=Object(s.a)(l.a.mark((function e(t,n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getContent(n);case 2:return a=e.sent,localStorage.setItem("channel-info",JSON.stringify(a)),e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(){return(N=Object(s.a)(l.a.mark((function e(t,n){var a,r,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=localStorage.getItem("channel-info")){e.next=3;break}return e.abrupt("return",j(t,n));case 3:if(e.prev=3,r=JSON.parse(a),c=Date.now(),r.channel!==n&&localStorage.removeItem("last-seen"),!(r.channel===n&&c<r.updated+12e5)){e.next=9;break}return e.abrupt("return",r.data);case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),console.error(e.t0);case 14:return e.abrupt("return",j(t,n));case 15:case"end":return e.stop()}}),e,null,[[3,11]])})))).apply(this,arguments)}function I(e,t){var n=r.a.useState(!0),a=Object(u.a)(n,2),c=a[0],o=a[1],i=r.a.useState(!1),l=Object(u.a)(i,2),s=l[0],d=l[1],f=r.a.useState(null),m=Object(u.a)(f,2),h=m[0],v=m[1];return r.a.useEffect((function(){o(!0),function(e,t){return N.apply(this,arguments)}(e,t).then((function(e){v(function(e){if(!e||0===e.length)return null;var t=localStorage.getItem("last-seen");if(null==t){var n=e[e.length-1];return localStorage.setItem("last-seen",n.id.toString(10)),n}var a=e.findIndex((function(e){return e.id.toString(10)===t})),r=e[a>0?a-1:e.length-1];return localStorage.setItem("last-seen",r.id.toString(10)),r}(e)),o(!1)})).catch((function(e){console.error(e),o(!1),d(!0)}))}),[e,t]),{loading:c,failed:s,data:h}}var B=function(e){var t=I(e.arena,e.channel),n=t.failed,a=t.data;return r.a.createElement("div",{className:"App"},n&&r.a.createElement(m,null),!n&&r.a.createElement(k,{data:a}))},H=n(9),J=n(10),R=n(11),T=function(){function e(t){Object(J.a)(this,e),this.arenaService=t}return Object(R.a)(e,[{key:"getContent",value:function(){var e=Object(s.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.arenaService.channel(t);case 2:return n=e.sent,e.abrupt("return",{channel:t,data:n.contents,updated:Date.now()});case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();var A={channel:window.localStorage.getItem("channel")||function(){var e=window.location.search.match(/\?channel=(.+)/);return e?e[1]:null}()||"good-sign-offs",token:window.localStorage.getItem("token")||void 0},M=A.token,Z=A.channel,z=new T(new H.ArenaClient({token:M}));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,{arena:z,channel:Z})),document.getElementById("root"))},5:function(e,t,n){e.exports={root:"errored_root__2mzh4",indicator:"errored_indicator__1p0FO"}}},[[12,1,2]]]);
//# sourceMappingURL=main.c1c82b75.chunk.js.map