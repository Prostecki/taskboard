let data = {
    "boards":[
        {
            "title":"inordic",
            "columns":[
                {
                    "title":"tasks",
                    "cards":[

                    ]
                }
            ]
        }
    ]
};

renderBoards();

//function of rendering boards
function renderBoards() {
    //get templates
    let tmpl_board = document.getElementById('tmpl-board').innerHTML;
    let tmpl_column = document.getElementById('tmpl-column').innerHTML;
    let tmpl_card = document.getElementById('tmpl-card').innerHTML;

    //declare a container for boards
    let container = document.getElementById('boards');

    for (let i = 0; i < data['boards'].length; i++) {

    //make html of columns of a one board
    let boardColumns = '';

        for (let j = 0; j < data['boards'][i]['columns'].length; j++) {

            //make html cards of column
            let columnCards = '';

            for(let k = 0; k < data['boards'][i]['columns'][j]['cards'].length; k++ ) {

                //html of one card
                cardsHtml = tmpl_card.replace('${card_header}', data['boards'][i]['columns'][j]['cards'][k]['title'])
                                     .replace('${card_content}', data['boards'][i]['columns'][j]['cards'][k]['description']);

                //add a text of card to cards of COLUMNS
                columnCards += cardsHtml;
            }

            //html of one of column
            columnHtml = tmpl_column.replace('${column_header}', data['boards'][i]['columns'][j]['title'])
                                    .replace('${column_content}', columnCards);

            //add a text of COLUMN to columns of BOARD
            boardColumns += columnHtml;
        }

        container.innerHTML += tmpl_board.replace('${board_header}', data['boards'][i]['title'])
                                         .replace('${board_content}', boardColumns);
    }
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
}

const newColumn = document.getElementById('newColumn');
newColumn.addEventListener('click', columnAdd);

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
}

const buttonCard = document.getElementById('cardAdd');

buttonCard.addEventListener('click', cardAdd); 

console.log(buttonCard);