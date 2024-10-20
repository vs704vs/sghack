import React, { useState } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

interface Category {
  id: number;
  name: string;
  desc: string;
  owner: string;
  createdAt: string;
}

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (name: string, desc: string, owner: string) => Promise<void>;
  onUpdateCategory: (id: number, name: string, desc: string) => Promise<void>;
  onDeleteCategory: (id: number) => Promise<void>;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const { data: session, status } = useSession();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName) {
      const ownerMail = session?.user.name ?? "no owner";
      await onAddCategory(
        newCategoryName.trim(),
        newCategoryDesc.trim(),
        ownerMail
      );
      setNewCategoryName("");
      setIsAdding(false);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory && editingCategory.name) {
      await onUpdateCategory(editingCategory.id, editingCategory.name.trim(), editingCategory.desc.trim());
      setEditingCategory(null);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Events</h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <PlusIcon className="h-5 w-5 inline-block mr-2" />
              Add Event
            </button>
          )}
        </div>
        {isAdding && (
          <form
            onSubmit={handleAddCategory}
            className="mb-6 bg-indigo-50 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Event name"
                className="w-1/5 px-4 py-2 border border-indigo-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
              />
              <input
                type="text"
                value={newCategoryDesc}
                onChange={(e) => setNewCategoryDesc(e.target.value)}
                placeholder="Event description"
                className="w-4/5 px-4 py-2 border border-indigo-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-r-lg hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 ease-in-out"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        )}
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out"
            >
              {editingCategory && editingCategory.id === category.id ? (
                <form
                  onSubmit={handleUpdateCategory}
                  className="flex items-center p-4"
                >
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                    className="w-1/5 px-4 py-2 border border-indigo-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={editingCategory.desc}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        desc: e.target.value,
                      })
                    }
                    className="w-4/5 px-4 py-2 border border-indigo-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white rounded-r-lg hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 transition duration-300 ease-in-out"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-4">
                  <span className="text-lg text-gray-900 font-medium">
                    {category.name}
                    <div className="text-xs text-gray-600 me-4">
                      {category.desc}
                    </div>
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="p-2 text-stone-900 hover:text-indigo-800 focus:outline-none transition duration-300 ease-in-out"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDeleteCategory(category.id)}
                      className="p-2 text-stone-900 hover:text-indigo-800 focus:outline-none transition duration-300 ease-in-out"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryManager;
