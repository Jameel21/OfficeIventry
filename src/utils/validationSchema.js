import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be atleast 8 characters")
    .max(16, "password cannot exceed 16 characters"),
});


export const registerSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  email: yup.string().email("invalid email").required("email is required"),
  role:yup.string().required('role is required'),
  password: yup.string().required("password is required").min(8, "password must be atleast 8 characters").max(16, "password cannot exceed 16 characters")
})

export const employeeSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  employee_id: yup.string().required("employee ID is required"),
  department: yup.string().required("department is required"),
  equipment_name: yup.string().required("equipment name is required"),
  issue_date: yup.string().required("issue date is required"),
  expected_return: yup.string().required("expected return is required "),
  reason: yup.string().required("reason is required"),
});