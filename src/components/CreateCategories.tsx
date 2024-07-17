import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoriesSelector } from "../atoms";

interface ICategory {
  category: string;
}

export default function CreateCategories() {
  const setCategories = useSetRecoilState(categoriesSelector);

  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const onSubmit = (data: ICategory) => {
    setCategories((prev) => [...prev, data.category]);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("category")} placeholder="Add Catetories" />
      <button>Add</button>
    </form>
  );
}
