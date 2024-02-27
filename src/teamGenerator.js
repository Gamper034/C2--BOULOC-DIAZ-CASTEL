import { CSVReader } from './csvReader.js';

class TeamGenerator {
  constructor(players, playersPerTeam = 3) {
    this.players = players;
    this.playersPerTeam = playersPerTeam;
    this.teams = [];
    this.playersLevels; //Max level is 5, min level is 0
  }



  generateTeams() {
    let teamIndex = 0;

    if (this.playersLevels !== undefined) {
      let playerPool  = this.playersLevels
      playerPool.sort((a, b) => b[1] - a[1]); //Tri des joueurs par niveau
      while (playerPool.length > 0) {
        let teamPlayersLevels = [];
        let teamPlayers = [];

        for (let i = 0; i < this.playersPerTeam; i++) {
          let player;
          //On alterne entre le joueur le plus fort et le joueur le plus faible
          //pour équilibrer les équipes
          if (playerPool.length > 0) {
            if (i % 2 === 0) {
              player = playerPool.pop();
            } else {
              player = playerPool.shift();}
            //Creation de la liste des joueurs et de la liste de leur niveau
            teamPlayersLevels.push(player[1]);
            teamPlayers.push(player[0]);
          }
        }

        let teamName = `Équipe ${teamIndex + 1}`;
        let team = {
          name: teamName,
          players: teamPlayers,
          //Ajout d'un capitaine de façon aléatoire à l'équipe
          captain: teamPlayers[Math.floor(Math.random() * teamPlayers.length)],
          //Calcul de la moyenne des niveaux des joueurs de l'équipe
          averageLevel: teamPlayersLevels.reduce((a, b) => a + b, 0) / teamPlayers.length
        };
        this.teams.push(team);
        teamIndex++;
      }
    }

    else {
      let shuffledPlayers = [...this.players].sort(() => 0.5 - Math.random()); // Mélange aléatoire des joueurs

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

  setPlayerLevels(playerLevels) {
    this.playersLevels = playerLevels;
  }

  getTeams() {
    return this.teams;
  }
}

export default TeamGenerator;