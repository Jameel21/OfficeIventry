import API from "@/helper/AxiosConfig";

const getRolesName = async () => {
  const response = await API.get("/role/getAll");
  return response
}

const getDepartmentsName = async () => {
  const response = await API.get("/master/department/getAllDepartment");
  return response
}

const getEquipmentsName = async (equipmentType) => {
  const response = await API.get("/master/category/getNames", {
    params: { equipmentType },
  });
  return response
}


const getSerialNumbers = async (equipmentId, brandId) => {
  const response = await API.get("/equipment/getSerialNumber", {
    params: { equipmentId, brandId },
  });
  return response;
};

export default {
  getRolesName,
  getDepartmentsName,
  getEquipmentsName,
  getSerialNumbers
}