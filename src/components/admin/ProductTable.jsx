import { Trash2, Edit, Star } from "lucide-react"; // Import the Star icon

const ProductTable = ({ products, onDelete, onEdit, loading, editingProduct, onUpdate, onSetFeatured }) => {

    const handleSaveEdit = () => {
        // Ensure editingProduct exists and has the necessary data
        if (editingProduct) {
            const updatedProduct = {
                id: editingProduct.id,
                name: editingProduct.name,
                price: editingProduct.price,
                image: editingProduct.image,
                description: editingProduct.description,
                category: editingProduct.category
            };

            // Call the onUpdate function to save changes to Firebase
            onUpdate(editingProduct.id, updatedProduct);
        }
    };

    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900">
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <td className="px-4 py-5 max-w-xs truncate">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-12 w-12">
                                        <img
                                            className="h-12 w-12 rounded-lg object-cover"
                                            src={product.image || 'https://via.placeholder.com/48'}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="ml-4 min-w-0">
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                            {editingProduct && editingProduct.id === product.id ? (
                                                <input
                                                    type="text"
                                                    value={editingProduct.name}
                                                    onChange={(e) => onEdit({ ...editingProduct, name: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                />
                                            ) : (
                                                product.name
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-5 whitespace-nowrap">
                                {editingProduct && editingProduct.id === product.id ? (
                                    <input
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) => onEdit({ ...editingProduct, price: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    `$${product.price.toFixed(2)}`
                                )}
                            </td>
                            <td className="px-4 py-5 whitespace-nowrap">
                                {editingProduct && editingProduct.id === product.id ? (
                                    <textarea
                                        value={editingProduct.description}
                                        onChange={(e) => onEdit({ ...editingProduct, description: e.target.value })}
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    product.description || 'No description'
                                )}
                            </td>
                            <td className="px-4 py-5 whitespace-nowrap text-right">
                                <div className="flex justify-end space-x-2">
                                    {editingProduct && editingProduct.id === product.id ? (
                                        <button
                                            onClick={handleSaveEdit}
                                            className="p-2 rounded-lg text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                                            title="Save"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2 rounded-lg text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onDelete(product.id)}
                                        className="p-2 rounded-lg text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onSetFeatured(product)} // Trigger the 'set featured' function
                                        className="p-2 rounded-lg text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 transition-colors"
                                        title="Mark as Featured"
                                    >
                                        <Star className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
