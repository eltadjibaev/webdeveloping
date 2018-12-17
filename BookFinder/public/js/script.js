function findBook() {
    var userSearch = document.getElementById('userInput').value;
    var bookResult = document.getElementById('result');
    bookResult.innerHTML = '';
    
    $.ajax({
        type: "Get",
        url: "https://www.googleapis.com/books/v1/volumes?q="+userSearch,
        dataType: 'JSON',
        success: function(book){
            console.log(book.items);
           for (var i = 0; i < book.items.length; i++) {
               var wrapperDiv = document.createElement('div');
               wrapperDiv.className = 'media';
               var image = document.createElement('img');
               image.className = 'mr-3';
               image.src = book.items[i].volumeInfo.imageLinks.thumbnail;
               var div = document.createElement('div');
               div.className = 'media-body';
               var header = document.createElement('h3');
               header.className = 'mt-0';
               header.innerHTML = book.items[i].volumeInfo.title;
               var author = document.createElement('h6');
               author.innerHTML = '<b>Author: </b> ' + book.items[i].volumeInfo.authors[0];
               var disc = document.createElement('p');
               disc.innerHTML = book.items[i].volumeInfo.description;
               var publishedDate = document.createElement('p');
               publishedDate.innerHTML = '<em>Published Date: ' + book.items[i].volumeInfo.publishedDate + '</em>';
               var link = document.createElement('a');
               link.href = book.items[i].volumeInfo.previewLink;
               link.innerHTML = 'View More';
               div.appendChild(header);
               div.appendChild(author);
               div.appendChild(publishedDate);
               div.appendChild(disc);
               div.appendChild(link);
               wrapperDiv.appendChild(image);
               wrapperDiv.appendChild(div);
               var line = document.createElement('hr');
               bookResult.appendChild(wrapperDiv);
               bookResult.appendChild(line);
           }
        }
    });
}

