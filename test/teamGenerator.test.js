// generate tests for teamGenerator.js
import { expect } from "chai";

import TeamGenerator from "../src/teamGenerator.js";

describe("TeamGenerator", () => {
	describe("Given we generate teams", () => {
		// Check if "captain" key if defined
		it('should have a "captain" key', () => {
			const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie"]);
			teamGenerator.generateTeams();
			expect(teamGenerator.getTeams()[0]).to.have.property("captain");
		});

		// Check if "captain" key contains a string
		it('should have a "captain" key containing a string', () => {
			const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie"]);
			teamGenerator.generateTeams();
			expect(teamGenerator.getTeams()[0].captain).to.be.a("string");
		});

		it("should assign a captain who is a member of the team", () => {
			const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie"]);
			teamGenerator.generateTeams();
			const teams = teamGenerator.getTeams();
			teams.forEach((team) => {
				expect(team.players).to.include(team.captain);
			});
		});

    it("should generate teams with 3 players by default", () => {
      const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie"]);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      teams.forEach((team) => {
        expect(team.players).to.have.lengthOf(3);
      });
    });

    it("should generate teams with 2 players", () => {
      const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie", "John"], 2);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      teams.forEach((team) => {
        expect(team.players).to.have.lengthOf(2);
      });
    });

    it("should generate teams with 4 players", () => {
      const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie", "John"], 4);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      teams.forEach((team) => {
        expect(team.players).to.have.lengthOf(4);
      });
    });

    it("should contain the right number of teams", () => {
      const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hugo", "Ivy"]);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      expect(teams).to.have.lengthOf(3);
    })


    it("should have teams with even player levels", async () => {
      const playerLevels = [["Alice", 3], ["Bob", 2], ["Charlie", 1], ["David", 4], ["Eve", 4], ["Frank", 3], ["Grace", 2], ["Hugo", 1], ["Ivy", 4]];
      const averagePlayerLevel = playerLevels.reduce((acc, player) => acc + player[1], 0) / playerLevels.length;
      const teamGenerator = new TeamGenerator(["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hugo", "Ivy"]);
      teamGenerator.setPlayerLevels(playerLevels);
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
      //For each team, the average level should be the same of averagePlayerLevel + - 1.5 as max level is 5 and min level is 0
      teams.forEach((team) => {
        expect(team.averageLevel).to.be.closeTo(averagePlayerLevel, 1.5);
      });
    });

	});

	describe("Given we generate teams from CSV file", () => {
		it("should generate teams", async () => {
			const teamGenerator = new TeamGenerator();
			const teams = await teamGenerator.generateTeamsFromCSV(
				"./test/assets/players.csv"
			);
			expect(teams).to.be.an("array");
			expect(teams[0]).to.have.property("name");
			expect(teams[0]).to.have.property("players");
			expect(teams[0]).to.have.property("captain");
		});

    it("should contain the right number of teams", async () => {
      const teamGenerator = new TeamGenerator();
      const teams = await teamGenerator.generateTeamsFromCSV(
        "./test/assets/players.csv"
      );
      expect(teams).to.have.lengthOf(4);
    });

    it("should contain the right number of players", async () => {
      const teamGenerator = new TeamGenerator();
      const teams = await teamGenerator.generateTeamsFromCSV(
        "./test/assets/players.csv"
      );
      teams.forEach((team) => {
        expect(team.players).to.have.lengthOf(4);
      });
    });

    it("should contain the right captain", async () => {
      const teamGenerator = new TeamGenerator();
      const teams = await teamGenerator.generateTeamsFromCSV(
        "./test/assets/players.csv"
      );
      teams.forEach((team) => {
        expect(team.players).to.include(team.captain);
      });
    });

	});
});
