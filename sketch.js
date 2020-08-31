//Create variables here
var dog, happyDog;
var foodS, foodStock;
var feedButton, addButton
var fedTime, lastFed
var database;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImage);
  
  database=firebase.database();
  foodstock=database.ref("Food");
  foodstock.on("value",readStock);

  foodObj = new Food ();
  
}


function draw() {  

  background(46,139,87);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Feed the dog");
  addFood=position(800,95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("Last Fed :  12 AM" ,350,30);
  } else if(lastFed==0) {
    text("Last Feed : 12 AM",350,30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350,30);
  }
    
  
 
  food.display();
  drawSprites();

  //add styles here
  textSize = 24;
  text = ("Press UP_ARROW Key To Feed Comet Milk!");
  fill("pink");
  stroke("purple");
}

//function to read values from DB
function readStock(data) {
  foodS = data.val();
}

//function to write values in DB
function writeStock(x) {
  if(x<-0) {
   x = 0;
  } else{
    x = x-1;
  }
  database.ref("/").update({
    food:x
  })

  //function to update food stock and last fed time
  function feedDog() {
    dog.addImage(happyDogImage);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref("/").update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })

    //function to add food in stock
    function addFoods(){
      foodS++;
      database.ref("/").update({
        Food:foodS
      })
    }
  }
}




