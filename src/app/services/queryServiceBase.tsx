//import { ResponseServiceModel } from "@/app/models/responseModel";
//import { IResponseServiceModel } from "@/app/models/responseModel";

const FetchData = async (url) => {
    try {
        const response = await new Promise(            
            resolve => {
                fetch(url)
                .then((res) => {
                    if (res.ok) {
                      return res.json();
                    }
                    resolve({data: res.status, isSuccess: false});
                })
                .then((res) =>{
                    resolve({data: res, isSuccess: true})
                })
                .catch(err => {
                    resolve({data: err, isSuccess: false});
                })
            }
        );
        return response;
    } catch (error) {
        return {data: error, isSuccess: false};
    }
}

export async function FetchDataX<IResponseServiceModel>(url)  {
    try {
        const response = await new Promise<IResponseServiceModel>(            
            resolve => {
                fetch(url)
                .then((res) => {
                    if (res.ok) {
                      return res.json();
                    }
                    resolve({data: res.status, isSuccess: false} as IResponseServiceModel);
                })
                .then((res) =>{
                    resolve({data: res, isSuccess: true} as IResponseServiceModel)
                })
                .catch(err => {
                    resolve({data: err, isSuccess: false} as IResponseServiceModel);
                })
            }
        );
        return response as IResponseServiceModel ;
    } catch (error) {
        return {data: error, isSuccess: false} as IResponseServiceModel;
    }
}

const PutData = async(url, body) => {
    return SendData(url, body, 'PUT');
}

const PostData = async (url, body) => {   
    return SendData(url, body, 'POST');
}

const SendData = async (url, body, method) => { 
    try {        
        const response = await new Promise(            
            resolve => {
                fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: body
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

export { FetchData, PutData, PostData};