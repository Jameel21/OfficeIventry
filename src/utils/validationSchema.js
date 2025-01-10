import * as yup from "yup";

export const loginSchema = yup.object().shape({
  userName: yup.string().required("username is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be atleast 8 characters")
    .max(16, "password cannot exceed 16 characters"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string().required("password is required").min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup.string().required(" confirm password is required").oneOf([yup.ref("newPassword"), null], "Both passwords must match each other"),
});

export const forgotPasswordSchema = yup.object().shape({
  userName: yup.string().required("username is required"),
  email: yup.string().email("invalid email").required("email is required"),
});

export const registerSchema = yup.object().shape({
  userName: yup.string().required("username is required"),
  email: yup.string().email("invalid email").required("email is required"),
  employeeId: yup.string().required("employee id is required"),
  departmentId: yup.string().required("department is required"),
  roleId: yup.string().required("role is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be atleast 8 characters")
    .max(16, "password cannot exceed 16 characters"),
});

export const employeeSchema = yup.object().shape({
  equipmentId: yup.string().required("equipment name is required"),
  requestDate: yup.string().required("request date is required"),
  reason: yup.string().required("reason is required"),
});

export const requestSchema = yup.object().shape({
  brandId: yup.string().required("brand is required"),
});

export const rejectedSchema = yup.object().shape({
  rejectedReason: yup.string().required("rejected reason is required"),
});

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("current password is required"),
  newPassword: yup.string().required("new password is required"),
});

export const equipmentSchema = yup.object().shape({
  equipmentNameId: yup.string().required("equipment is required"),
  dateOfPurchase: yup.string().required("purchase date is required"),
  price: yup.string().required("price is required"),
  brandId:yup
  .string()
  .required("brand is required")
});

export const brandSchema = yup.object().shape({
  brand: yup.string().required("brand is required"),
});

export const departmentSchema = yup.object().shape({
  department: yup.string().required("department is required"),
});

export const roleSchema = yup.object().shape({
  role: yup.string().required("role is required"),
  notifyForRequest: yup.string().required("notification availabilty is required"),
});

export const categorySchema = yup.object().shape({
  equipmentName: yup.string().required("equipment is required"),
  isSerialNumber: yup.string().required("serial number availability is required"),
  brandIds: yup
    .array()
    .of(yup.string())
    .required("brand is required")
    .min(1, "at least one brand must be selected"),
});