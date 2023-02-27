import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import List from './List';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Main() {

    const [data, setData] = React.useState([])
    const [seachValue, setSearchValue] = React.useState('')
  
    React.useEffect(() => {
      const fetchCountries = async () => {
          const url = seachValue ? `https://restcountries.com/v3.1/name/${seachValue}` : 'https://restcountries.com/v3.1/all'
          const res = await axios.get(url)
          const sortedCountres = res?.data?.sort((a, b) => {
              if (a.name.common < b.name.common) {
                return -1;
              }
              if (a.name.common > b.name.common) {
                return 1;
              }
              return 0;
            })
          setData(sortedCountres)
      }
      fetchCountries()
    }, [seachValue])


    const onSearch = (e) => {
        if(e?.target?.value) {
            setSearchValue(e.target.value)
        } else {
            setSearchValue('')
        }
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'start' }}
          >
            Country
          </Typography>
          <Search style={{minWidth: 250}}>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by country name"
              inputProps={{ 'aria-label': 'search' }}
              onChange={onSearch}
            />
          </Search>
        </Toolbar>
        
      </AppBar>
      <List data={data} />
    </Box>
  );
}