import { Form, Select } from "antd";

const FormSelect = ({ label, name, required, onSearch, initialValue, options, search, rules = [], multi, tags, placeholder, onSelect, onChange, allowClear, disabled, title }) => {

    let initRules = [
        { required: required, message: `Please select ${label || 'a option'}` },
    ]

    return (
        <div className="error-select">
            <label className="form-label">{label} <span className='text-red-400 text-lg'>{required ? '*' : ''}</span></label>
            <Form.Item
                name={name}
                className="mb-3 border border-[#D1D5DB] py-[4px] rounded-[.375rem]"
                rules={[...initRules, ...rules]}
                initialValue={initialValue}
            >
                <Select
                    defaultValue={initialValue}
                    mode={multi ? 'multiple' : tags ? 'tags' : 'default'}
                    popupClassName={tags ? 'd-none' : ''}
                    allowClear={allowClear}
                    onSelect={onSelect}
                    disabled={disabled}
                    onChange={onChange}
                    placeholder={placeholder}
                    filterOption={(input, option) => {
                        if (typeof option.children === 'string') {
                            return option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        return 0
                    }}
                    showSearch={search}
                    title={title}
                    onSearch={onSearch}
                    variant="borderless"

                >
                    {options?.map((option, index) => (
                        <Select.Option key={index} disabled={option.disabled}
                            value={option?._id || option?.value}>{option.name || option?.label}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </div>
    )
}

export default FormSelect