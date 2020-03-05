import React from 'react';

const Industry = ({value}) => (
    <small>
        {value.toLowerCase().replace(/^\w/, c => c.toUpperCase())}
    </small>)


export default Industry;