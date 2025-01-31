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
  newPassword: yup
    .string()
    .required("password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .required(" confirm password is required")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Both passwords must match each other"
    ),
});

export const forgotPasswordSchema = yup.object().shape({
  userInput: yup
    .string()
    .required("Either email or username is required")
    .test(
      "is-email-or-username",
      "Invalid email or username",
      (value) => {
        // Check if the input is a valid email or a valid username
        const isEmail = yup.string().email().isValidSync(value);
        const isUsername = /^[a-zA-Z0-9_]+$/.test(value); // Example username regex
        return isEmail || isUsername;
      }
    ),
});

export const registerSchema = yup.object().shape({
  userName: yup
    .string()
    .required("username is required")
    .min(3, "username must be atleast 3 characters")
    .max(16, "username cannot exceed 16 characters"),
  email: yup
    .string()
    .email("invalid email")
    .required("email is required")
    .min(10, "email must be atleast 10 characters")
    .max(30, "email cannot exceed 30 characters"),
  employeeId: yup
    .string()
    .required("employee id is required")
    .min(3, "employee id must be atleast 3 characters")
    .max(12, "employee id cannot exceed 12 characters"),
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
  reason: yup.string().required("reason is required").min(3, "reason must be atleast 3 characters")
  .max(250, "reason cannot exceed 250 characters"),
});

export const requestSchema = yup.object().shape({
  brandId: yup.string().required("brand is required"),
});

export const rejectedSchema = yup.object().shape({
  rejectedReason: yup.string().required("rejected reason is required").min(3, "rejected reason must be atleast 3 characters").max(150, "rejected reason cannot exceed 150 characters")
});

export const updatePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("current password is required"),
  newPassword: yup.string().required("new password is required"),
});

export const equipmentSchema = yup.object().shape({
  equipmentNameId: yup.string().required("equipment is required"),
  serialNumber: yup.string().optional(),
  quantity: yup.string().optional(),
  dateOfPurchase: yup.string().required("purchase date is required"),
  price: yup
    .string()
    .required("price is required")
    .min(1, "price must be atleast 1 character")
    .max(10, "price cannot exceed 10 characters"),
  brandId: yup.string().required("brand is required"),
});

export const brandSchema = yup.object().shape({
  brand: yup
    .string()
    .required("brand is required")
    .min(3, "brand must be atleast 3 characters")
    .max(25, "brand cannot exceed 25 characters"),
});

export const departmentSchema = yup.object().shape({
  department: yup
    .string()
    .required("department is required")
    .min(3, "department must be atleast 3 characters")
    .max(25, "department cannot exceed 25 characters"),
});

export const roleSchema = yup.object().shape({
  role: yup
    .string()
    .required("role is required")
    .min(2, "role must be atleast 2 characters")
    .max(25, "role cannot exceed 25 characters"),
  notifyForRequest: yup
    .string()
    .required("notification availabilty is required"),
});

export const categorySchema = yup.object().shape({
  equipmentName: yup
    .string()
    .required("equipment is required")
    .min(3, "equipment must be atleast 3 characters")
    .max(25, "equipment cannot exceed 25 characters"),
  isSerialNumber: yup
    .string()
    .required("serial number availability is required"),
  brandIds: yup
    .array()
    .of(yup.string())
    .required("brand is required")
    .min(1, "at least one brand must be selected"),
});
