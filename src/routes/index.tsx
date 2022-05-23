import { Route, Routes } from 'react-router-dom'

import Layout from './_shared/Layout'
import DashBoard from './Dashboard'
import AdsManage from './AdsManage'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<DashBoard />} />
        <Route path='ads/manage' element={<AdsManage />} />
      </Route>
    </Routes>
  )
}

export default App
