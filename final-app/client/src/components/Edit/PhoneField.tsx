import React, {useCallback} from "react";
import {FieldProps, getIn} from "formik";
import cn from "classnames";
import {defineOperator} from "./defineOperator";

type IState = FieldProps & {
    push: () => void
    remove: () => void
    length: number
    phone: string
}

export const PhoneField: React.FC<IState> = ({field, form: {errors}, push, remove, length, phone}) => {

    const errorMessage = getIn(errors, field.name)
    let removeCurrentPhone = useCallback(() => remove(), [remove])
    let addPhone = useCallback(() => push(), [push])
    let operator = defineOperator(phone)

    return <div className="form-row">
        <div className="col-md-12 mb-3">
            <div className="input-group">
                <img src={operator} width="39" height="39" className="rounded float-left mr-3" alt=""/>
                <input {...field}
                       className={cn("form-control",
                           {'is-valid': !errorMessage},
                           {'is-invalid': errorMessage})}
                />
                <div className="input-group-append">
                    {length > 1 &&
                    <button className="btn btn-danger" onClick={removeCurrentPhone} type="button">Delete</button>}
                    <button className="btn btn-success" onClick={addPhone} type="button">Add phone</button>
                </div>
                <div className={cn({'valid-feedback': !errorMessage}, {'invalid-feedback': errorMessage})}>
                    {errorMessage || 'Looks good!'}
                </div>
            </div>
        </div>
    </div>
}

export default PhoneField