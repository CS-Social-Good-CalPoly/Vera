import React from 'react';
import './Filters.css';

function Filters(props) {
    const { filterNames } = props;

    return (
        <div>
            <h2 style={{ fontFamily: 'fat', color: '#08376B', marginTop: '3vh', position: 'absolute' }}>Filters</h2>
            <div className="d-flex align-items-center" style={{ height: '50vh', display: 'flex', alignItems: 'center'}}>
                <div>
                    {filterNames.map((filterName, index) => (
                        <button key={index} className="btn btn-primary filter-btn">{filterName}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filters;