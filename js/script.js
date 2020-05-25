const listItems = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

/*
	-Creates a funtion to show list items based on the listItems array and rhe pagination like clicked. 
	-page is set to an intial value of 1 so only the first 10 items show on page load.
*/

const showPage = ( list, page ) =>  {
	
	//Creates a start and end value used to determin which list items to show.
	let startIndex = (page * itemsPerPage) - itemsPerPage;
	let endIndex = page * itemsPerPage;

	/*
		Loops through list items and sets the display value of the list items to 'block'  or 'none' based on
		start and end index values.
	*/
	for ( i = 0; i < list.length; i++) {

		if ( i >= startIndex && i < endIndex ){
			list[ i ].style.display = 'block';
		} else {
			list[ i ].style.display = 'none';
		}

	}

}

/*
	Creates function that builds the DOM structure of the pagination links. This functions dynamically
	adds pagination links based on the number of list items present on the webpage. 
*/
const appendPageLinks = (list) => {
	const ul = document.createElement( 'ul' );
	const div = document.createElement( 'div' );
	const container = document.querySelector( '.page' );
	const pageLinks = Math.ceil(list.length / itemsPerPage);
	
	//creating the pagination container and appending a <ul>
	container.appendChild(div);
	div.className = 'pagination';	
	div.appendChild(ul);
	
	//creating pagination links and using for loop to add links based on pageLinks calculation
	for ( i = 1; i <= pageLinks; i++ ) {
		const a = document.createElement('a');
		const li = document.createElement( 'li' );
				
		ul.appendChild(li);
		li.appendChild(a).innerHTML = i;
		a.href = '#';

		//Adds 'active' class to first anchor tag initally
		if ( i ===1 ) {
			a.className = 'active';
		} 
		
	}
	
	//Selecting all list items <a>'s that are grandchildren on the <ul> within <div> with .pagination class
	const paginationAnchors = document.querySelectorAll( '.pagination ul li a' );
	
	//Looping through <li>'s and selecting <a>'s within them
	for (i = 0; i < paginationAnchors.length; i++) {
		
		//adds an event listener to perform actions based on the pagination link selected
		paginationAnchors[ i ].addEventListener('click', (e) => {
			const targetAnchor = e.target;
			const page = parseInt(targetAnchor.textContent);
			
			//Adds active class to pagination link selected
			if ( targetAnchor.className = ' ' ) {
				targetAnchor.classList.add('active');
			} 
			
			/*
				-Removes active class from all but the selected pagination link
				-Adds # class to all pagination links except the one selected
			*/
			for ( i = 0; i < paginationAnchors.length; i++ ) {
			
				if ( paginationAnchors[ i ] !== e.target ){
					paginationAnchors[ i ].classList.remove('active');
				}
			
			}
			
			//Calls the showPage function to alter page base on selected pagination link
			showPage(listItems, page);
			
		});
		
	}

	return div;

}

//Inital function call to hide all but first 10 list items.
showPage(listItems, 1);

//Calls appendPageLinks function to create pagination and hide listItems 
appendPageLinks(listItems);

