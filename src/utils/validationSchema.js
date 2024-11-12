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
  department_name: yup.string().required("department is required"),
  equipment_name: yup.string().required("equipment name is required"),
  issue_date: yup.string().required("issue date is required"),
  expected_return: yup.string().required("expected return is required "),
  reason: yup.string().required("reason is required"),
});


export const employeequipSchema = yup.object().shape({
     equipment_name:yup.string().required("equipmentname is required"),
     equipment_model: yup.string().required("equipmentmodel is required"),
     serial_no:yup.string().required("Serial number is required"),
     purshase_date:yup.string().required("purchase date is required"),
     warranty_period:yup.string().required("warranty period is required"),
     current_status: yup.string().required("Current Status is required")
})

export const officeequipSchema = yup.object().shape({
     equipment_name : yup.string().required("equipmentname is required"),
     equipment_count:yup.number().required("Count is required"),
     equipment_price:yup.number().required("Price is required"),
     equipment_availability:yup.string().required("Required")
})