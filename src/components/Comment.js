import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import  DownArrow  from "../assets/icon-minus.svg";
import  upArrow  from "../assets/icon-plus.svg";
import reply_img from '../assets/icon-reply.svg'
import delete_img from '../assets/icon-delete.svg'

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  handleStatusNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const [canDelete,setCanDelete] = useState(false);
  // const [currLikes,setCurrLikes] = useState(0);
  const [width,setWidth] = useState(window.innerWidth)
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  useEffect(()=>{
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  },[])

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleModal = () => {
    setCanDelete(true)
  };

  const handleDeleteModal= (status) =>{
    if(status){
      handleDeleteNode(comment.id);
    }
    setCanDelete(false);
  }

  const handleStatus = (status) =>{
    handleStatusNode(comment.id , status)

  }

  return (
    <div>
    {canDelete && <>
      <div id="delete_modal">
      <div id="modal_info">
      <h2>Delete Comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <span>
        <button onClick={() => handleDeleteModal(false)}>NO, CANCEL</button>
        &nbsp;
        <button onClick={() => handleDeleteModal(true)} id="delete_button">YES, DELETE</button>
        </span>
      </div>
      </div>
    </>}
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type..."
            />

            <Action
              className="reply comment"
              type="COMMENT"
              handleClick={onAddComment}
            />
          </>
        ) : (
          <>
          <span id="user_details">
          {width>800 && 
          <div id="status_details">
            <div onClick={()=> handleStatus('plus')}><img src={upArrow} alt="" /></div>
            <div>{comment.status}</div>
            <div onClick={()=> handleStatus('minus')}><img src={DownArrow} alt=""/></div>
          </div>
          }
          {width<=800 && 
            <div id="status_detailsmobile">
            <div onClick={()=> handleStatus('plus')}><img src={upArrow} alt="" /></div>
            <div>{comment.status}</div>
            <div onClick={()=> handleStatus('minus')}><img src={DownArrow} alt=""/></div>
          </div>
          }
          
          <img src={comment.image} alt="" />
          <p>{comment.username}</p>
          </span>
            <span
              className="reply_input"
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              <span id="comment_details">
              {comment.name}
              </span>
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action

                    className="reply save_tag"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply cancel_tag"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  {width>800 && 
                  <>
                  <Action
                    className="reply reply_tag"
                    type={
                      <>
                        {expand ? (
                          <img src={reply_img} alt="" />
                        ) : (
                          <img src={reply_img} alt="" />
                        )}
                        &nbsp; REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply edit_tag"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="reply delete_tag"
                    type={
                      <>
                        <img src={delete_img} alt="" />
                        &nbsp; DELETE
                      </>
                    }
                    handleClick={handleModal}
                  />
                  </>
                  }
                  {width<=800 &&
                  <>
                  <Action
                    className="reply reply_tag_mobile"
                    type={
                      <>
                        {expand ? (
                          <img src={reply_img} alt="" />
                        ) : (
                          <img src={reply_img} alt="" />
                        )}
                        &nbsp; REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply edit_tag_mobile"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="reply delete_tag_mobile"
                    type={
                      <>
                        <img src={delete_img} alt="" />
                        &nbsp; DELETE
                      </>
                    }
                    handleClick={handleModal}
                  />
                  </>
                  }
                 
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply edit_reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply edit_cancel"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}
        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
              handleStatusNode={handleStatusNode}

              
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
