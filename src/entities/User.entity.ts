import { FALLBACK_IMAGE } from '@/helpers/constants'
import Entity from './Entity'
import type { Address, Company } from '@/helpers/types'

class UserEntity extends Entity {
  id: string | number = 0
  firstName: string = ''
  lastName: string = ''
  maidenName: string = ''
  age: number = 0
  username: string = ''
  gender: string = ''
  email: string = ''
  phone: string = ''
  image: string = ''
  birthDate: string = ''
  address?: Address
  company?: Company

  constructor(payload: any) {
    super(payload)
    Object.assign(this, payload)
  }

  get fullName() {
    let fullName = `${this.firstName} ${this.lastName}`
    if (this.maidenName) {
      fullName += ` (ex. ${this.maidenName})`
    }
    return fullName
  }

  get avatar() {
    if (this.image) {
      return this.image
    }
    return FALLBACK_IMAGE
  }

  get info() {
    return [
      { label: 'Username', value: this.username },
      { label: 'Gender', value: this.gender },
      { label: 'Birth date', value: this.birthDate },
      { label: 'Phone', value: this.phone },
      { label: 'Email', value: this.email },
      { label: 'City', value: this.address?.city },
      { label: 'State', value: this.address?.state },
      { label: 'Country', value: this.address?.country },
      { label: 'Company', value: this.company?.name },
      { label: 'Job title', value: this.company?.title }
    ]
  }
}

export default UserEntity
