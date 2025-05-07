import React from 'react'

const units = ["Modules", "Piers"]

const TaskRow = ({ item, onChange, onDelete }) => {
    return (
        <div className='flex items-center justify-start space-x-5 mt-2'>
            <input type="text" placeholder='activity'
                value={item.name}
                onChange={(e) => onChange('name', e.target.value)}
                className='border rounded-md p-1 px-2'
            />

            <select value={item.unit} id="" onChange={(e) => onChange('unit', e.target.value)}
                className='border rounded-md bg-gray-100 p-1 px-2'>
                {units.map((unit) =>
                    <option key={unit} >{unit}</option>
                )}
            </select>

            <div>
                <input type="number"
                    value={item.weight}
                    onChange={(e) => onChange('weight', e.target.value)}
                    className='w-24 border rounded-md bg-gray-100 p-1 px-2 mr-1' />
                %
            </div>

            <button onClick={onDelete} className='bg-red-500 rounded-md p-1 px-2 text-white hover:bg-red-400 transition'>Delete</button>
        </div>
    )
}

export default TaskRow