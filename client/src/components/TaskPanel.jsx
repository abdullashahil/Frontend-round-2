import React, { useEffect, useState } from 'react';
import TaskRow from './TaskRow';
import { Plus, Save, LoaderCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const TaskPanel = () => {
    const [tasks, setTasks] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            toast.success('Tasks saved successfully!');
            console.log('Saved tasks --', tasks);
            setIsLoading(false);
        }, 500);
    };

    const updateTask = (index, field, value) => {
        if (field === 'weight') return;

        setTasks(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const updateSubTask = (parentIndex, subIndex, field, value) => {
        setTasks(prev => {
            const updated = [...prev];
            const parent = updated[parentIndex];

            const newSubs = parent.subs.map((sub, i) =>
                i === subIndex ? { ...sub, [field]: value } : sub
            );

            const newWeight = newSubs.reduce((sum, sub) => sum + Number(sub.weight || 0), 0);

            updated[parentIndex] = {
                ...parent,
                subs: newSubs,
                weight: newWeight
            };

            return updated;
        });
    };

    const addTask = () => {
        const last = tasks[tasks.length - 1];
        if (last && (!last.name || last.name.trim() === '')) {
            toast.error('Please enter a name for the previous task before adding a new one.');
            return;
        }

        setTasks([...tasks, { name: '', unit: '', weight: 0, subs: [] }]);
        toast.success('New task added.');
    };

    const addSubTask = (parentIndex) => {
        setTasks(prev => {
            const updated = [...prev];
            const parent = updated[parentIndex];

            updated[parentIndex] = {
                ...parent,
                subs: [...parent.subs, { name: '', unit: '', weight: 0 }]
            };

            return updated;
        });
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
        toast.success('Task deleted.');
    };

    const deleteSubTask = (parentIndex, subIndex) => {
        setTasks(prev => {
            const updated = [...prev];
            const parent = updated[parentIndex];

            const newSubs = parent.subs.filter((_, i) => i !== subIndex);
            const newWeight = newSubs.reduce((sum, sub) => sum + Number(sub.weight || 0), 0);

            updated[parentIndex] = {
                ...parent,
                subs: newSubs,
                weight: newWeight
            };

            return updated;
        });
        toast.success('Sub-task deleted.');
    };

    const totalWeight = tasks.reduce((sum, task) => sum + Number(task.weight || 0), 0);

    useEffect(() => {
        setIsDisabled(totalWeight !== 100);
    }, [totalWeight]);

    return (
        <div className='p-4 text-black space-y-4'>
            <Toaster position="top-center" richColors />

            <div className='flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-md bg-violet-800 text-white'>
                <h1 className='text-xl font-bold mb-2 md:mb-0'>Task Panel</h1>
                <div className='flex flex-wrap items-center gap-3'>
                    <span className='bg-black text-white px-4 py-2 rounded text-sm'>
                        Total Completion: {totalWeight}%
                    </span>

                    <button
                        onClick={addTask}
                        className='flex items-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-violet-200 transition cursor-pointer'
                    >
                        <Plus size={18} /> Add Task
                    </button>

                    <button
                        disabled={isDisabled || isLoading}
                        onClick={handleSave}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                            isDisabled ? 'bg-gray-400 text-white' :
                            'bg-red-600 hover:bg-red-500 text-white cursor-pointer'
                        }`}
                    >
                        {isLoading ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {tasks.length === 0 && (
    <div className="flex items-center justify-center flex-col text-gray-500 mt-10">
        <Plus size={40} className="mb-2" />
        <p className="text-lg">No tasks added yet</p>
    </div>
)}

{tasks.map((task, index) => (
    <div key={index} className="mb-4 border-b pb-4">
        <TaskRow
            item={task}
            onChange={(field, value) => updateTask(index, field, value)}
            onDelete={() => deleteTask(index)}
            isWeightEditable={false}
        />

        <div className="ml-6 mt-2">
            {task.subs.map((sub, j) => (
                <TaskRow
                    key={j}
                    item={sub}
                    onChange={(field, value) => updateSubTask(index, j, field, value)}
                    onDelete={() => deleteSubTask(index, j)}
                    isWeightEditable={true}
                />
            ))}

            <button
                onClick={() => addSubTask(index)}
                className='text-blue-600 hover:bg-gray-100 p-2 rounded-md mt-2 text-sm cursor-pointer'
            >
                + Add Sub-Task
            </button>
        </div>
    </div>
))}

        </div>
    );
};

export default TaskPanel;
