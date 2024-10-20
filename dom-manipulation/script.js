// Array to store quotes with their categories
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: 'The only limit to our realization of tomorrow is our doubts of today.', category: 'Motivation' },
  { text: 'Do not watch the clock. Do what it does. Keep going.', category: 'Inspiration' },
  { text: 'Act as if what you do makes a difference. It does.', category: 'Motivation' },
  { text: 'Success is not the key to happiness. Happiness is the key to success.', category: 'Happiness' }
];

// Initialize selected category filter from localStorage or default to 'all'
let selectedCategory = localStorage.getItem('selectedCategory') || 'all';

// Populate categories dynamically in the dropdown
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  
  // Clear existing options except "All Categories"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  // Extract unique categories from quotes array
  const categories = [...new Set(quotes.map(quote => quote.category))];
  
  // Create options for each unique category
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Set the dropdown to the last selected category
  categoryFilter.value = selectedCategory;
}

// Display quotes based on the selected category
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter');
  const selectedCategory = categoryFilter.value;
  
  // Save selected category to localStorage
  localStorage.setItem('selectedCategory', selectedCategory);
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  // Filter quotes based on selected category
  const filteredQuotes = quotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);
  
  // Display each quote
  filteredQuotes.forEach(quote => {
    const quoteElem = document.createElement('p');
    quoteElem.textContent = quote.text;
    quoteDisplay.appendChild(quoteElem);
  });
}

// Add a new quote and update the dropdown with the new category
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    
    // Save quotes to localStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Re-populate categories and filter quotes
    populateCategories();
    filterQuotes();
  } else {
    alert('Please enter both a quote and a category.');
  }

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Export quotes to JSON file
function exportQuotes() {
  const json = JSON.stringify(quotes);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    filterQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize the application
window.onload = function() {
  populateCategories();
  filterQuotes();
  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
};
