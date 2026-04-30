const Spinner = () => (
  <svg
    className="h-5 w-5 shrink-0 animate-spin text-current opacity-90"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button = ({
  label,
  iconUrl,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  disabled,
  type,
  className,
  loading,
}) => {
  return <>
    <button
      type={type ?? "button"}
      disabled={disabled || loading}
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
    ${backgroundColor
        ? `${backgroundColor} ${textColor} ${borderColor}`
        : "bg-coral-blue text-white border-coral-blue"
      } rounded-full ${fullWidth ? "w-full" : ""}
      ${disabled && !loading ? "opacity-60 cursor-not-allowed" : ""}
      ${loading ? "cursor-wait" : ""}
      ${className ?? ""}
    `}>
      {loading && <Spinner />}
      {label}
      {iconUrl && !loading && (
        <img src={iconUrl} alt="iconurl" className="ml-2 w-5 shrink-0 rounded-full" />
      )}
    </button>
  </>
}

export default Button