import { useState } from "react";

const TodoPrompt = ({ addItems }) => {
    let [item, updateItem] = useState('');
    function itemAdd(evt) {
        evt.preventDefault();
        addItems(item);
        updateItem('');  //this cause double render error: at App and here
    }
    return (
        <div className="flex mb-3">
            <form onSubmit={itemAdd}>
                <input type="text" className="border rounded-md" onChange={(e) => updateItem(e.target.value)} value={item} autoFocus />
                <button className="ml-2 px-2 border border-indigo-500 bg-indigo-300 rounded-xl" >Add</button>
            </form>
        </div>
    );
};

export default TodoPrompt;