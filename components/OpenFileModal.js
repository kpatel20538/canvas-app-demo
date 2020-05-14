import { useEffect, useState } from "react";
import Modal from "./Modal";
import { listFiles } from "../util/fileUtils";

export default ({ onClose, onOpen, onDelete }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    (async () => {
      setFiles([...(await listFiles())]);
    })();
  });

  return (
    <Modal onClose={() => onClose()}>
      {files.length <= 0
        ? "No files saved"
        : files.map((fileName) => (
            <div key={fileName} className="media">
              <div
                className="media-content"
                onClick={async () => {
                  await onOpen(fileName);
                  onClose();
                }}
              >
                {fileName}
              </div>
              <div className="media-right">
                <button className="delete" onClick={() => onDelete(fileName)} />
              </div>
            </div>
          ))}
    </Modal>
  );
};
