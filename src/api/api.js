import superagent from 'superagent'

const apiUrl = 'https://api.sportsdata.io/v3/soccer/scores/json/'

const responseBody = res => res.body
const requests = {
  get: url => {
    return superagent
            .get(`${apiUrl}${url}`)
            .set('Ocp-Apim-Subscription-Key', '86321070553348db8ce3ceedd3c6f729')
            .then(responseBody)
            .catch(err => err)
  }
}

export const teamsAPI = {
  /**
   * Returns information about football teams.
  */
  teams() {
    return requests.get(`Teams`).then(res => res)
   },
  /**
   * Returns information about players of a certain football team.
  */
   team(teamId) {
    return requests.get(`PlayersByTeam/${teamId}`).then(res => res)
   }
}


