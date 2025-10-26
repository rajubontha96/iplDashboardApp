import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        date: fetchedData.latest_match_details.date,
        venue: fetchedData.latest_match_details.venue,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
      },
      recentMatches: fetchedData.recent_matches.map(eachMatch => ({
        id: eachMatch.id,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        result: eachMatch.result,
        matchStatus: eachMatch.match_status,
      })),
    }

    // Optional: simulate network delay for loader visibility
    setTimeout(() => {
      this.setState({
        isLoading: false,
        teamBannerUrl: updatedData.teamBannerUrl,
        latestMatchDetails: updatedData.latestMatchDetails,
        recentMatches: updatedData.recentMatches,
      })
    }, 500)
  }

  render() {
    const {isLoading, teamBannerUrl, latestMatchDetails, recentMatches} =
      this.state

    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
