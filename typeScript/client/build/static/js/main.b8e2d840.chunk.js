(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{101:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s.n(a),c=s(25),l=s.n(c),i=(s(58),s(59),s(60),s(9)),r=s(36),o=s(22),u=Object(o.b)({name:"list",initialState:{list:[],lastTask:"",countOfActiveTasks:0,filter:"all",filterResult:[],error:null},reducers:{setTodos:function(e,t){e.list=t.payload.list,e.lastTask=t.payload.lastTask,e.filterResult=t.payload.list,e.countOfActiveTasks=t.payload.list.filter((function(e){return"active"===e.status})).length,e.error=null},changeItemStatus:function(e,t){var s=e.list.findIndex((function(e){return e.id===t.payload.id}));"active"===e.list[s].status?e.list[s].status="completed":e.list[s].status="active",e.countOfActiveTasks=e.list.filter((function(e){return"active"===e.status})).length,e.filterResult=e.list,e.filter="all",e.error=null},changeEditing:function(e,t){var s=e.list.findIndex((function(e){return e.id===t.payload.id}));!1===t.payload.case?e.list[s].editing=!1:e.list[s].editing=!e.list[s].editing,e.filterResult=e.list},setChangedTask:function(e,t){e.list=e.list.map((function(e){return e.id===t.payload.id?Object(r.a)(Object(r.a)({},e),{},{task:t.payload.task}):e})),e.filterResult=e.list},changeItemTask:function(e,t){var s=e.list.findIndex((function(e){return e.id===t.payload.id}));e.list[s].task=t.payload.task,e.filterResult=e.list,e.error=null},addItem:function(e,t){if(""!==e.lastTask){var s=e.list.length>0?e.list[e.list.length-1].id+1:1;e.list.push({id:s,task:t.payload.task,status:"active",editing:!1}),e.lastTask="",e.countOfActiveTasks+=1,e.filterResult=e.list,e.filter="all"}e.error=null},deleteItem:function(e,t){e.list=e.list.filter((function(e){return e.id!==t.payload.id})),e.countOfActiveTasks=e.list.filter((function(e){return"active"===e.status})).length,e.filterResult=e.list,e.filter="all",e.error=null},deleteCompleted:function(e){e.list=e.list.filter((function(e){return"completed"!==e.status})),e.filterResult=e.list,e.error=null},changeLastTask:function(e,t){e.lastTask=t.payload.task,e.error=null},completedAll:function(e){e.list.every((function(e){return"active"===e.status}))||e.list.some((function(e){return"active"===e.status}))?(e.list.forEach((function(e){e.status="completed"})),e.countOfActiveTasks=0):(e.list.forEach((function(e){e.status="active"})),e.countOfActiveTasks=e.list.length),e.filterResult=e.list,e.error=null},changeFilter:function(e,t){switch(t.payload.filter){case"all":e.filterResult=e.list,e.filter="all";break;case"active":e.filterResult=e.list.filter((function(e){return"completed"!==e.status})),e.filter="active";break;case"completed":e.filterResult=e.list.filter((function(e){return"active"!==e.status})),e.filter="completed";break;case"item":e.filterResult=e.list.filter((function(e){return e.id===t.payload.id})),e.filter="all";break;default:return}e.countOfActiveTasks=e.list.filter((function(e){return"active"===e.status})).length,e.error=null},setErrorResponse:function(e,t){e.error=t.payload.error}}}),d=function(){h("/api/completeAll","GET")},f=function(e){h("/api/changeTodo","PUT",{id:e})},b=function(e){h("/api/changeTodo","DELETE",{id:e})},j=function(e,t){h("/api/changeTodo","POST",{id:e,task:t})},h=function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a={method:t,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"}};return 0!==Object.keys(s).length&&(a.body=JSON.stringify(s)),fetch(e,a)},m=u.actions,g=m.setTodos,k=m.changeItemStatus,p=m.changeItemTask,O=m.changeEditing,v=m.setChangedTask,T=m.addItem,C=m.deleteItem,x=m.deleteCompleted,E=m.changeLastTask,I=m.completedAll,y=m.changeFilter,R=m.setErrorResponse,N=s(15),A=s(3),w=s(1),S=function(e){var t=e.item,s=e.changeEditingCall,c=e.changeItemStatusCall,l=e.deleteItemCall,i=e.changeItemTaskCall,r=n.a.createRef(),o=Object(a.useCallback)((function(e){s(t.id,null,e.currentTarget.value,t.editing)}),[s,t]),u=Object(a.useCallback)((function(){c(t.id)}),[c,t]),d=Object(a.useCallback)((function(){l(t.id)}),[l,t]),f=Object(a.useCallback)((function(e){i(t.id,e.currentTarget.value)}),[i,t]),b=Object(a.useCallback)((function(e){s(t.id,!1,e.currentTarget.value,t.editing)}),[s,t]);return Object(a.useEffect)((function(){r.current&&r.current.focus()}),[r]),Object(w.jsxs)("li",{className:"completed"===t.status?t.editing?"completed editing":"completed":t.editing?"editing":void 0,children:[Object(w.jsxs)("div",{className:"view",children:[Object(w.jsx)("input",{className:"toggle",type:"checkbox",checked:"completed"===t.status,onChange:u}),Object(w.jsx)("label",{children:t.task}),Object(w.jsx)("button",{className:"destroy",onClick:d})]}),Object(w.jsx)("input",{className:"edit",value:t.task,onInput:f,onBlur:b,ref:r,onDoubleClick:o})]})},D=s(53),L=s.n(D)()("http://localhost:8000/"),F={changeEditing:O,changeItemStatus:k,changeItemTask:p,changeStatusTC:f,changeTodoTC:j,completeAllTC:d,deleteTodoTC:b,getUsersTC:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return function(a){h("/api/all","GET").then((function(n){var c=n.json();200===n.status?c.then((function(n){a(g({list:n.list,lastTask:n.lastTask})),a(y({filter:e,id:t})),s&&a(O({id:t}))})):c.then((function(e){a(R({error:e.message}))}))}))}},completedAll:I,deleteItem:C,setChangedTask:v,setErrorResponse:R},_=Object(N.b)((function(e){return{filterResult:e.toDo.filterResult}}),F)((function(e){var t=e.filterResult,s=e.changeEditing,n=e.changeItemStatus,c=e.changeItemTask,l=e.completedAll,r=e.deleteItem,o=e.getUsersTC,u=e.setChangedTask,h=e.setErrorResponse,m=Object(A.e)(),g=m.filter,k=m.num,p=m.edit;Object(a.useEffect)((function(){switch(g){case"todo":k&&!p?o("item",Number(k)):k&&p?o("item",Number(k),!0):o("all");break;case void 0:o("all");break;default:o(g)}}),[p,k,g]),Object(a.useEffect)((function(){L.on("all:wasCompleted",(function(e){var t=e.success,s=Object(i.a)(e,["success"]);t?l():h({error:s.message})})),L.on("todo:wasDeleted",(function(e){var t=e.id,s=e.success,a=Object(i.a)(e,["id","success"]);s?r({id:t}):h({error:a.message})})),L.on("todoStatus:wasChanged",(function(e){var t=e.id,s=e.success,a=Object(i.a)(e,["id","success"]);s?n({id:t}):h({error:a.message})})),L.on("todo:wasChanged",(function(e){var t=e.success,s=e.id,a=e.task,n=Object(i.a)(e,["success","id","task"]);t?u({id:s,task:a}):h({error:n.message})}))}),[]);var O=Object(a.useCallback)((function(){d()}),[]),v=Object(a.useCallback)((function(e){b(e)}),[]),T=Object(a.useCallback)((function(e){f(e)}),[]),C=Object(a.useCallback)((function(e,t,a,n){n?(j(e,a),s({id:e,case:t})):s({id:e,case:t})}),[]),x=Object(a.useCallback)((function(e,t){c({id:e,task:t})}),[]);return Object(w.jsxs)("section",{className:"main",children:[Object(w.jsx)("input",{id:"toggle-all",className:"toggle-all",type:"checkbox",onClick:O}),Object(w.jsx)("label",{htmlFor:"toggle-all",children:" Mark all as complete"}),Object(w.jsx)("ul",{className:"todo-list",children:t.map((function(e){return Object(w.jsx)(S,{item:e,changeEditingCall:C,changeItemStatusCall:T,deleteItemCall:v,changeItemTaskCall:x},e.id)}))})]})})),P=s(16),U={deleteCompleted:x,setErrorResponse:R},B=Object(N.b)((function(e){return{countOfActiveTasks:e.toDo.countOfActiveTasks}}),U)((function(e){var t=e.countOfActiveTasks,s=e.deleteCompleted,n=e.setErrorResponse;Object(a.useEffect)((function(){L.on("completed:wasDeleted",(function(e){var t=e.success,a=Object(i.a)(e,["success"]);t?s():n({error:a.message})}))}),[]);var c=Object(a.useCallback)((function(){h("/api/deleteCompleted","DELETE")}),[]);return Object(w.jsxs)("footer",{className:"footer",children:[Object(w.jsxs)("span",{className:"todo-count",children:[Object(w.jsx)("strong",{children:t})," item left"]}),Object(w.jsxs)("ul",{className:"filters",children:[Object(w.jsx)("li",{children:Object(w.jsx)(P.b,{activeClassName:"selected",to:"/todo",children:"All"})}),Object(w.jsx)("li",{children:Object(w.jsx)(P.b,{activeClassName:"selected",to:"/active",children:"Active"})}),Object(w.jsx)("li",{children:Object(w.jsx)(P.b,{activeClassName:"selected",to:"/completed",children:"Completed"})})]}),Object(w.jsx)("button",{className:"clear-completed",onClick:c,children:"Clear completed"})]})})),H=s(8),J=Object(H.c)({toDo:u.reducer}),M=Object(o.c)({thunk:!0}),W=Object(o.a)({reducer:J,middleware:M}),X=s(35),q=s.n(X),G={addItem:T,changeLastTask:E,setErrorResponse:R},K=Object(N.b)((function(e){return{lastTask:e.toDo.lastTask,error:e.toDo.error}}),G)((function(e){var t=Object(N.c)(),s=e.addItem,n=e.changeLastTask,c=e.setErrorResponse,l=e.lastTask,r=e.error;Object(a.useEffect)((function(){L.on("newTodo:wasChanged",(function(e){var s=e.task,a=e.success,l=Object(i.a)(e,["task","success"]);t(a?n({task:s}):c({error:l.message}))})),L.on("newTodo:wasAdded",(function(e){var a=e.success,n=e.task,l=Object(i.a)(e,["success","task"]);t(a?s({task:n}):c({error:l.message}))}))}),[t]);var o=Object(a.useCallback)((function(e){"Enter"===e.key&&function(e){h("/api/newTodo","POST",{task:e})}(l)}),[t,l]),u=Object(a.useCallback)((function(e){var t;t=e.target.value,h("/api/lastTask","PUT",{text:t})}),[t]);return Object(w.jsxs)("header",{className:"header ".concat(q.a.header),children:[Object(w.jsx)("h1",{children:"todos"}),r&&Object(w.jsxs)("p",{className:q.a.error,children:["Server error: ",r]}),Object(w.jsx)("input",{className:"new-todo",placeholder:"What needs to be done?",value:l,onInput:u,onKeyDown:o,autoFocus:!0})]})})),z=function(){return Object(w.jsxs)("section",{className:"todoapp",children:[Object(w.jsx)(K,{}),Object(w.jsx)(A.a,{path:"/:filter(active|all|completed|todo)?/:num?/:edit?",render:function(){return Object(w.jsx)(_,{})}}),Object(w.jsx)(B,{})]})},Q=function(){return Object(w.jsx)(P.a,{children:Object(w.jsx)(N.a,{store:W,children:Object(w.jsx)(z,{})})})},V=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,102)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,c=t.getLCP,l=t.getTTFB;s(e),a(e),n(e),c(e),l(e)}))};l.a.render(Object(w.jsxs)(n.a.StrictMode,{children:[Object(w.jsx)(Q,{}),","]}),document.getElementById("root")),V()},35:function(e,t,s){e.exports={error:"Header_error__1X_7W",header:"Header_header__h8UIr"}},58:function(e,t,s){},59:function(e,t,s){},60:function(e,t,s){}},[[101,1,2]]]);
//# sourceMappingURL=main.b8e2d840.chunk.js.map