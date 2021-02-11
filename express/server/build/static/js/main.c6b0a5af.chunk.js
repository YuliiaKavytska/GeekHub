(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{27:function(t,e,l){},28:function(t,e,l){},29:function(t,e,l){},36:function(t,e,l){"use strict";l.r(e);var n=l(0),i=l.n(n),c=l(14),s=l.n(c),a=(l(27),l(28),l(29),l(13)),o=Object(a.b)({name:"list",initialState:{list:[],lastTask:localStorage.lastTodo?JSON.parse(localStorage.lastTodo):"",countOfActiveTasks:0,filter:"all",filterResult:[]},reducers:{setTodos:function(t,e){t.list=e.payload.list,t.filterResult=e.payload.list,t.countOfActiveTasks=e.payload.list.filter((function(t){return"active"===t.status})).length},changeItemStatus:function(t,e){var l=t.list.findIndex((function(t){return t.id===e.payload.id}));"active"===t.list[l].status?t.list[l].status="completed":t.list[l].status="active",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length,t.filterResult=t.list,t.filter="all"},changeEditing:function(t,e){var l=t.list.findIndex((function(t){return t.id===e.payload.id}));!1===e.payload.case?t.list[l].editing=!1:t.list[l].editing=!t.list[l].editing,t.filterResult=t.list},changeItemTask:function(t,e){var l=t.list.findIndex((function(t){return t.id===e.payload.id}));t.list[l].task=e.payload.task,t.filterResult=t.list},addItem:function(t){if(""!==t.lastTask){var e=t.list.length>0?t.list[t.list.length-1].id+1:1;t.list.push({id:e,task:t.lastTask,status:"active",editing:!1}),t.lastTask="",t.countOfActiveTasks+=1,t.filterResult=t.list,t.filter="all"}},deleteItem:function(t,e){t.list=t.list.filter((function(t){return t.id!==e.payload.id})),t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length,t.filterResult=t.list,t.filter="all"},deleteCompleted:function(t){t.list=t.list.filter((function(t){return"completed"!==t.status})),t.filterResult=t.list},changeLastTask:function(t,e){t.lastTask=e.payload.task},completedAll:function(t){t.list.every((function(t){return"active"===t.status}))||t.list.some((function(t){return"active"===t.status}))?(t.list.forEach((function(t){t.status="completed"})),t.countOfActiveTasks=0):(t.list.forEach((function(t){t.status="active"})),t.countOfActiveTasks=t.list.length),t.filterResult=t.list},changeFilter:function(t,e){switch(e.payload.filter){case"all":t.filterResult=t.list,t.filter="all",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;case"active":t.filterResult=t.list.filter((function(t){return"completed"!==t.status})),t.filter="active",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;case"completed":t.filterResult=t.list.filter((function(t){return"active"!==t.status})),t.filter="completed",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;case"item":t.filterResult=t.list.filter((function(t){return t.id===e.payload.id})),t.filter="all",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length;break;default:return}}}}),u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return function(n){fetch("/api/all",{method:"GET",headers:{"X-Request-With":"XMLHttpRequest"}}).then((function(t){return t.json()})).then((function(i){0===i.resultCode&&(n(d({list:i.list})),n(p({filter:t,id:e})),l&&n(j({id:e})))}))}},r=o.actions,d=r.setTodos,f=r.changeItemStatus,b=r.changeItemTask,j=r.changeEditing,h=r.addItem,O=r.deleteItem,m=r.deleteCompleted,g=r.changeLastTask,k=r.completedAll,p=r.changeFilter,v=l(9),x=l(3),C=l(1),T=function(t){var e=t.item,l=t.changeEditingCall,c=t.changeItemStatusCall,s=t.deleteItemCall,a=t.changeItemTaskCall,o=Object(n.useCallback)((function(t){l(e.id)}),[l,e]),u=Object(n.useCallback)((function(){c(e.id)}),[c,e]),r=Object(n.useCallback)((function(){s(e.id)}),[s,e]),d=Object(n.useCallback)((function(t){a(e.id,t.currentTarget.value)}),[a,e]),f=Object(n.useCallback)((function(){l(e.id,!1)}),[l,e]),b=i.a.createRef();return Object(n.useEffect)((function(){b.current&&b.current.focus()}),[b]),Object(C.jsxs)("li",{className:"completed"===e.status?e.editing?"completed editing":"completed":e.editing?"editing":void 0,onDoubleClick:o,children:[Object(C.jsxs)("div",{className:"view",children:[Object(C.jsx)("input",{className:"toggle",type:"checkbox",checked:"completed"===e.status,onChange:u}),Object(C.jsx)("label",{children:e.task}),Object(C.jsx)("button",{className:"destroy",onClick:r})]}),Object(C.jsx)("input",{className:"edit",value:e.task,onInput:d,onBlur:f,ref:b})]})},y=function(){var t=Object(v.c)((function(t){return t.toDo})).filterResult,e=Object(v.b)(),l=Object(x.f)(),i=l.filter,c=l.num,s=l.edit;Object(n.useEffect)((function(){switch(i){case"todo":e(c&&!s?u("item",Number(c)):c&&s?u("item",Number(c),!0):u("all"));break;case void 0:e(u("all"));break;default:e(u(i))}}),[e,s,c,i]);var a=Object(n.useCallback)((function(){e((function(t){fetch("/api/completeAll",{method:"GET",headers:{"X-Request-With":"XMLHttpRequest"}}).then((function(t){return t.json()})).then((function(e){0===e.resultCode&&t(k())}))}))}),[e]),o=Object(n.useCallback)((function(t,l){e(j({id:t,case:l}))}),[e]),r=Object(n.useCallback)((function(t){e(function(t){return function(e){fetch("/api/changeTodo",{method:"PUT",headers:{"X-Request-With":"XMLHttpRequest","Content-Type":"application/json"},body:JSON.stringify({id:t})}).then((function(t){return t.json()})).then((function(l){0===l.resultCode&&e(f({id:t}))}))}}(t))}),[e]),d=Object(n.useCallback)((function(t){e(O({id:t}))}),[e]),h=Object(n.useCallback)((function(t,l){e(b({id:t,task:l}))}),[e]);return Object(C.jsxs)("section",{className:"main",children:[Object(C.jsx)("input",{id:"toggle-all",className:"toggle-all",type:"checkbox",onClick:a}),Object(C.jsx)("label",{htmlFor:"toggle-all",children:" Mark all as complete"}),Object(C.jsx)("ul",{className:"todo-list",children:t.map((function(t){return Object(C.jsx)(T,{item:t,changeEditingCall:o,changeItemStatusCall:r,deleteItemCall:d,changeItemTaskCall:h},t.id)}))})]})},N=l(10),I=function(){var t=Object(v.c)((function(t){return t.toDo})).countOfActiveTasks,e=Object(v.b)();return Object(C.jsxs)("footer",{className:"footer",children:[Object(C.jsxs)("span",{className:"todo-count",children:[Object(C.jsx)("strong",{children:t})," item left"]}),Object(C.jsxs)("ul",{className:"filters",children:[Object(C.jsx)("li",{children:Object(C.jsx)(N.b,{activeClassName:"selected",to:"/",exact:!0,children:"All"})}),Object(C.jsx)("li",{children:Object(C.jsx)(N.b,{activeClassName:"selected",to:"/active",exact:!0,children:"Active"})}),Object(C.jsx)("li",{children:Object(C.jsx)(N.b,{activeClassName:"selected",to:"/completed",exact:!0,children:"Completed"})})]}),Object(C.jsx)("button",{className:"clear-completed",onClick:function(){return e(m())},children:"Clear completed"})]})},R=l(8),A=Object(R.c)({toDo:o.reducer}),S=Object(a.c)({thunk:!0}),E=Object(a.a)({reducer:A,middleware:S});E.subscribe((function(){localStorage.lastTodo=JSON.stringify(E.getState().toDo.lastTask)})),window.store=E;var w=function(){var t=Object(v.c)((function(t){return t.toDo})).lastTask,e=Object(v.b)(),l=Object(n.useCallback)((function(t){"Enter"===t.key&&e(h())}),[e]),i=Object(n.useCallback)((function(t){e(g({task:t.target.value}))}),[e]);return Object(C.jsxs)("header",{className:"header",children:[Object(C.jsx)("h1",{children:"todos"}),Object(C.jsx)("input",{className:"new-todo",placeholder:"What needs to be done?",value:t,onInput:i,onKeyPress:l,autoFocus:!0})]})},F=function(){return Object(C.jsxs)("section",{className:"todoapp",children:[Object(C.jsx)(w,{}),Object(C.jsx)(x.a,{path:"/:filter?/:num?/:edit?",render:function(){return Object(C.jsx)(y,{})}}),Object(C.jsx)(I,{})]})},D=function(){return Object(C.jsx)(N.a,{children:Object(C.jsx)(v.a,{store:E,children:Object(C.jsx)(x.c,{children:Object(C.jsx)(F,{})})})})},L=function(t){t&&t instanceof Function&&l.e(3).then(l.bind(null,37)).then((function(e){var l=e.getCLS,n=e.getFID,i=e.getFCP,c=e.getLCP,s=e.getTTFB;l(t),n(t),i(t),c(t),s(t)}))};s.a.render(Object(C.jsxs)(i.a.StrictMode,{children:[Object(C.jsx)(D,{}),","]}),document.getElementById("root")),L()}},[[36,1,2]]]);
//# sourceMappingURL=main.c6b0a5af.chunk.js.map