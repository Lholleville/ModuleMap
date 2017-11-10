/**
 * Created by Loic on 03/11/2017.
 * TODO :
 */

var i_global = 0;
var area_count = 0;

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

        // for(var nbPoint = 0; nbPoint < nb; nbPoint++){
        //     $("#" + i_global).hide();
        // }
        this.pointArray = [];
        this.pointDrawArray = [];
    },
    drawPoint : function(x, y) {

        var p = {
            id : i_global,
            img : 'images/point.jpg',
            html : null,
            PosX : null,
            PosY : null,
            style : null,
            setHtml : function (){
               //this.html =  '<img src="'+ this.img + '" alt="point" id="'+ this.id +'" style = " '+this.style+'">';
                this.html = ' <svg xmlns="http://www.w3.org/2000/svg" width="" height=""> <rect x="' + this.PosX + '" y="' + this.PosY + '" width="4" height="4" style=" fill:'+ $('#cp1').val() +'; "  id="'+ this.id +'"/></svg>';
            },
            setPos : function(){
                this.PosX = Math.round(Point.width - (Point.width - x) - 15 );
                this.PosY = Math.round(Point.height - (Point.height - y) - 70);
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
        this.drawLine();

    },
    drawLine : function() {
        console.log($('#zone .polygon').attr('class'));
        var str = "";

        this.pointDrawArray.forEach(function(elem){
            str += elem.PosX + ', ' + elem.PosY + ' ';
        });

        var html = '<svg xmlns="http://www.w3.org/2000/svg" width="" height="" id="'+area_count+'" class="polygon"><polygon points = "'+ str +'" style=" fill:'+ $('#cp1').val() +'; stroke:'+ $('#cp1').val() +'; opacity:0.3; stroke-opacity: 1; stroke-width: 3px; "></svg>';

        $('#zone .polygon').remove();

        $('#zone').append(html);
    },
    savePolygone : function(){
        $('#zone #' + area_count).attr('class','save');
    },
    changeColor : function(){
        console.log('change');
        $('rect').attr('style', 'fill:'+$('#cp1').val());
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
    },

    printArea : function() {
        var stringArea = "";
        this.areaArray.forEach(function(area){
            stringArea += area;
        });
        $('#info').html(stringArea);
    },

    renderObject : function(area) {
        var balise = "<p>zone : " + area.html + " | color : " +area.color + " </p>";
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
    color : null,

    create : function() {
        this.html = 'area shape="'+this.shape+'" coords="'+this.coords+'" alt="'+this.alt+'" href="'+ this.href +'"';
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
    i_global++;
});

$('#zone_create').click(function(event) {
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
        Point.savePolygone();
        area_count++;
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


