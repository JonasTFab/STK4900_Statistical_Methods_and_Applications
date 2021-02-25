var vrtxHistFrag={};
vrtxHistFrag.debug=false;
vrtxHistFrag.defaultBacksteps=2;
vrtxHistFrag.maxBacksteps=6;
vrtxHistFrag.contains=function(str,substring){
return str.indexOf(suffix,str.length-suffix.length)!==-1};
vrtxHistFrag.endsWith=function(str,suffix){
return str.indexOf(suffix,str.length-suffix.length)!==-1};
vrtxHistFrag.multiBack=function(){
backsteps=vrtxHistFrag.defaultBacksteps;
stateData=window.history.state;
if(typeof stateData==="number"&&stateData>1&&stateData<=vrtxHistFrag.maxBacksteps){
backsteps=stateData}
if(vrtxHistFrag.debug){
alert("multiback steps: "+backsteps)}
history.go(-backsteps)};
vrtxHistFrag.fragmentBacksteps=function(url){
var backstepsNumberPat=/(?:.*)#(?:.*&)?(?:backsteps=)([0-9]+)(?:&.*)?$/;
if(backstepsNumberPat.test(url)){
var backstepsNumberRes=backstepsNumberPat.exec(url);
if(backstepsNumberRes&&backstepsNumberRes.length===2){
var backsteps=Number(backstepsNumberRes[1]);
return backsteps}}
return null};
vrtxHistFrag.prepareRemoveWithPattern=function(pattern,url){
var matchRes=pattern.exec(url);
if(matchRes&&matchRes.length===2){
var removeLastIndex=pattern.lastIndex;
var removeStr=matchRes[1];
return[removeStr,removeLastIndex]}else
{
return null}};
vrtxHistFrag.urlWithoutFragmentBacksteps=function(url){
returnUrl=url;
backsteps=vrtxHistFrag.fragmentBacksteps(url);
if(typeof backsteps==="number"&&backsteps>1){
var backstepsRemovePat1=/(?:.*)#(?:.*)+(&backsteps=[0-9]+)/g;
var backstepsRemovePat2=/(?:.*)(#backsteps=[0-9]+)/g;
var removeStr=null;
var removeLastIndex=null;
var removeInfo=vrtxHistFrag.prepareRemoveWithPattern(backstepsRemovePat1,url);
if(removeInfo!==null&&removeInfo.length===2){
removeStr=removeInfo[0];
removeLastIndex=removeInfo[1];
returnUrl=url.substring(0,removeLastIndex-removeStr.length)+
url.substring(removeLastIndex,url.length)}else
{
removeInfo=vrtxHistFrag.prepareRemoveWithPattern(backstepsRemovePat2,url);
if(removeInfo!==null&&removeInfo.length===2){
removeStr=removeInfo[0];
removeLastIndex=removeInfo[1];
var endFirstPartIndex=removeLastIndex-removeStr.length;
var startSecondPartIndex=removeLastIndex;
if(removeLastIndex<url.length){
endFirstPartIndex=endFirstPartIndex+1;
if(url.substring(removeLastIndex,removeLastIndex+1)==="&"){
startSecondPartIndex=startSecondPartIndex+1}}
returnUrl=url.substring(0,endFirstPartIndex)+
url.substring(startSecondPartIndex,url.length)}}}
return returnUrl};
vrtxHistFrag.processBackstepsFragment=function(url){
if(!!(window.history&&window.history.pushState&&window.self===window.top)){
backsteps=vrtxHistFrag.fragmentBacksteps(url);
if(typeof backsteps==="number"&&backsteps>1){
newUrl=vrtxHistFrag.urlWithoutFragmentBacksteps(url);
history.pushState(backsteps,"",newUrl);
window.addEventListener("popstate",vrtxHistFrag.multiBack,false)}else
{
stateData=window.history.state;
if(typeof stateData==="number"&&stateData>1&&stateData<=vrtxHistFrag.maxBacksteps){
window.addEventListener("popstate",vrtxHistFrag.multiBack,false)}}}};
vrtxHistFrag.processBackstepsFragment(location.href);
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}function s(e){for(var t,i;e.length&&e[0]!==document;){if(t=e.css("position"),("absolute"===t||"relative"===t||"fixed"===t)&&(i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}function n(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=a(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function a(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.delegate(i,"mouseout",function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).delegate(i,"mouseover",o)}function o(){e.datepicker._isDisabledDatepicker(g.inline?g.dpDiv.parent()[0]:g.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}function r(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var h=0,l=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,n=l.call(arguments,1),a=0,o=n.length;o>a;a++)for(i in n[a])s=n[a][i],n[a].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(n){var a="string"==typeof n,o=l.call(arguments,1),r=this;return a?this.each(function(){var i,a=e.data(this,s);return"instance"===n?(r=a,!1):a?e.isFunction(a[n])&&"_"!==n.charAt(0)?(i=a[n].apply(a,o),i!==a&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+n+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+n+"'")}):(o.length&&(n=e.widget.extend.apply(null,[n].concat(o))),this.each(function(){var t=e.data(this,s);t?(t.option(n||{}),t._init&&t._init()):e.data(this,s,new i(n,this))})),r}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=h++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var u=!1;e(document).mouseup(function(){u=!1}),e.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!u){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),u=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),u=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),function(){function t(e,t,i){return[parseFloat(e[0])*(p.test(e[0])?t/100:1),parseFloat(e[1])*(p.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}e.ui=e.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,d=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,p=/%$/,f=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth,a="scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight;return{width:a?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=e.extend({},n);var p,m,g,v,y,b,_=e(n.of),x=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),T={};return b=s(_),_[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,y=e.extend({},v),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",e=d.exec(i[0]),t=d.exec(i[1]),T[this]=[e?e[0]:0,t?t[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?y.left+=m:"center"===n.at[0]&&(y.left+=m/2),"bottom"===n.at[1]?y.top+=g:"center"===n.at[1]&&(y.top+=g/2),p=t(T.at,m,g),y.left+=p[0],y.top+=p[1],this.each(function(){var s,l,u=e(this),d=u.outerWidth(),c=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),D=d+f+i(this,"marginRight")+w.width,S=c+b+i(this,"marginBottom")+w.height,N=e.extend({},y),M=t(T.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?N.left-=d:"center"===n.my[0]&&(N.left-=d/2),"bottom"===n.my[1]?N.top-=c:"center"===n.my[1]&&(N.top-=c/2),N.left+=M[0],N.top+=M[1],a||(N.left=h(N.left),N.top=h(N.top)),s={marginLeft:f,marginTop:b},e.each(["left","top"],function(t,i){e.ui.position[k[t]]&&e.ui.position[k[t]][i](N,{targetWidth:m,targetHeight:g,elemWidth:d,elemHeight:c,collisionPosition:s,collisionWidth:D,collisionHeight:S,offset:[p[0]+M[0],p[1]+M[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(e){var t=v.left-N.left,i=t+m-d,s=v.top-N.top,a=s+g-c,h={target:{element:_,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:N.left,top:N.top,width:d,height:c},horizontal:0>i?"left":t>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};d>m&&m>r(t+i)&&(h.horizontal="center"),c>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(t),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,e,h)}),u.offset(e.extend(N,{using:l}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=e.left-t.collisionPosition.marginLeft,h=n-r,l=r+t.collisionWidth-a-n;t.collisionWidth>a?h>0&&0>=l?(i=e.left+h+t.collisionWidth-a-n,e.left+=h-i):e.left=l>0&&0>=h?n:h>l?n+a-t.collisionWidth:n:h>0?e.left+=h:l>0?e.left-=l:e.left=o(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,a=t.within.height,r=e.top-t.collisionPosition.marginTop,h=n-r,l=r+t.collisionHeight-a-n;t.collisionHeight>a?h>0&&0>=l?(i=e.top+h+t.collisionHeight-a-n,e.top+=h-i):e.top=l>0&&0>=h?n:h>l?n+a-t.collisionHeight:n:h>0?e.top+=h:l>0?e.top-=l:e.top=o(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=e.left-t.collisionPosition.marginLeft,u=l-h,d=l+t.collisionWidth-o-h,c="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];0>u?(i=e.left+c+p+f+t.collisionWidth-o-a,(0>i||r(u)>i)&&(e.left+=c+p+f)):d>0&&(s=e.left-t.collisionPosition.marginLeft+c+p+f-h,(s>0||d>r(s))&&(e.left+=c+p+f))},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=e.top-t.collisionPosition.marginTop,u=l-h,d=l+t.collisionHeight-o-h,c="top"===t.my[1],p=c?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];0>u?(s=e.top+p+f+m+t.collisionHeight-o-a,(0>s||r(u)>s)&&(e.top+=p+f+m)):d>0&&(i=e.top-t.collisionPosition.marginTop+p+f+m-h,(i>0||d>r(i))&&(e.top+=p+f+m))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");t=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&e.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)t.style[o]=s[o];t.appendChild(h),i=r||document.documentElement,i.insertBefore(t,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=e(h).offset().left,a=n>10&&11>n,t.innerHTML="",i.removeChild(t)}()}(),e.ui.position,e.widget("ui.draggable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(t){var i=this.options;return this._blurActiveElement(t),this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=this.document[0];if(this.handleElement.is(t.target))try{i.activeElement&&"body"!==i.activeElement.nodeName.toLowerCase()&&e(i.activeElement).blur()}catch(s){}},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._normalizeRightBottom(),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i=this,s=!1;return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",t)!==!1&&i._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1},_mouseUp:function(t){return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.focus(),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this.handleElement.addClass("ui-draggable-handle")},_removeHandleClassName:function(){this.handleElement.removeClass("ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){var t=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),s=i[0],s&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),h=e.pageX,l=e.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),
i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,h=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(h=this.originalPageX),"x"===o.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_normalizeRightBottom:function(){"y"!==this.options.axis&&"auto"!==this.helper.css("right")&&(this.helper.width(this.helper.width()),this.helper.css("right","auto")),"x"!==this.options.axis&&"auto"!==this.helper.css("bottom")&&(this.helper.height(this.helper.height()),this.helper.css("bottom","auto"))},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),e.options.helper=e.options._helper):(e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(a.isOver||(a.isOver=1,s._parent=i.helper.parent(),a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),s.dropped=a.element,e.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),i.position=a.position)):a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),s.dropped=!1,e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),a!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,h,l,u,d,c,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,y=i.offset.top,b=y+s.helperProportions.height;for(c=s.snapElements.length-1;c>=0;c--)h=s.snapElements[c].left-s.margins.left,l=h+s.snapElements[c].width,u=s.snapElements[c].top-s.margins.top,d=u+s.snapElements[c].height,h-m>v||g>l+m||u-m>b||y>d+m||!e.contains(s.snapElements[c].item.ownerDocument,s.snapElements[c].item)?(s.snapElements[c].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=!1):("inner"!==f.snapMode&&(n=m>=Math.abs(u-b),a=m>=Math.abs(d-y),o=m>=Math.abs(h-v),r=m>=Math.abs(l-g),n&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=m>=Math.abs(u-y),a=m>=Math.abs(d-b),o=m>=Math.abs(h-g),r=m>=Math.abs(l-v),n&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:d-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[c].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[c].item})),s.snapElements[c].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}}),e.ui.draggable,e.widget("ui.droppable",{version:"1.11.4",widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){return arguments.length?(t=arguments[0],void 0):t?t:t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this.element.addClass("ui-droppable")},_addToManager:function(t){e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){for(var t=0;e.length>t;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t),this.element.removeClass("ui-droppable ui-droppable-disabled")},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&e.ui.intersect(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",t,this.ui(s)),this.element):!1):!1},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}}}),e.ui.intersect=function(){function e(e,t,i){return e>=t&&t+i>e}return function(t,i,s,n){if(!i.offset)return!1;var a=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,r=a+t.helperProportions.width,h=o+t.helperProportions.height,l=i.offset.left,u=i.offset.top,d=l+i.proportions().width,c=u+i.proportions().height;switch(s){case"fit":return a>=l&&d>=r&&o>=u&&c>=h;case"intersect":return a+t.helperProportions.width/2>l&&d>r-t.helperProportions.width/2&&o+t.helperProportions.height/2>u&&c>h-t.helperProportions.height/2;case"pointer":return e(n.pageY,u,i.proportions().height)&&e(n.pageX,l,i.proportions().width);case"touch":return(o>=u&&c>=o||h>=u&&c>=h||u>o&&h>c)&&(a>=l&&d>=a||r>=l&&d>=r||l>a&&r>d);default:return!1}}}(),e.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(t,i){var s,n,a=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,r=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;a.length>s;s++)if(!(a[s].options.disabled||t&&!a[s].accept.call(a[s].element[0],t.currentItem||t.element))){for(n=0;r.length>n;n++)if(r[n]===a[s].element[0]){a[s].proportions().height=0;continue e}a[s].visible="none"!==a[s].element.css("display"),a[s].visible&&("mousedown"===o&&a[s]._activate.call(a[s],i),a[s].offset=a[s].element.offset(),a[s].proportions({width:a[s].element[0].offsetWidth,height:a[s].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&e.ui.intersect(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){t.element.parentsUntil("body").bind("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,o=e.ui.intersect(t,this,this.options.tolerance,i),r=!o&&this.isover?"isout":o&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===n}),a.length&&(s=e(a[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").unbind("scroll.droppable"),t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}},e.ui.droppable,e.widget("ui.resizable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(e){return parseInt(e,10)||0},_isNumber:function(e){return!isNaN(parseInt(e,10))},_hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return t[s]>0?!0:(t[s]=1,n=t[s]>0,t[s]=0,n)},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=e(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=e(this.handles[i]),this._on(this.handles[i],{mousedown:o._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var i,s,n,a=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),a.containment&&(i+=e(a.containment).scrollLeft()||0,s+=e(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),o.addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i,s,n=this.originalMousePosition,a=this.axis,o=t.pageX-n.left||0,r=t.pageY-n.top||0,h=this._change[a];return this._updatePrevProperties(),h?(i=h.apply(this,[t,o,r]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e},_updateVirtualBoundaries:function(e){var t,i,s,n,a,o=this.options;a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,t>a.minWidth&&(a.minWidth=t),s>a.minHeight&&(a.minHeight=s),a.maxWidth>i&&(a.maxWidth=i),a.maxHeight>n&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,a=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,o=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,r=this.originalPosition.left+this.originalSize.width,h=this.position.top+this.size.height,l=/sw|nw|w/.test(i),u=/nw|ne|n/.test(i);return a&&(e.width=t.minWidth),o&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),a&&l&&(e.left=r-t.minWidth),s&&l&&(e.left=r-t.maxWidth),o&&u&&(e.top=h-t.minHeight),n&&u&&(e.top=h-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_getPaddingPlusBorderDimensions:function(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],n=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];4>t;t++)i[t]=parseInt(s[t],10)||0,i[t]+=parseInt(n[t],10)||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;this._proportionallyResizeElements.length>t;t++)e=this._proportionallyResizeElements[t],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var t,i,s,n,a,o,r,h=e(this).resizable("instance"),l=h.options,u=h.element,d=l.containment,c=d instanceof e?d.get(0):/parent/.test(d)?u.parent().get(0):d;c&&(h.containerElement=e(c),/document/.test(d)||d===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(c),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=h._num(t.css("padding"+s))}),h.containerOffset=t.offset(),h.containerPosition=t.position(),h.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,a=h.containerSize.width,o=h._hasScroll(c,"left")?c.scrollWidth:a,r=h._hasScroll(c)?c.scrollHeight:n,h.parentData={element:c,left:s.left,top:s.top,width:o,height:r}))},resize:function(t){var i,s,n,a,o=e(this).resizable("instance"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,d={top:0,left:0},c=o.containerElement,p=!0;c[0]!==document&&/static/.test(c.css("position"))&&(d=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-d.left),u&&(o.size.height=o.size.width/o.aspectRatio,p=!1),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio,p=!1),o.position.top=o._helper?h.top:0),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-h.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-h.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio,p=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio,p=!1)),p||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).resizable("instance"),i=t.options;e(i.alsoResize).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})},resize:function(t,i){var s=e(this).resizable("instance"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0};e(n.alsoResize).each(function(){var t=e(this),s=e(this).data("ui-resizable-alsoresize"),n={},a=t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(a,function(e,t){var i=(s[t]||0)+(r[t]||0);i&&i>=0&&(n[t]=i||null)}),t.css(n)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).resizable("instance"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).resizable("instance")
;t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t,i=e(this).resizable("instance"),s=i.options,n=i.size,a=i.originalSize,o=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,u=h[1]||1,d=Math.round((n.width-a.width)/l)*l,c=Math.round((n.height-a.height)/u)*u,p=a.width+d,f=a.height+c,m=s.maxWidth&&p>s.maxWidth,g=s.maxHeight&&f>s.maxHeight,v=s.minWidth&&s.minWidth>p,y=s.minHeight&&s.minHeight>f;s.grid=h,v&&(p+=l),y&&(f+=u),m&&(p-=l),g&&(f-=u),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=o.top-c):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=o.left-d):((0>=f-u||0>=p-l)&&(t=i._getPaddingPlusBorderDimensions(this)),f-u>0?(i.size.height=f,i.position.top=o.top-c):(f=u-t.height,i.size.height=f,i.position.top=o.top+a.height-f),p-l>0?(i.size.width=p,i.position.left=o.left-d):(p=l-t.width,i.size.width=p,i.position.left=o.left+a.width-p))}}),e.ui.resizable,e.widget("ui.selectable",e.ui.mouse,{version:"1.11.4",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t,i=this;this.element.addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){t=e(i.options.filter,i.element[0]),t.addClass("ui-selectee"),t.each(function(){var t=e(this),i=t.offset();e.data(this,"selectable-item",{element:this,$element:t,left:i.left,top:i.top,right:i.left+t.outerWidth(),bottom:i.top+t.outerHeight(),startselected:!1,selected:t.hasClass("ui-selected"),selecting:t.hasClass("ui-selecting"),unselecting:t.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=t.addClass("ui-selectee"),this._mouseInit(),this.helper=e("<div class='ui-selectable-helper'></div>")},_destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(s.$element.removeClass("ui-selected"),s.selected=!1,s.$element.addClass("ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,n=e.data(this,"selectable-item");return n?(s=!t.metaKey&&!t.ctrlKey||!n.$element.hasClass("ui-selected"),n.$element.removeClass(s?"ui-unselecting":"ui-selected").addClass(s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",t,{selecting:n.element}):i._trigger("unselecting",t,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,a=this.opos[0],o=this.opos[1],r=t.pageX,h=t.pageY;return a>r&&(i=r,r=a,a=i),o>h&&(i=h,h=o,o=i),this.helper.css({left:a,top:o,width:r-a,height:h-o}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),l=!1;i&&i.element!==s.element[0]&&("touch"===n.tolerance?l=!(i.left>r||a>i.right||i.top>h||o>i.bottom):"fit"===n.tolerance&&(l=i.left>a&&r>i.right&&i.top>o&&h>i.bottom),l?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,s._trigger("selecting",t,{selecting:i.element}))):(i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");s.$element.removeClass("ui-selecting").addClass("ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&t+i>e},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"),e.each(this.items,function(){(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item).addClass("ui-sortable-handle")})},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"),this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(t),e(t.target).parents().each(function(){return e.data(this,a.widgetName+"-item")===a?(s=e(this),!1):void 0}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),s?!this.options.handle||i||(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(t,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(t),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",t,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-this.document.scrollTop()<o.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-o.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<o.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+o.scrollSpeed)),t.pageX-this.document.scrollLeft()<o.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-o.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<o.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+o.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!e.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!e.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,h=r+e.height,l=this.offset.click.top,u=this.offset.click.left,d="x"===this.options.axis||s+l>r&&h>s+l,c="y"===this.options.axis||t+u>a&&o>t+u,p=d&&c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:t+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(e){var t="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),s=t&&i,n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return s?this.floating?a&&"right"===a||"down"===n?2:1:n&&("down"===n?2:1):!1},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){r.push(this)}var s,n,a,o,r=[],h=[],l=this._connectWith();if(l&&t)for(s=l.length-1;s>=0;s--)for(a=e(l[s],this.document[0]),n=a.length-1;n>=0;n--)o=e.data(a[n],this.widgetFullName),o&&o!==this&&!o.options.disabled&&h.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(h.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;t.length>i;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,u=this.items,d=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],c=this._connectWith();if(c&&this.ready)for(i=c.length-1;i>=0;i--)for(n=e(c[i],this.document[0]),s=n.length-1;s>=0;s--)a=e.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(d.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));for(i=d.length-1;i>=0;i--)for(o=d[i][1],r=d[i][0],s=0,l=r.length;l>s;s++)h=e(r[s]),h.data(this.widgetName+"-item",o),u.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]).addClass(i||t.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tbody"===s?t._createTrPlaceholder(t.currentItem.find("tr").eq(0),e("<tr>",t.document[0]).appendTo(n)):"tr"===s?t._createTrPlaceholder(t.currentItem,n):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(e,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),t.currentItem.after(t.placeholder),s.placeholder.update(t,t.placeholder)},_createTrPlaceholder:function(t,i){var s=this;t.children().each(function(){e("<td>&#160;</td>",s.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(t){var i,s,n,a,o,r,h,l,u,d,c=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(c&&e.contains(this.containers[i].element[0],c.element[0]))continue;c=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);if(c)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,a=null,u=c.floating||this._isFloating(this.currentItem),o=u?"left":"top",r=u?"width":"height",d=u?"clientX":"clientY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[o],l=!1,t[d]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(t[d]-h)&&(n=Math.abs(t[d]-h),a=this.items[s],this.direction=l?"up":"down"));if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.width():this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(e,t){function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||n.push(function(e){this._trigger("update",e,this._uiHash())}),this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash())}),n.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;n.length>s;s++)n[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){e.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}}),e.widget("ui.accordion",{version:"1.11.4",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),t.collapsible||t.active!==!1&&null!=t.active||(t.active=0),this._processPanels(),0>t.active&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e()}},_createIcons:function(){var t=this.options.icons;t&&(e("<span>").addClass("ui-accordion-header-icon ui-icon "+t.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(),this._destroyIcons(),e=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):("event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),"collapsible"!==e||t||this.options.active!==!1||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons()),"disabled"===e&&(this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),
this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!t)),void 0)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,n=this.headers.index(t.target),a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(e(t.target).attr("tabIndex",-1),e(a).attr("tabIndex",0),a.focus(),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().focus()},refresh:function(){var t=this.options;this._processPanels(),t.active===!1&&t.collapsible===!0||!this.headers.length?(t.active=!1,this.active=e()):t.active===!1?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"),this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(),t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))},_refresh:function(){var t,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),n=s.uniqueId().attr("id");t.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=n.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0))}),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){t=Math.max(t,e(this).css("height","").height())}).height(t))},_activate:function(t){var i=this._findActive(t)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?e():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?e():n,newPanel:r};t.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",t,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?e():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr({"aria-selected":"false","aria-expanded":"false"}),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(e(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(e,t,i){var s,n,a,o=this,r=0,h=e.css("box-sizing"),l=e.length&&(!t.length||e.index()<t.index()),u=this.options.animate||{},d=l&&u.down||u,c=function(){o._toggleComplete(i)};return"number"==typeof d&&(a=d),"string"==typeof d&&(n=d),n=n||d.easing||u.easing,a=a||d.duration||u.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:a,easing:n,step:function(e,t){t.now=Math.round(e)}}),e.hide().animate(this.showProps,{duration:a,easing:n,complete:c,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?"content-box"===h&&(r+=i.now):"content"!==o.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-r),r=0)}}),void 0):t.animate(this.hideProps,a,n,c):e.animate(this.showProps,a,n,c)},_toggleComplete:function(e){var t=e.oldPanel;t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}});var d,c="ui-button ui-widget ui-state-default ui-corner-all",p="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",f=function(){var t=e(this);setTimeout(function(){t.find(":ui-button").button("refresh")},1)},m=function(t){var i=t.name,s=t.form,n=e([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?e(s).find("[name='"+i+"'][type=radio]"):e("[name='"+i+"'][type=radio]",t.ownerDocument).filter(function(){return!this.form})),n};e.widget("ui.button",{version:"1.11.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,f),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var t=this,i=this.options,s="checkbox"===this.type||"radio"===this.type,n=s?"":"ui-state-active";null===i.label&&(i.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(c).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){i.disabled||this===d&&e(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){i.disabled||e(this).removeClass(n)}).bind("click"+this.eventNamespace,function(e){i.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),s&&this.element.bind("change"+this.eventNamespace,function(){t.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return i.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(i.disabled)return!1;e(this).addClass("ui-state-active"),t.buttonElement.attr("aria-pressed","true");var s=t.element[0];m(s).not(s).map(function(){return e(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return i.disabled?!1:(e(this).addClass("ui-state-active"),d=this,t.document.one("mouseup",function(){d=null}),void 0)}).bind("mouseup"+this.eventNamespace,function(){return i.disabled?!1:(e(this).removeClass("ui-state-active"),void 0)}).bind("keydown"+this.eventNamespace,function(t){return i.disabled?!1:((t.keyCode===e.ui.keyCode.SPACE||t.keyCode===e.ui.keyCode.ENTER)&&e(this).addClass("ui-state-active"),void 0)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){e(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(t){t.keyCode===e.ui.keyCode.SPACE&&e(this).click()})),this._setOption("disabled",i.disabled),this._resetButton()},_determineButtonType:function(){var e,t,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(e=this.element.parents().last(),t="label[for='"+this.element.attr("id")+"']",this.buttonElement=e.find(t),this.buttonElement.length||(e=e.length?e.siblings():this.element.siblings(),this.buttonElement=e.filter(t),this.buttonElement.length||(this.buttonElement=e.find(t))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(c+" ui-state-active "+p).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(e,t){return this._super(e,t),"disabled"===e?(this.widget().toggleClass("ui-state-disabled",!!t),this.element.prop("disabled",!!t),t&&("checkbox"===this.type||"radio"===this.type?this.buttonElement.removeClass("ui-state-focus"):this.buttonElement.removeClass("ui-state-focus ui-state-active")),void 0):(this._resetButton(),void 0)},refresh:function(){var t=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOption("disabled",t),"radio"===this.type?m(this.element[0]).each(function(){e(this).is(":checked")?e(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),void 0;var t=this.buttonElement.removeClass(p),i=e("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&t.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&t.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||t.attr("title",e.trim(i)))):a.push("ui-button-text-only"),t.addClass(a.join(" "))}}),e.widget("ui.buttonset",{version:"1.11.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(e,t){"disabled"===e&&this.buttons.button("option",e,t),this._super(e,t)},refresh:function(){var t="rtl"===this.element.css("direction"),i=this.element.find(this.options.items),s=i.filter(":ui-button");i.not(":ui-button").button(),s.button("refresh"),this.buttons=i.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(t?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return e(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}}),e.ui.button,e.extend(e.ui,{datepicker:{version:"1.11.4"}});var g;e.extend(n.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(e){return r(this._defaults,e||{}),this},_attachDatepicker:function(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a)},_newInst:function(t,i){var s=t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:t,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?a(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),i.settings.disabled&&this._disableDatepicker(t))},_attachments:function(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.unbind("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&t.focus(this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.click(function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;e.length>n;n++)e[n].length>i&&(i=e[n].length,s=n);return s},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length)}},_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(t),i.dpDiv.css("display","block"))},_dialogDatepicker:function(t,i,s,n,a){var o,h,l,u,d,c=this._dialogInst;return c||(this.uuid+=1,o="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+o+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),e("body").append(this._dialogInput),c=this._dialogInst=this._newInst(this._dialogInput,!1),c.settings={},e.data(this._dialogInput[0],"datepicker",c)),r(c.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(c,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,u=document.documentElement.scrollLeft||document.body.scrollLeft,d=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+u,l/2-150+d]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),c.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",c),this},_destroyDatepicker:function(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),g===n&&(g=null))},_enableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},_disableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),this._disabledInputs[this._disabledInputs.length]=t)},_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;this._disabledInputs.length>t;t++)if(this._disabledInputs[t]===e)return!0;return!1},_getInst:function(t){try{return e.data(t,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(t,i,s){var n,a,o,h,l=this._getInst(t);return 2===arguments.length&&"string"==typeof i?"defaults"===i?e.extend({},e.datepicker._defaults):l?"all"===i?e.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),a=this._getDateDatepicker(t,!0),o=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),r(l.settings,n),null!==o&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,o)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),l),this._autoSize(l),this._setDate(l,a),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},_doKeyDown:function(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;case 13:return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;case 27:e.datepicker._hideDatepicker();break;case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;default:o=!1}else 36===t.keyCode&&t.ctrlKey?e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},_doKeyPress:function(t){var i,s,n=e.datepicker._getInst(t.target);return e.datepicker._get(n,"constrainInput")?(i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var i,n,a,o,h,l,u;i=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==i&&(e.datepicker._curInst.dpDiv.stop(!0,!0),i&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(i,"beforeShow"),a=n?n.apply(t,[t,i]):{},a!==!1&&(r(i.settings,a),i.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(i),e.datepicker._inDialog&&(t.value=""),e.datepicker._pos||(e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),o=!1,e(t).parents().each(function(){return o|="fixed"===e(this).css("position"),!o}),h={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,i.dpDiv.empty(),i.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(i),h=e.datepicker._checkOffset(i,h,o),i.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":o?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),i.inline||(l=e.datepicker._get(i,"showAnim"),u=e.datepicker._get(i,"duration"),i.dpDiv.css("z-index",s(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[l]?i.dpDiv.show(l,e.datepicker._get(i,"showOptions"),u):i.dpDiv[l||"show"](l?u:null),e.datepicker._shouldFocusInput(i)&&i.input.focus(),e.datepicker._curInst=i))}},_updateDatepicker:function(t){this.maxRows=4,g=t,t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),n=s[1],a=17,r=t.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&t.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.focus(),t.yearshtml&&(i=t.yearshtml,setTimeout(function(){i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},_checkOffset:function(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:e(document).scrollTop());return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+a>l&&l>a?Math.abs(a+r):0),i},_findPos:function(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[n?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},_hideDatepicker:function(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o)},e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id!==e.datepicker._mainDivId&&0===i.parents("#"+e.datepicker._mainDivId).length&&!i.hasClass(e.datepicker.markerClassName)&&!i.closest("."+e.datepicker._triggerClass).length&&e.datepicker._datepickerShowing&&(!e.datepicker._inDialog||!e.blockUI)||i.hasClass(e.datepicker.markerClassName)&&e.datepicker._curInst!==s)&&e.datepicker._hideDatepicker()}},_adjustDate:function(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),s),this._updateDatepicker(a))},_gotoToday:function(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},_selectDay:function(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},_clearDate:function(t){var i=e(t);this._selectDate(i,"")},_selectDate:function(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.focus(),this._lastInput=null)},_updateAlternate:function(t){var i,s,n,a=this._get(t,"altField");a&&(i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).each(function(){e(this).val(n)}))},noWeekends:function(e){var t=e.getDay();return[t>0&&6>t,""]},iso8601Week:function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,a,o,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,u="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),d=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,c=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,y=-1,b=!1,_=function(e){var i=t.length>n+1&&t.charAt(n+1)===e;return i&&n++,i},x=function(e){var t=_(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=RegExp("^\\d{"+n+","+s+"}"),o=i.substring(h).match(a);if(!o)throw"Missing number at position "+h;return h+=o[0].length,parseInt(o[0],10)},w=function(t,s,n){var a=-1,o=e.map(_(t)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,t){var s=t[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(a=t[0],h+=s.length,!1):void 0}),-1!==a)return a+1;throw"Unknown name at position "+h},k=function(){if(i.charAt(h)!==t.charAt(n))throw"Unexpected literal at position "+h;h++};for(n=0;t.length>n;n++)if(b)"'"!==t.charAt(n)||_("'")?k():b=!1;else switch(t.charAt(n)){case"d":v=x("d");break;case"D":w("D",d,c);break;case"o":y=x("o");break;case"m":g=x("m");break;case"M":g=w("M",p,f);break;case"y":m=x("y");break;case"@":r=new Date(x("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"!":r=new Date((x("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"'":_("'")?k():b=!0;break;default:k()}if(i.length>h&&(o=i.substr(h),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===m?m=(new Date).getFullYear():100>m&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(u>=m?0:-100)),y>-1)for(g=1,v=y;;){if(a=this._getDaysInMonth(m,g-1),a>=v)break;g++,v-=a}if(r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(e,t,i){if(!t)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(t){var i=e.length>s+1&&e.charAt(s+1)===t;return i&&s++,i},l=function(e,t,i){var s=""+t;if(h(e))for(;i>s.length;)s="0"+s;return s},u=function(e,t,i,s){return h(e)?s[t]:i[t]},d="",c=!1;if(t)for(s=0;e.length>s;s++)if(c)"'"!==e.charAt(s)||h("'")?d+=e.charAt(s):c=!1;else switch(e.charAt(s)){case"d":d+=l("d",t.getDate(),2);break;case"D":d+=u("D",t.getDay(),n,a);break;case"o":
d+=l("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":d+=l("m",t.getMonth()+1,2);break;case"M":d+=u("M",t.getMonth(),o,r);break;case"y":d+=h("y")?t.getFullYear():(10>t.getYear()%100?"0":"")+t.getYear()%100;break;case"@":d+=t.getTime();break;case"!":d+=1e4*t.getTime()+this._ticksTo1970;break;case"'":h("'")?d+="'":c=!0;break;default:d+=e.charAt(s)}return d},_possibleChars:function(e){var t,i="",s=!1,n=function(i){var s=e.length>t+1&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;e.length>t;t++)if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n}catch(r){s=t?"":s}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e)}},_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},_determineDate:function(t,i,s){var n=function(e){var t=new Date;return t.setDate(t.getDate()+e),t},a=function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,a=n.getFullYear(),o=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":o+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o));break;case"y":case"Y":a+=parseInt(l[1],10),r=Math.min(r,e.datepicker._getDaysInMonth(a,o))}l=h.exec(i)}return new Date(a,o,r)},o=null==i||""===i?s:"string"==typeof i?a(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return o=o&&"Invalid Date"==""+o?s:o,o&&(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0)),this._daylightSavingAdjust(o)},_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},_setDate:function(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},_getDate:function(e){var t=!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return t},_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).bind(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},_generateHTML:function(e){var t,i,s,n,a,o,r,h,l,u,d,c,p,f,m,g,v,y,b,_,x,w,k,T,D,S,N,M,C,A,P,I,H,z,F,E,W,O,L,j=new Date,R=this._daylightSavingAdjust(new Date(j.getFullYear(),j.getMonth(),j.getDate())),Y=this._get(e,"isRTL"),J=this._get(e,"showButtonPanel"),B=this._get(e,"hideIfNoPrevNext"),K=this._get(e,"navigationAsDateFormat"),V=this._getNumberOfMonths(e),U=this._get(e,"showCurrentAtPos"),q=this._get(e,"stepMonths"),G=1!==V[0]||1!==V[1],X=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),Q=this._getMinMaxDate(e,"min"),$=this._getMinMaxDate(e,"max"),Z=e.drawMonth-U,et=e.drawYear;if(0>Z&&(Z+=12,et--),$)for(t=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-V[0]*V[1]+1,$.getDate())),t=Q&&Q>t?Q:t;this._daylightSavingAdjust(new Date(et,Z,1))>t;)Z--,0>Z&&(Z=11,et--);for(e.drawMonth=Z,e.drawYear=et,i=this._get(e,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(et,Z-q,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,et,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":B?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(et,Z+q,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,et,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":B?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?X:R,o=K?this.formatDate(o,r,this._getFormatConfig(e)):o,h=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",l=J?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(Y?"":h)+"</div>":"",u=parseInt(this._get(e,"firstDay"),10),u=isNaN(u)?0:u,d=this._get(e,"showWeek"),c=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),y=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),_="",w=0;V[0]>w;w++){for(k="",this.maxRows=4,T=0;V[1]>T;T++){if(D=this._daylightSavingAdjust(new Date(et,Z,e.selectedDay)),S=" ui-corner-all",N="",G){if(N+="<div class='ui-datepicker-group",V[1]>1)switch(T){case 0:N+=" ui-datepicker-group-first",S=" ui-corner-"+(Y?"right":"left");break;case V[1]-1:N+=" ui-datepicker-group-last",S=" ui-corner-"+(Y?"left":"right");break;default:N+=" ui-datepicker-group-middle",S=""}N+="'>"}for(N+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+S+"'>"+(/all|left/.test(S)&&0===w?Y?a:s:"")+(/all|right/.test(S)&&0===w?Y?s:a:"")+this._generateMonthYearHeader(e,Z,et,Q,$,w>0||T>0,f,m)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",M=d?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",x=0;7>x;x++)C=(x+u)%7,M+="<th scope='col'"+((x+u+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+c[C]+"'>"+p[C]+"</span></th>";for(N+=M+"</tr></thead><tbody>",A=this._getDaysInMonth(et,Z),et===e.selectedYear&&Z===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,A)),P=(this._getFirstDayOfMonth(et,Z)-u+7)%7,I=Math.ceil((P+A)/7),H=G?this.maxRows>I?this.maxRows:I:I,this.maxRows=H,z=this._daylightSavingAdjust(new Date(et,Z,1-P)),F=0;H>F;F++){for(N+="<tr>",E=d?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(z)+"</td>":"",x=0;7>x;x++)W=g?g.apply(e.input?e.input[0]:null,[z]):[!0,""],O=z.getMonth()!==Z,L=O&&!y||!W[0]||Q&&Q>z||$&&z>$,E+="<td class='"+((x+u+6)%7>=5?" ui-datepicker-week-end":"")+(O?" ui-datepicker-other-month":"")+(z.getTime()===D.getTime()&&Z===e.selectedMonth&&e._keyEvent||b.getTime()===z.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(O&&!v?"":" "+W[1]+(z.getTime()===X.getTime()?" "+this._currentClass:"")+(z.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(O&&!v||!W[2]?"":" title='"+W[2].replace(/'/g,"&#39;")+"'")+(L?"":" data-handler='selectDay' data-event='click' data-month='"+z.getMonth()+"' data-year='"+z.getFullYear()+"'")+">"+(O&&!v?"&#xa0;":L?"<span class='ui-state-default'>"+z.getDate()+"</span>":"<a class='ui-state-default"+(z.getTime()===R.getTime()?" ui-state-highlight":"")+(z.getTime()===X.getTime()?" ui-state-active":"")+(O?" ui-priority-secondary":"")+"' href='#'>"+z.getDate()+"</a>")+"</td>",z.setDate(z.getDate()+1),z=this._daylightSavingAdjust(z);N+=E+"</tr>"}Z++,Z>11&&(Z=0,et++),N+="</tbody></table>"+(G?"</div>"+(V[0]>0&&T===V[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),k+=N}_+=k}return _+=l,e._keyEvent=!1,_},_generateMonthYearHeader:function(e,t,i,s,n,a,o,r){var h,l,u,d,c,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),y=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",_="";if(a||!g)_+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,_+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",u=0;12>u;u++)(!h||u>=s.getMonth())&&(!l||n.getMonth()>=u)&&(_+="<option value='"+u+"'"+(u===t?" selected='selected'":"")+">"+r[u]+"</option>");_+="</select>"}if(y||(b+=_+(!a&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",a||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(d=this._get(e,"yearRange").split(":"),c=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?c+parseInt(e,10):parseInt(e,10);return isNaN(t)?c:t},f=p(d[0]),m=Math.max(f,p(d[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";m>=f;f++)e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}return b+=this._get(e,"yearSuffix"),y&&(b+=(!a&&g&&v?"":"&#xa0;")+_),b+="</div>"},_adjustInstDate:function(e,t,i){var s=e.drawYear+("Y"===i?t:0),n=e.drawMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(e)},_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&i>t?i:t;return s&&n>s?s:n},_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},_canAdjustMonth:function(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(0>t?t:n[0]*n[1]),1));return 0>t&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a)},_isInRange:function(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,h=this._get(e,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||t.getTime()>=n.getTime())&&(!a||t.getTime()<=a.getTime())&&(!o||t.getFullYear()>=o)&&(!r||r>=t.getFullYear())},_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e))}}),e.fn.datepicker=function(t){if(!this.length)return this;e.datepicker.initialized||(e(document).mousedown(e.datepicker._checkExternalClick),e.datepicker.initialized=!0),0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new n,e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.11.4",e.datepicker,e.widget("ui.dialog",{version:"1.11.4",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"Close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var i=e(this).css(t).offset().top;0>i&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i,s=this;if(this._isOpen&&this._trigger("beforeClose",t)!==!1){if(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),!this.opener.filter(":focusable").focus().length)try{i=this.document[0].activeElement,i&&"body"!==i.nodeName.toLowerCase()&&e(i).blur()}catch(n){}this._hide(this.uiDialog,this.options.hide,function(){s._trigger("close",t)})}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+e(this).css("z-index")}).get(),a=Math.max.apply(null,n);return a>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",a+1),s=!0),s&&!i&&this._trigger("focus",t),s},open:function(){var t=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=e(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var e=this._focusedElement;e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).focus()},_keepFocus:function(t){function i(){var t=this.document[0].activeElement,i=this.uiDialog[0]===t||e.contains(this.uiDialog[0],t);i||this._focusTabbable()}t.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),this.close(t),void 0;if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");t.target!==n[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){n.focus()}),t.preventDefault()):(this._delay(function(){s.focus()}),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(t){e(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(t),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title||e.html("&#160;"),e.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),void 0):(e.each(i,function(i,s){var n,a;s=e.isFunction(s)?{click:s,text:i}:s,s=e.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(t.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,e("<button></button>",s).button(a).appendTo(t.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){e(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(n))},drag:function(e,s){i._trigger("drag",e,t(s))},stop:function(n,a){var o=a.offset.left-i.document.scrollLeft(),r=a.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" "+"top"+(r>=0?"+":"")+r,of:i.window},e(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,t(a))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){e(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(n))},resize:function(e,s){i._trigger("resize",e,t(s))},stop:function(n,a){var o=i.uiDialog.offset(),r=o.left-i.document.scrollLeft(),h=o.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},e(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,t(a))}}).css("position",a)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=e(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1)},_trackingInstances:function(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,n={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(n[e]=t)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,t){var i,s,n=this.uiDialog;"dialogClass"===e&&n.removeClass(this.options.dialogClass).addClass(t),"disabled"!==e&&(this._super(e,t),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:""+t}),"draggable"===e&&(i=n.is(":data(ui-draggable)"),i&&!t&&n.draggable("destroy"),!i&&t&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(s=n.is(":data(ui-resizable)"),s&&!t&&n.resizable("destroy"),s&&"string"==typeof t&&n.resizable("option","handles",t),s||t===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var e,t,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return e(t.target).closest(".ui-dialog").length?!0:!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=!0;this._delay(function(){t=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):this.document.unbind("focusin").removeData("ui-dialog-overlays"),this.overlay.remove(),this.overlay=null}}}),e.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&e(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){if(!this.previousFilter){var i=e(t.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(t,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(t.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(e):this.select(e))},refresh:function(){var t,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.parent(),s=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),t=a.add(this.element),i=t.find(this.options.items),i.not(".ui-menu-item").each(function(){var t=e(this);s._isDivider(t)&&t.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){"icons"===e&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!t).attr("aria-disabled",t),this._super(e,t)},focus:function(e,t){var i,s;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active}))},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),
t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this.activeMenu=s},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),0>i.offset().top-s-n}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(t),void 0)},previousPage:function(t){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first())),void 0):(this.next(t),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).text()))})}}),e.widget("ui.tabs",{version:"1.11.4",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var e=/#.*$/;return function(t){var i,s;t=t.cloneNode(!1),i=t.href.replace(e,""),s=location.href.replace(e,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return t.hash.length>1&&i===s}}(),_create:function(){var t=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible),this._processTabs(),i.active=this._initialActive(),e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===t&&(s&&this.tabs.each(function(i,n){return e(n).attr("aria-controls")===s?(t=i,!1):void 0}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===t||-1===t)&&(t=this.tabs.length?0:!1)),t!==!1&&(t=this.tabs.index(this.tabs.eq(t)),-1===t&&(t=i?!1:0)),!i&&t===!1&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var i=e(this.document[0].activeElement).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:return t.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case e.ui.keyCode.ENTER:return t.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),t.ctrlKey||t.metaKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.focus())},_handlePageNav:function(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,i){function s(){return t>n&&(t=0),0>t&&(t=n),t}for(var n=this.tabs.length-1;-1!==e.inArray(s(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).focus(),e},_setOption:function(e,t){return"active"===e?(this._activate(t),void 0):"disabled"===e?(this._setupDisabled(t),void 0):(this._super(e,t),"collapsible"===e&&(this.element.toggleClass("ui-tabs-collapsible",t),t||this.options.active!==!1||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t),void 0)},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),t.active!==!1&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist").delegate("> li","mousedown"+this.eventNamespace,function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=e(),this.anchors.each(function(i,s){var n,a,o,r=e(s).uniqueId().attr("id"),h=e(s).closest("li"),l=h.attr("aria-controls");t._isLocal(s)?(n=s.hash,o=n.substring(1),a=t.element.find(t._sanitizeSelector(n))):(o=h.attr("aria-controls")||e({}).uniqueId()[0].id,n="#"+o,a=t.element.find(n),a.length||(a=t._createPanel(o),a.insertAfter(t.panels[i-1]||t.tablist)),a.attr("aria-live","polite")),a.length&&(t.panels=t.panels.add(a)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":o,"aria-labelledby":r}),a.attr("aria-labelledby",r)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol,ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(t){e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1);for(var i,s=0;i=this.tabs[s];s++)t===!0||-1!==e.inArray(s,t)?e(i).addClass("ui-state-disabled").attr("aria-disabled","true"):e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=t},_setupEvents:function(t){var i={};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(e){e.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,h=r?e():this._getPanelForTab(a),l=s.length?this._getPanelForTab(s):e(),u={oldTab:s,oldPanel:l,newTab:r?e():a,newPanel:h};t.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||o&&!i.collapsible||this._trigger("beforeActivate",t,u)===!1||(i.active=r?!1:this.tabs.index(a),this.active=o?e():a,this.xhr&&this.xhr.abort(),l.length||h.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),t),this._toggle(t,u))},_toggle:function(t,i){function s(){a.running=!1,a._trigger("activate",t,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s())}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return t===!1?e():this.tabs.eq(t)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+e+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tablist.unbind(this.eventNamespace),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(t){var i=this.options.disabled;i!==!1&&(void 0===t?i=!1:(t=this._getIndex(t),i=e.isArray(i)?e.map(i,function(e){return e!==t?e:null}):e.map(this.tabs,function(e,i){return i!==t?i:null})),this._setupDisabled(i))},disable:function(t){var i=this.options.disabled;if(i!==!0){if(void 0===t)i=!0;else{if(t=this._getIndex(t),-1!==e.inArray(t,i))return;i=e.isArray(i)?e.merge([t],i).sort():[t]}this._setupDisabled(i)}},load:function(t,i){t=this._getIndex(t);var s=this,n=this.tabs.eq(t),a=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),r={tab:n,panel:o},h=function(e,t){"abort"===t&&s.panels.stop(!1,!0),n.removeClass("ui-tabs-loading"),o.removeAttr("aria-busy"),e===s.xhr&&delete s.xhr};this._isLocal(a[0])||(this.xhr=e.ajax(this._ajaxSettings(a,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(n.addClass("ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.done(function(e,t,n){setTimeout(function(){o.html(e),s._trigger("load",i,r),h(n,t)},1)}).fail(function(e,t){setTimeout(function(){h(e,t)},1)})))},_ajaxSettings:function(t,i,s){var n=this;return{url:t.attr("href"),beforeSend:function(t,a){return n._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:a},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})});
(function($){
$.fn.lightbox_me=function(options){
return this.each(function(){
var
opts=$.extend({},$.fn.lightbox_me.defaults,options),
$overlay=$(),
$self=$(this),
$iframe=$('<iframe id="foo" style="z-index: '+(opts.zIndex+1)+';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>');
if(opts.showOverlay){
var $currentOverlays=$(".js_lb_overlay:visible");
if($currentOverlays.length>0){
$overlay=$('<div class="lb_overlay_clear js_lb_overlay"/>')}else
{
$overlay=$('<div class="'+opts.classPrefix+'_overlay js_lb_overlay"/>')}}
$("body").append($self.hide()).append($overlay);
if(opts.showOverlay){
setOverlayHeight();
$overlay.css({position:"absolute",width:"100%",top:0,left:0,right:0,bottom:0,zIndex:opts.zIndex+2,display:"none"});
if(!$overlay.hasClass("lb_overlay_clear")){
$overlay.css(opts.overlayCSS)}}
if(opts.showOverlay){
$overlay.fadeIn(opts.overlaySpeed,function(){
setSelfPosition();
$self[opts.appearEffect](opts.lightboxSpeed,function(){setOverlayHeight();setSelfPosition();opts.onLoad()})})}else
{
setSelfPosition();
$self[opts.appearEffect](opts.lightboxSpeed,function(){opts.onLoad()})}
if(opts.parentLightbox){
opts.parentLightbox.fadeOut(200)}
$(window).resize(function(){if(!UiO.responsiveDialog)setOverlayHeight()}).resize(
function(){if(!UiO.responsiveDialog)setSelfPosition()}).scroll(
function(){if(!UiO.responsiveDialog)setSelfPosition()});
$(window).bind("keyup.lightbox_me",observeKeyPress);
if(opts.closeClick){
$overlay.click(function(e){closeLightbox();e.preventDefault})}
$self.delegate(opts.closeSelector,"click",function(e){
closeLightbox();e.preventDefault()});
$self.bind("close",closeLightbox);
$self.bind("reposition",setSelfPosition);
function closeLightbox(){
var s=$self[0].style;
if(opts.destroyOnClose){
$self.add($overlay).remove()}else
{
$self.add($overlay).hide()}
if(opts.parentLightbox){
opts.parentLightbox.fadeIn(200)}
if(opts.preventScroll){
$("body").css("overflow","")}
$iframe.remove();
$self.undelegate(opts.closeSelector,"click");
$self.unbind("close",closeLightbox);
$self.unbind("repositon",setSelfPosition);
$(window).unbind("resize",setOverlayHeight);
$(window).unbind("resize",setSelfPosition);
$(window).unbind("scroll",setSelfPosition);
$(window).unbind("keyup.lightbox_me");
opts.onClose()}
function observeKeyPress(e){
if((e.keyCode==27||e.DOM_VK_ESCAPE==27&&e.which==0)&&opts.closeEsc)closeLightbox()}
function setOverlayHeight(){
if($(window).height()<$(document).height()){
$overlay.css({height:$(document).height()+"px"});
$iframe.css({height:$(document).height()+"px"})}else
{
$overlay.css({height:"100%"})}}
function setSelfPosition(){
var s=$self[0].style;
$self.css({left:"50%",marginLeft:$self.outerWidth()/2*-1,zIndex:opts.zIndex+3});
$self.css("height","");
if($self.height()+80>=$(window).height()&&$self.css("position")!="absolute"){
var topOffset=$(document).scrollTop()+40;
$self.css({position:"absolute",top:topOffset+"px",marginTop:0})}else
if($self.height()+80<$(window).height()){
if(opts.centered){
$self.css({position:"fixed",top:"50%",marginTop:$self.outerHeight()/2*-1})}else
{
$self.css({position:"fixed"}).css(opts.modalCSS)}
if(opts.preventScroll){
$("body").css("overflow","hidden")}}}})};
$.fn.lightbox_me.defaults={
appearEffect:"fadeIn",
appearEase:"",
overlaySpeed:250,
lightboxSpeed:300,
closeSelector:".close",
closeClick:true,
closeEsc:true,
destroyOnClose:false,
showOverlay:true,
parentLightbox:false,
preventScroll:false,
onLoad:function(){},
onClose:function(){},
classPrefix:"lb",
zIndex:999,
centered:false,
modalCSS:{top:"40px"},
overlayCSS:{background:"black",opacity:.4}}})(
jQuery);
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date-d,n=arguments;function l(){d=+new Date;j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return x("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.csstransforms=function(){return!!H("transform")},r.csstransforms3d=function(){var a=!!H("perspective");return a&&"webkitPerspective"in g.style&&x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},r.csstransitions=function(){return H("transition")},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect};for(var I in r)A(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.mq=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,e.prefixed=function(a,b,c){return b?H(a,b,c):H(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
window.matchMedia||(window.matchMedia=function(){
"use strict";
var styleMedia=window.styleMedia||window.media;
if(!styleMedia){
var style=document.createElement("style"),
script=document.getElementsByTagName("script")[0],
info=null;
style.type="text/css";
style.id="matchmediajs-test";
script.parentNode.insertBefore(style,script);
info="getComputedStyle"in window&&window.getComputedStyle(style,null)||style.currentStyle;
styleMedia={
matchMedium:function(media){
var text="@media "+media+"{ #matchmediajs-test { width: 1px; } }";
if(style.styleSheet){
style.styleSheet.cssText=text}else
{
style.textContent=text}
return info.width==="1px"}}}
return function(media){
return{
matches:styleMedia.matchMedium(media||"all"),
media:media||"all"}}}());
(function(){
if(window.matchMedia&&window.matchMedia("all").addListener){
return false}
var localMatchMedia=window.matchMedia,
hasMediaQueries=localMatchMedia("only all").matches,
isListening=false,
timeoutID=0,
queries=[],
handleChange=function(evt){
clearTimeout(timeoutID);
timeoutID=setTimeout(function(){
for(var i=0,il=queries.length;i<il;i++){
var mql=queries[i].mql,
listeners=queries[i].listeners||[],
matches=localMatchMedia(mql.media).matches;
if(matches!==mql.matches){
mql.matches=matches;
for(var j=0,jl=listeners.length;j<jl;j++){
listeners[j].call(window,mql)}}}},
30)};
window.matchMedia=function(media){
var mql=localMatchMedia(media),
listeners=[],
index=0;
mql.addListener=function(listener){
if(!hasMediaQueries){
return}
if(!isListening){
isListening=true;
window.addEventListener("resize",handleChange,true)}
if(index===0){
index=queries.push({
mql:mql,
listeners:listeners})}
listeners.push(listener)};
mql.removeListener=function(listener){
for(var i=0,il=listeners.length;i<il;i++){
if(listeners[i]===listener){
listeners.splice(i,1)}}};
return mql}})();
!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});
(function(){
"use strict";
var UiOProfileARIA={
tabableElements:"a, button, input, textarea, select",
popup:{
open:function(link,popup,visible){
link.attr("aria-expanded","true");
if(typeof visible==="boolean"&&visible){
popup.attr("aria-hidden","false");
UiOProfileARIA.removeUntabable(popup)}},
close:function(link,popup,visible){
link.attr("aria-expanded","false");
if(typeof visible==="boolean"&&visible){
popup.attr("aria-hidden","true");
UiOProfileARIA.setUntabable(popup)}},
init:function(link,popup,linkAutoId,popupAutoId,visible){
var linkId=UiOProfileARIA.getSetMissingId(link,linkAutoId);
var popupId=UiOProfileARIA.getSetMissingId(popup,popupAutoId);
link.attr({"aria-controls":popupId,
"aria-haspopup":"true",
"aria-expanded":"false"});
popup.attr({"aria-labelledby":linkId});
if(typeof visible==="boolean"&&visible){
popup.attr("aria-hidden","true");
UiOProfileARIA.setUntabable(popup)}}},
setUntabable:function(wrpElm){
wrpElm.find(this.tabableElements).attr("tabindex","-1")},
removeUntabable:function(wrpElm){
wrpElm.find(this.tabableElements).each(function(){
var elm=$(this);
if(elm.attr("tabindex")==="-1"){
elm.removeAttr("tabindex")}})},
getSetMissingId:function(elm,id){
if(!elm[0].id||elm[0].id===""){
elm.attr("id",id);
return id}else
{
return elm[0].id}}};
window.UiOProfileARIA=UiOProfileARIA})();
(function(){
"use strict";
var UiOProfileAccordions={
counts:{},
activateScrollDisabled:false,
init:function(selector,tags,extraTagsEndAccordion,useAutoScroll){
var allTags=tags.join(", ");
var accordionAllHeaders=$(selector).find(allTags).filter(".accordion");
for(var i=0,len=tags.length;i<len;i++){
var tag=tags[i];
var tagsEndAccordion=tag==="h2"?"h2":tag==="h3"?"h2, h3":allTags;
var accordionHeaders=accordionAllHeaders.filter(tag);
var len2=accordionHeaders.length;
if(!len2)continue;
for(var j=0;j<len2;j++){
var accordionHeader=$(accordionHeaders[j]);
var tagsCheck=tagsEndAccordion+(typeof extraTagsEndAccordion==="object"?", "+extraTagsEndAccordion.join(", "):"");
if(accordionHeader.next().is(tagsCheck)){
$("<p>&nbsp;</p>").insertAfter(accordionHeader)}
accordionHeader.nextUntil(tagsCheck).wrapAll(
"<div class='accordion-content' />")}
var count=this.counts[tag]||0;
count++;
this.createNextAccordion(tag,selector,count,tagsEndAccordion,extraTagsEndAccordion,useAutoScroll);
this.counts[tag]=count}
if(useAutoScroll){
this.openByHash(tags);
$(window).on("hashchange",function(){
UiOProfileAccordions.openByHash(tags)})}},
createNextAccordion:function(tag,selector,count,tagsEndAccordion,extraTagsEndAccordion,useAutoScroll){
var accordionHeaders=$(selector).find(tag+".accordion").filter(":not(.accordion-processed)");
var len=accordionHeaders.length;
if(len){
var unique="-"+tag+"-"+count;
var isAccordionLinks=false;
if($(accordionHeaders[0]).hasClass("accordion-links")){
isAccordionLinks=true}
$(accordionHeaders[0]).nextUntil(tagsEndAccordion+":not(.accordion)"+(typeof extraTagExcept==="object"?", "+extraTagsEndAccordion.join(", "):"")).andSelf().addClass(
"accordion-processed").wrapAll(
"<div class='accordion-wrapper' id='accordion-wrapper"+unique+"' />");
var accordionElm=$("#accordion-wrapper"+unique);
this.newAccordion(accordionElm,"> .accordion",isAccordionLinks,useAutoScroll);
count++;
this.createNextAccordion(tag,selector,count,tagsEndAccordion,extraTagsEndAccordion,useAutoScroll)}else
{
return count}},
newAccordion:function(accordionElm,headerSelector,isAccordionLinks,useAutoScroll){
var opts={
header:headerSelector,
heightStyle:"content",
collapsible:true,
active:false};
if(isAccordionLinks){
opts.beforeActivate=function(e,ui){
e.stopPropagation();
var clickedElm=$(e.toElement||e.originalEvent.target);
if(!clickedElm.hasClass("ui-accordion-header-icon")){
if(clickedElm.hasClass("ui-accordion-header")){
var link=clickedElm.find("a");
if(link.length){
location.href=link.attr("href")}}else
{
location.href=clickedElm.attr("href")}
return false}}}
accordionElm.accordion(opts);
if(useAutoScroll){
accordionElm.on("accordionactivate",function(e,ui){
var newHeaderElem=$(ui.newHeader);
if(newHeaderElem.offset()!=null&&!UiOProfileAccordions.activateScrollDisabled){
var winTop=$(window).scrollTop();
var winBottom=winTop+$(window).height();
var elmTop=newHeaderElem.offset().top-20;
if(elmTop<winTop||elmTop>winBottom){
$("html, body").animate({scrollTop:elmTop},200)}}})}},
remove:function(selector){
var accordionElm=$(selector);
accordionElm.accordion("destroy");
accordionElm.find(".accordion").removeClass("accordion accordion-links accordion-processed");
accordionElm.find(".accordion-content > *").unwrap();
accordionElm.find("> *").unwrap()},
openByHash:function(tags){
var hash=location.hash;
if(!hash.length)return;
var fixedId=this.fixHash(hash.split("#")[1]);
var anchorElm=$("[name='"+fixedId+"'], [id='"+fixedId+"']");
if(!anchorElm.length)return;
this.activateScrollDisabled=true;
var layers=0;
var accordionHeaderLastElm=null;
for(var i=0,len=tags.length;i<len;i++){
var tag=tags[i];
var accordionHeaderElm=anchorElm.closest(tag);
if(!accordionHeaderElm.length){
accordionHeaderElm=anchorElm.closest(".accordion-content");
if(accordionHeaderElm.length){
accordionHeaderElm=accordionHeaderElm.prev(tag)}}
if(!accordionHeaderElm.length)continue;
accordionHeaderLastElm=accordionHeaderElm;
layers++;
var accordionElm=accordionHeaderElm.closest(".accordion-wrapper");
accordionElm.accordion("option","active",accordionHeaderElm.parent().find("> "+tag).index(accordionHeaderElm[0]))}
if(!layers){
this.activateScrollDisabled=false;
return}
var waitAnimComplete=setTimeout(function(){
if($("html, body").queue("fx").length){
setTimeout(waitAnimComplete,25)}else
{
setTimeout(function(){
UiOProfileAccordions.activateScrollDisabled=false;
$("html, body").finish().animate({scrollTop:anchorElm.offset().top-20},100)},
220)}},
220*layers)},
fixHash:function(hash){
try{
var hash=decodeURIComponent(hash)}
catch(err){
var hash=unescape(hash)}
return hash}};
window.UiOProfileAccordions=UiOProfileAccordions})();
(function(){
"use strict";
function UiOProfileResponsive(){
this.supportsResponsive=function(){
var ua=navigator.userAgent;
var re=/MSIE ([0-9]+[\.0-9]*)/.exec(ua);
if(re){
var rv=parseFloat(re[1]);
if(rv<9){
return false}}
return true}();
this.isResponsive=typeof enquire!=="undefined"&&this.supportsResponsive;
this.responsivePortraitBreakpoint="16cm";
this.responsiveLandscapeBreakpoint="19cm";
this.responsiveMax="screen and (max-width: "+this.responsivePortraitBreakpoint+") and (orientation : portrait)"+
", screen and (max-width: "+this.responsiveLandscapeBreakpoint+") and (orientation : landscape)";
this.responsiveMin="screen and (min-width: "+this.responsivePortraitBreakpoint+") and (orientation : portrait)"+
", screen and (min-width: "+this.responsiveLandscapeBreakpoint+") and (orientation : landscape)";
this.desktopListen=function(opts){
this.setupListener(this.responsiveMin,opts)};
this.responsiveListen=function(opts){
this.setupListener(this.responsiveMax,opts)};
this.setupListener=function(query,opts){
if(!this.isResponsive)return;
opts.deferSetup=typeof opts.deferSetup!=="undefined"?opts.deferSetup:true;
enquire.register(query,opts)}}
window.UiOProfileResponsive=new UiOProfileResponsive;
if(window.UiOProfileResponsive.isResponsive){
var ua=navigator.userAgent;
if(/iPad/i.test(ua)&&/OS 5/i.test(ua)){
var viewportmeta=document.querySelector('meta[name="viewport"]');
if(viewportmeta){
viewportmeta.content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0";
document.body.addEventListener("gesturestart",function(){
viewportmeta.content="width=device-width, minimum-scale=0.25, maximum-scale=1.6"},
false)}}}})();
(function(){
var UiOProfileResponsiveMenu={
_init:false,
doc:null,
toggle:{
"toggle-navigation":{open:false},
"toggle-search":{open:false}},
close:{
rewired:"toggle-navigation"},
eventHandlers:{}};
UiOProfileResponsiveMenu.init=function(){
if(this._init)return;
var m=this;
$("#uiodoc").unwrap();
$("#uiodoc-wrapper").unwrap();
$("#inner-inner-wrapper").unwrap();
$("#inner-outer-wrapper").unwrap();
$(".menu-search, #main, .vrtx-comments, #bottomnav, #footer-wrapper, body > .grid-container").wrapAll("<div id='inner-content-outer-wrapper'><div id='inner-content-wrapper'></div></div>");
$("body > *").wrapAll("<div id='offcanvas-outer-wrapper'><div id='offcanvas-wrapper'></div></div>");
$(".menu-search").attr("id","search");
$(".toggle-navigation").attr("id","toggle-navigation");
$(".toggle-search").attr("id","toggle-search");
m.doc=$("html");
m.toggle["toggle-navigation"].node=$("#toggle-navigation");
m.toggle["toggle-navigation"].movedNode=$("#offcanvas-wrapper");
m.toggle["toggle-navigation"].contentNode=$("#nav-offcanvas");
m.toggle["toggle-search"].node=$("#toggle-search");
m.toggle["toggle-search"].movedNode=$("#inner-content-wrapper");
m.toggle["toggle-search"].contentNode=$("#search");
m.close.node=$("#close-nav");
UiOProfileARIA.popup.init(m.toggle["toggle-navigation"].node,m.toggle["toggle-navigation"].contentNode,"","",true);
UiOProfileARIA.popup.init(m.toggle["toggle-search"].node,m.toggle["toggle-search"].contentNode,"","",true);
m.closeNav=function(id,completeOp){
if(id.target)id=m.close.rewired;
if(typeof completeOp==="undefined")completeOp=$.noop;
m.doc.removeClass(id);
var node=m.toggle[id].movedNode[0];
var duration=animationEvents.transitionEnd&&animationEvents.transitionProp?parseFloat(window.getComputedStyle(node,"")[animationEvents.transitionProp+"Duration"]):0;
var closeComplete=function(){
UiOProfileARIA.popup.close(m.toggle[id].node,m.toggle[id].contentNode,true);
m.toggle[id].open=false;
if(id==="toggle-navigation"){
m.removeDocumentCloseNav()}
completeOp();
m.toggle[id].node.focus()};
if(duration>0){
document.addEventListener(animationEvents.transitionEnd,function(){
document.removeEventListener(animationEvents.transitionEnd,arguments.callee);
closeComplete()},
false)}else
{
closeComplete()}
m.toggle[id].node.parent().removeClass("active")};
m.openNav=function(id){
m.doc.addClass(id);
if(id==="toggle-navigation"){
m.addDocumentCloseNav()}
var node=m.toggle[id].movedNode[0];
var duration=animationEvents.transitionEnd&&animationEvents.transitionProp?parseFloat(window.getComputedStyle(node,"")[animationEvents.transitionProp+"Duration"]):0;
var openComplete=function(){
UiOProfileARIA.popup.open(m.toggle[id].node,m.toggle[id].contentNode,true);
m.toggle[id].open=true;
m.toggle[id].contentNode.find("input, a").filter(":visible:first").focus()};
if(duration>0){
document.addEventListener(animationEvents.transitionEnd,function(){
document.removeEventListener(animationEvents.transitionEnd,arguments.callee);
openComplete()})}else
{
openComplete()}
m.toggle[id].node.parent().addClass("active")};
m.toggleNav=function(e){
var thisId=e.target.id;
if(!thisId)thisId=$(e.target).parent()[0].id;
if(m.toggle[thisId].open){
m.closeNav(thisId)}else
{
var other=false;
for(var id in m.toggle){
if(id!==thisId&&m.toggle[id].open){
m.closeNav(id,function(){
m.openNav(thisId)});
other=true}}
if(!other){
m.openNav(thisId)}}};
m.eventHandlers.toggleNav=new SpeedTouchClick({node:m.toggle["toggle-navigation"].node,cbFn:m.toggleNav}).create();
m.eventHandlers.toggleSearch=new SpeedTouchClick({node:m.toggle["toggle-search"].node,cbFn:m.toggleNav}).create();
m.eventHandlers.closeNav=new SpeedTouchClick({node:m.close.node,cbFn:m.closeNav}).create();
m.addDocumentCloseNav=function(){
m.eventHandlers.documentCloseNav=new SpeedTouchClick({
node:$(document),
cbFn:m.closeNav,
proceedCondition:function(e){
return m.toggle["toggle-navigation"].open&&
$(e.target).closest("#nav-offcanvas").length==0&&
$(e.target).closest(".menu").length==0}});
m.eventHandlers.documentCloseNav.create()};
m.removeDocumentCloseNav=function(){
if(m.eventHandlers.documentCloseNav){
m.eventHandlers.documentCloseNav.destroy();
delete m.eventHandlers.documentCloseNav}};
m._init=true;
m.doc.addClass("js-ready")};
var transitionProp=window.Modernizr.prefixed("transition");
var animationEvents={
transitionProp:transitionProp,
transitionEnd:function(){
var props={
"WebkitTransition":"webkitTransitionEnd",
"MozTransition":"transitionend",
"OTransition":"oTransitionEnd otransitionend",
"msTransition":"MSTransitionEnd",
"transition":"transitionend"};
return props.hasOwnProperty(transitionProp)?props[transitionProp]:false}()};
Modernizr.testStyles("#modernizr { -webkit-overflow-scrolling:touch }",function(elem,rule){
Modernizr.addTest("overflowtouch",
window.getComputedStyle&&window.getComputedStyle(elem).getPropertyValue("-webkit-overflow-scrolling")=="touch")});
Modernizr.addTest("overflowscrolling",function(){
return Modernizr.testAllProps("overflowScrolling")});
window.UiOProfileResponsiveMenu=UiOProfileResponsiveMenu})();
(function(){
var isPreventingClick=false;
var SpeedTouchClick=function(opts){
var self=this;
self.node=opts.node[0];
self.jQNode=opts.node;
self.cbFn=opts.cbFn;
self.activeTouchClass="active-touch";
self.proceedCondition=opts.proceedCondition?opts.proceedCondition:function(e){
return true};
self.ghostClickPreventDelay=/Android/.test(navigator.userAgent)?500:1;
self.ghostBusterEndTimerNormal=null;
self.ghostBusterEndTimerFallback=null;
self.ghostBusterRemoveTapHighlightClass="remove-tap-highlight";
self.rootDOM=$("html");
self.hasLogEnabled=false;
self.preventDefault=function(e){
if(e.preventDefault){
e.preventDefault();
e.stopPropagation()}else
{
e.returnValue=false}};
self.click=function(e){
if(self.proceedCondition(e)||isPreventingClick){
self.preventDefault(e)}else
{
self.log("Click "+self.node.nodeName)}};
self.mousedown=function(e){
e=e||window.event;
if(!(e.which===3||e.button===2)&&self.proceedCondition(e)){
self.preventDefault(e);
self.cbFn(e);
self.log("MouseDown "+self.node.nodeName)}else
{
if(isPreventingClick){
self.preventDefault(e)}else
{
self.log("MouseDown "+self.node.nodeName)}}};
self.keydown=function(e){
e=e||window.event;
if((e.which&&e.which===13||e.keyCode&&e.keyCode===13)&&self.proceedCondition(e)){
self.cbFn(e);
self.log("KeyDown "+self.node.nodeName)}};
self.touchstart=function(e){
if(self.proceedCondition(e)&&!isPreventingClick){
self.log("TouchStart "+self.node.nodeName);
self.ghostBusterStart();
self.preventDefault(e);
self.cbFn(e)}};
self.touchend=function(e){
if(self.proceedCondition(e)){
self.log("TouchEnd "+self.node.nodeName);
self.ghostBusterEndTimerNormal=setTimeout(self.ghostBusterEnd,self.ghostClickPreventDelay)}};
self.ghostBusterStart=function(){
self.log("GhostBuster start "+self.node.nodeName);
isPreventingClick=true;
if(!self.jQNode.hasClass(self.activeTouchClass)){
self.jQNode.addClass(self.activeTouchClass)}
if(!self.rootDOM.hasClass(self.ghostBusterRemoveTapHighlightClass)){
self.rootDOM.addClass(self.ghostBusterRemoveTapHighlightClass)}
self.ghostBusterEndTimerFallback=setTimeout(self.ghostBusterEnd,self.ghostClickPreventDelay*1.5);
document.addEventListener("click",self.preventDefault,true);
document.addEventListener("mousedown",self.preventDefault,true)};
self.ghostBusterEnd=function(e){
self.log("GhostBuster end "+self.node.nodeName);
if(self.jQNode.hasClass(self.activeTouchClass)){
self.jQNode.removeClass(self.activeTouchClass)}
if(self.rootDOM.hasClass(self.ghostBusterRemoveTapHighlightClass)){
self.rootDOM.removeClass(self.ghostBusterRemoveTapHighlightClass)}
if(self.ghostBusterEndTimerNormal!=null){
clearTimeout(self.ghostBusterEndTimerNormal)}
if(self.ghostBusterEndTimerFallback!=null){
clearTimeout(self.ghostBusterEndTimerFallback)}
document.removeEventListener("click",self.preventDefault,true);
document.removeEventListener("mousedown",self.preventDefault,true);
isPreventingClick=false};
self.create=function(){
if(typeof Modernizr!=="undefined"&&Modernizr.touch){
this.node.addEventListener("touchstart",this.touchstart,false);
this.node.addEventListener("touchend",this.touchend,false)}
this.node.addEventListener("mousedown",this.mousedown,false);
this.node.addEventListener("click",this.click,false);
this.node.addEventListener("keydown",this.keydown,false)};
self.destroy=function(){
if(typeof Modernizr!=="undefined"&&Modernizr.touch){
this.node.removeEventListener("touchstart",this.touchstart,false);
this.node.removeEventListener("touchend",this.touchend,false)}
this.node.removeEventListener("mousedown",this.mousedown,false);
this.node.removeEventListener("click",this.click,false);
this.node.removeEventListener("keydown",this.keydown,false)};
self.log=function(msg){
if(self.hasLogEnabled){}}};
window.SpeedTouchClick=SpeedTouchClick})();
var cookieUtils={
create:function(name,value,days,domain,forceSecure){
var expires="";
if(days){
var date=new Date;
date.setTime(date.getTime()+days*24*60*60*1e3);
expires="; expires="+date.toGMTString()}else
{
expires=""}
if(domain){
expires=expires+";domain="+domain}
document.cookie=name+"="+value+expires+"; path=/"+(typeof forceSecure==="boolean"&&forceSecure||location.protocol==="https:"?";secure":"")},
createExact:function(name,value,day,month,year,domain){
var expires="";
if(day&&month&&year){
var date=new Date(year,month-1,day);
expires="; expires="+date.toString()}else
{
expires=""}
if(domain){
expires=expires+";domain="+domain}
document.cookie=name+"="+value+expires+"; path=/"},
createSeconds:function(name,value,seconds,domain){
var expires="";
if(seconds){
var date=new Date;
date.setTime(date.getTime()+seconds*1e3);
expires="; expires="+date.toGMTString()}else
{
expires=""}
if(domain){
expires=expires+";domain="+domain}
document.cookie=name+"="+value+expires+"; path=/"},
read:function(name){
var nameEQ=name+"=";
var ca=document.cookie.split(";");
for(var i=0,len=ca.length;i<len;i++){
var c=ca[i];
var cLen=c.length;
while(c.charAt(0)==" ")c=c.substring(1,cLen);
if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,cLen)}
return null},
erase:function(name,domain){
cookieUtils.create(name,"",-1,domain)}};
(function($){
$.fn.parallax2=function(options){
var settings=$.extend({
speed:.15},
options);
var win=$(window);
var windowWidth=win.width();
var windowHeight=win.height();
return this.each(function(){
var $this=$(this);
$(document).scroll(function(){
var scrollTop=win.scrollTop();
var offset=$this.offset().top;
var height=$this.outerHeight();
if(offset+height<=scrollTop||offset>=scrollTop+windowHeight){
return}
var $img=$this.find("> img");
$img.css({
"position":"absolute",
"width":"100%"});
var newVal=(offset-scrollTop)*settings.speed;
$img.css("transform","scale(1.3, 1.3)");
$img.css("-webkit-transform","scale(1.3, 1.3)");
$this.css("transform","translate3d(0px, "+newVal+"px, 0px");
$this.css("-webkit-transform","translate3d(0px, "+newVal+"px, 0px")}).trigger(
"scroll");
$(window).resize(function(){
windowWidth=win.width();
windowHeight=win.height();
$(document).trigger("scroll")})})}})(
jQuery);
function setI18nDesktopMenu(isNo){
DesktopMenu.toggleLinkText={
open:isNo?"Lukk":"Close",
close:isNo?"Alt innhold":"All content"}}
var DesktopMenu={
linkElement:null,
menuElement:null,
bottomNav:null,
maxHeight:0,
init:function(){
this.linkElement=$("#uio-app-menu-title");
this.menuElement=$("#uio-app-menu-wrapper");
this.bottomNav=$(".bottom-nav");
var dm=this;
$(document).on("click","#uio-app-menu-title",function(e){
dm.maxHeight=dm.bottomNav.outerHeight(true)+40;
var hidden=!dm.menuElement.hasClass("transition-visible");
if(hidden){
dm.menuElement.removeClass("transition-hidden").css(
"max-height",dm.maxHeight+"px").addClass(
"transition-visible");
UiOProfileARIA.popup.open(dm.linkElement,dm.menuElement,true);
if(dm.toggleLinkText){
dm.linkElement.find("span").text(dm.toggleLinkText.open)}}else
{
dm.menuElement.removeClass("transition-visible").css(
"max-height","0").addClass(
"transition-hidden");
UiOProfileARIA.popup.close(dm.linkElement,dm.menuElement,true);
if(dm.toggleLinkText){
dm.linkElement.find("span").text(dm.toggleLinkText.close)}}
e.preventDefault()})},
show:function(){
if(!this.menuElement)return;
this.menuElement.addClass("transition-hidden").css("max-height","0");
UiOProfileARIA.popup.close(this.linkElement,this.menuElement,true)},
hide:function(){
if(!this.menuElement)return;
this.menuElement.removeClass("transition-hidden transition-visible").css("max-height","none")}};
var newDesign=false;
var isNewDesignCookie=typeof cookieUtils==="object"&&cookieUtils.read("UIO_NEW_DESIGN_2020")!=null||
typeof localStorage!=="undefined"&&localStorage.getItem("UIO_NEW_DESIGN_2020")!=null;
var isNewDesignCookie2=typeof cookieUtils==="object"&&cookieUtils.read("UIO_NEW_DESIGN_2020_COPY")!=null||
typeof localStorage!=="undefined"&&localStorage.getItem("UIO_NEW_DESIGN_2020_COPY")!=null;
if(isNewDesignCookie||isNewDesignCookie2){
onNewDesign()}
function onNewDesign(){
if(!(location.hostname==="www.uio.no"||location.hostname==="www.nhm.uio.no"||location.hostname==="www.uioenergi.uio.no"||location.hostname==="www.biotek.uio.no"||location.hostname==="www.sum.uio.no"||location.hostname==="www.usit.uio.no"||location.hostname==="www.stk.uio.no"||location.hostname==="www.tf.uio.no"||location.hostname==="www.jus.uio.no"||location.hostname==="www.med.uio.no"||location.hostname==="www.khm.uio.no"||location.hostname==="www.muv.uio.no"||location.hostname==="www.hf.uio.no"||location.hostname==="www.odont.uio.no"||location.hostname==="www.ub.uio.no"||location.hostname==="www.uv.uio.no"||location.hostname==="www.sv.uio.no"||location.hostname==="www.mn.uio.no"||location.hostname==="www.vortex-demo.uio.no"||location.hostname==="vortex-test.uio.no")){
return}
if(/\/(index\.html)?$/.test(location.pathname)&&$("body#vrtx-frontpage").length){
$.ajax({
type:"HEAD",
async:false,
url:"./index-nytt-uio-design.html"}).done(
function(message,text,jqXHR){
location.href="./index-nytt-uio-design.html"}).fail(
function(jqXHR,textStatus){})}
$("head link").each(function(){
var stylesheet=$(this);
var stylesheetHref=stylesheet.attr("href");
if(stylesheetHref.indexOf("frontpage-override-")!==-1||
stylesheetHref.indexOf("hide-h1")!==-1){
$("head").append("<style type='text/css'>h1{display:none}</style>")}
if(stylesheetHref.indexOf("view-diff")===-1&&stylesheetHref.indexOf("it-service")===-1){
stylesheet.remove()}});
if(isNewDesignCookie){
$("head").append("<link rel='stylesheet' href='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src2/css/style2.css?"+ +new Date+"'' />");
setTimeout(function(){
$("head").append("<link rel='stylesheet' media='screen and (max-width: 16cm) and (orientation : portrait), screen and (max-width: 19cm) and (orientation : landscape)' href='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src2/css/responsive.css?"+ +new Date+"'' />")},
25);
$("head").append("<link rel='stylesheet' media='print' href='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src2/css/print.css?"+ +new Date+"'' />");
var scriptsNew="<script type='text/javascript' src='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src2/js/uio2.js?"+ +new Date+"'><\/script>"}else
if(isNewDesignCookie2){
$("head").append("<link rel='stylesheet' href='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src3/css/style2.css?"+ +new Date+"'' />");
setTimeout(function(){
$("head").append("<link rel='stylesheet' media='screen and (max-width: 16cm) and (orientation : portrait), screen and (max-width: 19cm) and (orientation : landscape)' href='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src3/css/responsive.css?"+ +new Date+"'' />")},
25);
$("head").append("<link rel='stylesheet' media='print' href='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src3/css/print.css?"+ +new Date+"'' />");
var scriptsNew="<script type='text/javascript' src='https://vortex-test.uio.no/vrtx/decorating/resources/dist/src3/js/uio2.js?"+ +new Date+"'><\/script>"}
$("body").append(scriptsNew);
newDesign=true}
(function(){
var uio={
url:window.location.href,
path:window.location.pathname,
resourcesRoot:"/vrtx/decorating/resources/dist/src/",
vrtxRoot:"/vrtx/__vrtx/static-resources/",
emptyPersonImg:"/vrtx/decorating/resources/dist/src/images/person-no-image.png",
iframeHeightUrlsRegex:/^(http(s|):\/\/((skjema|nettskjema(-demo|-test)?|jboss-(utv|test)|resin-test|w3(utv|test)[^.]+)|(fdv-iis-(test|p01|k01))|(vortex-systest)|(vrtx)).uio.no)|(http(s|):\/\/nettskjema.no)/,
ua:window.navigator.userAgent.toLowerCase(),
bodyId:"",
isPageLangEnglish:false,
hasCookies:window.navigator.cookieEnabled,
isNotIframed:window==top,
hasConsole:window.console&&window.console.log&&window.console.info&&window.console.error,
consolePrefix:"UiO: ",
browser:{},
responsiveDialog:false,
readyListen:function(fn){$(document).ready(fn)},
loadListen:function(fn){$(window).load(fn)},
dc:{},
cfg:{},
documentRightColumn:false,
hasAlwaysRightColumn:false,
log:function(msg){if(this.hasConsole)console.log(this.consolePrefix+msg)},
info:function(msg){if(this.hasConsole)console.info(this.consolePrefix+msg)},
error:function(msg){if(this.hasConsole)console.error(this.consolePrefix+msg)}};
window.UiO=uio})();
if(!newDesign){
try{
if(window.sessionStorage&&window.top!=window&&window.parent&&window.parent.location.host==window.location.host){
UiOProfileResponsive.responsiveListen({
setup:function(){},
match:function(){
if(sessionStorage.getItem("responsive-preview")!=="true"){
sessionStorage.setItem("responsive-preview","true");
location.reload()}},
unmatch:function(){
if(sessionStorage.getItem("responsive-preview")==="true"){
sessionStorage.removeItem("responsive-preview");
location.reload()}}})}}
catch(err){}
UiO.addCfg=function addCfg(cfg){
UiO.cfg=$.extend(true,UiO.cfg,cfg)};
UiO.detectBrowser=function detectBrowser(){
UiO.browser={
isAndroid:/android/.test(UiO.ua),
isBadAndroid:/android 2/.test(UiO.ua),
isIOS:/iphone|ipad/.test(UiO.ua),
isBadOpera:/^opera.*12.(15|16)$/.test(UiO.ua)}};
UiO.cacheDetectDOM=function cacheDetectDOM(){
UiO.dc.body=$("body");
UiO.dc.head=$("#head");
UiO.dc.totalMain=$("#total-main");
UiO.dc.rightMain=$("#right-main");
UiO.dc.content=$("#vrtx-content");
UiO.dc.mainContent=$("#vrtx-main-content");
UiO.dc.addContent=$("#vrtx-additional-content");
UiO.dc.relatedContent=$("#vrtx-related-content");
UiO.dc.introImage=$(".vrtx-introduction-image img, img.vrtx-introduction-image");
UiO.bodyId=UiO.dc.body.attr("id");
UiO.isPageLangEnglish=$("html").attr("lang")==="en";
UiO.hasAlwaysRightColumn=/^https?:\/\/(www\.)?(apollon\.uio\.no|vortex-systest\.uio\.no\/brukere\/oyvihatl\/apollon\/)/.test(location.href);
UiO.hasAlwaysRightColumn=UiO.dc.body.hasClass("special-page")?false:UiO.hasAlwaysRightColumn;
var addContentElms=UiO.dc.addContent.find(">*");
if((!UiO.dc.addContent.length||addContentElms.length===0)&&
!UiO.hasAlwaysRightColumn){
UiO.dc.mainContent.addClass("vrtx-empty-additional-content")}else
{
if(addContentElms.length===1&&
addContentElms.attr("id")==="vrtx-event-calendar"){
UiO.dc.mainContent.addClass("vrtx-hide-additional-content-true")}else
{
if(!UiO.dc.mainContent.hasClass("vrtx-hide-additional-content-true")&&
!(UiO.dc.content.length&&UiO.dc.content.hasClass("vrtx-frontpage-wide"))){
UiO.documentRightColumn=true}}}
if(UiO.dc.rightMain.length)UiO.dc.body.addClass("right-main");
if(UiO.hasAlwaysRightColumn)UiO.dc.mainContent.addClass("always-right-column")};
UiO.scaleBoxImage=function scaleBoxImage(){
$(".vrtx-frontpage-box:not(.half-box-left, .half-box-right, .third-box-left, .third-box-middle, .third-box-right).vrtx-frontpage-box-picture").each(function(){
var box=$(this);
var img=box.find(".vrtx-frontpage-box-picture img");
if(img.width()>=box.width()*.8){
img.closest(".vrtx-frontpage-box-picture").css({"float":"none","marginLeft":"0"})}})};
UiO.contentAdjustments=function contentAdjustments(){
var introEmpty=$(".vrtx-introduction");
if(introEmpty.length&&introEmpty.find("img[src='']").length){
if(!introEmpty.find(">*:not(img)").length){
introEmpty.hide()}else
{
introEmpty.find("img[src='']").hide()}}
if(/.*(msie|rv:11|edge).*/.test(UiO.ua)){
$("html").addClass("msie")}
var gNav=$("#globalnav");
if(gNav.length&&gNav.height()>54){
UiO.dc.body.addClass("globalnav-smaller")}
$(document).on("focus mouseenter",".steps-guide > li, .steps-guide-vertical > li",function(e){
$(this).addClass("hover")});
$(document).on("blur mouseleave",".steps-guide > li, .steps-guide-vertical > li",function(e){
$(this).removeClass("hover")});
var tags=$(".vrtx-list-articles");
if(tags.length){
tags.parent().addClass("vrtx-list-articles-columns-"+Math.min(tags.length,3))}
var nextToMarked=$("a.vrtx-marked").parent().next();
if(nextToMarked.length){
nextToMarked.find("a").addClass("vrtx-after-marked")}
if(UiO.documentRightColumn){
var email=$(".vrtx-person-contact-info-line.vrtx-email a.vrtx-value");
if(email.length){
var linkText=email.text();
if(linkText.length>28){
email.html(linkText.replace("@","<br>@"))}}}
if(UiO.browser.isAndroid||UiO.browser.isIOS){
$(".vrtx-organizational-unit-phone .tel .value,"+
".vrtx-person-contact-info-line.vrtx-mobile .vrtx-value,"+
".vrtx-person-contact-info-line.vrtx-phone .vrtx-value,"+
"#footer-wrapper .tel").each(function(){
var telField=$(this);
var tel=$.trim(telField.text());
telField.html("<a href='tel:"+tel.replace("-","")+"'>"+tel+"</a>")})}
if(/^\/ikos\/forskning\/prosjekter\/hvalenes-makt\/(index\.html)?$/.test(location.pathname)||
/^\/ikos\/english\/research\/projects\/whales-of-power\/(index\.html)?$/.test(location.pathname)||
/^\/ikos\/forskning\/prosjekter\/brokex\/(index\.html)?$/.test(location.pathname)||
/^\/ikos\/english\/research\/projects\/brokex\/(index\.html)?$/.test(location.pathname)||
/^\/iakh\/forskning\/prosjekter\/historien-om-opphavsrett-i-kulturindustrien\/(index\.html)?$/.test(location.pathname)||
/^\/iakh\/english\/research\/projects\/creative-intellectual-property-rights\/(index\.html)?$/.test(location.pathname)||
/^\/smr\/english\/research\/projects\/beyond\/(index\.html)?$/.test(location.pathname)||
/^\/smr\/forskning\/prosjekter\/beyond\/(index\.html)?$/.test(location.pathname)||
/^\/forskning\/prosjekter\/apocrypha\/(index\.html)?$/.test(location.pathname)||
/^\/english\/research\/projects\/apocrypha\/(index\.html)?$/.test(location.pathname)||
/^\/brukere\/oyvihatl\/prosjekter\/hvalenes-makt\/(index\.html)?$/.test(location.pathname)){
project1BigBanner()}
if(/^\/smr\/english\/research\/projects\/beyond\/the-beyond-blog\/.*$/.test(location.pathname)||
/^\/brukere\/oyvihatl\/prosjekter\/hvalenes-makt\/blogg\/.*$/.test(location.pathname)){
$("<div class='grid-container back-link-container'><div class='vrtx-back'><a href='"+blogPath+"../'>"+(UiO.isPageLangEnglish?"Back":"Tilbake")+"</a></div></div>").insertBefore("#main")}
var footerLogin=$(".responsible-login .vrtx-dropdown-first a.vrtx-login-manage-admin-collection, .responsible-login .vrtx-dropdown-first a.vrtx-login-manage-admin");
if(footerLogin.length){
footerLogin.closest(".vrtx-dropdown-wrapper").addClass("vrtx-dropdown-wrapper-left")}};
function project1BigBanner(){
var path=location.pathname.replace(/[^\/]+\.html$/,"");
var file="include.html?x-prevent-decorating";
project1BigBannerGet(path,file)}
function project1BigBannerGet(path,file){
$.ajax({
type:"GET",
url:path+file,
dataType:"html",
success:function success(data){
var match=data.match(/src="([^"]+)"/gim);
if(match.length>0&&!/^\//.test(match[0].replace(/src=\"/gim,""))){
data=data.replace(/src="([^"]+)"/gim,'src="'+path+'$1"')}
data=data.replace(/href="[^"]+"/gim,'href="'+path+'"');
var html=$($.parseHTML(data)).filter(".grid-container");
$(html[0].outerHTML).insertBefore("#main");
$("html").addClass("big-project");
var backLink=$(".vrtx-back").remove();
var src=$(".banner-container").find("img");
if(src.length){
src=src[0].src;
$(".banner-container").css({
"background":"scroll url('"+src+"') no-repeat 0 50%",
"backgroundSize":"cover"});
$(".banner-container img").hide()}
$("<div class='grid-container back-link-container'>"+backLink[0].outerHTML+"</div>").insertBefore(".banner-container")}})}
UiO.setupARIA=function setupARIA(){
UiOProfileARIA.setUntabable($("#uio-app-menu-wrapper"));
var selector=".vrtx-frontpage-box:not(.vrtx-header-false) .vrtx-more a,"+
".vrtx-frontpage-box:not(.vrtx-header-false, .vrtx-more-false) .vrtx-frontpage-box-picture a,"+
".vrtx-featured-item .vrtx-featured-item-picture a,"+
".vrtx-resource a.vrtx-image, .vrtx-resource a.vrtx-icon, .vrtx-resource .vrtx-read-more a,"+
".vrtx-feed a.vrtx-image, .vrtx-event-component-picture a,"+
".vrtx-event-component .vrtx-more a";
this.setARIA(selector,"hidden","true");
this.setARIA(".ui-datepicker a","controls","vrtx-main-content");
var h1=$("h1");
h1.attr("id","hdr");
if(h1.css("visibility")==="hidden"){
h1.addClass("hidden")}
this.setARIA("#head-breadcrumb-container #head-breadcrumb span:last-child","current","location");
this.setARIA("#bottomnav #breadcrumb-container .vrtx-breadcrumb-active","current","location")};
UiO.setARIA=function setARIA(selector,ariaPostfix,value){
var elms=$(selector);
for(var i=0,len=elms.length;i<len;i++){
var elm=$(elms[i]);
elm.attr("aria-"+ariaPostfix,value);
if(ariaPostfix==="hidden"){
elm.attr("tabindex","-1");
elm.find("a, button, input").attr("tabindex","-1")}}};
$.browser={opera:/opera/.test(UiO.ua)};
function vrtxSGalleryFullscreenAddExtraHtml(){
var logos=$(".uio-app-name");
if(logos.length){
return logos[0].outerHTML}
return""}
UiO.affectsFrontpage=function affectsFrontpage(){
UiO.equalizeHeightPreprocess();
var langLink=$(".vrtx-frontpage-full-width.total-main #main #vrtx-change-language-link");
if(langLink.length){
langLink.css("marginBottom",-langLink.height())}
$(".full-width-picture-bg .vrtx-frontpage-box:not(.full-width-picture):not(.full-width-picture-fixed)").each(function(){
var gridContainer=$(this).closest(".grid-container").removeClass("full-width-picture-bg");
gridContainer.removeAttr("style")});
$(".full-width-picture.vrtx-frontpage-box-picture, .full-width-picture-fixed.vrtx-frontpage-box-picture").each(function(){
var fullWidthPicture=$(this);
var fullWidthPictureImg=fullWidthPicture.find("img");
var src=fullWidthPictureImg.attr("src");
var gridContainer=fullWidthPicture.closest(".grid-container");
gridContainer.addClass("full-width-picture-bg");
if(fullWidthPicture.hasClass("parallax")){
gridContainer.prepend("<div class='parallax2-container'><img src='"+src+"' alt=''></div>");
gridContainer.css("overflow","hidden");
gridContainer.find(".parallax2-container").parallax2({speed:.2})}else
{
var top="50%";
if(fullWidthPicture.hasClass("full-width-picture-top")){
top="0"}else
if(fullWidthPicture.hasClass("full-width-picture-bottom")){
top="100%"}
gridContainer.css({
"background":!fullWidthPicture.hasClass("full-width-picture-fixed")?
"scroll url('"+src+"') no-repeat 0 "+top:
"scroll url('"+src+"') no-repeat 50% "+top,
"backgroundSize":"cover"});
var langLink=$("#vrtx-change-language-link");
if(langLink.length){
langLink.addClass("full-width-picture-language-link")}}});
$(".vrtx-frontpage-box-picture.box-image-background").each(function(){
var box=$(this);
var img=box.find(".vrtx-frontpage-box-picture img");
var thisImg=new Image;
thisImg.onload=function(){
box.css("background","url('"+img.attr("src")+"') no-repeat 0 0");
box.css("minHeight",thisImg.height)};
if(box.hasClass("box-image-link")){
box.on("click",function(){
location.href=box.find(">h2 a, .vrtx-more a").filter(":first").attr("href")})}
thisImg.src=img.attr("src")});
if(window.self!==window.top&&$("#vrtx-frontpage.vrtx-frontpage-two").length){
if(parent.parcelRequire){
$(".full-width-picture .vrtx-frontpage-box-picture img, .full-width-picture-fixed .vrtx-frontpage-box-picture img").each(function(){
var fullWidthPictureImg=$(this);
fullWidthPictureImg.addClass("hidden")})}}
UiO.equalizeHeight($(".navigation-links li, #vrtx-semester-links li"));
$(".steps-guide.steps-guide-no-box-link").each(function(){
$(this).find("> li > a, > li > span").prepend("<br/>")});
if(UiO.documentRightColumn||$("#right-main").length){
UiO.equalizeHeight($(".steps-guide:not(.steps-guide-vertical) > li"),3)}else
{
UiO.equalizeHeight($(".steps-guide:not(.steps-guide-five-columns):not(.steps-guide-vertical) > li"),4);
UiO.equalizeHeight($(".steps-guide-five-columns:not(.steps-guide-vertical) > li"),5)}
UiO.scaleBoxImage();
UiO.setupSpecial();
$(".vrtx-frontpage-box").each(function(){
var box=$(this);
var items=box.find(".vrtx-featured-item").filter(":visible");
if(box.hasClass("featured-one-big-two-column")){
if(items.length>=4){
box.addClass("featured-one-big-three-column")}}else
{
if(items.length===2){
box.addClass("featured-two-column")}else
if(items.length>=3){
box.addClass("featured-three-column")}}});
$(".big-image img").each(function(){
var elm=$(this);
var src=elm.attr("src");
elm.attr("src",src.replace("?vrtx=thumbnail",""))});
$("#main p > img, #main p > a > img").each(function(){
$(this).closest("p").addClass("image")});
if(UiO.dc.body.hasClass("vrtx-frontpage-two")){
$(".grid-container").each(function(){
var row=$(this);
var boxes=row.find(".vrtx-frontpage-box");
var twoThirds=0;
var twoThirdsNoVerticalLine=0;
boxes.each(function(){
var box=$(this);
if(box.hasClass("third-box-double")){
twoThirds++;
if(box.hasClass("third-box-double-no-vertical-line")){
twoThirdsNoVerticalLine++}}});
if(twoThirds>0){
row.addClass("row-thirds-double")}
if(twoThirdsNoVerticalLine>0){
row.addClass("row-thirds-double-no-vertical-line")}})}};
var lastRun=+new Date;
UiO.frontpageContentMutateListen=function frontpageContentMutateListen(){
if(window.self!==window.top&&$("#vrtx-frontpage.vrtx-frontpage-two").length){
if(parent.parcelRequire){
$("html").addClass("embedded-frontpage");
var afterMutateListen=function(){
var newRun=+new Date;
if(newRun-lastRun>=200){
UiO.affectsFrontpage();
if(typeof affectsFrontpage==="function"){
affectsFrontpage()}
if(typeof affectsFrontpageLoad==="function"){
affectsFrontpageLoad()}
lastRun=+new Date}};
setTimeout(function(){
afterMutateListen();
$(".vrtx-frontpage-box").each(function(){
var observer=new MutationObserver(function(mutations){
if(mutations.length){
afterMutateListen()}});
var config={attributes:true,childList:true,characterData:true};
observer.observe(this,config)})},
500)}}};
UiO.readyListen(function(){
UiO.detectBrowser();
UiO.cacheDetectDOM();
UiO.frontpageContentMutateListen();
UiO.handleVrtxVideo();
UiO.affectsFrontpage();
UiO.adjustLogo();
UiO.contentList();
UiO.contentAdjustments();
UiO.cookieFooter();
UiO.setupARIA();
UiO.setupComments();
UiO.setupToC();
UiO.setupStudies();
UiO.setupHeaderSearch();
UiO.setupAutocomplete();
UiO.setupDialogs();
UiO.setupHeightListeningForIframes();
UiO.setupSearchSurvey();
UiO.setupSurveys();
UiO.setupMathJax();
UiO.setupToggleMore();
UiO.setupEventsDatepickerToggle();
UiO.setupPersonEmptyImage();
UiO.setupPublications();
UiO.setupPersonListing();
UiOProfileAccordions.init("#main",["h2","h3","h4"],[".vrtx-date-info"],true);
UiO.setupTables();
UiO.setupOperational();
UiO.setupForEmployeesSearch();
UiO.setupUBSearch();
UiO.switchMode()});
UiO.loadListen(function(){
UiO.scaleIntroImage();
UiO.scaleBoxImage();
UiO.equalizeHeight();
if(typeof App==="undefined"){
UiO.setupGalleryNew()}});
UiO.switchMode=function(){
var UiOProfileDesktop={};
UiOProfileDesktop.MU={
fullWidthPicture:{
match:function(){
$(".full-width-picture .vrtx-frontpage-box-picture img, .full-width-picture-fixed .vrtx-frontpage-box-picture img").each(function(){
var fullWidthPictureImg=$(this);
fullWidthPictureImg.addClass("hidden")})},
unmatch:function(){
$(".full-width-picture .vrtx-frontpage-box-picture img, .full-width-picture-fixed .vrtx-frontpage-box-picture img").each(function(){
var fullWidthPictureImg=$(this);
fullWidthPictureImg.removeClass("hidden")})}}};
setI18nDesktopMenu(!UiO.isPageLangEnglish);
UiOProfileResponsive.desktopListen({
setup:function(){
DesktopMenu.init()},
match:function(){
for(var component in UiOProfileDesktop.MU){
UiOProfileDesktop.MU[component].match()}},
unmatch:function(){
for(var component in UiOProfileDesktop.MU){
UiOProfileDesktop.MU[component].unmatch()}}});
UiOProfileResponsive.responsiveListen({
setup:function(){
UiO.loadScript(UiO.resourcesRoot+"js/responsive.js?v=20190125",function(){
UiOResponsive.genNavigation();
UiOProfileResponsiveMenu.init()})},
match:function(){
UiO.responsiveDialog=true;
DesktopMenu.hide()},
unmatch:function(){
UiO.responsiveDialog=false;
DesktopMenu.show()}})}}
UiO.equalizeHeightPreprocess=function equalizeHeightPreprocess(){
var boxes=$("#vrtx-main-content .vrtx-frontpage-box"),
box=null;
for(var i=0,len=boxes.length;i<len;i++){
box=$(boxes[i]);
var boxH2=box.find("> h2");
var boxPicture=box.find(".vrtx-frontpage-box-picture");
if(boxH2.length&&boxPicture.length&&box.hasClass("super-wide-picture")){
$(boxH2.remove()).insertAfter(boxPicture)}}
var rows=$("#vrtx-main-content .grid-container"),row=null,boxesInRow=[];
for(i=0,len=rows.length;i<len;i++){
row=$(rows[i]);
boxesInRow=row.find(".row > .vrtx-frontpage-box");
var firstBox=boxesInRow.filter(":first-child");
var lastBox=boxesInRow.filter(":last-child");
if(UiO.isBoxColored(firstBox))row.addClass("row-first-colored");
if(UiO.isBoxColored(lastBox))row.addClass("row-last-colored")}
var containers=$(".grid-container");
for(i=0,len=containers.length;i<len;i++){
var container=$(containers[i]);
var box=container.find(".vrtx-frontpage-box").filter(":first");
var boxCls=box.attr("class");
if(/ row-color-[^ ]+/.test(boxCls)){
var colorClass=boxCls.match(/color-[^ ]+/);
container.addClass("grid-"+colorClass+" row-all-colored row-first-colored row-last-colored")}}};
UiO.equalizeHeight=function equalizeHeight(navLinksBoxes,numColumns){
if(typeof navLinksBoxes==="object"&&!navLinksBoxes.length)return;
var container=$("#vrtx-main-content"),
boxes=navLinksBoxes||null,box=null,
height=0,max=0,boxRow=[],columns=3,j=0,
isNavLinks=false,
isGreyRow=false,isAllGreyRow=false,
isTwoColumnResources=false,
isSupervisorBox=false;
if(boxes&&boxes.length){
if(typeof numColumns==="number"){
columns=numColumns;
isTwoColumnResources=true}else
{
isNavLinks=true;
if(UiO.documentRightColumn||UiO.bodyId!="vrtx-internal-organizational-unit-folder"){
columns=2}}}else
{
var boxesContainer=$(".vrtx-resources.vrtx-two-columns");
if(boxesContainer.length){
if(!boxesContainer.hasClass("vrtx-resource-prioritize-first")){
boxes=boxesContainer.find(".vrtx-resource")}else
{
boxes=boxesContainer.find("> div:not(:first-child) .vrtx-resource")}}
if(boxes&&boxes.length){
isTwoColumnResources=true}}
if((boxes==null||!boxes.length)&&container.length){
boxes=container.find(".grid-container, .vrtx-contact-supervisor-description, .vrtx-contact-supervisor-contact-info")}
if(boxes==null)return;
for(var i=0,len=boxes.length;i<len;i++){
box=$(boxes[i]);
if(box.hasClass("vrtx-contact-supervisor-description")||
box.hasClass("vrtx-featured-article-left")||
box.hasClass("vrtx-default-article-left")){
columns=2}
if(box.closest(".navigation-links").hasClass("navigation-links-three-columns")){
columns=3}
if(box.closest(".navigation-links").hasClass("navigation-links-four-columns")){
columns=4}
if(box.hasClass("vrtx-contact-supervisor-description"))isSupervisorBox=true;
if(box.hasClass("grid-container")){
if(box.hasClass("row-all-colored")||
box.hasClass("row-one-colored"))isGreyRow=true;
if(box.hasClass("row-all-colored"))isAllGreyRow=true;
columns=1;
var boxesContainer=box.find(".vrtx-frontpage-box");
for(var b=0,boxesContainerLen=boxesContainer.length;b<boxesContainerLen;b++){
box=$(boxesContainer[b]);
boxRow.push(box)}}else
{
boxRow.push(box)}
j++;
if(j===columns||box.filter(":last-child").length){
var usedMinHeight=false;
var k=boxRow.length;
while(k--){
box=boxRow[k];
height=isTwoColumnResources?box.outerHeight():box.height();
var boxPicture=box.find(".vrtx-frontpage-box-picture img");
if(boxPicture.length&&
(box.attr("class").indexOf("half-box-")!==-1||
box.attr("class").indexOf("third-box-")!==-1)&&
!box.hasClass("super-wide-picture")&&
!(box.attr("class").indexOf("third-box-")!==-1&&UiO.documentRightColumn)){
var boxPictureHeight=boxPicture.height();
var greyBoxPadding=UiO.responsiveDialog?20:40;
var boxMoreLink=box.find(".vrtx-more");
if(boxMoreLink.length){
var greyRowExtraTop=isGreyRow?greyBoxPadding:0;
var boxMoreLinkHeight=boxMoreLink.outerHeight(true);
if(boxPictureHeight>height-boxMoreLinkHeight-greyRowExtraTop){
height=boxPictureHeight+boxMoreLinkHeight+greyRowExtraTop;
boxMoreLink.addClass("abs-more-link").css(
"paddingTop",boxPictureHeight+(isGreyRow?greyBoxPadding+5:5)+"px");
box.css("minHeight",height+"px");
usedMinHeight=true}}else
{
var greyRowExtra=isGreyRow?greyBoxPadding*2:0;
if(boxPictureHeight>height-greyRowExtra){
height=boxPictureHeight+greyRowExtra;
box.css("minHeight",height+"px");
usedMinHeight=true}}}
if(isAllGreyRow&&box.hasClass("grey-box-light"))box.closest(".grid-container").addClass("row-all-colored-light");
if(isAllGreyRow&&box.hasClass("red"))box.closest(".grid-container").addClass("row-all-colored-red");
if(box.hasClass("white-box-orange-header")||
box.hasClass("white-box-green-header")||
box.hasClass("white-box-red-header")){
if(!UiO.documentRightColumn&&UiO.dc.totalMain.length){
var boxH2=box.find("> h2");
var h2Height=boxH2.outerHeight();
$("<div class='colored-bg colored-bg-h2' style='top: "+box.offset().top+"px; background: "+boxH2.css("background-color")+"; height: "+h2Height+"px;' />").insertAfter("#main")}}
max=Math.max(height,max)}
var boxRowLen=boxRow.length;
while(boxRow.length){
box=boxRow.pop();
if(isNavLinks){
box.find("a").css("height",max+"px")}else
{
if(boxRowLen>1){
box.css("height",max+"px")}}}
j=0;
boxRow=[];
max=0;
isGreyRow=false;
isAllGreyRow=false}}
if(UiO.dc.totalMain.length){
boxes=$(".vrtx-context-message-box.uio-info-message");
for(var i=0,len=boxes.length;i<len;i++){
box=$(boxes[i]);
height=box.height();
box.addClass("uio-info-message-full");
$("<div class='colored-bg' style='top: "+(box.offset().top+30)+"px; background: "+box.find(".content-wrapper").css("background-color")+"; height: "+height+"px;' />").insertAfter("#main")}}};
UiO.isBoxColored=function isBoxColored(box){
return box.hasClass("grey-box")||
box.hasClass("grey-clip-box")||
box.hasClass("grey-box-light")||
box.hasClass("red")};
UiO.adjustLogo=function(){
var uioLogo=$(".not-for-ansatte .uio-app-name").filter(":visible");
if(uioLogo.length){
var width=uioLogo.width();
if(width>970&&width<1200){uioLogo.addClass("uio-app-name-2")}else
if(width>=1200&&width<1450){uioLogo.addClass("uio-app-name-3")}else
if(width>=1450){uioLogo.addClass("uio-app-name-4")}
var facultyLogo=$(".uio-faculty");
var instituteLogo=$(".uio-host:not(.uio-host-resp)");
if(facultyLogo.length&&location.host!=="www.uio.no"){
facultyLogo.css({
"position":"relative",
"left":instituteLogo.position().left+"px",
"marginLeft":0,
"paddingLeft":0})}}
var uioContextLogo=$("#head-context-title").filter(":visible");
if(uioContextLogo.length){
var width=uioContextLogo.width();
if(width>970&&width<1200){uioContextLogo.addClass("head-context-title-2")}else
if(width>=1200&&width<1450){uioContextLogo.addClass("head-context-title-3")}else
if(width>=1450){uioContextLogo.addClass("head-context-title-4")}}
$(".uio-seal").attr("tabindex","-1");
$(".www\\.uio\\.no .uio-host, .uio-host-resp, .www\\.uio\\.no #breadcrumb-container .vrtx-uio a").attr("tabindex","-1");
$(document).on("focus mouseover",".uio-acronym",function(e){
$(".www\\.uio\\.no .uio-host:not(.uio-host-resp)").addClass("hover");
$(".uio-host-resp").addClass("hover")});
$(document).on("blur mouseout",".uio-acronym",function(e){
$(".www\\.uio\\.no .uio-host:not(.uio-host-resp)").removeClass("hover");
$(".uio-host-resp").removeClass("hover")});
$(document).on("mouseover",".www\\.uio\\.no .uio-host:not(.uio-host-resp), .uio-host-resp",function(e){
$(".uio-acronym").addClass("hover")});
$(document).on("mouseout",".www\\.uio\\.no .uio-host:not(.uio-host-resp), .uio-host-resp",function(e){
$(".uio-acronym").removeClass("hover")});
$(document).on("focus mouseover",".www\\.uio\\.no #breadcrumb-container .vrtx-faculty a",function(e){
$(".vrtx-uio a").addClass("hover")});
$(document).on("blur mouseout",".www\\.uio\\.no #breadcrumb-container .vrtx-faculty a",function(e){
$(".vrtx-uio a").removeClass("hover")});
$(document).on("mouseover",".www\\.uio\\.no #breadcrumb-container .vrtx-uio a",function(e){
$(".vrtx-faculty a").addClass("hover")});
$(document).on("mouseout",".www\\.uio\\.no #breadcrumb-container .vrtx-uio a",function(e){
$(".vrtx-faculty a").removeClass("hover")})};
UiO.cookieFooter=function(){
UiO.genOptOutLink({
id:"privacy-policy-link-wrapper",
cookieName:"PRIVACY_POLICY_INFO_2018_OPT_OUT",
injection:"#head-wrapper",
injectionAfter:false,
links:{
no:{
url:location.protocol+"//www.uio.no/om/regelverk/personvern/personvernerklering.html",
text:"Les mer om #hvordan UiO behandler personopplysninger, om dine personvernrettigheter ved UiO og om hvorfor vi bruker informasjonskapsler$."},
en:{
url:location.protocol+"//www.uio.no/english/about/regulations/privacy-declaration.html",
text:"Read more about #how the University of Oslo processes personal information, your privacy rights at UiO and why we use cookies$."}},
checks:function(){
return $(".uio-app-name").filter(":visible").length>0}})};
UiO.genOptOutLink=function(opts){
if(location.search.indexOf("no-cookie-infobar")===-1&&
typeof refreshInfoscreenDay==="undefined"&&
UiO.isNotIframed&&
UiO.hasCookies&&
!cookieUtils.read(opts.cookieName)&&
(typeof opts.checks!=="function"||opts.checks())){
var lang=UiO.isPageLangEnglish?"en":"no";
var text=opts.links[lang].text;
if(text.indexOf("#")!==-1){
text=text.replace("#","<a href='"+opts.links[lang].url+"'>");
text=text.replace("$","</a>")}else
{
text="<a href='"+opts.links[lang].url+"'>"+text+"</a>"}
var linkCloseI18n={
title:{
"no":"Personvern og informasjonskapsler",
"en":"Privacy and cookies"},
close:{
"no":"Lukk",
"en":"Close"}};
var cookieInfoHtml="<div id='"+opts.id+"' class='info-link-wrapper' role='region' aria-labelledby='cookie-wrapper-label'>"+
"<span id='cookie-wrapper-label' class='hidden'>"+linkCloseI18n.title[lang]+"</span>"+
"<div class='info-link'>"+
text+
"<a class='info-link-close' href='javascript:void(0);' title='"+linkCloseI18n.close[lang]+"'></a>"+
"</div>"+
"</div>";
if(opts.injectionAfter){
$(cookieInfoHtml).insertAfter(opts.injection)}else
{
$(cookieInfoHtml).insertBefore(opts.injection)}
$(document).on("click","#"+opts.id+" .info-link-close",function(e){
cookieUtils.create(
opts.cookieName,
"yes",
5479,
opts.host||"uio.no",
location.protocol==="https:");
$("#"+opts.id).hide();
e.stopPropagation();
e.preventDefault()})}};
UiO.contentList=function(){
var listSelector="> ul, > ol";
var listSelectorArticle="#vrtx-main-user > ul, #vrtx-main-user > ol";
var listSelectorStudies="> .vrtx-shared-text-description > ul,"+
"> .vrtx-shared-text-description > ol,"+
"> .vrtx-hvordan-soke-other > ul,"+
"> .vrtx-hvordan-soke-other > ol,"+
"> .innpassing-tidl-utdanning-fri > ul,"+
"> .innpassing-tidl-utdanning-fri > ol,"+
"> .ordinar-kvote-alle-kvalifiserte-fri > ul,"+
"> .ordinar-kvote-alle-kvalifiserte-fri > ol,"+
"> .forstevitnemal-kvote-fri > ul,"+
"> .forstevitnemal-kvote-fri > ol,"+
"> .rangering-sokere-fri > ul,"+
"> .rangering-sokere-fri > ol,"+
"> .vrtx-hvordan-soke-documentation-text-field > ul,"+
"> .vrtx-hvordan-soke-documentation-text-field > ol,"+
"> .politiattest-fri > ul,"+
"> .politiattest-fri > ol,"+
"> .generelle-fri > ul,"+
"> .generelle-fri > ol,"+
"> .frist-frekvens-fri > ul,"+
"> .frist-frekvens-fri > ol";
var contentListCls="content-list";
if(UiO.bodyId!="vrtx-searchview"&&
UiO.bodyId!="vrtx-personsearch"&&
UiO.bodyId!="vrtx-unitsearch"&&
UiO.bodyId!="vrtx-research-group-listing"&&
UiO.bodyId!="vrtx-project-listing"&&
UiO.bodyId!="vrtx-master-listing"){
this.dc.totalMain.find(listSelector).addClass(contentListCls);
this.dc.rightMain.find(listSelector).addClass(contentListCls);
this.dc.mainContent.find(listSelector).addClass(contentListCls);
this.dc.mainContent.find(listSelectorArticle).addClass(contentListCls);
this.dc.mainContent.find(listSelectorStudies).addClass(contentListCls)}};
UiO.scaleIntroImage=function scaleIntroImage(){
var introImage=UiO.dc.introImage;
if(!introImage.length)return;
var parent=introImage.parent();
var hasParent=parent.hasClass("vrtx-introduction-image");
var src=introImage[0].src;
if(/\.svg$/.test(src)){
$.get(src).done(function(data){
data=$(data.documentElement);
var width=data[0].viewBox.baseVal.width;
introImage.css("width",width);
if(hasParent)parent.css("width",width);
UiO.scaleIntroImageActual(width)})}else
{
var width=parseInt(introImage.css("width"),10);
if(isNaN(width)){
width=introImage.width()}
UiO.scaleIntroImageActual(width)}};
UiO.scaleIntroImageActual=function scaleIntroImageActual(width){
var introImage=UiO.dc.introImage;
var parent=introImage.parent();
var hasParent=parent.hasClass("vrtx-introduction-image");
if(!isNaN(width)){
if(location.host==="www.uniforum.uio.no"){
var maxWidth=350;
var fullWidth=630}else
{
var maxWidth=UiO.documentRightColumn?300:350;
var fullWidth=500}
if(width<fullWidth){
if(hasParent){
parent.addClass("small-intro-image")}else
{
introImage.addClass("small-intro-image")}}
if(width>maxWidth&&width<fullWidth){
introImage.css("width",maxWidth);
if(hasParent)parent.css("width",maxWidth)}else
if(width>=fullWidth){
var resetFloatFullWidthCss={
"marginLeft":"0px",
"float":"none",
"width":"auto"};
if(hasParent){
parent.css(resetFloatFullWidthCss);
introImage.css("width","auto")}else
{
introImage.css(resetFloatFullWidthCss)}}}else
{
this.error("Could not get intro image width and adjust it.")}};
UiO.setupComments=function setupComments(){
var isNewBlog=UiO.dc.body.hasClass("blog");
if(typeof CKEDITOR!=="undefined"){
CKEDITOR.on("instanceReady",function(ev){
if(ev.editor.name==="comments-text"){
ev.editor.focus()}})}
var comments=$(".vrtx-comments");
comments.find(".vrtx-comment p:empty").remove();
comments.addClass("uio-main");
if(isNewBlog){
$($(".vrtx-comments").remove()).insertAfter("#vrtx-content")}else
{
$($(".vrtx-comments").remove()).insertAfter("#main")}
if(isNewBlog){
UiO.blogI18n={
authorPrefix:UiO.isPageLangEnglish?"by ":
"av ",
and:UiO.isPageLangEnglish?"and":
"og",
authorMoreAbout:UiO.isPageLangEnglish?"More about the author":
"Mer om forfatteren",
authorAllPosts:UiO.isPageLangEnglish?"See all posts by the author":
"Se alle innlegg av forfatteren"};
UiO.setupBlog();
UiO.setupTooltipToggle();
UiOProfileResponsive.responsiveListen({
match:function(){
var waitForCommentsIsWrapped=setTimeout(function(){
var isWrapped=$("#inner-content-wrapper > .vrtx-comments");
if(isWrapped.length){
$($(".vrtx-comments").remove()).insertAfter("#vrtx-content")}else
{
setTimeout(arguments.callee,25)}},
25)}})}};
UiO.setupBlog=function setupBlog(){
var isBlogListing=UiO.bodyId==="vrtx-blog-listing";
var isTagListing=UiO.bodyId=="vrtx-tagview";
var isArticle=UiO.bodyId==="vrtx-structured-article";
var path=blogPath;
if(isBlogListing&&location.pathname!=path){
path=location.pathname}
if(isBlogListing||isTagListing){
var resources=$(".vrtx-resource");
if(isBlogListing){
UiO.useFullsizeImages(resources)}
UiO.setupBlogByline(resources,path,true,false,isTagListing)}else
if(isArticle){
$(".vrtx-comment").each(function(){
var commentInfo=$(this).find(".comment-info");
var commentBody=$(this).find(".comment-body");
$(commentInfo.remove()).insertBefore(commentBody)});
UiO.setupBlogByline($("#vrtx-main-content"),location.pathname,false,false,false);
UiO.useBlogPathArticleTag()}
var recentPosts=$(".grid-container.blog-recent-posts .vrtx-feed.with-images li");
if(recentPosts.length){
UiO.setupBlogByline(recentPosts,path,false,true,false)}
UiO.setupBlogBannerLowerImage();
$(document).on("click",".grid-container.full-width-picture-bg",function(e){
var link=$(this).find(".vrtx-frontpage-box .vrtx-frontpage-box-picture a");
var href=link.attr("href");
location.href=href;
e.stopPropagation()})};
UiO.setupBlogBannerLowerImage=function setupBlogBannerLowerImage(){
var bannerContainer=$(".grid-container.full-width-picture-bg");
if(bannerContainer.length){
var imgFull=bannerContainer.css("backgroundImage").replace("http:","https:");
var imgLower=imgFull.replace(/(\.(jpg|png|gif)\"\))$/,"-lower$1");
$.ajax({
type:"GET",
url:imgLower.replace(/^url\(\"/,"").replace(/\"\)$/,""),
async:false,
success:function(){
$("body").addClass("has-banner-lower");
UiOProfileResponsive.setupListener("screen and (max-height: 900px)",{
match:function(){
bannerContainer.css("backgroundImage",imgLower)},
unmatch:function(){
bannerContainer.css("backgroundImage",imgFull)}})}})}};
UiO.setupBlogByline=function setupBlogByline(resources,path,isListing,isFeed,isTagListing){
var urlAggregation="/vrtx/__vrtx/app-services/property-query?q=uri%20=%20"+path.replace(/\/$/,"")+"%20AND%20type%20IN%20collection&fields=aggregation,page-limit&sort=publish-date%20desc&format=json-compact&limit=100";
var table,items;
var getAuthors=$.Deferred();
var getAuthorsEnhancements=$.get(blogPath+"include/table.html?x-prevent-decorating",function(body){
table=$($.parseHTML(body)).filter("table")});
if(isListing||isFeed||isTagListing){
$.getJSON(urlAggregation,function(data){
if(data.results&&data.results.length){
var results=data.results;
var pageLimit=25;
for(var i=0,len=results.length;i<len;i++){
var resource=results[i];
if(resource.properties){
if(resource.properties.aggregation){
var aggregation=resource.properties.aggregation;
for(var j=0,len2=aggregation.length;j<len2;j++){
path+="*%20OR%20uri%20=%20"+aggregation[j]}}
if(resource.properties["page-limit"]){
pageLimit=resource.properties["page-limit"]}}}
var tagSearch="";
if(isTagListing){
tagSearch="%20AND%20tags%20=~%20"+UiO.gup(location.href,"tag")}
var pageNr=UiO.gup(location.href,"page");
if(pageNr!=null){
pageNr="&offset="+(pageNr-1)*pageLimit}else
{
pageNr=""}
var url="/vrtx/__vrtx/app-services/property-query?q=(uri%20=%20"+path+"*)%20AND%20type%20IN%20structured-article"+tagSearch+
"&fields=resource:author&sort=publish-date%20desc&format=json-compact&limit="+pageLimit+pageNr;
$.getJSON(url,function(data){
if(data.results&&data.results.length){
items=data.results}
getAuthors.resolve()})}})}else
{
var tagSearch="";
var pageNr="";
var url="/vrtx/__vrtx/app-services/property-query?q=uri%20=%20"+path+"*%20AND%20type%20IN%20structured-article"+tagSearch+
"&fields=resource:author&sort=publish-date%20desc&format=json-compact&limit=5"+pageNr;
$.getJSON(url,function(data){
if(data.results&&data.results.length){
items=data.results}
getAuthors.resolve()})}
$.when(getAuthorsEnhancements,getAuthors).done(function(){
UiO.blogBylineEnhance(resources,table,items,isListing,isFeed,isTagListing)})};
UiO.blogBylineEnhance=function blogBylineEnhance(resources,table,items,isListing,isFeed,isTagListing){
resources.each(function(i){
var resource=$(this);
var item=items[i].properties;
var authors=item&&item["resource:author"]?item["resource:author"]:"";
var authorImage="";
var authorLink="";
if(authors!=""){
for(var i=0;i<authors.length;i++){
var author=authors[i];
var authorElm=table.find('tr td:first-child:contains("'+author+'")');
if(authorLink!=""){
if(i===authors.length-1){
authorLink+=" "+UiO.blogI18n.and+" "}else
{
authorLink+=", "}}
if(authorElm.length){
var authorImageElm=authorElm.next();
var authorImageText=$.trim(authorImageElm.text());
if(authorImageText!=""){
authorImage+="<div class='author-image'><img src='"+authorImageText+"' alt=''></div>"}
var authorAboutElm=authorElm.next().next();
var authorAboutText=$.trim(authorAboutElm.text());
if(authorAboutText!=""){
var authorAboutUrlElm=authorElm.next().next().next();
var authorAboutUrlText=$.trim(authorAboutUrlElm.text());
authorLink+="<a href='javascript:void(0);' class='tooltip-toggle'>"+author+"</a>"+
"<div class='tooltip tooltip-author' style='display: none;'>"+
"<p class='tooltip-title'>"+author+"</p>"+
"<p class='tooltip-meta'>"+authorAboutText+"</p>"+
(authorAboutUrlText!=""?"<p><a href='"+authorAboutUrlText+"' class='tooltip-author-url'>"+UiO.blogI18n.authorMoreAbout+"</a></p>":"")+
'<p><a href="'+blogPath+"?vrtx=search&amp;query=author:&quot;"+author+"&quot;\" class='tooltip-author-search'>"+
UiO.blogI18n.authorAllPosts+
"</a></p>"+
"</div>"}else
{
authorLink+=author}}else
{
authorLink+=author}}}
var publishDate=resource.find(".published-date, .publish-date");
if(!publishDate.length){
publishDate=$("#vrtx-additional-content").find(".published-date")}
publishDate=publishDate.clone();
publishDate.find(".published-date-prefix").remove();
publishDate=$.trim(publishDate.text());
if(!isFeed)publishDate=publishDate.replace(/\s+\S+$/,"");
if(isTagListing)publishDate=publishDate.replace(/^\S+\s+/,"");
var numberOfComments="";
if(isListing){
var comments=resource.find(".vrtx-number-of-comments-add-event-container").remove();
if(false&&comments.length){
numberOfComments="<br/>"+comments.html()}}
var html="<div class='author-published-byline"+(authorImage!=""?" has-author-image":"")+"'>"+
(authorImage!=""?authorImage:"")+
"<span class='author-published'>"+
(authorLink!=""?UiO.blogI18n.authorPrefix+authorLink+"<span class='published-separator'> &mdash; </span>":"")+
"<span class='published'>"+publishDate+"</span>"+
"</span>"+
numberOfComments+
"</div>";
if(isListing||isTagListing||isFeed){
resource.find(".published-date, .publish-date").hide();
$(html).insertAfter(resource.find(".published-date, .publish-date"))}else
{
$(html).insertAfter(resource.find("h1"))}})};
UiO.useBlogPathArticleTag=function useBlogPathArticleTag(){
var elms=$(".vrtx-tags-links a");
elms.each(function(i){
var elm=$(this);
var href=elm.attr("href");
elm.attr("href",href.replace(/(\/\?|\/english\/\?)/,blogPath+"?"))})};
UiO.useFullsizeImages=function useFullsizeImages(elms){
elms.each(function(i){
var elm=$(this);
var img=elm.find("img");
if(img.length){
var src=img.attr("src");
img.attr("src",src.replace("?vrtx=thumbnail",""))}})};
UiO.setupTooltipToggle=function setupTooltipToggle(){
$(document).on("click",".tooltip-toggle",function(e){
var elm=$(this);
var contentElm=elm.next();
if(!contentElm.filter(":visible").length&&$(".tooltip").filter(":visible").length){
$(".tooltip").hide()}
contentElm.css("left",elm.position().left+"px");
contentElm.toggle();
e.stopPropagation();
e.preventDefault()});
$(document).on("click",function(e){
if(!$(e.target).closest(".tooltip").length&&$(".tooltip").filter(":visible").length){
$(".tooltip").hide()}})};
tocTargetId="vrtx-main-content";
UiO.setupToC=function setupToC(){
if(!$("#toc").length)return;
if(UiO.dc.mainContent.length===0){
tocTargetId="main"}
if(typeof tocGen==="undefined"){
UiO.loadScript("/vrtx/decorating/resources/dist/script/toc.js",function(){
tocTargetId="vrtx-main-content";
if(UiO.dc.mainContent.length===0){
tocTargetId="main"}
tocGenElem=new tocGen("toc");
forceScrollToTocIdIfNotScrolled()})}};
UiO.setupToggleMore=function setupToggleMore(){
var headerSelector="> div:first-child, > h2, > h3, > h4, > h5, > h6";
$(".toggle-more-content").each(function(i){
var tmc=$(this);
var header=tmc.parent().find(headerSelector);
header.wrapInner("<a href='javascript:void(0)' />");
UiOProfileARIA.popup.init(header.find("a"),tmc,"toggle-more-link-"+i,"toggle-more-content-"+i)});
setTimeout(function(){
$(".toggle-more-content").each(function(i){
var tmc=$(this);
tmc.data("height",tmc.outerHeight(true)+"px");
tmc.css("height","0px").find("a").attr("tabindex","-1")})},
100);
$("#main").on("click",".toggle-more-content a[href^='#']",function(e){
var href=$(this).attr("href");
var elm=$(href);
if(elm.length){
window.scrollTo(0,elm.offset().top-60)}
e.preventDefault();
e.stopPropagation()});
var handleToggleMoreClick=function(e){
if(e.type==="click"||e.type==="keydown"&&(e.which||e.keycode)===13){
var tw=$(this).closest(".toggle-more");
tw.toggleClass("toggle-more-active");
var tmc=tw.find(".toggle-more-content");
if(tw.hasClass("toggle-more-active")){
tmc.css("height",tmc.data("height"));
UiOProfileARIA.popup.open(tw.find(headerSelector).find("a"),tmc,true)}else
{
tmc.css("height","0px");
UiOProfileARIA.popup.close(tw.find(headerSelector).find("a"),tmc,true)}
e.preventDefault();
e.stopPropagation()}};
$(".row-toggled").each(function(i){
var tmc=$(this).closest(".grid-container");
tmc.addClass("row-toggled-hidden");
var tw=tmc.parent().find(".row-toggle");
tw.closest(".grid-container").addClass("row-toggle-container");
var link=tw.find("h2 a");
if(i===0){
var linkText=link.text();
link.attr("data-link-text",linkText);
link.text($.trim(linkText.split("|")[0]))}
UiOProfileARIA.popup.init(link,tmc,"row-toggle","row-toggled-content-"+i)});
var handleRowToggleClick=function(e){
if(e.type==="click"||e.type==="keydown"&&(e.which||e.keycode)===13){
var link=$(this);
var tw=link.closest(".row-toggle");
tw.toggleClass("row-toggle-visible");
var twContainer=tw.closest(".grid-container");
var linkText=$.trim(link.attr("data-link-text").split("|")[tw.hasClass("row-toggle-visible")?1:0]);
link.text(linkText);
var firstGridContainer=null;
var lastGridContainer=null;
twContainer.parent().find(".grid-container").each(function(){
var gridContainer=$(this);
if(gridContainer.find(".row-toggled").length){
if(firstGridContainer==null){
firstGridContainer=gridContainer}
lastGridContainer=gridContainer;
if(tw.hasClass("row-toggle-visible")){
gridContainer.removeClass("row-toggled-hidden");
UiOProfileARIA.popup.open(tw.find("h2 a"),gridContainer,true)}else
{
gridContainer.addClass("row-toggled-hidden");
UiOProfileARIA.popup.close(tw.find("h2 a"),gridContainer,true)}}});
if(tw.hasClass("row-toggle-visible")){
twContainer.insertAfter(lastGridContainer);
$(".row-toggled, .row-toggled ~ .vrtx-frontpage-box").removeAttr("style");
UiO.equalizeHeight()}else
{
twContainer.insertBefore(firstGridContainer)}
e.preventDefault();
e.stopPropagation()}};
$(document).on("click keydown",".toggle-more > div:first-child, .toggle-more > h2, .toggle-more > h3, .toggle-more > h4, .toggle-more > h5, .toggle-more > h6",handleToggleMoreClick);
$(document).on("click keydown",".toggle-more > div:first-child a, .toggle-more > h2 a, .toggle-more > h3 a, .toggle-more > h4 a, .toggle-more > h5 a, toggle-more > h6 a",handleToggleMoreClick);
$(document).on("click keydown",".row-toggle > h2",handleRowToggleClick);
$(document).on("click keydown",".row-toggle > h2 a",handleRowToggleClick);
$(".row-toggle.row-toggle-expanded a").click()};
(function(){
UiO.IframeHeights={
iframes:[]};
UiO.setupHeightListeningForIframes=function setupHeightListeningForIframes(){
UiO.findHeightSendingIframes();
$(window).on("message",function(e){
if(e.originalEvent)e=e.originalEvent;
var origin=e.origin;
if(UiO.iframeHeightUrlsRegex.test(origin)){
var iframe=null;
var iframesLen=UiO.IframeHeights.iframes.length;
for(var i=0;i<iframesLen;i++){
if(e.source==UiO.IframeHeights.iframes[i].contentWindow)iframe=$(UiO.IframeHeights.iframes[i])}
if(iframe!=null){
if(e.data==="scrollToStart"){
iframe[0].scrollIntoView();
return}
var height=typeof e.data==="string"?parseInt(e.data,10):e.data;
if(!isNaN(height)){
height=height+20;
iframe.height(height+"px");
var responsiveWrapper=iframe.closest(".iframe-overflow-wrapper-outer-responsive");
if(responsiveWrapper.length){
responsiveWrapper.css("height",height+20+"px")}}else
{
UiO.log("Iframe heights: data retrieved was not a number:\n"+iframe[0].src+" ("+typeof e.data+")")}}else
{
UiO.log("Iframe heights: could not find a matching iframe with message source from origin:\n"+origin)}}})};
UiO.findHeightSendingIframes=function findHeightSendingIframes(){
UiO.IframeHeights.iframes=$("iframe").filter(function(){
return UiO.iframeHeightUrlsRegex.test(this.src)})}})();
var surveys=[];
var surveyDialog=null;
var waitALittleLocalSurvey=setTimeout(function(){
$.ajax({
dataType:"script",
cache:false,
url:"/vrtx/decorating/resources/surveys/surveys.js"}).done(
function(){
if(typeof localSurveys==="function"){
localSurveys()}
if(typeof chatBot==="function"){
chatBot()}})},
20);
UiO.setupSurveys=function(){
UiO.isWithinTime(1,1,1984,31,12,2084,function(){
UiO.surveyAdd({
cookieName:"UIO-SURVEY-DEMO",
cookieDomain:"uio.no",
visibleAt:/^http(s)?:\/\/(www\.)?vortex-demo\.uio\.no\//,
surveyUrl:{
no:"https://www.vg.no/",
en:"https://www.vg.no/"},
askAgainLater:true,
"i18n":{
"no":{
"title":"Universitetet i Oslo",
"text":"Vil du hjelpe oss med &aring; forbedre v&aring;re nettsider? Gj&oslash;r det du kom for &aring; gj&oslash;re, og svar når du er ferdig. Unders&oslash;kelsen tar 2-5 minutter, og du er anonym.",
"minimizedText":"Vil du hjelpe oss med &aring; forbedre v&aring;re nettsider?",
"yes":"Ja, jeg vil delta n&aring;",
"no":"Nei takk"},
"en":{
"title":"University of Oslo",
"text":"Would you like to help us improve our web site? Please complete your task, and answer when finished. The survey takes about 2-5 minutes, and you are anonymous.",
"minimizedText":"Would you like to help us improve our web site?",
"yes":"Yes, I'll participate now",
"no":"No thanks"}},
openDialog:function(){
UiO.surveyOpenDialog2(this)}})})};
UiO.surveyAdd=function surveyAdd(cfg){
if(!UiO.hasCookies||!UiO.isNotIframed||UiO.browser.isBadOpera)return;
if(typeof cfg.visibleAt==="object"&&!cfg.visibleAt.test(location.href))return;
if(typeof cfg.visibleAt==="string"&&!$(cfg.visibleAt).filter(":visible").length)return;
if(typeof cfg.visibleAtExclude==="object"&&cfg.visibleAtExclude.test(location.href))return;
if(typeof cfg.visibleAtExclude==="string"&&$(cfg.visibleAtExclude).filter(":visible").length)return;
UiO.loadScript(UiO.resourcesRoot+"components/survey/survey-invitations.js",function(script,textStatus){
cfg.dialogName=cfg.cookieName.toLowerCase();
cfg.dialogTitle=cfg.cookieName.toLowerCase();
cfg.expireDays=365;
cfg.trackOpenSurvey=true;
cfg.openSurvey=UiO.surveyOpen;
cfg.closeDialog=UiO.surveyClose;
surveys[cfg.dialogName]=new SurveyInvitations.Survey(cfg,location.href);
surveys[cfg.dialogName].run()})};
UiO.isWithinTime=function(startDay,startMonth,startYear,stopDay,stopMonth,stopYear,cb){
var d=new Date;
var startTime=new Date(startYear,startMonth-1,startDay,0,0,0);
var stopTime=new Date(stopYear,stopMonth-1,stopDay,0,0,0);
if(location.search=="?survey"){
cb()}else
if(d>=startTime&&d<stopTime){
cb()}};
UiO.surveyOpen=function surveyOpen(lang){
if(this.trackOpenSurvey){
uioTrackVirtual("/survey/"+this.dialogName+"/yes/"+lang+document.location.pathname.replace(/index.htm(l)?$/,""))}
window.location=this.surveyUrl[lang];
return false};
UiO.surveyClose=function surveyClose(){
surveyDialog.close()};
UiO.surveyOpenDialog2=function surveyOpenDialog2(cfg){
var outgoingLinks=/(((((studweb|studentweb|webmail|mail|duo|minestudier).uio)|fsweb).no)|(fronter.(com|uio.no)))/i;
var outgoingLink=null;
var minimizedTimeout=8||cfg.minimizedTimeout;
var dialogName=cfg.dialogName;
var i18n=cfg.i18n;
var lang=!UiO.isPageLangEnglish?"no":"en";
var buttonTexts={
"no":{
"askAgainText":"Hvis du ikke er ferdig med bes&oslash;ket enda:",
"askAgainButtonText":"Svar senere"},
"en":{
"askAgainText":"If your visit isn’t over yet:",
"askAgainButtonText":"Answer later"}};
i18n=i18n[lang];
buttonTexts=buttonTexts[lang];
var body="<div class='uio-app-name survey-logo-wrapper"+(i18n.heading?" survey-logo-smaller":"")+"'>"+
(!cfg.isNotUiO?"<span class='uio-acronym'>UiO</span>":"")+
"<span class='uio-host'>"+i18n.title+"</span>"+
"</div>"+
(i18n.heading?"<h2>"+i18n.heading+"</h2>":"")+
"<p>"+i18n.text+"</p>"+
(cfg.askAgainLater?"<div class='ask-again-later-wrapper'>"+buttonTexts.askAgainText+
"<a href='javascript:void(0);' class='vrtx-button white survey-minimize'>"+buttonTexts.askAgainButtonText+"</a></div>":"")+
"<a href='javascript:void(0);' class='vrtx-button red survey-open'>"+i18n.yes+"</a>"+
"<a href='javascript:void(0);' class='vrtx-button white survey-close'>"+i18n.no+"</a>";
var minimizedBody="<div class='survey-minimized'><p><a href='javascript:void(0);' class='survey-maximize'>"+i18n.minimizedText+"</a></p></div>";
var minimizedStoredKey="SURVEY-MINIMIZED-"+dialogName.toUpperCase();
var isMinimized=cookieUtils.read(minimizedStoredKey)!=null||UiO.responsiveDialog;
UiO.dc.body.on("click",".survey-open",function(e){
surveys[dialogName].openSurvey(lang);
e.preventDefault()});
UiO.dc.body.on("click",".survey-close, .survey-already-answered",function(e){
surveys[dialogName].closeDialog();
if(UiO.responsiveDialog){
UiO.dc.body.css("paddingBottom","0px")}
if(outgoingLink!=null){
window.location=outgoingLink}
e.preventDefault()});
UiO.dc.body.on("click",".survey-minimize",function(e){
surveys[dialogName].config.closeDialog();
if($(".survey-minimized").length){
$(".survey-minimized").toggleClass("hidden")}else
{
$("body").append(minimizedBody)}
if(!UiO.responsiveDialog){
cookieUtils.create(minimizedStoredKey,"yes",cfg.expireDays,cfg.cookieDomain)}else
{
UiO.dc.body.toggleClass("dialog-responsive")}
if(outgoingLink!=null){
window.location=outgoingLink}
e.preventDefault()});
UiO.dc.body.on("click",".survey-maximize",function(e){
$(".survey-minimized").toggleClass("hidden");
surveyDialog.open();
if(!UiO.responsiveDialog){
cookieUtils.erase(minimizedStoredKey,cfg.cookieDomain)}else
{
UiO.dc.body.toggleClass("dialog-responsive")}
e.preventDefault()});
if(isMinimized){
if(UiO.responsiveDialog){
var waitForSurveyDialog=setTimeout(function(){
UiO.dc.body.append(minimizedBody);
UiO.dc.body.css("paddingBottom",$(".survey-minimized").outerHeight())},
minimizedTimeout*1e3)}else
{
$("body").append(minimizedBody)}}
UiO.loadScripts([UiO.vrtxRoot+"js/frameworks/es5-shim-dejavu.js",
UiO.vrtxRoot+"js/vrtx-simple-dialogs.js"],function(){
surveyDialog=new VrtxHtmlDialog({
name:dialogName,
title:cfg.dialogTitle,
html:body,
width:UiO.isPageLangEnglish?600:570});
var checkOutgoingLinks=function(e){
if(outgoingLinks.test(this.href)){
outgoingLink=this.href;
openTheDialog();
return false}};
$(document).on("click","a",checkOutgoingLinks);
var openTheDialog=function(){
if(!cfg.useTimeout){
$(document).off("mouseleave",openTheDialog)}
surveyDialog.open();
var waitForSurveyDialog=setTimeout(function(){
var dialogBody=$(".ui-dialog #dialog-html-"+dialogName);
if(!dialogBody.length){
setTimeout(arguments.callee,10)}else
{
$(".ui-dialog").addClass("ui-dialog-minimal")}},
10)};
if(!isMinimized){
if(!cfg.useTimeout){
$(document).on("mouseleave",openTheDialog)}else
{
var waitForSurveyDialog=setTimeout(function(){
openTheDialog()},
cfg.useTimeout*1e3)}}})};
UiO.surveyOpenDialog=function surveyOpenDialog(cfg){
var dialogName=cfg.dialogName;
var i18n=cfg.i18n;
if(!UiO.responsiveDialog){
var lang=!UiO.isPageLangEnglish?"no":"en";
var buttonTexts={
"no":{
"alreadyAnswered":"Jeg har allerede svart p&aring; unders&oslash;kelsen",
"askAgainText":"Hvis du ikke er ferdig med bes&oslash;ket:",
"askAgainButtonText":"Sp&oslash;r meg igjen senere"},
"en":{
"alreadyAnswered":"I've already answered this survey",
"askAgainText":"If your visit isn't over:",
"askAgainButtonText":"Ask me again later"}};
i18n=i18n[lang];
buttonTexts=buttonTexts[lang];
var body="<h2></h2>"+
"<div class='uio-app-name survey-logo-wrapper'>"+
"<span class='uio-acronym'>UiO</span><span class='uio-host'>"+i18n.title+"</span>"+
"</div>"+
"<p>"+i18n.text+"</p>"+
(cfg.askAgainLater?'<div class="ask-again-later-wrapper">'+buttonTexts.askAgainText+
"<a href=\"javascript:surveys['"+dialogName+'\'].config.closeDialog();" class="vrtx-button white"><span>'+buttonTexts.askAgainButtonText+"</span></a></div>":"")+
"<a href=\"javascript:surveys['"+dialogName+"'].openSurvey('"+lang+'\');" class="vrtx-button red">'+i18n.yes+"</a>"+
"<a href=\"javascript:surveys['"+dialogName+'\'].closeDialog();" class="vrtx-button white">'+i18n.no+"</a>"+
"<a href=\"javascript:surveys['"+dialogName+'\'].closeDialog();" class="vrtx-button white">'+buttonTexts.alreadyAnswered+"</a>";
UiO.loadScripts([UiO.vrtxRoot+"js/frameworks/es5-shim-dejavu.js",
UiO.vrtxRoot+"js/vrtx-simple-dialogs.js"],function(){
surveyDialog=new VrtxHtmlDialog({
name:dialogName,
title:surveys[dialogName].config.dialogTitle,
html:body,
width:UiO.isPageLangEnglish?600:570});
var openTheDialog=function(){
if(!cfg.useTimeout){
$(document).off("mouseleave",openTheDialog)}
surveyDialog.open();
var waitForSurveyDialog=setTimeout(function(){
var dialogBody=$(".ui-dialog #dialog-html-"+dialogName);
if(!dialogBody.length){
setTimeout(arguments.callee,10)}else
{
$(".ui-dialog").addClass("ui-dialog-minimal")}},
10)};
if(!cfg.useTimeout){
$(document).on("mouseleave",openTheDialog)}else
{
var waitForSurveyDialog=setTimeout(function(){
openTheDialog()},
cfg.useTimeout*1e3)}})}};
UiO.setupSearchSurvey=function(){};
UiO.setupMathJax=function(){
var mathTagsSelector=".math-tex";
var mathElms=$(mathTagsSelector);
if(mathElms.length){
var mathSupport="TeX-AMS_HTML";
var waitForHubRetry=15;
var url=location.protocol+"//vrtx.uio.no/js/mathjax/v1/MathJax.js?config="+mathSupport+"&delayStartupUntil=configured";
$("head").append('<script src="'+url+'"><\/script>');
var waitForHub=setTimeout(function(){
if(typeof MathJax!="undefined"){
MathJax.Hub.Config({
elements:["main"],
tex2jax:{
inlineMath:[["$","$"],
["\\(","\\)"]],
skipTags:["h1"],
ignoreClass:"vrtx-introduction"},
menuSettings:{
zoom:"Click"},
MathMenu:{
delay:200,
showLocale:false,
showContext:false,
showMathPlayer:false,
showFontMenu:false,
showRenderer:false},
imageFont:null,
showProcessingMessages:false,
displayAlign:"left",
errorSettings:{
message:["MathJax failed to load script"],
style:{
color:"#e2231a"}}});
MathJax.Hub.Configured();
UiO.log("MathJax loaded with "+mathSupport+" because "+mathTagsSelector+" tags exists")}else
{
setTimeout(arguments.callee,waitForHubRetry)}},
waitForHubRetry)}};
if(!location.hash&&UiO.url.indexOf("hash=")!==-1){
location.hash="#"+UiO.url.replace(/^[^=]+=/,"")}
function addAccordions(selector,isNotInitialized,heading){
isNotInitialized=typeof isNotInitialized==="undefined"?true:isNotInitialized;
heading=typeof heading==="undefined"?"h2":heading;
var accordions=$(selector);
for(var i=0,len=accordions.length;i<len;i++){
var acc=$(accordions[i]);
if(!acc.length)continue;
acc.find(heading).addClass("accordion");
if(isNotInitialized){
UiOProfileAccordions.init(selector,[heading],[".vrtx-date-info"],true)}}}
function removeAccordions(selector,isKeepingHeadingClass){
var accordions=$(selector);
for(var i=0,len=accordions.length;i<len;i++){
var acc=$(accordions[i]);
if(!acc.length)continue;
acc.accordion("destroy");
if(typeof isKeepingHeadingClass==="boolean"&&isKeepingHeadingClass){
acc.find("h2, h3, h4").removeClass("accordion-processed")}else
{
acc.find("h2, h3, h4").removeClass("accordion accordion-processed")}
acc.find(".accordion-content").children().unwrap();
acc.children().removeClass("accordion-processed").unwrap()}}
$(document).ready(function(){
$(document).on("keydown",function(e){
if((e.metaKey||e.ctrlKey)&&String.fromCharCode(e.which).toLowerCase()==="f"){
removeAccordions("#main .accordion-wrapper",true)}})});
UiO.setupDialogs=function setupDialogs(){
$(document).on("click","a.dialog:not(.vrtx-tags-more)",UiO.dialogAjaxOpenListener)};
UiO.dialogAjaxOpenListener=function dialogAjaxOpenListener(){
var link=this;
UiO.dialog=$("#uio-dialog");
UiO.dialogAjaxOkCancel(link);
$.get(link.href.replace("http:",location.protocol),function(results){
UiO.dialogAjaxMakeBody(link,results);
UiO.dialogOpen("dialog",link)});
return false};
UiO.dialogAjaxMakeBody=function dialogAjaxMakeBody(refocusElm,results){
var body=results.match(/<body[\s\S]+<\/body>/gm)[0];
body=body.replace(/(<h1>.*<\/h1>)/,"");
UiO.dialogMake("dialog","uio-dialog",refocusElm,refocusElm.title,body,UiO.dialogButtonize)};
UiO.dialogAjaxOkCancel=function dialogAjaxOkCancel(link){
var dialog=UiO.dialog;
if(!dialog.length){
$(document).on("click","#uio-dialog .vrtx-focus-button input",function(e){
var form=UiO.dialog.find("form");
var data=form.serialize()+"&"+form.find("#submitButtons input[type='submit']").attr("name");
$.post(form.attr("action"),data,function(results){
UiO.dialogAjaxMakeBody(link,results);
UiO.dialog.trigger("reposition");
var closeBtn=UiO.dialog.find("button[onclick], a:contains('Lukk'), a:contains('Close')");
if(closeBtn.length){
closeBtn.addClass("button white");
closeBtn.unbind("click").bind("click",function(){
UiO.dialog.trigger("close");
return false})}}).fail(
function(xhr,textStatus,errorThrown){
if(xhr.status===503){
var msg=UiO.isPageLangEnglish?"You have sent to many e-mails in a short interval. Try again later.":
"Du har forsøkt å sende for mange e-poster i et kort interval. Forsøk igjen senere.";
UiO.dialogOkCreateOpen(link,"503",msg)}});
e.preventDefault();
e.stopPropagation()});
$(document).on("click","#uio-dialog .vrtx-close-dialog",function(e){
UiO.dialog.trigger("close");
e.preventDefault();
e.stopPropagation()})}};
UiO.dialogButtonize=function dialogButtonize(dialog){
dialog.find(".vrtx-focus-button input").addClass("red");
dialog.find(".vrtx-close-dialog").addClass("button white")};
UiO.dialogOkCreateOpen=function(link,title,msg){
UiO.dialogMake("dialogError","uio-dialog-error",link,title,
"<p>"+msg+"</p><a href='javascript:void(0);' class='button red vrtx-close-dialog'>Ok</a>");
UiO.dialogOpen("dialogError",link)};
UiO.dialogOpen=function dialogOpen(dialog,refocusElm){
if(!UiO[dialog]||!UiO[dialog].length)return;
UiO[dialog].lightbox_me({
centered:true,
closeSelector:".vrtx-close-dialog",
onLoad:function(){
var firstElm=UiO[dialog].find("textarea, input").filter(
":visible").filter(":first");
firstElm.focus()},
onClose:function(){
$(refocusElm).focus()}})};
UiO.dialogModal=function dialogModal(id,link,title,msg,btnOk,onOk,onLoad,overlaySpeed){
UiO.dialogMake("dialogError",id,link,title,
"<p>"+msg+"</p><a href='javascript:void(0);' class='button red vrtx-close-dialog'>"+btnOk+"</a>");
UiO.dialogOpen2("dialogError",link,onOk,onLoad,overlaySpeed)};
UiO.dialogOpen2=function dialogOpen2(dialog,refocusElm,onOk,onLoad,overlaySpeed){
if(!UiO[dialog]||!UiO[dialog].length)return;
UiO[dialog].lightbox_me({
centered:true,
closeSelector:".vrtx-close-dialog",
closeClick:false,
closeEsc:false,
overlaySpeed:typeof overlaySpeed==="number"?overlaySpeed:300,
onLoad:function(){
var firstElm=UiO[dialog].find("textarea, input").filter(
":visible").filter(":first");
firstElm.focus();
if(typeof onLoad==="function")onLoad()},
onClose:function(){
$(refocusElm).focus();
if(typeof onOk==="function")onOk()}})};
UiO.dialogMake=function(dialog,id,refocusElm,title,body,fnAfterCreate){
if(!UiO[dialog]||!UiO[dialog].length){
var html=UiO.dialogMakeBodyHtml(id,title,body);
$($.parseHTML(html,document,true)).insertAfter(refocusElm);
UiO[dialog]=$("#"+id)}else
{
UiO[dialog].find(".dialog-body").html(body)}
if(typeof fnAfterCreate==="function"){
fnAfterCreate(UiO[dialog])}};
UiO.dialogMakeBodyHtml=function(id,title,body){
return'<div id="'+id+'" class="lightbox"><div class="lightbox-content">'+
'<div class="header"><h1 class="title">'+title+"</h1></div>"+
'<div class="dialog-body">'+
body+
"</div>"+
"</div></div>"};
UiO.setupTables=function setupTables(){
var tables=$("table");
if(!tables.length)return;
UiO.setupTableSortable(tables);
tables.each(function(){
var table=$(this);
UiO.setupTableVertical(table);
UiO.setupTableOverflowWide(table);
UiO.setupTableFunctions(table);
UiO.setupTableData(table)});
UiO.setupTableVacation(tables)};
UiO.setupTableSortable=function setupTableSortable(tables){
tables.filter("[class*='sortable-']").addClass("sortable");
var sortableTables=tables.filter(".sortable");
if(!sortableTables.length)return;
UiO.loadScript(UiO.resourcesRoot+"lib/tablesort-1.5-custom.js",function(){
var wait=setTimeout(function(){
if(!$("table[class*='sortable'] th[class*='fd-column-']").length){
fdTableSort.init()}},
500);
UiO.setupTableCreateProgram(tables)})};
UiO.setupTableCreateProgram=function setupTableCreateProgram(tables){
if(!tables.filter(".program-create").length)return;
UiO.loadScript(UiO.resourcesRoot+"js/components/create-program.js")};
UiO.setupTableVertical=function setupTableVertical(table){
var tableNumRows=table.find("tbody tr").length;
var tableNumRowHeadings=table.find("tbody tr th[scope='row']").length;
if(tableNumRows===tableNumRowHeadings&&tableNumRows>0){
table.addClass("vertical")}};
var loadedDataTableOnce=false;
var loadedDataTable=$.Deferred();
UiO.setupTableData=function setupTableData(table){
if(table.hasClass("datatable")){
if(!loadedDataTableOnce){
loadedDataTableOnce=true;
$.loadCSS("/vrtx/decorating/resources/dist/src/lib/datatable/datatable.min.css?v2");
UiO.loadScript("/vrtx/decorating/resources/dist/src/lib/datatable/datatable.min.js?v2",function(){
loadedDataTable.resolve()})}
$.when(loadedDataTable).done(function(){
if(UiO.isPageLangEnglish){
var langMoment="en";
var langOpts={
"decimal":"",
"emptyTable":"No data available in table",
"info":"Showing _START_ to _END_ of _TOTAL_ entries",
"infoEmpty":"Showing 0 to 0 of 0 rows",
"infoFiltered":"(filtered from _MAX_ total rows)",
"infoPostFix":"",
"thousands":",",
"lengthMenu":"Show _MENU_ entries",
"loadingRecords":"Loading...",
"processing":"Processing...",
"search":"Search:",
"zeroRecords":"No match found",
"paginate":{
"first":"First",
"last":"Last",
"next":"Next",
"previous":"Previous"},
"aria":{
"sortAscending":": activate to sort column ascending",
"sortDescending":": activate to sort column descending"}}}else
{
var langMoment="nb";
var langOpts={
"decimal":"",
"emptyTable":"Ingen data tilgjengelig i tabellen",
"info":"Viser _START_ til _END_ av _TOTAL_ rader",
"infoEmpty":"Viser 0 til 0 av 0 rader",
"infoFiltered":"(filtrert fra totalt _MAX_ rader)",
"infoPostFix":"",
"thousands":",",
"lengthMenu":"Viser _MENU_ rader",
"loadingRecords":"Laster...",
"processing":"Prosesserer...",
"search":"Søk:",
"zeroRecords":"Ingen match funnet",
"paginate":{
"first":"Første",
"last":"Siste",
"next":"Neste",
"previous":"Forrige"},
"aria":{
"sortAscending":": aktiver for å sortere kolonnen stigende",
"sortDescending":": aktiver for å sortere kolonnen synkende"}}}
$.fn.dataTable.moment("DD.MM.YY",langMoment);
$.fn.dataTable.moment("DD/MM/YY",langMoment);
$.fn.dataTable.moment("DD-MM-YY",langMoment);
$.fn.dataTable.moment("DD.MM.YYYY",langMoment);
$.fn.dataTable.moment("DD/MM/YYYY",langMoment);
$.fn.dataTable.moment("DD-MM-YYYY",langMoment);
$.fn.dataTable.moment("DD MMMM YYYY",langMoment);
$.fn.dataTable.moment("DD MMM YYYY",langMoment);
$.fn.dataTable.moment("D MMMM YYYY",langMoment);
$.fn.dataTable.moment("D MMM YYYY",langMoment);
$.fn.dataTable.moment("DD. MMMM YYYY",langMoment);
$.fn.dataTable.moment("DD. MMM YYYY",langMoment);
$.fn.dataTable.moment("D. MMMM YYYY",langMoment);
$.fn.dataTable.moment("D. MMM YYYY",langMoment);
$.fn.dataTable.moment("YYYY",langMoment);
$.fn.dataTable.moment("HH:mm",langMoment);
$.fn.dataTable.moment("HH:mm:ss",langMoment);
$.fn.dataTable.moment("ddd",langMoment);
$.fn.dataTable.moment("dddd",langMoment);
$.fn.dataTable.moment("X",langMoment);
$.fn.dataTable.moment("x",langMoment);
$(table).DataTable({
"language":langOpts,
filterDelay:200});
var filter=table.prev(".dataTables_filter");
setTimeout(function(){
if(!filter.length){
setTimeout(arguments.callee,25)}else
{
var lbl=filter.find("label");
var lblText=lbl.text().replace(":","");
var input=filter.find("input[type='search']");
input.attr("placeholder",lblText);
lbl.contents().filter(function(){
return this.nodeType==3}).remove()}},
25)})}};
UiO.setupTableOverflowWide=function setupTableOverflowWide(table){
if(table.hasClass("table-wide-overflow")){
table.wrap('<div class="table-wide-overflow-wrapper" />')}
if(table.hasClass("table-wide-no-scroll")){
if(!table.hasClass("table-wide-overflow")){
table.addClass("table-wide-overflow");
table.wrap('<div class="table-wide-overflow-wrapper table-wide-no-scroll-wrapper" />');
var parent=table.parent()}else
{
var parent=table.parent();
parent.addClass("table-wide-no-scroll-wrapper")}
$("<div class='table-wide-no-scroll-placeholder' />").insertAfter(parent);
var waitALittle=setTimeout(function(){
parent.next(".table-wide-no-scroll-placeholder").css("height",+table.outerHeight(true)+"px")},
25)}};
UiO.setupTableFunctions=function setupTableFunctions(table){
var sumCol=table.find("thead th.table-sum");
if(sumCol.length){
var html="<tfoot><tr>";
var colspanLabel=1;
var hasLabel=false;
var colSpans=[];
var colLen=table.find("th").length;
sumCol.each(function(i){
var index=$(this).index()+1;
if(colSpans[i-1]){
colSpans[i-1]=index-colSpans[i-1]}
if(i==colLen-1){
index=colLen-index}
colSpans.push(index)});
sumCol.each(function(i){
var index=$(this).index()+1;
var isPrice=false;
var isThousandSeperated=false;
var sum=0;
if(!hasLabel){
colspanLabel=index-1;
html+="<th colspan='"+colspanLabel+"' scope='row'>Total:</th>";
hasLabel=true}
table.find("td:nth-child("+index+")").each(function(){
var text=$.trim($(this).text());
if(/\,\-$/.test(text)){
isPrice=true}
if(/\d{3} \d{3}/.test(text)){
isThousandSeperated=true}
var num=parseFloat(text.replace(/\s/gim,""),10);
if(!isNaN(num)){
sum+=num}});
var sumFormatted=isThousandSeperated?numberFormat(sum,0,0," "):
sum/parseInt(sum,10)>1?sum.toFixed(2):
sum;
sumFormatted+=isPrice?",-":"";
html+="<td colspan='"+colSpans[i]+"'>"+sumFormatted+"</td>"});
html+="</tr></tfoot>";
table.append(html)}};
function numberFormat(number,decimals,decPoint,thousandsSep){
var n=!isFinite(+number)?0:+number,
prec=!isFinite(+decimals)?0:Math.abs(decimals),
sep=typeof thousandsSep==="undefined"?",":thousandsSep,
dec=typeof decPoint==="undefined"?".":decPoint,
toFixedFix=function(n,prec){
var k=Math.pow(10,prec);
return Math.round(n*k)/k},
s=(prec?toFixedFix(n,prec):Math.round(n)).toString().split(".");
if(s[0].length>3){
s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,sep)}
if((s[1]||"").length<prec){
s[1]=s[1]||"";
s[1]+=new Array(prec-s[1].length+1).join("0")}
return s.join(dec)}
UiO.setupTableVacation=function setupTableVacation(tables){
var tableFixedFirstCol=tables.filter(".table-fixed-first-col");
var tableFixedFirstColCtx=tableFixedFirstCol.closest("#vrtx-main-content");
if(!tableFixedFirstColCtx.length){
tableFixedFirstCol.closest("#vrtx-content").css("position","relative")}else
{
tableFixedFirstColCtx.css("position","relative")}
var vacationTable=tables.filter("#vacation-table");
if(vacationTable.length){
var today=new Date;
var currentWeek=today.getWeekUIO();
var currentWeekPlusOne=currentWeek+1;
var tableCol=vacationTable.find("th:contains('"+currentWeek+"')");
if(tableCol.length){
var vacationTable=$("#vacation-table");
var vacationTableParent=vacationTable.parent();
vacationTableParent.scrollLeft(0);
var tableColScrollPoint=vacationTable.find("thead th:contains('"+Math.max(1,currentWeek-2)+"')");
var pos=tableColScrollPoint.position().left-vacationTable.find("tr:last th:first, tr:last td:first").outerWidth(true);
vacationTableParent.animate({scrollLeft:pos},"fast");
vacationTable.find("td:nth-child("+currentWeekPlusOne+")").css("backgroundColor","#ECF3F9");
vacationTable.find("th:nth-child("+currentWeekPlusOne+")").css("backgroundColor","#c3d3e1");
vacationTable.find(".fake-header td").css("backgroundColor","#DBDEE2");
vacationTable.find(".fake-header td:nth-child("+currentWeekPlusOne+")").css("backgroundColor","#c3d3e1");
var vacationInfo=$("#vacation-info");
var msg=UiO.isPageLangEnglish?"We are now in week":"Vi er nå i uke";
if(vacationInfo.length){
vacationInfo.append(" "+msg+" "+currentWeek+".")}}}};
UiO.setupEventsDatepickerEnhanced=function setupEventsDatepickerEnhanced(){
destroyEventListingDatepicker();
eventListingCalendarOpts.onSelect=function(dateText,inst){
window.location.href="./?date="+dateText};
eventListingCalendarOpts.onChangeMonthYear=function(year,month,inst){
var date=$.datepicker.formatDate("yy-mm",new Date(year,month-1)).toString();
window.location.href="./?date="+date+"#datepicker-open"};
reviveEventListingDatepicker()};
UiO.setupEventsDatepickerToggle=function setupEventsDatepickerToggle(){
var datepicker=$("#vrtx-event-calendar");
if(datepicker.length){
datepicker.prepend("<a href='javascript:void(0);' id='vrtx-event-calendar-toggle' class='toggle-more-opts'>"+(UiO.isPageLangEnglish?"Choose date":"Velg dato")+"</a>");
var datepickerElm=datepicker.find("#datepicker");
UiO.setupEventsDatepickerEnhanced();
if(location.hash==="#datepicker-open"){}else
{
datepickerElm.hide()}
$(document).on("click","#vrtx-event-calendar-toggle",function(e){
datepickerElm.toggle();
if(datepickerElm.filter(":visible").length){
addEventCalendarHash()}else
{
removeEventCalendarHash()}
e.preventDefault();
e.stopPropagation()});
$(document).on("click",function(e){
var elm=$(e.target);
if(elm.attr("id")!=="vrtx-event-calendar-toggle"&&
!elm.hasClass("ui-datepicker-prev")&&
!elm.hasClass("ui-datepicker-next")&&
datepickerElm.filter(":visible").length){
datepickerElm.toggle();
removeEventCalendarHash()}})}};
function addEventCalendarHash(hasAdded){
if(window.history&&window.history.pushState){
if(location.hash!=="#datepicker-open"){
window.history.pushState("","",window.location.pathname+window.location.search+"#datepicker-open")}}}
function removeEventCalendarHash(){
if(window.history&&window.history.pushState){
window.history.pushState("","",window.location.pathname+window.location.search)}}
UiO.setupOperational=function setupOperational(){
$(".operational-messages").each(function(){
$(this).find(".item-title").filter(function(){
return/^(\[LØST\]|\[SOLVED\])/.test($(this).text())}).addClass(
"operational-messages-solved")});
$(".solved-unsolved").each(function(){
$(this).find("tr td").each(function(){
var html=$(this).html();
if($.trim(html)==="x"){
$(this).html("<img src='/vrtx/decorating/resources/dist/src/images/operational/unsolved.png' alt='Uløst' />")}else
if($.trim(html)==="v"){
$(this).html("<img src='/vrtx/decorating/resources/dist/src/images/operational/solved.png' alt='Løst' />")}})})};
UiO.setupPersonEmptyImage=function setupPersonEmptyImage(){
if(UiO.gup(location.href,"vrtx")==="person-view"){
$(".vrtx-person-contactinfo").css("marginLeft",0);
return}
var wrp=$("#vrtx-person #vrtx-person-contact-info-wrapper");
if(!wrp.find(".vrtx-person-image").length){
wrp.prepend("<img class='vrtx-person-image' src='"+UiO.emptyPersonImg+"' alt='' />")}};
UiO.setupPublications=function setupPublications(){
if(document.getElementById("vrtx-publications-wrapper")){
$("#vrtx-publication-tabs").tabs();
var publicationTabs=$(".ui-tabs-nav");
if(publicationTabs.find("li").length>=4&&UiO.documentRightColumn){
publicationTabs.closest(".ui-tabs").addClass("tighter")}
var showSummaryText=UiO.isPageLangEnglish?"Show summary":"Vis sammendrag";
var hideSummaryText=UiO.isPageLangEnglish?"Hide summary":"Skjul sammendrag";
$("a.vrtx-publication-summary").each(function(){
$(this).text(showSummaryText)});
$(document).on("click","a.vrtx-publication-summary",function(e){
var me=$(this);
me.toggleClass("visible");
if(me.hasClass("visible")){
me.next().show();
me.text(hideSummaryText)}else
{
me.next().hide();
me.text(showSummaryText)}
e.preventDefault();
e.stopPropagation()})}};
UiO.setupPersonListing=function setupPersonListing(){
var personListing=$("table.vrtx-person-listing");
if(personListing.length){
var nameElms=personListing.find("tbody tr");
var len=nameElms.length;
if(len){
if(false){
tableRows.closest("table").addClass(
"person-listing-hide-imgs")}else
{
var i=0;
var addEmptyPersonImagesTimeout=20;
var addEmptyPersonImages=setTimeout(function(){
var nameElm=$(nameElms[i]).find("td.vrtx-person-listing-name");
var img=nameElm.find(".vrtx-image");
if(!img.length){
var emptyPersonImageHtml="<a href='"+nameElm.find("a").attr("href")+"' class='vrtx-image'>"+
"<img src='"+UiO.emptyPersonImg+"' alt=''>"+
"</a>";
nameElm.prepend(emptyPersonImageHtml)}
i++;
if(i<len){
setTimeout(arguments.callee,addEmptyPersonImagesTimeout)}},
addEmptyPersonImagesTimeout)}}
var emails=personListing.find(".vrtx-person-listing-email a");
for(var j=0,len2=emails.length;j<len2;j++){
var email=$(emails[j]);
var emailText=email.text();
if(!email.find("span").length&&emailText.indexOf("@")!==-1){
var emailSplit=emailText.split("@");
email.html("<span>"+emailSplit[0]+"</span>"+
"<span>@"+emailSplit[1]+"</span>")}}}
if(UiO.bodyId==="vrtx-person-listing"){
var personListingAddContent=$(".vrtx-additional-content");
if(personListingAddContent.length){
var searchContainer=$(".vrtx-search-container");
var tagsContainer=$(".vrtx-tags-container");
var departmentsContainer=$(".vrtx-departments-container");
if(searchContainer.length){
personListingAddContent.prepend(searchContainer.remove());
if(departmentsContainer.length){
$(departmentsContainer.remove()).insertAfter(".vrtx-search-container")}}
if(departmentsContainer.length&&tagsContainer.length){
$(".vrtx-departments-container, .vrtx-tags-container").wrapAll("<div class='vrtx-departments-tags-container' />");
var contact=searchContainer.find("h3 ~ h3, h3 ~ h3 + *");
if(contact.length){
$(".vrtx-departments-tags-container").prepend(contact.remove())}
departmentsContainer.find(">*").unwrap();
tagsContainer.find(">*").unwrap();
addAccordions(".vrtx-departments-tags-container",false,"h3")}
var paragraphs=personListingAddContent.find("p, h3");
paragraphs.each(function(){
var elm=$(this);
if($.trim(elm.html())==="&nbsp;"){
elm.remove()}})}}};
UiO.setupHeaderSearch=function setupHeaderSearch(){
var logo=$(".not-for-ansatte .uio-app-name").filter(":visible");
if(logo.length||UiO.dc.body.hasClass("collapsed-header-search")){
var headerSearch=$(".header-search");
if(headerSearch.length){
var headerSearchForm=headerSearch.find("> form");
UiO.dc.body.addClass("header-search-collapsable header-search-collapsed");
var headerSearchExpand="<a href='javascript:void(0);' class='header-search-expand'>"+
headerSearch.find("button").text()+
"</a>";
$(headerSearchExpand).insertAfter(headerSearchForm);
UiO.dc.body.on("click",".header-search-expand",function(e){
UiO.dc.body.toggleClass("header-search-collapsed");
if(!UiO.dc.body.hasClass("header-search-collapsed")){
headerSearchForm.find("input[type='text']").focus()}
e.stopPropagation();
e.preventDefault()});
$(document).on("click","body",function(e){
if(!$(e.target).closest(".header-search").length&&
!UiO.dc.body.hasClass("header-search-collapsed")){
UiO.dc.body.addClass("header-search-collapsed")}})}}};
UiO.setupUBSearch=function setupUBSearch(){
var forms=$("form[name='searchForm-default_scope']");
if(forms.length){
var field=forms.find("input[type='text']");
field.val(field.val().replace(/^any\,contains\,/,""));
var btnWidth=forms.find("button[type='submit']").outerWidth()+13;
field.css("borderRightWidth",btnWidth+"px");
$(document).on("click","form[name='searchForm-default_scope'] button[type='submit']",function(e){
var form=$(this).closest("form");
var input=form.find("input[type='text']");
var val=input.val();
if($.trim(val)!=""){
input.attr("name","queryTemp");
var newInput="<input type='hidden' style='display:none' value='' name='query' />";
form.find("fieldset").prepend(newInput);
form.find("fieldset > input:first-child").val("any,contains,"+val.replace(/[,]/g," "))}})}};
UiO.setupForEmployeesSearch=function setupForEmployeesSearch(){
if(!/^https?:\/\/(www\.)?uio\.no\/(for-ansatte|english\/for-employees)\//.test(this.url))return;
var filters=$(".vrtx-search-main-links-box a");
if(filters.length){
filters.each(function(){
var link=$(this);
var href=link.attr("href");
if(/uio\.no\/english(\/)?\?/.test(href)){
link.attr("href",href.replace(/(\/)?\?/,"/for-employees/?").replace(/vrtx=searchuio/,"vrtx=search"))}else
if(/uio\.no(\/)?\?/.test(href)){
link.attr("href",href.replace(/(\/)?\?/,"/for-ansatte/?").replace(/vrtx=searchuio/,"vrtx=search"))}})}};
UiO.setupAutocomplete=function setupAutocomplete(){
var courses=$("form#emner");
var persons=$("#person-search");
var extraWidth=!UiO.isPageLangEnglish?32:12;
var initAutocomplete=function(){
if(courses.length){
UiO.autocompleteFormFix(courses);
UiO.loadScript(UiO.vrtxRoot+"js/autocomplete/autocomplete-emner.js",function(){
var emnerParams={
selectFirst:false,
width:courses.width(),
max:50,
delay:75};
emnerAutocomplete("course-search","emner",emnerParams);
gotoEmnerAutocompleteSuggestion("course-search")})}
if(persons.length){
UiO.autocompleteFormFix(persons);
if(typeof personerAutocompleteComponents==="object"){
UiO.loadScripts([UiO.vrtxRoot+"js/autocomplete/autocomplete-main.js",
UiO.vrtxRoot+"js/autocomplete/autocomplete-personer.js"],function(){
for(var key in personerAutocompleteComponents){
var personerAutocompleteComponent=personerAutocompleteComponents[key];
personerAutocompleteComponent.params.width=persons.closest("form").width();
personerAutocomplete(key,personerAutocompleteComponent.type,
personerAutocompleteComponent.params,
personerAutocompleteComponent.scope,
personerAutocompleteComponent.areacode,
personerAutocompleteComponent.lang,
personerAutocompleteComponent.affiliation);
gotoPersonerAutocompleteSuggestion(key)}})}}};
if(typeof $.fn.autocomplete!=="function"&&(courses.length||persons.length)){
UiO.loadScript(UiO.vrtxRoot+"jquery/plugins/jquery.autocomplete.js",initAutocomplete)}else
{
initAutocomplete()}};
UiO.autocompleteFormFix=function autocompleteFormFix(form){
var btn=form.find("button");
if(UiO.isPageLangEnglish&&btn.length&&btn.text()==="Søk"){
var span=btn.find("span");
if(span.length){
span.text("Search")}else
{
btn.text("Search")}}};
UiO.setupGalleryNew=function setupGalleryNew(){
UiO.addCfg({
numberOfThumbsVisible:[4,4,6],
adjustCenter:[15,15,0],
startIndex:2});
var galleries=$(".vrtx-image-listing-include");
var numberOfThumbsVisible=UiO.dc.rightMain.length?UiO.documentRightColumn?this.cfg.numberOfThumbsVisible[0]:
this.cfg.numberOfThumbsVisible[1]:
this.cfg.numberOfThumbsVisible[2];
var adjustCenter=UiO.dc.rightMain.length?UiO.documentRightColumn?this.cfg.adjustCenter[0]:
this.cfg.adjustCenter[1]:
this.cfg.adjustCenter[2];
var startIndex=this.cfg.startIndex;
var triedToMoveInFullscreen=false;
galleries.each(function(){
var gallery=$(this);
var toggleFullscreen=gallery.find(".toggle-fullscreen-container").filter(":first").clone();
toggleFullscreen.find("a").text("");
var next=gallery.find("a.next");
next.append(toggleFullscreen);
var thumbnails=gallery.find(".vrtx-image-listing-include-thumbs");
if(!thumbnails.is(":visible"))return;
$("<a href='javascript:void(0);' class='thumbs-prev-row'></a>").insertBefore(thumbnails);
$("<a href='javascript:void(0);' class='thumbs-next-row'></a>").insertAfter(thumbnails);
var thumbsPrevRowWidth=$(".thumbs-prev-row").width()+adjustCenter;
thumbnails.data({
"count":startIndex,
"maxCount":thumbnails.find("li").length,
"leftExtra":thumbsPrevRowWidth});
thumbnails.css("left",thumbsPrevRowWidth+"px")});
var moveThumbnails=function(thumbnails){
var pos=thumbnails.find("li:nth-child("+thumbnails.data("count")+")").position();
thumbnails.css("left",-(pos.left-thumbnails.data("leftExtra"))+"px");
if(pos.left===0)triedToMoveInFullscreen=true};
var moveThumbnailsPrevNext=function(e,elm,cbSetCount){
var parent=$(elm).parent();
var thumbnails=parent.find(".vrtx-image-listing-include-thumbs");
cbSetCount(thumbnails);
moveThumbnails(thumbnails);
e.stopPropagation();
e.preventDefault()};
var prevNextImageKeyArrows=function(e,dontKnowWhichGallery){
var parent=typeof dontKnowWhichGallery==="undefined"?$(this).parent():dontKnowWhichGallery;
var thumbnails=parent.find(".vrtx-image-listing-include-thumbs");
var waitALittle=setTimeout(function(){
var active=thumbnails.find(".active").parent().index()+1;
if(active-1==thumbnails.data("maxCount")&&thumbnails.data("count")==startIndex){
var remainder=thumbnails.data("maxCount")%numberOfThumbsVisible;
thumbnails.data("count",thumbnails.data("maxCount")-(remainder>0?remainder:numberOfThumbsVisible)+startIndex);
moveThumbnails(thumbnails)}else
if(active==startIndex&&thumbnails.data("count")>startIndex){
thumbnails.data("count",startIndex);
moveThumbnails(thumbnails)}else
if(active>thumbnails.data("count")+(numberOfThumbsVisible-1)){
$(".thumbs-next-row").click()}else
if(active<thumbnails.data("count")){
$(".thumbs-prev-row").click()}},
10)};
var moveThumbnailsNext=function(e){
moveThumbnailsPrevNext(e,this,function(thumbnails){
thumbnails.data("count",Math.min(thumbnails.data("count")+numberOfThumbsVisible,thumbnails.data("maxCount")+startIndex))})};
var moveThumbnailsPrev=function(e){
moveThumbnailsPrevNext(e,this,function(thumbnails){
thumbnails.data("count",Math.max(thumbnails.data("count")-numberOfThumbsVisible,startIndex))})};
var keyDownMoveThumbnailsPrevNext=function(e){
if(e.keyCode===37||e.keyCode===39){
var waitALittle=setTimeout(function(){
prevNextImageKeyArrows(e,galleries.filter(":first"))},
10)}};
var mouseOver=function(e){
$(this).addClass("hover")};
var mouseLeave=function(e){
$(this).removeClass("hover")};
bindGalleryNewEventHandlers=function(){
$(document).on("click",".thumbs-next-row",moveThumbnailsNext);
$(document).on("click",".thumbs-prev-row",moveThumbnailsPrev);
$(document).on("keydown",keyDownMoveThumbnailsPrevNext);
var imgListingContainer=$(".vrtx-image-listing-include-container");
imgListingContainer.bind("click",prevNextImageKeyArrows);
imgListingContainer.bind("mouseover focus",mouseOver);
imgListingContainer.bind("mouseleave blur",mouseLeave)};
unbindGalleryNewEventHandlers=function(){
$(document).off("click",".thumbs-next-row",moveThumbnailsNext);
$(document).off("click",".thumbs-prev-row",moveThumbnailsPrev);
$(document).off("keydown",keyDownMoveThumbnailsPrevNext);
var imgListingContainer=$(".vrtx-image-listing-include-container");
imgListingContainer.unbind("click",prevNextImageKeyArrows);
imgListingContainer.unbind("mouseover focus",mouseOver);
imgListingContainer.unbind("mouseleave blur",mouseLeave)};
bindGalleryNewEventHandlers();
galleryNewMoveThumbnails=prevNextImageKeyArrows;
if(typeof checkVisibleAndTriedToMoveInFullscreen!=="undefined"){
clearInterval(checkVisibleAndTriedToMoveInFullscreen)}
checkVisibleAndTriedToMoveInFullscreen=setInterval(function(){
if(triedToMoveInFullscreen&&!UiO.responsiveDialog&&!$("html").hasClass("fullscreen-gallery")){
galleries.each(function(){
var gallery=$(this);
var thumbnails=gallery.find(".vrtx-image-listing-include-thumbs");
moveThumbnails(thumbnails)});
triedToMoveInFullscreen=false}},
75)};
$(document).ready(function(){
var leftPadDayMonth=function(d){
return d<10?"0"+d:d};
var formatDate=function(date){
var day=leftPadDayMonth(date.getDate());
var month=leftPadDayMonth(date.getMonth()+1);
var year=date.getFullYear();
return day+"."+month+"."+year};
$("#vrtx-additional-content").prepend($("#vrtx-helseforsk #vrtx-additional-content .vrtx-helseforsk-login-component").remove());
$("#vrtx-helseforsk, #vrtx-personal-data").find(".vrtx-document-timestamp").each(function(){
var elm=$(this);
var timestamp=$.trim(elm.text()).match(/^([\d]+)$/i);
if(timestamp.length===2){
var dt=new Date(Math.round(parseFloat(timestamp[1],10)));
elm.text(formatDate(dt))}});
var helseforskCreate=$("#vrtx-helseforsk-create-project");
if(helseforskCreate.length){
$(helseforskCreate.remove()).insertAfter("h1")}
var listingSubfolderMenu=$("#vrtx-helseforsk-listing #total-main .vrtx-subfolder-menu, #vrtx-personal-data-listing #total-main .vrtx-subfolder-menu");
if(listingSubfolderMenu.length){
var listingSubfolderMenuUls=listingSubfolderMenu.find("> ul");
if(listingSubfolderMenuUls.length===2)listingSubfolderMenu.addClass("vrtx-subfolder-menu-sets-2")}
if(UiO.bodyId==="vrtx-helseforsk"&&/\?vrtx=admin&mode=ajaxeditor$/gi.test(document.referrer)){
$.get(location.href+"?v="+ +new Date,function(data){
var html=$($.parseHTML(data)).find("#vrtx-content").html();
$("#vrtx-content").html(html)})}
if(UiO.bodyId==="vrtx-helseforsk-listing"&&document.referrer===""){
$.get(location.href+"?v="+ +new Date,function(data){
var html=$($.parseHTML(data)).find("#vrtx-helseforsk-listing-results").html();
$("#vrtx-helseforsk-listing-results").html(html)})}
$("#vrtx-personal-data #vrtx-additional-content a").each(function(){
var href=this.href;
this.href=href.replace(/&amp;/gim,"&")});
var researchersToggleI18n={
"no":{
"show":"Vis alle forskere",
"hide":"Skjul alle forskere"},
"en":{
"show":"Show all researchers",
"hide":"Hide all researchers"}};
var researchersToggleI18n=researchersToggleI18n[UiO.isPageLangEnglish?"en":"no"];
var researchers=$("#vrtx-helseforsk h2:contains('Forskere') + ul, #vrtx-helseforsk h2:contains('Researchers') + ul");
if(researchers.length){
researchers.attr("id","vrtx-helseforsk-researchers");
var researchersList=researchers.find("li");
if(researchersList.length>6){
researchersList.filter(":nth-child(n+7)").addClass("hidden");
$("<a href='javascript:void(0);' aria-controls='vrtx-helseforsk-researchers' aria-expanded='false' class='vrtx-list-toggle-more'>"+researchersToggleI18n.show+"</a>").insertAfter(researchers);
$(document).on("click",".vrtx-list-toggle-more",function(e){
var link=$(this);
link.prev("ul").find(":nth-child(n+7)").toggleClass("hidden");
if(link.attr("aria-expanded")==="false"){
link.attr("aria-expanded","true");
link.text(researchersToggleI18n.hide)}else
{
link.attr("aria-expanded","false");
link.text(researchersToggleI18n.show)}
e.stopPropagation();
e.preventDefault()})}}
$("#vrtx-helseforsk-listing-results, #vrtx-personal-data-listing-results").find("tr").on(
"mouseover",function(e){
$(this).addClass("hover")}).on(
"mouseleave",function(e){
$(this).removeClass("hover")})});
!function(t,e){"use strict";if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.USE_MUTATION_OBSERVER=!0,i.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(r(t,"resize",this._checkForIntersections,!0),r(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),n=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(i){var r=i.element,s=h(r),c=this._rootContainsTarget(r),a=i.entry,u=e&&c&&this._computeTargetAndRootIntersection(r,n),l=i.entry=new o({time:t.performance&&performance.now&&performance.now(),target:r,boundingClientRect:s,rootBounds:n,intersectionRect:u});a?e&&c?this._hasCrossedThreshold(a,l)&&this._queuedEntries.push(l):a&&a.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,o){if("none"!=t.getComputedStyle(n).display){for(var i,r,s,c,u,l,p,d,f=h(n),g=a(n),_=!1;!_;){var v=null,m=1==g.nodeType?t.getComputedStyle(g):{};if("none"==m.display)return;if(g==this.root||g==e?(_=!0,v=o):g!=e.body&&g!=e.documentElement&&"visible"!=m.overflow&&(v=h(g)),v&&(i=v,r=f,void 0,void 0,void 0,void 0,void 0,void 0,s=Math.max(i.top,r.top),c=Math.min(i.bottom,r.bottom),u=Math.max(i.left,r.left),l=Math.min(i.right,r.right),d=c-s,!(f=(p=l-u)>=0&&d>=0&&{top:s,bottom:c,left:u,right:l,width:p,height:d})))break;g=a(g)}return f}},i.prototype._getRootRect=function(){var t;if(this.root)t=h(this.root);else{var n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var i=0;i<this.thresholds.length;i++){var r=this.thresholds[i];if(r==n||r==o||r<n!=r<o)return!0}},i.prototype._rootIsInDom=function(){return!this.root||c(e,this.root)},i.prototype._rootContainsTarget=function(t){return c(this.root||e,t)},i.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},i.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=o}function o(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,i=o.width*o.height;this.intersectionRatio=n?i/n:this.isIntersecting?1:0}function i(t,e){var n,o,i,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),o=this.THROTTLE_TIMEOUT,i=null,function(){i||(i=setTimeout(function(){n(),i=null},o))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function r(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function h(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function c(t,e){for(var n=e;n;){if(n==t)return!0;n=a(n)}return!1}function a(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}}(window,document);
var createObserver=function(elm){
var numSteps=20;
var prevRatio=0;
var width=parseInt(elm.attr("width"),10);
var height=parseInt(elm.attr("height"),10);
var container=elm.parent();
container.css({
"width":width+"px",
"height":height+40+"px",
"position":"relative"});
container.append("<span class='placeholder-lazy-loaded-img' style='width: "+width+"px; height: "+height+"px;'></span>");
var observer=new IntersectionObserver(function(entries,self){
$.each(entries,function(i,entry){
if(entry.isIntersecting){
var img=entry.target;
var src=$(img).attr("data-src");
if(src){
img.src=src;
img.onload=function(){
$(this).parent().find(".placeholder-lazy-loaded-img").addClass("placeholder-lazy-loaded-img-animate-out");
container.removeAttr("style")};
$(img).removeAttr("data-src");
self.unobserve(entry.target)}}})},
{
root:null,
rootMargin:"0px",
threshold:[0,.25,.5,.75,1]});
observer.observe(elm[0])};
$(document).ready(function(){
$("img[data-src]").each(function(){
createObserver($(this))})});
if($("#office-ticket-framed").length){
window.addEventListener("message",receiveOfficeMessage,false);
function receiveOfficeMessage(e){
console.log(e.origin);
if(typeof e.data==="string"&&/^https:\/\/vortex(test)?-office\.uio\.no/.test(e.origin)){
switch(e.data){
case"office-session-expiry-nor":
window.officeI18n={
title:"Sesjonen din er i ferd med å utløpe",
msg:"Du må oppdatere siden.",
btnOk:"Oppdater"};
openMessageDialog();
break;
case"office-session-expiry-eng":
window.officeI18n={
title:"Your session is about to expire",
msg:"You have to refresh the page.",
btnOk:"Refresh"};
openMessageDialog();
break;
default:
break}}}}
var runOnce=false;
function openMessageDialog(){
if(runOnce)return;
runOnce=true;
$("#office-ticket-framed").addClass("disabled");
$(window).resize(dialogModalResponsive).resize(
dialogModalResponsive).scroll(
dialogModalResponsive);
UiO.dialogModal("uio-dialog-office-session-expiry",$("#main"),officeI18n.title,officeI18n.msg,officeI18n.btnOk,function(){
$("#office-ticket-framed").addClass("disabled-loading");
location.reload(true)},
dialogModalResponsive)}
function dialogModalResponsive(){
if(!UiO.responsiveDialog)return;
var dialog=$("#uio-dialog-office-session-expiry");
if(!dialog.length)return;
var iframe=$("#main iframe:first");
if(!iframe.length)return;
dialog.css({
"top":iframe.offset().top-100,
"left":15,
"minHeight":iframe.height()+50,
"width":iframe.width()})}
$(document).ready(function(){
if($("html.office").length){
$("a:not([target]), form:not([target])").attr("target","_top")}});
(function(){
jQuery.easing["jswing"]=jQuery.easing["swing"];
jQuery.extend(jQuery.easing,{
def:"easeOutQuad",
swing:function(x,t,b,c,d){
return jQuery.easing[jQuery.easing.def](x,t,b,c,d)},
easeInQuad:function(x,t,b,c,d){
return c*(t/=d)*t+b},
easeOutQuad:function(x,t,b,c,d){
return-c*(t/=d)*(t-2)+b},
easeInOutQuad:function(x,t,b,c,d){
if((t/=d/2)<1)return c/2*t*t+b;
return-c/2*(--t*(t-2)-1)+b}});
$(document).ready(function(){
if(!$(".vrtx-listing-filter-custom").length)return;
var boxes=$("#vrtx-main-content .grid-container .vrtx-frontpage-box").filter(":not(:first):not(.filter-always-visible)");
$(document).on("click",".vrtx-listing-filter-custom a",function(e){
var link=$(this);
var li=link.parent();
var id=link.attr("id");
if(id==="checkAll"){
li.addClass("selected");
li.nextAll().removeClass("selected")}else
{
li.toggleClass("selected");
li.parent().find("#checkAll").parent().removeClass("selected")}
var idsSelected=[];
var selectedElms=li.parent().find(".selected");
for(var i=0;i<selectedElms.length;i++){
var selectedElm=selectedElms[i];
var id=$(selectedElm).find("a").attr("id");
idsSelected.push(id)}
if(idsSelected.length===0){
$("#checkAll").parent().addClass("selected")}
boxes.removeClass("visible");
if(idsSelected.length===1&&idsSelected[0]==="checkAll"||idsSelected.length===0){
boxes.closest(".grid-container:not(:visible)").slideDown(200,"easeInOutQuad")}else
{
for(var i=0;i<idsSelected.length;i++){
var id=idsSelected[i];
boxes.filter(".checked-"+id).closest(".grid-container:not(:visible)").slideDown(200,"easeInOutQuad");
boxes.filter(".checked-"+id).addClass("visible")}
boxes.filter(":not(.visible)").closest(".grid-container:visible").slideUp(200,"easeInOutQuad")}
e.stopPropagation();
e.preventDefault()})})})();
UiO.handleVrtxVideo=function handleVrtxVideo(){
updateVideoIframe();
$(window).on("orientationchange",updateVideoIframe);
$(window).on("resize",updateVideoIframe);
$(".vrtx-media-button-holder").each(function(){
var videoMenu=$(this);
if(videoMenu.length&&$.trim(videoMenu.text())===""){
videoMenu.remove()}})};
function updateVideoIframe(){
var iframes=$("html:not(.special-page-config):not(.special-page-config-header-minimal) iframe[src^='https://vrtx.uio.no/videojs/']");
for(var i=iframes.length;i--;){
var iframe=$(iframes[i]);
if(iframe.attr("data-orig-width")==null){
var width=parseInt(iframe.attr("width"),10);
var height=parseInt(iframe.attr("height"),10);
var r=width/height;
iframe.attr("data-orig-width",width);
iframe.attr("data-orig-height",height);
iframe.attr("data-aspect-ratio",r)}else
{
var width=parseInt(iframe.attr("data-orig-width"),10);
var height=parseInt(iframe.attr("data-orig-height"),10);
var r=parseFloat(iframe.attr("data-aspect-ratio"),10)}
var winWidth=$(iframe).width();
if(width>winWidth){
iframe.attr("height",winWidth/r)}else
{
iframe.attr("height",height)}}}
UiO.setupSpecial=function setupSpecial(){
var sp=$(".special-page-config, .special-page-config-header-minimal");
if(!sp.length)return;
setupMinimalHeader();
setupBodyGridContainerClasses();
setupPinnedImages();
setupPinnedVideos();
setupPinnedBig();
setupScrollListeners();
videoRitmo();
figureList();
resizeBannerVideo()};
function setupScrollListeners(){
spFadeInStart();
window.addEventListener("scroll",spThrottle(spHandleScroll,0));
window.addEventListener("scroll",spThrottle(spHandleGalleryScroll,0));
window.addEventListener("scroll",spThrottle(spHandleGalleryFullScroll,0));
window.addEventListener("resize",spThrottle(spHandleGalleryFullResize,0));
spFadeIn();
spHandleGalleryScroll();
var waitALittle=setTimeout(function(){
spHandleGalleryFullScroll()},
5)}
function setupMinimalHeader(){
if($(".special-page-config-header-minimal").length){
var elmHost=$(".uio-host:not(.uio-host-resp)");
if(elmHost.length){
var host=elmHost.text();
var hostLink=elmHost.attr("href")}else
{
var host=location.hostname.replace(/^www./,"").replace(/(\.uio?)\.no$/,"");
host=host.charAt(0).toUpperCase()+host.slice(1);
var hostLink="https://"+location.hostname+"/"}
var html='<div class="uio-app-line-top">'+
'<div class="uio-logo-wrapper"><div class="uio-app-name survey-logo-wrapper"><a href="https://www.uio.no/" class="uio-acronym">UiO</a><a href="'+hostLink+'" class="uio-host" tabindex="-1">'+host+"</a></div></div>"+
"</div>";
$("#head-wrapper").prepend(html)}}
function setupBodyGridContainerClasses(){
var logoTopVideo=$(".special-logo-video");
if(logoTopVideo.length){
logoTopVideo.closest(".grid-container").addClass("special-logo-video-grid-container");
$("body").addClass("special-page-logo-video-top");
if(logoTopVideo.hasClass("special-pinned-big")){
$("body").addClass("special-page-special-pinned-big-top")}}
$(".special-logo-video-wide").each(function(){$(this).closest(".grid-container").addClass("special-logo-video-wide-grid-container")});
$(".special-logo-image").each(function(){$(this).closest(".grid-container").addClass("special-logo-image-grid-container")});
$(".special-image-fullwidth").each(function(){$(this).closest(".grid-container").addClass("special-image-fullwidth-grid-container")});
$(".special-content-fullwidth").each(function(){$(this).closest(".grid-container").addClass("special-content-fullwidth-grid-container")});
$(".special-image-two-column").each(function(){$(this).closest(".grid-container").addClass("special-image-two-column-grid-container")})}
function setupPinnedImages(){
$(".special-pinned").each(function(){
$(this).closest(".grid-container").addClass("special-pinned-grid-container")});
$("*:not(.special-pinned-grid-container) + .special-pinned-grid-container").each(function(){
$(this).nextUntil(":not(.special-pinned-grid-container)").andSelf().wrapAll("<div class='special-pinned-wrapper' />")});
$(".special-pinned-wrapper .special-pinned-grid-container:first-child .vrtx-frontpage-box .vrtx-frontpage-box-picture").addClass("visible")}
function setupPinnedVideos(){
$(".special-pinned-video").each(function(){
$(this).closest(".grid-container").addClass("special-pinned-video-grid-container");
$(this).prepend("<div class='vrtx-frontpage-box-picture' />");
$(this).find(".vrtx-frontpage-box-picture").append($(this).find(".vrtx-media-player").remove())});
$("*:not(.special-pinned-video-grid-container) + .special-pinned-video-grid-container").each(function(){
$(this).nextUntil(":not(.special-pinned-video-grid-container)").andSelf().wrapAll("<div class='special-pinned-video-wrapper' />")});
$(".special-pinned-video-wrapper .special-pinned-video-grid-container:first-child .vrtx-frontpage-box .vrtx-frontpage-box-picture").addClass("visible")}
function setupPinnedBig(){
$(".special-pinned-big").each(function(){
$(this).closest(".grid-container").addClass("special-pinned-big-grid-container");
var mediaPlayer=$(this).find(".vrtx-media-player");
if(mediaPlayer.length){
$(this).prepend("<div class='vrtx-frontpage-box-picture' />");
$(this).find(".vrtx-frontpage-box-picture").append(mediaPlayer.remove())}});
$("*:not(.special-pinned-big-grid-container) + .special-pinned-big-grid-container, .special-pinned-big-grid-container:first-child").each(function(){
$(this).nextUntil(":not(.special-pinned-big-grid-container)").andSelf().wrapAll("<div class='special-pinned-big-wrapper' />")});
$(".special-pinned-big-wrapper .special-pinned-big-grid-container:first-child").addClass("visible")}
function videoRitmo(){
var logoVideo=$(".special-logo-video-grid-container video");
var hasVideo=!!document.createElement("video").canPlayType&&
!!document.createElement("video").canPlayType("video/mp4");
if(!hasVideo){
logoVideo.hide();
logoVideo.closest(".grid-container").find("img").show()}}
function figureList(){
$(".figure-list-circle").each(function(){
var figureList=$(this);
var widthFirst=0;
figureList.find("img").each(function(i){
var img=$(this);
if(i===0){
widthFirst=img.width()}
img.css("width",widthFirst);
img.css("height",widthFirst)})});
$(".figure-list-five-column figure > a, .figure-list figure > a").attr("tabindex","-1")}
function resizeBannerVideo(){
UiOProfileResponsive.responsiveListen({
match:function(){
$(window).trigger("resize")},
unmatch:function(){
$(window).trigger("resize")}});
if(!$("h1 span").length){
$("h1").html("<span>"+$("h1").html()+"</span>")}
var resizeVideo=function(){
$(".special-pinned-video").each(function(){
var resizedVideo=$(this).find(".vrtx-media-player iframe");
if(resizedVideo.length){
var w=parseInt(resizedVideo.attr("width"),10);
var h=parseInt(resizedVideo.attr("height"),10);
var vidW=resizedVideo.width();
h=vidW/(w/h);
resizedVideo.css("height",h)}});
$(".special-logo-video-wide, .special-logo-image").each(function(){
var box=$(this);
var isNotSpecialPinnedBig=!box.hasClass("special-pinned-big");
if(isNotSpecialPinnedBig||UiO.responsiveDialog&&isNotSpecialPinnedBig){
var resizedVideo=$(this).find(".vrtx-media-player iframe");
if(resizedVideo.length){
var w=parseInt(resizedVideo.attr("width"),10);
var h=parseInt(resizedVideo.attr("height"),10);
var winW=$(window).width();
winW=UiO.responsiveDialog?winW:Math.max(1e3,winW);
h=winW/(w/h);
resizedVideo.css("width",winW);
resizedVideo.css("height",h)}else
{
var resizedVideo=$(this).find("img");
if(!resizedVideo.length)return}
var resizedVideoHeight=resizedVideo.height()}else
{
var resizedVideoHeight=$(window).height();
if(!$(".special-page-config-header-minimal").length){
resizedVideoHeight-=$("#head-wrapper").height()}}
var top=resizedVideoHeight+(UiO.responsiveDialog?40:60);
if(box.hasClass("special-logo-intro-over")){
var heightOver=$("h1").height()+40+$(".vrtx-introduction").outerHeight(true)+60+40;
var extraSpace=0;
if(resizedVideoHeight-heightOver>150){
extraSpace=100}
heightOver+=extraSpace;
top-=UiO.responsiveDialog&&isNotSpecialPinnedBig?0:heightOver;
if(box.hasClass("special-logo-black-text-over")){
$("body").addClass("special-page-logo-black-text-over")}
if(box.hasClass("special-logo-text-shadow")){
$("body").addClass("special-page-logo-text-shadow")}
if(box.hasClass("special-logo-box-shadow")){
$("body").addClass("special-page-logo-box-shadow")}
if(box.hasClass("special-logo-text-right")){
$("body").addClass("special-page-logo-text-right")}
if(box.hasClass("special-logo-text-left")){
$("body").addClass("special-page-logo-text-left")}
$("body").addClass("special-page-logo-intro-over");
$("#vrtx-main-content .grid-container:nth-child(3)").css("marginTop",UiO.responsiveDialog?0:extraSpace+60)}else
if(box.hasClass("special-logo-h1-over")){
var heightOver=$("h1").height()+40+60;
var extraSpace=0;
if(resizedVideoHeight-heightOver>150){
extraSpace=100}
heightOver+=extraSpace;
top-=UiO.responsiveDialog&&isNotSpecialPinnedBig?0:heightOver;
if(box.hasClass("special-logo-black-text-over")){
$("body").addClass("special-page-logo-black-text-over")}
if(box.hasClass("special-logo-text-shadow")){
$("body").addClass("special-page-logo-text-shadow")}
if(box.hasClass("special-logo-box-shadow")){
$("body").addClass("special-page-logo-box-shadow")}
if(box.hasClass("special-logo-text-right")){
$("body").addClass("special-page-logo-text-right")}
if(box.hasClass("special-logo-text-left")){
$("body").addClass("special-page-logo-text-left")}
$("body").addClass("special-page-logo-h1-over");
$("#vrtx-main-content #vrtx-frontpage-introduction").css("marginTop",UiO.responsiveDialog&&isNotSpecialPinnedBig?0:extraSpace+60)}else
if(!box.hasClass("special-logo-video")){
if(box.hasClass("special-logo-video-wide")){
var boxContent=box.find(".vrtx-box-content >*:nth-child(2)")}else
{
var boxContent=box.find(".vrtx-box-content")}
var heightOver=boxContent.height();
var extraSpace=40;
if(resizedVideoHeight-heightOver>heightOver+50){
extraSpace=(resizedVideoHeight-heightOver)/2}
heightOver+=extraSpace;
boxContent.css({
"marginTop":-(UiO.responsiveDialog&&isNotSpecialPinnedBig?0:heightOver),
"paddingBottom":UiO.responsiveDialog&&isNotSpecialPinnedBig?0:extraSpace})}
if(box.hasClass("special-logo-video")){
$("h1").css("marginTop",Math.max(top,80));
if(!$(".special-page-config-header-minimal").length){
$(".special-logo-video-grid-container").css("top",UiO.responsiveDialog&&isNotSpecialPinnedBig?0:$("#head-wrapper").height())}}})};
resizeVideo();
$(window).on("load",resizeVideo);
$(window).on("resize",resizeVideo)}
function spFadeInStart(){
$("#main").addClass("toc toc-inview");
$("h1, #vrtx-frontpage-introduction, #vrtx-main-content > .grid-container:not(.special-pinned-grid-container):not(.special-pinned-video-grid-container):not(.special-pinned-big-grid-container):first-child, #vrtx-frontpage-introduction + .grid-container:not(.special-pinned-grid-container):not(.special-pinned-video-grid-container):not(.special-pinned-big-grid-container), .special-logo-video-grid-container + .grid-container:not(.special-pinned-grid-container):not(.special-pinned-video-grid-container):not(.special-pinned-big-grid-container)").addClass("inview")}
function spFadeIn(){
var selector=".grid-container:not(.special-pinned-grid-container):not(.special-pinned-video-grid-container):not(.special-pinned-big-grid-container),"+
"h1,"+
"#vrtx-frontpage-introduction,"+
".special-images-delay img,"+
".item-inview";
var items=document.querySelectorAll(selector);
for(var key in items){
var item=items[key];
if(typeof item.getBoundingClientRect==="function"){
if(spInView(item)){
var jqItem=$(item);
jqItem.addClass("inview")}}}}
function spHandleScroll(){
spFadeIn()}
function spGalleryChangeImage(gallery){
if(!UiO.responsiveDialog){
gallery.find(".vrtx-frontpage-box .vrtx-frontpage-box-picture").removeClass("visible");
gallery.find(".special-pinned-grid-container, .special-pinned-video-grid-container").each(function(){
var element=$(this);
var text=element.find(".vrtx-box-content");
var thisImage=element.find(".vrtx-frontpage-box .vrtx-frontpage-box-picture");
if(spGalleryInView(text[0])&&!thisImage.hasClass("visible")){
gallery.find(".vrtx-frontpage-box .vrtx-frontpage-box-picture.visible").removeClass("visible");
thisImage.addClass("visible")}})}}
function spInView(element){
return element.getBoundingClientRect().top<=window.innerHeight*.8&&element.getBoundingClientRect().top>0}
function spGalleryInView(element){
var top=element.getBoundingClientRect().top;
var bottom=element.getBoundingClientRect().bottom;
var vHeight=window.innerHeight||$(document).height();
var offset=200;
var check=(top>0||bottom>0)&&top+offset<vHeight;
return check}
function spGalleryWrapperInView(element){
var top=element.getBoundingClientRect().top;
var bottom=element.getBoundingClientRect().bottom;
var vHeight=window.innerHeight||$(document).height();
var offset=vHeight;
var check=(top>0||bottom>0)&&
top+(vHeight-vHeight/4)<vHeight&&
bottom-($(element).find(".vrtx-frontpage-box:last").outerHeight(true)+vHeight/4)>0;
return check}
function spHandleGalleryScroll(){
var galleries=$(".special-pinned-wrapper, .special-pinned-video-wrapper");
galleries.each(function(){
var gallery=$(this);
if(spGalleryWrapperInView(this)){
spGalleryChangeImage(gallery);
gallery.removeClass("visible-sticky visible-sticky-ie11")}else
{
gallery.addClass("visible-sticky");
if(!!navigator.userAgent.match(/Trident\/7\./)||
!!navigator.userAgent.match(/Safari/)&&
!!navigator.userAgent.match(/Macintosh/)&&
!navigator.userAgent.match(/Chrome/)){
gallery.addClass("visible-sticky-ie11")}}})}
function spGalleryFullInView(element){
var top=element.getBoundingClientRect().top;
var bottom=element.getBoundingClientRect().bottom;
var vHeight=window.innerHeight||$(document).height();
var offset=0;
var check=(top>0||bottom>0)&&top+offset<vHeight;
return check}
function spGalleryFullIsAboveOrBelow(element){
var top=element.getBoundingClientRect().top;
var bottom=element.getBoundingClientRect().bottom;
var vHeight=window.innerHeight||$(document).height();
return{
isAbove:top>=0,
isBelow:bottom<=vHeight}}
var lastWinWidth=0;
var lastWinHeight=0;
function spHandleGalleryFullResize(){
$(".special-pinned-big-wrapper .vrtx-media-player").each(function(){
$(this).removeAttr("style")});
spHandleGalleryFullScroll()}
function spHandleGalleryFullScroll(){
var winWidth=$(window).width();
var winHeight=$(window).height();
var isAnyInView=false;
var galleries=$(".special-pinned-big-wrapper");
galleries.each(function(i){
var gallery=$(this);
var isAboveOrBelow=spGalleryFullIsAboveOrBelow(gallery[0]);
gallery.find(".special-pinned-big-grid-container").each(function(){
var element=$(this);
var text=element.find(".vrtx-box-content");
if(element.hasClass("special-logo-video-grid-container")){
var isInView=spGalleryFullInView($("h1")[0])||
spGalleryFullInView($(".vrtx-introduction")[0])}else
{
var isInView=spGalleryFullInView(text[0])}
if(isInView){
if(!isAnyInView&&!(isAboveOrBelow.isAbove||isAboveOrBelow.isBelow)){
$("body").addClass("special-pinned-big-wrapper-inview");
isAnyInView=true}
if(!element.hasClass("visible")){
element.addClass("visible")}
var player=element.find(".vrtx-media-player iframe");
if(player.length&&(lastWinWidth!=winWidth||lastWinHeight!=winHeight||player.closest(".vrtx-media-player").attr("style")==null)){
lastWinWidth=winWidth;
lastWinHeight=winHeight;
var aspectRatio=16/9;
var winAspectRatio=winWidth/winHeight;
if(winAspectRatio>aspectRatio){
var newW=winWidth*(1+(winAspectRatio-aspectRatio));
var newH=newW/aspectRatio}else
{
var newH=winHeight*(1+(aspectRatio-winAspectRatio));
var newW=newH*aspectRatio}
var newTop=(newH-winHeight)/2;
var newLeft=(newW-winWidth)/2;
player.closest(".vrtx-media-player").attr("style","position: absolute; top: -"+newTop+"px; left: -"+newLeft+"px; height: "+newH+"px !important; width: "+newW+"px !important;")}}else
{
if(element.hasClass("visible")){
element.removeClass("visible")}}});
gallery.find(".special-pinned-big-grid-container:first")[isAboveOrBelow.isAbove?"addClass":"removeClass"]("sticky-top");
gallery.find(".special-pinned-big-grid-container:last")[isAboveOrBelow.isBelow?"addClass":"removeClass"]("sticky-bottom")});
if(!isAnyInView){
$("body").removeClass("special-pinned-big-wrapper-inview")}}
function spThrottle(callback,limit){
var wait=false;
return function(){
if(!wait){
callback.apply(null,arguments);
wait=true;
setTimeout(function(){
wait=false},
limit)}}}
if(window.top!=window){
if(document.querySelectorAll(".special-page-config, .special-page-config-header-minimal").length){
window.parent.crossDocComLink.setUpReceiveDataHandler(function(cmdParams,source){
switch(cmdParams[0]){
case"restore-height":
case"admin-min-height":
var setHeight=644;
window.parent.document.getElementById("previewViewIframe").style.height=setHeight+"px";
document.body.style.height=setHeight+"px";
window.parent.crossDocComLink.postCmdToParent(
"preview-height",
setHeight);
break;
case"update-height-vertical":
var setHeight=491;
window.parent.document.getElementById("previewViewIframe").style.height=setHeight+"px";
document.body.style.height=setHeight+"px";
window.parent.crossDocComLink.postCmdToParent(
"preview-height"+
window.parent.crossDocComLink.separator+
setHeight);
break;
case"update-height-horizontal":
var setHeight=327;
window.parent.document.getElementById("previewViewIframe").style.height=setHeight+"px";
document.body.style.height=setHeight+"px";
window.parent.crossDocComLink.postCmdToParent(
"preview-height",
setHeight);
break;
case"print":
window.parent.focus();
window.parent.print();
break;
default:}})}}
(function(){
var sourceSrc;
var audio;
$(document).ready(function(){
if($(".vrtx-feed").parent().hasClass("feed-podcast")||$(".vrtx-feed").hasClass("feed-podcast")){
addPublishedPrefix()}
$(".feed-podcast .items li").on("click","a.item-title",function(event){
event.preventDefault();
$(this).addClass("pod-open");
var target=event.target||event.srcElement;
if($(this).hasClass("open")){
close($(this))}else
{
$(this).addClass("open");
parent=$(this).parent();
if(!$(target.parent).hasClass("podcastPlayer")){
audio=$("audio");
pause();
sourceSrc=$(this).attr("href");
sourceSrc=sourceSrc.replace("?vrtx=view-as-webpage","");
$(this).after("<audio class='podcastPlayer' controls=''autoplay='' name='media' width='300' height='50'><source src="+sourceSrc+" type='audio/mpeg'></audio>");
trackAudio()}}})});
function pause(){
if($(audio).length){
$(".podcastPlayer").each(function(){
$(this).get(0).pause()})}}
function close(thisObj){
thisObj.removeClass("pod-open");
var openPlayer=thisObj.next();
openPlayer.remove();
thisObj.removeClass("open")}
function addPublishedPrefix(){
$(".feed-podcast .items .published-date").each(function(){
var publishedDate=$(this).text();
if($("body").hasClass("no")){
$(this).html("Publisert"+publishedDate)}
if($("body").hasClass("en")){
$(this).html("Published"+publishedDate)}})}})();
UiO.loadScripts=function loadScripts(urls,callback){
if(urls.length>1){
this.loadScript(urls.shift(),function(){
UiO.loadScripts(urls,callback)})}else
if(urls.length===1){
this.loadScript(urls.shift(),callback)}};
UiO.loadScript=function loadScript(url,callback){
return $.cachedScript(url).done(
typeof callback==="function"?callback:$.noop).fail(
function(jqxhr,settings,exception){
UiO.log(exception)})};
UiO.gup=function gup(url,parameterName){
parameterName=parameterName.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var regex=new RegExp("[\\?&]"+parameterName+"=([^&#]*)");
var results=regex.exec(url);
return results===null?null:results[1]};
UiO.gupLocation=function gupLocation(parameterName){
return this.gup(this.url,parameterName)};
$.cachedScript=function(url,opts){
opts=$.extend(opts||{},{
dataType:"script",
cache:true,
url:url});
return jQuery.ajax(opts)};
$.loadCSS=function(url){
if(document.createStyleSheet){
document.createStyleSheet(url)}else
{
$('<link rel="stylesheet" type="text/css" href="'+url+'" />').appendTo("head")}};
Date.prototype.getWeekUIO=function(dowOffset){
dowOffset=typeof dowOffset=="number"?dowOffset:1;
var newYear=new Date(this.getFullYear(),0,1);
var day=newYear.getDay()-dowOffset;
day=day>=0?day:day+7;
var daynum=Math.floor((this.getTime()-newYear.getTime()-
(this.getTimezoneOffset()-newYear.getTimezoneOffset())*6e4)/864e5)+1;
var weeknum;
if(day<4){
weeknum=Math.floor((daynum+day-1)/7)+1;
if(weeknum>52){
nYear=new Date(this.getFullYear()+1,0,1);
nday=nYear.getDay()-dowOffset;
nday=nday>=0?nday:nday+7;
weeknum=nday<4?1:53}}else
{
weeknum=Math.floor((daynum+day-1)/7)}
return weeknum};
var marketingRegex=/^https?:\/\/(www\.)?(vortex-test\.)?uio\.no\/(studier\/(bli-student\/|program\/|opptak\/|apen-dag\/|(persontilpasset-markedsforing\.html|personalised-marketing\.html))|english\/studies\/programmes)/i;
var isMarketing=false&&marketingRegex.test(location.href);
var marketingInfoNoRegex=/^https?:\/\/(www\.)?(vortex-test\.)?uio\.no\/studier\/persontilpasset-markedsforing\.html/i;
var marketingInfoEnRegex=/^https?:\/\/(www\.)?(vortex-test\.)?uio\.no\/studier\/personalised-marketing\.html/i;
var isMarketingInfoNoPage=marketingInfoNoRegex.test(location.href);
var isMarketingInfoEnPage=marketingInfoEnRegex.test(location.href);
var isMarketingInfoPage=isMarketingInfoNoPage||isMarketingInfoEnPage;
var marketingRunOnce=false;
var marketingDialog=null;
var marketingCookieName="UiO2018MarketingConsent";
var htmlMarketingHeader="";
var i18nMarketingAll={
"no":{
title:"UiO ber om ditt samtykke til persontilpasset markedsføring",
text:"UiO markedsfører våre studier overfor nye studenter. Vi ønsker å tilpasse markedsføringen til det som er relevant for deg, basert på hvilke sider du besøker på UiO.no. Persontilpasningen er basert på et samarbeid med våre leverandører Facebook og Adform.",
link:"/studier/persontilpasset-markedsforing.html",
linkOther:"/studier/personalised-marketing.html",
linkText:"Les her for mer informasjon",
linkTextOther:"Information in English",
btnCancel:"Nei takk",
btnOk:"Jeg samtykker"},
"en":{
title:"UiO would like to ask for your consent to personalised marketing",
text:"We market our course offerings to prospective students. We would like to personalise the marketing so that it is relevant to you based on the pages you visit on UiO.no. Personalised marketing is based on cooperation with our marketing service providers Facebook and Adform.",
link:"/studier/personalised-marketing.html",
linkOther:"/studier/persontilpasset-markedsforing.html",
linkText:"Read here for more information",
linkTextOther:"Information in Norwegian",
btnCancel:"No thanks",
btnOk:"I consent"}};
UiO.runMarketing=function(){
i18nMarketing=i18nMarketingAll[UiO.isPageLangEnglish||isMarketingInfoEnPage?"en":"no"];
htmlMarketingHeader="<h2>"+i18nMarketing.title+"</h2>"+
"<p class='marketing-text'>"+i18nMarketing.text+"</p>"+
(i18nMarketing.link&&!isMarketingInfoPage?"<p><a href='"+i18nMarketing.link+"'>"+i18nMarketing.linkText+"</a></p>":"")+
(i18nMarketing.linkOther?"<p><a href='"+i18nMarketing.linkOther+"'>"+i18nMarketing.linkTextOther+"</a></p>":"");
if(isMarketingInfoPage){
$("body").addClass("marketing-info-page");
if(isMarketingInfoEnPage){
$("body").addClass("marketing-info-page-en")}}
UiOProfileResponsive.desktopListen({
match:function(){
UiO.setupMarketingDesktop()},
unmatch:function(){
$("body").removeClass("marketing-container-fixed");
$(".marketing-container").remove()}});
if(!isMarketingInfoPage){
UiOProfileResponsive.responsiveListen({
match:function(){
UiO.setupMarketingResponsive()},
unmatch:function(){
if(marketingDialog!=null){
marketingDialog.close()}}})}};
UiO.setupMarketingResponsive=function(){
var html=htmlMarketingHeader+
"<p class='marketing-buttons'>"+
"<a class='button blue marketing-yes-r'>"+i18nMarketing.btnOk+"</a>"+
"<a class='button white marketing-no-r'>"+i18nMarketing.btnCancel+"</a>"+
"</p>";
UiO.loadScripts([UiO.vrtxRoot+"js/frameworks/es5-shim-dejavu.js",
UiO.vrtxRoot+"js/vrtx-simple-dialogs.js"],function(){
marketingDialog=new VrtxHtmlDialog({
title:"Marketing dialog",
name:"marketing-dialog",
html:html});
marketingDialog.open()});
$(document).on("click",".marketing-yes-r",function(e){
UiO.marketingYes(function(){
marketingDialog.close()});
e.preventDefault()});
$(document).on("click",".marketing-no-r",function(e){
marketingDialog.close();
UiO.marketingNo();
e.preventDefault()})};
UiO.setupMarketingDesktop=function(){
var html="<div class='grid-container marketing-container'><div class='row'>"+
htmlMarketingHeader+
"<p class='marketing-buttons'>"+
"<a class='button blue marketing-yes-d'>"+i18nMarketing.btnOk+"</a>"+
"<a class='button white-bordered marketing-no-d'>"+i18nMarketing.btnCancel+"</a>"+
"</p>"+
"</div></div>";
$("body").prepend(html);
$("body").addClass("marketing-container-fixed");
$(document).on("click",".marketing-yes-d",function(e){
UiO.marketingYes(function(){
$(".marketing-container").remove();
$("body").removeClass("marketing-container-fixed")});
e.preventDefault()});
$(document).on("click",".marketing-no-d",function(e){
$(".marketing-container").remove();
$("body").removeClass("marketing-container-fixed");
UiO.marketingNo();
e.preventDefault()})};
UiO.marketingLoad=function(){
if(window.uioClientInfo&&window.uioClientInfo.externalIP||window.uioPageInfo.externalIPTest){
UiO.loadScripts(["//vrtx.uio.no/js/marketing/v1/UiO2018MarketingAdform.js",
"//vrtx.uio.no/js/marketing/v1/UiO2018MarketingFacebook.js"],function(){
UiO.log("Marketing loaded")})}};
UiO.marketingYes=function(cb){
$.post("/vrtx/__vrtx/app-services/marketing-consent").done(function(data,textStatus,xhr){
cb();
UiO.marketingLoad()}).fail(
function(xhr,textStatus,errorThrown){
UiO.dialogOkCreateOpen($("#main"),xhr.status+" - "+xhr.statusText,errorThrown)})};
UiO.marketingNo=function(){
cookieUtils.createExact(marketingCookieName,"no",30,4,2018,location.hostname)};
if(isMarketing){
$(window).scroll(function(){
var marketingContainer=$(".marketing-container:visible");
if(marketingContainer.length){
var top=marketingContainer.offset().top;
if(top>0){
marketingContainer.addClass("marketing-container-sticky")}else
{
marketingContainer.removeClass("marketing-container-sticky")}}});
$(document).ready(function(){
if(marketingRunOnce)return;
marketingRunOnce=true;
if(cookieUtils.read(marketingCookieName)==null&&
window.uioPageInfo&&
window.uioPageInfo.authenticated==="anonymous"&&
(window.uioClientInfo&&window.uioClientInfo.externalIP||window.uioPageInfo.externalIPTest)){
UiO.log("Marketing run");
UiO.runMarketing()}
if(cookieUtils.read(marketingCookieName)=="yes"&&
window.uioPageInfo&&
window.uioPageInfo.authenticated==="anonymous"&&
(window.uioClientInfo&&window.uioClientInfo.externalIP||window.uioPageInfo.externalIPTest)){
UiO.marketingLoad()}})}
function chatBot(){
if(typeof window.iframeChatbot!=="object"||!window.uioPageInfo||uioPageInfo.readRestricted)return;
var isEnabledOnPath=false;
var textId="1";
var humanChat=null;
for(var chatbotPath in window.iframeChatbot){
if(/\/$/.test(chatbotPath)){
var regex=new RegExp("^"+chatbotPath+"(index.html)?$")}else
{
var regex=new RegExp("^"+chatbotPath)}
if(regex.test(location.pathname)){
isEnabledOnPath=true;
var value=window.iframeChatbot[chatbotPath];
if(typeof value!=="object"){
textId=value}else
{
textId=value[0];
humanChat=value[1]}}}
if(!isEnabledOnPath)return;
if(location.hostname==="vortex-test.uio.no"){
var iframeSrc="https://chatbot.uio.no/test/chatbot.html"}else
{
var iframeSrc="https://chatbot.uio.no/prod/chatbot.html"}
var enumTexts={
1:{no:"Spør UiOs chatbot om opptak til enkeltemner",en:""},
2:{no:"Spør UiOs chatbot om undervisning",en:""},
3:{no:"Spør UiOs chatbot om TSD",en:""},
4:{no:"Chat med UB",en:"Chat with the library"},
5:{no:"Spør UiOs chatbot om Nettskjema",en:""},
6:{no:"",en:""},
7:{no:"",en:""},
8:{no:"",en:""},
9:{no:"",en:""},
10:{no:"",en:""},
11:{no:"",en:""},
12:{no:"",en:""},
13:{no:"",en:""},
14:{no:"",en:""},
15:{no:"",en:""},
16:{no:"",en:""},
17:{no:"",en:""},
18:{no:"",en:""},
19:{no:"",en:""},
20:{no:"",en:""},
21:{no:"",en:""},
22:{no:"",en:""}};
var text=enumTexts[textId][UiO.isPageLangEnglish?"en":"no"];
var msg="<div><a href='javascript:void(0);' class='chatbot-toggle'><span class='chatbot-toggle-text'>"+text+"</span></a></div>";
UiO.dialogModal("uio-chatbot",$("#main"),"Chatbot",msg,"Ok",function(){},
function(){
chatBotToggleUpdate()},
0);
var chatbotDialogContainer=$("#uio-chatbot");
chatbotDialogContainer.addClass("loaded");
$(document).on("click",".chatbot-toggle",function(e){
chatbotDialogContainer.toggleClass("active");
if(!UiO.responsiveDialog){
chatBotCampaignOpens()}
var newUrl=window.location.protocol+"//"+window.location.host+window.location.pathname;
if(chatbotDialogContainer.hasClass("active")){
if(window.location.search.indexOf("?chatbot")===-1&&window.location.search.indexOf("&chatbot")===-1){
newUrl+=(window.location.search!==""?window.location.search+"&":"?")+"chatbot"}else
{
newUrl+=window.location.search}
if(!chatbotDialogContainer.find("iframe").length){
chatbotDialogContainer.find(".dialog-body > div").prepend("<iframe class='chatbot' src='"+iframeSrc+"'>Nettsiden støtter ikke iframe</iframe>")}else
{
chatBotSendParams(chatbotDialogContainer,textId,text,humanChat)}
$(window).trigger("resize")}else
{
var newUrl=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search.replace("?chatbot","").replace("&chatbot","");
newUrl=newUrl.replace(/\/&/gim,"/?");
chatBotToggleUpdate()}
window.history.pushState({path:newUrl},"",newUrl);
e.stopPropagation();
e.preventDefault()});
$(window).on("message",function(e){
e=e.originalEvent;
if(e.data&&typeof e.data==="string"&&e.origin==="https://chatbot.uio.no"){
var message=JSON.parse(e.data);
switch(message.msgName){
case"chatReady":
chatBotSendParams(chatbotDialogContainer,textId,text,humanChat);
break;
case"closeChat":
chatbotDialogContainer.find("iframe").remove();
if(chatbotDialogContainer.hasClass("active")){
$(".chatbot-toggle").trigger("click")}
break;
case"hideChat":
if(chatbotDialogContainer.hasClass("active")){
$(".chatbot-toggle").trigger("click")}
break;
default:
break}}});
if(location.href.indexOf("?chatbot")!==-1||
location.href.indexOf("&chatbot")!==-1){
var waitForChatbot=setInterval(function(){
var chatbotLink=$(".chatbot-toggle");
if(chatbotLink.length){
clearInterval(waitForChatbot);
chatbotLink.click()}},
5)}
$(window).resize(function(){
var winWidth=$(window).width();
if(winWidth>970+200*2){
$(".chatbot-toggle-text").show()}else
{
$(".chatbot-toggle-text").hide()}
var vh=window.innerHeight;
if(UiO.responsiveDialog){
$("#uio-chatbot iframe").css("height","0");
$("#uio-chatbot.active iframe").css("height",vh+"px")}else
{
$("#uio-chatbot iframe").css("height","0");
$("#uio-chatbot.active iframe").css("height","100%")}});
$(window).trigger("resize");
UiOProfileResponsive.desktopListen({
match:function(){
chatBotCampaign()},
unmatch:function(){
setTimeout(function(){
if(!$("body > #uio-chatbot").length){
$("body").append($("#uio-chatbot, #uio-chatbot + .lb_overlay").remove())}},
100)}})}
function chatBotSendParams(chatbotDialogContainer,textId,text,humanChat){
var sendParams={
"msgName":"chatParams",
"textId":parseInt(textId,10),
"text":text,
"pageLang":UiO.isPageLangEnglish?"en":"no",
"href":location.href};
if(humanChat!=null){
sendParams.humanChat=humanChat}
chatbotDialogContainer.find("iframe")[0].contentWindow.postMessage(JSON.stringify(sendParams),"https://chatbot.uio.no/")}
function chatBotToggleUpdate(){
$(".chatbot-toggle-text").css("top",-($(".chatbot-toggle-text").height()+10)+"px");
$(window).trigger("resize")}
function chatBotCampaign(){
if(!window.iframeChatbotCampaign)return;
var days=window.iframeChatbotCampaign;
var then=new Date(+cookieUtils.read("UiOChatbotExpanded"));
var now=new Date;
if(days==null||+now>=+new Date(then.getFullYear(),then.getMonth(),then.getDate()+days)){
chatBotCampaignOpens();
$(".chatbot-toggle").click()}}
function chatBotCampaignOpens(){
if(!window.iframeChatbotCampaign)return;
cookieUtils.create("UiOChatbotExpanded",+new Date,90,"uio.no",true)}
if(location.search.indexOf("embedded-canvas")!==-1){
$.loadCSS("https://vrtx.uio.no/js/canvas/canvas.css?"+ +new Date);
$.ajax({
dataType:"script",
cache:false,
url:"https://vrtx.uio.no/js/canvas/canvas.js?"}).done(
function(){})}
UiO.setupStudies=function setupStudies(){
UiO.setupScheduleExtras();
UiO.setupExamInfo();
UiO.setupProgramListingFilters("ul.vrtx-programs");
UiO.setupStudiesListingFilters("#vrtx-listing-filters");
UiO.setupProgramFrontpages();
UiO.setupTimeline();
UiO.setupNewMessageLink("#vrtx-additional-content .vrtx-message-listing-create")};
UiO.setupExamInfo=function setupExamInfo(){
$("p.exam-comment").each(function(){
var comment=$(this);
var commentHtml=comment.html();
comment.html(commentHtml.replace(/(https?:\/\/[\S]+)/gim,"<a href='$1'>$1</a>").replace(/\n/gim,"<br>"))})};
UiO.setupScheduleExtras=function setupScheduleExtras(){
$(document).on("click",".calendar-field",function(){
$(this).select()})};
UiO.setupTimeline=function setupTimeline(){
var isTimelineTestPath=/studier\/emner\/matnat\/ifi\/(INF1500|IN1050)\/h\d{2}\/(index.html)?$/i.test(location.pathname);
if(!isTimelineTestPath)return;
$.get("./tidslinje.html",function(data){
$($($.parseHTML(data,document,true)).find("#course_wrapper")).insertAfter(
"#vrtx-main-content .vrtx-frontpage-box:first-child")})};
UiO.setupNewMessageLink=function setupNewMessageLink(selector){
var msgNewTitles=$(selector);
for(var i=msgNewTitles.length;i--;){
var msgNewTitle=$(msgNewTitles[i]);
var msgNewTitleText=$.trim(msgNewTitle.text()).split(" ");
var msgNewHref=msgNewTitle.attr("href");
var dropdownMsgNewHtml="<div class='vrtx-dropdown-wrapper'><div class='vrtx-dropdown-wrapper-inner'>"+
"<ul><li class='vrtx-dropdown-first vrtx-dropdown-last'>"+
"<a href='"+msgNewHref+"'>"+
msgNewTitleText[1].substr(0,1).toUpperCase()+
msgNewTitleText[1].substr(1)+
"</a>"+
"</li></ul>"+
"</div></div>";
msgNewTitle.attr("href","javascript:void(0);").text(msgNewTitleText[0]).addClass("vrtx-dropdown-link");
msgNewTitle.wrap("<div class='vrtx-dropdown-component vrtx-dropdown-component-toggled' />");
$(dropdownMsgNewHtml).insertAfter(msgNewTitle)}};
UiO.setupProgramListingFilters=function setupProgramListingFilters(selector){
if(!$(selector).length)return;
UiO.loadScript(UiO.resourcesRoot+"js/studies/filters-program.js?v2",function(script,textStatus){
studySelect=new StudySelect;
studySelect.initialize()})};
UiO.setupStudiesListingFilters=function setupStudiesListingFilters(matchSelector){
if(typeof listingFiltersI18n==="undefined"){
window.listingFiltersI18n={
"level":!UiO.isPageLangEnglish?"nivå":"level",
"semester":!UiO.isPageLangEnglish?"undervisningssemester":"semester",
"teaching-language":!UiO.isPageLangEnglish?"språk":"language",
"finance":!UiO.isPageLangEnglish?"finansiering":"financing",
"agreement-type":!UiO.isPageLangEnglish?"avtaletype":"exchange type",
"groups":!UiO.isPageLangEnglish?"gruppe":"group",
"category":!UiO.isPageLangEnglish?"kategori":"category",
"status":UiO.bodyId==="vrtx-helseforsk-listing"?!UiO.isPageLangEnglish?"prosjektstatus":"project status":
!UiO.isPageLangEnglish?"status":"status",
"types":UiO.bodyId==="vrtx-helseforsk-listing"?!UiO.isPageLangEnglish?"prosjekttype":"project type":
!UiO.isPageLangEnglish?"type":"type"}}
var collapsedFilters=$(".vrtx-listing-filters-collapsed");
if(UiO.bodyId==="vrtx-helseforsk-listing"||
UiO.bodyId==="vrtx-personal-data-listing"){
collapsedFilters=$("#vrtx-listing-filters")}
var collapsedFiltersSections=$(".vrtx-listing-filters-section");
var filtersAllSelectedLocalStorageKey="empty-filters";
if(window.localStorage&&localStorage.getItem(filtersAllSelectedLocalStorageKey)!=location.pathname){
localStorage.removeItem(filtersAllSelectedLocalStorageKey)}
if(!collapsedFiltersSections.length){
$("#vrtx-listing-filters").remove()}else
if(collapsedFilters.length){
var filtersSectionsLen=collapsedFiltersSections.length;
var filtersAllSelectedLen=collapsedFiltersSections.find(".vrtx-listing-filter-parameter-all.vrtx-listing-filter-parameter-selected").length;
$("li.vrtx-listing-filter-parameter-all.vrtx-listing-filter-parameter-selected a").attr("tabindex","-1");
var notCachedReferrer=false;
if(window.localStorage){
var emptyFilters=localStorage.getItem(filtersAllSelectedLocalStorageKey);
if(filtersSectionsLen===filtersAllSelectedLen){
if(emptyFilters!=null){
notCachedReferrer=true;
localStorage.removeItem(filtersAllSelectedLocalStorageKey)}else
{
localStorage.setItem(filtersAllSelectedLocalStorageKey,location.pathname)}}else
if(emptyFilters!=null){
localStorage.removeItem(filtersAllSelectedLocalStorageKey)}}
$(document).on("click",".vrtx-listing-filter-parameter-all.vrtx-listing-filter-parameter-selected",function(e){
return false});
if(filtersSectionsLen!=0&&typeof listingFilters!=="undefined"&&filtersSectionsLen===filtersAllSelectedLen&&(document.referrer.indexOf("?filter.")===-1||notCachedReferrer)){
var linkText=!UiO.isPageLangEnglish?"Velg ":"Choose ";
for(var i=0,len=listingFilters.length;i<len;i++){
linkText+=listingFiltersI18n[listingFilters[i]].toLowerCase().replace(/^velg /i,"").replace(/^select /i,"");
if(len>1){
if(i<len-2){
linkText+=", "}else
if(i<len-1){
linkText+=!UiO.isPageLangEnglish?" eller ":" or "}}}
$("<a class='vrtx-listing-filters-expand' href='javascript:void(0);'>"+linkText+"</a>").insertBefore(collapsedFilters);
collapsedFilters.addClass("listing-filters-hidden");
$(document).on("keydown click",".vrtx-listing-filters-expand",function(e){
var isEnter=e.which&&e.which==13||e.keyCode&&e.keyCode==13;
if(e.type=="click"||isEnter){
var link=$(this);
var linkNext=link.next();
linkNext.removeClass("listing-filters-hidden");
if(isEnter){
linkNext.find("a").filter(":not([tabindex])")[0].focus()}
link.hide();
e.stopPropagation();
e.preventDefault()}})}}
if(UiO.bodyId=="vrtx-course-description-listing"||
UiO.bodyId=="vrtx-course-group-listing"){
var status=$("#vrtx-listing-filter-status");
if(!status.find("a").length){
status.remove()}}
var infos=$("#vrtx-course-group-listing .vrtx-study-results-responsive-info");
for(var i=infos.length;i--;){
var infosElm=$(infos[i]);
var txtInfosElm=infosElm.text().replace(/\([^\)]+student(s|er)\)$/,"");
infosElm.text(txtInfosElm)}
if($(matchSelector).length&&UiOProfileResponsive.isResponsive){
UiO.loadScript(UiO.resourcesRoot+"js/studies/filters-responsive.js",function(){
var selectCourseFiltersResponsive=function(filterIds,filterIdsStart,all,paramHyphens){
var baseUrl=$(".opened .vrtx-listing-filter-parameter-all").find("a")[0].href;
for(var key in filterIds){
if(key.indexOf("-all")!==-1)continue;
var paramsConcat=baseUrl.indexOf("?")!==-1?"&":"?";
var filter=key.split("vrtx-listing-filter-parameter-")[1];
var split=paramHyphens[filter];
if(split){
if(split===3){
filter=filter.replace(/^([^-]+-[^-]+-[^-]+)-(.*)$/,"$1=$2")}else
if(split===2){
filter=filter.replace(/^([^-]+-[^-]+)-(.*)$/,"$1=$2")}}else
{
filter=filter.replace(/^([^-]+)-(.*)$/,"$1=$2")}
baseUrl+=paramsConcat+"filter."+filter}
location.href=baseUrl};
var selectCourseFiltersResponsive2=function(filterIds,filterIdsStart,all,paramHyphens){
var baseUrl=$(".opened .vrtx-listing-filter-parameter-all").find("a")[0].href;
for(var key in filterIds){
if(key.indexOf("-all")!==-1)continue;
var paramsConcat=baseUrl.indexOf("?")!==-1?"&":"?";
var href=$("#"+key).find("a").attr("href");
search=href.split("?")[1];
baseUrl+=paramsConcat+search}
location.href=baseUrl};
initStudyFiltersResponsive({
wrapId:"#vrtx-course-description-listing #vrtx-listing-filters",
filters:[{
wrapId:"#vrtx-listing-filters-section-level",
title:UiO.isPageLangEnglish?"Choose level":"Velg nivå"},
{
wrapId:"#vrtx-listing-filters-section-semester",
title:UiO.isPageLangEnglish?"Choose semester":"Velg semester"},
{
wrapId:"#vrtx-listing-filters-section-teaching-language",
title:UiO.isPageLangEnglish?"Choose language":"Velg språk"}],
scrollTo:{
primary:"#vrtx-listing-filter-results tbody tr:first-child",
secondary:"#vrtx-listing-filter-no-results"},
selectedClass:"vrtx-listing-filter-parameter-selected",
sync:true,
onSelect:selectCourseFiltersResponsive,
paramHyphens:{"teaching-language-norwegian":2,
"teaching-language-english":2}});
initStudyFiltersResponsive({
wrapId:"#vrtx-course-group-listing #vrtx-listing-filters",
filters:[{
wrapId:"#vrtx-listing-filters-section-course-group-scope",
title:UiO.isPageLangEnglish?"Choose groups":"Velg grupper"}],
scrollTo:{
primary:"#vrtx-listing-filter-results tbody tr:first-child",
secondary:"#vrtx-listing-filter-no-results"},
selectedClass:"vrtx-listing-filter-parameter-selected",
sync:true,
onSelect:selectCourseFiltersResponsive,
paramHyphens:{"course-group-scope-20":3,
"course-group-scope-40":3,
"course-group-scope-60":3,
"course-group-scope-80":3}});
initStudyFiltersResponsive({
wrapId:"#vrtx-student-exchange-agreement-listing #vrtx-listing-filters",
filters:[{
wrapId:"#vrtx-listing-filters-section-level",
title:UiO.isPageLangEnglish?"Choose level":"Velg nivå"},
{
wrapId:"#vrtx-listing-filters-section-finance",
title:UiO.isPageLangEnglish?"Choose finance":"Velg finansiering"},
{
wrapId:"#vrtx-listing-filters-section-agreement-type",
title:UiO.isPageLangEnglish?"Choose agreement types":"Velg avtaletyper"}],
scrollTo:{
primary:"#vrtx-listing-filter-results tbody tr:first-child",
secondary:"#vrtx-listing-filter-no-results"},
selectedClass:"vrtx-listing-filter-parameter-selected",
sync:true,
onSelect:selectCourseFiltersResponsive,
paramHyphens:{"agreement-type-erasmus":2,
"agreement-type-nordlys-nordplus":2,
"agreement-type-other":2}});
initStudyFiltersResponsive({
wrapId:"#vrtx-helseforsk-listing #vrtx-listing-filters",
filters:[{
wrapId:"#vrtx-listing-filters-section-types",
title:UiO.isPageLangEnglish?"Choose type":"Velg type"},
{
wrapId:"#vrtx-listing-filters-section-status",
title:UiO.isPageLangEnglish?"Choose status":"Velg status"},
{
wrapId:"#vrtx-listing-filters-section-category",
title:UiO.isPageLangEnglish?"Choose category":"Velg kategori"}],
scrollTo:{
primary:"#vrtx-listing-filter-results tbody tr:first-child",
secondary:"#vrtx-listing-filter-no-results"},
selectedClass:"vrtx-listing-filter-parameter-selected",
sync:true,
onSelect:selectCourseFiltersResponsive});
initStudyFiltersResponsive({
wrapId:"#vrtx-personal-data-listing #vrtx-listing-filters",
filters:[{
wrapId:"#vrtx-listing-filters-section-groups",
title:UiO.isPageLangEnglish?"Choose group":"Velg gruppe"},
{
wrapId:"#vrtx-listing-filters-section-status",
title:UiO.isPageLangEnglish?"Choose status":"Velg status"}],
scrollTo:{
primary:"#vrtx-listing-filter-results tbody tr:first-child",
secondary:"#vrtx-listing-filter-no-results"},
selectedClass:"vrtx-listing-filter-parameter-selected",
sync:true,
onSelect:selectCourseFiltersResponsive});
initStudyFiltersResponsive({
wrapId:"#vrtx-filter-custom-listing #vrtx-listing-filters",
filters:[{
wrapId:"#vrtx-listing-filters-section-it-service-service-areas",
title:UiO.isPageLangEnglish?"Choose IT service area":"Velg IT-tjenesteområde"},
{
wrapId:"#vrtx-listing-filters-section-it-service-users",
title:UiO.isPageLangEnglish?"Choose user group":"Velg brukergruppe"},
{
wrapId:"#vrtx-listing-filters-section-it-service-storage-classifications",
title:UiO.isPageLangEnglish?"Choose storage classification":"Velg lagringsklassifikasjon"}],
scrollTo:{
primary:"#vrtx-listing-filter-results >*:first-child, #vrtx-listing-filter-results > ul > li:first-child",
secondary:"#vrtx-listing-filter-no-results"},
selectedClass:"vrtx-listing-filter-parameter-selected",
sync:true,
onSelect:selectCourseFiltersResponsive2})})}};
UiO.setupProgramFrontpages=function setupProgramFrontpages(){
if($("#vrtx-program-frontpage").length||$("#vrtx-program-option").length){
var inactiveProgramOptionList=$(".vrtx-program-option-list-inactive, div.vrtx-program-options-inactive");
if(inactiveProgramOptionList.find("li").length){
var toggleInactivei18n=UiO.isPageLangEnglish?"Programme options that no longer admits students":
"Studieretninger som ikke tar opp nye studenter";
var inactiveProgramOptionId=$("div.vrtx-program-options-inactive").length?"toggle-program-option-list-inactive":
"toggle-program-options-inactive";
$("<a id='"+inactiveProgramOptionId+"' href='javascript:void(0)'>"+toggleInactivei18n+"</a>").insertBefore(inactiveProgramOptionList);
inactiveProgramOptionList.hide();
$(document).on("click","#toggle-program-option-list-inactive, #toggle-program-options-inactive",function(e){
inactiveProgramOptionList.slideToggle("fast")})}else
{
inactiveProgramOptionList.remove()}
var programResLinks=$(".vrtx-program-resource-links");
var programResLinksRights=programResLinks.find(".right");
if(programResLinksRights.length>1){
var programResLinksLefts=programResLinks.find(".left");
programResLinksLefts.find(">*").unwrap().wrapAll("<div class='left' />");
programResLinksRights.find(">*").unwrap().wrapAll("<div class='right' />")}
var msgBox=$(".vrtx-messagebox");
var box=msgBox.closest(".vrtx-frontpage-box");
var isLast=box.is(":last-child");
var prevBox=box.prev();
if(!msgBox.find("> *").length)box.remove();
if(isLast&&prevBox.length&&prevBox.hasClass("vrtx-distach-bottom")){
prevBox.removeClass("vrtx-distach-bottom")}}
var courseProgramDir=$("#vrtx-course-program-directions");
if($.trim(courseProgramDir.text())===""){
courseProgramDir.remove()}};
function linksUnderline(selectorId){
"use strict";
var id=document.body.id;
if(id==="vrtx-frontpage")return;
var wrapper=document.getElementById(selectorId),
elms=wrapper.querySelectorAll("p, li, strong, bold, i, em, td, blockquote, figcaption"),
i=elms.length,elm,elmChildren,j,elmChild,elmChildVal;
for(;i--;){
elm=elms[i];
elmChildren=elm.childNodes;
j=elmChildren.length;
for(;j--;){
elmChild=elmChildren[j];
if(elmChild.nodeType===3){
elmChildVal=elmChild.nodeValue;
if(elmChildVal!==null&&
!/^\s+$/.test(elmChildVal)){
elm.className+=" elm-has-own-text";
break}}}}}
linksUnderline("main");
$("head link").each(function(){
var stylesheet=$(this);
var stylesheetHref=stylesheet.attr("href");
if(stylesheetHref.indexOf("view-collectionlisting")!==-1||
stylesheetHref.indexOf("view-event-calendar-listing")!==-1||
stylesheetHref.indexOf("view-collectionlisting-print")!==-1||
stylesheetHref.indexOf("view-blog-listing")!==-1||
stylesheetHref.indexOf("view-article")!==-1||
stylesheetHref.indexOf("view-image-listing")!==-1||
stylesheetHref.indexOf("jquery-ui-1.10.4.custom.min.css")!==-1||
stylesheetHref.indexOf("search")!==-1){
stylesheet.remove()}});
var hbarGraphColorWheel=["#5494cc","#949494"];
var Uio=function(){
this._$=$;
this.url=window.location.href;
this.ua=window.navigator.userAgent.toLowerCase()};
var uio=new Uio;
$(document).ready(function(){
if(typeof uio.tracking==="function"){
uioSetQuickLinksCount();
uio.tracking()}});
function uioTrackVirtual(path){
if(typeof uioGa!=="undefined"&&typeof uioGa.trackVirtual==="function"){
if(/^\/like\//.test(path)&&typeof uioGa.trackEvent==="function"){
uioGa.trackEvent("UiOLikeDislike","like",path.replace(/^\/like/,""))}else
if(/^\/dislike\//.test(path)&&typeof uioGa.trackEvent==="function"){
uioGa.trackEvent("UiOLikeDislike","dislike",path.replace(/^\/dislike/,""))}else
{
uioGa.trackVirtual(path)}}}
var urchinTrack=function(action){
uioTrackVirtual(action+location.pathname)};
function uioTrackEvent(category,action,label){
if(typeof __utmTrackEvent==="function"){
__utmTrackEvent(category,action,label)}
if(typeof uioGa!=="undefined"&&typeof uioGa.trackEvent==="function"){
uioGa.trackEvent(category,action,label)}}
function uioTrackGA(path){
if(typeof uioGa!=="undefined"&&typeof uioGa.trackVirtual==="function"){
uioGa.trackVirtual(path)}}
function uioTrackGAEvent(category,action,label,value,nonInt){
if(typeof uioGa!=="undefined"&&typeof uioGa.trackEvent==="function"){
uioGa.trackEvent(category,action,label,value,nonInt)}}
function uioNonGAPseudonymizedEvent(pseudonimizedUser,category,action,label,value,nonInt){
if(typeof uioGa!=="undefined"&&typeof uioGa.trackEvent==="function"){
uioGa.nonGAPseudonymizedEvent(category,action,label,value,nonInt,pseudonimizedUser)}}
function uioTrackSearchResult(sourceUrl,hitNum,authenticated,targetUrl){
if(typeof uioGa!=="undefined"&&typeof uioGa.trackSearchResult==="function"){
uioGa.trackSearchResult(sourceUrl,hitNum,authenticated,targetUrl)}}
function uioSetQuickLinksCount(){
if(typeof uioGa==="object"&&typeof uioGa.setQuickLinksCount==="function"){
var quickLinks=$(".vrtx-search-quick-links .vrtx-search-quick-link");
if(quickLinks.length){
uioGa.setQuickLinksCount(quickLinks.length)}
if(typeof uioGa.pendingPageView==="function"){
uioGa.pendingPageView()}}}
function uioTrackSearchQuickLink(sourceUrl,hitNum,authenticated,targetUrl){
if(typeof uioGa!=="undefined"&&typeof uioGa.trackSearchQuickLink==="function"){
uioGa.trackSearchQuickLink(sourceUrl,hitNum,authenticated,targetUrl)}}
function uioTrackFBEvent(text){
if(typeof fbq!=="undefined"){
fbq("track",text)}}
function trackClicksToPage(pathTo){
var href=location.href;
href=href.substring(0,href.lastIndexOf("/"));
var pathName=location.pathname;
var idx=pathName.lastIndexOf("/");
var fileName=idx<pathName.length-1?pathName+"/":pathName;
pathName=pathName.substr(0,idx);
var selector="a[href='"+pathName+"/"+pathTo+"/']:visible"+
", a[href='"+pathName+"/"+pathTo+"']:visible"+
", a[href='"+pathTo+"/']:visible"+
", a[href='"+pathTo+"']:visible"+
", a[href='"+href+"/"+pathTo+"/']:visible"+
", a[href='"+href+"/"+pathTo+"']:visible";
var links=$(selector);
for(var i=0,len=links.length;i<len;i++){
$(links[i]).data({"pathTo":pathTo,"number":i+1}).bind("mousedown",function(e){
uioTrackGAEvent("FrontPageToStudies","studier-"+$(this).data("number"),fileName)})}}
function stripParamsHash(href){
return href.replace(/(\?|#).*$/m,"")}
(function(){
var hasDesktopBeenTriggered=false;
var hasResponsiveBeenTriggered=false;
var hasBothBeenTriggered=false;
var trackResponsiveDesign=function trackResponsiveDesign(){
if(!UiO.isNotIframed)return;
UiOProfileResponsive.responsiveListen({
setup:function(){
if(!hasResponsiveBeenTriggered){
uioTrackGAEvent("Responsive","Triggered",document.location.pathname,undefined,true);
UiO.log("Responsive=>Triggered");
hasResponsiveBeenTriggered=true}
if(hasDesktopBeenTriggered&&!hasBothBeenTriggered){
uioTrackGAEvent("Responsive","BothTriggered",document.location.pathname,undefined,true);
UiO.log("Responsive=>BothTriggered");
hasBothBeenTriggered=true}}});
UiOProfileResponsive.desktopListen({
setup:function(){
hasDesktopBeenTriggered=true;
if(hasResponsiveBeenTriggered&&!hasBothBeenTriggered){
uioTrackGAEvent("Responsive","BothTriggered",document.location.pathname);
UiO.log("Responsive=>BothTriggered");
hasBothBeenTriggered=true}}})};
window.trackResponsiveDesign=trackResponsiveDesign})();
function trackMedia(category,action,label){
uioTrackGAEvent(category,action,label);
if(/^https:\/\/www\.sv\.uio\.no\/psi\/forskning\/prosjekter\/prevent\//.test(location.href)){
if(window.uioPageInfo&&uioPageInfo.username&&(/bruker[0-9]{3}@webid\.uio\.no/.test($.trim(uioPageInfo.username))||uioPageInfo.username==="testprevent7@webid.uio.no")){
uioNonGAPseudonymizedEvent(uioPageInfo.username,category,action,label)}}
if(/^https:\/\/vortex-test\.uio\.no\/test-pseudonymized\//.test(location.href)){
if(window.uioPageInfo&&uioPageInfo.username&&uioPageInfo.username==="testprevent7@webid.uio.no"){
uioNonGAPseudonymizedEvent(uioPageInfo.username,category,action,label)}}}
function trackAudio(){
$("audio").each(function(){
var audio=$(this)[0];
audio.onplaying=function(){
trackMedia("UiOMediaUsage","AudioPlay",$(this).find("source").attr("src"))};
audio.onpause=function(){
trackMedia("UiOMediaUsage","AudioPause",$(this).find("source").attr("src"))};
audio.onended=function(){
trackMedia("UiOMediaUsage","AudioStop",$(this).find("source").attr("src"))};
var timeCheckTwentyFive=function(){
if(audio.currentTime*100/audio.duration>25){
$(audio).off("timeupdate",timeCheckTwentyFive);
trackMedia("UiOMediaUsage","Audio25Percent",$(this).find("source").attr("src"))}};
var timeCheckFifty=function(){
if(audio.currentTime*100/audio.duration>50){
$(audio).off("timeupdate",timeCheckFifty);
trackMedia("UiOMediaUsage","Audio50Percent",$(this).find("source").attr("src"))}};
var timeCheckSeventyFive=function(){
if(audio.currentTime*100/audio.duration>75){
$(audio).off("timeupdate",timeCheckSeventyFive);
trackMedia("UiOMediaUsage","Audio75Percent",$(this).find("source").attr("src"))}};
$(audio).on("timeupdate",timeCheckTwentyFive);
$(audio).on("timeupdate",timeCheckFifty);
$(audio).on("timeupdate",timeCheckSeventyFive)})}
function trackVideo(){
$(window).on("message",function(e){
e=e.originalEvent;
if(e.data&&typeof e.data==="string"&&e.origin==="https://vrtx.uio.no"){
var message=JSON.parse(e.data);
switch(message.msgName){
case"videoPlay":
trackMedia("UiOMediaUsage","VideoPlay",message.href);
break;
case"videoStop":
trackMedia("UiOMediaUsage","VideoStop",message.href);
break;
case"videoPause":
trackMedia("UiOMediaUsage","VideoPause",message.href);
break;
case"video25Percent":
trackMedia("UiOMediaUsage","Video25Percent",message.href);
break;
case"video50Percent":
trackMedia("UiOMediaUsage","Video50Percent",message.href);
break;
case"video75Percent":
trackMedia("UiOMediaUsage","Video75Percent",message.href);
break;
default:
break}}})}
Uio.prototype.tracking=function(){
var _$=this._$;
trackResponsiveDesign();
var prefix="XTST-";
$(document).on("mousedown","a[href$='.pdf'], a[href$='.PDF'], .vrtx-icon.pdf ~ .vrtx-title a",function(){
uioTrackGAEvent(prefix+"UiODocDownload",prefix+"DownloadPDF",stripParamsHash(this.href))});
var docPreviewSelector="html.doc #office-download-link";
var pptPreviewSelector="html.ppt #office-download-link";
var xlsPreviewSelector="html.xls #office-download-link";
if($(docPreviewSelector).length){
uioTrackGAEvent(prefix+"UiODocPreview",prefix+"PreviewWord",stripParamsHash(this.href),undefined,true)}else
if($(pptPreviewSelector).length){
uioTrackGAEvent(prefix+"UiODocPreview",prefix+"PreviewPowerpoint",stripParamsHash(this.href),undefined,true)}else
if($(xlsPreviewSelector).length){
uioTrackGAEvent(prefix+"UiODocPreview",prefix+"PreviewExcel",stripParamsHash(this.href),undefined,true)}
$(document).on("mousedown",docPreviewSelector,function(){
uioTrackGAEvent(prefix+"UiODocDownload",prefix+"DownloadWordFromPreview",stripParamsHash(this.href))});
$(document).on("mousedown",pptPreviewSelector,function(){
uioTrackGAEvent(prefix+"UiODocDownload",prefix+"DownloadPowerpointFromPreview",stripParamsHash(this.href))});
$(document).on("mousedown",xlsPreviewSelector,function(){
uioTrackGAEvent(prefix+"UiODocDownload",prefix+"DownloadExcelFromPreview",stripParamsHash(this.href))});
var docEndings=["doc","dot","docm","dotm","docx","dotx","odt"];
var pptEndings=["ppt","ppam","pptm","potm","ppsm","pptx","potx","ppsx","odp"];
var xlsEndings=["xls","xlsm","xltm","xlam","xlsb","xlsx","xltx","ods"];
var generateOfficeSelector=function(arr){
var selector="";
for(var i=0;i<arr.length;i++){
selector+="a[href$='."+arr[i]+"'], a[href$='."+arr[i].toUpperCase()+"']";
if(i<arr.length-1)selector+=", "}
return selector};
$(document).on("mousedown",generateOfficeSelector(docEndings)+", .vrtx-icon.doc ~ .vrtx-title a",function(){
uioTrackGAEvent(prefix+"UiODocDownload",prefix+"DownloadWord",stripParamsHash(this.href))});
$(document).on("mousedown",generateOfficeSelector(pptEndings)+", .vrtx-icon.ppt ~ .vrtx-title a",function(){
uioTrackGAEvent(prefix+"UiODocDownload",prefix+"DownloadPowerpoint",stripParamsHash(this.href))});
$(document).on("mousedown",generateOfficeSelector(xlsEndings)+", .vrtx-icon.xls ~ .vrtx-title a",function(){
uioTrackGAEvent(prefix+"UiODocDownload",prefix+"DownloadExcel",stripParamsHash(this.href))});
$(document).on("mousedown","#globalnav a",function(){
uioTrackGAEvent("GlobalMenu",$(this).text(),this.href)});
$(document).on("mousedown","#head-breadcrumb a",function(){
uioTrackGAEvent("GlobalBreadcrumbs",$(this).text(),this.href)});
$(document).on("mousedown","#left-main a",function(){
uioTrackGAEvent("LeftMenu",$(this).text(),this.href)});
$(document).on("mousedown",".vrtx-back a",function(){
uioTrackGAEvent("BackLink",$.trim($(this).text()),this.href)});
$(document).on("mousedown","#nav-offcanvas a",function(){
uioTrackGAEvent("ResponsiveMenu",$.trim($(this).text()),this.href)});
$(document).on("mousedown",".vrtx-context-box-linked a",function(){
uioTrackGAEvent("StudiesContextLink",$.trim($(this).text()),this.href)});
$(document).on("mousedown","#bottomnav #breadcrumb-container a",function(){
uioTrackGAEvent("BottomnavBreadcrumbs",$(this).text(),this.href)});
$(document).on("mousedown","#bottomnav #bottom-menu a",function(){
var link=$(this);
var prefix="";
if(link.closest("ul:not([class^=resultset])").length){
var submenu=link.closest("ul[class^=resultset]");
if(submenu.length){
var submenuTitle=submenu.find("> li a").filter(":first");
if(submenuTitle.length){
prefix=submenuTitle.text()+"->"}}}
uioTrackGAEvent("BottomnavMenu",prefix+$(this).text(),this.href)});
$(document).on("mousedown","a.vrtx-media",function(){
uioTrackGAEvent("UiOMediaDownloadLink",$(this).text(),document.location.pathname.replace(/index.htm(l)?$/,""))});
$(document).on("mousedown","form[name='searchForm-default_scope'] button.searchsubmit",function(e){
var input=$(this).closest("form").find(".text-field");
var path=document.location.pathname.replace(/index.htm(l)?$/,"")+document.location.search;
uioTrackGAEvent("UBSearch",input.val(),path)});
$(document).on("mousedown","#ub-search-services .library-help a",function(e){
var link=this;
var path=document.location.pathname.replace(/index.htm(l)?$/,"");
uioTrackGAEvent("UBSearchServices",link.id,path)});
if(uio.url.match(/^http(s)?:\/\/(www.)?uio.no\/(index.html)?$/g)){
trackClicksToPage("studier")}
$(document).on("mousedown","a.vrtx-email-friend",function(){
uioTrackGAEvent("UiOSocial","email-friend",document.location.pathname.replace(/index.htm(l)?$/,""))});
$(document).on("mousedown",".vrtx-share-at-component a.facebook",function(){
uioTrackGAEvent("UiOSocial","facebook",document.location.pathname.replace(/index.htm(l)?$/,""))});
$(document).on("mousedown",".vrtx-share-at-component a.twitter",function(){
uioTrackGAEvent("UiOSocial","twitter",document.location.pathname.replace(/index.htm(l)?$/,""))});
$(document).on("mousedown","form#fronter button",function(){
var href=$(this).closest("form").attr("action");
if(/^http(|s):\/\/(fronter|blyant)\.uio\.no/.test(href)||/^http(|s):\/\/fronter\.com\/uio/.test(href)){
uioTrackGAEvent("FrontPageFronterButton",document.location.pathname.replace(/index.htm(l)?$/,""))}});
var fronterButtonSelector="a.button[href^='https://fronter.uio.no'], a.button[href^='http://fronter.uio.no'],"+
"a.button[href^='https://fronter.com/uio'], a.button[href^='http://fronter.com/uio']";
$(document).on("mousedown",fronterButtonSelector,function(){
uioTrackGAEvent("FrontPageFronterButton",document.location.pathname.replace(/index.htm(l)?$/,""))});
$(document).on("mousedown","#vrtx-frontpage .bigger-box-content-text a",function(){
uioTrackGAEvent("FrontPageBiggerBoxContent",$(this).text(),this.href)});
$("#vrtx-searchview, #vrtx-personsearch, #vrtx-unitsearch").on("mousedown",".vrtx-search-main-links-box a, .vrtx-search-facets-box a",function(){
uioTrackGAEvent("Searchfilter",$(this).text(),document.location.pathname+document.location.search,undefined,true)});
$("#main").on("mousedown","a.program-create-init, a.program-create-print, a.program-create-send-dialog",function(){
uioTrackGAEvent("CreateProgram",$(this).text(),document.location.pathname)});
$("#main").on("mousedown","a[href*='fsweb.no/soknadsweb/']",function(){
uioTrackGAEvent("Soknadsweb",$(this).text(),document.location.pathname.replace(/index.htm(l)?$/,""));
uioTrackFBEvent("klikk til søknadsweb")});
$("#main").on("mousedown","a[href*='samordnaopptak.no']",function(){
uioTrackGAEvent("SamordnaOpptak",$(this).text(),document.location.pathname.replace(/index.htm(l)?$/,""));
uioTrackFBEvent("klikk til samordna opptak")});
$("#main").on("mousedown","a.apen-dag-pamelding",function(){
uioTrackGAEvent("ApenDagPamelding",$(this).text(),document.location.pathname.replace(/index.htm(l)?$/,""));
uioTrackFBEvent("klikk til påmelding åpen dag")});
$("#main").on("mousedown","a.external-track, button.external-track, input[type='submit'].external-track",function(){
uioTrackGAEvent("ExternalTrack",$(this).text(),document.location.pathname.replace(/index.htm(l)?$/,""))});
$("#main").on("mousedown",".vrtx-minestudier-program-courses-link, .vrtx-minestudier-programlist a, .vrtx-minestudier-courseslist a, .vrtx-minestudier-all-messages a",function(){
uioTrackGAEvent("MyStudiesWidget",$(this).text(),document.location.pathname.replace(/index.htm(l)?$/,""))});
var headerLoginManage=$("#head-wrapper .vrtx-login-manage-component");
var footerLoginManage=$("#footer-wrapper .vrtx-login-manage-component");
var footerLoginManageTitleLink=footerLoginManage.find("a.vrtx-login-manage-title-link");
if(footerLoginManageTitleLink.length){
var footerLoginManageTitleLinkTxt=footerLoginManageTitleLink.text();
if(footerLoginManageTitleLinkTxt==="Log in"||
footerLoginManageTitleLinkTxt==="Logg inn"){
footerLoginManage.on("mousedown","a.vrtx-login-manage-title-link",function(){
uioTrackGAEvent("FooterNotLoggedIn","Log in",document.location.pathname.replace(/index.htm(l)?$/,""))});
footerLoginManage.on("mousedown","a.vrtx-login-manage-admin, a.vrtx-login-manage-admin-collection",function(){
uioTrackGAEvent("FooterNotLoggedIn","Admin",document.location.pathname.replace(/index.htm(l)?$/,""))})}else
{
footerLoginManage.on("mousedown","a.vrtx-login-manage-title-link",function(){
uioTrackGAEvent("Footer","Admin",document.location.pathname.replace(/index.htm(l)?$/,""))});
footerLoginManage.on("mousedown","a.vrtx-login-manage-edit, a.vrtx-login-manage-edit-collection",function(){
uioTrackGAEvent("Footer","Edit",document.location.pathname.replace(/index.htm(l)?$/,""))});
footerLoginManage.on("mousedown","a.vrtx-login-manage-logout",function(){
uioTrackGAEvent("Footer","Log out",document.location.pathname.replace(/index.htm(l)?$/,""))})}}
headerLoginManage.on("mousedown","a.vrtx-login-manage-admin, a.vrtx-login-manage-admin-collection",function(){
uioTrackGAEvent("Header","Admin",document.location.pathname.replace(/index.htm(l)?$/,""))});
headerLoginManage.on("mousedown","a.vrtx-login-manage-edit, a.vrtx-login-manage-edit-collection",function(){
uioTrackGAEvent("Header","Edit",document.location.pathname.replace(/index.htm(l)?$/,""))});
headerLoginManage.on("mousedown","a.vrtx-login-manage-logout",function(){
uioTrackGAEvent("Header","Log out",document.location.pathname.replace(/index.htm(l)?$/,""))});
$(document).on("mousedown",".marketing-yes-d",function(){
uioTrackGAEvent("MarketingConsent","yes-desktop",document.location.pathname.replace(/index.htm(l)?$/,""),undefined,true)});
$(document).on("mousedown",".marketing-no-d",function(){
uioTrackGAEvent("MarketingConsent","no-desktop",document.location.pathname.replace(/index.htm(l)?$/,""),undefined,true)});
$(document).on("mousedown",".marketing-yes-r",function(){
uioTrackGAEvent("MarketingConsent","yes-responsive",document.location.pathname.replace(/index.htm(l)?$/,""),undefined,true)});
$(document).on("mousedown",".marketing-no-r",function(){
uioTrackGAEvent("MarketingConsent","no-responsive",document.location.pathname.replace(/index.htm(l)?$/,""),undefined,true)});
trackAudio();
trackVideo();
if(typeof uioGa==="object"){
var searchType=false;
if(typeof uioGa.getSearchType==="function"){
searchType=uioGa.getSearchType()}
if(searchType==="search"||searchType==="searchuio"){
var isTrackSearchLinks=typeof uioGa.trackSearchResult==="function";
var isTrackSearchQuickLinks=typeof uioGa.trackSearchQuickLink==="function";
if(isTrackSearchLinks){
$(document).on("mousedown",".vrtx-search-results h2 a",function(e){
var searchElm=$(this);
var targetUrl=searchElm.attr("href");
var searchContainerElm=searchElm.closest(".vrtx-search-results");
var searchContainerElmId=searchContainerElm[0].id;
var hitNum=searchContainerElmId?parseInt(searchContainerElmId.replace(/[^\d]/gi,"")):null;
if(hitNum!=null&&!hitNum.isNaN){
var authenticated=$(".vrtx-login-manage-logout").length>0;
uioTrackSearchResult(location.href,hitNum,authenticated,targetUrl)}})}
if(isTrackSearchQuickLinks){
$(document).on("mousedown",".vrtx-search-quick-links .vrtx-search-quick-link h2 a",function(e){
var searchElm=$(this);
var targetUrl=searchElm.attr("href");
var searchContainerElm=searchElm.closest(".vrtx-search-quick-link");
var searchContainerElmId=searchContainerElm[0].id;
var hitNum=searchContainerElmId?parseInt(searchContainerElmId.replace(/[^\d]/gi,"")):null;
if(hitNum!=null&&!hitNum.isNaN){
var authenticated=$(".vrtx-login-manage-logout").length>0;
uioTrackSearchQuickLink(location.href,hitNum,authenticated,targetUrl)}})}}
if(/http(s)?:\/\/(www\.)?uio\.no\/(index\.html)?/gi.test(location.href)){
$("#main").on("mousedown","#vrtx-main-content-2 .vrtx-box-content li a",function(e){
if(!/^http(s)?:\/\/(www\.)?ub\.uio\.no\//gi.test(this.href)){
uioTrackGAEvent("FrontPageOutgoingLinks",$(this).text(),document.location.pathname)}
e.stopPropagation()})}
var replaceInvalidChar=function(val){
val=val.toLowerCase();
var replaceMap={
" ":"-",
"'":"-",
"æ":"e",
"ø":"o",
"å":"a",
",":"",
"\\.":"-"};
for(var key in replaceMap){
var replaceThisCharGlobally=new RegExp(key,"g");
val=val.replace(replaceThisCharGlobally,replaceMap[key])}
return val}}};