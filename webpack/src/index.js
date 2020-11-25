import { getUsers } from "./common/usersAPI";
import "./style.css";
import "./style.less";
console.log("Hello webpack!");

const fancyFunc = () => {
    return [1, 2];
};

const [a, b] = fancyFunc();

getUsers().then(json => console.log(json));

// import moment from "moment";
//
// const getUserModule = () => import("./common/usersAPI");
//
// const btn = document.getElementById("btn");
//
// btn.addEventListener("click", () => {
//     getUserModule().then(({ getUsers }) => {
//         getUsers().then(json => console.log(json));
//     });
// });