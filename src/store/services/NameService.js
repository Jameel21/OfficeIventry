import API from "@/configs/AxiosConfig";

const getRolesName = async () => {
  const response = await API.get("/role/getAll");
  return response
}

const getDepartmentsName = async () => {
  const response = await API.get("/department/getDepartments");
  return response
}

const getEquipmentsName = async () => {
  const response = await API.get("/Inventory/master/getall");
  return response
}

const getBrandNames = async (id) => {
  const response = await API.get(`/Inventory/getBrands/${id}`)
  return response
}

export default {
  getRolesName,
  getDepartmentsName,
  getEquipmentsName,
  getBrandNames
}