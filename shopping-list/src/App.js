import { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./item";

import Logo from "./assets/images/logo.svg";

import { guidGenerator, readFromStorage, saveToStorage } from "./utils";
import welcomeImage from "./assets/images/welcomeImage.svg";

function App() {
  // Unecesary comments -1
  // all todos tasks
  const [todos, setTodos] = useState([]);

  // Bad variable name -1
  // is adding sounds like a tax calculation like adding a tip or tax after ordering food online
  // to show the form
  const [isAdding, setIsAdding] = useState(false);

  // single input for forms
  const [name, setName] = useState("");
  // .... // what "...." means
  const [price, setPrice] = useState("");
  const [sortedBy, setSortedBy] = useState("name");

  // show the accomplished tasks
  // there is a empty line between the comment and the variable

  const [showCompleted, setShowCompleted] = useState(false);

  // To pass the last value to the function
  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  // to show the form ....toggle
  const toggleShowForm = () => {
    setIsAdding((prev) => !prev);
  };

  const changeTodoState = (id, isDone) => {
    const todoItemIndex = todos.findIndex((item) => item.id === id);
    if (todoItemIndex !== -1) {
      const newTodos = [...todos];
      newTodos[todoItemIndex].isDone = isDone;
      setTodos(newTodos);
      saveToStorage(newTodos);
    }
  };

  // to prevent page refresh
  const onSubmit = (e) => {
    e.preventDefault();

    const newTodos = [
      ...todos,
      {
        id: guidGenerator(),
        name,
        price,
        isDone: false,
      },
    ];

    // to update the todos list
    setTodos(newTodos);
    saveToStorage(newTodos);

    setName("");
    setPrice("");
    setIsAdding(false);
  };

  // to call the todoes from local storage
  useEffect(() => {
    setTodos(readFromStorage());
  }, []);

  // [...todos]
  const todosToShow = []
    .concat(todos)
    .sort((a, b) => (a[sortedBy] > b[sortedBy] ? 1 : -1))
    .map((item) => {
      return !item.isDone && item;
    })
    .filter(Boolean);

  const doneTodos = []
    .concat(todos)
    .sort((a, b) => (a[sortedBy] > b[sortedBy] ? 1 : -1))
    .map((item) => item.isDone && item)
    .filter(Boolean);

  return (
    <div className="todo-app">
      <div className="logo-wrapper">
        <img src={Logo} className="logo" alt="logo" />
      </div>

      <div className="image">
        <img src={welcomeImage} className="image-wrapper" alt=" " />
      </div>

      <p className="message">
        welcome to IKEA's shopping list. Here you will be able to create a todo
        list for the furniture you want to purchase. To get started press the
        Add new item button and a popup will ask you the name and the price of
        the item you want to add. You can also add an image after the item is
        added by touching the camera Icon
      </p>
      <br></br>

      <div className="title">Shopping List</div>

      <div className="todo-sort">
        <div className="title">Sort by: </div>
        <div
          className={`item ${sortedBy === "name" && "active"}`}
          onClick={() => setSortedBy("name")}
        >
          Name
        </div>
        <div
          className={`item ${sortedBy === "price" && "active"}`}
          onClick={() => setSortedBy("price")}
        >
          Price
        </div>
      </div>

      <div className="todos">
        {todosToShow.map((item) => (
          <TodoItem
            item={item}
            key={item.id}
            changeTodoState={changeTodoState}
          />
        ))}
      </div>

      <button onClick={toggleShowForm} className="add-button">
        {!isAdding ? "Add Item" : "Cancel"}
      </button>

      {isAdding && (
        <form className="form" onSubmit={onSubmit}>
          <div className="form-item">
            <label htmlFor="name">Name </label>
            <input
              required
              id="name"
              value={name}
              onChange={(e) => {
                console.log(e);
                setName(e.target.value);
              }}
              placeholder="Enter Name"
            />
          </div>

          <div className="form-item">
            <label htmlFor="price">Price</label>
            <input
              required
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
            />
          </div>

          <div className="form-item">
            <button type="submit">Add</button>
          </div>
        </form>
      )}

      {doneTodos.length > 0 && (
        <div className="completed-todos">
          <div onClick={toggleShowCompleted} className="title">
            {showCompleted ? "Hide completed items" : "View completed items"}
          </div>
          {showCompleted &&
            doneTodos.map((item) => (
              <TodoItem
                item={item}
                key={item.id}
                changeTodoState={changeTodoState}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
