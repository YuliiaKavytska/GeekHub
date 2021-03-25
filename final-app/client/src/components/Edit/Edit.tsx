import React, {ChangeEvent, ChangeEventHandler, useCallback, useState} from 'react';
import anonim from '../../assets/image/anonim.png';
import {NavLink} from 'react-router-dom';
import {Field, FieldArray, Form, Formik} from "formik";
import {IContact, IError, IPhone} from "../../types/types";
import * as yup from 'yup';
import FormField from './FormField';
import {PhoneField} from "./PhoneField";
import AppError from "../common/AppError";

interface IEditForm {
    deleteContact: (id: number) => void
    contact: IContact
    editContact: (data: IContact) => void
    error: IError | null
}

const Edit: React.FC<IEditForm> = ({contact, deleteContact, editContact, error}) => {

    const deleteCurrentContact = useCallback(() => {
        deleteContact(contact.id)
    }, [deleteContact, contact.id])

    const validationSchema = yup.object({
        name: yup.string()
            .trim()
            .matches(/^[а-щієїґюьяa-z\s]+$/i, 'Field should contain only characters')
            .min(3)
            .required('Name field is required'),
        email: yup.string().email('Incorrect email'),
        phones: yup.array().of(
            yup.object().shape({
                id: yup.number(),
                number: yup.string()
                    .trim()
                    .matches(/^(\+38)?0(93|63|67|68|96|97|98|50|66|95|99)\d{7}$/, 'Incorrect phone number')
                    .required('At least one phone should exist, field is required')
            })
        )
    })

    const onSubmit = (values: IContact) => {
        editContact(values)
    }

    let [loadedImg, setImg] = useState<null | string>(null)

    return <div className='my-4'>
        {error && <AppError message={error.message}/>}
        <Formik initialValues={contact}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                className='my-4'>
            {(formProps) => {

                if (typeof formProps.values.avatar !== "string") {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        event.target && setImg(event.target.result as string)
                    }
                    reader.readAsDataURL(formProps.values.avatar);
                }

                const setImgField = (event: ChangeEvent<HTMLInputElement>) => {
                    formProps.setFieldValue("avatar", event.target.files && event.target.files[0]);
                }

                return (
                    <Form>
                        <div className="form-group d-flex">
                            <div className={'overflow-hidden mr-4 size_edit'}>
                                <img src={loadedImg || contact.avatar || anonim} width="100%" height="auto"
                                     className="rounded float-left mr-3" alt=""/>
                            </div>
                            <div>
                                <label htmlFor="image">Choose photo</label>
                                <input type="file" name='avatar' id="image"
                                       accept=".jpg, .jpeg" className="form-control-file"
                                       onChange={setImgField}/>
                            </div>
                        </div>
                        <FormField name='name'/>

                        <div className="mb-4">
                            <p className="mr-2 d-inline">Phones</p>
                        </div>
                        <FieldArray name='phones'>
                            {({push, remove, form}) => {
                                const {values: {phones}} = form
                                const length = phones.length
                                const lastId = phones[length - 1].id

                                return phones.map((e: IPhone, i: number) => {
                                        const name = `phones[${i}].number`

                                        return <Field key={e.id} component={PhoneField} name={name}
                                                      length={length} lastId={lastId}
                                                      phone={e.number}
                                                      push={() => push({id: lastId + 1, number: ''})}
                                                      remove={() => remove(i)}/>
                                    }
                                )
                            }}
                        </FieldArray>

                        <FormField name='email' type='email'/>
                        <FormField name='address'/>
                        <FormField name='comment'/>

                        <div className="btn-group" role="group" aria-label="Basic example">
                            <NavLink to='/contacts' className="btn btn-info">Cancel</NavLink>
                            <button type="submit" className="btn btn-success">Save</button>
                            <NavLink to='/contacts' className="btn btn-danger"
                                     onClick={deleteCurrentContact}>Delete</NavLink>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    </div>
}

export default Edit




