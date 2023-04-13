import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/imgs/Logo.png'
import BannerLogin from '../../assets/imgs/BannerLogin.png'
import path from '../../constants/path'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxios422Error } from '../../utils/utils'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const registerAccountMutation = useMutation({
    mutationFn: (body) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
        console.log(data)
      },
      onError: (error) => {
        if (isAxios422Error(error)) {
          const formError = error.response?.data
          if (formError?.detail) {
            setError('username', {
              message: formError.detail,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  console.log(errors)
  return (
    <div className='login-form'>
      <div className='my-4 mx-4 flex items-center justify-between md:mx-12'>
        <div className='flex items-center justify-center text-center text-2xl text-yellow-800'>
          <img src={Logo} alt='logo' className='mr-3 md:mr-2' />
          Đăng Kí
        </div>
        <div className='cursor-pointer text-xl text-yellow-500 hover:opacity-60'>Need help?</div>
      </div>
      <div className='bg-red-600 py-4'>
        <form className='container block rounded-md shadow-md lg:flex' onSubmit={onSubmit} noValidate>
          <img
            src={BannerLogin}
            alt='banner'
            className='flex-grow items-center justify-center object-center text-center lg:flex-grow-0'
          />
          <div className='flex-grow-[0.9] bg-white py-8  px-12 '>
            <div className='mb-8 text-4xl text-yellow-700 '>Đăng kí</div>
            <div className='my-3 flex flex-col text-xl text-black'>
              <div className='my-2 flex-grow text-2xl'>Username or Email</div>
              <input
                type='email'
                className='] flex  flex-grow rounded-sm border-indigo-400 bg-slate-100 py-2 px-3 outline-none '
                placeholder='Username or Email...'
                {...register('username')}
              />
              <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.username?.message}</div>
            </div>
            <div className='my-3 flex flex-col text-xl text-black'>
              <div className='my-2 flex-grow text-2xl'>Password</div>
              <input
                type='password'
                className='] flex  flex-grow rounded-sm border-indigo-400 bg-slate-100 py-2 px-3 outline-none'
                placeholder='Password...'
                autoComplete='on'
                {...register('password')}
              />
              <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.password?.message}</div>
            </div>{' '}
            <div className='my-3 flex flex-col text-xl text-black'>
              <div className='my-2 flex-grow text-2xl'>Confirm Password</div>
              <input
                type='password'
                className='] flex  flex-grow rounded-sm border-indigo-400 bg-slate-100 py-2 px-3 outline-none'
                placeholder='Confirm Password...'
                autoComplete='on'
                {...register('confirm_password')}
              />
              <div className='mt-1  min-h-[1.25rem]  text-sm text-red-600'>{errors.confirm_password?.message}</div>
            </div>
            <div className='mt-8 flex '>
              <button className='flex-grow rounded-md bg-orange py-3 px-4 text-xl text-white hover:opacity-90 '>
                Register
              </button>
            </div>
            <a href='/login' className='my-6 flex justify-end text-red-400'>
              Forgot Password?
            </a>
            <div className='mt-8 h-[1px] w-full bg-slate-400'></div>
            <div className='my-4'>
              <div className='my-4 flex justify-between'></div>
              <div className='flex items-center justify-center text-center'>
                <span className='text-gray-400 '>Bạn đã có tải khoản chưa ?</span>
                <Link className='text-red-400 hover:animate-bounce' to={path.login}>
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Register
