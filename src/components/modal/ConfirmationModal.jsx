import UiButton from "../form-fields/_utils/Button";

const ConfirmationModal = ({ showModal, onClose, onConfirm, title }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-5 rounded-lg shadow-lg bg-background w-96">
        <h3 className="font-semibold text-black text-md md:text-lg">
         {title}
        </h3>
        <div className="flex justify-between mt-4">
          <UiButton 
          variant="secondary"
          onClick={onConfirm}
          buttonName="Confirm"
          className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-9 lg:w-28 lg:h-10"
          />
          <UiButton 
          variant="secondary"
          onClick={onClose}
          buttonName="Cancel"
          className="w-24 h-8 mt-3 bg-gray-300 text-secondary-foreground sm:w-28 sm:h-8 md:w-32 md:h-9 lg:w-28 lg:h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
