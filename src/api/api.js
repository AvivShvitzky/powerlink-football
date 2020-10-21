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
   * Returns information about teams in the english league.
  */
  teams() {
    return requests.get(`Teams`).then(res => res)
   },
   team(teamId) {
    return requests.get(`PlayersByTeam/${teamId}`).then(res => res)
   }
  // /**
  // * Returns the website daily log-ins of an organization.
  // * @param {String} organizationName
  // * @returns _id(represents a date), count
  // */
  // orgDailyLogs: organizationName => {
  //   return requests.get(`logins/daily/${organizationName}`).then(res => res.Success)
  // },
}

export const auth = {
  login: (email, password) => {
    let body = {
      email,
      password
    }
    return requests.post(`auth/login`, body)
  },
}

