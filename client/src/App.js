import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from 'react-responsive';


const main_bg_color = "#A0C8C3"
const event_btn_color = "#ECEBE9"
const closed_btn_color = "#29354B"
const text_color = "#29354B"
const y_btn_color = "#ECEBE9"
const n_btn_color = "#262225"
const main_font = "Helvetica"


// const But = (props) => {
//   const { t } = props 
//   const [count, setCount] = React.useState(0);
//   const handleClick = () => {
//     setCount(count + 1);
//   };
//   return (
//     <div>
//       <button type="button" >{t}</button>
//     </div>
//   );
// };

// function Notification_button() {
//   return (
//     
//   );
// };

const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontFamily: main_font,
          fontWeight: 500,
          color: "#000000 !important",
          textIndent: "0.5em"
        },
      },
    },
  },
});

function Profile (props) {
  const {logout} = props
  const {userName}= props


  return (
 
          <div style={{float:"inline-end"}}>

              <Button
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               <Typography sx={{ color:event_btn_color, fontFamily:main_font}}>
                {userName}
              </Typography>
              </Button>
            <div className="dropdown-menu">
                <a  style={{ pointerEvents: 'none',textIndent: "1em"}}>
                  <Balance userName={userName}/>
                </a>
                <div className="dropdown-divider"></div>
                <a >
                  <ThemeProvider theme={theme}>
                    <Button aria-label="logOut" onClick={logout}>
                      Log out
                    </Button>
                    </ThemeProvider>
                </a>
              </div>

          </div>

  );
};


function Balance (props) {
  const {userName} = props
  const [bal,setBal] = React.useState(0)

  useEffect(()=>{
    fetch(`/api/balance?user_name=${encodeURIComponent(userName)}`, {
          method: "GET",  
        })
      .then((response) => response.json())
      .then((responseData) => {
        // JSON.stringify(responseData);
        setBal(responseData.balance);
      })
      .catch(error => console.warn(error))
    });

  return (
 
          <div >
            
              {bal} D

          </div>

  );
};

function Notification () {
  return (
    <div style={{float:"inline-start",fontFamily:main_font}}>
      {/* <IconButton 
      aria-label="notification" size="large" onClick={() => {
        alert('clicked');
      }}>
        <NotificationsIcon fontSize="inherit" />
      </IconButton> */}
      <Typography sx={{float:'inline-start', color:event_btn_color, fontFamily:main_font}}>
                STAVKI NA DEMISA
              </Typography>
    </div>
  );
};





function Header(props) {
  const {logout} = props
  const {userName} = props


  return (
    <div >
      
      
      <header className="App-header">

        <div >
            <Notification/>
        </div>
        <div >
          <Profile logout={logout} userName={userName}/>
            
        </div>
        

      
      </header>
    </div>
    
    
  );
};


const EventBlock = (props) =>{
  const {userName} = props
  const {eventName} = props
  const {coefy} = props
  const {coefn} = props
  const {isRes} = props
  const {id} = props
  const {bet} = props
  const {eventDescription} = props
  const {resposiblePerson} = props
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  if(!isMobile){
    return (
      <div>
  
        <Card variant="outlined" direction="row" sx={{ bgcolor: main_bg_color, color:"#e4def9",borderTopWidth:1,borderBottomWidth:1,borderRightWidth: 6,borderLeftWidth: 6,borderColor:closed_btn_color}}>
        <Stack direction="row" alignItems="center" maxWidth="100%">
        <Box sx={{ p: 6, maxWidth:"100%"}}>
        <Stack direction="column" spacing={5} alignItems="center">
            <Typography gutterBottom variant="h5" component="div" fontFamily={main_font} color={text_color}>
            {eventName}
            </Typography>
            <BetButtons coefn={coefn} coefy={coefy} isRes={isRes} />
          </Stack>
            
            
            
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem sx={{borderRightWidth: 2,borderColor:closed_btn_color }} />
        <Box sx={{ p: 4}}>
          <Stack direction="column" spacing={5}  alignItems="flex-start">
          <div style={{ maxWidth: '100%', overflow: 'hidden', wordBreak: 'break-all',textAlign:'left',fontFamily: main_font,color:text_color}}>
              {eventDescription}
          </div>
            
            <Responsibility isRes={isRes} resposiblePerson={resposiblePerson}  userName={userName} eid={id}/>
          </Stack>
        </Box>
        </Stack>
      </Card>
  
  
      </div>
    );
  }else{
    return (
      <div>
  
        <Card variant="outlined" direction="column" sx={{ bgcolor: main_bg_color, color:"#e4def9",borderTopWidth:1,borderBottomWidth:1,borderRightWidth: 6,borderLeftWidth: 6,borderColor:closed_btn_color}}>
        <Stack direction="column" alignItems="center" maxWidth="100%">
        <Box sx={{ p: 6, maxWidth:"100%"}}>
        <Stack direction="column" spacing={5} alignItems="center">
            <Typography gutterBottom variant="h5" component="div" fontFamily={main_font} color={text_color}>
            {eventName}
            </Typography>
            <BetButtons coefn={coefn} coefy={coefy} isRes={isRes} />
          </Stack>
            
            
            
        </Box>
        <Divider orientation="horizontal" variant="middle" flexItem sx={{borderRightWidth: 2,borderColor:closed_btn_color }} />
        <Box sx={{ p: 4}}>
          <Stack direction="column" spacing={5}  alignItems="flex-start">
          <div style={{ maxWidth: '100%', overflow: 'hidden', wordBreak: 'break-all',textAlign:'left',fontFamily: main_font,color:text_color}}>
          {eventDescription}
          </div>
            
            <Responsibility isRes={isRes} resposiblePerson={resposiblePerson}  userName={userName} eid={id}/>
          </Stack>
        </Box>
        </Stack>
      </Card>
  
  
      </div>
    );
  }
  
}


function BetButtons(props){

  const {coefy} = props
  const {coefn} = props
  const [open,SetOpen] = React.useState(false)
  const [res,setRes] = React.useState(null)
  function handleOpen(){
    SetOpen(true)
  }
  function handleClose(){
    SetOpen(false)
  }

return(
<Stack direction="row" spacing={5} alignItems="center" style={{ pointerEvents: 'none'}}>
<Button
    sx={{bgcolor:y_btn_color, color:text_color, fontFamily:main_font}} >
<Typography gutterBottom variant="h6" component="div" fontFamily={main_font} >
  {coefy}
</Typography>
</Button>
<Typography gutterBottom variant="h4" component="div" fontFamily={main_font} color={text_color}>
  -
</Typography>
<Button
    sx={{bgcolor:n_btn_color, color:text_color}} >
<Typography gutterBottom variant="h6" component="div" fontFamily={main_font} color={event_btn_color}>
  {coefn}
</Typography>
</Button>

</Stack>
)
      

}

function Responsibility(props){
  const [bal,setBal] = React.useState(0)
  const [open,SetOpen] = React.useState(false)
  const [openForm,SetOpenForm] = React.useState(false)
  const {resposiblePerson} = props
  const {userName} = props
  const [size,SetSize] = React.useState(0)
  const {eid} = props
  const [result,SetResult] = React.useState(0)

  function handleOpen(){
    SetOpen(true)
  }
  function handleClose(){
    SetOpen(false)
  }



  function handleSize(e){
    SetSize(e.target.value)
  }

  async function getvals(){
    return fetch(`/api/bet?user_name=${encodeURIComponent(userName)}&eid=${encodeURIComponent(eid)}&result=${encodeURIComponent(result)}&size=${encodeURIComponent(size)}`, {
        method: "POST",  
      })
    .then((response) => response.json())
    .then((responseData) => {
      JSON.stringify(responseData);
      
      return responseData;
    })
    .catch(error => console.warn(error));
  }

  async function closeev(res){
    return fetch(`/api/events?eid=${encodeURIComponent(eid)}&result=${encodeURIComponent(res)}`, {
        method: "PUT",  
      })
    .then((response) => response.json())
    .then((responseData) => {
      JSON.stringify(responseData);
      
      return responseData;
    })
    .catch(error => console.warn(error));
  }

  function closeEvent(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
   
    

    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    if (e.target.getAttribute('label') == "Ybut" ){
      closeev(0);
    }
    if (e.target.getAttribute('label') == "Nbut" ){
      closeev(1);
    }
    if (e.target.getAttribute('label') == "Cbut" ){
      closeev(2);
    }

    SetOpenForm(false);
  }

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    
    

    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    getvals();

    SetOpenForm(false);
  }

  function handleOpenFormY(){
    SetResult(0)
    SetOpenForm(true)
  }
  function handleOpenFormN(){
    SetResult(1)
    SetOpenForm(true)
  }
  function handleCloseForm(){
    SetOpenForm(false)
  }

  useEffect(()=>{
    fetch(`/api/balance?user_name=${encodeURIComponent(userName)}`, {
          method: "GET",  
        })
      .then((response) => response.json())
      .then((responseData) => {
        // JSON.stringify(responseData);
        setBal(responseData.balance);
      })
      .catch(error => console.warn(error))
    });



  const {isRes} = props
  if (isRes){
    if (open){
      return(
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2" fontWeight="bold" fontFamily={main_font} color={event_btn_color}  >
          Choose result
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button sx={{bgcolor:y_btn_color,color:text_color,fontFamily:main_font}}label="Ybut" size="small" onClick={closeEvent}>Y</Button>
            <Button sx={{bgcolor:n_btn_color,color:event_btn_color,fontFamily:main_font}}label="Nbut" size="small" onClick={closeEvent}>N</Button>
            <Button sx={{bgcolor:"grey",color:event_btn_color,fontFamily:main_font}}label="Cbut" size="small" onClick={closeEvent}>C</Button>
            <Button sx={{color:text_color,fontFamily:main_font}} label="X" size="small" onClick={handleClose}>X</Button>
          </Stack>
        </Box>
        
      )
    }else{
      return(
        <Button onClick={handleOpen} sx={{color:event_btn_color, fontFamily:main_font}}>
          Close event
        </Button>
        )
    }
    
    

  }else{
    if (open){
      return(
        <div>
          <Dialog  open={openForm} area-labelledby="form-dialog-title">
          <DialogTitle id="from-dialog-title">Make a bet</DialogTitle>
          <DialogContent> 
            <DialogContentText>Balance</DialogContentText> 
            {bal} D
            <DialogContentText></DialogContentText> 
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >

              <TextField
                margin="dense"
                id="description"
                label="Size"
                type="text"
                fullWidth
                multiline
                onChange={handleSize}
                />

              </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Ok</Button>
            <Button onClick={handleCloseForm}>Close</Button>
          </DialogActions>
        </Dialog>
        <Stack direction="row" spacing={2}>
              <Typography gutterBottom variant="body1" fontWeight="bold" fontFamily={main_font} color={text_color} >
              Responsible:
              </Typography>
              <Typography gutterBottom variant="body1" fontFamily={main_font}  color={text_color}>
              {resposiblePerson}
              </Typography>
            </Stack>
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2" fontWeight="bold" fontFamily={main_font} color={event_btn_color}  >
          Choose result
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button sx={{bgcolor:y_btn_color,color:text_color,fontFamily:main_font}}size="small" onClick={handleOpenFormY}>Y</Button>
            <Button sx={{bgcolor:n_btn_color,color:event_btn_color,fontFamily:main_font}} size="small" onClick={handleOpenFormN}>N</Button>
            <Button sx={{color:text_color,fontFamily:main_font}} label="X" size="small" onClick={handleClose}>X</Button>
          </Stack>
        </Box>
        </div>
      )
    }else{
        return (
          <div>
            <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={2}>
              <Typography gutterBottom variant="body1" fontWeight="bold" fontFamily={main_font} color={text_color} >
              Responsible:
              </Typography>
              <Typography gutterBottom variant="body1" fontFamily={main_font}  color={text_color}>
              {resposiblePerson}
              </Typography>
            </Stack>
            <Button onClick={handleOpen} sx={{ color:event_btn_color, fontFamily:main_font}}>
              Make a bet
            </Button>
            </Stack>
          </div>
        )
        
    }
   
  }

}

function AddEvent(props){
  const [open,SetOpen] = React.useState(false)
  const [name,SetName] = React.useState("")
  const [description,SetDescription] = React.useState("")
  const {userName} = props
  const [options,SetOptions] = React.useState([])
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  function handleClose(){
    SetOpen(false)
  }
  
  function handleOpen(){
    fetch(`/api/users?user_name=${encodeURIComponent(userName)}`, {
      method: "GET",  
    })
  .then((response) => response.json())
  .then((responseData) => {
    var arr = []
    {responseData.map((t)=>(
      arr.push(t.user_name)
    ))}
    SetOptions(arr)
  })
    SetOpen(true)
  }

  function handleName(e){
    SetName( e.target.value)
  }

  function handleDescription(e){
    SetDescription( e.target.value)
  }



  async function getvals(){
    return fetch(`/api/events?event_name=${encodeURIComponent(name)}&event_description=${encodeURIComponent(description)}&responsible=${encodeURIComponent(value)}`, {
        method: "POST",  
      })
    .then((response) => response.json())
    .then((responseData) => {
      JSON.stringify(responseData);
      console.log(responseData)
      return responseData;
    })
    .catch(error => console.warn(error));
  }

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    

    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    getvals();

    SetOpen(false);
  }

  

  return(
    <div>
      <Dialog  open={open} area-labelledby="form-dialog-title">
          <DialogTitle id="from-dialog-title" >Add Event</DialogTitle>
          <DialogContent> 
            <DialogContentText></DialogContentText> 
            <TextField
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
              onChange={handleName}
              />
            <DialogContentText></DialogContentText> 
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >

              <TextField
                margin="dense"
                id="description"
                label="description"
                type="text"
                fullWidth
                multiline
                onChange={handleDescription}
                />

              </Box>
              <br/>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{ width: 300 , }}
                renderInput={(params) => <TextField {...params} label="responsible" />}
              />
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleSubmit}>Add Event</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

    <Button onClick={handleOpen}  sx={{color:event_btn_color, fontFamily:main_font}}>
      Add Event
    </Button>
  </div>
  )
  
}





function App() {
  const [open,SetOpen] = React.useState(true)
  const [pass, SetPass] = React.useState(null);
  
const [userName, SetUserName] = React.useState(null);
const [events, setEvents] = React.useState([])
  // mes=null

  const test = [
    {eventName:"event1",coefy:"1.30",coefn:"2.70",isRes:true},
    {eventName:"event1",coefy:"1.30",coefn:"2.70",isRes:false},
    {eventName:"event1",coefy:"1.30",coefn:"2.70",isRes:true},
    {eventName:"event1",coefy:"1.30",coefn:"2.70",isRes:false},
    {eventName:"event1",coefy:"1.30",coefn:"2.70",isRes:true},
    {eventName:"event1",coefy:"1.30",coefn:"2.70",isRes:false},
  ]
  // function handleLogin (){
  //   SetOpen(false)
  // }
  // function getvals(){return fetch(`/api/login?password=${encodeURIComponent(pass)}`, {
  //   method: "GET",  
  // }).then((response) => response.json()).then(responseData=>{console.log(responseData);
  //   return responseData;});

  useEffect(()=>{
    
    });

    async function getvals(){
      return fetch(`/api/login?password=${encodeURIComponent(pass)}`, {
          method: "GET",  
        })
      .then((response) => response.json())
      .then((responseData) => {
        JSON.stringify(responseData);
        return responseData;
      })
      .catch(error => console.warn(error));
    }
    
  function handleLogin(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    

    // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    getvals().then(response => 
      {SetOpen(!response.signed);
        SetUserName(response.user_name);
        fetch(`/api/events?user_name=${encodeURIComponent(response.user_name)}`, {
          method: "GET",  
        })
      .then((response) => response.json())
      .then((responseData) => {
        // JSON.stringify(responseData);
        setEvents(responseData);
      })
      .catch(error => console.warn(error))
      });
      

  }
  
  function handleLogout(){
    SetOpen(true)
  }

  function handlePass(e){
    SetPass(e.target.value)
  }

 

  return (
    <div className="App">
      <Dialog hideBackdrop={false} open={open} area-labelledby="form-dialog-title">
        <DialogTitle id="from-dialog-title">Log in</DialogTitle>
        <DialogContent> 
          <DialogContentText></DialogContentText> 
          <TextField
            autoFocus
            margin="dense"
            id="pass"
            label="Password"
            type="password"
            onChange={handlePass}
            fullWidth/>
        </DialogContent>
        <DialogActions> <Button onClick={handleLogin}>Log in</Button></DialogActions>
      </Dialog>

    
      <div hidden={open}>
        
        <Header logout={handleLogout} userName={userName}/>
        <div className="App-add-event">
        <AddEvent userName={userName}/>
        </div>
        <div className="App-main">
          <Stack direction="column" spacing={3} alignItems="center">
            <div></div>
          {events.map((t)=>(
            <EventBlock eventName={t.sname} coefy={t.coefy} coefn={t.coefn} isRes={t.is_res} resposiblePerson={t.responsible_person} bet={t.bet} eventDescription={t.sdescription} id={t.id} userName={userName}/>
          ))}
          </Stack>
        </div>
      </div>
      
          
    </div>
  );
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {color: "red"};
  }
  render() {
    return (
    <div>
      {this.state.color}
      <App/>
    </div>
    );
    
  }
}

export default App;

// function App1() {
//   const [theme, setTheme] = React.useState(null);
//   const resetTheme = () => {
//     setTheme(null);
//   };
//   const divStyle = {
//     color: 'blue',
//   };
//   const themeClass = theme ? theme.toLowerCase() : "secondary";
//   return (
//     <>
//       <div style={divStyle}
//         className={`text-capitalize h1 mb-4 w-100 text-center text-${themeClass}`}
//       >
//         {`${theme || "Default"} Theme`}
//       </div>
//       <div className="btn-group">
//         <button className={`text-capitalize btn btn-${themeClass} btn-lg"`} type="button">
//           {theme ? theme + " theme" : "Choose Theme"}
//         </button>
//         <button
//           type="button"
//           className={`btn btn-lg btn-${themeClass} dropdown-toggle dropdown-toggle-split`}
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <span className="visually-hidden">Toggle Dropdown</span>
//         </button>
//         <div className="dropdown-menu">
//           <a className="dropdown-item" onClick={() => setTheme("dark")}>
//             Primary Theme
//           </a>
//           <a className="dropdown-item" onClick={() => setTheme("light")}>
//             Danger Theme
//           </a>
//           <a
//             className="dropdown-item" onClick={() => setTheme("success")}>
//             Success Theme
//           </a>
//           <div className="dropdown-divider"></div>
//           <a className="dropdown-item" href="#" onClick={() => resetTheme()}>
//             Default Theme
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App1;

