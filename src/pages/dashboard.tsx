import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import TableList from "@/components/containers/TableList";
import { DashboardEntity } from "@/model/dashboard/dashboard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DashboardPage() {
  const { id } = useParams();

  const [dashboard, setDashboard] = useState<DashboardEntity | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/dashboards/${id}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching dashboard (status: ${response.status})`
          );
        }

        const data = await response.json();
        const mappedDashboard = DashboardEntity.fromJSON(data);
        //console.log("DASHBOARD", mappedDashboard);
        //console.log("TABLE", mappedDashboard.tableList);

        setDashboard(mappedDashboard);
        setLoading(false)
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (id) fetchDashboard();
  }, [id]);

  if (isLoading) return <></>

  return (
    <main className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <TableList tables={dashboard!.tableList} />
      </div>
    </main>
  );
}

export default DashboardPage;
