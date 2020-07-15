new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame: function () {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameIsRunning = true;
      this.turns = [];
    },
    attack: function () {
      let damage = this.calculateDamage(10, 3);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for : " + damage,
      });

      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
      this.checkWin();
    },
    specialAttack: function () {
      let damage = this.calculateDamage(20, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster HARD 💪 for : " + damage,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
      this.checkWin();
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals for 10 🚑",
      });
      this.monsterAttacks();
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
    monsterAttacks: function () {
      let damage = this.calculateDamage(12, 5);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player for : " + damage,
      });
    },
    calculateDamage: function (max, min) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won!! 😎 New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("Monster won 😢 New game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
