import { teamsAPI } from './api'

export async function fetchTeams(callback) {
  const teamsData = await teamsAPI.teams()
  callback(teamsData)
}

export async function fetchPlayers(callback, id) {
  const playersData = await teamsAPI.team(id)
  callback(playersData)
}