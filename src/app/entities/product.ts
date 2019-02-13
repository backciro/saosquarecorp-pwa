export class Product {
    productID: number
    productName: string
    productPrice: number
    productSelSize: string
    productImages: {
      imgSrc: string
    }[]
    productInfo?: string
}

export class IndexProduct {
  id: number
  productName: string
  imageSrc: number
  alt: string
}

export class ShopBagProduct {
  item: Product
  availableQty: number
}
