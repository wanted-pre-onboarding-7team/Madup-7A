import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Error from './Error'
import View from './View'

const Chart = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallbackRender={Error}>
          <View />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default Chart
