import React, {PureComponent} from 'react';
import styled from 'styled-components';

export default class UserForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: props.user.name,
            nameColor: false,
            email: props.user.email,
            emailColor: false,
            password: props.user.password,
            passwordColor: false,
            phones: props.user.phones,
            phonesValid: []
        }

        this.formSubmit = this.formSubmit.bind(this);

        this.removePhone = this.removePhone.bind(this);
        this.addPhone =  this.addPhone.bind(this);
        this.selectOther = this.selectOther.bind(this);

        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePhone = this.changePhone.bind(this);

        this.validation = this.validation.bind(this);
    }

    componentDidMount() {
        this.setState((state) => {
            state.phonesValid.push(state.phones.map(() => false))
        })
        this.validation();
    }

    formSubmit(e) {
        e.preventDefault();

        this.validation();
    }

    validation() {
        const {name} = this.state;
        const nameWords = name.trim().split(/\s+/);
        const nameRes = nameWords.length === 3 && nameWords.every(word => /^[а-щієїґюяьА-ЩІЄЇЮЯЬҐ]+$/.test(word));
        this.setState({nameColor: nameRes});

        const {email} = this.state;
        const emailParts = email.split("@");
        const userNameRule = /^[a-zA-Z0-9.-]+$/;
        const firstRule = /^[^.].*[^.]$/;
        const secRule = /^.*[^.]@[^.].*$/;
        const emailRes =
            emailParts.length === 2 &&
            userNameRule.test(emailParts[0]) &&
            emailParts[1].includes('.') &&
            firstRule.test(email) &&
            secRule.test(email);
        this.setState({emailColor: emailRes});

        const {password} = this.state;
        const pasFirRule = /[0-9]+/;
        const pasSecRule = /[a-z]+/;
        const pasThrRule = /[A-Z]+/;
        const passRes =
            pasFirRule.test(password) &&
            pasSecRule.test(password) &&
            pasThrRule.test(password) &&
            password.length >= 8;
        this.setState({passwordColor: passRes});

        let {phones} = this.state;
        let allPhoneColors = [...this.state.phonesValid]

        phones.map((phone, index) => {
            const homeRule = /^[1-9][0-9]{5}$/;
            const mobRule10 = /^0[0-9]{9}$/;
            const mobRule12 = /^3[0-9]{11}$/;
            let resColor;

            if (phone.type === "home") {
                resColor = homeRule.test(phone.number.trim());
            } else  {
                phone.number.trim().length === 10 ?
                    (resColor = mobRule10.test(phone.number.trim())) :
                    (resColor = mobRule12.test(phone.number.trim()));
            }

            allPhoneColors[index] = resColor
        })
        this.setState({phonesValid : allPhoneColors});
    }

    changeName(text) {
        this.setState({name: text.target.value});
    }

    changeEmail(text) {
        this.setState({email: text.target.value});
    }

    changePassword(text) {
        this.setState({password: text.target.value});
    }

    changePhone(text) {
        let newPhones = [...this.state.phones]
        newPhones[text.target.dataset.id].number = text.target.value;
        this.setState({phones: newPhones});
    }

    selectOther(select) {
        const ourState = [...this.state.phones];

        select.target.value === "home" ?
            ourState[select.target.dataset.id].type = "home" :
            ourState[select.target.dataset.id].type = "mobile"

        this.setState({phones: ourState});
    }

    removePhone(elem) {
        let removePhone = [...this.state.phones];
        removePhone.splice(Number(elem.target.dataset.id), 1);
        let removeColor = [...this.state.phonesValid];
        removeColor.splice(Number(elem.target.dataset.id), 1);
        this.setState({phones: removePhone, phonesValid: removeColor});
    }

    addPhone() {
        this.setState( (state) => (
            {phones: [{number: '', type: 'home'}, ...state.phones],
                phonesValid: [false, ...state.phonesValid]}));
    }

    render() {
        let {phones, nameColor, emailColor, passwordColor, phonesValid} = this.state;

        return(
            <div className="container p-5">
                <form id="user-form" onSubmit={this.formSubmit}>
                    <div className="form-group">
                        <label>П.І.Б.</label>
                        <Input type="text"
                               name="full_name"
                               className="form-control"
                               defaultValue={this.props.user.name}
                               valid={nameColor}
                               onInput={this.changeName}
                        />
                        <small className="form-text text-muted">Обовʼязково прізвище, імʼя та по батькові. Тільки
                            літерами українскього алфавіту</small>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Input type="text"
                               name="email"
                               className="form-control"
                               valid={emailColor}
                               defaultValue={this.props.user.email}
                               onInput={this.changeEmail}
                        />
                        <small className="form-text text-muted">Адреса електронної пошти</small>
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <Input type="password"
                               name="password"
                               className="form-control"
                               valid={passwordColor}
                               defaultValue={this.props.user.password}
                               onInput={this.changePassword}
                        />
                        <small className="form-text text-muted">Мінімум 8 літер. Обовʼязково повинні бути великі та малі
                            літери англійського алфавіту та числа</small>
                    </div>
                    <div>
                        {
                            phones.map((item, index) => (
                                <div className="mb-3">
                                    <div className="input-group">
                                        <Input type="text"
                                               className="form-control"
                                               value={item.number}
                                               data-id={index}
                                               valid={phonesValid[index]}
                                               onInput={this.changePhone}
                                        />
                                        <select key={index + item.number + item.type}
                                            className="custom-select"
                                                data-id={index}
                                                onChange={this.selectOther}
                                                defaultValue={item.type}
                                        >
                                            <option value="home" >Домашній</option>
                                            <option value="mobile" >Мобільний</option>
                                        </select>
                                        <div className="input-group-append">
                                            <button className="btn btn-danger" type="button" data-id={index} onClick={this.removePhone}>Видалити</button>
                                        </div>
                                    </div>
                                    <small className="form-text text-muted">
                                        {item.type === "home" ?
                                            "Домашній телефон повинен складатися з 6 чисел та не починатися з 0" :
                                            "Мобільний номер повинен складатися з 10 чисел та починатися на 0 або з 12 числе та починатися на 3"}
                                    </small>
                                </div>
                            ))
                        }
                        <button className="btn btn-success mb-2" type="button" onClick={this.addPhone}>Додати телефон</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
const Input = styled.input`
  background-color: ${props => props.valid ? '#C2E0C6' : '#F9D0C4'};
`;