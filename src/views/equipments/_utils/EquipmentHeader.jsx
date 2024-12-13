import UiButton from "@/components/form-fields/_utils/Button";

const EquipmentHeader = ({onClick,buttonName,title}) => {
  return (
    <div className="flex items-center justify-between">
    <div className="text-base font-normal md:text-lg md:font-medium text-slate-700">
      {title}
    </div>
    <div className="flex items-center gap-2">
      <UiButton
        onClick={onClick}
        className={"w-28 h-7 md:w-40 md:h-11 text-white"}
        variant={"secondary"}
        buttonName={buttonName}
      />
    </div>
  </div>
  )
}

export default EquipmentHeader