import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const localStorageEffect =
  (key: string) =>
  //@ts-ignore
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    //@ts-ignore
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
  effects: [localStorageEffect("categories")],
});

export const categoriesSelector = selector({
  key: "categoriesSelector",
  get: ({ get }) => {
    return get(categoriesState);
  },
  set: ({ set }, newValue) => {
    set(categoriesState, newValue);
  },
});

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects: [localStorageEffect("toDos")],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
  set: ({ set }, newValue) => {
    set(toDoState, newValue);
  },
});
