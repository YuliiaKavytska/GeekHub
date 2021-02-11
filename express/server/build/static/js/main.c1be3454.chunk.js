(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{27:function(t,e,n){},28:function(t,e,n){},29:function(t,e,n){},36:function(t,e,n){"use strict";n.r(e);var i=n(0),c=n.n(i),s=n(14),l=n.n(s),a=(n(27),n(28),n(29),n(13)),o=Object(a.b)({name:"list",initialState:{list:[],lastTask:localStorage.lastTodo?JSON.parse(localStorage.lastTodo):"",countOfActiveTasks:0,filter:"all",filterResult:[]},reducers:{setTodos:function(t,e){t.list=e.payload.list,t.filterResult=e.payload.list,t.countOfActiveTasks=e.payload.list.filter((function(t){return"active"===t.status})).length},changeItemStatus:function(t,e){var n=t.list.findIndex((function(t){return t.id===e.payload.id}));"active"===t.list[n].status?t.list[n].status="completed":t.list[n].status="active",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length,t.filterResult=t.list,t.filter="all"},changeEditing:function(t,e){var n=t.list.findIndex((function(t){return t.id===e.payload.id}));!1===e.payload.case?t.list[n].editing=!1:t.list[n].editing=!t.list[n].editing,t.filterResult=t.list},changeItemTask:function(t,e){var n=t.list.findIndex((function(t){return t.id===e.payload.id}));t.list[n].task=e.payload.task,t.filterResult=t.list},addItem:function(t){if(""!==t.lastTask){var e=t.list.length>0?t.list[t.list.length-1].id+1:1;t.list.push({id:e,task:t.lastTask,status:"active",editing:!1}),t.lastTask="",t.countOfActiveTasks+=1,t.filterResult=t.list,t.filter="all"}},deleteItem:function(t,e){t.list=t.list.filter((function(t){return t.id!==e.payload.id})),t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length,t.filterResult=t.list,t.filter="all"},deleteCompleted:function(t){t.list=t.list.filter((function(t){return"completed"!==t.status})),t.filterResult=t.list},changeLastTask:function(t,e){t.lastTask=e.payload.task},completedAll:function(t){t.list.every((function(t){return"active"===t.status}))||t.list.some((function(t){return"active"===t.status}))?(t.list.forEach((function(t){t.status="completed"})),t.countOfActiveTasks=0):(t.list.forEach((function(t){t.status="active"})),t.countOfActiveTasks=t.list.length),t.filterResult=t.list},changeFilter:function(t,e){switch(e.payload.filter){case"all":t.filterResult=t.list,t.filter="all",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;case"active":t.filterResult=t.list.filter((function(t){return"completed"!==t.status})),t.filter="active",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;case"completed":t.filterResult=t.list.filter((function(t){return"active"!==t.status})),t.filter="completed",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;case"item":t.filterResult=t.list.filter((function(t){return t.id===e.payload.id})),t.filter="all",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;default:return}}}}),u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return function(i){fetch("/all",{method:"GET",headers:{"X-Requested-With":"XMLHttpRequest"}}).then((function(t){return t.json()})).then((function(c){0===c.resultCode&&(i(d({list:c.list})),i(k({filter:t,id:e})),n&&i(j({id:e})))}))}},r=o.actions,d=r.setTodos,f=r.changeItemStatus,h=r.changeItemTask,j=r.changeEditing,b=r.addItem,O=r.deleteItem,p=r.deleteCompleted,m=r.changeLastTask,g=r.completedAll,k=r.changeFilter,v=n(9),T=n(3),C=n(1),x=function(t){var e=t.item,n=t.changeEditingCall,s=t.changeItemStatusCall,l=t.deleteItemCall,a=t.changeItemTaskCall,o=c.a.createRef(),u=Object(i.useCallback)((function(t){n(e.id,null,t.currentTarget.value,e.editing)}),[n,e]),r=Object(i.useCallback)((function(){s(e.id)}),[s,e]),d=Object(i.useCallback)((function(){l(e.id)}),[l,e]),f=Object(i.useCallback)((function(t){a(e.id,t.currentTarget.value)}),[a,e]),h=Object(i.useCallback)((function(t){n(e.id,!1,t.currentTarget.value,e.editing)}),[n,e]);return Object(i.useEffect)((function(){o.current&&o.current.focus()}),[o]),Object(C.jsxs)("li",{className:"completed"===e.status?e.editing?"completed editing":"completed":e.editing?"editing":void 0,onDoubleClick:u,children:[Object(C.jsxs)("div",{className:"view",children:[Object(C.jsx)("input",{className:"toggle",type:"checkbox",checked:"completed"===e.status,onChange:r}),Object(C.jsx)("label",{children:e.task}),Object(C.jsx)("button",{className:"destroy",onClick:d})]}),Object(C.jsx)("input",{className:"edit",value:e.task,onInput:f,onBlur:h,ref:o})]})},y=function(){var t=Object(v.c)((function(t){return t.toDo})).filterResult,e=Object(v.b)(),n=Object(T.f)(),c=n.filter,s=n.num,l=n.edit;Object(i.useEffect)((function(){switch(c){case"todo":e(s&&!l?u("item",Number(s)):s&&l?u("item",Number(s),!0):u("all"));break;case void 0:e(u("all"));break;default:e(u(c))}}),[e,l,s,c]);var a=Object(i.useCallback)((function(){e((function(t){fetch("/completeAll",{method:"GET",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"}}).then((function(t){return t.json()})).then((function(e){0===e.resultCode&&t(g())}))}))}),[e]),o=Object(i.useCallback)((function(t,n,i,c){e(c?function(t,e,n){return function(i){fetch("/changeTodo",{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"},body:JSON.stringify({id:t,task:n})}).then((function(t){return t.json()})).then((function(n){0===n.resultCode&&i(j({id:t,case:e}))}))}}(t,n,i):j({id:t,case:n}))}),[e]),r=Object(i.useCallback)((function(t){e(function(t){return function(e){fetch("/changeTodo",{method:"PUT",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"},body:JSON.stringify({id:t})}).then((function(t){return t.json()})).then((function(n){0===n.resultCode&&e(f({id:t}))}))}}(t))}),[e]),d=Object(i.useCallback)((function(t){e(function(t){return function(e){fetch("/changeTodo",{method:"DELETE",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"},body:JSON.stringify({id:t})}).then((function(t){return t.json()})).then((function(n){0===n.resultCode&&e(O({id:t}))}))}}(t))}),[e]),b=Object(i.useCallback)((function(t,n){e(h({id:t,task:n}))}),[e]);return Object(C.jsxs)("section",{className:"main",children:[Object(C.jsx)("input",{id:"toggle-all",className:"toggle-all",type:"checkbox",onClick:a}),Object(C.jsx)("label",{htmlFor:"toggle-all",children:" Mark all as complete"}),Object(C.jsx)("ul",{className:"todo-list",children:t.map((function(t){return Object(C.jsx)(x,{item:t,changeEditingCall:o,changeItemStatusCall:r,deleteItemCall:d,changeItemTaskCall:b},t.id)}))})]})},R=n(10),N=function(){var t=Object(v.c)((function(t){return t.toDo})).countOfActiveTasks,e=Object(v.b)(),n=Object(i.useCallback)((function(){e((function(t){fetch("/deleteCompleted",{method:"DELETE",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"}}).then((function(t){return t.json()})).then((function(e){0===e.resultCode&&t(p())}))}))}),[e]);return Object(C.jsxs)("footer",{className:"footer",children:[Object(C.jsxs)("span",{className:"todo-count",children:[Object(C.jsx)("strong",{children:t})," item left"]}),Object(C.jsxs)("ul",{className:"filters",children:[Object(C.jsx)("li",{children:Object(C.jsx)(R.b,{activeClassName:"selected",to:"/",exact:!0,children:"All"})}),Object(C.jsx)("li",{children:Object(C.jsx)(R.b,{activeClassName:"selected",to:"/active",exact:!0,children:"Active"})}),Object(C.jsx)("li",{children:Object(C.jsx)(R.b,{activeClassName:"selected",to:"/completed",exact:!0,children:"Completed"})})]}),Object(C.jsx)("button",{className:"clear-completed",onClick:n,children:"Clear completed"})]})},I=n(8),S=Object(I.c)({toDo:o.reducer}),E=Object(a.c)({thunk:!0}),A=Object(a.a)({reducer:S,middleware:E});A.subscribe((function(){localStorage.lastTodo=JSON.stringify(A.getState().toDo.lastTask)})),window.store=A;var q=function(){var t=Object(v.c)((function(t){return t.toDo})).lastTask,e=Object(v.b)(),n=Object(i.useCallback)((function(n){"Enter"===n.key&&e(function(t){return function(e){fetch("/newTodo",{method:"POST",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"},body:JSON.stringify({task:t})}).then((function(t){return t.json()})).then((function(t){0===t.resultCode&&e(b())}))}}(t))}),[e,t]),c=Object(i.useCallback)((function(t){e(m({task:t.target.value}))}),[e]);return Object(C.jsxs)("header",{className:"header",children:[Object(C.jsx)("h1",{children:"todos"}),Object(C.jsx)("input",{className:"new-todo",placeholder:"What needs to be done?",value:t,onInput:c,onKeyPress:n,autoFocus:!0})]})},X=function(){return Object(C.jsxs)("section",{className:"todoapp",children:[Object(C.jsx)(q,{}),Object(C.jsx)(T.a,{path:"/:filter?/:num?/:edit?",render:function(){return Object(C.jsx)(y,{})}}),Object(C.jsx)(N,{})]})},L=function(){return Object(C.jsx)(R.a,{children:Object(C.jsx)(v.a,{store:A,children:Object(C.jsx)(T.c,{children:Object(C.jsx)(X,{})})})})},w=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,37)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,s=e.getLCP,l=e.getTTFB;n(t),i(t),c(t),s(t),l(t)}))};l.a.render(Object(C.jsxs)(c.a.StrictMode,{children:[Object(C.jsx)(L,{}),","]}),document.getElementById("root")),w()}},[[36,1,2]]]);
//# sourceMappingURL=main.c1be3454.chunk.js.map