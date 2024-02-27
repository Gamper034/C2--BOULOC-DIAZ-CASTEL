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

  getTeams() {
    return this.teams;
  }
}

export default TeamGenerator;