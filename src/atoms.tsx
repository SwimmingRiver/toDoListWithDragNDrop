import { atom } from "recoil";


export interface IToDo{
    id:number;
    text:string;
}

interface IToDoState{
    [key:string]:IToDo[];
}

export const toDostate = atom<IToDoState>({
    key:"toDo",
    default:{
        "To Do":[],
        Doing:[],
        Done:[],
    },
})
