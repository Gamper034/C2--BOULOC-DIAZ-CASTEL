import { expect } from "chai";
import TournamentGenerator from "../src/tournamentGenerator.js";
import TeamGenerator from "../src/teamGenerator.js";
import { describe } from "mocha";

describe("TournamentGenerator", () => {

  // Make tests
  describe("Given we generate a tournament", () => {
    it("should generate a tournament", () => {
      const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hugo", "Ivy", "Jean", "Kevin", "Liam", "Mia", "Nina", "Oscar", "Paul", "Quinn", "Rose", "Sam", "Tom", "Ursula", "Victor", "Wendy", "Xavier", "Yann", "Zoe", "Maria", "John", "Chris", "Arthur"]);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      const tournamentGenerator = new TournamentGenerator(teams);
      const tournament = tournamentGenerator.generateTournament();
      expect(tournament).to.be.an("array");
      expect(tournament).to.have.lengthOf(3);
      expect(tournament[0]).to.have.lengthOf(4);
      expect(tournament[1]).to.have.lengthOf(2);
      expect(tournament[2]).to.have.lengthOf(1);
    });

  });

});