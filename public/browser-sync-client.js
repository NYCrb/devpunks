!function t(e,n,o){function r(s,c){if(!n[s]){if(!e[s]){var a="function"==typeof require&&require;if(!c&&a)return a(s,!0);if(i)return i(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){var n=e[s][1][t];return r(n?n:t)},u,u.exports,t,e,n,o)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)r(o[s]);return r}({1:[function(t,e,n){"use strict";function o(t){return"undefined"==typeof t}function r(t,e){for(var n=0,o=e.split("."),r=o.length;r>n;n++){if(!t||"object"!=typeof t)return!1;t=t[o[n]]}return"undefined"==typeof t?!1:t}var i=t("./socket"),s=t("./emitter"),c=(t("./notify"),t("./tab"),t("./browser.utils")),a=function(t){this.options=t,this.socket=i,this.emitter=s,this.utils=c,this.tabHidden=!1;var e=this;i.on("options:set",function(t){s.emit("notify","Setting options..."),e.options=t.options}),s.on("tab:hidden",function(){e.tabHidden=!0}),s.on("tab:visible",function(){e.tabHidden=!1})};a.prototype.canSync=function(t,e){if(t=t||{},t.override)return!0;var n=!0;return e&&(n=this.getOption(e)),n&&t.url===window.location.pathname},a.prototype.getOption=function(t){if(t&&t.match(/\./))return r(this.options,t);var e=this.options[t];return o(e)?!1:e},e.exports=a},{"./browser.utils":2,"./emitter":5,"./notify":16,"./socket":17,"./tab":18}],2:[function(t,e,n){"use strict";var o=n;o.getWindow=function(){return window},o.getDocument=function(){return document},o.getBody=function(){return document.getElementsByTagName("body")[0]},o.getBrowserScrollPosition=function(){var t,e,o=n.getWindow(),r=n.getDocument(),i=r.documentElement,s=r.body;return void 0!==o.pageYOffset?(t=o.pageXOffset,e=o.pageYOffset):(t=i.scrollLeft||s.scrollLeft||0,e=i.scrollTop||s.scrollTop||0),{x:t,y:e}},o.getScrollSpace=function(){var t=n.getDocument(),e=t.documentElement,o=t.body;return{x:o.scrollHeight-e.clientWidth,y:o.scrollHeight-e.clientHeight}},o.saveScrollPosition=function(){var t=o.getBrowserScrollPosition();t=[t.x,t.y],o.getDocument.cookie="bs_scroll_pos="+t.join(",")},o.restoreScrollPosition=function(){var t=o.getDocument().cookie.replace(/(?:(?:^|.*;\s*)bs_scroll_pos\s*\=\s*([^;]*).*$)|^.*$/,"$1").split(",");o.getWindow().scrollTo(t[0],t[1])},o.getElementIndex=function(t,e){var n=o.getDocument().getElementsByTagName(t);return Array.prototype.indexOf.call(n,e)},o.forceChange=function(t){t.blur(),t.focus()},o.getElementData=function(t){var e=t.tagName,n=o.getElementIndex(e,t);return{tagName:e,index:n}},o.getSingleElement=function(t,e){var n=o.getDocument().getElementsByTagName(t);return n[e]},o.getBody=function(){return o.getDocument().getElementsByTagName("body")[0]},o.setScroll=function(t){o.getWindow().scrollTo(t.x,t.y)},o.reloadBrowser=function(){o.getWindow().location.reload(!0)},o.forEach=function(t,e){for(var n=0,o=t.length;o>n;n+=1)e(t[n],n,t)},o.isOldIe=function(){return"undefined"!=typeof o.getWindow().attachEvent},o.getLocation=function(t){var e=o.getDocument().createElement("a");return e.href=t,""===e.host&&(e.href=e.href),e}},{}],3:[function(t,e,n){"indexOf"in Array.prototype||(Array.prototype.indexOf=function(t,e){void 0===e&&(e=0),0>e&&(e+=this.length),0>e&&(e=0);for(var n=this.length;n>e;e+=1)if(e in this&&this[e]===t)return e;return-1}),Array.prototype.map||(Array.prototype.map=function(t,e){var n,o,r;if(null==this)throw new TypeError(" this is null or not defined");var i=Object(this),s=i.length>>>0;if("function"!=typeof t)throw new TypeError(t+" is not a function");for(arguments.length>1&&(n=e),o=new Array(s),r=0;s>r;){var c,a;r in i&&(c=i[r],a=t.call(n,c,r,i),o[r]=a),r++}return o}),Array.prototype.filter||(Array.prototype.filter=function(t){"use strict";if(void 0===this||null===this)throw new TypeError;var e=Object(this),n=e.length>>>0;if("function"!=typeof t)throw new TypeError;for(var o=[],r=arguments.length>=2?arguments[1]:void 0,i=0;n>i;i++)if(i in e){var s=e[i];t.call(r,s,i,e)&&o.push(s)}return o})},{}],4:[function(t,e,n){"use strict";var o,r=t("./events"),i=t("./browser.utils"),s=t("./emitter"),c=n,a={tagNames:{css:"link",jpg:"img",jpeg:"img",png:"img",svg:"img",gif:"img",js:"script"},attrs:{link:"href",img:"src",script:"src"}},l="codeSync",u=function(){return window.location.pathname};c.init=function(t){t.options.tagNames&&(a.tagNames=t.options.tagNames),"window.name"===t.options.scrollRestoreTechnique?c.saveScrollInName(s):c.saveScrollInCookie(i.getWindow(),i.getDocument()),t.socket.on("file:reload",c.reload(t)),t.socket.on("browser:reload",function(){t.canSync({url:u()},l)&&c.reloadBrowser(!0,t)})},c.saveScrollInName=function(){var t="<<BS_START>>",e="<<BS_END>>",n=new RegExp(t+"(.+?)"+e),o=i.getWindow(),r={};s.on("browser:hardReload",function(n){var r=[o.name,t,JSON.stringify({bs:{hardReload:!0,scroll:n.scrollPosition}}),e].join("");o.name=r});try{var c=o.name.match(n);c&&(r=JSON.parse(c[1]))}catch(a){r={}}r.bs&&r.bs.hardReload&&r.bs.scroll&&i.setScroll(r.bs.scroll),o.name=o.name.replace(n,"")},c.saveScrollInCookie=function(t,e){i.isOldIe()&&("complete"===e.readyState?i.restoreScrollPosition():r.manager.addEvent(e,"readystatechange",function(){"complete"===e.readyState&&i.restoreScrollPosition()}),s.on("browser:hardReload",i.saveScrollPosition))},c.updateSearch=function(t,e,n){return""===t?"?"+n:"?"+t.slice(1).split("&").map(function(t){return t.split("=")}).filter(function(t){return t[0]!==e}).map(function(t){return[t[0],t[1]].join("=")}).concat(n).join("&")},c.swapFile=function(t,e,n){var r=t[e],s=(new Date).getTime(),a="rel",l=a+"="+s,u=i.getLocation(r),f=c.updateSearch(u.search,a,l);n.timestamps===!1?t[e]=u.href:t[e]=u.href.split("?")[0]+f;var d=document.body;return setTimeout(function(){o?(o.style.display="none",o.style.display="block"):(o=document.createElement("DIV"),d.appendChild(o))},200),{elem:t,timeStamp:s}},c.getFilenameOnly=function(t){return/^[^\?]+(?=\?)/.exec(t)},c.reload=function(t){return function(e){if(t.canSync({url:u()},l)){var n,o=t.options,r=t.emitter;if((e.url||!o.injectChanges)&&c.reloadBrowser(!0),e.basename&&e.ext){var i=c.getElems(e.ext),s=c.getMatches(i.elems,e.basename,i.attr);s.length&&o.notify&&r.emit("notify",{message:"Injected: "+e.basename});for(var a=0,f=s.length;f>a;a+=1)n=c.swapFile(s[a],i.attr,o)}return n}}},c.getTagName=function(t){return a.tagNames[t]},c.getAttr=function(t){return a.attrs[t]},c.getMatches=function(t,e,n){if("*"===e[0])return t;for(var o=[],r=new RegExp("(^|/)"+e),i=0,s=t.length;s>i;i+=1)r.test(t[i][n])&&o.push(t[i]);return o},c.getElems=function(t){var e=c.getTagName(t),n=c.getAttr(e);return{elems:document.getElementsByTagName(e),attr:n}},c.reloadBrowser=function(t){s.emit("browser:hardReload",{scrollPosition:i.getBrowserScrollPosition()}),t&&i.reloadBrowser()}},{"./browser.utils":2,"./emitter":5,"./events":6}],5:[function(t,e,n){"use strict";n.events={},n.emit=function(t,e){var o,r=n.events[t];if(r&&r.listeners){o=r.listeners;for(var i=0,s=o.length;s>i;i+=1)o[i](e)}},n.on=function(t,e){var o=n.events;o[t]?o[t].listeners.push(e):o[t]={listeners:[e]}}},{}],6:[function(t,e,n){n._ElementCache=function(){var t={},e=1,n="data"+(new Date).getTime();this.getData=function(o){var r=o[n];return r||(r=o[n]=e++,t[r]={}),t[r]},this.removeData=function(e){var o=e[n];if(o){delete t[o];try{delete e[n]}catch(r){e.removeAttribute&&e.removeAttribute(n)}}}},n._fixEvent=function(t){function e(){return!0}function n(){return!1}if(!t||!t.stopPropagation){var o=t||window.event;t={};for(var r in o)t[r]=o[r];if(t.target||(t.target=t.srcElement||document),t.relatedTarget=t.fromElement===t.target?t.toElement:t.fromElement,t.preventDefault=function(){t.returnValue=!1,t.isDefaultPrevented=e},t.isDefaultPrevented=n,t.stopPropagation=function(){t.cancelBubble=!0,t.isPropagationStopped=e},t.isPropagationStopped=n,t.stopImmediatePropagation=function(){this.isImmediatePropagationStopped=e,this.stopPropagation()},t.isImmediatePropagationStopped=n,null!=t.clientX){var i=document.documentElement,s=document.body;t.pageX=t.clientX+(i&&i.scrollLeft||s&&s.scrollLeft||0)-(i&&i.clientLeft||s&&s.clientLeft||0),t.pageY=t.clientY+(i&&i.scrollTop||s&&s.scrollTop||0)-(i&&i.clientTop||s&&s.clientTop||0)}t.which=t.charCode||t.keyCode,null!=t.button&&(t.button=1&t.button?0:4&t.button?1:2&t.button?2:0)}return t},n._EventManager=function(t){function e(e,n){function o(t){for(var e in t)return!1;return!0}var r=t.getData(e);0===r.handlers[n].length&&(delete r.handlers[n],document.removeEventListener?e.removeEventListener(n,r.dispatcher,!1):document.detachEvent&&e.detachEvent("on"+n,r.dispatcher)),o(r.handlers)&&(delete r.handlers,delete r.dispatcher),o(r)&&t.removeData(e)}var o=1;this.addEvent=function(e,r,i){var s=t.getData(e);s.handlers||(s.handlers={}),s.handlers[r]||(s.handlers[r]=[]),i.guid||(i.guid=o++),s.handlers[r].push(i),s.dispatcher||(s.disabled=!1,s.dispatcher=function(t){if(!s.disabled){t=n._fixEvent(t);var o=s.handlers[t.type];if(o)for(var r=0;r<o.length;r++)o[r].call(e,t)}}),1==s.handlers[r].length&&(document.addEventListener?e.addEventListener(r,s.dispatcher,!1):document.attachEvent&&e.attachEvent("on"+r,s.dispatcher))},this.removeEvent=function(n,o,r){var i=t.getData(n);if(i.handlers){var s=function(t){i.handlers[t]=[],e(n,t)};if(o){var c=i.handlers[o];if(c){if(!r)return void s(o);if(r.guid)for(var a=0;a<c.length;a++)c[a].guid===r.guid&&c.splice(a--,1);e(n,o)}}else for(var l in i.handlers)s(l)}},this.proxy=function(t,e){e.guid||(e.guid=o++);var n=function(){return e.apply(t,arguments)};return n.guid=e.guid,n}},n.triggerClick=function(t){var e;document.createEvent?window.setTimeout(function(){e=document.createEvent("MouseEvents"),e.initEvent("click",!0,!0),t.dispatchEvent(e)},0):window.setTimeout(function(){document.createEventObject&&(e=document.createEventObject(),e.cancelBubble=!0,t.fireEvent("onclick",e))},0)};var o=new n._ElementCache,r=new n._EventManager(o);r.triggerClick=n.triggerClick,n.manager=r},{}],7:[function(t,e,n){"use strict";var o="click",r="ghostMode.clicks";n.canEmitEvents=!0,n.init=function(t,e){e.addEvent(document.body,o,n.browserEvent(t)),t.socket.on(o,n.socketEvent(t,e))},n.browserEvent=function(t){return function(e){if(n.canEmitEvents){var r=e.target||e.srcElement;if("checkbox"===r.type||"radio"===r.type)return void t.utils.forceChange(r);t.socket.emit(o,t.utils.getElementData(r))}else n.canEmitEvents=!0}},n.socketEvent=function(t,e){return function(o){if(!t.canSync(o,r)||t.tabHidden)return!1;var i=t.utils.getSingleElement(o.tagName,o.index);i&&(n.canEmitEvents=!1,e.triggerClick(i))}}},{}],8:[function(t,e,n){"use strict";var o="input:text",r="ghostMode.forms.inputs";n.canEmitEvents=!0,n.init=function(t,e){e.addEvent(document.body,"keyup",n.browserEvent(t)),t.socket.on(o,n.socketEvent(t,e))},n.browserEvent=function(t){return function(e){var r,i=e.target||e.srcElement;n.canEmitEvents?("INPUT"===i.tagName||"TEXTAREA"===i.tagName)&&(r=t.utils.getElementData(i),r.value=i.value,t.socket.emit(o,r)):n.canEmitEvents=!0}},n.socketEvent=function(t){return function(e){if(!t.canSync(e,r))return!1;var n=t.utils.getSingleElement(e.tagName,e.index);return n?(n.value=e.value,n):!1}}},{}],9:[function(t,e,n){"use strict";n.plugins={inputs:t("./ghostmode.forms.input"),toggles:t("./ghostmode.forms.toggles"),submit:t("./ghostmode.forms.submit")},n.init=function(t,e){function o(o){n.plugins[o].init(t,e)}var r=!0,i=t.options.ghostMode.forms;i===!0&&(r=!1);for(var s in n.plugins)r?i[s]&&o(s):o(s)}},{"./ghostmode.forms.input":8,"./ghostmode.forms.submit":10,"./ghostmode.forms.toggles":11}],10:[function(t,e,n){"use strict";var o="form:submit",r="ghostMode.forms.submit";n.canEmitEvents=!0,n.init=function(t,e){var r=n.browserEvent(t);e.addEvent(document.body,"submit",r),e.addEvent(document.body,"reset",r),t.socket.on(o,n.socketEvent(t,e))},n.browserEvent=function(t){return function(e){if(n.canEmitEvents){var r=e.target||e.srcElement,i=t.utils.getElementData(r);i.type=e.type,t.socket.emit(o,i)}else n.canEmitEvents=!0}},n.socketEvent=function(t){return function(e){if(!t.canSync(e,r))return!1;var o=t.utils.getSingleElement(e.tagName,e.index);return n.canEmitEvents=!1,o&&"submit"===e.type&&o.submit(),o&&"reset"===e.type&&o.reset(),!1}}},{}],11:[function(t,e,n){"use strict";var o="input:toggles",r="ghostMode.forms.toggles";n.canEmitEvents=!0,n.init=function(t,e){var r=n.browserEvent(t);n.addEvents(e,r),t.socket.on(o,n.socketEvent(t,e))},n.addEvents=function(t,e){function n(n){for(var o=0,r=n.length;r>o;o+=1)t.addEvent(n[o],"change",e)}var o=document.getElementsByTagName("select"),r=document.getElementsByTagName("input");n(o),n(r)},n.browserEvent=function(t){return function(e){if(n.canEmitEvents){var r,i=e.target||e.srcElement;("radio"===i.type||"checkbox"===i.type||"SELECT"===i.tagName)&&(r=t.utils.getElementData(i),r.type=i.type,r.value=i.value,r.checked=i.checked,t.socket.emit(o,r))}else n.canEmitEvents=!0}},n.socketEvent=function(t){return function(e){if(!t.canSync(e,r))return!1;n.canEmitEvents=!1;var o=t.utils.getSingleElement(e.tagName,e.index);return o?("radio"===e.type&&(o.checked=!0),"checkbox"===e.type&&(o.checked=e.checked),"SELECT"===e.tagName&&(o.value=e.value),o):!1}}},{}],12:[function(t,e,n){"use strict";var o=t("./events").manager;n.plugins={scroll:t("./ghostmode.scroll"),clicks:t("./ghostmode.clicks"),forms:t("./ghostmode.forms"),location:t("./ghostmode.location")},n.init=function(t){for(var e in n.plugins)t.options.ghostMode[e]&&n.plugins[e].init(t,o)}},{"./events":6,"./ghostmode.clicks":7,"./ghostmode.forms":9,"./ghostmode.location":13,"./ghostmode.scroll":14}],13:[function(t,e,n){"use strict";var o="browser:location",r="ghostMode.location";n.canEmitEvents=!0,n.init=function(t){t.socket.on(o,n.socketEvent(t))},n.socketEvent=function(t){return function(e){return t.canSync(e,r)?void(e.path?n.setPath(e.path):n.setUrl(e.url)):!1}},n.setUrl=function(t){window.location=t},n.setPath=function(t){window.location=window.location.protocol+"//"+window.location.host+t}},{}],14:[function(t,e,n){"use strict";var o,r="scroll",i="scroll:element",s="ghostMode.scroll";n.canEmitEvents=!0,n.init=function(t,e){function s(i,s){c[i]&&c[i].length&&"querySelectorAll"in document&&o.forEach(c[i],function(i){var c=document.querySelectorAll(i)||[];o.forEach(c,function(i){var c=o.getElementData(i);c.cacheSelector=c.tagName+":"+c.index,c.map=s,a[c.cacheSelector]=i,e.addEvent(i,r,n.browserEventForElement(t,i,c))})})}o=t.utils;var c=t.options;e.addEvent(window,r,n.browserEvent(t)),t.socket.on(r,n.socketEvent(t));var a={};s("scrollElements",!1),s("scrollElementMapping",!0),t.socket.on(i,n.socketEventForElement(t,a))},n.socketEvent=function(t){return function(e){if(!t.canSync(e,s))return!1;var r=o.getScrollSpace();return n.canEmitEvents=!1,t.options&&t.options.scrollProportionally?window.scrollTo(0,r.y*e.position.proportional):window.scrollTo(0,e.position.raw.y)}},n.socketEventForElement=function(t,e){return function(o){function r(t,n){e[t]&&(e[t].scrollTop=n)}return t.canSync(o,s)?(n.canEmitEvents=!1,o.map?Object.keys(e).forEach(function(t){r(t,o.position)}):void r(o.elem.cacheSelector,o.position)):!1}},n.browserEventForElement=function(t,e,o){return function(){var r=n.canEmitEvents;r&&t.socket.emit(i,{position:e.scrollTop,elem:o,map:o.map}),n.canEmitEvents=!0}},n.browserEvent=function(t){return function(){var e=n.canEmitEvents;e&&t.socket.emit(r,{position:n.getScrollPosition()}),n.canEmitEvents=!0}},n.getScrollPosition=function(){var t=o.getBrowserScrollPosition();return{raw:t,proportional:n.getScrollTopPercentage(t)}},n.getScrollPercentage=function(t,e){var n=e.x/t.x,o=e.y/t.y;return{x:n||0,y:o}},n.getScrollTopPercentage=function(t){var e=o.getScrollSpace(),r=n.getScrollPercentage(e,t);return r.y}},{}],15:[function(t,e,n){"use strict";var o=t("./socket"),r=(t("./client-shims"),t("./notify")),i=t("./code-sync"),s=t("./browser-sync"),c=t("./ghostmode"),a=(t("./emitter"),t("./events"),t("./browser.utils")),l=!1,u=!1;n.init=function(t){l&&t.reloadOnRestart&&a.reloadBrowser();var e=window.___browserSync___||{};if(!e.client){e.client=!0;var n=new s(t);c.init(n),i.init(n),r.init(n),t.notify&&r.flash("Connected to BrowserSync")}u||(o.on("disconnect",function(){t.notify&&r.flash("Disconnected from BrowserSync"),l=!0}),u=!0)},o.on("connection",n.init)},{"./browser-sync":1,"./browser.utils":2,"./client-shims":3,"./code-sync":4,"./emitter":5,"./events":6,"./ghostmode":12,"./ghostmode.clicks":7,"./ghostmode.forms":9,"./ghostmode.forms.input":8,"./ghostmode.forms.submit":10,"./ghostmode.forms.toggles":11,"./ghostmode.location":13,"./ghostmode.scroll":14,"./notify":16,"./socket":17}],16:[function(t,e,n){"use strict";var o,r,i,s=(t("./ghostmode.scroll"),t("./browser.utils")),c={display:"none",padding:"15px",fontFamily:"sans-serif",position:"fixed",fontSize:"0.9em",zIndex:9999,right:0,top:0,borderBottomLeftRadius:"5px",backgroundColor:"#1B2032",margin:0,color:"white",textAlign:"center"};n.init=function(t){r=t.options;var e=c;if(r.notify.styles)if("[object Array]"===Object.prototype.toString.call(r.notify.styles))e=r.notify.styles.join(";");else for(var i in r.notify.styles)r.notify.styles.hasOwnProperty(i)&&(e[i]=r.notify.styles[i]);if(o=document.createElement("DIV"),o.id="__bs_notify__","string"==typeof e)o.style.cssText=e;else for(var s in e)o.style[s]=e[s];var a=n.watchEvent(t);return t.emitter.on("notify",a),t.socket.on("browser:notify",a),o},n.watchEvent=function(t){return function(e){if(t.options.notify||e.override){if("string"==typeof e)return n.flash(e);n.flash(e.message,e.timeout)}}},n.getElem=function(){return o},n.flash=function(t,e){var o=n.getElem(),r=s.getBody();return o?(o.innerHTML=t,o.style.display="block",r.appendChild(o),i&&(clearTimeout(i),i=void 0),i=window.setTimeout(function(){o.style.display="none",o.parentNode&&r.removeChild(o)},e||2e3),o):!1}},{"./browser.utils":2,"./ghostmode.scroll":14}],17:[function(t,e,n){"use strict";var o=window.___browserSync___||{};n.socket=o.socket||{emit:function(){},on:function(){}},n.getPath=function(){return window.location.pathname},n.emit=function(t,e){var o=n.socket;o&&o.emit&&(e.url=n.getPath(),o.emit(t,e))},n.on=function(t,e){n.socket.on(t,e)}},{}],18:[function(t,e,n){function o(){a[r]?c.emit("tab:hidden"):c.emit("tab:visible")}var r,i,s=t("./browser.utils"),c=t("./emitter"),a=s.getDocument();"undefined"!=typeof a.hidden?(r="hidden",i="visibilitychange"):"undefined"!=typeof a.mozHidden?(r="mozHidden",i="mozvisibilitychange"):"undefined"!=typeof a.msHidden?(r="msHidden",i="msvisibilitychange"):"undefined"!=typeof a.webkitHidden&&(r="webkitHidden",i="webkitvisibilitychange"),"undefined"==typeof a.addEventListener||"undefined"==typeof a[r]||a.addEventListener(i,o,!1)},{"./browser.utils":2,"./emitter":5}]},{},[15]);