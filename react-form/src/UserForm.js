import React, {PureComponent} from 'react';
import styled from 'styled-components';

export default class UserForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: props.user.name,
            nameColor: "white",
            email: props.user.email,
            emailColor: "white",
            password: props.user.password,
            passwordColor: "white",
            phones: props.user.phones,
            phonesColor: []
        }

        this.formSubmit = this.formSubmit.bind(this);

        this.removePhone = this.removePhone.bind(this);
        this.addPhone =  this.addPhone.bind(this);
        this.selectOther = this.selectOther.bind(this);

        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePhone = this.changePhone.bind(this);
    }

    componentDidMount() {
        this.setState(state => {
            phonesColor: this.state.phonesColor.push(this.state.phones.map((phone) => "white"))
        })
    }

    formSubmit(e) {
        e.preventDefault();

        const SUCCESS = '#C2E0C6';
        const ERROR = '#F9D0C4';

        const {name} = this.state;
        const nameWords = name.trim().split(/\s+/);
        const nameRes = nameWords.length === 3 && nameWords.every(word => /^[а-щієїґюяьА-ЩІЄЇЮЯЬҐ]+$/.test(word)) ? SUCCESS : ERROR
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
            secRule.test(email) ?
                SUCCESS : ERROR;
        this.setState({emailColor: emailRes});

        const {password} = this.state;
        const pasFirRule = /[0-9]+/;
        const pasSecRule = /[a-z]+/;
        const pasThrRule = /[A-Z]+/;
        const passRes =
            pasFirRule.test(password) &&
            pasSecRule.test(password) &&
            pasThrRule.test(password) &&
            password.length >= 8 ?
                SUCCESS : ERROR;
        this.setState({passwordColor: passRes});

        let {phones} = this.state;
        let allPhoneColors = [...this.state.phonesColor]

        phones.map((phone, index) => {
            const homeRule = /^[1-9][0-9]{5}$/;
            const mobRule10 = /^0[0-9]{9}$/;
            const mobRule12 = /^3[0-9]{11}$/;
            let resColor;

            if (phone.type === "home") {
                resColor = homeRule.test(phone.number.trim()) ? SUCCESS : ERROR;
            } else  {
                phone.number.trim().length === 10 ?
                    (resColor = mobRule10.test(phone.number.trim()) ? SUCCESS : ERROR) :
                    (resColor = mobRule12.test(phone.number.trim()) ? SUCCESS : ERROR);
            }

            allPhoneColors[index] = resColor
        })
        this.setState({phonesColor : allPhoneColors});
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
        removePhone.splice(elem.target.dataset.id, 1);
        let removeColor = [...this.state.phonesColor];
        removeColor.splice(elem.target.dataset.id, 1);
        this.setState({phones: removePhone, phonesColor: removeColor});
    }

    addPhone() {
        this.setState( {phones: [...this.state.phones, {number: '', type: 'home'}]});
    }

    render() {
        let {phones, nameColor, emailColor, passwordColor, phonesColor} = this.state;

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
                                        <Input key={"input" + index}
                                               type="text"
                                               className="form-control"
                                               value={item.number}
                                               data-id={index}
                                               valid={phonesColor[index]}
                                               onInput={this.changePhone}
                                        />
                                        <select key={"select" + index}
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
                                    <small className="form-text text-muted" key={"small" + index} >
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
  background-color: ${props => props.valid};
`;