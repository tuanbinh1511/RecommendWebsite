function Input({
  type,
  errorMessage,
  name,
  autoComplete,
  register,
  className,
  placeholder,
  rules,
  classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 ml-3 min-h-[1.25rem] text-left text-sm text-red-600'
}) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}

export default Input
