import API from "@/helper/AxiosConfig";

//brand
const addBrand = async (data) => {
  const response = await API.post("/master/brand/create", data);
  return response;
};
const getAllBrand = async () => {
  const response = await API.get("/master/brand/getAll");
  return response;
};
const getBrandById = async (id) => {
  const response = await API.get(`/master/brand/getById/${id}`);
  return response;
}; 
const updateBrand = async(id, data) => {
  const response = await API.put(`/master/brand/update/${id}`, data);
  return response
}
const deleteBrand = async (id) =>{
  const response = await API.delete(`/master/brand/delete/${id}`);
  return response
}

//department
const addDepartment = async (data) => {
  const response = await API.post("master/department/addDepartment", data);
  return response;
};
const getAllDepartment = async () => {
  const response = await API.get("master/department/getAllDepartment");
  return response;
};
const getDepartmentById = async (id) => {
  const response = await API.get(`/master/department/getDepartment/${id}`);
  return response;
};
const updateDepartment = async(id, data) => {
  const response = await API.put(`/master/department/update/${id}`, data);
  return response
}
const deleteDepartment = async (id) =>{
  const response = await API.delete(`/master/department/delete/${id}`);
  return response
}

//category
const addCategory = async (data) => {
  const response = await API.post("master/category/create", data);
  return response;
};
const getAllCategory = async (equipmentType) => {
  const response = await API.get("/master/category/getAll", {
    params: {equipmentType}
  });
  return response;
};

//role
const addRole = async (data) => {
  const response = await API.post("/role/add", data);
  return response;
};
const getAllRole = async () => {
  const response = await API.get("/role/getAll");
  return response;
};
const getRoleById = async (id) => {
  const response = await API.get(`/role/getById/${id}`);
  return response;
};
const updateRole = async(id, data) => {
  const response = await API.put(`/role/update/${id}`, data);
  return response
}
const deleteRole = async (id) =>{
  const response = await API.delete(`/role/delete/${id}`);
  return response
}

//menu
const getAllMenu = async () => {
  const response = await API.get("/menu/getAll");
  return response;
};


export default {
  addRole,
  getAllRole,
  getRoleById,
  updateRole,
  deleteRole,
  getAllMenu,
  addBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
  addCategory,
  getAllCategory,
  addDepartment,
  getAllDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
};
