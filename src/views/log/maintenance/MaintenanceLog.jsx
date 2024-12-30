import MaintenanceTable from "./_utils/MaintenanceTable";


const MaintenanceLog = () => {

  return (
    <div>
      <div className="mt-2 text-lg font-medium text-slate-700">Maintenance Log</div>
      <div className="mt-10">
        <MaintenanceTable />
      </div>
    </div>
  );
};

export default MaintenanceLog;
