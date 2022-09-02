import React ,{useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import img from '../image/user.jpg'
import axios from 'axios'
import './style.css';

const ListItem = ({  item, index }) => {
  const initialData = {
    title: item.title, 
    category: item.category, 
    dueDate: item.dueDate, 
    estimate: item.estimate, 
    importance: item.importance, 
    statusId: item.statusId, 
    userId: item.userId
  }
  const [formData, setFormData] = useState(initialData)
  const [showButton, setShowButton] = useState(false)


  const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target;
    setFormData({...formData, [name]:value})
    setShowButton(true)
  }

  const handleImprtance = (text) => {
    setFormData({...formData, importance: text})
    setShowButton(true)
    console.log(text)
  }

  const updateData = () => {
    axios
    .put(`https://localhost:7119/api/Item/${item.id}`, formData)
    .then(res => {
      console.log(res.data)
      alert("Data update is success")
    }).catch(err => console.log(err))
    console.log(formData)
    setShowButton(false)
  }

  return (
     <Draggable draggableId={item.id.toString()} index={index} key={item._id}>
      {(provided, snapshot) => {
        return (
          <div
            className="DragItem"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='item-title'>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                {showButton &&
                  <button onClick={() => updateData()} >Update Data</button>
                }
            </div>
            <div className='input-field'>
                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange}/>
            </div>
            <div className='input-field'>
                <label>Due Date</label>
                <input type="date" name="dueDate" value={formData.dueDate.substring(0,10)} onChange={handleChange}/>
            </div>
            <div className='input-field'>
                <label>Estimate</label>
                <input type="text" name="estimate" value={formData.estimate} onChange={handleChange}/>
            </div>
            <div className='input-field'>
                <label>Importance</label>
                <div className={'Importance Importance-'+formData.importance}>
                  {formData.importance}
                  <ul>
                    <li className='low' onClick={() => handleImprtance('Low')}>Low</li>
                    <li className='medium' onClick={() => handleImprtance('Medium')}>Medium</li>
                    <li className='high' onClick={() => handleImprtance('High')}>High</li>
                  </ul>
                </div>

            </div>
            
            {/* <div className="CardHeader">Obaida</div>
            <span>Content</span>
            <div className="CardFooter">
              <span>{item.title}</span>
              <div className='Author'>
                {item.id}
                <img className='Avatar' src={img} alt=''/>
              </div>
            </div> */}
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
