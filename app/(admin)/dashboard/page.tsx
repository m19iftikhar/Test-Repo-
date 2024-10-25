import Memberships from "@/app/components/Dashboard/Memberships";
import Revenue from "@/app/components/Dashboard/Revenue";
import DashboardStats from "@/app/components/Dashboard/DashboardStats";
import BookingsToday from "@/app/components/Dashboard/BookingsToday";
import RenewalRequests from "@/app/components/Dashboard/RenewalRequests";
import OutstandingPayments from "@/app/components/Dashboard/OutstandingPayments";

const Dashboard = () => {
  return (
    <>
      <DashboardStats />
      <div className="custom-row">
        <div className="col_12 col_lg_6">
          <Memberships />
        </div>
        <div className="col_12 col_lg_6">
          <Revenue />
        </div>
      </div>
      <BookingsToday />
      <div className="custom-row">
        <div className="col_12 col_lg_6">
          <RenewalRequests />
        </div>
        <div className="col_12 col_lg_6">
          <OutstandingPayments />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
