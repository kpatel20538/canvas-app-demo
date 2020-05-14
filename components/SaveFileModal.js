import { useState, useEffect } from "react";
import Modal from "./Modal";
import { listFiles } from "../util/fileUtils";

export default ({ onSave, onDelete, onClose }) => {
  const [fileName, setFileName] = useState("");
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
                  await onSave(fileName);
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
      <div className="field">
        <div className="label">File Name</div>
        <div className="control">
          <input
            type="input"
            className="input"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button
            className="button is-primary"
            onClick={async () => {
              await onSave(fileName);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
