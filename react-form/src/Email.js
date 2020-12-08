import React, {PureComponent} from 'react';

export default class Email extends PureComponent {
    render() {
        return(
            <div className="form-group">
                <label>Email</label>
                <input type="text" name="email" className="form-control" defaultValue={this.props.email} />
                <small className="form-text text-muted">Адреса електронної пошти</small>
            </div>
        )
    }
}