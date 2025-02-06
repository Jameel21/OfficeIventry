

const CustomCheckbox = ({ checked, disabled, onChange, className = "" }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => !disabled && onChange(e.target.checked)}
      className={`w-4 h-4 rounded border-gray-300 focus:ring focus: bg-secondary cursor-pointer 
        ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-secondary"} ${className}`}
    />
  );
};
export default CustomCheckbox
