// Write your code here
import './index.css'

const MatchCard = ({matchDetails}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  const statusClassName = matchStatus === 'Won' ? 'won' : 'lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-logo"
      />
      <p className="match-team">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${statusClassName}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
