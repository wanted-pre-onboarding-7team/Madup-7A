import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import Layout from './_shared/Layout'

const DashBoard = lazy(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
  return import('./Dashboard')
})

const AdsManage = lazy(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
  return import('./AdsManage')
})

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
