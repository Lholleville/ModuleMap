/**
 * Created by Loic on 03/11/2017.
 * TODO :
 */

var i = 0;

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

    addPoint : function(x, y) {
        this.pointArray.push([x, y]);
    },
    clear : function(nb) {
        this.pointArray = [];
        for(var nbPoint = 0; nbPoint < nb; nbPoint++){
            console.log("#" + nbPoint);
            $("#" + nbPoint).hide();

        }
    },
    drawPoint : function(x, y) {

        var p = {
            id : i,
            img : 'img/point.jpg',
            html : null,
            PosX : null,
            PosY : null,
            style : null,
            setHtml : function (){
               this.html =  '<img src="'+ this.img + '" alt="point" id="'+ this.id +'" style = " '+this.style+'">';
            },
            setPos : function(){
                this.PosX = Math.round(Point.width - (Point.width - x));
                this.PosY = Math.round(Point.height - (Point.height - y));
                this.setStyle();
            },
            setStyle : function (){
                this.style =  'position : absolute; top : ' + this.PosY + 'px; left : ' + this.PosX + 'px; display : inline;';
            }
        };
        p.setPos();
        p.setHtml();
        $('#zone').append(p.html);
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
        this.areaArray.push(area.html);
        console.log("area added");
    },

    printArea : function() {
        var stringArea = "";
        this.areaArray.forEach(function(area){
            stringArea += area;
        });
        $('#info').html(stringArea);
    },

    renderObject : function(area) {
        var balise = "<p>zone : " + area.html + "</p>";
        $('#data').append(balise);
    },

    printAera : function(){
        //console.log(this.areaArray);
    }
};

var Area = {
    shape : null,
    coords : null,
    href : null,
    alt : null,
    html : null,

    create : function() {
        this.html = 'area shape="'+this.shape+'" coords="'+this.coords+'" alt="'+this.alt+'" href="'+ this.href +'"';
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
        this.shape = $('#shape option:checked').val();
        this.href = $('#href').val();
        this.alt = $('#alt').val();
        this.setCoord(points);
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

//EVENTS

Point.target.click(function (event){
    Point.addPoint(event.pageX - this.offsetLeft, event.pageY - 16);
    Point.drawPoint(event.pageX - this.offsetLeft, event.pageY - 16);
    i++;
});

$('#zone_create').click(function(event) {
    console.log('click');
    PolygoneArray.stockPoly(Point.pointArray);
    if(Area.check(Point.pointArray, false)){
        Area.setUp(Point.pointArray);
        Area.create();
        Map.addArea(Area);
        Map.renderObject(Area);
        Point.clear(Point.pointArray.length);
        Area.reset();
        App.resetForm();
        App.resetMessage();
        Map.printAera();
    }
});

document.onkeydown = function (e){
    e = e || window.event;

    switch(e.keyCode){
        //key enter pressed, create a new polygone into the PolyArray and clear the Zonearray
        case 13 :

        break;

        case 75 : //key k pressed

        break;

        case 38 : //key arrow up

        break;
   }

};
$('#cp1').colorpicker();


