import React, {PureComponent} from 'react';

export default class Name extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="form-group">
                <label>П.І.Б.</label>
                <input type="text" name="full_name" className="form-control" defaultValue={this.props.name} />
                <small className="form-text text-muted">Обовʼязково прізвище, імʼя та по батькові. Тільки
                    літерами українскього алфавіту</small>
            </div>
        )
    }
}