/**
 * Created by Loic on 20/11/2017.
 */


//instenciation de l'app

var app = new App();
var editor = new Editor();
//début de l'appli, on crée une area par défaut.
var area = new Area();

//si on clique sur la zone de travail, on crée un nouveau point que l'on ajoute dans l'aire courante.

area.container.click(function(e){
   if(!app.editMode){
       var offset = $(this).offset();

       var x = Math.round(e.pageX - offset.left);
       var y = Math.round(e.pageY - offset.top);

       area.coords.push(new Point(x, y, app.id_area_count, app.id_point_count));
       area.drawPoint();

       app.incrementPointCount();
   }

});

//EVENT BOUTONS

//crée une zone
$('#zone_create').click(function(){
   if(area.check(false)){
       //On ajoute l'aire dans le tableau d'aires de l'app.
       app.areaArray.push(area);
       //On crée le bouton sur l'interface
       area.createButtonEdit();
       //incrémente l'id des aires
       app.incrementAreaCount();
       //on remet à 0 le compteur de points
       app.incrementPointReset();
       //on reset l'aire
       area = new Area();
   }
});

//aficher/cacher les poly
$('#polygon_show').click(function(){
    app.polyMode = !app.polyMode;
    if(app.polyMode){
        $(this).attr('class', 'btn btn-warning');
        $("svg").hide();
        //cache
    }else{
        $(this).attr('class', 'btn btn-secondary');
        $("svg").show();
        //affiche
    }

});


//EVENT FORM

$('#cp1 input').change( function () {
    area.setColor();
});

$('#href').change( function () {
   area.setHref();
});

$('#alt').change( function () {
    area.setAlt();
});

$('#name').change( function () {
    area.setName();
});


//EDITION

$('#edition_mode').on('click', function(){
    //réinitialise l'area au lieu de l'enregistrer
    area = new Area();
    //change de mode Edition/Creation
    app.editMode = !app.editMode;
    //si il y a au moins une aire
    if(app.areaArray.length > 0){
        if(app.editMode)
        {
            $(this).attr('class', 'btn btn-success');
            //si on clique sur le boutton

            $('p[id*="areabutton"]').click(function() {

                console.log($(this).attr('id'));

                //recrée les points
                area = editor.regenerate($(this).attr('id'));
                editor.enableModificable();

                $('.modificable').mousedown(function () {
                    $(this).draggable({
                       containment: ".col-lg-8"
                    });
                    var point = $(this);
                    setInterval(function() {
                        area.changeCoordPoint(point);
                    }, 100);
                });
            });
            $('p[id*="trashbutton"]').click(function() {
                area = editor.regenerate($(this).attr('id'));
                editor.deleteArea(area);
                app.regenerateAreaArray();
            });
        }
        else{
            editor.disableMoficable();
            //$('.modificable').attr('class', '');
            $(this).attr('class', 'btn btn-danger');
        }
    }else{
        alert('Vous devez avoir défini au moins une zone avant de passer au mode édition');
    }
});
