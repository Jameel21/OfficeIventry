import EmployeeTable from "./_utils/EmployeeTable";

const ViewRequest = () => {
  return (
    <div className="">
      <div className="mt-8">
        <h1 className="text-lg font-medium text-slate-700">Details</h1>
      </div>
      <div>
        <EmployeeTable />
      </div>
    </div>
  );
};

export default ViewRequest;
