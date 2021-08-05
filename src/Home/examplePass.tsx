import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

interface exampleInputProps {
  input1: string;
}

const Example = ({ input1 }: exampleInputProps) => {
  const [stateExample, setStateExample] = useState(3);

  useEffect(()=>{
      setStateExample(10)
  },[])
  return (
    <div>
      <Button variant="contained" color="secondary">
        Joe {input1}
      </Button>
      {[1,2,3,4,5].map((value)=>{
          return <p>{value}</p>
      })}
      <p>{stateExample}</p>
    </div>
  );
};

export default Example;
