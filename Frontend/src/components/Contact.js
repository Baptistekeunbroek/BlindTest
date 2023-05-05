import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import bk from "../icons/bk.jpeg";
import clement from "../icons/clement.png";
import luk from "../icons/luk.png";
import rems from "../icons/rems.png";
import malo from "../icons/malo.jpeg";
import "./Contact.css";

export function Contact() {
  return (
    <Card>
      <Box>
        <CardMedia
          component="img"
          image={malo}
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
            malo.le.corvec@efrei.net
          </Typography>
        </CardContent>
      </Box>
      <Box>
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

      <Box>
        <CardMedia
          component="img"
          image={clement}
          sx={{
            height: 300,
            width: 350,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Clément Le Corre
          </Typography>
          <Typography variant="body2" color="text.secondary">
            clement.le.corre@efrei.net
          </Typography>
        </CardContent>
      </Box>

      <Box>
        <CardMedia
          component="img"
          image={luk}
          sx={{
            height: 300,
            width: 350,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lucas Le Page
          </Typography>
          <Typography variant="body2" color="text.secondary">
            lucas.le.page@efrei.net
          </Typography>
        </CardContent>
      </Box>
      <Box>
        <CardMedia
          component="img"
          image={rems}
          sx={{
            height: 300,
            width: 350,
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Remi Paucton
          </Typography>
          <Typography variant="body2" color="text.secondary">
            remi.paucton@efrei.net
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
