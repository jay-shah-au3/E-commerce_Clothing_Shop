import React from 'react';
import {CustomButtonContainer} from './custom-button.styles';

const customButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default customButton;