/* eslint-disable */
import React ,{useEffect}from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../_actions/user_actions';


export default function Auth (Component, option,adminRoute = null) {
    const dispatch = useDispatch();
    function AuthCheck() {
        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res)
            })
        },[])
        return (
            <Component />
        )
    }
    return AuthCheck()
}

