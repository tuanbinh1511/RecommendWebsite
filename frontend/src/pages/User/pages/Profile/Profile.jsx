import { useMutation, useQuery } from '@tanstack/react-query'
import Input from '../../../../components/Input/Input'
import { userSchema } from '../../../../utils/rules'
import userApi from '../../../../apis/user.api'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
import InputNumber from '../../../../components/InputNumber'
import DataSelect from '../../components/DataSelect'
import Button from '../../../../components/Button/Button'
import { setProfileFromLS } from '../../../../utils/auth'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../context/app.context'
import LogoDtu from '../../../../assets/imgs/LogoDtu.png'

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'birthday', 'gender'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile,
    onSuccess: () => {
      // refetch()
    }
  })

  const profile = profileData?.data[0]

  const updateProfileMutation = useMutation(userApi.updateProfile)
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      gender: '',
      birthday: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('gender', profile.gender)
      setValue('birthday', profile.birthday ? new Date(profile.birthday) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateProfileMutation.mutateAsync({ ...data, birthday: data.birthday?.toISOString() })

    setProfile(res.data[0])
    setProfileFromLS(res.data[0])
    refetch()
    toast.success('Cập nhật thông tin cá nhân thành công !', {
      position: 'top-center'
    })
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-semibold capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse font-medium md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='birthday'
            render={({ field }) => (
              <DataSelect errorMessage={errors.birthday?.message} value={field.value} onChange={field.onChange} />
            )}
          />
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img src={LogoDtu} alt='' className=' w-full rounded-sm object-cover' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
