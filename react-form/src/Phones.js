import React, {PureComponent} from 'react';

export default class Phones extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phones: this.props.phones
        }

        this.removePhone = this.removePhone.bind(this);
        this.addPhone =  this.addPhone.bind(this);
        this.selectOther = this.selectOther.bind(this);
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
        this.setState({phones: removePhone});
    }

    addPhone() {
        this.setState( {phones: [...this.state.phones, {number: '', type: 'home'}]});
    }

    render() {
        let {phones} = this.state;

        return(
            <div>
            {
                phones.map((item, index) => (
                    <div className="mb-3">
                        <div className="input-group">
                            <input key={"input" + index} type="text" className="form-control phone-inp" defaultValue={item.number} />
                            <select key={"select" + index} className="custom-select" data-id={index} onChange={this.selectOther}>
                                {/*value={item.type}*/}
                                <option value="home" selected={item.type === "home" ? true : false}>Домашній</option>
                                <option value="mobile" selected={item.type === "mobile" ? true : false}>Мобільний</option>
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
        )
    }
}