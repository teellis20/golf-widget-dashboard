'use client';
import { useState, useEffect, useRef } from "react";
import { Check } from 'lucide-react';

export default function ManagementPanel({
  title,
  array,
  allowDefault = false,
  defaultItemId = null,
  onSave
}) {
  const titleSingular = title.slice(0, -1);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [items, setItems] = useState(array || []);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [selectedDefaultId, setSelectedDefaultId] = useState(defaultItemId);
  const [hasChanges, setHasChanges] = useState(false);

  const initialArrayRef = useRef(array);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initialArrayRef.current = array;
    setItems(array || []);
    setSelectedDefaultId(defaultItemId);
  }, [array, defaultItemId])

  useEffect(() => {

    if (JSON.stringify(items) !== JSON.stringify(initialArrayRef.current)) {
        return setHasChanges(true);
    } 

    if (allowDefault && defaultItemId !== selectedDefaultId) {
        return setHasChanges(true);
    }
    
    else {
        setHasChanges(false);
    }
  }, [items, selectedDefaultId, defaultItemId])

  const addNewItem = () => {
    setItems([...items, { label: '' }]);
    setEditingIndex(items.length);
  };

  const handleSaveEdit = (index) => {
    if (editingValue.trim() === '') return;

    setItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], label: editingValue.trim() };
      return updated;
    });

    setEditingIndex(null);
    setEditingValue('');
  };

  const handleEditCancel = (index) => {
    if (items[index].label === '') {
      setItems(prev => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    }
    setEditingIndex(null);
    setEditingValue('');
  };

  const handleDelete = (index) => {
    setItems(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSaveAll = () => {
    if (!onSave) return;
    setLoading(true);

    const defaultIdToSend = items.find(item => item.id === selectedDefaultId);

    const payload = {
      items,
      defaultId: allowDefault && selectedDefaultId !== null
        ? defaultIdToSend ? defaultIdToSend.id : null
        : null
    };

    console.log('Payload being sent to onSave: ', payload);

    onSave(payload);
    setHasChanges(false);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
      <h3 className="font-semibold mb-4">{title}</h3>

      <div className="mb-2 grid grid-cols-[80px_1fr] text-xs text-gray-400 uppercase tracking-wide">
        {allowDefault && <span>Default</span>}
        {/* <span>{title.slice(0, -1)}</span> */}
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              {/* Default Selector Column */}
                {allowDefault && Boolean(item.id) &&(
                <div>
                    <button
                    onClick={() => {
                        setSelectedDefaultId(item.id);
                    }}
                    className={`w-5 h-5 rounded border flex items-center justify-center
                        ${selectedDefaultId === item.id
                        ? "bg-black border-black"
                        : "border-gray-400"
                        }`}
                    >
                    {selectedDefaultId === item.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                    </button>
                </div>
                )}

              {editingIndex === index ? (
                <input
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="border rounded-lg pl-2"
                  defaultValue={item.label}
                />
              ) : (
                <span>
                  {item.label}
                  {allowDefault && selectedDefaultId === item.id && (
                    <span className="text-xs text-gray-400 ml-2">
                      (Default)
                    </span>
                  )}
                </span>
              )}
            </div>

            {editingIndex === index ? (
              <div className="flex gap-4">
                <button
                  className="text-sm text-red-700"
                  onClick={() => handleEditCancel(index)}
                >
                  X
                </button>
                <button
                  className="text-sm text-green-700"
                  onClick={() => handleSaveEdit(index)}
                >
                  <Check className='w-4 h-4 stroke-3' />
                </button>
              </div>
            ) : deleteSelected ? (
              <button
                className="text-sm text-red-600"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            ) : (
              <button
                className="text-sm text-blue-600"
                onClick={() => setEditingIndex(index)}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 space-y-4">
        <div className="flex justify-between">
          <button
            onClick={addNewItem}
            className="text-sm text-green-700"
          >
            + Add {titleSingular}
          </button>

          {deleteSelected ? (
            <button
              onClick={() => setDeleteSelected(false)}
              className="text-sm text-blue-700"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => setDeleteSelected(true)}
              className="text-sm text-red-700"
            >
              - Delete {titleSingular}
            </button>
          )}
        </div>

        {allowDefault && selectedDefaultId !== null && (
            <button
                onClick={() => {
                setSelectedDefaultId(null);
                }}
                className="text-xs text-gray-500 hover:text-black"
            >
                Clear Default
            </button>
        )}

        {hasChanges && (
          <button
            onClick={handleSaveAll}
            className="w-full bg-black text-white py-2 rounded-lg hover:cursor-pointer"
          >
            {!loading ? 'Save Changes' : 'Saving...'}
          </button>
        )}
      </div>
    </div>
  );
}