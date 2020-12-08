import React, {PureComponent} from 'react';

export default class Password extends PureComponent {
    render() {
        return(
            <div className="form-group">
                <label>Пароль</label>
                <input type="password" name="password" className="form-control" defaultValue={this.props.password} />
                <small className="form-text text-muted">Мінімум 8 літер. Обовʼязково повинні бути великі та малі
                    літери англійського алфавіту та числа</small>
            </div>
        )
    }
}