import React from 'react';
import ReactDom from 'react-dom';
import UserForm from "./UserForm";

let user = {
    name: 'Кавицька Юлія Олександрівна',
    email: 'test@mail.com',
    password: '123asdASD',
    phones: [
        {number: '123456', type: 'home'},
        {number: '0631234567', type: 'mobile'}
    ]
};

ReactDom.render(
    <UserForm  user={user} />,
    document.querySelector('#root')
);