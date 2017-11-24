/**
 * Created by Loic on 20/11/2017.
 */

class Point {

    constructor (CoordX, CoordY, id_area, id_point){
        this.x = CoordX;
        this.y = CoordY;
        this.id = id_area + "." + id_point;
        //console.log(this);
    }

}