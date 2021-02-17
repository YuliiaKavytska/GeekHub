(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{101:function(e,t,s){"use strict";s.r(t);var c=s(0),a=s.n(c),l=s(25),n=s.n(l),i=(s(58),s(59),s(60),s(10)),r=s(36),o=s(22),u=Object(o.b)({name:"list",initialState:{list:[],lastTask:"",countOfActiveTasks:0,filter:"all",filterResult:[],error:null},reducers:{setTodos:function(e,t){e.list=t.payload.list,e.lastTask=t.payload.lastTask,e.filterResult=t.payload.list,e.countOfActiveTasks=t.payload.list.filter((function(e){return"active"===e.status})).length,e.error=null},changeItemStatus:function(e,t){var s=e.list.findIndex((function(e){return e.id===t.payload.id}));"active"===e.list[s].status?e.list[s].status="completed":e.list[s].status="active",e.countOfActiveTasks=e.list.filter((function(e){return"active"===e.status})).length,e.filterResult=e.list,e.filter="all",e.error=null},changeEditing:function(e,t){var s=e.list.findIndex((function(e){return e.id===t.payload.id}));!1===t.payload.case?e.list[s].editing=!1:e.list[s].editing=!e.list[s].editing,e.filterResult=e.list},setChangedTask:function(e,t){e.list=e.list.map((function(e){return e.id===t.payload.id?Object(r.a)(Object(r.a)({},e),{},{task:t.payload.task}):e})),e.filterResult=e.list},changeItemTask:function(e,t){var s=e.list.findIndex((function(e){return e.id===t.payload.id}));e.list[s].task=t.payload.task,e.filterResult=e.list,e.error=null},addItem:function(e,t){if(""!==e.lastTask){var s=e.list.length>0?e.list[e.list.length-1].id+1:1;e.list.push({id:s,task:t.payload.task,status:"active",editing:!1}),e.lastTask="",e.countOfActiveTasks+=1,e.filterResult=e.list,e.filter="all"}e.error=null},deleteItem:function(e,t){e.list=e.list.filter((function(e){return e.id!==t.payload.id})),e.countOfActiveTasks=e.list.filter((function(e){return"active"===e.status})).length,e.filterResult=e.list,e.filter="all",e.error=null},deleteCompleted:function(e){e.list=e.list.filter((function(e){return"completed"!==e.status})),e.filterResult=e.list,e.error=null},changeLastTask:function(e,t){e.lastTask=t.payload.task},completedAll:function(e){e.list.every((function(e){return"active"===e.status}))||e.list.some((function(e){return"active"===e.status}))?(e.list.forEach((function(e){e.status="completed"})),e.countOfActiveTasks=0):(e.list.forEach((function(e){e.status="active"})),e.countOfActiveTasks=e.list.length),e.filterResult=e.list,e.error=null},changeFilter:function(e,t){switch(t.payload.filter){case"all":e.filterResult=e.list,e.filter="all";break;case"active":e.filterResult=e.list.filter((function(e){return"completed"!==e.status})),e.filter="active";break;case"completed":e.filterResult=e.list.filter((function(e){return"active"!==e.status})),e.filter="completed";break;case"item":e.filterResult=e.list.filter((function(e){return e.id===t.payload.id})),e.filter="all";break;default:return}e.countOfActiveTasks=e.list.filter((function(e){return"active"===e.status})).length,e.error=null},setErrorResponse:function(e,t){e.error=t.payload.error}}}),d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return function(c){f("/api/all","GET").then((function(a){var l=a.json();200===a.status?l.then((function(a){c(j({list:a.list,lastTask:a.lastTask})),c(T({filter:e,id:t})),s&&c(O({id:t}))})):l.then((function(e){c(y({error:e.message}))}))}))}},f=function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c={method:t,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"}};return 0!==Object.keys(s).length&&(c.body=JSON.stringify(s)),fetch(e,c)},b=u.actions,j=b.setTodos,h=b.changeItemStatus,m=b.changeItemTask,O=b.changeEditing,k=b.setChangedTask,g=b.addItem,p=b.deleteItem,v=b.deleteCompleted,C=b.changeLastTask,x=b.completedAll,T=b.changeFilter,y=b.setErrorResponse,N=s(9),I=s(3),w=s(1),R=function(e){var t=e.item,s=e.changeEditingCall,l=e.changeItemStatusCall,n=e.deleteItemCall,i=e.changeItemTaskCall,r=a.a.createRef(),o=Object(c.useCallback)((function(e){s(t.id,null,e.currentTarget.value,t.editing)}),[s,t]),u=Object(c.useCallback)((function(){l(t.id)}),[l,t]),d=Object(c.useCallback)((function(){n(t.id)}),[n,t]),f=Object(c.useCallback)((function(e){i(t.id,e.currentTarget.value)}),[i,t]),b=Object(c.useCallback)((function(e){s(t.id,!1,e.currentTarget.value,t.editing)}),[s,t]);return Object(c.useEffect)((function(){r.current&&r.current.focus()}),[r]),Object(w.jsxs)("li",{className:"completed"===t.status?t.editing?"completed editing":"completed":t.editing?"editing":void 0,onDoubleClick:o,children:[Object(w.jsxs)("div",{className:"view",children:[Object(w.jsx)("input",{className:"toggle",type:"checkbox",checked:"completed"===t.status,onChange:u}),Object(w.jsx)("label",{children:t.task}),Object(w.jsx)("button",{className:"destroy",onClick:d})]}),Object(w.jsx)("input",{className:"edit",value:t.task,onInput:f,onBlur:b,ref:r})]})},E=s(53),A=s.n(E)()("http://localhost:8000/"),S=function(){var e=Object(N.c)((function(e){return e.toDo})).filterResult,t=Object(N.b)(),s=Object(I.e)(),a=s.filter,l=s.num,n=s.edit;Object(c.useEffect)((function(){switch(a){case"todo":t(l&&!n?d("item",Number(l)):l&&n?d("item",Number(l),!0):d("all"));break;case void 0:t(d("all"));break;default:t(d(a))}}),[t,n,l,a]),Object(c.useEffect)((function(){A.on("all:wasCompleted",(function(e){var s=e.success,c=Object(i.a)(e,["success"]);t(s?x():y({error:c.message}))})),A.on("todo:wasDeleted",(function(e){var s=e.id,c=e.success,a=Object(i.a)(e,["id","success"]);t(c?p({id:s}):y({error:a.message}))})),A.on("todoStatus:wasChanged",(function(e){var s=e.id,c=e.success,a=Object(i.a)(e,["id","success"]);t(c?h({id:s}):y({error:a.message}))})),A.on("todo:wasChanged",(function(e){var s=e.success,c=e.id,a=e.task,l=Object(i.a)(e,["success","id","task"]);t(s?k({id:c,task:a}):y({error:l.message}))}))}),[t]);var r=Object(c.useCallback)((function(){A.emit("all:complete")}),[]),o=Object(c.useCallback)((function(e){A.emit("todo:delete",e)}),[]),u=Object(c.useCallback)((function(e){A.emit("todoStatus:change",e)}),[]),f=Object(c.useCallback)((function(e,s,c,a){a?(A.emit("todo:change",{id:e,task:c}),t(O({id:e,case:s}))):t(O({id:e,case:s}))}),[t]),b=Object(c.useCallback)((function(e,s){t(m({id:e,task:s}))}),[t]);return Object(w.jsxs)("section",{className:"main",children:[Object(w.jsx)("input",{id:"toggle-all",className:"toggle-all",type:"checkbox",onClick:r}),Object(w.jsx)("label",{htmlFor:"toggle-all",children:" Mark all as complete"}),Object(w.jsx)("ul",{className:"todo-list",children:e.map((function(e){return Object(w.jsx)(R,{item:e,changeEditingCall:f,changeItemStatusCall:u,deleteItemCall:o,changeItemTaskCall:b},e.id)}))})]})},D=s(16),F=function(){var e=Object(N.c)((function(e){return e.toDo})).countOfActiveTasks,t=Object(N.b)();Object(c.useEffect)((function(){A.on("completed:wasDeleted",(function(e){var s=e.success,c=Object(i.a)(e,["success"]);t(s?v():y({error:c.message}))}))}),[t]);var s=Object(c.useCallback)((function(){A.emit("completed:delete")}),[t]);return Object(w.jsxs)("footer",{className:"footer",children:[Object(w.jsxs)("span",{className:"todo-count",children:[Object(w.jsx)("strong",{children:e})," item left"]}),Object(w.jsxs)("ul",{className:"filters",children:[Object(w.jsx)("li",{children:Object(w.jsx)(D.b,{activeClassName:"selected",to:"/todo",children:"All"})}),Object(w.jsx)("li",{children:Object(w.jsx)(D.b,{activeClassName:"selected",to:"/active",children:"Active"})}),Object(w.jsx)("li",{children:Object(w.jsx)(D.b,{activeClassName:"selected",to:"/completed",children:"Completed"})})]}),Object(w.jsx)("button",{className:"clear-completed",onClick:s,children:"Clear completed"})]})},_=s(8),L=Object(_.c)({toDo:u.reducer}),M=Object(o.c)({thunk:!0}),B=Object(o.a)({reducer:L,middleware:M});window.store=B;var H=s(35),J=s.n(H),P=function(){var e=Object(N.c)((function(e){return e.toDo})),t=e.lastTask,s=e.error,a=Object(N.b)();Object(c.useEffect)((function(){A.on("newTodo:wasChanged",(function(e){var t=e.task,s=e.success,c=Object(i.a)(e,["task","success"]);a(s?C({task:t}):y({error:c.message}))})),A.on("newTodo:wasAdded",(function(e){var t=e.success,s=e.task,c=Object(i.a)(e,["success","task"]);a(t?g({task:s}):y({error:c.message}))}))}),[a]);var l=Object(c.useCallback)((function(e){"Enter"===e.key&&A.emit("newTodo:add",t)}),[a,t]),n=Object(c.useCallback)((function(e){A.emit("newTodo:change",{task:e.target.value})}),[a]);return Object(w.jsxs)("header",{className:"header ".concat(J.a.header),children:[Object(w.jsx)("h1",{children:"todos"}),s&&Object(w.jsxs)("p",{className:J.a.error,children:["Server error: ",s]}),Object(w.jsx)("input",{className:"new-todo",placeholder:"What needs to be done?",value:t,onInput:n,onKeyPress:l,autoFocus:!0})]})},q=function(){return Object(w.jsxs)("section",{className:"todoapp",children:[Object(w.jsx)(P,{}),Object(w.jsx)(I.a,{path:"/:filter(active|all|completed|todo)?/:num?/:edit?",render:function(){return Object(w.jsx)(S,{})}}),Object(w.jsx)(F,{})]})},W=function(){return Object(w.jsx)(D.a,{children:Object(w.jsx)(N.a,{store:B,children:Object(w.jsx)(q,{})})})},X=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,102)).then((function(t){var s=t.getCLS,c=t.getFID,a=t.getFCP,l=t.getLCP,n=t.getTTFB;s(e),c(e),a(e),l(e),n(e)}))};n.a.render(Object(w.jsxs)(a.a.StrictMode,{children:[Object(w.jsx)(W,{}),","]}),document.getElementById("root")),X()},35:function(e,t,s){e.exports={error:"Header_error__3M402",header:"Header_header__38kUd"}},58:function(e,t,s){},59:function(e,t,s){},60:function(e,t,s){}},[[101,1,2]]]);
//# sourceMappingURL=main.53336de0.chunk.js.map