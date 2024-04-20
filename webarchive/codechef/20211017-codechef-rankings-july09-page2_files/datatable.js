(function(){Ember.TEMPLATES["dataTableRow"]=Ember.Handlebars.compile("<td>{{id}}</td><td>{{name}}</td><td>{{age}}</td>");Ember.TEMPLATES["components/data-table"]=Ember.Handlebars.compile(""+"<div {{bind-attr class=cssClass}}>  </div>"+"<div class='table-component' style='position: relative;'>"+"{{#if table.loading}}"+"<div style=' background: rgba(171,171,171,0.64); width: 100%; position: absolute;opacity :0.1;height: 100%;'> </div>"+"{{/if}}"+"    <div class='topBox'> {{#if table.searchable}}"+"        <div class='topBox-item'>"+"            <div class='inputBox search'>"+"               {{#if table.isCustomSearchEnabled}}"+"                <div class='inputBox-input-div'> {{input type='text' placeholder='Type to search & press enter' value=table.searchWrapper class='searchBox-input' action='searchAction'}}</div>"+"               {{else}}"+"                   {{#if table.isAjaxified}}"+"                    <div class='inputBox-input-div'> {{input type='text' placeholder='Type to search & press enter' value=table.searchWrapper class='searchBox-input' action='searchAction'}}</div>"+"                   {{else}}"+"                    <div class='inputBox-input-div'> {{input type='text' placeholder='Type to search' value=table.search class='searchBox-input'}}</div>"+"                   {{/if}}"+"               {{/if}}"+"            </div>"+"        </div>"+"        {{/if}} {{#if table.pagination}}"+"        <div class='topBox-item'>"+"            <div class='selectBox'> {{view Ember.Select content=table.perPageSelector value=table.itemsPerPage"+"                class='select'}}"+"            </div>"+"        </div>"+"        {{/if}} {{#if table.filterable}} {{#if table.availableFilters.length}}"+"        <div class='topBox-item'>"+"            <div class='selectBox'> {{view Ember.Select content=table.availableFilters value=table.filterName"+"                class='select'}}"+"            </div>"+"        </div>"+"        <div class='topBox-item'>"+"            <div class='inputBox'>"+"                <div class='inputBox-input-div'> {{auto-complete minLength=1 url=table.autodataUrl qParam=table.autodataQparam isValid=table.isValidFilterValue localdata=table.autodata placeholder=table.placeholder searchText=table.filterValue"+"                    class='input'}}"+"                </div>"+"            </div>"+"        </div>"+"        <div class='topBox-item'>"+"            <button class='ns-button'"+"            {{action 'addFilter'}}>Apply</button></div>"+"        {{/if}} {{/if}}"+"    </div>"+"    {{#if table.appliedFilters.length}}"+"    <div class='tag-container'> {{#each filter in table.appliedFilters}}"+"        <div class='tag-box'>"+"            <div {{bind-attr title=filter.value}} class='tag-text'>{{filter.name}} : {{filter.value}}</div>"+"            <a {{action 'deleteFilter' filter.name filter.value}}>"+"            <div class='tag-remove-icon'></div>"+"            </a>         </div>"+"        {{/each}}"+"   <div class='tag-text' style='color: #999; float: right; font-size: 11px; font-style: italic; position: relative; top: 6px;'>{{table.selectedItems}} of {{table.totalItems}} item(s) </div>"+"    </div>"+"    {{/if}}"+"    <div class='table'>"+"<div class='left-nav nav'><img class='nav-img' src='https://cdn.codechef.com/em/images/nav-left.png'></div>"+"<div class='right-nav nav'><img class='nav-img' src='https://cdn.codechef.com/em/images/nav-right.png'></div>"+"        <table class='dataTable'>"+"            <thead>"+"            <tr> {{#each header in table.headers}}"+"{{#if header.sortable}}"+"            <th> {{#if table.queryParamsEnabled}} {{#link-to linkRouter (query-params page=1 sortBy=header.name"+"                order=header.order) }}"+"                <div"+"                {{bind-attr class=header.class}}"+" ></div>"+"                <div style='display: inline-block'>"+"                {{header.header}}"+"    </div>"+"    {{/link-to}} {{else}} <a {{action 'getSortedContent' header.name}} >"+"{{#if table.hideSortIcon}}"+"<div {{bind-attr class=header.class}} style='display: none'>"+"</div>"+"{{else}}"+"<div {{bind-attr class=header.class}}>"+"</div>"+"{{/if}}"+"<div style='display: inline-block'>"+" {{header.header}}"+"</div></a>                     {{/if}}                 </th>               "+"{{else}}"+"<th><div style='display: inline-block'>  {{header.header}} </div></th>"+"{{/if}}    "+" {{/each}}             </tr>             </thead>"+"<tbody>"+"{{#if table.paginatedContent}}"+" {{#each row in table.paginatedContent }} {{view Ember.DataTableRowView contextBinding='row'"+"rowTemplate=table.rowTemplate table=table}} {{/each}}"+"{{else}}"+"{{#if table.loading}}"+"<tr><td style='text-align:center;' colspan='100%'><img src='https://cdn.codechef.com/misc/ajax_loader_d.gif'></td></tr>"+"{{else}}"+"{{#if table.tableEmptyMessage}}"+"{{{table.tableEmptyMessage}}}"+"{{else}}"+"<tr><div style='text-align: center;'>Oops! we don't have data.</div></tr>"+"{{/if}}"+"{{/if}}"+"{{/if}}"+"</tbody>         </table>     </div>      {{#if table.pagination}}"+"{{#if table.loading}}"+"{{else}}"+"<div class='paginationbox'>"+"<ul>"+" {{#if table.queryParamsEnabled}}"+"<li class='jump'>{{#link-to linkRouter (query-params page=1) }}"+"1{{/link-to}}"+"</li>"+"{{else}}"+"<li class='jump'><a href='' {{action getPage 1}}>1</a>"+"</li>"+"{{/if}}"+" {{#if table.queryParamsEnabled}}"+"<li >{{#if table.prev}}{{#link-to linkRouter (query-params page=table.prevPage) }}<img"+"        src='https://cdn.codechef.com/em/images/pagination-left.png' alt='Previous' title='Previous' border='0'/>{{/link-to}}"+"{{else}}"+"<a class='disabled'><img src='https://cdn.codechef.com/em/images/pagination-left.png' alt='Previous' title='Previous' border='0'/></a>"+"{{/if}}"+"</li>"+"{{else}}"+"<li >{{#if table.prev}}<a href='' {{action getPreviousPage}}><img src='https://cdn.codechef.com/em/images/pagination-left.png' alt='Previous' title='Previous' border='0'/></a>"+"{{else}}"+"<a class='disabled'><img src='https://cdn.codechef.com/em/images/pagination-left.png' alt='Previous' title='Previous' border='0'/></a>"+"{{/if}}"+"</li>"+"{{/if}}"+"{{#if table.paginator.length}}"+"{{#each row in table.paginator}}"+" {{#if table.queryParamsEnabled}}"+"<li >{{#link-to linkRouter (query-params page=row.num) }}"+"{{row.num}}{{/link-to}}"+"</li>"+"{{else}}"+"<li ><a {{bind-attr class=row.cssClass}} href=''{{action getPage row.num}}>"+"{{row.num}}"+"</a>"+"</li>"+"{{/if}}"+"{{/each}}"+"{{else}}"+"<li>0</li>"+"{{/if}}"+" {{#if table.queryParamsEnabled}}"+"<li >{{#if table.next}}{{#link-to linkRouter (query-params page=table.nextPage) }}<img"+"        src='https://cdn.codechef.com/em/images/pagination-right.png' alt='Next' title='Next' border='0'/>{{/link-to}}"+"{{else}}"+"<a class='disabled'><img src='https://cdn.codechef.com/em/images/pagination-right.png' alt='Next' title='Next' border='0'/></a>"+"{{/if}}"+"</li>"+"{{else}}"+"<li >{{#if table.next}}<a href=''{{action getNextPage}}><img src='https://cdn.codechef.com/em/images/pagination-right.png' alt='Next' title='Next' border='0'/></a>"+"{{else}}"+"<a class='disabled'><img src='https://cdn.codechef.com/em/images/pagination-right.png' alt='Next' title='Next' border='0'/></a>"+"{{/if}}"+"</li>"+"{{/if}}"+" {{#if table.queryParamsEnabled}}"+"<li class='jump'>{{#link-to linkRouter (query-params page=table.availablePages) }}"+"{{table.availablePages}}{{/link-to}}"+"</li>"+"{{else}}"+"<li class='jump'><a href='' {{action getPage table.availablePages}}>{{table.availablePages}}</a>"+"</li>"+"{{/if}}"+"</ul>"+"</div>"+"{{/if}}"+"   {{/if}} </div>");String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};Ember.DataTableRowView=Ember.View.extend({tagName:"tr",templateNameBinding:"getTemplateName",getTemplateName:function(){var e=this.get("rowTemplate");if(!Ember.isEmpty(e)&&e.length>0){return e}else{return"dataTableRow"}}.property("rowTemplate")});Ember.ColumnNamesMixin=Ember.Mixin.create({properties:function(){var e=[];var t=this.toArray();if(t.length>0){var a=Object.keys(t.get(0));$.each(a,function(t,a){e.push(a)})}return e}.property("content")});Ember.PaginationMixin=Ember.Mixin.create({itemsPerPage:10,perPageSelector:[10,20,30,40,50],currentPage:function(){return this.get("page")}.property("page"),page:1,maxDisp:7,pageObserver:function(){this.set("currentPage",this.get("page"))}.observes("page"),prev:function(){return this.get("currentPage")>1}.property("currentPage"),next:function(){return this.get("currentPage")!=this.get("availablePages")}.property("currentPage","availablePages"),paginator:function(){var e=Ember.A();var t=this.get("availablePages");var a=this.get("currentPage");var r=this.get("maxDisp");var i;if(t<=r){for(i=1;i<=t;i++){e.pushObject(Ember.Object.create({num:i,cssClass:a==i?"active":""}))}}else{if(a<=Math.floor(r/2)){for(i=1;i<=r;i++){e.pushObject(Ember.Object.create({num:i,cssClass:a==i?"active":""}))}}else if(t-a>Math.floor(r/2)){if(r%2==0){var s=Math.floor(r/2)-1}else{var s=Math.floor(r/2)}for(i=a-s;i<=a-s-1+r;i++){e.pushObject(Ember.Object.create({num:i,cssClass:a==i?"active":""}))}}else{for(i=t-r+1;i<=t;i++){e.pushObject(Ember.Object.create({num:i,cssClass:a==i?"active":""}))}}}return e}.property("currentPage","availablePages"),pages:function(){var e=this.get("availablePages"),t=[];for(var a=0;a<e;a++){var r=a+1;t.push(r.toString())}return t}.property("availablePages"),nextPage:function(){var e=parseInt(this.get("currentPage"))+1;var t=this.get("availablePages");if(e<=t){return e}else{return this.get("currentPage")}}.property("currentPage","availablePages"),prevPage:function(){var e=parseInt(this.get("currentPage"))-1;if(e>0){return e}else{return this.get("currentPage")}}.property("currentPage","availablePages"),availablePages:function(){if(this.get("isAjaxified")){return 0}var e=Math.ceil(this.get("fullData.length")/this.get("itemsPerPage")||1);if(this.get("currentPage")>e){this.set("page",e);this.set("currentPage",e)}return e}.property("fullData.length","itemsPerPage"),paginatedContent:function(){if(this.get("isAjaxified")){return this.get("list")}var e=this.get("currentPage")||1;var t=e*this.get("itemsPerPage");var a=e*this.get("itemsPerPage")-this.get("itemsPerPage");var r=this.get("fullData");return r.slice(a,t)}.property("content.length","currentPage","fullData.@each","itemsPerPage","list"),actions:{nextPage:function(){if(this.get("currentPage")>=this.get("availablePages")){return null}this.set("currentPage",this.get("currentPage")+1)},previousPage:function(){if(this.get("currentPage")<=1){return null}this.set("currentPage",this.get("currentPage")-1)},pageByNum:function(e){this.set("currentPage",e)}}});Ember.DataTableMixin=Ember.Mixin.create(Ember.ColumnNamesMixin,Ember.SortableMixin,Ember.PaginationMixin,{isAjaxified:false,isCustomSearchEnabled:false,ajaxUrl:"",headerAlias:null,sortable:true,searchable:true,filterable:true,sortProperties:["id"],sortAscending:true,pagination:true,hidden:[],search:"",appliedFilters:[],propertiesToSearch:[],propertyAliasMap:Ember.Map.create(),aliasPropertyMap:Ember.Map.create(),queryStringChanged:"",list:function(){}.property("queryString"),selectedItems:function(){return this.get("fullData").length}.property("fullData.length"),totalItems:function(){return this.get("content").length}.property("content.length"),queryString:function(){var e=this.get("queryParams");var t=this;var a=Ember.A();$.each(e,function(e,r){if(!Ember.isEmpty(t.get(r))&&typeof t.get(r)!="function"){a.push(r+"="+encodeURIComponent(t.get(r)))}});a=a.join("&");if(this.get("queryStringChanged")!=a){this.set("queryStringChanged",a)}return a}.property("sortBy","page","itemsPerPage","filterBy","order","search"),autodataUrl:function(){var e=this.getPropertyFromAlias(this.get("filterName"));if(Ember.isEmpty(e))return;var t=this.get("autodataQparam");if(Ember.isEmpty(t)){return null}else{return this.get("ajaxUrl")+"/autocomplete/"}}.property("filterName","autodataQparam"),autodataQparam:function(){var e=this.getPropertyFromAlias(this.get("filterName"));if(Ember.isEmpty(e))return;var t=Ember.Object.create(this.get("autodataQparams"));if(Ember.isEmpty(t.get(e))){return null}else{return this.get("queryString")+"&qparam="+e+"&"+t.get(e)}}.property("filterName","queryString"),autodata:function(){var e=Ember.A();var t=Ember.A();var a=this.getPropertyFromAlias(this.get("filterName"));if(Ember.isEmpty(a))return;if(this.get("isAjaxified")){var r=Ember.Object.create(this.get("filters_autodata"));if(Ember.isEmpty(r)){return[]}try{t=r.get(a)}catch(e){}if(Ember.isEmpty(t)){return null}}else{this.get("fullData").forEach(function(e){t.push(Ember.Object.create(e).get(a))})}if(!Ember.isEmpty(t)){t=t.uniq();t.forEach(function(t){if(!Ember.isEmpty(t)){e.push({text:t})}})}return e}.property("filterName","filters_autodata","model"),actions:{searchAction:function(){this.set("search",this.get("searchWrapper"))},propSort:function(e){var t=this.get("order");this.set("order",this.sortProperties[0]===e?!Ember.isEmpty(t)?t=="asc"?"desc":"asc":"desc":"asc");this.set("sortBy",e);this.set("currentPage",1)},applyFilter:function(){var e=this.get("filterName");var t=this.get("filterValue");if(!this.get("isValidFilterValue")){alert("Can't apply filter, enter a valid Filter Value. "+this.get("placeholder"));return}if(!Ember.isEmpty(t)){if(!t.length>0){return}else{this.set("page",1);var a=this.get("appliedFilters");var r={name:e,value:t};Ember.A(a);a.pushObject(r);this.set("filterValue","");if(this.get("queryParamsEnabled")){this.send("sendTransition");return}}}else{return}},deleteFilter:function(e){this.send("removeFilter",e.name,e.value)},removeFilter:function(e,t){this.set("page",1);var a=this.get("appliedFilters");var r=[];$.each(a,function(t,a){if(a.name!=e){r.push({name:a.name,value:a.value})}});this.set("appliedFilters",r);if(this.get("queryParamsEnabled")){this.send("sendTransition");return}},sendTransition:function(){var e=[];var t=this.get("appliedFilters");$.each(t,function(t,a){e.push(a.name+"="+a.value)});e=e.join(";");if(this.get("queryParamsEnabled")){if(e.length){this.transitionToRoute({queryParams:{filterBy:e}});return}else{this.transitionToRoute({queryParams:{filterBy:""}});return}}}},getPropertyAlias:function(e){var t=this.toString();var a=this.get("aliasPropertyMap");if(!a.has(t)){var r=Ember.Map.create();a.set(t,r);a=r}if(a.has(e)){return a.get(e)}this.generateMap(a,false);return a.get(e)},getPropertyFromAlias:function(e){var t=this.toString();var a=this.get("propertyAliasMap");if(!a.has(t)){var r=Ember.Map.create();a.set(t,r);a=r}if(a.has(e)){return a.get(e)}this.generateMap(a,true);return a.get(e)},generateMap:function(e,t){var a=this.get("headerAlias");var r=this.get("properties");var i=this.get("filters");$.each(r,function(r,i){var s=t?i.replace(/_/g," ").capitalize():i;var n=t?i:i.replace(/_/g," ").capitalize();if(a.hasOwnProperty(i)){t?e.set(a.get(i),i):e.set(i,a.get(i))}else{e.set(s,n)}});$.each(i,function(a,r){var i=t?r.replace(/_/g," ").capitalize():r;var s=t?r:r.replace(/_/g," ").capitalize();var n=false;if(t){e.forEach(function(e,t){if(t==s){n=true;return}});if(!n){e.set(i,s)}}else{if(!e.has(r)){e.set(i,s)}}})},headers:function(){var e=this.get("properties");var t=[];var a=this.get("sortBy");var r=this.get("order");var i=this;var s=this.get("hidden");var n=this.get("nonSortableProperties");$.each(e,function(e,l){if($.inArray(l,s)<0){t.push({header:i.getPropertyAlias(l),name:l,sortable:!Ember.isEmpty(n)?n.indexOf(l)>-1?false:true:true,order:!Ember.isEmpty(a)?a==l?!Ember.isEmpty(r)?r=="asc"?"desc":"asc":"asc":"asc":"asc",class:!Ember.isEmpty(a)?a==l?!Ember.isEmpty(r)?r=="asc"?"sortIcon active-asc":"sortIcon active-desc":"sortIcon both":"sortIcon both":"sortIcon both"})}});return t}.property("properties","sortBy","order"),availableFilters:function(){var e=this.get("filters");var t=this.get("appliedFilters");var a=[];var r=[];var i=this;$.each(t,function(e,t){a.push(i.getPropertyFromAlias(t.name))});$.each(e,function(e,t){if($.inArray(t,a)==-1){r.push(i.getPropertyAlias(t))}});this.set("filterName",r[0]);return r}.property("appliedFilters.length","filters.length"),filters:function(){return this.get("properties")}.property("properties"),sortedContent:function(){return this.toArray()}.property("content.length","sortAscending","sortProperties"),searchedContent:function(){var e;var t=this.get("search").trim();var a=Ember.isEmpty(this.get("propertiesToSearch"))?this.get("properties"):this.get("propertiesToSearch");var r=this.get("sortedContent");e=$.grep(r,function(e,r){var i=0;if(typeof e.get!="function"){e=Ember.Object.create(e)}$.each(a,function(a,r){i=i||!Ember.isEmpty(e.get(r))&&e.get(r).toString().toLowerCase().indexOf(t.toLowerCase())+1});return i>0});Ember.A(e);return e.toArray()}.property("content.length","search","sortedContent"),filteredContent:function(){var e=this.get("searchedContent");var t;var a=this.get("appliedFilters");var r=this.get("properties");var i=this;t=$.grep(e.toArray(),function(e,t){var s=1;if(typeof e.get!="function"){e=Ember.Object.create(e)}$.each(a,function(t,a){var n=i.getPropertyFromAlias(a.name);if(r.indexOf(n)>-1){s=s&&!Ember.isEmpty(e.get(n))&&e.get(n).toString()==a.value.toString()}});return s>0});Ember.A(t);return t.toArray()}.property("content.length","appliedFilters.length","searchedContent"),fullData:function(){return this.get("filteredContent")}.property("content.length","filteredContent"),searchObserver:function(){this.set("searchWrapper",this.get("search"));this.set("page",1)}.observes("search"),sortByObserver:function(){var e=this.get("sortBy");this.set("sortProperties",!Ember.isEmpty(e)?[e]:["id"])}.observes("sortBy"),orderObserver:function(){var e=this.get("order");this.set("sortAscending",!Ember.isEmpty(e)?e=="asc":true)}.observes("order"),filterByObserver:function(){var e=[];var t=this.get("filterBy");if(t.length>0){t=t.split(";");$.each(t,function(t,a){var r=a.split("=");if(r.length==2){Ember.A(e);e.pushObject({name:r[0],value:r[1]})}})}this.set("appliedFilters",e)}.observes("filterBy"),appliedFiltersObserver:function(){this.set("page",1)}.observes("fullData.length"),filterNameObserver:function(){var e=this.get("filterPlaceHolders");var t=this.get("filterName");if(!Ember.isEmpty(e)&&!Ember.isEmpty(this.getPropertyFromAlias(t))){this.set("placeholder",e.get(this.getPropertyFromAlias(t)))}this.set("filterValue","")}.observes("filterName")});var e=Ember.Component.extend(Ember.TargetActionSupport,{didInsertElement:function(){this._super();var e=$(this.get("element"));var t=$(e.find(".dataTable")[0]);var a=e.find(".nav");a.hide();a.mouseover(function(){var e=$(this.parentNode).find(".dataTable");if($(this).hasClass("right-nav")){e.parent().animate({scrollLeft:e.width()})}else if($(this).hasClass("left-nav")){e.parent().animate({scrollLeft:0})}});t.mouseover(function(){var e=this.parentNode;var a=Math.abs($(this).width()-$(e).width())>2;if(a){var r=$(e.parentNode).find(".nav");r.css("position","fixed");var i=$(this).position().top+t.parent().offset().top;r.css("top",i);$(e).find(".right-nav").css("left",$(e).position().left+$(e).width()+$(e).offset().left-30);if(t.parent().height()-$(window).scrollTop()>200){r.fadeIn()}else{r.hide()}}$(window).on("scroll",function(){var e=t.parent().find(".nav");if(!(t.parent().height()-$(window).scrollTop()>200)){e.hide()}})});t.parent().mouseleave(function(){$(window).unbind("scroll");var e=this;var t=$(e.parentNode).find(".nav");t.fadeOut()})},linkRouter:function(){var e=App.__container__.lookup("router:main");var t=e.router.currentHandlerInfos;var a=t[t.length-1];var r=a.handler;return r.get("routeName")}.property(),cssClass:"",actions:{loading:function(){this.set("cssClass","overlay");return true},ready:function(){this.set("cssClass","");return true},getSortedContent:function(e){this.send("loading");var t=this;this.triggerAction({action:"propSort",target:t.get("table"),actionContext:e});this.send("ready")},getNextPage:function(){this.send("loading");var e=this;this.triggerAction({action:"nextPage",target:e.get("table")});this.send("ready")},getPage:function(e){this.send("loading");var t=this;this.triggerAction({action:"pageByNum",target:t.get("table"),actionContext:e});this.send("ready")},getPreviousPage:function(){this.send("loading");var e=this;this.triggerAction({action:"previousPage",target:e.get("table")});this.send("ready")},addFilter:function(){this.send("loading");var e=this;this.triggerAction({action:"applyFilter",target:e.get("table")});this.send("ready")},searchAction:function(){this.send("loading");var e=this;this.triggerAction({action:"searchAction",target:e.get("table")});this.send("ready")},deleteFilter:function(e,t){this.send("loading");var a=this;this.triggerAction({action:"deleteFilter",target:a.get("table"),actionContext:{name:e,value:t}});this.send("ready")}}});Ember.Application.initializer({name:"data-table-component",initialize:function(t,a){t.register("component:data-table",e)}})})();