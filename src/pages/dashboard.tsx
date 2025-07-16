import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import TableList from "@/components/containers/TableList";
import { TableListContext } from "@/components/contexts/tableList";
import getDashboard from "@/lib/forms/dashboard/getDashboard";
import { TableEntity } from "@/model/table/table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DashboardPage() {
  const { id } = useParams();

  const [tableList, setTableList] = useState<TableEntity[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const sortedTableList = await getDashboard(id!);
        setTableList([...sortedTableList])
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (id) fetchDashboard();
  }, [id]);

  if (isLoading) return <></>;

  return (
    <TableListContext.Provider value={{ tableList, setTableList }}>
      <main className="flex flex-row h-screen">
        <SideBar
          isSideBarOpen={sidebarOpen}
          removeSideBar={() => setSidebarOpen(false)}
        />
        <div className="flex flex-col w-full overflow-hidden">
          <Header toggleSideBar={() => setSidebarOpen((prev) => !prev)} />
          <div className="h-full min-w-full overflow-x-scroll">
            <TableList />
          </div>
        </div>
      </main>
    </TableListContext.Provider>
  );
}

export default DashboardPage;
