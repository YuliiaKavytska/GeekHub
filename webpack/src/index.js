import { getUsers } from "./common/usersAPI";
import "./style.css";
import "./style.less";
import React from 'react';
import ReactDom from 'react-dom';
console.log("Hello webpack!");

const fancyFunc = () => {
    return [1, 2];
};

const [a, b] = fancyFunc();

getUsers().then(json => console.log(json));

// import moment from "moment";
//
// const getUserModule = () =>
//     import(/* webpackChunkName: "usersAPI" */ "./common/usersAPI");
//
// const btn = document.getElementById("btn");
//
// btn.addEventListener("click", () => {
//     getUserModule().then(({ getUsers }) => {
//         getUsers().then(json => console.log(json));
//     });
// });