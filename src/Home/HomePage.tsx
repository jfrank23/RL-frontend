import { Button } from "@material-ui/core";
import Example from "./examplePass";

const Home = () => (
  <div>
    <h1>Home</h1>
    <Button variant="contained" color="primary">
      I am a button
    </Button>
    <Example input1="jordan"></Example>
  </div>
);

export default Home;
