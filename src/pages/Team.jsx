import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components'

import Title from '../components/titles/Title'
import Table from '../components/table/Table'

import { fetchPlayers, fetchTeams } from '../api/fetchFuncs'  
import { columnsTeam } from '../components/table/columns'
import { TEAMS } from '../consts'

function Team(props) {
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);

  let { id } = useParams();
  
  useEffect(() => {
    setTeamHandler()
    fetchPlayers(setPlayers, id)
  }, []);

  function findTeamById(arr) {
    return arr.find(el => el.TeamId == id)
  }
  
  function setTeamHandler() {
    // use history state if exists 
    const historyState = props.history.location.state
    if (historyState) {
      setTeam(historyState)
    }
    // use localStorage data if exists
    else if (localStorage.getItem(TEAMS)) {
      const localStorageData = JSON.parse(localStorage.getItem(TEAMS))
      const teamData = findTeamById(localStorageData)
      setTeam(teamData)
    }
    // localStorage has no data, fetch for it
    else {
      const callback = fetchedTeams => {
        localStorage.setItem(TEAMS, JSON.stringify(fetchedTeams))
        const teamData = findTeamById(fetchedTeams)
        setTeam(teamData)
      }
      fetchTeams(callback)
    }
  }

  return (
    <div>
      <Header>
        <div>
          <Link to="/teams">Go Back To Teams Page</Link>
        </div>
        <div>
          <Image src={team.WikipediaLogoUrl}/>
          <Title>{team.Name}</Title>
        </div>
      </Header>

      <DetailsBox>
        <DetailBox>
          <label>Club Address</label>
          {team.Address}
        </DetailBox>
        <DetailBox>
          <label>Club Website</label>
          <a href={team.Website}>{team.Website}</a>
        </DetailBox>
        <DetailBox>
          <label>Club Founded At</label>
          {team.Founded}
        </DetailBox>
      </DetailsBox>

      <Table 
        columns={columnsTeam} 
        data={players}
      />
    </div>
  );
};

export default Team;

const Header = styled.div`
  display: flex;
  margin: 15px;

  div:first-child {
    position: absolute;
  }

  div:last-child {
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: auto;
  }
`

const DetailsBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 1000px;
  margin: auto;
`

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  label {
    font-size: 20px;
  }
`

const Image = styled.img`
  height: 200px;
  margin-bottom: 10px;
`
