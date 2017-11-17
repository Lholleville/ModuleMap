/**
 * Created by Loic on 03/11/2017.
 * TODO :
 */

var i_global = 0;
//number of area
var area_count = 0;
var editMode = false;
var polyMode = false;




var App = {
    resetForm : function(){
        $('#href').val('');
        $('#alt').val('');
    },
    resetMessage : function(){
        $('#hrefHelp').html("");
        $('#altHelp').html("");
        $('#nbPointHelp').html("");
    }
};

$(document).ready(function() {
    //$('#zone').css('background-image', 'url("img/memel.png")');
    $('#workshop').hide();
    $('#form').hide();
});


var Point = {
    target : $('#zone'),
    height : $('#zone').height(),
    width : $('#zone').width(),
    pointArray : [],
    pointDrawArray : [],

    addPoint : function(x, y) {
        this.pointArray.push([x, y, i_global]);
    },
    clear : function() {

        this.pointArray.forEach(function(elem){
            $("#" + elem[2]).remove();
        });

        this.pointArray = [];
        this.pointDrawArray = [];
    },
    drawPoint : function(x, y, color, bool, redraw, boolClass) {
        var p = {
            id : i_global,
            img : 'images/point.jpg',
            html : null,
            PosX : null,
            PosY : null,
            style : null,
            setHtml : function (){
               //this.html =  '<img src="'+ this.img + '" alt="point" id="'+ this.id +'" style = " '+this.style+'">';
                this.html = '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" class="modificable" style="position :absolute; left : '+ this.PosX +'px; top : ' + this.PosY + 'px;"> <rect class="'+boolClass+'" x="0" y="0" width="4" height="4" style=" fill:'+ color +'; "  id="'+ this.id +'"/></svg>';
            },
            setPos : function(redraw){
                if(redraw){
                    this.PosX = Math.round(Point.width - (Point.width - x));
                    this.PosY = Math.round(Point.height - (Point.height - y));
                }
                this.PosX = Math.round(Point.width - (Point.width - x) -  15 );
                this.PosY = Math.round(Point.height - (Point.height - y) - 16);
                this.setStyle();
            },
            setStyle : function (){
                this.style =  'position : absolute; top : ' + this.PosY + 'px; left : ' + this.PosX + 'px; display : inline;';
            }
        };

        this.pointDrawArray.push(p);

        p.setPos();
        p.setHtml();
        $('#zone').append(p.html);
        if(bool){
            this.drawLine();
        }


    },
    drawLine : function() {
        var str = "";

        this.pointDrawArray.forEach(function(elem){
            var x = elem.PosX - 15;
            var y = elem.PosY - 70;
            str += x + ',' + y + ' ';
        });

        var html = '<svg xmlns="http://www.w3.org/2000/svg" width="" height="" id="'+area_count+'" class="polygon"><polygon points = "'+ str +'" style=" fill:'+ $('#cp1').val() +'; stroke:'+ $('#cp1').val() +'; opacity:0.3; stroke-opacity: 1; stroke-width: 3px; "></svg>';

        $('#zone .polygon').remove();

        $('#zone').append(html);
    },
    savePolygone : function(){
        $('#zone #' + area_count).attr('class','save');
    },
    changeColor : function(){
        var color = $('#cp1').val();
        //console.log('color : ' + color);
        $('rect').attr('style', 'fill:'+color);
    }
};

var PolygoneArray = {
    polyArray : [],

    stockPoly : function(Polygone){
        this.polyArray.push(Polygone);
    }
};


var Map = {

    target : $('#carte'),
    name : $('#carte').name,
    id : $('#carte').id,
    areaArray : [],

    addArea : function(area){
        console.log(area);
        var toPush = {
            color : area.color,
            alt : area.alt,
            href : area.href,
            coords : area.coords,
            html : area.html,
            shape : area.shape,
            id : area.id
        };

        this.areaArray.push(toPush);
    },

    lol : function() {
        var stringArea = "";
        this.areaArray.forEach(function(area){
            stringArea += area;
        });
        $('#info').html(stringArea);
    },

    // renderObject : function(area) {
    //     var balise = "<p>zone : " + area.html + " | color : " +area.color + " </p>";
    //     $('#data').append(balise);
    // },

    createButtonEdit : function(){
        var area = this.areaArray[this.areaArray.length - 1];
        //console.log(area);
        var html = '<div><p class="btn btn-secondary edit" id="areabuttonw'+ area.id +'" style="background-color: '+ area.color +'">Zone : '+ area.id +'</p></div>';
        $('#data').append(html);
    }
};

var Area = {
    shape : null,
    coords : null,
    href : null,
    alt : null,
    html : null,
    color : null,
    id : null,

    create : function() {
        this.html = '<area shape="'+this.shape+'" coords="'+this.coords+'" alt="'+this.alt+'" href="'+ this.href +'">';
        this.color = $('#cp1').val();
    },

    setCoord : function(points) {

        var string = "";

        for (var i = 0; i < points.length; i++) {
            string += points[i][0] + "," + points[i][1];
            if (i + 1 < points.length) {
                string += ",";
            }
        }
        this.coords = string;
    },

    setUp : function(points) {
        this.shape = $('#shape').val();
        this.href = $('#href').val();
        this.alt = $('#alt').val();
        this.setCoord(points);
        this.id = area_count;
    },

    reset : function(){
        this.shape = null;
        this.href = null;
        this.alt = null;
        this.coords = null;
        this.html = null;
    },
    check : function(pointArray, bool){
        if(bool){
            var href = ($('#href').val().length > 0) ? true : 'Il faut un lien.';
            var alt = ($('#alt').val().length > 0) ? true : 'Il faut une légende.';
            var nbPoint = (pointArray.length >= 3) ? true : 'Définissez au moins trois points.';

            if(href == true && alt == true && nbPoint == true){
                return true;
            }else{
                $('#hrefHelp').html(href);
                $('#altHelp').html(alt);
                $('#nbPointHelp').html(nbPoint);
                return false;
            }
        }else{
            return true;
        }
    }
};
// - 15 px x et - 70 px y
var Edit = {
    regenerate : function(strID){
        console.log(Map.areaArray);
        var id = strID.split('w');
        var area = Map.areaArray[id[1]];
        this.redraw(area);
    },
    redraw : function(area){
        $(".modificable").remove();
        var coords = area.coords.split(',');
        var coordsArray = [];
        for(var i = 0; i < coords.length; i += 2){
            coordsArray.push([coords[i], coords[i + 1]]);
        }
        coordsArray.forEach(function(elem){
            console.log("new" + elem[0], elem[1]);
            Point.drawPoint(elem[0], elem[1], area.color,false,true, "modificablePoint");
        });

    },
    removePoint : function(){
        $(".modificable").remove();
    }
};

//EVENTS

Point.target.click(function (event){
    if(editMode == false){

        Point.addPoint(event.pageX, event.pageY);
        Point.drawPoint(event.pageX, event.pageY, $('#cp1').val(), true, false);
        i_global++;
    }else{
        //code edit mode...
    }

});

$('#zone_create').click(function(event) {
    if(editMode == false){
        PolygoneArray.stockPoly(Point.pointArray);
        if(Area.check(Point.pointArray, false)){
            Area.reset();
            Area.setUp(Point.pointArray);
            Area.create();
            Map.addArea(Area);
            //Map.renderObject(Area);
            Point.clear(Point.pointArray.length);
            App.resetForm();
            App.resetMessage();
            Point.savePolygone();
            Map.createButtonEdit();
            area_count++;
        }
    }
});

$('#polygon_show').click(function(){
    polyMode = !polyMode;
    if(polyMode){
        $(this).attr('class', 'btn btn-warning');
        $(".save").hide();
    }else{
        $(this).attr('class', 'btn btn-secondary');
        $('.save').show();
    }

});

//EDIT EVENTS


$('#edition_mode').on('click', function(){
    editMode = !editMode;

    if(Map.areaArray.length > 0){
        if(editMode){
            $('#zone_create').attr('id', 'zone_save');
            $('#zone_save').html("Sauvegarder zone");
            $(this).attr('class', 'btn btn-success');
            $('p[id*="areabutton"]').click(function(){
                Edit.regenerate($(this).attr('id'));
                $('.modificable').draggable({
                    containment : "#zone"
                });
            });
        }else{
            $('#zone_save').attr('id', 'zone_create');
            $('#zone_create').html("Créer zone");
            Edit.removePoint();
            $(this).attr('class', 'btn btn-danger');
        }
    }else{
        alert('Vous devez avoir défini au moins une zone avant de passer au mode édition');
    }
});



$('#cp1').onchange = function(e){
   console.log(e);
    Point.changeColor();
};


document.onkeydown = function (e){
    e = e || window.event;

    switch(e.keyCode){
        //key enter pressed, create a new polygone into the PolyArray and clear the Zonearray
        case 13 :
            console.log(Map.areaArray);
        break;

        case 75 : //key k pressed

        break;

        case 38 : //key arrow up

        break;
   }

};


//EDIT