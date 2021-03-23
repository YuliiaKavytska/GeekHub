import React, {ComponentType} from 'react';
import {compose} from "redux";
import {withAuthRedirect} from "../HOC/withAuthRedirect";

const NewContact: React.FC<{}> = () => {
    return <div>new contact</div>
}

export default compose<ComponentType>(
    withAuthRedirect
)(NewContact)