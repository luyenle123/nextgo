import * as constants from '@/app/constants'
import { FetchData } from '@/app/services/queryServiceBase';
import { setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';

const GetUserList = async (page, pageSize) => {
    const skip = (page - 1) * pageSize;        
    const limit = 'limit='+ pageSize + '&skip=' + skip;
    const url = constants.USER_LIST_URL + '?' + limit;        
    return FetchData(url);
}

const LoginAPI = async (username, password) => {
    try {        
        const response = await new Promise(            
            resolve => {
                fetch(constants.LOGIN_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      username: username,//'emilys',
                      password: password, //'emilyspass',
                      expiresInMins: 30, // optional, defaults to 60
                    })
                  })
                  .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        resolve({data: res.status, isSuccess: false});
                    })
                  .then((res) =>{
                        if(res.token !== undefined){
                            resolve({data: res, isSuccess: true})
                        }
                    })
                  .catch(err => {
                    resolve({data: err, isSuccess: false})
                  })
            }
        );
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

const SaveUser = (token) => {
    try {
        setCookie('access_token', token);

        localStorage.setItem(constants.AUTH_NAME, token);
    } catch (error) { 
        return false;
    }      
    
}

const DeleteUserCookie = () => {
    try {
        deleteCookie('access_token');

        localStorage.removeItem(constants.AUTH_NAME);
    } catch (error) { 
        return false;
    }    
}

const IsLogin = () =>{
    try {
        let IsOk = false;

        const token = getCookie('access_token');
        if(token)
        {
            IsOk = true;
        }

        if(!IsOk)
        {
            IsOk = hasCookie('access_token');
        }

        //console.log(token + ' / ' + IsOk);

        if(!IsOk)
        {
            if(!localStorage.getItem(constants.AUTH_NAME)){
                return false;
            }
            else{
                return true;
            }
        }

        return IsOk;
    } catch (error) { 
        //console.log(error);
        return false;
    }
}

const ValidateUser = (route) =>{
    if(!IsLogin() && route)
    {
        route.push('/' + constants.NAV_LOGIN);
    }
}

export { GetUserList, LoginAPI, ValidateUser, SaveUser, IsLogin, DeleteUserCookie };