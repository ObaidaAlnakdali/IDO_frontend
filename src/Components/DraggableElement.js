import React, { useContext } from 'react'
import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import todo from '../image/ToDoIcon.svg'
import doing from '../image/DoingIcon.svg'
import done from '../image/DoneIcon.svg'
import AddItemCard from './AddItemCard'
import { Context } from '../context/Context'
import './style.css';


function DraggableElement({ prefix, elements, droppableId }) {
  const { showAddCard } = useContext(Context)

  return (
    <div className="DroppableStyles">
      <div className="ColumnHeader">
        {
          prefix === "To Do" ? (
            <><img src={todo} alt="" /><label>{prefix}</label></>
          ) : prefix === "Doing" ? (
            <><img src={doing} alt="" /><label>{prefix}</label></>
          ) : (
            <><img src={done} alt="" /><label>{prefix}</label></>
          )
        }
      </div>
      <Droppable droppableId={`${droppableId}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {
              showAddCard &&
                prefix === 'To Do' ? <AddItemCard /> : null
            }
            {elements.map((item, index) =>
            (
              <ListItem key={item.id} item={item} index={index} listName={prefix} />
            )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default DraggableElement