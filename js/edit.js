/**
 * Created by Loic on 13/11/2017.
 */

var j = 0;

$('#click').click(function(){

    $('.edit').append('<p id="area'+ j + '" class="btn btn-secondary">ISSOU '+ j +'</p>');

    $("p[id*='area']").click(function(){
        console.log($(this).attr('id'));
    });
    j++;

});


