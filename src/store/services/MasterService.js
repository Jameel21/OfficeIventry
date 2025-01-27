import API from "@/helper/AxiosConfig";

//brand
const addBrand = async (data) => {
  const response = await API.post("/master/brand/create", data);
  return response;
};
const getAllBrand = async ({ page = 1, limit = 10 }) => {
  const response = await API.get(`/master/brand/getAll?page=${page}&limit=${limit}`);
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
const getAllDepartment = async ({ page = 1, limit = 10 }) => {
  const response = await API.get(`master/department/getAllDepartment?page=${page}&limit=${limit}`);
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
const addCategory = async (data, equipmentType) => {
  const response = await API.post("master/category/create",data,{
    params:{equipmentType},
  });
  return response;
};
const getAllCategory = async (page, limit, equipmentType) => {
  const response = await API.get("/master/category/getAll", {
    params: { page,limit,equipmentType}
  });
  return response;
};
const getCategoryById = async (id) => {
  const response = await API.get(`/master/category/getById/${id}`);
  return response;
};
const getCategoryDetails = async ({ id, page = 1, limit = 10 }) => {
  const response = await API.get(`/master/category/categoryDetails/${id}`, {
    params: { page, limit },
  });
  return response;
};
const updateCategory = async(id, data) => {
  const response = await API.put(`/master/category/update/${id}`, data);
  return response
}
const deleteCategory = async (id) =>{
  const response = await API.delete(`/master/category/delete/${id}`);
  return response
}

//role
const addRole = async (data) => {
  const response = await API.post("/role/add", data);
  return response;
};
const getAllRole = async ({ page = 1, limit = 10 }) => {
  const response = await API.get(`/role/getAll?page=${page}&limit=${limit}`);
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


export default {addRole,getAllRole,getRoleById,updateRole,deleteRole,getAllMenu,addBrand,getAllBrand,getBrandById,
updateBrand,deleteBrand,addCategory,getAllCategory,getCategoryById,getCategoryDetails,updateCategory,deleteCategory,addDepartment,
getAllDepartment,getDepartmentById,updateDepartment,deleteDepartment
};
