'use client'
// components/TreeView.tsx
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useTreeContext } from '@/context/TreeContext';
import { adaptTreeData, RawNode } from '@/lib/utils';

interface TreeViewProps {
  treeData: DataNode[];
  className: string;
}


 const TreeView: React.FC<TreeViewProps> = ({ className,treeData}) => {

  const { setSelectedNode, setFormMode } = useTreeContext();

  const handleSelect = (_: React.Key[], { node }: any) => {
    if (node.isAddNode) {
      setFormMode('add');
      setSelectedNode(node.myData);
    } else {
      setFormMode('edit');
      setSelectedNode(node.myData);
    }
  };

  return (
    <Tree
      className={className}
      treeData={treeData}
      onSelect={handleSelect}
      defaultExpandAll
    />
  );
};
export default TreeView;