import React from 'react';
import { Switch, Route} from 'react-router-dom';
import userPage from '../components/User/user';
import SignUpForm from '../components/Form/form';

const Main = props => (
    <switch>
        <Route exact path ="/" component= {SignUpForm} />
        <Route exact path ="/user/:fullname" component= {userPage} />
    </switch>
);

export default Main;