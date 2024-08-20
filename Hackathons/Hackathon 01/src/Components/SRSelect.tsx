function SRSelect(props: any) {
    const { className, labelClass, label, value, onChange, id, disabled, options } = props
    return (
        <>
            <label className={`text-white mb-1 mt-3 fw-semibold formLabel ${labelClass}`} htmlFor={id}>{label}</label>
            <select disabled={disabled} onChange={onChange} required className={`textInputs customTextInputs ${className}`} value={value} id={id}>
                <option value="" className="bg-black" selected disabled>Select an option</option>
                {options.map((item: any, index: any) => (
                    <option className="bg-black" key={index} value={item.value || item}>{item.label || item}</option>
                ))}
            </select>
        </>
    )
}

export default SRSelect