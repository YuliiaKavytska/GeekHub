import React from 'react';
import vodafone from '../../assets/image/vodafone.jpg';
import kiev from '../../assets/image/kiev.png';
import life from '../../assets/image/life.png';
import anonim from '../../assets/image/anonim.png';

const Edit: React.FC<any> = (props) => {
    return <div className='my-4'>
        <form>
            <div className="form-group d-flex">
                <img src="anonim" width="100" height="100" className="rounded float-left mr-3" alt="..."/>
                <div>
                    <label htmlFor="exampleFormControlFile1">Choose photo</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="validation1">Name</label>
                    <input type="text" className="form-control is-valid" id="validation1" value="Mark" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className=" col-md-12 mb-3">
                    <label className="mr-2 mb-4" htmlFor="validation3">Phones</label>
                    <button className="btn btn-success" type="button">Add phone</button>
                    <div className="input-group">
                        <img src={life} width="39" height="39" className="rounded float-left mr-3"
                             alt="..."/>
                        <input type="text" className="form-control is-valid" value='phone' id='validation3'/>
                        <div className="input-group-append">
                            <button className="btn btn-danger" type="button">Delete</button>
                        </div>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="validation1">Email</label>
                    <input type="text" className="form-control is-valid" id="validation1" value="email"/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="validation1">Address</label>
                    <input type="text" className="form-control is-valid" id="validation1" value="email"/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="validation1">Comment</label>
                    <input type="text" className="form-control is-valid" id="validation1" value="email"/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
            </div>

            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-info">Cancel</button>
                <button type="button" className="btn btn-success">Save</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </form>
    </div>
}

export default Edit