export default ({ children,  onClose }) => (
  <div className="modal is-active">
    <div className="modal-background" onClick={() => onClose()}></div>
    <div className="modal-content">
      <div className="box">{children}</div>
    </div>
  </div>
);
