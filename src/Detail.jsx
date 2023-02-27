import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Detail() {
  const [expanded, setExpanded] = React.useState(false);
  const [country, setCountry] = React.useState(false);

  const { name } = useParams()
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCountry = async () => {
      console.log('name param', name)
      const url = `https://restcountries.com/v3.1/name/${name}`
      const res = await axios.get(url)
      const country = res.data?.[0]
      console.log('country', country)
      setCountry(country)
    }
    if(!name) return
    fetchCountry()
  }, [name])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
    <Card sx={{ maxWidth: 400 }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {country?.name?.common?.[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={country?.name?.common}
        subheader={country?.capital?.[0]}
      />
      <CardMedia
        component="img"
        height="194"
        image={country?.flags?.png}
        alt="flag"
        loading='lazy'
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This country belongs to {country?.region} and {country?.subregion}.
          Located at <b>{country?.latlng?.[0]} &deg;N</b>  and <b>{country?.latlng?.[1]} &deg;W</b> , this country has a population of <b>{country?.population}</b>.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <ArrowBackIosIcon  onClick={() => navigate('/') } />  
        </IconButton>
        <IconButton aria-label="share">
            <LocationOnIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
    </div>
  );
}