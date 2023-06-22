//create a taskboard's model
let data = localStorage.getItem('boards');
//if it doestn't save, then render a start object
if(data == null) {
   data = {
        "boards":[
            {
                "title":"Mark",
                "columns":[
                    {
                        "title":"Tasks",
                        "cards":[
    
                        ]
                    }
                ]
            }
        ]
    };
} else {
    data = JSON.parse(data); 
}

let wallpapers = [
    'https://prostecki.github.io/WallpapersHD/img/1.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/2.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/3.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/4.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/5.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/6.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/7.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/8.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/9.jpeg',
    'https://prostecki.github.io/WallpapersHD/img/animals1.jpeg'
];




renderBoards();

//function of saving
function save() {
    //codding data to JSON (because we can save only string on LocalStorage)
    let dataJson = JSON.stringify(data);

    //save to LocalStorage
    localStorage.setItem('boards', dataJson);
}

//function of rendering boards
function renderBoards() {
    //get templates
    let tmpl_board = document.getElementById('tmpl-board').innerHTML;
    let tmpl_column = document.getElementById('tmpl-column').innerHTML;
    let tmpl_card = document.getElementById('tmpl-card').innerHTML;

    //declare a container for boards
    let container = document.getElementById('boards');

    // clear boards
    container.innerHTML = '';

    for (let i = 0; i < data['boards'].length; i++) {

    //make html of columns of a one board
    let boardColumns = '';

        for (let j = 0; j < data['boards'][i]['columns'].length; j++) {

            //make html cards of column
            let columnCards = '';

            for(let k = 0; k < data['boards'][i]['columns'][j]['cards'].length; k++ ) {

                //html of one card
                cardsHtml = tmpl_card.replace('${card_header}', data['boards'][i]['columns'][j]['cards'][k]['title'])
                                     .replace('${columnNumber}', j)
                                     .replace('${cardNumber}', k)
                                     .replace('${card_content}', data['boards'][i]['columns'][j]['cards'][k]['description']);

                //add a text of card to cards of COLUMNS
                columnCards += cardsHtml;
            }

            //html of one of column
            columnHtml = tmpl_column.replace('${column_header}', data['boards'][i]['columns'][j]['title'])
                                    .replace('${columnNumber}', j)
                                    .replace('${columnNumber}', j)
                                    .replace('${column_content}', columnCards);

            //add a text of COLUMN to columns of BOARD
            boardColumns += columnHtml;
        }

        container.innerHTML += tmpl_board.replace('${board_header}', data['boards'][i]['title'])
                                         .replace('${board_background}', data['boards'][i]['background'])
                                         .replace('${board_background}', data['boards'][i]['background'])
                                         .replace('${boardNumber}', i)
                                         .replace('${boardNumber}', i)
                                         .replace('${board_content}', boardColumns);
    }
}

//rename boards
function boardRename(number){
    
    //declare
    let name = event.target.value;

     //rewrite name of column in model
     data['boards'][number]['title'] = name;

     save();

}

//change a background
function boardChangeBackground(number) {

    //get a link for background
    let background = event.target.value;

    //update background in model
    data['boards'][number]['background'] = background;

    //save
    save();

    //renderboards
    renderBoards();
}

//function of create a column
function columnAdd() {
    //create an empty column
    let column = {
        "title":"New column",
        "cards":[]
    };
    
    //add a column on the board
    data['boards'][0]['columns'].push(column);

    //run a model in console
    console.log(data);

    // rerender boards
    renderBoards();

    save();
}

//rename a column
function columnRename(number) {

    //declare an input's value
    let name = event.target.value;

    //rewrite name of column in model
    data['boards'][0]['columns'][number]['title'] = name;

    //save
    save();
    
}

//function for deleting columns
function columnDelete(number) {

    //ask to confirm
    let ok = confirm('Do you really want to delete?');

    if (ok) {
    //delete a column from a model
    data['boards'][0]['columns'].splice(number, 1);
    //save
    save();
    //re-render
    renderBoards();

    }
}

//function for add a card (task)
function cardAdd() {
    
    //declare an empty card
    let card = {};

    //get a content of text field
    let title = document.getElementById('cardTitle').value; //.value - we get a value, instead of element
    let description = document.getElementById('cardDescription').value; //same

    //fill a card with values
    card['title'] = title;
    card['description'] = description;

    //add a card in the model
    data['boards'][0]['columns'][0]['cards'].push(card);

    //run a model in console
    console.log(data);

    //rerender boards
    renderBoards();

    save();
}


//declare form with DOM
const form = document.querySelector('.cardFormAdd');

//function of appearing card's form
function appearFormCard() {

    
    //after click, adding class with method classList.add
    form.classList.add('activeForm');
}

function closeForm() {

    let closeButton = document.querySelector('.closeForm');

    closeButton.addEventListener('click', () => {
        form.classList.remove('activeForm');
    })

}


//delete card
function cardDelete(columnNumber, cardNumber) {

    //ask to confirm
    let ok = confirm('Do you really want to delete a card?');

    if (ok) {

    //delete a column from a model
    data['boards'][0]['columns'][columnNumber]['cards'].splice(cardNumber, 1);

    //save
    save();

    //re-render
    renderBoards();

    }
}   

// const buttonCard = document.getElementById('cardAdd');

// buttonCard.addEventListener('click', cardAdd); 

// console.log(buttonCard);

//declare windowCatalog with selector
const windowCatalog = document.querySelector('.wallpapersCatalog');

//open a window with images of wallpapers
function openCatalogWallpapers() {

    //Use a method classList toggle with class during click
    windowCatalog.classList.toggle('appearCatalogWallpapers');

}

const tmplBoard = document.getElementById('tmpl-board');

for (let i = 0; i < wallpapers.length; i++) {

    //declare img with method 'createElement'
    const img = document.createElement('img');

    //declare img with source - wallpapers[i]
    img.src = wallpapers[i];

    //use a window for wallpapers and add elements with method 'appendChild'
    windowCatalog.appendChild(img);

}