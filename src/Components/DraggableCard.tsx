import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled  from 'styled-components';

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props)=>
  props.isDragging?"skyblue": props.theme.cardColor};
  box-shadow:${props=>props.isDragging?"0px 2px 5px rgba(0,0,0,0.5)":"none"};
`;
interface IDraggableCardProps{
    toDoId:number;
    toDoText:string;
    index:number;
}

function DraggableCard({toDoId,toDoText,index}:IDraggableCardProps){
    return(
        <Draggable draggableId={toDoId+""} index={index}>
        {/* dnd는 key와 draggableId가 같아야함 */}
        {(magic,snapShot) => (
          <Card
          isDragging={snapShot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {toDoText}
          </Card>
        )}
      </Draggable>
    )
}
export default React.memo(DraggableCard);