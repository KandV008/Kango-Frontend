import { useEffect, useState } from "react";
import { DashboardEntity } from "@/model/dashboard/dashboard";
import type { AttachedFileProps } from "@/model/utils/attachedFile";
import AttachedFile from "../entities/AttachedFile";

interface componentProps {
  dashboardId: string | undefined;
}

function AttachedFileList({ dashboardId }: componentProps) {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFileProps[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/dashboards/${dashboardId}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching dashboard (status: ${response.status})`
          );
        }

        const data = await response.json();
        const mappedDashboard = DashboardEntity.fromJSON(data);
                console.log(mappedDashboard)

        const attachedFilesAux = mappedDashboard.atacchedFiles;
        setAttachedFiles(attachedFilesAux);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (dashboardId) fetchDashboard();
  }, [dashboardId]);
  return (
    <section className="flex flex-col flex-wrap items-center justify-center gap-5 px-5 size-full ">
      {attachedFiles.map((file, index) => (
        <AttachedFile
          key={"attached-file-" + index}
          attachedFile={file}
          dashboardId={dashboardId!}
        />
      ))}
    </section>
  );
}

export default AttachedFileList;
