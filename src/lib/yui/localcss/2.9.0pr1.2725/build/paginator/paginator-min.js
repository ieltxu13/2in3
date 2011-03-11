/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0pr1
*/
(function(){var d=YAHOO.util.Dom,f=YAHOO.lang,b=f.isObject,e=f.isFunction,c=f.isArray,a=f.isString;function g(k){var n=g.VALUE_UNLIMITED,l,h,i,j,m;k=b(k)?k:{};this.initConfig();this.initEvents();this.set("rowsPerPage",k.rowsPerPage,true);if(g.isNumeric(k.totalRecords)){this.set("totalRecords",k.totalRecords,true);}this.initUIComponents();for(l in k){if(k.hasOwnProperty(l)){this.set(l,k[l],true);}}h=this.get("initialPage");i=this.get("totalRecords");j=this.get("rowsPerPage");if(h>1&&j!==n){m=(h-1)*j;if(i===n||m<i){this.set("recordOffset",m,true);}}}f.augmentObject(g,{id:0,ID_BASE:"yui-pg",VALUE_UNLIMITED:-1,TEMPLATE_DEFAULT:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}",TEMPLATE_ROWS_PER_PAGE:"{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink} {RowsPerPageDropdown}",ui:{},isNumeric:function(h){return isFinite(+h);},toNumber:function(h){return isFinite(+h)?+h:null;}},true);g.prototype={_containers:[],_batch:false,_pageChanged:false,_state:null,initConfig:function(){var h=g.VALUE_UNLIMITED;this.setAttributeConfig("rowsPerPage",{value:0,validator:g.isNumeric,setter:g.toNumber});this.setAttributeConfig("containers",{value:null,validator:function(l){if(!c(l)){l=[l];}for(var k=0,j=l.length;k<j;++k){if(a(l[k])||(b(l[k])&&l[k].nodeType===1)){continue;}return false;}return true;},method:function(i){i=d.get(i);if(!c(i)){i=[i];}this._containers=i;}});this.setAttributeConfig("totalRecords",{value:0,validator:g.isNumeric,setter:g.toNumber});this.setAttributeConfig("recordOffset",{value:0,validator:function(j){var i=this.get("totalRecords");if(g.isNumeric(j)){j=+j;return i===h||i>j||(i===0&&j===0);}return false;},setter:g.toNumber});this.setAttributeConfig("initialPage",{value:1,validator:g.isNumeric,setter:g.toNumber});this.setAttributeConfig("template",{value:g.TEMPLATE_DEFAULT,validator:a});this.setAttributeConfig("containerClass",{value:"yui-pg-container",validator:a});this.setAttributeConfig("alwaysVisible",{value:true,validator:f.isBoolean});this.setAttributeConfig("updateOnChange",{value:false,validator:f.isBoolean});this.setAttributeConfig("id",{value:g.id++,readOnly:true});this.setAttributeConfig("rendered",{value:false,readOnly:true});},initUIComponents:function(){var j=g.ui,i,h;for(i in j){if(j.hasOwnProperty(i)){h=j[i];if(b(h)&&e(h.init)){h.init(this);}}}},initEvents:function(){this.createEvent("render");this.createEvent("rendered");this.createEvent("changeRequest");this.createEvent("pageChange");this.createEvent("beforeDestroy");this.createEvent("destroy");this._selfSubscribe();},_selfSubscribe:function(){this.subscribe("totalRecordsChange",this.updateVisibility,this,true);this.subscribe("alwaysVisibleChange",this.updateVisibility,this,true);this.subscribe("totalRecordsChange",this._handleStateChange,this,true);this.subscribe("recordOffsetChange",this._handleStateChange,this,true);this.subscribe("rowsPerPageChange",this._handleStateChange,this,true);this.subscribe("totalRecordsChange",this._syncRecordOffset,this,true);},_syncRecordOffset:function(k){var h=k.newValue,j,i;if(k.prevValue!==h){if(h!==g.VALUE_UNLIMITED){j=this.get("rowsPerPage");if(j&&this.get("recordOffset")>=h){i=this.getState({totalRecords:k.prevValue,recordOffset:this.get("recordOffset")});this.set("recordOffset",i.before.recordOffset);this._firePageChange(i);}}}},_handleStateChange:function(i){if(i.prevValue!==i.newValue){var j=this._state||{},h;j[i.type.replace(/Change$/,"")]=i.prevValue;h=this.getState(j);if(h.page!==h.before.page){if(this._batch){this._pageChanged=true;}else{this._firePageChange(h);}}}},_firePageChange:function(h){if(b(h)){var i=h.before;delete h.before;this.fireEvent("pageChange",{type:"pageChange",prevValue:h.page,newValue:i.page,prevState:h,newState:i});}},render:function(){if(this.get("rendered")){return this;}var l=this.get("template"),m=this.getState(),k=g.ID_BASE+this.get("id")+"-",j,h;for(j=0,h=this._containers.length;j<h;++j){this._renderTemplate(this._containers[j],l,k+j,true);}this.updateVisibility();if(this._containers.length){this.setAttributeConfig("rendered",{value:true});this.fireEvent("render",m);this.fireEvent("rendered",m);}return this;},_renderTemplate:function(j,n,m,l){var p=this.get("containerClass"),o,k,h;if(!j){return;}d.setStyle(j,"display","none");d.addClass(j,p);j.innerHTML=n.replace(/\{([a-z0-9_ \-]+)\}/gi,'<span class="yui-pg-ui yui-pg-ui-$1"></span>');o=d.getElementsByClassName("yui-pg-ui","span",j);for(k=0,h=o.length;k<h;++k){this.renderUIComponent(o[k],m);}if(!l){d.setStyle(j,"display","");}},renderUIComponent:function(h,m){var l=h.parentNode,k=/yui-pg-ui-(\w+)/.exec(h.className),j=k&&g.ui[k[1]],i;if(e(j)){i=new j(this);if(e(i.render)){l.replaceChild(i.render(m),h);}}return this;},destroy:function(){this.fireEvent("beforeDestroy");this.fireEvent("destroy");this.setAttributeConfig("rendered",{value:false});this.unsubscribeAll();},updateVisibility:function(m){var p=this.get("alwaysVisible"),n,j,q,o,k,l,h;if(!m||m.type==="alwaysVisibleChange"||!p){n=this.get("totalRecords");j=true;q=this.get("rowsPerPage");o=this.get("rowsPerPageOptions");if(c(o)){for(k=0,l=o.length;k<l;++k){h=o[k];if(f.isNumber(h||h.value)){q=Math.min(q,(h.value||h));}}}if(n!==g.VALUE_UNLIMITED&&n<=q){j=false;}j=j||p;for(k=0,l=this._containers.length;k<l;++k){d.setStyle(this._containers[k],"display",j?"":"none");}}},getContainerNodes:function(){return this._containers;},getTotalPages:function(){var h=this.get("totalRecords"),i=this.get("rowsPerPage");if(!i){return null;}if(h===g.VALUE_UNLIMITED){return g.VALUE_UNLIMITED;}return Math.ceil(h/i);},hasPage:function(i){if(!f.isNumber(i)||i<1){return false;}var h=this.getTotalPages();return(h===g.VALUE_UNLIMITED||h>=i);},getCurrentPage:function(){var h=this.get("rowsPerPage");if(!h||!this.get("totalRecords")){return 0;}return Math.floor(this.get("recordOffset")/h)+1;},hasNextPage:function(){var h=this.getCurrentPage(),i=this.getTotalPages();return h&&(i===g.VALUE_UNLIMITED||h<i);},getNextPage:function(){return this.hasNextPage()?this.getCurrentPage()+1:null;
},hasPreviousPage:function(){return(this.getCurrentPage()>1);},getPreviousPage:function(){return(this.hasPreviousPage()?this.getCurrentPage()-1:1);},getPageRecords:function(k){if(!f.isNumber(k)){k=this.getCurrentPage();}var j=this.get("rowsPerPage"),i=this.get("totalRecords"),l,h;if(!k||!j){return null;}l=(k-1)*j;if(i!==g.VALUE_UNLIMITED){if(l>=i){return null;}h=Math.min(l+j,i)-1;}else{h=l+j-1;}return[l,h];},setPage:function(i,h){if(this.hasPage(i)&&i!==this.getCurrentPage()){if(this.get("updateOnChange")||h){this.set("recordOffset",(i-1)*this.get("rowsPerPage"));}else{this.fireEvent("changeRequest",this.getState({"page":i}));}}},getRowsPerPage:function(){return this.get("rowsPerPage");},setRowsPerPage:function(i,h){if(g.isNumeric(i)&&+i>0&&+i!==this.get("rowsPerPage")){if(this.get("updateOnChange")||h){this.set("rowsPerPage",i);}else{this.fireEvent("changeRequest",this.getState({"rowsPerPage":+i}));}}},getTotalRecords:function(){return this.get("totalRecords");},setTotalRecords:function(i,h){if(g.isNumeric(i)&&+i>=0&&+i!==this.get("totalRecords")){if(this.get("updateOnChange")||h){this.set("totalRecords",i);}else{this.fireEvent("changeRequest",this.getState({"totalRecords":+i}));}}},getStartIndex:function(){return this.get("recordOffset");},setStartIndex:function(i,h){if(g.isNumeric(i)&&+i>=0&&+i!==this.get("recordOffset")){if(this.get("updateOnChange")||h){this.set("recordOffset",i);}else{this.fireEvent("changeRequest",this.getState({"recordOffset":+i}));}}},getState:function(n){var p=g.VALUE_UNLIMITED,l=Math,m=l.max,o=l.ceil,j,h,k;function i(s,q,r){if(s<=0||q===0){return 0;}if(q===p||q>s){return s-(s%r);}return q-(q%r||r);}j={paginator:this,totalRecords:this.get("totalRecords"),rowsPerPage:this.get("rowsPerPage"),records:this.getPageRecords()};j.recordOffset=i(this.get("recordOffset"),j.totalRecords,j.rowsPerPage);j.page=o(j.recordOffset/j.rowsPerPage)+1;if(!n){return j;}h={paginator:this,before:j,rowsPerPage:n.rowsPerPage||j.rowsPerPage,totalRecords:(g.isNumeric(n.totalRecords)?m(n.totalRecords,p):+j.totalRecords)};if(h.totalRecords===0){h.recordOffset=h.page=0;}else{k=g.isNumeric(n.page)?(n.page-1)*h.rowsPerPage:g.isNumeric(n.recordOffset)?+n.recordOffset:j.recordOffset;h.recordOffset=i(k,h.totalRecords,h.rowsPerPage);h.page=o(h.recordOffset/h.rowsPerPage)+1;}h.records=[h.recordOffset,h.recordOffset+h.rowsPerPage-1];if(h.totalRecords!==p&&h.recordOffset<h.totalRecords&&h.records&&h.records[1]>h.totalRecords-1){h.records[1]=h.totalRecords-1;}return h;},setState:function(i){if(b(i)){this._state=this.getState({});i={page:i.page,rowsPerPage:i.rowsPerPage,totalRecords:i.totalRecords,recordOffset:i.recordOffset};if(i.page&&i.recordOffset===undefined){i.recordOffset=(i.page-1)*(i.rowsPerPage||this.get("rowsPerPage"));}this._batch=true;this._pageChanged=false;for(var h in i){if(i.hasOwnProperty(h)&&this._configs.hasOwnProperty(h)){this.set(h,i[h]);}}this._batch=false;if(this._pageChanged){this._pageChanged=false;this._firePageChange(this.getState(this._state));}}}};f.augmentProto(g,YAHOO.util.AttributeProvider);YAHOO.widget.Paginator=g;})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.CurrentPageReport=function(d){this.paginator=d;d.subscribe("recordOffsetChange",this.update,this,true);d.subscribe("rowsPerPageChange",this.update,this,true);d.subscribe("totalRecordsChange",this.update,this,true);d.subscribe("pageReportTemplateChange",this.update,this,true);d.subscribe("destroy",this.destroy,this,true);d.subscribe("pageReportClassChange",this.update,this,true);};c.ui.CurrentPageReport.init=function(d){d.setAttributeConfig("pageReportClass",{value:"yui-pg-current",validator:b.isString});d.setAttributeConfig("pageReportTemplate",{value:"({currentPage} of {totalPages})",validator:b.isString});d.setAttributeConfig("pageReportValueGenerator",{value:function(g){var f=g.getCurrentPage(),e=g.getPageRecords();return{"currentPage":e?f:0,"totalPages":g.getTotalPages(),"startIndex":e?e[0]:0,"endIndex":e?e[1]:0,"startRecord":e?e[0]+1:0,"endRecord":e?e[1]+1:0,"totalRecords":g.get("totalRecords")};},validator:b.isFunction});};c.ui.CurrentPageReport.sprintf=function(e,d){return e.replace(/\{([\w\s\-]+)\}/g,function(f,g){return(g in d)?d[g]:"";});};c.ui.CurrentPageReport.prototype={span:null,render:function(d){this.span=document.createElement("span");this.span.className=this.paginator.get("pageReportClass");a(this.span,d+"-page-report");this.update();return this.span;},update:function(d){if(d&&d.prevValue===d.newValue){return;}this.span.innerHTML=c.ui.CurrentPageReport.sprintf(this.paginator.get("pageReportTemplate"),this.paginator.get("pageReportValueGenerator")(this.paginator));},destroy:function(){this.span.parentNode.removeChild(this.span);this.span=null;}};})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.PageLinks=function(d){this.paginator=d;d.subscribe("recordOffsetChange",this.update,this,true);d.subscribe("rowsPerPageChange",this.update,this,true);d.subscribe("totalRecordsChange",this.update,this,true);d.subscribe("pageLinksChange",this.rebuild,this,true);d.subscribe("pageLinkClassChange",this.rebuild,this,true);d.subscribe("currentPageClassChange",this.rebuild,this,true);d.subscribe("destroy",this.destroy,this,true);d.subscribe("pageLinksContainerClassChange",this.rebuild,this,true);};c.ui.PageLinks.init=function(d){d.setAttributeConfig("pageLinkClass",{value:"yui-pg-page",validator:b.isString});d.setAttributeConfig("currentPageClass",{value:"yui-pg-current-page",validator:b.isString});d.setAttributeConfig("pageLinksContainerClass",{value:"yui-pg-pages",validator:b.isString});d.setAttributeConfig("pageLinks",{value:10,validator:c.isNumeric});d.setAttributeConfig("pageLabelBuilder",{value:function(e,f){return e;},validator:b.isFunction});d.setAttributeConfig("pageTitleBuilder",{value:function(e,f){return"Page "+e;},validator:b.isFunction});};c.ui.PageLinks.calculateRange=function(f,g,e){var j=c.VALUE_UNLIMITED,i,d,h;if(!f||e===0||g===0||(g===j&&e===j)){return[0,-1];
}if(g!==j){e=e===j?g:Math.min(e,g);}i=Math.max(1,Math.ceil(f-(e/2)));if(g===j){d=i+e-1;}else{d=Math.min(g,i+e-1);}h=e-(d-i+1);i=Math.max(1,i-h);return[i,d];};c.ui.PageLinks.prototype={current:0,container:null,render:function(d){var e=this.paginator;this.container=document.createElement("span");a(this.container,d+"-pages");this.container.className=e.get("pageLinksContainerClass");YAHOO.util.Event.on(this.container,"click",this.onClick,this,true);this.update({newValue:null,rebuild:true});return this.container;},update:function(q){if(q&&q.prevValue===q.newValue){return;}var g=this.paginator,m=g.getCurrentPage();if(this.current!==m||!m||q.rebuild){var r=g.get("pageLabelBuilder"),l=g.get("pageTitleBuilder"),k=c.ui.PageLinks.calculateRange(m,g.getTotalPages(),g.get("pageLinks")),f=k[0],h=k[1],o="",d,j,n;d='<a href="#" class="{class}" page="{page}" title="{title}">{label}</a>';n='<span class="{class}">{label}</span>';for(j=f;j<=h;++j){if(j===m){o+=b.substitute(n,{"class":g.get("currentPageClass")+" "+g.get("pageLinkClass"),"label":r(j,g)});}else{o+=b.substitute(d,{"class":g.get("pageLinkClass"),"page":j,"label":r(j,g),"title":l(j,g)});}}this.container.innerHTML=o;}},rebuild:function(d){d.rebuild=true;this.update(d);},destroy:function(){YAHOO.util.Event.purgeElement(this.container,true);this.container.parentNode.removeChild(this.container);this.container=null;},onClick:function(f){var d=YAHOO.util.Event.getTarget(f);if(d&&YAHOO.util.Dom.hasClass(d,this.paginator.get("pageLinkClass"))){YAHOO.util.Event.stopEvent(f);this.paginator.setPage(parseInt(d.getAttribute("page"),10));}}};})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.FirstPageLink=function(d){this.paginator=d;d.subscribe("recordOffsetChange",this.update,this,true);d.subscribe("rowsPerPageChange",this.update,this,true);d.subscribe("totalRecordsChange",this.update,this,true);d.subscribe("destroy",this.destroy,this,true);d.subscribe("firstPageLinkLabelChange",this.update,this,true);d.subscribe("firstPageLinkClassChange",this.update,this,true);};c.ui.FirstPageLink.init=function(d){d.setAttributeConfig("firstPageLinkLabel",{value:"&lt;&lt; first",validator:b.isString});d.setAttributeConfig("firstPageLinkClass",{value:"yui-pg-first",validator:b.isString});d.setAttributeConfig("firstPageLinkTitle",{value:"First Page",validator:b.isString});};c.ui.FirstPageLink.prototype={current:null,link:null,span:null,render:function(e){var f=this.paginator,h=f.get("firstPageLinkClass"),d=f.get("firstPageLinkLabel"),g=f.get("firstPageLinkTitle");this.link=document.createElement("a");this.span=document.createElement("span");a(this.link,e+"-first-link");this.link.href="#";this.link.className=h;this.link.innerHTML=d;this.link.title=g;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);a(this.span,e+"-first-span");this.span.className=h;this.span.innerHTML=d;this.current=f.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(f){if(f&&f.prevValue===f.newValue){return;}var d=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()>1){if(d&&this.current===this.span){d.replaceChild(this.link,this.current);this.current=this.link;}}else{if(d&&this.current===this.link){d.replaceChild(this.span,this.current);this.current=this.span;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(d){YAHOO.util.Event.stopEvent(d);this.paginator.setPage(1);}};})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.LastPageLink=function(d){this.paginator=d;d.subscribe("recordOffsetChange",this.update,this,true);d.subscribe("rowsPerPageChange",this.update,this,true);d.subscribe("totalRecordsChange",this.update,this,true);d.subscribe("destroy",this.destroy,this,true);d.subscribe("lastPageLinkLabelChange",this.update,this,true);d.subscribe("lastPageLinkClassChange",this.update,this,true);};c.ui.LastPageLink.init=function(d){d.setAttributeConfig("lastPageLinkLabel",{value:"last &gt;&gt;",validator:b.isString});d.setAttributeConfig("lastPageLinkClass",{value:"yui-pg-last",validator:b.isString});d.setAttributeConfig("lastPageLinkTitle",{value:"Last Page",validator:b.isString});};c.ui.LastPageLink.prototype={current:null,link:null,span:null,na:null,render:function(e){var g=this.paginator,i=g.get("lastPageLinkClass"),d=g.get("lastPageLinkLabel"),f=g.getTotalPages(),h=g.get("lastPageLinkTitle");this.link=document.createElement("a");this.span=document.createElement("span");this.na=this.span.cloneNode(false);a(this.link,e+"-last-link");this.link.href="#";this.link.className=i;this.link.innerHTML=d;this.link.title=h;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);a(this.span,e+"-last-span");this.span.className=i;this.span.innerHTML=d;a(this.na,e+"-last-na");switch(f){case c.VALUE_UNLIMITED:this.current=this.na;break;case g.getCurrentPage():this.current=this.span;break;default:this.current=this.link;}return this.current;},update:function(f){if(f&&f.prevValue===f.newValue){return;}var d=this.current?this.current.parentNode:null,g=this.link;if(d){switch(this.paginator.getTotalPages()){case c.VALUE_UNLIMITED:g=this.na;break;case this.paginator.getCurrentPage():g=this.span;break;}if(this.current!==g){d.replaceChild(g,this.current);this.current=g;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(d){YAHOO.util.Event.stopEvent(d);this.paginator.setPage(this.paginator.getTotalPages());}};})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.NextPageLink=function(d){this.paginator=d;d.subscribe("recordOffsetChange",this.update,this,true);d.subscribe("rowsPerPageChange",this.update,this,true);d.subscribe("totalRecordsChange",this.update,this,true);d.subscribe("destroy",this.destroy,this,true);d.subscribe("nextPageLinkLabelChange",this.update,this,true);
d.subscribe("nextPageLinkClassChange",this.update,this,true);};c.ui.NextPageLink.init=function(d){d.setAttributeConfig("nextPageLinkLabel",{value:"next &gt;",validator:b.isString});d.setAttributeConfig("nextPageLinkClass",{value:"yui-pg-next",validator:b.isString});d.setAttributeConfig("nextPageLinkTitle",{value:"Next Page",validator:b.isString});};c.ui.NextPageLink.prototype={current:null,link:null,span:null,render:function(e){var g=this.paginator,i=g.get("nextPageLinkClass"),d=g.get("nextPageLinkLabel"),f=g.getTotalPages(),h=g.get("nextPageLinkTitle");this.link=document.createElement("a");this.span=document.createElement("span");a(this.link,e+"-next-link");this.link.href="#";this.link.className=i;this.link.innerHTML=d;this.link.title=h;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);a(this.span,e+"-next-span");this.span.className=i;this.span.innerHTML=d;this.current=g.getCurrentPage()===f?this.span:this.link;return this.current;},update:function(g){if(g&&g.prevValue===g.newValue){return;}var f=this.paginator.getTotalPages(),d=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()!==f){if(d&&this.current===this.span){d.replaceChild(this.link,this.current);this.current=this.link;}}else{if(this.current===this.link){if(d){d.replaceChild(this.span,this.current);this.current=this.span;}}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(d){YAHOO.util.Event.stopEvent(d);this.paginator.setPage(this.paginator.getNextPage());}};})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.PreviousPageLink=function(d){this.paginator=d;d.subscribe("recordOffsetChange",this.update,this,true);d.subscribe("rowsPerPageChange",this.update,this,true);d.subscribe("totalRecordsChange",this.update,this,true);d.subscribe("destroy",this.destroy,this,true);d.subscribe("previousPageLinkLabelChange",this.update,this,true);d.subscribe("previousPageLinkClassChange",this.update,this,true);};c.ui.PreviousPageLink.init=function(d){d.setAttributeConfig("previousPageLinkLabel",{value:"&lt; prev",validator:b.isString});d.setAttributeConfig("previousPageLinkClass",{value:"yui-pg-previous",validator:b.isString});d.setAttributeConfig("previousPageLinkTitle",{value:"Previous Page",validator:b.isString});};c.ui.PreviousPageLink.prototype={current:null,link:null,span:null,render:function(e){var f=this.paginator,h=f.get("previousPageLinkClass"),d=f.get("previousPageLinkLabel"),g=f.get("previousPageLinkTitle");this.link=document.createElement("a");this.span=document.createElement("span");a(this.link,e+"-prev-link");this.link.href="#";this.link.className=h;this.link.innerHTML=d;this.link.title=g;YAHOO.util.Event.on(this.link,"click",this.onClick,this,true);a(this.span,e+"-prev-span");this.span.className=h;this.span.innerHTML=d;this.current=f.getCurrentPage()>1?this.link:this.span;return this.current;},update:function(f){if(f&&f.prevValue===f.newValue){return;}var d=this.current?this.current.parentNode:null;if(this.paginator.getCurrentPage()>1){if(d&&this.current===this.span){d.replaceChild(this.link,this.current);this.current=this.link;}}else{if(d&&this.current===this.link){d.replaceChild(this.span,this.current);this.current=this.span;}}},destroy:function(){YAHOO.util.Event.purgeElement(this.link);this.current.parentNode.removeChild(this.current);this.link=this.span=null;},onClick:function(d){YAHOO.util.Event.stopEvent(d);this.paginator.setPage(this.paginator.getPreviousPage());}};})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.RowsPerPageDropdown=function(d){this.paginator=d;d.subscribe("rowsPerPageChange",this.update,this,true);d.subscribe("rowsPerPageOptionsChange",this.rebuild,this,true);d.subscribe("totalRecordsChange",this._handleTotalRecordsChange,this,true);d.subscribe("destroy",this.destroy,this,true);d.subscribe("rowsPerPageDropdownClassChange",this.rebuild,this,true);};c.ui.RowsPerPageDropdown.init=function(d){d.setAttributeConfig("rowsPerPageOptions",{value:[],validator:b.isArray});d.setAttributeConfig("rowsPerPageDropdownClass",{value:"yui-pg-rpp-options",validator:b.isString});};c.ui.RowsPerPageDropdown.prototype={select:null,all:null,render:function(d){this.select=document.createElement("select");a(this.select,d+"-rpp");this.select.className=this.paginator.get("rowsPerPageDropdownClass");this.select.title="Rows per page";YAHOO.util.Event.on(this.select,"change",this.onChange,this,true);this.rebuild();return this.select;},rebuild:function(m){var d=this.paginator,g=this.select,n=d.get("rowsPerPageOptions"),f,l,h,j,k;this.all=null;for(j=0,k=n.length;j<k;++j){l=n[j];f=g.options[j]||g.appendChild(document.createElement("option"));h=b.isValue(l.value)?l.value:l;f.text=b.isValue(l.text)?l.text:l;if(b.isString(h)&&h.toLowerCase()==="all"){this.all=f;f.value=d.get("totalRecords");}else{f.value=h;}}while(g.options.length>n.length){g.removeChild(g.firstChild);}this.update();},update:function(j){if(j&&j.prevValue===j.newValue){return;}var h=this.paginator.get("rowsPerPage")+"",f=this.select.options,g,d;for(g=0,d=f.length;g<d;++g){if(f[g].value===h){f[g].selected=true;break;}}},onChange:function(d){this.paginator.setRowsPerPage(parseInt(this.select.options[this.select.selectedIndex].value,10));},_handleTotalRecordsChange:function(d){if(!this.all||(d&&d.prevValue===d.newValue)){return;}this.all.value=d.newValue;if(this.all.selected){this.paginator.set("rowsPerPage",d.newValue);}},destroy:function(){YAHOO.util.Event.purgeElement(this.select);this.select.parentNode.removeChild(this.select);this.select=null;}};})();(function(){var c=YAHOO.widget.Paginator,b=YAHOO.lang,a=YAHOO.util.Dom.generateId;c.ui.JumpToPageDropdown=function(d){this.paginator=d;d.subscribe("rowsPerPageChange",this.rebuild,this,true);d.subscribe("rowsPerPageOptionsChange",this.rebuild,this,true);d.subscribe("pageChange",this.update,this,true);d.subscribe("totalRecordsChange",this.rebuild,this,true);
d.subscribe("destroy",this.destroy,this,true);};c.ui.JumpToPageDropdown.init=function(d){d.setAttributeConfig("jumpToPageDropdownClass",{value:"yui-pg-jtp-options",validator:b.isString});};c.ui.JumpToPageDropdown.prototype={select:null,render:function(d){this.select=document.createElement("select");a(this.select,d+"-jtp");this.select.className=this.paginator.get("jumpToPageDropdownClass");this.select.title="Jump to page";YAHOO.util.Event.on(this.select,"change",this.onChange,this,true);this.rebuild();return this.select;},rebuild:function(l){var k=this.paginator,j=this.select,f=k.getTotalPages(),h,g,d;this.all=null;for(g=0,d=f;g<d;++g){h=j.options[g]||j.appendChild(document.createElement("option"));h.innerHTML=g+1;h.value=g+1;}for(g=f,d=j.options.length;g<d;g++){j.removeChild(j.lastChild);}this.update();},update:function(j){if(j&&j.prevValue===j.newValue){return;}var h=this.paginator.getCurrentPage()+"",f=this.select.options,g,d;for(g=0,d=f.length;g<d;++g){if(f[g].value===h){f[g].selected=true;break;}}},onChange:function(d){this.paginator.setPage(parseInt(this.select.options[this.select.selectedIndex].value,false));},destroy:function(){YAHOO.util.Event.purgeElement(this.select);this.select.parentNode.removeChild(this.select);this.select=null;}};})();YAHOO.register("paginator",YAHOO.widget.Paginator,{version:"2.9.0pr1",build:"2725"});