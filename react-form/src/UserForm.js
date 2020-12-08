import React, {PureComponent} from 'react';
import Name from "./Name";
import Email from "./Email";
import Password from "./Password";
import Phones from "./Phones";

export default class UserForm extends PureComponent {
    constructor(props) {
        super(props);

        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {
        e.preventDefault();

        const SUCCESS = '#C2E0C6';
        const ERROR = '#F9D0C4';

        const name = document.querySelector('[name="full_name"]');
        const nameWords = name.value.trim().split(/\s+/);
        name.style.background = nameWords.length === 3 && nameWords.every(word => /^[а-щієїґюяьА-ЩІЄЇЮЯЬҐ]+$/.test(word)) ? SUCCESS : ERROR

        const email = document.querySelector('[name="email"]');
        const emailParts = email.value.split("@");
        const userNameRule = /^[a-zA-Z0-9.-]+$/;
        const firstRule = /^[^.].*[^.]$/;
        const secRule = /^.*[^.]@[^.].*$/;
        email.style.backgroundColor =
            emailParts.length === 2 &&
            userNameRule.test(emailParts[0]) &&
            emailParts[1].includes('.') &&
            firstRule.test(email.value) &&
            secRule.test(email.value) ?
                SUCCESS : ERROR;

        const password = document.querySelector('[name="password"]');
        const pasFirRule = /[0-9]+/;
        const pasSecRule = /[a-z]+/;
        const pasThrRule = /[A-Z]+/;
        password.style.background =
            pasFirRule.test(password.value) &&
            pasSecRule.test(password.value) &&
            pasThrRule.test(password.value) &&
            password.value.length >= 8 ?
                SUCCESS : ERROR;

        document.querySelectorAll(".phone-inp").forEach((phone) => {
            const type = phone.nextElementSibling.value;

            const homeRule = /^[1-9][0-9]{5}$/;
            const mobRule10 = /^0[0-9]{9}$/;
            const mobRule12 = /^3[0-9]{11}$/;

            if (type === "home") {
                phone.style.backgroundColor = homeRule.test(phone.value.trim()) ? SUCCESS : ERROR;
            } else  {
                phone.value.trim().length === 10 ?
                    (phone.style.backgroundColor = mobRule10.test(phone.value.trim()) ? SUCCESS : ERROR) :
                    (phone.style.backgroundColor = mobRule12.test(phone.value.trim()) ? SUCCESS : ERROR);
            }
        });
    }

    render() {
        return(
            <div className="container p-5">
                <form id="user-form" onSubmit={this.formSubmit}>
                    <Name name={this.props.user.name} />
                    <Email email={this.props.user.email} />
                    <Password password={this.props.user.password} />
                    <Phones phones={this.props.user.phones} />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}