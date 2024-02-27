// class TournamentGenerator {
//     constructor(teams) {
//       this.teams = teams;
//       this.poules = [];
//       this.finalStages = []; // 8e de finale, quart de finale, demi-finale, finale
//     }
  
//     // Génère les poules avec un minimum de 4 équipes chacune
//     generatePoules() {
//       let shuffledTeams = [...this.teams].sort(() => 0.5 - Math.random()); // Mélange aléatoire des équipes
//       const nbPoules = Math.floor(shuffledTeams.length / 4);
//       for (let i = 0; i < nbPoules; i++) {
//         this.poules.push(shuffledTeams.splice(0, 4));
//       }
//       console.log("Poules générées :", this.poules);
//     }
  
//     // Simule les matchs dans chaque poule et sélectionne les deux premiers pour les phases finales
//     simulatePoulesMatches() {
//       let qualifiedTeams = [];
//       this.poules.forEach(poule => {
//         // Simule les matchs ici. Pour l'exemple, on prend les deux premières équipes
//         qualifiedTeams.push(...poule.slice(0, 2));
//       });
//       this.finalStages.push(qualifiedTeams);
//       console.log("Équipes qualifiées pour les phases finales :", this.finalStages[0]);
//     }
  
//     // Génère les matchs pour les phases finales jusqu'à la finale
//     generateFinalStages() {
//       let currentStage = this.finalStages[0]; // Commence avec les équipes qualifiées des poules
//       while (currentStage.length > 1) {
//         let nextStage = [];
//         for (let i = 0; i < currentStage.length; i += 2) {
//           // Simule le match entre i et i+1. Pour l'exemple, sélectionne aléatoirement un gagnant
//           let winner = currentStage[i + (Math.random() > 0.5 ? 0 : 1)];
//           nextStage.push(winner);
//         }
//         this.finalStages.push(nextStage);
//         currentStage = nextStage;
//       }
//       console.log("Phases finales :", this.finalStages);
//     }
  
//     // Lance la génération du tournoi et simule jusqu'au gagnant
//     generateTournament() {
//       this.generatePoules();
//       this.simulatePoulesMatches();
//       this.generateFinalStages();
//       return this.finalStages;
//     }
//   }
  
// export default TournamentGenerator
  
class TournamentGenerator {
  constructor(teams) {
      this.teams = teams; // Chaque équipe est un objet { name: string, players: array }
      this.poules = [];
      this.finalStages = []; // Les phases finales
  }

  // Pas de changement nécessaire ici, tu traites les équipes comme un tout
  generatePoules() {
      let shuffledTeams = [...this.teams].sort(() => 0.5 - Math.random());
      const nbPoules = Math.floor(shuffledTeams.length / 4);
      for (let i = 0; i < nbPoules; i++) {
          this.poules.push(shuffledTeams.splice(0, 4));
      }
      console.log("Poules générées :", this.poules);
  }

  // Toujours pas de changement ici, tu sélectionnes juste les deux premières équipes
  simulatePoulesMatches() {
      let qualifiedTeams = [];
      this.poules.forEach(poule => {
          qualifiedTeams.push(...poule.slice(0, 2));
      });
      this.finalStages.push(qualifiedTeams);
      console.log("Équipes qualifiées pour les phases finales :", this.finalStages[0]);
  }

  // Aucun changement nécessaire non plus, la magie opère déjà
  generateFinalStages() {
      let currentStage = this.finalStages[0];
      while (currentStage.length > 1) {
          let nextStage = [];
          for (let i = 0; i < currentStage.length; i += 2) {
              let winner = currentStage[i + (Math.random() > 0.5 ? 0 : 1)];
              nextStage.push(winner);
          }
          this.finalStages.push(nextStage);
          currentStage = nextStage;
      }
      console.log("Phases finales :", this.finalStages);
  }

  generateTournament() {
      this.generatePoules();
      this.simulatePoulesMatches();
      this.generateFinalStages();
      return this.finalStages;
  }
}

export default TournamentGenerator;
