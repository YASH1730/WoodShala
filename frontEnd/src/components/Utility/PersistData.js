import {useEffect} from 'react';
import {Store} from '../../store/Context'
import {Auth, DarkMode} from '../../store/Types'

// This file help in persisting the data within the application

const PersistData = () => {

    const {dispatch} = Store();

    useEffect(() => {
        if (localStorage.getItem('isLogin'))
        {
            // console.log('i am in >> ')
            dispatch({
                type : Auth,
                payload : {
                    isLogin : localStorage.getItem('isLogin')? true : false , 
                    WDToken : localStorage.getItem('WDToken'),
                    role : localStorage.getItem('role')
                }
            })
        }

        if (localStorage.getItem('mode'))
        {
            dispatch({
                type : DarkMode,
                payload : {
                    open : localStorage.getItem('mode') === "true" ? true : false
                }
            })
            
        }


    }, []);

    return (
        <></>
    );
}

export default PersistData;
