function removeFromArray(arr, elt) 
{
  for (var i = arr.length - 1; i >= 0; i--) 
  {
    if (arr[i] == elt) 
    {
      arr.splice(i, 1);
    }
  }
}

// Et kvalificeret gæt på, hvor langt der er mellem to punkter
function heuristic(a, b) 
{
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

// Hvor mange kolonner og rækker?
var cols = 40;
var rows = 40;

// Dette vil være 2D-arrayet
var grid = new Array(cols);

// Open og closed sæt
var openSet = [];
var closedSet = [];

// Start og Slut
var start;
var slut;

// Bredde og højde af hver celle i gitteret
var w, h;

// Vejen taget
var path = [];

function setup() 
{
  createCanvas(800, 800);
  console.log('stifinder ved hjælp af A*-algoritme');

  // Gittercellestørrelse
  w = width / cols;
  h = height / rows;

 // laver et 2D-array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Mure(i, j);
    }
  }

  // Alle naboerne
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addnaboer(grid);
    }
  }

  // Start og Slut
  start = grid[0][0];
  slut = grid[cols - 1][rows - 1];
  start.mur = false;
  slut.mur = false;
  // openSet starter kun med begyndelsen
    openSet.push(start) 
}

function draw() {
  // Søger jeg stadig?
  if (openSet.length > 0) {
    // næste bedste mulighed
    var IndexVærdie = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[IndexVærdie].f) {
        IndexVærdie = i;
      }
    }
    var nuværende = openSet[IndexVærdie];

    // Blev jeg færdig?
    if (nuværende === slut) {
      noLoop();
      console.log('Fundet');
    }

// Bedste mulighed flyttes fra openSet til closedSet
    removeFromArray(openSet, nuværende);
    closedSet.push(nuværende);

   // Tjek alle naboerne
    var naboer = nuværende.naboer;
    for (var i = 0; i < naboer.length; i++) {
      var nabo = naboer[i];

      // Gyldig næste plads?
      if (!closedSet.includes(nabo) && !nabo.mur) {
        var midG = nuværende.g + heuristic(nabo, nuværende);

        // Er dette en bedre vej i sammenligning til den tidliger ?
        var newPath = false;
        if (openSet.includes(nabo)) {
          if (midG < nabo.g) {
            nabo.g = midG;
            newPath = true;
          }
        } else {
          nabo.g = midG;
          newPath = true;
          openSet.push(nabo);
        }

        // Ja, det er en bedre vej
        if (newPath) {
          nabo.h = heuristic(nabo, slut);
          nabo.f = nabo.g + nabo.h;
          nabo.previous = nuværende;
        }
      }
    }
   // Åh, ingen løsning
  } else {
    console.log('ingen løsning');
    noLoop();
    return;
  }

 // Tegn nuværende tilstand af alt
  background(255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0, 50));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0, 50));
  }

  // Find stien ved at arbejde baglæns
  path = [];
  var midG = nuværende;
  path.push(midG);
  while (midG.previous) {
    path.push(midG.previous);
    midG = midG.previous;
  }

  for (var i = 0; i < path.length; i++) {
  path[i].show(color(255, 255, 255));
  }
  
  fill(0,255,0)
  rect(0,0,20,20)
  
  fill(255,0,0)
  rect(785,785,15,15)


 // Tegning af sti som er kontinuerlig linje
  noFill();
  stroke(0, 0, 155);
  strokeWeight(w / 3);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();

}