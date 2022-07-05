/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';

export default function Auth(props) {
    return AuthCheck(props);
}

function AuthCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(auth()).then((res) => {
            let passport = res.payload.isAuth;
            let option = props.option;
            // Not Loggined in Status 
            if(!passport) {
                if(option) {
                    navigate('/login');
                }
                //Loggined in Status
            } else {
                //supposed to be Admin page, but not admin person wants to go inside
                if (props.adminRoute && !res.payload.isAdmin) {
                    navigate('/')
                }
                //Logged in Status, but Try to go into log in page 
                else {
                    if (option === false) {
                        navigate('/')
                    }
                }
            }
        })
    },);
    return (
        <props.Component />
    )
}