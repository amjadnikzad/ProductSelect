'use client'

// context/TreeContext.tsx
import { adaptTreeData, RawNode } from '@/lib/utils';
import React, { createContext, useContext, useState } from 'react';

interface NodeData {
  isAdd?: boolean;
  type?: string;
  parentId?: string;
  id?: string;
  name?: string;
}

interface TreeContextProps {
  selectedNode: NodeData | null;
  formMode: 'add' | 'edit';
  setSelectedNode: (node: NodeData) => void;
  setFormMode: (mode: 'add' | 'edit') => void;
}

const TreeContext = createContext<TreeContextProps | null>(null);

export const useTreeContext = () => useContext(TreeContext)!;


export const TreeProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('edit');

  return (
    <TreeContext.Provider
      value={{ selectedNode, setSelectedNode, formMode, setFormMode }}
    >
      {children}
    </TreeContext.Provider>
  );
};
