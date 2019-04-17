const log = console.log;

$(document).ready(() => {

    // uncomment these two
    // })
    // $(function () {



    // 'use strict';
    // jQuery.ajaxSetup({ async: false });
    var MY_KEY = undefined;
    var API_KEY = undefined;

    let topics = [`Nipsey Hussle`, `J Cole`, `Kendrick Lamar`, `Beyonce`, `Rihanna`];

    log(`assigning/initializng variables:`);
    // log(`1a | MY_KEY: ${MY_KEY}`);
    log(`1b | API_KEY: ${API_KEY}`);
    log(`1c | topics:${topics}`);
    log(`-------------------------`);


    // jQuery.ajaxSetup({async:false});
    $.post("/", (data) => {
        MY_KEY = data.MY_KEY;
        API_KEY = data.API_KEY;
        log(`2a | Inside post method..`);
        log(`api key ${API_KEY}`);
        // log(`2b | data: ${JSON.stringify(data)}`);
        log(`-------------------------`);

        if (MY_KEY) {
            log(`3a | Inside of post method within conditional statement..`);
            // log(`3b | MY_KEY: ${MY_KEY}`);
            log(`-------------------------`);

            log(`4a | giphs are displaying...`);
            log(`-------------------------`);

            displayGiphs(displayRandomTopic(topics));

            // jQuery.ajaxSetup({ async: false });
        }

    })
    .fail((err) => {
        log(`ERR: ${err}`)
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
        let topicPicked = topicsArray[randomTopic];
        log(`5a | Inside displayRandomTopic function... `);
        log(`5b | Topic: ${topicPicked}`);
        log(`-------------------------`);
        return topicPicked;
    }

    function displayGiphs(topicChosen) {
        log(`6a | displayingGiphs function...`);
        log(`6b | topic should still be...${topicChosen}`);
        // log(`6c | MY_KEY: ${MY_KEY}`);
        log(`6d | API_KEY: ${API_KEY}`);
        log(`-------------------------`);

        if (MY_KEY) {
            log(`7a | if MY_KEY is not undefined then display giphs...`);
            // log(`7b | MY_KEY: ${MY_KEY}`);
            log(`7c | API_KEY: ${API_KEY}`);
            log(`-------------------------`);

            if (topicChosen.indexOf(' ') >= 0) {
                log(`8a | If topic has a space then replace with a +`)
                topicChosen = topicChosen.replace(' ', '+');
                log(`8b | topic is now...${topicChosen}`);
                log(`-------------------------`);

            } else {
                log(`8a | topic does not have a space...`)
                log(`8b | topicChosen...${topicChosen}`);
                log(`-------------------------`);
            }


            // RUNNER UP
            let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topicChosen + '&' + 'api_key=' + MY_KEY + '&' + 'limit=10/'
            log(`9a | query url: ${queryURL}`);
            log(`-------------------------`);

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