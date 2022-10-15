// Codewars Ranking System
// https://www.codewars.com/kata/51fda2d95d6efda45e00004e
class User {
  constructor() {
    this.rank = -8;
    this.progress = 0;
    this.progressCap = 100;
    this.maxRank = 8;
  }

  incProgress(rank) {
    if (rank < - this.maxRank || rank > this.maxRank || rank === 0) throw new Error("Rank input is out of range.");
    if (this.rank === this.maxRank) return;

    let diff = Math.abs(this.rank - rank);

    if (rank > 0 && this.rank < 0) diff--;
    if (rank < 0 && this.rank > 0) diff = -diff;

    this.progress += diff > 0 ? (10 * diff * diff) : diff === 0 ? 3 : 1;

    if (this.progress > this.progressCap && this.rank < this.maxRank) {
      this.rank += Math.floor(this.progress / this.progressCap);
      this.progress %= this.progressCap;

      if (this.rank === 0) this.rank++;
    }

    if (this.rank === this.maxRank) this.progress = 0;
  }
}