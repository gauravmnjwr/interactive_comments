import { faker } from '@faker-js/faker';

const useNode = () => {
    const insertNode = function (tree, commentId, item) {
      
      if (tree.id === commentId) {
        tree.items.push({
          id: new Date().getTime(),
          name: item,
          items: [],
          image:faker.internet.avatar(),
          username: faker.internet.userName(),
          status:0,
        });
  
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((ob) => {
        return insertNode(ob, commentId, item);
      });
  
      return { ...tree, items: latestNode };
    };
  
    const editNode = (tree, commentId, value) => {
      if (tree.id === commentId) {
        tree.name = value;
        return tree;
      }
  
      tree.items.map((ob) => {
        return editNode(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree, id) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };

    const LikesNode  = (tree,commentId,typeofStatus) =>{
      if (tree.id === commentId) {
        if(typeofStatus==='plus'){
          tree.status=tree.status+1;
        }
        else{
          tree.status=tree.status-1;
        }
        return tree;
      }
      tree.items.map((ob) => {
        return LikesNode(ob, commentId, typeofStatus);
      });
  
      return { ...tree };
      

    }
  
    return { insertNode, editNode, deleteNode, LikesNode };
  };
  
  export default useNode;
  