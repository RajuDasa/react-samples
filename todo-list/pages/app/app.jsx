import { useState } from "react";
import TodoItemList from "./todo-item-list";
import TodoPrompt from './todo-prompt.jsx';

export default function App() {
    const [items, updateItems] = useState([]);
    const [count, updateCount] = useState(0);

    function addItems(itemName) {
        const item = { check: false, text: itemName, id: count };
        updateCount(count + 1);  //async
        updateItems([...items, item]); //async
    }
    const updateItem = (item) => {
        //replace item in-place on copied array
        const idx = items.findIndex(i => i.id === item.id);
        const itms = items.toSpliced(idx, 1, item);
        updateItems(itms);
    };
    const removeItem = (item) => {
        const itms = items.filter(i => i.id !== item.id);
        updateItems(itms);
    };

    return (
        <>
            <div className="font-bold text-center mb-5"> TODO List</div>
            <TodoPrompt addItems={addItems} />
            <TodoItemList items={items} updateItem={updateItem} removeItem={removeItem} />

        </>
    )
}