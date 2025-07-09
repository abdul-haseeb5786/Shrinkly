const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  confirmText = 'Yes',
  cancelText = 'No',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-800 text-white w-full max-w-md p-6 rounded-xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-500 hover:bg-gray-700 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
