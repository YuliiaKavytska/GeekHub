(this["webpackJsonpfinal-app"]=this["webpackJsonpfinal-app"]||[]).push([[3],{207:function(e,s,a){"use strict";a(0);var t=a(1);s.a=function(e){var s=e.title;return Object(t.jsxs)("div",{children:[Object(t.jsxs)("h2",{className:"display-4",children:["Hello! This is ",s,"."]}),Object(t.jsx)("p",{className:"lead",children:"This is a simple contacts APP. Authorize or create an account to use all possibility"}),Object(t.jsx)("hr",{className:"my-4"})]})}},208:function(e,s,a){"use strict";a.r(s);var t=a(0),c=a(6),r=a(4),i=a(9),n=a(41),l=a(8),o=a(207),d=a(21),u=a(27),m=a(37),p=a(1),j={LogInTC:l.a};s.default=Object(i.b)((function(e){return{error:e.app.error,isAuth:e.app.isAuth}}),j)((function(e){var s=e.error,a=e.isAuth,i=e.LogInTC,l=u.c({email:u.d().email("Incorrect email").required("Email is required"),password:u.d().trim().min(8).max(50).matches(/\d+/,"Password should include one number").matches(/[a-z\u0430-\u0449\u0456\u0454\u0457\u0491\u044e\u044c\u044f\u044b\u0451\u044a]+/,"Password should include one lowercase letter").matches(/[A-Z\u0410-\u0429\u0406\u0404\u0407\u0490\u042e\u042c\u042f\u042b\u0401\u042a]+/,"Password should include one uppercase letter").required("Password is required")}),j=Object(t.useCallback)((function(e){i(e)}),[i]);return a?Object(p.jsx)(c.a,{to:"/contacts"}):Object(p.jsxs)("div",{className:"mt-4",children:[Object(p.jsx)(o.a,{title:"Log In"}),s&&Object(p.jsx)(n.a,{message:s.message}),Object(p.jsx)(d.d,{initialValues:{email:"",password:""},validationSchema:l,onSubmit:j,children:Object(p.jsxs)(d.c,{className:"py-3",children:[Object(p.jsx)(m.a,{name:"email",placeholder:"name@example.com"}),Object(p.jsx)(m.a,{name:"password",type:"password",placeholder:"Example123"}),Object(p.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Log In"})]})}),Object(p.jsx)("hr",{}),Object(p.jsx)(r.b,{to:"/signUp",className:"dropdown-item",children:"New around here? Sign up"})]})}))}}]);
//# sourceMappingURL=3.ae879a4c.chunk.js.map