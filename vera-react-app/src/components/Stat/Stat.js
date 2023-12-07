import React from 'react';
import './Stat.css';

function Stat(props) {
    return (
        <div style={{ padding: '5vh' }}>
            <h1 className="text-center" style={{ color: '#d8d8d8' }}>{props.number}</h1>
            <p className="text-center" style={{ fontFamily: 'skinny' }}>{props.type}</p>
        </div>
    );
}

export default Stat;