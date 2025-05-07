import React from 'react';
import { Trash2 } from 'lucide-react';

const units = ['Modules', 'Piers'];

const TaskRow = ({ item, onChange, onDelete, isWeightEditable }) => {
    return (
        <div className='flex flex-wrap items-center gap-4 mt-2'>
            <input
                type='text'
                placeholder='Task'
                value={item.name}
                onChange={(e) => onChange('name', e.target.value)}
                className='border rounded-md p-2 flex-1 min-w-[150px]'
            />

            <select
                value={item.unit}
                onChange={(e) => onChange('unit', e.target.value)}
                className='border rounded-md bg-gray-100 p-2'
            >
                <option value="">Select Unit</option>
                {units.map(unit => (
                    <option key={unit}>{unit}</option>
                ))}
            </select>

            {/* Editable only if isWeightEditable is true */}
            <div className='flex items-center'>
                <input
                    type='number'
                    value={item.weight}
                    onChange={(e) => isWeightEditable && onChange('weight', e.target.value)}
                    className={`w-20 border rounded-md p-2 ${
                        isWeightEditable ? 'bg-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    readOnly={!isWeightEditable}
                />
                <span className='ml-1'>%</span>
            </div>

            <button
                onClick={onDelete}
                className='text-white bg-red-500 hover:bg-red-400 p-2 rounded-md transition cursor-pointer'
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default TaskRow;