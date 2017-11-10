/**
 * Created by Loic on 03/11/2017.
 */
document.getElementById('file-5').onchange = function (e) {
    loadImage(
        e.target.files[0],
        function (img) {
            $('#zone').append(img);
            $('#upload_img').hide();
            $('#workshop').show();
            $('#zone').width(img.width);
            $('#zone').height(img.height);
            $('#form').show();

        },
        {maxWidth: 600} // Options
    );

    // var preview =  $('#test-1'); //selects the query named img
    // var file    = e.target.files[0];
    // var reader  = new FileReader();
    //
    // reader.onloadend = function () {
    //     preview.src = reader.result;
    // }
    //
    // if (file) {
    //     reader.readAsDataURL(file);//reads the data as a URL
    // } else {
    //     preview.src = "";
    // }
};
