function MySelect(props: any) {
    const { defaultValue, label, options, value, onChange, required } = props
    return (
        <>
            <div className="form-floating">
                <select className="form-select bg-bodyGray" required={required ? true : false} onChange={onChange} id="floatingSelect" value={value} aria-label="Floating label select example">
                <option className="text-secondary" defaultValue={''} value="">{defaultValue}</option>
                    {options.map((item: any) => <option key={item} className="text-secondary" value={item}>{item}</option>)}
                </select>
                <label htmlFor="floatingSelect">{label}</label>
            </div>
        </>
    )
}

export default MySelect
