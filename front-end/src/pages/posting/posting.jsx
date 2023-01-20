import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName,changeAge } from "./store";

function Cart() {
  const state = useSelector((state) => {
    return state
  })
  // console.log(a);
  const dispatch = useDispatch()

  return (
    <div>
      {state.user.name} {state.user.age}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.jang.map((ele, i) => (
            <tr key={i}>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeName())
                    dispatch(changeAge())
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
