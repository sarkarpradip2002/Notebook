import React from 'react'

export default function Alert(props) {
    const { alert,color } = props;
    return (
        <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
            <strong>{alert}</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
