import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import Title from '../components/titles/Title'
import Table from '../components/table/Table'

import { fetchTeams } from '../api/fetchFuncs'  
import { columnsTeams } from '../components/table/columns'
import { TEAMS } from '../consts'

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeamsHandler()
  }, []);

  function setTeamsHandler () {
    const callback = fetchedTeams => {
      setTeams(fetchedTeams)
      // Add teams data to localstorage for Team Page use
      localStorage.setItem(TEAMS, JSON.stringify(fetchedTeams))
    }
    fetchTeams(callback)
  }
  
  return (
    <Box>
      <Title>Football Teams</Title>
      <Table 
        columns={columnsTeams} 
        data={teams}
      />
    </Box>
  );
};

export default Teams;

const Box = styled.div`
  margin: 15px;
`