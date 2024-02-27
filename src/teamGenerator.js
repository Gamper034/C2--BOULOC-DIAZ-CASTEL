import { CSVReader } from './csvReader.js';

class TeamGenerator {
  constructor(players, playersPerTeam = 3) {
    this.players = players;
    this.playersPerTeam = playersPerTeam;
    this.teams = [];
  }

  generateTeams() {
    let shuffledPlayers = [...this.players].sort(() => 0.5 - Math.random()); // Mélange aléatoire des joueurs
    let teamIndex = 0;

    while (shuffledPlayers.length > 0) {
      let teamPlayers = shuffledPlayers.splice(0, this.playersPerTeam);
      let teamName = `Équipe ${teamIndex + 1}`;
      let team = {
        name: teamName,
        players: teamPlayers,
        //Ajout d'un capitaine de façon aléatoire à l'équipe
        captain: teamPlayers[Math.floor(Math.random() * teamPlayers.length)] 
      };
      this.teams.push(team);
      teamIndex++;
    }
  }

  generateTeamsFromCSV(filePath) {
    return new Promise((resolve, reject) => {
      const csvReader = new CSVReader(filePath);
      csvReader.readCSV()
        .then((players) => {

          players.forEach(item => {
            if(!this.teams.find(team => team.name === item.team)) {
              this.teams.push({name: item.team, players: [item.player], captain: item.player});
            }else{
              this.teams.find(team => team.name === item.team).players.push(item.player);
            }
            
          });

          resolve(this.teams);
          
        })
        .catch((error) => reject(error));
    });
  }

  getTeams() {
    return this.teams;
  }
}

export default TeamGenerator;