import {DragDropContext, DropResult}from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDostate } from './atoms';
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap:10px ;
  width: 100%;
`;



function App() {
  const [toDos,setToDos] = useRecoilState(toDostate);
  const onDragEnd = (info:DropResult)=>{
    const {destination,draggableId,source}=info;
    if(!destination) return;
    if(destination?.droppableId === source.droppableId){   //같은 보드안에서 움직이는 경우
      setToDos((allBoards) =>{
      const boardCopy = [...allBoards[source.droppableId]];
      const taskObj = boardCopy[source.index];
      boardCopy.splice(source.index,1);
      boardCopy.splice(destination?.index,0,taskObj);
    
      return {
        ...allBoards,
        [source.droppableId]:boardCopy
      };

       }
      )
    }

    if(destination.droppableId !== source.droppableId){//다른 보드간에 이동할 경우
      setToDos((allBoards)=>{
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index,1);
        destinationBoard.splice(destination.index,0,taskObj);
        return{
          ...allBoards,
          [source.droppableId]:sourceBoard,
          [destination.droppableId]:destinationBoard,
       };
      });
    }
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
        {Object.keys(toDos).map((boardId)=> <Board boardId={boardId} key={boardId} toDos={toDos[boardId]}/>)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
