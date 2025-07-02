import "./App.css";
import DashboardList from "./components/containers/DashboardList";
import Header from "./components/containers/Header";
import SideBar from "./components/containers/SideBar";

function App() {
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

export default App;
