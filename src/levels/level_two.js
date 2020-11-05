import Terrain from "./terrain.js";
import TerrainUtil from "../terrain_utils";
import LevelUtils from './level_utils'
import EnemyBullets from '../enemy_bullets'
export default class LevelTwo extends LevelUtils {
   constructor(dimensions){
      super(dimensions);
      this.terrain = this.formTerrain();
      this.numTerrain = this.terrain.length;
      this.bullets = this.formBullets()
      this.startPos = [125, 525];
   }

   formTerrain(){
      let levelObjects = [];
      levelObjects.push(
         Terrain.ground(
            0, 
            450, 
            this.width, 
            20,
            this.width,
            true
         )
      );
      levelObjects.push(
         Terrain.ground(
            0, 
            325, 
            this.width, 
            20,
            this.width,
            true
         )
      );
      levelObjects.push(
         Terrain.ground(
            0, 
            200, 
            this.width, 
            20,
            this.width,
            true
         )
      );
      levelObjects.push(
         Terrain.ground(
            0, 
            575, 
            this.width, 
            this.height - 575,
            this.width,
            false
         )
      );

      return levelObjects
   }
   won(){

   }
   formBullets(){
      let bullets = []
      for(let i = 0; i < 10; i++){
         bullets.push( new EnemyBullets (
            10,
            this.width + (75 * i),
            275,
            2,
            0
         ))
      }
      return bullets
   }
   draw(ctx){
      const { left, right } = this
      if(this.left > 0 || this.dx > 0){
         this.left += this.dx
         this.right += this.dx
      }
      this.bullets.forEach( bullet => bullet.draw(ctx))
      for(let i = 0; i < this.numTerrain; i++) {
         let ter = this.terrain[i];
         if( ter.start < right && ter.end > left ){
            ter.render = true
            let dims = ter.getDim(left);
            if (!ter.platform){
               TerrainUtil.drawGround(ctx, ...dims)
            } else {
               ctx.fillStyle = "#E76F51";
               ctx.fillRect(dims[0], dims[1], dims[2], dims[3])
            }
         } else {
            ter.render = false;
         }
      }

   }
}