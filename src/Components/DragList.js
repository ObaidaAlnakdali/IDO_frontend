import React, { useEffect, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { Context } from '../context/Context'
import axios from "axios";
import './style.css';

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["To Do", "Doing", "Done"];

function DragList() {
  const datatest = {
    'To Do': [],
    'Doing': [],
    'Done': []
  }
  const [dataRes, setDataRes] = React.useState([]);
  const [elements, setElements] = React.useState(datatest);
  const id = localStorage.getItem('id')
  const { render, setRender, search } = useContext(Context)



  const getItems = () => {
    axios
    .get(`https://localhost:7119/api/Item/ItemsByUserId?UserId=${id}`)
    .then( async (res) => {
      setDataRes(res.data);
      res.data.map(async item => {
        if(item.status.name === 'To Do'){
          datatest["To Do"].push(item)
        } else if (item.status.name === 'Doing') {
          datatest["Doing"].push(item)
        } else {
          datatest["Done"].push(item)
        }
      })
      setElements(datatest);
      setTimeout(() => {
        setRender(!render)
      }, 1000);
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getItems()
  }, []);

useEffect(() => {
  let data = dataRes.filter(i => {
    return (
      i.title.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase()) ||
      i.estimate.toLowerCase().includes(search.toLowerCase()) ||
      i.dueDate.toLowerCase().includes(search.toLowerCase()) ||
      i.importance.toLowerCase().includes(search.toLowerCase())
    ) 
  })
  const datatest = {'To Do': [], 'Doing': [], 'Done': [] }
  data.map(async item => {
    if(item.status.name === 'To Do'){
      datatest["To Do"].push(item)
    } else if (item.status.name === 'Doing') {
      datatest["Doing"].push(item)
    } else {
      datatest["Done"].push(item)
    }
  })
  setElements(datatest);
}, [search]);

  const updateState = (item, source) => {
    let userId = localStorage.getItem('id')
    let statusId = source === 'To Do' ? 1 : source === 'Doing' ? 2 : 3;
    console.log(item)
    let form = {
      title: item.title,
      category: item.category,
      dueDate: item.dueDate,
      estimate: item.estimate,
      importance: item.importance,
      statusId: statusId,
      userId: userId
    }
    axios
    .put(`https://localhost:7119/api/Item/${item.id}`, form)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    updateState(removedElement, result.destination.droppableId)
    setElements(listCopy);
  };

  return (
    <div className="DragDropContextContainer">
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className='ListGrid'>
          {
            //Object.entries(lists).map(([listId, listKey]) => 
            lists.map((listKey) => 
            (
              <DraggableElement
                elements={elements[listKey]}
                key={listKey}
                prefix={listKey}
                droppableId={listKey}
              />
            )
            )
          }
        </div>
      </DragDropContext>
    </div>
  );
}

export default DragList;
