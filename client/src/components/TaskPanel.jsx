import React, { useEffect, useState } from 'react';
import TaskRow from './TaskRow';

const TaskPanel = () => {
    const [tasks, setTasks] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleSave = () => {
        alert("Saved");
        console.log("Saved", tasks);
    };

    const updateTask = (index, field, value) => {
        if (field === 'weight') return;
        
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = {
                ...updatedTasks[index],
                [field]: value
            };
            return updatedTasks;
        });
    };

    const updateSubTask = (parentTaskIndex, subIndex, field, value) => {
        setTasks(prevTasks => {
            const newTasks = [...prevTasks];
            const parentTask = newTasks[parentTaskIndex];
            
            const updatedSubs = parentTask.subs.map((sub, i) =>
                i === subIndex ? { ...sub, [field]: value } : sub
            );
            
            const newParentWeight = updatedSubs.reduce((sum, sub) => sum + Number(sub.weight || 0), 0);
            
            newTasks[parentTaskIndex] = {
                ...parentTask,
                subs: updatedSubs,
                weight: newParentWeight
            };
            
            return newTasks;
        });
    };

    const addTask = () => {
        setTasks([...tasks, { name: '', unit: '', weight: 0, subs: [] }]);
    };

    const addSubTask = (parentTaskIndex) => {
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[parentTaskIndex] = {
                ...updatedTasks[parentTaskIndex],
                subs: [...updatedTasks[parentTaskIndex].subs, { name: '', unit: '', weight: 0 }]
            };
            return updatedTasks;
        });
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const deleteSubTask = (parentTaskIndex, subIndex) => {
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            const parentTask = updatedTasks[parentTaskIndex];
            
            // Filter out the subtask to be deleted
            const newSubs = parentTask.subs.filter((_, i) => i !== subIndex);
            
            // Calculate new parent weight
            const newParentWeight = newSubs.reduce((sum, sub) => sum + Number(sub.weight || 0), 0);
            
            updatedTasks[parentTaskIndex] = {
                ...parentTask,
                subs: newSubs,
                weight: newParentWeight
            };
            
            return updatedTasks;
        });
    };

    const totalWeight = tasks.reduce((sum, task) =>
        sum + Number(task.weight || 0), 0);

    useEffect(() => {
        setIsDisabled(totalWeight !== 100);
    }, [totalWeight]);

    return (
        <div className='flex flex-col p-3 text-black'>
            <div className='flex items-center justify-between font-semibold p-2 border-b border-b-gray-200 bg-violet-800 rounded-md text-white'>
                <h1 className='text-xl'>Task Panel</h1>
                <div className='flex items-center justify-between space-x-3'>
                    <div className='font-semibold w-46'>
                        Total Completion: <span className='p-1 bg-black text-white rounded'>{totalWeight}%</span>
                    </div>

                    <button
                        onClick={addTask}
                        className='bg-violet-50 text-black p-3 rounded-lg cursor-pointer hover:bg-violet-200 transition'
                    >
                        + Add Task
                    </button>

                    <button
                        disabled={isDisabled}
                        onClick={handleSave}
                        className={`text-white p-3 rounded-lg cursor-pointer transition ${
                            isDisabled ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-500'
                        }`}
                    >
                        Save
                    </button>
                </div>
            </div>

            {tasks.map((task, index) => (
                <div key={index} className="mb-4 border-b border-b-gray-200">
                    <TaskRow
                        item={task}
                        onChange={(field, value) => updateTask(index, field, value)}
                        onDelete={() => deleteTask(index)}
                        isSubActivity={false}
                        isWeightEditable={false}
                    />

                    <div className="ml-8">
                        {task.subs.map((sub, j) => (
                            <TaskRow
                                key={j}
                                item={sub}
                                onChange={(field, value) => updateSubTask(index, j, field, value)}
                                onDelete={() => deleteSubTask(index, j)}
                                isSubActivity={true}
                                isWeightEditable={true}
                            />
                        ))}

                        <button
                            onClick={() => addSubTask(index)}
                            className='text-blue-600 hover:text-blue-800 mt-2'
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