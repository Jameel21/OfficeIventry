import AllocationTable from "./_utils/AllocationTable";

const AllocationLog = () => {
  return (
    <div className="w-full">
      <div className="mt-2 text-lg font-medium text-slate-700">
        Allocation Log
      </div>
      <div className="mt-8">
        <AllocationTable />
      </div>
    </div>
  );
};

export default AllocationLog;
