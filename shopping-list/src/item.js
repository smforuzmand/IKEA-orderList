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
        id={id}
        checked={isDone}
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
