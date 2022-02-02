/**
 * When the user clicks on a 'clickable-item', he is redirected to the webpage referenced by its 'data-link' attribute.
 */
document.querySelectorAll('.clickable-item').forEach(item => {
    item.addEventListener('click', () => {
        location.href = item.getAttribute('data-link');
    });
});

/**
 * When the user clicks on a 'delete-button', the current resource is deleted.
 */
 document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', () => {
        location.hash = '';
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', window.location.href, false);
        xhr.send();
    });
});

/**
 * Filters all 'searchable-item' using the given text.
 * 
 * @param {string} text The filter text
 */
 function searchAndFilterItems(text) {
	let searchInputs = text.split(" ");
	let searchableItems = document.querySelectorAll('.searchable-item');
    let displayedItemsCount = searchableItems.length;
	search:
	for (let i = 0; i < searchableItems.length; i++) {
		for (let j = 0; j < searchInputs.length; j++) {
            if (searchInputs[j].startsWith('-')) {
                if ((searchInputs[j].length > 1) && (searchableItems[i].textContent.toUpperCase().indexOf(searchInputs[j].substring(1).toUpperCase()) >= 0)) {
                    searchableItems[i].style.display = 'none';
                    displayedItemsCount--;
                    continue search;
                }
            } else {
                if (searchableItems[i].textContent.toUpperCase().indexOf(searchInputs[j].toUpperCase()) < 0) {
                    searchableItems[i].style.display = 'none';
                    displayedItemsCount--;
                    continue search;
                }
            }
		}
		searchableItems[i].style.display = '';
	}
    return displayedItemsCount;
}

/**
 * When the user adds some text in the 'search-field', this text is used to filter non-matching elements on the page.
 */
if (document.getElementById('search-field') != undefined) {
    document.getElementById('search-field').addEventListener('keyup', (event) => {
        let displayedItemsCount = searchAndFilterItems(event.target.value);
        document.getElementById('search-count').textContent = displayedItemsCount;
    });
}

/**
 * Sorts an HTML table
 * 
 * @param {HTMLTableElement} table The table to sort 
 * @param {number} column The index of the column to sort 
 * @param {boolean} asc Determines if the sorting will be in ascending order 
 */
 function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        let aCol = a.querySelector(`td:nth-child(${ column + 1 })`);
        let bCol = b.querySelector(`td:nth-child(${ column + 1 })`);

        let aColText = aCol.getAttribute('data-value') || aCol.textContent.trim();
        let bColText = bCol.getAttribute('data-value') || bCol.textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    table.querySelector(`th:nth-child(${ column + 1 })`).classList.toggle('th-sort-asc', asc);
    table.querySelector(`th:nth-child(${ column + 1 })`).classList.toggle('th-sort-desc', !asc);
}

document.querySelectorAll('.sortable-table th').forEach(headerCell => {
    headerCell.addEventListener('click', () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscdending = headerCell.classList.contains('th-sort-asc');
        
        sortTableByColumn(tableElement, headerIndex, !currentIsAscdending);
    });
});
