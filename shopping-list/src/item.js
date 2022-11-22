// no need to import React, React is "global" and its available everywhere automatically
import React from "react";

// use a function instead of a constant, just like you did on App.js
const TodoItem = (props) => {
  const item = props.item;

  // good destructuring
  const { id, name, price, isDone } = item;

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        // you can skip passing the id, it does not affect the project.
        id={id}
        checked={isDone}
        // Format -1 you destructured id from item, yet you sue item.id
        onChange={(e) => props.changeTodoState(item.id, e.target.checked)}
      />
      <label htmlFor={id}>
        <div className={`${isDone && "done"}`}>
          <span>{name}, </span>
          <span>{price}</span>
        </div>
      </label>
    </div>
  );
};

export default TodoItem;
