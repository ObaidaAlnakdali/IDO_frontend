import React, {useState, useContext} from 'react'
import { Context } from '../context/Context'
import axios from 'axios'

function AddItemCard() {
  const initialData = {title: '', category: '', dueDate:'', estimate:'', importance: 'Low'}
  const [formAdd, setFormAdd] = useState(initialData)
  const id = localStorage.getItem('id')
  const importances = ['Low', 'Medium', 'High']

  const { setShowAddCard, render, setRender } = useContext(Context)

   const selectImportance = (e) => {
    console.log(e.target.value)
    formAdd.importance = e.target.value;
   }

   const handleChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target;
    setFormAdd({...formAdd, [name]:value})
   }

   const cancelCard = () => {
    setShowAddCard(false)
   }

   const AddItem = () => {
    let form = {
      title: formAdd.title,
      category: formAdd.category,
      dueDate: formAdd.dueDate,
      estimate: formAdd.estimate,
      importance: formAdd.importance,
      statusId: 1,
      userId: id
    }
    axios
    .post(`https://localhost:7119/api/Item`, form)
    .then(res => {
      alert('Add item is success')
      setShowAddCard(false)
      setRender(!render)
    }).catch(err => console.log(err))
  }

  return (
    <div className="DragItem-Add">
      <div className='item-title'>
        <h3>Add Item</h3>
      </div>
      <div className='input-field'>
        <label>Title</label>
        <input type="text" name='title' value={formAdd.title} onChange={handleChange}/>
      </div>
      <div className='input-field'>
        <label>Category</label>
        <input type="text" name='category' value={formAdd.category} onChange={handleChange}/>
      </div>
      <div className='input-field'>
        <label>Due Date</label>
        <input type="date" name='dueDate' value={formAdd.dueDate} onChange={handleChange}/>
      </div>
      <div className='input-field'>
        <label>Estimate</label>
        <input type="text" name='estimate' value={formAdd.estimate} onChange={handleChange}/>
      </div>
      <div className='input-field'>
        <label>Importance</label>
        <select name="select" onChange={selectImportance} className='select '>
          {importances.map(function (item, i) {
            return (<option key={i} value={item} className={'option-'+ item}>{item}</option>);
          })}
        </select>
      </div>
      <div className='button-field'>
        <button className='add' onClick={() => AddItem()}>Add</button>
        <button className='cancel' onClick={() => cancelCard()}>cancel</button>
      </div>
    </div>
  )
}

export default AddItemCard