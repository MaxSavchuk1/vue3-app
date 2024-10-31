import Entity from './Entity'
import type { Review } from '@/helpers/types'

class ProductEntity extends Entity {
  id: string | number = 0
  title: string = ''
  price: number = 0
  brand?: string
  category?: string
  description?: string
  dimentions?: {
    height: number
    width: number
    depth: number
  }
  discountPercentage?: number
  images: string[] = []
  rating?: number
  stock?: number
  tags?: string[]
  reviews: Review[] = []

  constructor(payload: any) {
    super(payload)
    Object.assign(this, payload)
  }

  get formattedPrice() {
    return `$ ${this.price}`
  }
}

export default ProductEntity
