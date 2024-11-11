import API from "@/configs/AxiosConfig";

const addRequest = async (data) => {
  const response = await API.post('/equipment/requestEquipment', data)
  return response
}
const getRequest = async (username) => {
  const response = await API.get('/equipment/employeeRequest', {
    params:{username}
  })
  return response
}
const updateRequest = async ({id, ...fields}) => {
  const response = await API.patch(`/equipment/updatingReqFields/${id}`, fields)
  return response
}


  export default {
    addRequest,
    getRequest,
    updateRequest,
  };