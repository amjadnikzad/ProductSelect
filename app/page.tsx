import DynamicForm from "@/components/DynamicForm"
import TreeView from "@/components/tree"
import { TreeProvider } from "@/context/TreeContext"
import { adaptTreeData, RawNode } from "@/lib/utils";

const rawBackendData: RawNode[] = [
  {
    id: 'cat1',
    name: 'Electronics',
    type: 'category',
    children: [
      {
        id: 'prod1',
        name: 'Smartphone',
        type: 'product',
      },
      {
        id: 'prod2',
        name: 'iphone',
        type: 'product',
      },
      {
        id: 'prod3',
        name: 'samsung',
        type: 'product',
      },
    ],
  },
  {
    id: 'cat2',
    name: 'CLOTHING',
    type: 'category',
    children: [
      {
        id: 'prod4',
        name: 'HAT',
        type: 'product',
      },
      {
        id: 'prod5',
        name: 'SHIRT',
        type: 'product',
      },
      {
        id: 'prod6',
        name: 'SHOE',
        type: 'product',
      },
    ],
  },
];
const treeData = adaptTreeData(rawBackendData, 'end');

export default function Home() {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
  <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
    E-commerce Data Manager
  </h1>

  <div className="flex flex-col md:flex-row gap-6 w-full">
    <TreeProvider>
      {/* Tree View: narrower on desktop */}
      <div className="w-full md:flex-[1]">
        <TreeView
          treeData={treeData}
          className="w-full bg-white border rounded-md shadow-sm p-4"
        />
      </div>

      {/* Form View: wider on desktop */}
      <div className="w-full md:flex-[2] bg-gray-100 p-4 rounded-md shadow-sm">
        <DynamicForm className="bg-white p-6 rounded shadow w-full" />
      </div>
    </TreeProvider>
  </div>
</div>
  )
}
