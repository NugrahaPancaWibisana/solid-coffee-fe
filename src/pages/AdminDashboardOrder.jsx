import AdminDashboardMenu from "../components/adminDashboard/AdminDashboardMenu";
import OrderList from "../components/adminDashboard/OrderList";


function AdminDashboardOrder() {
  return(
    <div className="mt-8 px-5 py-10 lg:px-10 md:grid md:grid-cols-[300px_670px] lg:grid-cols-[20%_80%]">
        <AdminDashboardMenu/>
        <OrderList/>
    </div>
  );
};

export default AdminDashboardOrder;
