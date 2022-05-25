import { ComponentType } from 'react'

const PageLoader = (loadComponent: () => Promise<{ default: ComponentType<any> }>) => {
  return (): Promise<{ default: ComponentType<any> }> =>
    new Promise((resolve, reject) => {
      loadComponent()
        .then((module) => resolve(module))
        .catch((error: object) => {
          reject(error)
        })
    })
}

export default PageLoader
