function SRInput(props: any) {
    const { type, className, placeholder, label, value, onChange, id, disabled } = props
    return (
        <>
            {type == "date" ? (
                <>
                    <label className="text-white mb-1 mt-3 fw-semibold formLabel" htmlFor={id}>{label}</label >
                    <input type="date" disabled={disabled} placeholder={placeholder} onChange={onChange} required className={`textInputs customTextInputs ${className}`} value={value} id={id} />
                </>
            ) : (
                <>
                    <label className="text-white mb-1 mt-3 fw-semibold formLabel" htmlFor={id}>{label}</label >
                    <input type={type || 'text'} disabled={disabled} placeholder={placeholder} onChange={onChange} required className={`textInputs customTextInputs ${className}`} value={value} id={id} />
                </>
            )
            }
        </>
    )
}

export default SRInput
