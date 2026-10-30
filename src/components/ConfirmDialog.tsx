type Props = {
  studentName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmDialog({
  studentName,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="dialog">
      <h3>Confirm Delete</h3>

      <p>
        Are you sure you want to delete {studentName}?
      </p>

      <button onClick={onConfirm}>
        Yes, Delete
      </button>

      <button onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}

export default ConfirmDialog;