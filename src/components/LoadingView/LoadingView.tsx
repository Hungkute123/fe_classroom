import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingView.scss';

export const LoadingView: React.FC = () => {
    return (
        <div className='loading-view'>
            <Spinner animation="border" variant="secondary" />
        </div>
    );
};