import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

 const List = ({data}) => {
  const navigate = useNavigate();

    const columns = [
        { 
          headerName: 'Flag', 
          width: 200,
          height: 150,
          sortable: false,
          renderCell: (params) => (
              <Box
                  component="img"
                  sx={{
                  height: 150,
                  width: 200,
                  }}
                  alt="flag"
                  src={params.row?.flags?.png}
            />
            ),
          },
        { 
          field: 'Name', 
          headerName: 'Name',
          valueGetter: (params) => {
             return params.row?.name?.common
          },
          sortable: false,
          width: 200 },
        { field: 'region', 
          headerName: 'Region', 
          width: 150,
        },
        {
          field: 'population',
          headerName: 'Population',
          type: 'number',
          width: 180,
          sortable: false
        },
        {
          field: 'Languages',
          headerName: 'Languages',
          description: 'This column has a value getter and is not sortable.',
          width: 250,
          renderCell: (params) => (
              <ul>
                  {params?.row?.languages && Object?.values(params?.row?.languages).map(lang => <li>{lang}</li>)}
              </ul>
            ),
        },
        {
          field: 'go',
          headerName: '',
          width: 90,
          renderCell: (params) => (
              <NavigateNextIcon onClick={() => onClick(params.row.name.common)} style={{cursor: 'pointer'}}  />
            )
        },
      ];
      
    const onClick = (name) => {
      console.log('name', name)
        navigate(`/${name}`)
    }

  return (
    <div style={{height: 600, width: '100vw' }}>
      <DataGrid
        getRowId={(row) => row.cca2}
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowHeight={100}
      />
    </div>
  );
}

export default List