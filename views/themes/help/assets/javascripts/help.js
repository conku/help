!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(o,n){this.$element=e(o),this.options=e.extend({},t.DEFAULTS,e.isPlainObject(n)&&n),this.init()}var o="qor.help",n="enable."+o,i="disable."+o,r="click."+o,a="keyup."+o,s="change."+o,h=".qor-help__index";return t.prototype={constructor:t,init:function(){this.bind()},bind:function(){this.$element.on(r,".qor-help__lists [data-inline-url]",this.loadDoc).on(a,".qor-help__search",this.searchKeyup.bind(this)).on(r,".qor-help__search-button",this.search.bind(this)).on(s,".qor-help__search-category",this.search.bind(this)).on(r,".qor-pagination a",this.pagination.bind(this))},unbind:function(){this.$element.off(r,".qor-help__lists [data-inline-url]",this.loadDoc).off(a,".qor-help__search",this.searchKeyup.bind(this)).off(r,".qor-help__search-button",this.search.bind(this)).off(s,".qor-help__search-category",this.search.bind(this)).off(r,".qor-pagination a",this.pagination.bind(this))},pagination:function(o){var n=e(o.target),i=n.prop("href"),r=e(t.TEMPLATE_LOADING),a=this.$element.find(h);return e.ajax(i,{method:"GET",dataType:"html",beforeSend:function(){a.hide(),r.prependTo(a),window.componentHandler.upgradeElement(r.children()[0])},success:function(t){a.show().html(e(t).find(h))},error:function(e){r.remove(),window.alert(e.responseText)}}),!1},searchKeyup:function(e){13==e.keyCode&&this.searchAction()},search:function(){this.searchAction()},searchAction:function(){var o=e(".qor-help__search-category"),n=e(".qor-help__search"),i=e(".qor-help__body"),r=e(t.TEMPLATE_LOADING),a=[n.data().helpFilterUrl,"?",o.prop("name"),"=",o.val(),"&",n.prop("name"),"=",n.val()].join("");e.ajax(a,{method:"GET",dataType:"html",processData:!1,contentType:!1,beforeSend:function(){i.hide().after(r),window.componentHandler.upgradeElement(r.children()[0])},success:function(t){e(".qor-slideout__title").show(),e(".qor-slideout__show_title").remove(),i.html(e(t).find(".qor-help__body").html()).show(),r.remove()},error:function(e,t,o){i.show(),r.remove(),window.alert([t,o].join(": "))}})},loadDoc:function(o){var n=e(o.target),i=e(".qor-help__index"),r=e(t.TEMPLATE_LOADING),a=e(".qor-help__body"),s=n.data().inlineUrl;return i.hide(),e.ajax(s,{method:"GET",dataType:"html",processData:!1,contentType:!1,beforeSend:function(){a.append(r),window.componentHandler.upgradeElement(r.children()[0])},success:function(o){e(o).find(".qor-page__show").appendTo(a).addClass("qor-doc__preview"),e(".qor-slideout__show_title").remove(),e(".qor-slideout__title").hide();var n=e("<h3 class='qor-slideout__title qor-slideout__show_title'></h3>");n.text(e(".qor-doc__preview .qor-help__document_title").hide().text()),n.prepend(e(t.TEMPLATE_PREVIEW_CLOSE)).appendTo(e(".qor-slideout__header")),e(".qor-slideout__title .qor-doc__close").click(function(){i.show(),e(".qor-slideout__title").show(),e(".qor-doc__preview").remove(),e(".qor-slideout__show_title").remove()}),r.remove()},error:function(e,t,o){r.remove(),window.alert([t,o].join(": "))}}),!1},destroy:function(){this.unbind(),this.$element.removeData(o)}},t.TEMPLATE_LOADING='<div style="text-align: center; margin-top: 30px;"><div class="mdl-spinner mdl-js-spinner is-active qor-layout__bottomsheet-spinner"></div></div>',t.TEMPLATE_PREVIEW_CLOSE='<a href="javascript://" class="qor-doc__close"><i class="material-icons">keyboard_backspace</i></a>',t.plugin=function(n){return this.each(function(){var i,r=e(this),a=r.data(o);if(!a){if(/destroy/.test(n))return;r.data(o,a=new t(this,n))}"string"==typeof n&&e.isFunction(i=a[n])&&i.apply(a)})},e(function(){var o='[data-toggle="qor.help"]';e(document).on(i,function(n){t.plugin.call(e(o,n.target),"destroy")}).on(n,function(n){t.plugin.call(e(o,n.target))}).triggerHandler(n)}),t});