import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Home() {
  const [items, setItems] = useState([
    { id: '1', order: '1' },
    { id: '2', order: '2' },
    { id: '3', order: '3' },
    { id: '4', order: '4' },
    { id: '5', order: '5' },

  ]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);
  };

  return (
    <>
      <div className="container text-center d-flex justify-content-center align-items-center mt-2 flex-column">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((val, index) => (
                  <Draggable key={val.id} draggableId={val.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card style={{ width: '18rem', margin: '0.5rem auto' }}>
                          <Card.Body>
                            <Card.Title>order-{val.id}</Card.Title>
                            <Card.Text>{val.order}</Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
