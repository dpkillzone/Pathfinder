class Mure 
{
  // Location
    constructor(i, j)
    {
      this.i = i;
      this.j = j;
  // f-, g- og h-værdier for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;
  
  // Naboer
    this.naboer = [];
  
  // Hvor kom jeg fra?
    this.previous = undefined;
  
  // Er jeg en mur?
    this.mur = false;
    if (random(1) < 0.4) {
      this.mur = true;
    }
  
  // Vis mig
    this.show = function(col) {
      if (this.mur) {
        fill(0);
        noStroke();
        rect(this.i * w + w / 2, this.j * h + h / 2, w /2 , h / 2);
      } else if (col) {
        fill(col);
        rect(this.i * w, this.j * h, w, h);
      }
    };
  
  // Find ud af, hvem mine naboer er
    this.addnaboer = function(grid) {
      var i = this.i;
      var j = this.j;
      if (i < cols - 1) {
        this.naboer.push(grid[i + 1][j]);
      }
      if (i > 0) {
        this.naboer.push(grid[i - 1][j]);
      }
      if (j < rows - 1) {
        this.naboer.push(grid[i][j + 1]);
      }
      if (j > 0) {
        this.naboer.push(grid[i][j - 1]);
      }
      if (i > 0 && j > 0) {
        this.naboer.push(grid[i - 1][j - 1]);
      }
      if (i < cols - 1 && j > 0) {
        this.naboer.push(grid[i + 1][j - 1]);
      }
      if (i > 0 && j < rows - 1) {
        this.naboer.push(grid[i - 1][j + 1]);
      }
      if (i < cols - 1 && j < rows - 1) {
        this.naboer.push(grid[i + 1][j + 1]);
      }
    };
  }
}
  
  
  