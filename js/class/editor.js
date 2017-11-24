/**
 * Created by Loic on 22/11/2017.
 */
class Editor {

    constructor ()
    {
        this.currentArea = area;
    }

    regenerate(strID)
    {
        var id = strID.split('w');

        for(var i = 0; i < app.areaArray.length; i++){
            if(app.areaArray[i].id == id[1]){
                this.setCurrentArea(app.areaArray[i]);
                return app.areaArray[i];
            }
        }

        return null;
    }

    deleteArea (area) {
        for(var i = 0; i < app.areaArray.length; i++){
            if(area.id == app.areaArray[i].id){
                area.removePoint();
                app.areaArray[i]= undefined;
            }
        }
    }

    setCurrentArea (area)
    {
        this.currentArea = area;
    }

    enableModificable ()
    {
        this.disableMoficable();
        $("svg[id*='"+ this.currentArea.id +"']").attr('class', 'modificable');
        $("svg[id*='polygon-"+this.currentArea.id+"']").attr('class', 'polygon');

    }

    disableMoficable ()
    {
        $('.modificable').attr('class', '');
    }
}