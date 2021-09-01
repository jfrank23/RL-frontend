import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const t = "test";

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Win Percentage
        </Typography>
        <Typography variant="body2" component="p">
          1. Lionel Messi: 64.13%
        </Typography>
        <Typography variant="body2" component="p">
          2. Rafael Nadal: 55.00%
        </Typography>
        <Typography variant="body2" component="p">
          3. Andy Murray: 34.77%
        </Typography>
      </CardContent>
    </Card>
  );
}
