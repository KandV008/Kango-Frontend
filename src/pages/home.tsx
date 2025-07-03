import DashboardList from "@/components/containers/DashboardList";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";

function Home() {
  return (
    <main className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <DashboardList />
      </div>
    </main>
  );
}

export default Home;
