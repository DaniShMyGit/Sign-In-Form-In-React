import React from 'react';
import { Route} from 'react-router-dom';
import userPage from '../components/User/user';
import SignUpForm from '../components/Form/form';

const Main = props => (
    <switch>
        <Route exact path ="/" component= {SignUpForm} />
        <Route exact path ="/user/" component= {userPage} />
    </switch>
);

export default Main;