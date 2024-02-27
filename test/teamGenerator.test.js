// generate tests for teamGenerator.js
import { expect } from 'chai';

import TeamGenerator from '../src/teamGenerator.js';

describe('TeamGenerator', () => {

    describe('generateTeams', () => {
        // Check if "captain" key if defined
        it('should have a "captain" key', () => {
          const teamGenerator = new TeamGenerator(['Alice', 'Bob', 'Charlie']);
          teamGenerator.generateTeams();
          expect(teamGenerator.getTeams()[0]).to.have.property('captain');
        });
    
        // Check if "captain" key contains a string
        it('should have a "captain" key containing a string', () => {
          const teamGenerator = new TeamGenerator(['Alice', 'Bob', 'Charlie']);
          teamGenerator.generateTeams();
          expect(teamGenerator.getTeams()[0].captain).to.be.a('string');
        });

        it('should assign a captain who is a member of the team', () => {
            const teamGenerator = new TeamGenerator(['Alice', 'Bob', 'Charlie']);
            teamGenerator.generateTeams();
            const teams = teamGenerator.getTeams();
            teams.forEach(team => {
              expect(team.players).to.include(team.captain);
            });
          });
      });



})