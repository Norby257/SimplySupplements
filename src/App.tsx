import './App.css'
import SkipLink from './components/layout/SkipLink'
import ProductsPage from './pages/ProductsPage'

function App() {
  return (
    <>
      <SkipLink />
      <main id="main-content">
        <ProductsPage />
      </main>
    </>
  )
}

export default App
