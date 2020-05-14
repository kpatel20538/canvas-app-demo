import { useState } from "react";
import OpenFileModal from "./OpenFileModal";
import SaveFileModal from "./SaveFileModal";

export default ({ onNew, onOpen, onSave, onDelete }) => {
  const [isOpenModalActive, setIsOpenModalActive] = useState(false);

  const [isSaveModalActive, setIsSaveModalActive] = useState(false);
  return (
    <>
      {isOpenModalActive && (
        <OpenFileModal
          onClose={() => setIsOpenModalActive(false)}
          onOpen={onOpen}
          onDelete={onDelete}
        />
      )}
      {isSaveModalActive && (
        <SaveFileModal
          onClose={() => setIsSaveModalActive(false)}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
      <nav
        className="navbar has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">File</a>

              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={() => onNew()}>
                  New
                </a>
                <a
                  className="navbar-item"
                  onClick={() => setIsOpenModalActive(true)}
                >
                  Open
                </a>
                <a
                  className="navbar-item"
                  onClick={() => setIsSaveModalActive(true)}
                >
                  Save
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
