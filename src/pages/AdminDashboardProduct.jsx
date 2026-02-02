import AdminDashboardMenu from '../components/adminDashboard/AdminDashboardMenu'
import ProductList from '../components/adminDashboard/ProductList'

function AdminDashboardProduct() {
  return (
    <div className="mt-8 px-5 py-10 lg:px-10 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%]">
      <AdminDashboardMenu/>
      <ProductList/>
    </div>
  )
}

export default AdminDashboardProduct
