import * as constants from '@/app/constants'
import { FetchData } from '@/app/services/queryServiceBase';

const GetCartDetail = async (cartId) => {
  cartId = 4;
  const url = constants.CART_DETAIL_URL + cartId;
  return FetchData(url);
}

const AddToCart = async (productId, quantity) => {
    try {      
        const url = constants.CART_DETAIL_URL + 5;
        const response = await new Promise(            
            resolve => {
                fetch(url, {
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      merge: true, 
                      products: [
                        {
                          id: {productId},
                          quantity: quantity,
                        },
                      ]
                    })
                  })
                  .then(res => res.json())
                  .then(
                    (res) =>{
                        resolve({data: res, isSuccess: true})
                    }
                  )
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

export { GetCartDetail, AddToCart };