
import EmployeeForm from "./_utils/EmployeeForm";
import Search from "./_utils/SearchBar";
const RequestForm = () => {
  return (
    <div className="w-full h-full bg-primary">
      <Search />
      <div className="mt-5">
        <h1 className="text-lg font-medium text-slate-700">
          Request Equipment
        </h1>
      </div>

      <EmployeeForm />
      </div>
  )
}

export default RequestForm