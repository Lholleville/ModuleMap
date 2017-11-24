/**
 * Created by Loic on 20/11/2017.
 */

//Ne doit être instanciée qu'une seule fois dans le programme.
class App {
    constructor(){
        this.id_area_count = 0;
        this.id_point_count = 0;
        this.areaArray = [];
        this.EditMode = false;
        this.polyMode = false;
        this.colorPalette = ['#dd0f20', '#2e0fdd', '#0fdd3f', '#d6dd0f', '#dd810f', '#dd0fc6', '#0fc2dd', '#458d3f'];
    }

    /**
     * ZONE INCREMENTATION
     */

    //incrémente le nombre d'aires sur la carte.
    incrementAreaCount(){
        this.id_area_count++;
        this.setNextColor();
    }

    //incrémente le nombre de point de la zone courante.
    incrementPointCount(){
        this.id_point_count++;
    }

    //remet a 0 le compteur de points (utilisé à chaque nouvelle création d'aire)
    incrementPointReset(){
        this.id_point_count = 0;
    }

    //Permet de changer automatiquement la couleur.
    setNextColor(){
        if(this.id_area_count < this.colorPalette.length){
            $('#cp1 input').val(this.colorPalette[this.id_area_count]);
        }else{
            $('#cp1 input').val("#dd0f20");
        }
    }

    regenerateAreaArray(){

        var tmp = [];

        for(var i = 0; i < this.areaArray.length; i++){
            if(this.areaArray[i] != undefined){
                tmp.push(this.areaArray[i]);
            }
        }

        this.areaArray = tmp;

    }


}