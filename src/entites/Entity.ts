export default class Entity {
  [key: string]: any

  constructor(payload: any) {
    Object.assign(this, payload)
  }

  clone() {
    return structuredClone(toRaw(this))
  }
}
