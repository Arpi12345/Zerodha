import useGeneralContext from "./useGeneralContext";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutButton from "./LogoutButton";





function Profile() {
  const { username,userId, token } = useGeneralContext();






  return (<div style={{ display: 'flex',
        justifyContent: 'center',
        marginTop:'40px',
        alignItems: 'center',
         height: '100vh', 
        backgroundColor: 'whitesmoke' }}>
            
   
    <Card sx={{ maxWidth: 500 }}
    >
      <h3 style={{textAlign:'center', color:'GrayText'}}> User Profile <AccountCircleIcon/></h3>
 
      <CardMedia  sx={{ height: 180 }}
      
        image="/user.avif"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {username}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    userId - {userId}
   <br/>
   <p>Token -&nbsp;{token}</p>
        </Typography>
      </CardContent>
      <CardActions>
  <LogoutButton />
       
      </CardActions>
    </Card>
    </div>

  );
}


export default Profile;