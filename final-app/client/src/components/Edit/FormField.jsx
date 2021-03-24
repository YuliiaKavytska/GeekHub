import React from "react";
import {Field} from "formik";
import cn from "classnames";


const FormField = ({name, type = 'text'}) => {
    return <div className="form-row">
        <div className="col-md-12 mb-3">
            <label htmlFor={name}>{name}</label>
            <Field name={name}>
                {
                    ({field, meta}) => {
                        return <>
                            <input {...field} type={type} id={name}
                                   className={cn("form-control",
                                       {'is-valid': !meta.error},
                                       {'is-invalid': meta.error})}
                            />
                            <div className={cn({'valid-feedback': !meta.error}, {'invalid-feedback': meta.error})}>
                                {meta.error || 'Looks good!'}
                            </div>
                        </>
                    }
                }
            </Field>
        </div>
    </div>
}

export default FormField