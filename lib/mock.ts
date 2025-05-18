export type TreeNode = {
    key: string;
    title: string;
    children?: TreeNode[];
  };
  
export const fetchProductTree = async (): Promise<TreeNode[]> => {
    // Simulate delay
    await new Promise((r) => setTimeout(r, 500));
  
    return [
      {
        key: "electronics",
        title: "Electronics",
        children: [
          {
            key: "electronics-phones",
            title: "Mobile Phones",
            children: [
              { key: "electronics-phones-iphone", title: "iPhone 14" },
              { key: "electronics-phones-samsung", title: "Samsung Galaxy S24" }
            ]
          },
          {
            key: "electronics-laptops",
            title: "Laptops",
            children: [
              { key: "electronics-laptops-macbook", title: "MacBook Pro 16\"" },
              { key: "electronics-laptops-dell", title: "Dell XPS 13" }
            ]
          }
        ]
      },
      {
        key: "clothing",
        title: "Clothing",
        children: [
          {
            key: "clothing-men",
            title: "Men",
            children: [
              { key: "clothing-men-shirts", title: "Shirts" },
              { key: "clothing-men-jeans", title: "Jeans" }
            ]
          },
          {
            key: "clothing-women",
            title: "Women",
            children: [
              { key: "clothing-women-dresses", title: "Dresses" },
              { key: "clothing-women-skirts", title: "Skirts" }
            ]
          }
        ]
      }
    ];
  };
  