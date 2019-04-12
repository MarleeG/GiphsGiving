const log = console.log;

$(function () {
    // 'use strict';
    var MY_KEY = undefined;
    var API_KEY = undefined;

    let topics = [`Nipsey Hussle`, `J Cole`, `Kendrick Lamar`, `Beyonce`, `Rihanna`];
    $.post("/", (data) => {
        MY_KEY = data.MY_KEY;
        API_KEY = data.API_KEY;

        if (MY_KEY) {
            displayGiphs(displayRandomTopic(topics));
        }

    });

    // Create a function that displays all the topics
    // This will display all the topics in the topics array
    function displayButtons(topicsArray) {
        topicsArray.forEach((topic) => {
            let button = $(`<button type="button" class="btn btn-dark topic_button">${topic}</button>`);
            $(`.topics_col`).append(button);
        });
    }

    displayButtons(topics);

    // Topic adder button
    $('#topic_adder_button').click((event) => {
        // prevents page from refreshing
        event.preventDefault();

        // assigns the value of the user input to userInput
        let userInput = $('#topic_adder_input').val();

        // Adds new topic to topics array
        if (userInput) {
            topics.push(userInput);

            // removes all topic buttons displayed on the screen
            $('.topic_button').remove();

            // Displays all buttons in topics array
            displayButtons(topics);

            // Empties Value in input 
            $('#topic_adder_input').val('');
        }

    });

    // Topic buttons
    $(document).on('click', '.topic_button', (event) => {
        // Grabs value of the button topic clicked on
        let { innerHTML } = event.target;
        displayGiphs(innerHTML);
    })

    // This will display a random topic when the page initially loads
    // this returns a random topic 
    function displayRandomTopic(topicsArray) {
        let randomTopic = Math.floor(Math.random() * topicsArray.length);
        return topicsArray[randomTopic];
    }

    function displayGiphs(topicChosen) {

        if (MY_KEY) {
            console.log(`display giphs..`);
            console.log(API_KEY);

            // https://api.giphy.com/v1/gifs/search?q=${topicChosen}&api_key=${MY_KEY}&limit=10/
            // let stringsss = 'https://api.giphy.com/v1/gifs/search?q=' + topicChosen + '&' + 'api_key=' + MY_KEY + '&'+ 'limit=10/'

            // fetch(stringsss)
            //     .then(function (giphs) {
            //         $('.giph_div').remove();

            //         let list_of_giphs = giphs.data;

            //         list_of_giphs.forEach((giph) => {
            //             let image_still = giph.images.original_still.url;
            //             let image_animated = giph.images.downsized.url;
            //             let giph_rating = giph.rating;

            //             // Giph Image
            //             let image = $(`<img class='giph'>`);
            //             image.attr('data-still', image_still);
            //             image.attr('id', giph.id);
            //             image.attr('data-animated', image_animated);
            //             image.attr('data-status', 'paused')
            //             image.attr('alt', giph.title);
            //             image.attr('src', image_still);

            //             let div = $(`<div class="d-inline-block p-2 text-black giph_div">`);
            //             div.append(image);
            //             div.append(`<p>Rated: ${giph_rating}</p>`);

            //             $(`.giphs`).append(div);
            //         });
            //     });


            
            if (topicChosen.indexOf(' ') >= 0) {
                topicChosen = topicChosen.replace(' ', '+');
                log(topicChosen);
            } else {
                log(topicChosen);
            }


            // RUNNER UP
            let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topicChosen + '&' + 'api_key=' + MY_KEY + '&' + 'limit=10/'

            $.get(queryURL, function (giphs) {
                // Note:
                // downsized is moving giph
                // original_still is the paused giph
                $('.giph_div').remove();

                let list_of_giphs = giphs.data;

                list_of_giphs.forEach((giph) => {
                    let image_still = giph.images.original_still.url;
                    let image_animated = giph.images.downsized.url;
                    let giph_rating = giph.rating;

                    // Giph Image
                    let image = $(`<img class='giph'>`);
                    image.attr('data-still', image_still);
                    image.attr('id', giph.id);
                    image.attr('data-animated', image_animated);
                    image.attr('data-status', 'paused')
                    image.attr('alt', giph.title);
                    image.attr('src', image_still);

                    let div = $(`<div class="d-inline-block p-2 text-black giph_div">`);
                    div.append(image);
                    div.append(`<p>Rated: ${giph_rating}</p>`);

                    $(`.giphs`).append(div);
                });

            });
            // RUNNER UP





            // ORIGINAL COPY
            // END
            // $.ajax({
            //     url: `https://api.giphy.com/v1/gifs/search?q=${topicChosen}&api_key=${MY_KEY}&limit=10`,
            //     context: document.body
            // }).done(function (giphs) {
            //     // Note:
            //     // downsized is moving giph
            //     // original_still is the paused giph
            //     $('.giph_div').remove();

            //     // first giph = giphs.data[0].images
            //     let list_of_giphs = giphs.data;

            //     list_of_giphs.forEach((giph, i) => {
            //         let image_still = giph.images.original_still.url;
            //         let image_animated = giph.images.downsized.url;
            //         let giph_rating = giph.rating;

            //         // Giph Image
            //         let image = $(`<img class='giph'>`);
            //         image.attr('data-still', image_still);
            //         image.attr('id', giph.id);
            //         image.attr('data-animated', image_animated);
            //         image.attr('data-status', 'paused')
            //         image.attr('alt', giph.title);
            //         image.attr('src', image_still);

            //         let div = $(`<div class="d-inline-block p-2 text-black giph_div">`);
            //         div.append(image);
            //         div.append(`<p>Rated: ${giph_rating}</p>`);

            //         $(`.giphs`).append(div);
            //     });
            // });
            // FINISH
        }

    }

    $(document).on('click', 'img.giph', (event) => {
        let { id } = event.target;
        let data_status = $(`#${id}`).attr('data-status');
        let animated_src = $(`#${id}`).attr('data-animated');
        let still_src = $(`#${id}`).attr('data-still');

        // if giph is paused then play it
        if (data_status === 'paused') {

            $(`#${id}`).attr('src', animated_src);
            $(`#${id}`).attr('data-status', 'play');

        } else if (data_status === 'play') {
            // pause giph
            $(`#${id}`).attr('src', still_src);
            $(`#${id}`).attr('data-status', 'paused');
        }
    });
});