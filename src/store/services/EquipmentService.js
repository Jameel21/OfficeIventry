import API from "@/helper/AxiosConfig";


const addEquipment = async (data, equipmentType) => {
  const response = await API.post("/equipment/create/",
    data, {
      params:{equipmentType}
    }
  )
  return response
}

const getAllEquipment = async (page, limit, equipmentType) => {
  const response = await API.get(`/equipment/getAll/`, {
    params:{
      page,
      limit,
      equipmentType
    }
  })
  return response
}

const getSingleEquipment = async (id) => {
  const response = await API.get(`/equipment/getById/${id}`)
  return response
}

const updateEquipment = async ()=>{
  const response = await API.put(`/equipment/update/${id}`,data)
  return response
}

const deleteEquipment = async ()=>{
  const response = await API.delete(`/equipment/delete/${id}`)
  return response
}
export default {addEquipment, getAllEquipment,getSingleEquipment,updateEquipment,deleteEquipment}