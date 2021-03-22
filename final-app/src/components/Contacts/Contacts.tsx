import React from 'react';
import {NavLink} from "react-router-dom";
import anonim from '../../assets/image/anonim.png';

const Contacts: React.FC<any> = (props) => {
    return <>
        <h2 className='mt-3'>Yuliia's contacts:</h2>
        <div className='row my-3'>
            <ul className="list-unstyled list-group col-12">
                <li className="media list-group-item list-group-item-warning">
                    <svg  width="24" height="24" fill="currentColor"
                         className="bi bi-star-fill mr-3" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    Favorite contacts
                </li>
                <li className="media list-group-item list-group-item-action d-flex align-items-center">
                    <NavLink to='/show/1' className="d-flex mr-auto">
                        <img src={anonim} className="mr-3" width="64" height="64" alt="..."/>
                    </NavLink>
                    <div className="media-body mr-auto">
                        <NavLink to='/show/1' className="d-flex mr-auto">
                            <h5 className="mt-0 mb-1">Nastya</h5>
                        </NavLink>
                        <a className="d-block" href="tel:+380935951018">+380935951018</a>
                        <a className="d-block" href="tel:+380935951018">+380935951018</a>
                        <a className="d-block" href="tel:+380935951018">+380935951018</a>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <a href="tel:+380935951018" className='btn btn-success'>
                            <svg  width="16" height="16" fill="currentColor"
                                 className="bi bi-telephone-fill mr-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            </svg>
                            Call
                        </a>
                        <button className='btn btn-warning'>
                            <svg  width="18" height="18" fill="currentColor"
                                 className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </button>
                        <NavLink to='/edit/1' type='button' className='btn btn-danger'>
                            <svg  width="16" height="16" fill="currentColor"
                                 className="bi bi-pencil-square  mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            Edit
                        </NavLink>
                    </div>
                </li>
                <li className="list-group-item list-group-item-primary">
                    <svg  width="25" height="25" fill="currentColor"
                         className="bi bi-person-lines-fill mr-4" viewBox="0 0 16 16">
                        <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                    </svg>
                    All contacts
                </li>
                <li className="media list-group-item list-group-item-action d-flex align-items-center">
                    <NavLink to='/show/1' className="d-flex mr-auto">
                        <img src={anonim} className="mr-3" width="64" height="64" alt="..."/>
                        <div className="media-body mr-auto">
                            <h5 className="mt-0 mb-1">Nastya</h5>
                            <p>+380935951027</p>
                        </div>
                    </NavLink>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <a href="tel:+380935951018" type='button' className='btn btn-success'>
                            <svg  width="16" height="16" fill="currentColor"
                                 className="bi bi-telephone-fill mr-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            </svg>
                            Call
                        </a>
                        <button className='btn btn-warning'>
                            <svg  width="18" height="18" fill="currentColor"
                                 className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        </button>
                        <NavLink to='/edit/1' type='button' className='btn btn-danger'>
                            <svg  width="16" height="16" fill="currentColor"
                                 className="bi bi-pencil-square  mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            Edit
                        </NavLink>
                    </div>
                </li>
            </ul>
        </div>
    </>

}

export default Contacts