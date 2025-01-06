import "./App.css";
import Person from "./Person";
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import { increment, decrement } from "./Store/slices/counter";
// let name: string = "Aryan";
// let age: number = 90;
// let isMarried: boolean = true;
// let ages: number[] = [12, 43, 23];
// let person: any = "any";

const App = () => {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div>
      count is {count}
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>

    // <Person name={"Aryan"} age={23} isMarrid={false}></Person>;
  );
};

export default App;
