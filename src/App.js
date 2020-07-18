import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from './firebase';
import firebase from 'firebase';

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Grid ,List, ListItem, ListItemText , IconButton ,ListItemSecondaryAction ,Modal ,  } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverRounded';
import Create from '@material-ui/icons/Create';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
}));



function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [todoId, setTodoId] = useState('')

  const [todos, setTodos] = useState([
    "Take dogs for walk",
    "Take the rabbish with you",
  ]);

  const [input, setInput] = useState("");
  const [updateText, setUpdateText] = useState('')
  

//Fetch the data from our firebase databse like this wish onSnapshot()

useEffect(()=>{
      db.collection("todo").orderBy('timestamp', 'desc').onSnapshot(snaphot => {
        setTodos(snaphot.docs.map(doc=> ( { id:doc.id, todo: doc.data().todo }) ))
      //  console.log(snaphot.docs.map(doc => doc.data()))
      })
}, [])

const handleOpen = (id) => {
  setOpen(true);
  setTodoId(id)
 
};

const handleClose = () => {
  setOpen(false);
};

  const addItem = (e) => {
    e.preventDefault();
    db.collection("todo").add({
      todo: input ,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  };

  const deleteTodo =(id)=>{
        db.collection('todo').doc(id).delete()
  }


const updatedTodo =() => {
  db.collection('todo').doc(todoId).set({todo: updateText}, {merge: true})
  setUpdateText("")
  setOpen(false)
}

  const body = (
    <div className="model">
    <h2>Update your Todo</h2>
      <TextField type="text"
     value={updateText}
     onChange={(e)=> {setUpdateText(e.target.value)}}
     /> 
     <Button
          onClick={updatedTodo}
          variant="contained"
          disabled={!updateText}
        >
          Update
        </Button>
    
    </div>
  );



  return (
    <div className="App">
  
      <h1>TODO APPLICATION</h1>
    <hr />
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          type="text"
          label="Add Item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          onClick={addItem}
          variant="contained"
          disabled={!input}
        >
          add
        </Button>
      </form>
      {todos.map((item) => {
        return (
          <Grid item xs={12} 
          container
          justify="center"
          alignItems="center"
          key={item.id}
        >
         <List >
            <ListItem  style={{marginRight:"90px"}}>
              <ListItemText
                primary={item.todo}
              />
           
            <ListItemSecondaryAction style={{marginRight:"30px"}}  >
                <IconButton edge="start" aria-label="delete"> 
                <Create type="button" onClick={()=>handleOpen(item.id)} />
                </IconButton>
              </ListItemSecondaryAction>
              <ListItemSecondaryAction onClick={()=>deleteTodo(item.id)}  >
                <IconButton edge="end" aria-label="delete"> 
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Modal
        open={open}
        onClose={handleClose}
        style={{background: "white" , opacity:"0.5"}}
      >
        {body}
      </Modal>
          </Grid>
        );
      })}
    
    <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#5000ca" fill-opacity="1" d="M0,160L60,144C120,128,240,96,360,90.7C480,85,600,107,720,144C840,181,960,235,1080,240C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
</svg>
    </div>
  );
}

export default App;
