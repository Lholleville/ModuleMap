/**
 * Created by Loic on 13/11/2017.
 */



$('#click').on('click',function(){
    $('#add').append('<p id="click2">Click me 2</p>');
});

$('#click2').on('click',function(){
   console.log('ok');
});
