import React, {useCallback, useState} from 'react';
import anonim from '../../assets/image/anonim.png';
import {NavLink} from 'react-router-dom';
import {Field, FieldArray, Form, Formik} from "formik";
import {IContact, IPhone} from "../../types/types";
import * as yup from 'yup';
import FormField from './FormField';
import {PhoneField} from "./PhoneField";
import s from './Edit.module.css';

interface IEditForm {
    deleteContact: (id: number) => void
    contact: IContact
    editContact: (data: IContact) => void
}

const Edit: React.FC<IEditForm> = ({contact, deleteContact, editContact}) => {
    const deleteCurrentContact = useCallback(() => {
        deleteContact(contact.id)
    }, [])

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
        console.log(values)
    }

    let [loadedImg, setImg] = useState<any>(null)

    return <div className='my-4'>
        <Formik initialValues={contact}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                className='my-4'>
            {(formProps) => {
                if (typeof formProps.values.avatar !== "string") {
                    let reader = new FileReader();
                    reader.onload = (event) => {
                        setImg(event.target?.result)
                    }
                    reader.readAsDataURL(formProps.values.avatar);
                }
                return (
                    <Form>
                        <div className="form-group d-flex">
                            <div className={'overflow-hidden mr-4 ' + s.size} >
                                <img src={loadedImg || contact.avatar || anonim}
                                     className="rounded float-left mr-3" width="100%" height="auto"
                                     alt="..."/>
                            </div>
                            <div>
                                <label htmlFor="image">Choose photo</label>
                                <input type="file" name='avatar'
                                       accept=".jpg, .jpeg, .png" className="form-control-file"
                                       onChange={(event) => {
                                           formProps.setFieldValue("avatar", event.target.files && event.target.files[0]);
                                       }}
                                       id="image"/>
                            </div>
                        </div>
                        <FormField name='name'/>

                        <div className="mb-4">
                            <p className="mr-2 d-inline">Phones</p>
                        </div>
                        <FieldArray name='phones'>
                            {({push, remove, form: {values: {phones}}}) => {
                                let length = phones.length
                                let lastId = phones[length - 1].id
                                return phones.map((e: IPhone, i: number) => {
                                        let name = `phones[${i}].number`

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
                            <NavLink to='/contacts' onClick={deleteCurrentContact}
                                     className="btn btn-danger">Delete</NavLink>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    </div>
}

export default Edit




