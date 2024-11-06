import EmployeeTable from "./_utils/EmployeeTable";
import EmployeeForm from "./_utils/EmployeeForm";
import Search from "./_utils/Search";

const Employees = () => {
  return (
    <div className="w-full h-full bg-primary">
      <Search />
      <div className="mt-5">
        <h1 className="text-lg font-medium text-slate-700">
          Request Equipment
        </h1>
      </div>

      <EmployeeForm />

      <div className="mt-8">
        <h1 className="text-lg font-medium text-slate-700">Details</h1>
      </div>
      <EmployeeTable />
    </div>
  );
};

export default Employees;
