import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Tooltip from '../Tooltip';

function AddTopicForm({setidAdded, isAdded}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [topicName, settopicName] = useState("");
  const [content, setcontent] = useState("");
  const [text , settext] = useState("");
  const [selectedTextList, setselectedTextList] = useState([]);
  const [topicDescription, setTopicDescription] = useState([])
  const [parentId, setparentId] = useState(null);
  const [data, setdata] = useState([]);
  const [finalList, setfinalList] = useState([]);
  const [color , setcolor] = useState("");

  const findPercentage = () => {
    console.log(finalList);
    console.log(selectedTextList);
    let sum = 0
    finalList.map(item => {
        sum += Number(item.point)
    });
    // percentage formula
    const percent = (sum / ((topicDescription.length - 1) * 4)) * 100
    // console.log(sum, topicDescription, percent);
    return percent.toFixed(2)
}



  async function handleAddTopicFrom(e) {
    e.preventDefault();
    try {
      const res = await Axios({
        url: 'http://localhost:5000/topic/addNewTopic',
        method: 'post',
        data: {
          TopicName: topicName,
          Content: content,
          user: user.id,
          percent : findPercentage()
        }
      });
      settopicName("");
      setcontent("");
      alert(res.data.message);
      setidAdded(!isAdded);
      setselectedTextList([]);
    } catch (error) {
      console.error(error);
    }
  }

  // handle assesment
  function handleSelect(e) {
     const selectedText = e.target.value.substring(e.target.selectionStart , e.target.selectionEnd);
     settext(selectedText);
  } 

  function addSelectedTextHanlder() {
    setselectedTextList([...selectedTextList , text]);
    settext("");
  }

  function handleTextUnderstading(e) {
     let id = e.target.getAttribute("idx");
     setparentId(id);
  }

  function clearBox() {
    setselectedTextList([]);
  }

  function removeTooltip(e) {
     setparentId(null);
  }

  function handleContentAdd(e) {
    let textArray = (e.target.value).split('-').join(', ').split('.').join(', ').split('{').join(', ').split('}').join(', ').split('(').join(', ').split(')').join(', ').split('[').join(', ').split(']').join(', ').split('/').join(', ').split(',')
    setTopicDescription(textArray)
    setcontent(e.target.value);
  }


 useEffect(() => {
     if(Object.keys(data).length > 0) {
         setfinalList(prev => {
           let idx = prev.findIndex(item => item.text === data.text);
           if(idx !== -1) {
             prev.splice(idx , 1 , {...data});
             console.log(prev);
             return prev;
           }
           else {
            return [...prev , data];
           }
         });
     }
  },[data]);
  
  useEffect(() => {
      console.log(finalList);
  },[finalList]);

  return (
    <div className="add-topic-sidebar">
      <h2 className="title">Write your content</h2>

      <form className="add-topic-form" onSubmit={handleAddTopicFrom}>
        <label>Title</label><br />
        <input type="text" placeholder="Enter Topic Name.." className="add-topic-input" value={topicName} onChange={e => settopicName(e.target.value)} required /><br />
        <label>Content</label><br />
        <textarea name="content" row="30" col="30" placeholder="Write you content...." className="add-topic-box" value={content} onChange={handleContentAdd} onSelect={handleSelect} required /><br />
        <div className="selected-text-box">
          {
            selectedTextList.length > 0 ? (
              <React.Fragment>
              {
                selectedTextList.map((text , idx) => {
                   return (
                     <div className="selected-text-container" onMouseLeave={removeTooltip}>
                        <Tooltip idx={idx} parentId={parentId} setdata={setdata} text={text} color={color} setcolor={setcolor}/>
                        <span className="selected-text"  idx={idx} onMouseEnter={handleTextUnderstading}>{text}{" "}</span>
                     </div>
                   )
                 })
                }
              </React.Fragment>
            ) : <p style={{textAlign: "center",color: 'darkgray' }}>Please select text from below</p>
          }
        </div>
        <button type="button" className="add-action-button" onClick={addSelectedTextHanlder}>Add Action</button>
        <button type="button" className="add-action-button" onClick={clearBox}>Clear</button>
        <button type="submit" className="add-topic-button">Add Topic</button>
      </form>
    </div>  
  )
}

export default AddTopicForm;