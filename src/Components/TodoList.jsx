import { useEffect, useState } from "react";

const TodoList = () => {
  const [todoArray, setTodoArray] = useState([]);
  const [strikeArray, setStrike] = useState([]);

  useEffect(() => {
    const todoList = localStorage.getItem("todoList");
    const strikelist = localStorage.getItem("strikeList");
    if (todoList === null && strikelist === null) {
      localStorage.setItem("todoList", JSON.stringify([]));
      localStorage.setItem("strikeList", JSON.stringify([]));
    } else {
      setTodoArray(JSON.parse(todoList));
      setStrike(JSON.parse(strikelist));
      console.log(todoList + " non-empty");
      console.log(strikelist);
    }
  }, []);

  return (
    <div className="overflow-y-auto">
      <div className="bg-blue-300 h-[400px] border-4 border-black rounded-2xl m-2 overflow-y-auto py-10 px-8">
        {todoArray.map((todo, index) => {
          return (
            <div
              key={index}
              className={
                strikeArray[index]
                  ? "flex flex-col items-left justify-around line-through font-bold"
                  : "flex flex-col items-left justify-around font-bold"
              }
            >
              <div
                className={
                  strikeArray[index]
                    ? "grid grid-rows-1 grid-cols-1 my-2"
                    : "grid grid-rows-1 grid-cols-[20px_1fr_20px] my-2"
                }
              >
                {strikeArray[index] ? null : (
                  <input
                    type="checkbox"
                    className="place-self-center"
                    onChange={(e) => {
                      if (e.target.checked) {
                        strikeArray[index] = true;
                        e.target.parentElement.style.textDecoration =
                          "line-through";
                        localStorage.setItem(
                          "strikeList",
                          JSON.stringify(strikeArray)
                        );
                      }
                    }}
                  />
                )}
                <div>
                  <p className="text-center w-full">{todo}</p>
                </div>
                <div>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <button
          className="w-[50vw] bg-blue-500 text-white p-2 rounded text-sm my-2 border-black border-2"
          onClick={() => {
            const newTodo = prompt("Enter new task:");
            if (newTodo.length !== 0) {
              setTodoArray([...todoArray, newTodo]);
              setStrike([...strikeArray, false]);
              localStorage.setItem(
                "todoList",
                JSON.stringify([...todoArray, newTodo])
              );
              localStorage.setItem(
                "strikeList",
                JSON.stringify([...strikeArray, false])
              );
            }
          }}
        >
          Add To My List
        </button>
        <button
          type="reset"
          className="w-[50vw] bg-blue-500 text-white p-2 rounded text-sm border-black border-2"
          onClick={() => {
            const confirmClear = window.confirm(
              "Are you sure you want to clear the list?"
            );
            if (confirmClear) {
              setTodoArray([]);
              setStrike([]);
              localStorage.removeItem("todoList");
              localStorage.removeItem("strikeList");
            } else {
              alert("List not cleared");
            }
          }}
        >
          Clear List
        </button>
      </div>
    </div>
  );
};

export default TodoList;
