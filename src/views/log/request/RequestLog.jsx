import RequestLogTable from "./_utils/RequestLogTable"

const RequestLog = () => {
  return (
    <div className="w-full">
      <div className="mt-2 text-lg font-medium text-slate-700">
        Request Log
      </div>
      <div className="mt-8">
        <RequestLogTable />
      </div>
    </div>
  )
}

export default RequestLog