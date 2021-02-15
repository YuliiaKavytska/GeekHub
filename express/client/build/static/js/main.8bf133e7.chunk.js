(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{20:function(t,e,n){t.exports={error:"Header_error__17BVU",header:"Header_header__3mObx"}},28:function(t,e,n){},29:function(t,e,n){},30:function(t,e,n){},41:function(t,e,n){"use strict";n.r(e);var l=n(0),i=n.n(l),s=n(14),c=n.n(s),a=(n(28),n(29),n(30),n(13)),r=Object(a.b)({name:"list",initialState:{list:[],lastTask:localStorage.lastTodo?JSON.parse(localStorage.lastTodo):"",countOfActiveTasks:0,filter:"all",filterResult:[],error:null},reducers:{setTodos:function(t,e){t.list=e.payload.list,t.filterResult=e.payload.list,t.countOfActiveTasks=e.payload.list.filter((function(t){return"active"===t.status})).length,t.error=null},changeItemStatus:function(t,e){var n=t.list.findIndex((function(t){return t.id===e.payload.id}));"active"===t.list[n].status?t.list[n].status="completed":t.list[n].status="active",t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length,t.filterResult=t.list,t.filter="all",t.error=null},changeEditing:function(t,e){var n=t.list.findIndex((function(t){return t.id===e.payload.id}));!1===e.payload.case?t.list[n].editing=!1:t.list[n].editing=!t.list[n].editing,t.filterResult=t.list},changeItemTask:function(t,e){var n=t.list.findIndex((function(t){return t.id===e.payload.id}));t.list[n].task=e.payload.task,t.filterResult=t.list,t.error=null},addItem:function(t){if(""!==t.lastTask){var e=t.list.length>0?t.list[t.list.length-1].id+1:1;t.list.push({id:e,task:t.lastTask,status:"active",editing:!1}),t.lastTask="",t.countOfActiveTasks+=1,t.filterResult=t.list,t.filter="all"}t.error=null},deleteItem:function(t,e){t.list=t.list.filter((function(t){return t.id!==e.payload.id})),t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length,t.filterResult=t.list,t.filter="all",t.error=null},deleteCompleted:function(t){t.list=t.list.filter((function(t){return"completed"!==t.status})),t.filterResult=t.list,t.error=null},changeLastTask:function(t,e){t.lastTask=e.payload.task},completedAll:function(t){t.list.every((function(t){return"active"===t.status}))||t.list.some((function(t){return"active"===t.status}))?(t.list.forEach((function(t){t.status="completed"})),t.countOfActiveTasks=0):(t.list.forEach((function(t){t.status="active"})),t.countOfActiveTasks=t.list.length),t.filterResult=t.list,t.error=null},changeFilter:function(t,e){switch(e.payload.filter){case"all":t.filterResult=t.list,t.filter="all";break;case"active":t.filterResult=t.list.filter((function(t){return"completed"!==t.status})),t.filter="active";break;case"completed":t.filterResult=t.list.filter((function(t){return"active"!==t.status})),t.filter="completed";break;case"item":t.filterResult=t.list.filter((function(t){return t.id===e.payload.id})),t.filter="all";break;default:return}t.countOfActiveTasks=t.list.filter((function(t){return"active"===t.status})).length,t.error=null},setErrorResponse:function(t,e){t.error=e.payload.error}}}),o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return function(l){u("/api/all","GET").then((function(i){var s=i.json();200===i.status?s.then((function(i){l(f({list:i.list})),l(v({filter:t,id:e})),n&&l(h({id:e}))})):s.then((function(t){l(T({error:t.message}))}))}))}},u=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l={method:e,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"}};return 0!==Object.keys(n).length&&(l.body=JSON.stringify(n)),fetch(t,l)},d=r.actions,f=d.setTodos,j=d.changeItemStatus,b=d.changeItemTask,h=d.changeEditing,m=d.addItem,O=d.deleteItem,g=d.deleteCompleted,p=d.changeLastTask,k=d.completedAll,v=d.changeFilter,T=d.setErrorResponse,x=n(9),C=n(3),y=n(1),N=function(t){var e=t.item,n=t.changeEditingCall,s=t.changeItemStatusCall,c=t.deleteItemCall,a=t.changeItemTaskCall,r=i.a.createRef(),o=Object(l.useCallback)((function(t){n(e.id,null,t.currentTarget.value,e.editing)}),[n,e]),u=Object(l.useCallback)((function(){s(e.id)}),[s,e]),d=Object(l.useCallback)((function(){c(e.id)}),[c,e]),f=Object(l.useCallback)((function(t){a(e.id,t.currentTarget.value)}),[a,e]),j=Object(l.useCallback)((function(t){n(e.id,!1,t.currentTarget.value,e.editing)}),[n,e]);return Object(l.useEffect)((function(){r.current&&r.current.focus()}),[r]),Object(y.jsxs)("li",{className:"completed"===e.status?e.editing?"completed editing":"completed":e.editing?"editing":void 0,onDoubleClick:o,children:[Object(y.jsxs)("div",{className:"view",children:[Object(y.jsx)("input",{className:"toggle",type:"checkbox",checked:"completed"===e.status,onChange:u}),Object(y.jsx)("label",{children:e.task}),Object(y.jsx)("button",{className:"destroy",onClick:d})]}),Object(y.jsx)("input",{className:"edit",value:e.task,onInput:f,onBlur:j,ref:r})]})},I=function(){var t=Object(x.c)((function(t){return t.toDo})).filterResult,e=Object(x.b)(),n=Object(C.e)(),i=n.filter,s=n.num,c=n.edit;Object(l.useEffect)((function(){switch(i){case"todo":e(s&&!c?o("item",Number(s)):s&&c?o("item",Number(s),!0):o("all"));break;case void 0:e(o("all"));break;default:e(o(i))}}),[e,c,s,i]);var a=Object(l.useCallback)((function(){e((function(t){u("/api/completeAll","GET").then((function(e){200===e.status?t(k()):e.json().then((function(e){t(T({error:e.message}))}))}))}))}),[e]),r=Object(l.useCallback)((function(t,n,l,i){e(i?function(t,e,n){return function(l){u("/api/changeTodo","POST",{id:t,task:n}).then((function(n){200===n.status?l(h({id:t,case:e})):n.json().then((function(t){l(T({error:t.message}))}))}))}}(t,n,l):h({id:t,case:n}))}),[e]),d=Object(l.useCallback)((function(t){e(function(t){return function(e){u("/api/changeTodo","PUT",{id:t}).then((function(n){200===n.status?e(j({id:t})):n.json().then((function(t){e(T({error:t.message}))}))}))}}(t))}),[e]),f=Object(l.useCallback)((function(t){e(function(t){return function(e){u("/api/changeTodo","DELETE",{id:t}).then((function(n){200===n.status?e(O({id:t})):n.json().then((function(t){e(T({error:t.message}))}))}))}}(t))}),[e]),m=Object(l.useCallback)((function(t,n){e(b({id:t,task:n}))}),[e]);return Object(y.jsxs)("section",{className:"main",children:[Object(y.jsx)("input",{id:"toggle-all",className:"toggle-all",type:"checkbox",onClick:a}),Object(y.jsx)("label",{htmlFor:"toggle-all",children:" Mark all as complete"}),Object(y.jsx)("ul",{className:"todo-list",children:t.map((function(t){return Object(y.jsx)(N,{item:t,changeEditingCall:r,changeItemStatusCall:d,deleteItemCall:f,changeItemTaskCall:m},t.id)}))})]})},E=n(10),R=function(){var t=Object(x.c)((function(t){return t.toDo})).countOfActiveTasks,e=Object(x.b)(),n=Object(l.useCallback)((function(){e((function(t){u("/api/deleteCompleted","DELETE").then((function(e){200===e.status?t(g()):e.json().then((function(e){t(T({error:e.message}))}))}))}))}),[e]);return Object(y.jsxs)("footer",{className:"footer",children:[Object(y.jsxs)("span",{className:"todo-count",children:[Object(y.jsx)("strong",{children:t})," item left"]}),Object(y.jsxs)("ul",{className:"filters",children:[Object(y.jsx)("li",{children:Object(y.jsx)(E.b,{activeClassName:"selected",to:"/todo",children:"All"})}),Object(y.jsx)("li",{children:Object(y.jsx)(E.b,{activeClassName:"selected",to:"/active",children:"Active"})}),Object(y.jsx)("li",{children:Object(y.jsx)(E.b,{activeClassName:"selected",to:"/completed",children:"Completed"})})]}),Object(y.jsx)("button",{className:"clear-completed",onClick:n,children:"Clear completed"})]})},S=n(8),A=Object(S.c)({toDo:r.reducer}),w=Object(a.c)({thunk:!0}),D=Object(a.a)({reducer:A,middleware:w});D.subscribe((function(){localStorage.lastTodo=JSON.stringify(D.getState().toDo.lastTask)})),window.store=D;var F=n(20),L=n.n(F),P=function(){var t=Object(x.c)((function(t){return t.toDo})),e=t.lastTask,n=t.error,i=Object(x.b)(),s=Object(l.useCallback)((function(t){"Enter"===t.key&&i(function(t){return function(e){u("/api/newTodo","POST",{task:t}).then((function(t){200===t.status?e(m()):t.json().then((function(t){e(T({error:t.message}))}))}))}}(e))}),[i,e]),c=Object(l.useCallback)((function(t){i(p({task:t.target.value}))}),[i]);return Object(y.jsxs)("header",{className:"header ".concat(L.a.header),children:[Object(y.jsx)("h1",{children:"todos"}),n&&Object(y.jsxs)("p",{className:L.a.error,children:["Server error: ",n]}),Object(y.jsx)("input",{className:"new-todo",placeholder:"What needs to be done?",value:e,onInput:c,onKeyPress:s,autoFocus:!0})]})},_=function(){return Object(y.jsxs)("section",{className:"todoapp",children:[Object(y.jsx)(P,{}),Object(y.jsx)(C.a,{path:"/:filter(active|all|completed|todo)?/:num?/:edit?",render:function(){return Object(y.jsx)(I,{})}}),Object(y.jsx)(R,{})]})},J=function(){return Object(y.jsx)(E.a,{children:Object(y.jsx)(x.a,{store:D,children:Object(y.jsx)(_,{})})})},B=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,42)).then((function(e){var n=e.getCLS,l=e.getFID,i=e.getFCP,s=e.getLCP,c=e.getTTFB;n(t),l(t),i(t),s(t),c(t)}))};c.a.render(Object(y.jsxs)(i.a.StrictMode,{children:[Object(y.jsx)(J,{}),","]}),document.getElementById("root")),B()}},[[41,1,2]]]);
//# sourceMappingURL=main.8bf133e7.chunk.js.map