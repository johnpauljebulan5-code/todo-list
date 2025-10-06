import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  const handleAddTodo = () => {
    if (headingInput.trim() !== '') {
      setTodos([...todos, { heading: headingInput, lists: [] }]);
      setHeadingInput('');
    }
  };

  const handleDeleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
  };

  const handleAddList = (index) => {
    const newTodos = [...todos]; // Create a copy of the todos array
    newTodos[index].lists = [...newTodos[index].lists, listInputs[index] || '']; // Add the list item to the correct todo
    setTodos(newTodos); // Update the todos state
    setListInputs({ ...listInputs, [index]: '' }); // Clear the specific input
  };

  return (
    <div className="todo-app-wrapper">
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e) => setHeadingInput(e.target.value)}
          />
          <button className="add-list-button" onClick={handleAddTodo}>
            Add Heading
          </button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
          <div key={index} className="todo-card">
            <div className="heading_todo">
              <h3>{todo.heading}</h3>
              <button
                className="delete-button-heading"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete Heading
              </button>
            </div>
            <div className="add_list">
              {/* Input field for adding a new item under a specific heading */}
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''} // Use the value from listInputs array based on the current heading index
                onChange={(e) => handleListInputChange(index, e.target.value)}
              />
              {/* Button to add the list item to the corresponding heading */}
              <button className="add-list-button" onClick={() => handleAddList(index)}>
                Add List
              </button>
            </div>
            <ul>
              {/* Iterate over each list item inside the current todo */}
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className="todo_inside_list">
                  {/* Display the text content of the list item */}
                  <p>{list}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;

