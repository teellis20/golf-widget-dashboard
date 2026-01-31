'use client';
import { useState, useEffect } from "react";

export default function ManagementPanel({title, array}) {
    const titleSingular = title.slice(0, -1);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const [items, setItems] = useState(array || []);
    const [deleteSelected, setDeleteSelected] = useState(false);

    console.log('array prop:', array); 

    //Todo: Add call to backend when deleted or saving edits or adding new items
    // will need to have a prop from the main page to call
    useEffect(() => {
        setItems(array || []);
    }, [array]);

    const addNewItem = () => {
        setItems([...items, { label: '' }]);
        setEditingIndex(items.length);
    }

    const handleSave = (index) => {
        console.log('Saving item at index:', index, 'with value:', editingValue);
        if (editingValue.trim() === '') return;
        setItems( prevItems => {
            const newItems = [...prevItems];
            newItems[index] = { label: editingValue.trim() };
            return newItems;
        })
        setEditingIndex(null);
        setEditingValue('');
    }

    const handleEditCancel = (index) => {
        if (items[index].label === '') {
            setItems( prevItems => {
                const newItems = [...prevItems];
                newItems.splice(index, 1);
                return newItems;
            })
        }
        setEditingIndex(null);
        setEditingValue('');
    }

    const handleDelete = (index) => {
        setItems( prevItems => {
            const newItems = [...prevItems];
            newItems.splice(index, 1);
            return newItems;
        })
    }

    return (
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <h3 className="font-semibold mb-4">{title}</h3>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                        {editingIndex === index ? (
                            <input onChange={(e) => setEditingValue(e.target.value)} className=" border rounded-lg pl-2" defaultValue={item.label} />
                        ) : (
                            <span>{item.label}</span>
                        )}
                        {editingIndex === index ? (
                            <div className="flex gap-4">
                            <button className="text-sm text-red-700 hover:cursor-pointer" onClick={() => handleEditCancel(index)}>X</button>
                            <button className="text-sm text-green-700 hover:cursor-pointer" onClick={() => handleSave(index)}>Save</button>
                            </div>
                        ) : (
                            deleteSelected ? (
                                <button className="text-sm text-red-600 hover:cursor-pointer" onClick={() => handleDelete(index)}>Delete</button>
                            ) : (
                                <button className="text-sm text-blue-600 hover:cursor-pointer" onClick={() => setEditingIndex(index)}>Edit</button>
                            )

                            // <div className="flex gap-2">
                            //     <button className="text-sm text-blue-600" onClick={() => setEditingIndex(index)}>Edit</button>
                            //     <button className="text-sm text-red-600" onClick={() => handleDelete(index)}>Delete</button>
                            // </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="mt-auto flex align-bottom justify-between">
                <button onClick={addNewItem} className="mt-4 text-sm text-green-700 hover:cursor-pointer">+ Add {titleSingular}</button>
                {deleteSelected ? (
                    <button onClick={() => setDeleteSelected(false)} className="mt-4 text-sm text-blue-700 hover:cursor-pointer">Cancel</button>
                ) : (
                    <button onClick={() => setDeleteSelected(true)} className="mt-4 text-sm text-red-700 hover:cursor-pointer">- Delete {titleSingular}</button>
                )}
            </div>
        </div>
    )
}