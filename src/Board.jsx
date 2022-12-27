import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useSnackbar } from "notistack";
const Board = () => {
  const [gameName, setGameName] = useState("");
  const [gamePoint, setGamePoint] = useState(101);
  const [startForm, setStartForm] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [playerData, setPlayerData] = useState({});
  const [playerId, setPlayerId] = useState("");
  const [remainingPoint, setRemainingPoint] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);
  const [playerPoint, setPlayerPoint] = useState();
  const [gameNameError, setGameNameError] = useState(false);
  const [playersError, setplayersError] = useState(false);
  const [gameTable, setGameTable] = useState({
    gameName: "",
    gamePoint: 101,
    players: [
      // {
      //   id: "asdfas",
      //   name: "Player 1",
      //   points: [15, 35],
      // },
      // {
      //   id: "erwwer",
      //   name: "Player 2",
      //   points: [10, 20],
      // },
    ],
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };
  const handleChange = (event) => {
    setPlayerId(event.target.value);
    let newplayerData = gameTable?.players?.find(
      (res) => res.id === event.target.value
    );

    myRemaningPoint(newplayerData.points);
    console.log("newplayerData", newplayerData);
    console.log("playerData.id", playerData.id);

    setPlayerData(newplayerData);
  };
  const addPlayer = () => {
    if (playerName.trim().length > 0) {
      gameTable.players.push({
        id: uuidv4(),
        name: playerName.trim(),
        points: [],
      });
      setRefresh(!refresh);
      setPlayerName("");
    }
  };
  const addPoint = () => {
    console.log("addPoint");
    console.log("remainingPoint", remainingPoint);
    if (remainingPoint < parseInt(playerPoint)) {
      return handleSnakbarOpen(
        "your point is bigger than remaining point",
        "error"
      );
    }
    if (playerPoint.length > 0) {
      playerData.points.push(parseInt(playerPoint));
      myRemaningPoint(playerData.points);
      console.log("...playerData.points", ...playerData.points);
      // add in gametable players point
      gameTable.players?.map((item, i) => {
        if (item.id === playerData.id) {
          item.points = [...playerData.points];
        }
      });
      setRefresh(!refresh);
      setPlayerPoint("");
    }
  };
  const deletePoint = (point, indexNo) => {
    console.log("point", point, "ïndex", indexNo);

    let newPoints = playerData.points.filter((item, i) => i !== indexNo);
    setPlayerData({ ...playerData, points: newPoints });
    myRemaningPoint(newPoints);
    console.log("newPoints", newPoints);
    console.log("...playerData.points", ...playerData.points);

    gameTable.players?.map((item, i) => {
      if (item.id === playerData.id) {
        item.points = newPoints;
      }
    });
    setRefresh(!refresh);
    setPlayerPoint("");
  };
  const deletePlayer = (point, indexNo) => {
    console.log("point", point, "ïndex", indexNo);

    let newPlayers = gameTable.players.filter((item, i) => i !== indexNo);
    setGameTable({ ...gameTable, players: newPlayers });

    setRefresh(!refresh);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const startGame = () => {
    if (gameName.trim().length < 1) {
      return setGameNameError(true);
    }
    if (gameTable?.players.length < 1) {
      return setplayersError(true);
    }

    let newGame = { ...gameTable, gameName, gamePoint };
    setGameTable(newGame);
    setStartForm(false);
    // =========================================

    let newplayerData = gameTable?.players[0];
    setPlayerId(newplayerData.id);

    myRemaningPoint(newplayerData.points);
    console.log("newplayerData", newplayerData);
    console.log("playerData.id", playerData.id);

    setPlayerData(newplayerData);
  };
  const myRemaningPoint = (points) => {
    console.log("points", points);
    let myPoint = 0;
    points?.map((item) => {
      myPoint = myPoint + item;
    });
    setTotalPoint(myPoint);
    let remainingPoints = gameTable?.gamePoint - myPoint;
    console.log("remainingPoints", remainingPoints);
    setRemainingPoint(remainingPoints);
    // return remainingPoints;
  };

  const check = () => {
    console.log("gameTable", gameTable);
  };
  return (
    <div>
      {startForm ? (
        <div
          id="start_form"
          style={{
            padding: "40px",
            background: "#fff",
            marginTop: "30px",
            borderRadius: "8px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <h2 style={{ marginTop: 0 }} onClick={check}>
            Dart
          </h2>
          {gameNameError && (
            <p style={{ color: "red", marginTop: 0 }}>Please enter game name</p>
          )}

          <TextField
            style={{ marginBottom: "20px" }}
            id="outlined-basic"
            label="Game Name"
            variant="outlined"
            //   size="small"
            fullWidth
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <TextField
            style={{ marginBottom: "20px" }}
            id="outlined-basic"
            type="number"
            label="Game Point"
            variant="outlined"
            //   size="small"
            fullWidth
            value={gamePoint}
            onChange={(e) => setGamePoint(e.target.value)}
          />
          {playersError && (
            <p style={{ color: "red", marginTop: 0 }}>Please add player name</p>
          )}

          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Player Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="success"
                    // style={{ background: "green" }}
                    aria-label="toggle password visibility"
                    onClick={addPlayer}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <AddIcon />
                  </Button>
                </InputAdornment>
              }
              label="Player Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </FormControl>
          {/* <ul>
            {gameTable?.players?.map((item, i) => (
              <li key={i}>{item.name}</li>
            ))}
          </ul> */}
          {gameTable?.players.length > 0 && (
            <h3 style={{ marginTop: 0, color: "#9b9b9b" }} onClick={check}>
              Players
            </h3>
          )}

          <Table
            aria-label="simple table"
            size="small"
            style={{ border: "1px solid #ddd", marginBottom: "20px" }}
          >
            <TableBody>
              {gameTable?.players?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    {/* <IconButton>
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton> */}
                    <IconButton onClick={() => deletePlayer(item, i)}>
                      <DeleteOutlineOutlinedIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={startGame}
          >
            {" "}
            Start
          </Button>
        </div>
      ) : (
        <div
          id="start_form"
          style={{
            padding: "20px",
            background: "#fff",
            marginTop: "30px",
            borderRadius: "8px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <div style={{ textAlign: "right" }}>
            <Button
              disableElevation
              variant="outlined"
              color="secondary"
              onClick={() => {
                localStorage.setItem(
                  `${gameTable?.gameName}`,
                  JSON.stringify(gameTable)
                );
              }}
            >
              Save Score
            </Button>
            &nbsp; &nbsp;
            <Button
              disableElevation
              variant="outlined"
              // color="secondary"
              onClick={() => {
                let retrievedObject = localStorage.getItem(
                  `${gameTable?.gameName}`
                );

                console.log("retrievedObject: ", JSON.parse(retrievedObject));
              }}
            >
              Load Score
            </Button>
            <br />
            <br />
          </div>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <h3 style={{ marginTop: 0, color: "#1A5276" }} onClick={check}>
                {gameTable?.gameName}
              </h3>
            </Grid>
            <Grid item xs={6}>
              <h3
                style={{ marginTop: 0, textAlign: "right", color: "#9b9b9b" }}
                onClick={check}
              >
                Game Point : {gameTable?.gamePoint}
              </h3>
            </Grid>
          </Grid>

          {/* <FormControl fullWidth style={{ marginBottom: "20px" }}>
            <InputLabel id="demo-simple-select-label">Player</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={playerId}
              label="Player"
              onChange={handleChange}
            >
              {gameTable?.players?.map((item, i) => (
                <MenuItem key={i} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Players
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={playerId}
              onChange={handleChange}
            >
              {gameTable?.players?.map((item, i) => (
                <FormControlLabel
                  key={i}
                  value={item.id}
                  control={<Radio />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Grid container alignItems="center">
            <Grid item xs={6}>
              <h4 style={{ marginTop: 0, color: "#9b9b9b" }} onClick={check}>
                Total Point : {totalPoint}
              </h4>
            </Grid>
            <Grid item xs={6}>
              <h4
                style={{ marginTop: 0, textAlign: "right", color: "#9b9b9b" }}
                onClick={check}
              >
                Remaining Point :{" "}
                <span style={{ color: "#1A5276" }}>{remainingPoint}</span>
              </h4>
            </Grid>
          </Grid>

          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">Point</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="number"
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="success"
                    aria-label="toggle password visibility"
                    onClick={addPoint}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <AddIcon />
                  </Button>
                </InputAdornment>
              }
              label="Point"
              value={playerPoint}
              onChange={(e) => setPlayerPoint(e.target.value)}
            />
          </FormControl>
          <h3 style={{ marginTop: 0, color: "#9b9b9b" }} onClick={check}>
            Point Summary
          </h3>

          <Table
            aria-label="simple table"
            size="small"
            style={{ border: "1px solid #ddd" }}
          >
            <TableBody>
              {playerData?.points?.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {item}
                  </TableCell>
                  <TableCell align="right">
                    {/* <IconButton>
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton> */}
                    <IconButton onClick={() => deletePoint(item, i)}>
                      <DeleteOutlineOutlinedIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Board;
