import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
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

export interface StatCardPlayer {
  playerName: string;
  value: number;
}

interface StatCardInput {
  category: string;
  listItems: StatCardPlayer[];
}

const StatCard = ({ category, listItems }: StatCardInput) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">{category}</Typography>
        <ol>
          {listItems.map((item) => {
            return (
              <li>
                {item.playerName} - {item.value.toFixed(1)}
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
};
export default StatCard;
