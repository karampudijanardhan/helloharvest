import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = ({ children }: any) => {

  return (
    <div className="flex min-h-screen bg-background">

      <AdminSidebar />

      {/* Content Area */}
      <div className="flex-1 pt-20 lg:pt-8 p-4 sm:p-6 lg:p-8">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;