import { useState } from 'react';
import './App.css';
import Comment from './components/Comment';
import useNode from "./hooks/useNode";


const comments = {
  id:1,
  items:[
  ],
  image:'',
  username:'',
  status:110,

}


const App = () => {
   
  const [commentsData, setCommentsData] = useState(comments);
  console.log(commentsData,"cd")

  const { insertNode, editNode, deleteNode, LikesNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    console.log(folderId);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  const handleStatusNode = (folderId,typeofStatus) =>{
    const finalStructure = LikesNode(commentsData, folderId,typeofStatus)
    const temp = { ...finalStructure };
    setCommentsData(temp);
  }

  return (
    <div className="App">
      <Comment
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
        handleStatusNode={handleStatusNode}
      />
    </div>
  );
};

export default App;
