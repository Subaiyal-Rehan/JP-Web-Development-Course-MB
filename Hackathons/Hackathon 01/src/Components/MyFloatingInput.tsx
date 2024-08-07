function MyFloatingInput(props:any) {
    const {type, className, label, value} = props
    return (
        <div className="form-floating mb-3">
            <input type={type || 'text'} className={`form-control ${className}`} value={value} id="floatingInput" />
            <label htmlFor="floatingInput">{label}</label>
        </div>
    )
}

export default MyFloatingInput
