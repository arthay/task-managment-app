export interface I_ConfirmModalMockProps {
  isOpen: boolean;
  onConfirm: () => void;
}
function ConfirmModalMock({ isOpen, onConfirm }: I_ConfirmModalMockProps) {
  return (
    <div data-testid="confirm-modal">
      {isOpen ? (
        <>
          ConfirmModal Open
          <button onClick={onConfirm}>Confirm</button>
        </>
      ) : (
        "ConfirmModal Closed"
      )}
    </div>
  );
}

export default ConfirmModalMock;
