const log = console.log;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(__dirname + '/assets'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', function (req, res) {

    // BEGIN - ENTIRE AJAX CALL
    // $.ajax({
    //     url: `https://api.giphy.com/v1/gifs/search?q=${rose}&api_key=${process.env.MY_KEY}&limit=10`,
    //     context: document.body
    // }).done(function (giphs) {
    //     log(giphs);
        // BEGIN - guts
        // Note:
        // downsized is moving giph
        // original_still is the paused giph
        // $('.giph_div').remove();

        // first giph = giphs.data[0].images
        // let list_of_giphs = giphs.data;

        // list_of_giphs.forEach((giph, i) => {
        //     let image_still = giph.images.original_still.url;
        //     let image_animated = giph.images.downsized.url;
        //     let giph_rating = giph.rating;

            // Giph Image
            // let image = $(`<img class='giph'>`);
            // image.attr('data-still', image_still);
            // image.attr('id', giph.id);
            // image.attr('data-animated', image_animated);
            // image.attr('data-status', 'paused')
            // image.attr('alt', giph.title);
            // image.attr('src', image_still);

            // let div = $(`<div class="d-inline-block p-2 text-black giph_div">`);
            // div.append(image);
            // div.append(`<p>Rated: ${giph_rating}</p>`);

            // $(`.giphs`).append(div);

            // END - guts
        // });
    // });
    // END - AJAX CALL


    res.send({MY_KEY: process.env.MY_KEY});
});

app.listen(PORT);