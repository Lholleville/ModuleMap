/**
 * Created by Loic on 20/11/2017.
 */
class Area {

    constructor(){
        this.id = app.id_area_count;
        this.coords = [];
        this.container = $('#zone');
        this.color = $('#cp1 input').val();
        this.alt = $('#alt').val();
        this.href = $('#href').val();
        this.name = $('#name').val();
        this.html = "";
    }


    //Changer les coords d'un point

    changeCoordPoint(point){

        var id = point.attr('id');
        var re = /[px]/;
        var x = parseInt(point.css('left').split(re)[0]), y = parseInt(point.css('top').split(re)[0]);
        //console.log('position graphique x : ' + x + ' y : ' + y);


        for(var i = 0; i < this.coords.length; i++){
            //console.log(this.coords[i].id, id);
            if(this.coords[i].id == id){
                this.coords[i].x = x - 15;
                this.coords[i].y = y - 70;
                this.drawLine();
            }
        }
    }

    //Création des points en mode graphique

    drawPoint(editclass = null){
        this.removePoint();
        var h = $('#zone').height();
        var w = $('#zone').width();
        var color = this.color;
        this.coords.forEach(function(elem){

            var x = w - (w - elem.x) + 15;
            var y = h - (h - elem.y) + 70;

            var html = '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" class="'+editclass+'"  id="'+ elem.id +'" style="position :absolute; left : '+ x +'px; top : ' + y + 'px;"> <rect class="" x="0" y="0" width="4" height="4" style=" fill:'+ color +'; " /></svg>';
            $('#zone').append(html);
        });
        this.setHtml();
        this.drawLine();
    }

    //Création des aires en mode graphique

    drawLine(){
        var str = "";

        this.coords.forEach(function(elem){
            var x = elem.x;
            var y = elem.y;
            str += x + ',' + y + ' ';
        });
        var html = '<svg xmlns="http://www.w3.org/2000/svg" width="" height="" id="polygon-' + this.id +'" class="polygon"><polygon points = "'+ str +'" style=" fill:'+ this.color +'; stroke:'+ this.color +'; opacity:0.3; stroke-opacity: 1; stroke-width: 3px; "></svg>';
        //console.log('#polygon.'+this.id);
        $('#polygon-' + this.id).remove();
        $('#zone').append(html);
    }


    /**
     * Setter
     */

    setColor(){
        this.color = $('#cp1 input').val();
        $('areabuttonw' + this.id).css('background-image', this.color);
        this.setHtml();
    }

    setAlt(){
        this.alt = $('#alt').val();
        this.setHtml();
    }

    setHref(){
        this.href = $('#href').val();
        this.setHtml();
    }

    setHtml(){
        var str = "";

        for(var i = 0; i < this.coords.length; i++){
            var x = this.coords[i].x;
            var y = this.coords[i].y;
            str += x + ',' + y;
            if(i + 1 < this.coords.length){
                str+=',';
            }
        }
        this.html = '<area shape="poly" coords="'+str+'" alt="'+this.alt+'" href="'+ this.href +'">';
    }

    setName() {
        this.name = $('#name').val();
    }


    /**
     * Ces trois fonctions servent à afficher/cacher/supprimer les points d'une aire sur la carte.
     */

    clearPoint(){
        $('svg[id*="'+ this.id +'."]').hide();
    }

    showPoint(){
         $('svg[id*="'+ this.id +'."]').show();
    }

    removePoint(){
        $('svg[id*="'+ this.id +'."]').remove();
        $('svg[id*="polygon-'+ this.id +'"]').remove();
        $('#areabuttonw' + this.id).remove();
        $('#trashbuttonw' + this.id).remove();
    }

    //permet de check si les conditions sont suffisantes pour créer une nouvelle zone.
    //Bool --> true en mode prod, false en mode développement.
    check(bool)
    {
        if(bool){
            var href = ($('#href').val().length > 0) ? true : 'Il faut un lien.';
            var alt = ($('#alt').val().length > 0) ? true : 'Il faut une légende.';
            var nbPoint = (this.coords.length >= 3) ? true : 'Définissez au moins trois points.';

            if(href == true && alt == true && nbPoint == true){
                return true;
            }else{
                $('#hrefHelp').html(href);
                $('#altHelp').html(alt);
                $('#nbPointHelp').html(nbPoint);
                return false;
            }
        }
        else
        {
            return true;
        }
    }

    //Fonction créant l'interface d'édition pour l'aire
    createButtonEdit(){
        var html = '<div>';
        html += '<p class="btn btn-secondary edit" id="areabuttonw'+ this.id +'" style="background-color: '+ this.color +'">Zone : '+ this.id;
        if(this.name != "" && this.name != null){
            html += ' - '+this.name;
        }
        html += '</p>';
        html += '<p class="btn btn-danger" id="trashbuttonw'+ this.id+'"><i class="fa fa-trash-o" aria-hidden="true"></i></p>'
        html += '</div>';


        $('#data').append(html);
    }
}