interface Params {
    key: number;
    heading: any;
    todo_id: any;
    description: any;
    completed: any;
    mongoID: any;
    deleteTodo:any;
    completeTodo:any;
  }

export const Todo = ({todo_id, heading, description, mongoID, completed, deleteTodo, completeTodo}: Params) => {
    console.log(todo_id, heading, description, mongoID, completed)
    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
                {todo_id}
            </th>
            <td className={`px-6 py-4 ${completed?"line-through":""}`}>{heading}</td>
            <td className={`px-6 py-4 ${completed?"line-through":""}`}>{description} </td>
            <td className="px-6 py-4">{completed?"Completed":"Pending"} </td>
            <td className="px-6 py-4 flex gap-1">
                <button className="text-white bg-red-500 px-4 py-2 " onClick={() => deleteTodo(mongoID)}>Delete</button>
                {completed?"":<button className="text-white bg-green-500 px-4 py-2 " onClick={() => completeTodo(mongoID)}>Done</button>}
            </td>
        </tr>
    );
};
