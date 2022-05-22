import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import bk from '../icons/bk.jpeg';

export function Contact() {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', border: '2px black' }}
      >
        <CardMedia
          component="img"
          image={bk}
          sx={{
            height: 300,
            width: 350,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Baptiste Keunebroek
          </Typography>
          <Typography variant="body2" color="text.secondary">
            baptiste.keunebroek@efrei.net
          </Typography>
        </CardContent>
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', border: '2px black' }}
      >
        <CardMedia
          component="img"
          src="https://i1.sndcdn.com/avatars-O4Zf03w0rsVlYevf-E9twPw-t500x500.jpg"
          sx={{
            height: 300,
            width: 350,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Malo Le Corvec
          </Typography>
          <Typography variant="body2" color="text.secondary">
            adresse test info
          </Typography>
        </CardContent>
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', border: '2px black' }}
      >
        <CardMedia
          component="img"
          src="https://i1.sndcdn.com/avatars-O4Zf03w0rsVlYevf-E9twPw-t500x500.jpg"
          sx={{
            height: 300,
            width: 350,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Malo Le Corvec
          </Typography>
          <Typography variant="body2" color="text.secondary">
            adresse test info
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
