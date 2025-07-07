import DashboardList from "@/components/containers/DashboardList";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";

function Home() {
  return (
    <main className="flex flex-row h-screen">
      <SideBar />
      <div className="flex flex-col w-full gap-2">
        <Header />
        <div className="flex-1 overflow-hidden">
          <DashboardList />
        </div>
      </div>
    </main>
  );
}

export default Home;
