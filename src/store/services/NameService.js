import API from "@/helper/AxiosConfig";

const getEquipmentsName = async (equipmentType, includeAll = false) => {
  const response = await API.get("/master/category/getNames", {
    params: { equipmentType,  includeAll  },
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
  getEquipmentsName,
  getSerialNumbers
}