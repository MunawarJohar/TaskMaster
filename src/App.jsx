import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState('all'); // "completed" or "pending"

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => { 
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    setCategory(t.category);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {  
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, category, isCompleted: false}]);
    setTodo("");
    setCategory("");
    saveToLS();
  };

  const handleChange = (e) => { 
    setTodo(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCheckbox = (e) => { 
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const handleClearAll = () => {
    setTodos([]);
    saveToLS();
  };

  const sortedTodos = () => {
    if (sortBy === 'completed') {
      return todos.filter(todo => todo.isCompleted);
    } else if (sortBy === 'pending') {
      return todos.filter(todo => !todo.isCompleted);
    }
    return todos;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 bg-violet-100 rounded-xl min-h-[80vh]">
        <h1 className='text-3xl font-bold text-center text-violet-900'>TaskMaster - Manage Your Todos Effectively</h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a New Todo</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <input 
              onChange={handleChange} 
              value={todo} 
              type="text" 
              className='w-full sm:w-2/3 rounded-full px-5 py-2 shadow-md' 
              placeholder="Enter a task..." 
            />
            <select 
              onChange={handleCategoryChange}
              value={category}
              className="sm:w-1/4 px-4 py-2 rounded-md shadow-md"
            >
              <option value="">Category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
            <button 
              onClick={handleAdd} 
              disabled={todo.length <= 3} 
              className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input 
            className='my-4' 
            id='show' 
            onChange={toggleFinished} 
            type="checkbox" 
            checked={showFinished} 
          />
          <label className='mx-2' htmlFor="show">Show Finished</label>
        </div>

        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

        <h2 className='text-2xl font-bold'>Your Todos</h2>

        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <button 
              onClick={() => setSortBy('completed')}
              className="bg-violet-600 p-2 rounded-md text-white"
            >
              Show Completed
            </button>
            <button 
              onClick={() => setSortBy('pending')}
              className="bg-violet-600 p-2 rounded-md text-white"
            >
              Show Pending
            </button>
            <button 
              onClick={() => setSortBy('all')}
              className="bg-violet-600 p-2 rounded-md text-white"
            >
              Show All
            </button>
          </div>
          <button 
            onClick={handleClearAll} 
            className="bg-red-600 text-white p-2 rounded-md"
          >
            Clear All
          </button>
        </div>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {sortedTodos().map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between items-center my-3 p-4 shadow-lg rounded-md bg-white">
                <div className='flex gap-5'>
                  <input 
                    name={item.id} 
                    onChange={handleCheckbox} 
                    type="checkbox" 
                    checked={item.isCompleted} 
                  />
                  <div className={item.isCompleted ? "line-through text-gray-500" : ""}>
                    {item.todo} {item.category && <span className="text-sm text-gray-400">({item.category})</span>}
                  </div>
                </div>
                <div className="buttons flex gap-2">
                  <button 
                    onClick={() => handleEdit(item.id)} 
                    className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold text-white rounded-md'
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold text-white rounded-md'
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
