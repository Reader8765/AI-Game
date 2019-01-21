let app = new PIXI.Application({ height: 500, width: 500, backgroundColor: "blue" });
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0xffffff;
let GlobalInfo;

PIXI.loader
  .add("sprite.png")
  .load(setup);

class Global {
  constructor(shapes){
    this.shapes = shapes;
    shapes.map(shape=>{
      var graphics = new PIXI.Graphics();
      graphics.beginFill(0xFFFF00);
      graphics.drawRect(shape.x, shape.y, shape.width, shape.height);
      app.stage.addChild(graphics);
    });
    this.users = {};
    this.keyCheck = {};
  }
  update() {
    Object.keys(this.users).map(user => {
      this.users[user].update();
    });
  }
  newUser(name, image, x, y, keys) {
    this.users[name] = new Player(name, new PIXI.Sprite(PIXI.loader.resources[image].texture), x, y);
    this.users[name].useKeys(keys[0],keys[1],keys[2],keys[3]);
  }
  defineKeys() {
    document.addEventListener("keydown", e => {
      Object.keys(this.keyCheck).map(user => {
        var userKeys = this.keyCheck[user];
        var userObj = this.users[user];
        if (e.key == userKeys.up) {
          userObj.direction = "up"
          userObj.moving = true;
        } else if (e.key == userKeys.left) {
          userObj.direction = "left";
          userObj.moving = true;
        } else if (e.key == userKeys.down) {
          userObj.direction = "down";
          userObj.moving = true;
        } else if (e.key == userKeys.right) {
          userObj.direction = "right";
          userObj.moving = true;
        }
      });
    });
    document.addEventListener("keydown", e => {
      Object.keys(this.keyCheck).map(user => {
        var userKeys = this.keyCheck[user];
        var userObj = this.users[user];
        if (e.key == userKeys.up && userObj.direction == "up") {
          this.users[user].moving = false;
        } else if (e.key == userKeys.left && userObj.direction == "left") {
          this.users[user].moving = false;
        } else if (e.key == userKeys.down && userObj.direction == "down") {
          this.users[user].moving = false;
        } else if (e.key == userKeys.right && userObj.direction == "right") {
          this.users[user].moving = false;
        }
      });
    });
  }
}

class Entity {
  constructor(name, sprite, x, y) {
    this.name = name;
    this.sprite = sprite;
    this.direction = "down";
    this.vector = [0,0];
    this.moving = false;
    app.stage.addChild(this.sprite);
  }
  checkCollision(objects) {
    
  }
}

class AI extends Entity {
}

class Player extends Entity {
  useKeys(up, left, down, right) {
    GlobalInfo.keyCheck[this.name] = {up: up, left: left, down: down, right: right};
    GlobalInfo.defineKeys();
  }
  update() {
    if (this.moving) {
      switch (this.direction) {
        case "up":
          this.sprite.x += 5;
          break;
        case "left":
          break;
        case "down":
          break;
        case "right":
          break;
      }
    }
  }
}

function setup() {
  const shapes = [
    {x:75,y:0,width:50,height:250}
  ]

  GlobalInfo = new Global(shapes);
  GlobalInfo.newUser("User1","sprite.png",5,5,["ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]);

  setInterval(GlobalInfo.update, 25);
}
