import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useForm } from "react-hook-form";

interface ICategory {
  category: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const onSubmit = (data: ICategory) => {
    setCategories((prev) => [...prev, data.category]);
    setValue("category", "");
  };
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("category")} placeholder="Add Catetories" />
        <button>Add</button>
      </form>
      <hr />
      <select onInput={onInput}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
