import React from 'react';
import ErrorImg from '../error404.jpg';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div>
            <h3>404 Page not found</h3>
            <Link to='/'>
                <img src={ErrorImg} alt="bob" />
            </Link>
        </div>
    );
}

