import * as yup from 'yup'

// export const rules = {
//   emai: {
//     required: {
//       value: true,
//       message: 'Email là bắt buộc'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không đúng định dạng'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài 5-160 kí tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài 5-160 kí tự'
//     }
//   },
//   password: {
//     minLength: {
//       value: 5,
//       message: 'Độ dài 5-160 kí tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài 5-160 kí tự'
//     }
//   },
//   confirm_password: {
//     minLength: {
//       value: 5,
//       message: 'Độ dài 5-160 kí tự'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài 5-160 kí tự'
//     }
//   }
// }

export const schema = yup.object({
  username: yup
    .string()
    .required('Email là bắt buộc!')
    .email('Email không đúng định dạng!')
    .min(5, 'Độ dài email từ 5-160 kí tự!')
    .max(160, 'Độ dài email từ 5-160 kí tự!'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc!')
    .min(5, 'Độ dài mật khẩu từ 5-160 kí tự!')
    .max(160, 'Độ dài mật khẩu từ 5-160 kí tự!'),
  confirm_password: yup
    .string()
    .required('Nhập lại mật khẩu là bắt buộc!')
    .min(5, 'Độ dài mật khẩu từ 5-160 kí tự!')
    .max(160, 'Độ dài mật khẩu từ 5-160 kí tự!')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp!')
})

export const LoginSchema = schema.omit(['confirm_password'])
