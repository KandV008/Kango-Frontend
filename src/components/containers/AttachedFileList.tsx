import { useEffect, useState } from "react";
import { DashboardEntity } from "@/model/dashboard/dashboard";
import type { AttachedFileProps } from "@/model/utils/attachedFile";
import AttachedFile from "../entities/AttachedFile";

const BACKEND_URL = import.meta.env.VITE_API_URL;

interface componentProps {
  dashboardId: string | undefined;
}

function AttachedFileList({ dashboardId }: componentProps) {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFileProps[]>([]);

  const removeFile = (
    fileToRemove: AttachedFileProps,
    attachedFiles: AttachedFileProps[]
  ) => {
    const index = attachedFiles.findIndex(
      (f) =>
        f.fileName === fileToRemove.fileName &&
        f.fileUrl === fileToRemove.fileUrl
    );

    if (index !== -1) {
      const updatedFiles = [...attachedFiles];
      updatedFiles.splice(index, 1);
      setAttachedFiles(updatedFiles);
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/dashboards/${dashboardId}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching dashboard (status: ${response.status})`
          );
        }

        const data = await response.json();
        const mappedDashboard = DashboardEntity.fromJSON(data);
        console.log(mappedDashboard);

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
      {attachedFiles && attachedFiles.length !== 0 ? (
        <>
          {attachedFiles.map((file, index) => (
            <AttachedFile
              key={"attached-file-" + index}
              attachedFile={file}
              dashboardId={dashboardId!}
              onRemove={() => removeFile(file, attachedFiles)}
            />
          ))}
        </>
      ) : (
        <em className="w-full text-center ">
          This Dashboard doesn't have any attached files.
        </em>
      )}
    </section>
  );
}

export default AttachedFileList;
