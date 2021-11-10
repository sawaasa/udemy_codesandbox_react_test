import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./component/InputTodo";
import { IncompleteTodos } from "./component/IncompleteTodos";
import { CompleteTodos } from "./component/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [inCompTodos, setInCompToDos] = useState(["あああ", "いいい"]);
  const [compTodos, setCompToDos] = useState(["ううう"]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...inCompTodos, todoText];
    setInCompToDos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...inCompTodos];
    newTodos.splice(index, 1);
    setInCompToDos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompTodos = [...inCompTodos];
    newIncompTodos.splice(index, 1);
    const newCompTodos = [...compTodos, inCompTodos[index]];
    setInCompToDos(newIncompTodos);
    setCompToDos(newCompTodos);
  };
  const onClickBack = (index) => {
    const newCompTodos = [...compTodos];
    newCompTodos.splice(index, 1);
    const newIncompTodos = [...inCompTodos, compTodos[index]];
    setCompToDos(newCompTodos);
    setInCompToDos(newIncompTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={inCompTodos.length >= 5}
      />
      {inCompTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodo5個まで</p>
      )}
      <IncompleteTodos
        todos={inCompTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={compTodos} onClickBack={onClickBack} />
    </>
  );
};
