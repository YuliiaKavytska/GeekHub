import React from "react";
import {Field, FieldProps} from "formik";
import cn from "classnames";

interface IState {
    name: string
    type?: string
}

const FormField: React.FC<IState> = ({name, type = 'text'}) => {

    return <div className="form-row">
        <div className="col-md-12 mb-3">
            <label htmlFor={name}>{name}</label>
            <Field name={name}>
                {({form, field, meta}: FieldProps) => {
                    const isInvalid = (form.values[name] || form.touched[name]) && meta.error
                    const isValid = form.values[name] && !meta.error
                    return <>
                        <input {...field} type={type} id={name}
                               className={cn("form-control",
                                   {'is-valid': isValid},
                                   {'is-invalid': isInvalid})}
                        />
                        <div className={cn({'valid-feedback': isValid}, {'invalid-feedback': isInvalid})}>
                            {isInvalid || (form.values[name] && 'Looks good!')}
                        </div>
                    </>
                }}
            </Field>
        </div>
    </div>
}

export default FormField