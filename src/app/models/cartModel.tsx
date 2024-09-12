export interface ICartModel{
    id: number,
    products: CartProductItem[],
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
  }

export interface CartProductItem{
    id: number,
    title: string,
    price: number,
    quantity: number,
    total: number,
    discountPercentage: number,
    discountedTotal: number,
    thumbnail: string

}