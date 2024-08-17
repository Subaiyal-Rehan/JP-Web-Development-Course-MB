function SRTextarea(props: any) {
    const { className, placeholder, label, value, onChange, id, disabled } = props
    return (
        <>
            <label className="text-white mb-1 mt-3 fw-semibold formLabel" htmlFor={id}>{label}</label>
            <textarea disabled={disabled} placeholder={placeholder} onChange={onChange} required className={`textInputs customTextInputs ${className}`} value={value} id={id}></textarea>
        </>
    )
}

export default SRTextarea