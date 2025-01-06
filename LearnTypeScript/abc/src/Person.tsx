interface Props {
  name: string;
  age: number;
  isMarrid: boolean;
}

const Person = (props: Props) => {
  return (
    <div>
      name:{props.name}
      name:{props.age}
      name:{props.isMarrid}
    </div>
  );
};

export default Person;
