
const Select = ({ options, onSelect }: {
    onSelect: (value: string) => void,
    options: {
        key: string,
        value: string
    }[]
}) => {
    return (
        <select
            onChange={(e) => { onSelect(e.target.value) }}
            className='p-2 font-semibold hover:cursor:pointer'>
            {options.map(option => <option value={option.value}>{option.value}</option>
            )}

        </select>
    )
}

export default Select