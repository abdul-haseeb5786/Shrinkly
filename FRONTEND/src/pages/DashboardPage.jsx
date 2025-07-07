import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import { useEffect } from 'react';

const DashboardPage = () => {
     useEffect(() => {
            document.title = 'Shrinkly - Dashboard';
        }, []);
    return (
        <div>

            <UrlForm />
            <UserUrl />
        </div>
    );
}

export default DashboardPage;
