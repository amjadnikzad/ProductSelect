import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type RawNode = {
  id: string;
  name: string;
  type: 'category' | 'product';
  children?: RawNode[];
};

type TreeNode = {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: TreeNode[];
  selectable: boolean;
  myData: any;
};

export function adaptTreeData(
  rawNodes: RawNode[],
  addNodePosition: 'start' | 'end' = 'end'
): TreeNode[] {
  const process = (nodes: RawNode[], parentType?: string): TreeNode[] => {
    return nodes.map((node) => {
      const children = node.children ? process(node.children, node.type) : [];

      const addNode: TreeNode = {
        title: `+ Add ${node.type === 'category' ? 'Product' : 'Item'}`,
        key: `add-${node.id}`,
        selectable: true,
        isLeaf: true,
        myData: {
          isAdd: true,
          parentId: node.id,
          newType: node.type === 'category' ? 'product' : 'unknown',
        },
      };

      const finalChildren =
        addNodePosition === 'start'
          ? [addNode, ...children]
          : [...children, addNode];

      return {
        title: node.name,
        key: node.id,
        isLeaf: node.type === 'product',
        selectable: true,
        children: node.type === 'category' ? finalChildren : undefined,
        myData: {
          id: node.id,
          name: node.name,
          type: node.type,
          parentId: null,
        },
      };
    });
  };

  return process(rawNodes);
}
