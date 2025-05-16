"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

// Node types
const NODE_TYPES = {
  CATEGORY: "category",
  PRODUCT: "product",
  VARIANT: "variant",
  PROMOTION: "promotion",
}

// Initial data structure
const initialTreeData = [
  {
    key: "1",
    title: "Electronics",
    type: NODE_TYPES.CATEGORY,
    children: [
      {
        key: "1-1",
        title: "Smartphones",
        type: NODE_TYPES.CATEGORY,
        children: [
          {
            key: "1-1-1",
            title: "iPhone 14",
            type: NODE_TYPES.PRODUCT,
            price: 999,
            stock: 50,
            description: "Latest iPhone model",
            children: [
              {
                key: "1-1-1-1",
                title: "128GB Black",
                type: NODE_TYPES.VARIANT,
                sku: "IP14-128-BLK",
                price: 999,
                stock: 20,
              },
              {
                key: "1-1-1-2",
                title: "256GB Black",
                type: NODE_TYPES.VARIANT,
                sku: "IP14-256-BLK",
                price: 1099,
                stock: 15,
              },
              {
                key: "1-1-1-3",
                title: "128GB White",
                type: NODE_TYPES.VARIANT,
                sku: "IP14-128-WHT",
                price: 999,
                stock: 15,
              },
              {
                key: "1-1-1-add",
                title: "+ Add Variant",
                isAddNode: true,
                parentKey: "1-1-1",
                parentType: NODE_TYPES.PRODUCT,
              },
            ],
          },
          {
            key: "1-1-2",
            title: "Samsung Galaxy S23",
            type: NODE_TYPES.PRODUCT,
            price: 899,
            stock: 45,
            description: "Latest Samsung flagship",
            children: [
              {
                key: "1-1-2-1",
                title: "128GB Black",
                type: NODE_TYPES.VARIANT,
                sku: "SGS23-128-BLK",
                price: 899,
                stock: 25,
              },
              {
                key: "1-1-2-add",
                title: "+ Add Variant",
                isAddNode: true,
                parentKey: "1-1-2",
                parentType: NODE_TYPES.PRODUCT,
              },
            ],
          },
          {
            key: "1-1-add",
            title: "+ Add Product",
            isAddNode: true,
            parentKey: "1-1",
            parentType: NODE_TYPES.CATEGORY,
          },
        ],
      },
      {
        key: "1-2",
        title: "Laptops",
        type: NODE_TYPES.CATEGORY,
        children: [
          {
            key: "1-2-1",
            title: "MacBook Pro",
            type: NODE_TYPES.PRODUCT,
            price: 1299,
            stock: 30,
            description: "Powerful laptop for professionals",
            children: [
              {
                key: "1-2-1-add",
                title: "+ Add Variant",
                isAddNode: true,
                parentKey: "1-2-1",
                parentType: NODE_TYPES.PRODUCT,
              },
            ],
          },
          {
            key: "1-2-add",
            title: "+ Add Product",
            isAddNode: true,
            parentKey: "1-2",
            parentType: NODE_TYPES.CATEGORY,
          },
        ],
      },
      {
        key: "1-add",
        title: "+ Add Category",
        isAddNode: true,
        parentKey: "1",
        parentType: NODE_TYPES.CATEGORY,
      },
    ],
  },
  {
    key: "2",
    title: "Clothing",
    type: NODE_TYPES.CATEGORY,
    children: [
      {
        key: "2-add",
        title: "+ Add Category",
        isAddNode: true,
        parentKey: "2",
        parentType: NODE_TYPES.CATEGORY,
      },
    ],
  },
  {
    key: "3",
    title: "Summer Sale",
    type: NODE_TYPES.PROMOTION,
    discount: 20,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    isActive: true,
    children: [
      {
        key: "3-add",
        title: "+ Add Promotion",
        isAddNode: true,
        parentKey: "3",
        parentType: NODE_TYPES.PROMOTION,
      },
    ],
  },
  {
    key: "add-root",
    title: "+ Add Root Node",
    isAddNode: true,
    parentKey: null,
    parentType: null,
  },
]

// Form field types for different node types
const formFields = {
  [NODE_TYPES.CATEGORY]: [
    { name: "title", label: "Category Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  [NODE_TYPES.PRODUCT]: [
    { name: "title", label: "Product Name", type: "text" },
    { name: "price", label: "Base Price", type: "number" },
    { name: "stock", label: "Stock", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  [NODE_TYPES.VARIANT]: [
    { name: "title", label: "Variant Name", type: "text" },
    { name: "sku", label: "SKU", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "stock", label: "Stock", type: "number" },
  ],
  [NODE_TYPES.PROMOTION]: [
    { name: "title", label: "Promotion Name", type: "text" },
    { name: "discount", label: "Discount %", type: "number" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "isActive", label: "Active", type: "checkbox" },
  ],
}

// Icons for different node types (using emoji as placeholders)
const nodeIcons = {
  [NODE_TYPES.CATEGORY]: "📁",
  [NODE_TYPES.PRODUCT]: "🛒",
  [NODE_TYPES.VARIANT]: "🏷️",
  [NODE_TYPES.PROMOTION]: "%",
}

const EcommerceTreeManager = () => {
  const [treeData, setTreeData] = useState(initialTreeData)
  const [selectedNode, setSelectedNode] = useState(null)
  const [editFormData, setEditFormData] = useState({})
  const [addFormData, setAddFormData] = useState({})
  const [addNodeType, setAddNodeType] = useState(NODE_TYPES.CATEGORY)
  const [addNodeParent, setAddNodeParent] = useState(null)
  const [expandedKeys, setExpandedKeys] = useState(["1"])
  const [successMessage, setSuccessMessage] = useState("")

  // Reset forms when selected node changes
  useEffect(() => {
    if (selectedNode && !selectedNode.isAddNode) {
      setEditFormData(selectedNode)
    } else {
      setEditFormData({})
    }
  }, [selectedNode])

  // Handle node selection
  const handleSelect = (node) => {
    if (node.isAddNode) {
      // If it's an add node, prepare the add form
      setAddNodeParent(node.parentKey)
      setAddNodeType(getChildType(node.parentType))
      setAddFormData({})
      setSelectedNode(null)
    } else {
      // Regular node selection
      setSelectedNode(node)
    }
  }

  // Determine child type based on parent type
  const getChildType = (parentType) => {
    if (parentType === NODE_TYPES.CATEGORY) return NODE_TYPES.CATEGORY
    if (parentType === NODE_TYPES.PRODUCT) return NODE_TYPES.VARIANT
    if (parentType === NODE_TYPES.PROMOTION) return NODE_TYPES.PROMOTION
    return NODE_TYPES.CATEGORY // Default for root level
  }

  // Handle form submission for editing a node
  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!selectedNode) return

    // Update the node in the tree
    const updateNode = (nodes) => {
      return nodes.map((node) => {
        if (node.key === selectedNode.key) {
          return { ...node, ...editFormData }
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) }
        }
        return node
      })
    }

    setTreeData(updateNode(treeData))
    showSuccessMessage("Node updated successfully")
  }

  // Handle form submission for adding a new node
  const handleAddSubmit = (e) => {
    e.preventDefault()
    const newNodeKey = uuidv4()
    const newNode = {
      key: newNodeKey,
      ...addFormData,
      type: addNodeType,
      children: [],
    }

    // If it's a node type that can have children, add an "add node" as its child
    if ([NODE_TYPES.CATEGORY, NODE_TYPES.PRODUCT, NODE_TYPES.PROMOTION].includes(addNodeType)) {
      const childType = getChildType(addNodeType)
      newNode.children.push({
        key: `${newNodeKey}-add`,
        title: `+ Add ${childType.charAt(0).toUpperCase() + childType.slice(1)}`,
        isAddNode: true,
        parentKey: newNodeKey,
        parentType: addNodeType,
      })
    }

    // Add the new node to the tree
    const addNodeToTree = (nodes) => {
      return nodes.map((node) => {
        if (addNodeParent === null && node.key === "add-root") {
          // Adding at root level
          return node
        }

        if (node.key === addNodeParent) {
          // Add as child of the parent node
          const updatedChildren = [...node.children]
          // Insert before the "add" node
          const addNodeIndex = updatedChildren.findIndex((child) => child.isAddNode)
          updatedChildren.splice(addNodeIndex, 0, newNode)
          return { ...node, children: updatedChildren }
        }

        if (node.children) {
          return { ...node, children: addNodeToTree(node.children) }
        }

        return node
      })
    }

    // If adding at root level
    if (addNodeParent === null) {
      const updatedTreeData = [...treeData]
      const rootAddNodeIndex = updatedTreeData.findIndex((node) => node.key === "add-root")
      updatedTreeData.splice(rootAddNodeIndex, 0, newNode)
      setTreeData(updatedTreeData)
    } else {
      setTreeData(addNodeToTree(treeData))
    }

    // Expand the parent node
    if (addNodeParent && !expandedKeys.includes(addNodeParent)) {
      setExpandedKeys([...expandedKeys, addNodeParent])
    }

    setAddFormData({})
    showSuccessMessage("Node added successfully")
  }

  // Handle node deletion
  const handleDeleteNode = () => {
    if (!selectedNode) return

    // Remove the node from the tree
    const removeNode = (nodes) => {
      return nodes
        .filter((node) => node.key !== selectedNode.key)
        .map((node) => {
          if (node.children) {
            return { ...node, children: removeNode(node.children) }
          }
          return node
        })
    }

    setTreeData(removeNode(treeData))
    setSelectedNode(null)
    showSuccessMessage("Node deleted successfully")
  }

  // Show success message
  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Handle form input changes for edit form
  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditFormData({
      ...editFormData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle form input changes for add form
  const handleAddFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setAddFormData({
      ...addFormData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Toggle node expansion
  const toggleNodeExpansion = (key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(expandedKeys.filter((k) => k !== key))
    } else {
      setExpandedKeys([...expandedKeys, key])
    }
  }

  // Render tree node
  const renderTreeNode = (node, level = 0) => {
    const isExpanded = expandedKeys.includes(node.key)
    const hasChildren = node.children && node.children.length > 0
    const icon = node.isAddNode ? "+" : nodeIcons[node.type] || "📁"
    const paddingLeft = level * 20 + "px"

    return (
      <div key={node.key}>
        <div
          className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${
            selectedNode && selectedNode.key === node.key ? "bg-blue-100" : ""
          }`}
          style={{ paddingLeft }}
          onClick={() => handleSelect(node)}
        >
          {hasChildren && (
            <span
              className="mr-2 inline-block w-4 text-center"
              onClick={(e) => {
                e.stopPropagation()
                toggleNodeExpansion(node.key)
              }}
            >
              {isExpanded ? "▼" : "►"}
            </span>
          )}
          {!hasChildren && <span className="mr-2 inline-block w-4"></span>}
          <span className="mr-2">{icon}</span>
          <span>{node.title}</span>
        </div>
        {hasChildren && isExpanded && <div>{node.children.map((child) => renderTreeNode(child, level + 1))}</div>}
      </div>
    )
  }

  // Render form fields
  const renderFormFields = (fields, formData, handleChange) => {
    return fields.map((field) => (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
        {field.type === "textarea" ? (
          <textarea
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          />
        ) : field.type === "number" ? (
          <input
            type="number"
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            min={0}
          />
        ) : field.type === "date" ? (
          <input
            type="date"
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        ) : field.type === "checkbox" ? (
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] || false}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
        ) : (
          <input
            type="text"
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        )}
      </div>
    ))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Success Message */}
      {successMessage && (
        <div className="col-span-12 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {successMessage}
        </div>
      )}

      {/* Add Node Form */}
      <div className="col-span-12 md:col-span-3">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add New Node</h2>
          <form onSubmit={handleAddSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Node Type</label>
              <select
                value={addNodeType}
                onChange={(e) => setAddNodeType(e.target.value)}
                disabled={addNodeParent !== null}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value={NODE_TYPES.CATEGORY}>Category</option>
                <option value={NODE_TYPES.PRODUCT}>Product</option>
                <option value={NODE_TYPES.VARIANT}>Variant</option>
                <option value={NODE_TYPES.PROMOTION}>Promotion</option>
              </select>
            </div>

            {renderFormFields(formFields[addNodeType] || [], addFormData, handleAddFormChange)}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Add Node
            </button>
          </form>
        </div>
      </div>

      {/* Tree View */}
      <div className="col-span-12 md:col-span-4">
        <div className="bg-white p-4 rounded-lg shadow h-full">
          <h2 className="text-lg font-semibold mb-4">E-commerce Data Structure</h2>
          <div className="border border-gray-200 rounded-md">{treeData.map((node) => renderTreeNode(node))}</div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="col-span-12 md:col-span-5">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {selectedNode
                ? `Edit ${selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}`
                : "Select a node to edit"}
            </h2>
            {selectedNode && (
              <button
                onClick={handleDeleteNode}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md"
              >
                Delete
              </button>
            )}
          </div>

          {selectedNode ? (
            <form onSubmit={handleEditSubmit}>
              {renderFormFields(formFields[selectedNode.type] || [], editFormData, handleEditFormChange)}

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              >
                Update
              </button>
            </form>
          ) : (
            <div className="text-center p-6 text-gray-500">Select a node from the tree to edit its properties</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EcommerceTreeManager
