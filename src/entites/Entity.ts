import { cloneDeep } from 'lodash-es'

export default class Entity {
  [key: string]: any

  constructor(payload: any) {
    Object.assign(this, payload)
  }

  clone() {
    return cloneDeep(this)
  }
}
