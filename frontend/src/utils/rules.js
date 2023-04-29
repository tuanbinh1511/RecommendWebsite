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
function testPriceMinMax() {
  const { maxprice, minprice } = this.parent
  if (minprice !== '' && maxprice !== '') {
    return Number(maxprice) >= Number(minprice)
  }
  return minprice !== '' || maxprice !== ''
}
const handleConfirmPasswordYup = (refString) => {
  return yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

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
  confirm_password: handleConfirmPasswordYup('password'),
  minprice: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  maxprice: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  keyword: yup.string().trim().required()
})

export const LoginSchema = schema.pick(['username', 'password'])
export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  gender: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  // avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  birthday: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  current_pw: schema.fields['password'],
  new_pw: schema.fields['password'],
  confirm_pw: handleConfirmPasswordYup('new_pw')
})
