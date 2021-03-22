import React from 'react';

const Show: React.FC<any> = (props) => {
    return <div className="card border-primary mb-3 mt-4">
        <div className="card-header"><p className="h4">Name</p></div>
        <div className="card-body text-primary">
            <div className="form-group d-flex">
                <img src="https://bit.ly/3cUVChn" width="100" height="100" className="rounded float-left mr-3"
                     alt="..."/>
                <div>
                    <p className="card-title font-weight-bold">Email:
                        <span className='font-weight-normal'> 123</span>
                    </p>
                    <p className="card-text font-weight-bold">Address:
                        <span className='font-weight-normal'> 123</span>
                    </p>
                    <p className="card-text font-weight-bold">Comment:
                        <span className='font-weight-normal'> 123</span>
                    </p>
                    <div>
                        <p className="card-title font-weight-bold">Phones: </p>
                        <a href='tel:' className="card-title">2345</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Show