if(void 0===viewDropdown){var viewDropdown=!0;!function(){var p=$(document);p.ready(function(){function c(o,r,t,n){if(t){var a=r.find("a, input[type='button'], input[type='submit']").filter(":first");a.length&&n&&a.focus()}r.attr("aria-hidden",!t),o.attr("aria-expanded",t)}for(var o=$(".vrtx-dropdown-wrapper"),r=function(o,r){if(o[0].id)var t=o[0].id;else{t=r+Math.round((+new Date+1)*Math.random());o.attr("id",t)}return t},t=o.length;t--;){var n=$(o[t]),a=n.prev(),d=r(n,"vrtx-dropdown-wrapper-"),e=r(a,"vrtx-dropdown-link-");n.attr("aria-labelledby",e),a.attr({"aria-controls":d,"aria-haspopup":"true"}),c(a,n,!1,!1)}p.on("click keydown",".vrtx-dropdown-component a.vrtx-dropdown-link, .vrtx-dropdown-component a.vrtx-dropdown-close-link",function(o){var r=13===(o.keyCode?o.keyCode:o.which);if("click"===o.type||r){var t=$(this),n=t.parent();if(n.hasClass("vrtx-dropdown-component-toggled")&&t.toggleClass("active"),t.hasClass("vrtx-dropdown-close-link"))var a=t.closest(".vrtx-dropdown-wrapper");else a=t.next(".vrtx-dropdown-wrapper");n.hasClass("vrtx-dropdown-component-toggle")?(a.toggleClass("activated"),c(t,a,a.is(":visible"),r)):a.slideToggle("fast",function(){c(t,a,a.is(":visible"),r)}),o.stopPropagation(),o.preventDefault()}}),p.on("click",function(o){$(o.target).hasClass("vrtx-dropdown-link")||$(".vrtx-dropdown-link.active").click()});var i=$(".vrtx-dropdown-form");i.length&&(i.addClass("hidden"),$(".vrtx-dropdown-form-link").addClass("visible"),$(document).off("click",".vrtx-dropdown-form-link").on("click",".vrtx-dropdown-form-link",function(o){$(this).prev(".vrtx-dropdown-form").submit(),o.stopPropagation(),o.preventDefault()}))})}()}