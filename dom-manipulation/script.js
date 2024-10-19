// Initial array of quotes
let quotes = [
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
  { text: "The purpose of our lives is to be happy.", category: "Life" },
  { text: "Get busy living or get busy dying.", category: "Motivation" },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  // Select the quote display area
  const quoteDisplay = document.getElementById('quoteDisplay');

  // Update the content of quoteDisplay with the random quote
  quoteDisplay.innerHTML = `
    <p>"${selectedQuote.text}"</p>
    <p><em>- ${selectedQuote.category}</em></p>
  `;
}

// Function to dynamically create the form for adding a new quote
function createAddQuoteForm() {
  // Create form container
  const formContainer = document.createElement('div');
  
  // Create input for the new quote text
  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';
  
  // Create input for the new quote category
  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  
  // Create the button to add the quote
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  
  // Set up the event listener for adding a new quote when the button is clicked
  addButton.onclick = addQuote;
  
  // Append the inputs and button to the form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);
  
  // Append the form container to the body of the page (or a specific container)
  document.body.appendChild(formContainer);
}

// Function to add a new quote
function addQuote() {
  // Get the input values for the new quote and its category
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  // Check if the input fields are not empty
  if (newQuoteText && newQuoteCategory) {
    // Create a new quote object and add it to the quotes array
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);

    // Clear the input fields after adding the quote
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optionally, display the new quote
    showRandomQuote();
  } else {
    alert("Please enter both the quote text and category.");
  }
}

// Event listener for showing a new random quote when the button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Show a random quote when the page first loads
showRandomQuote();

// Call the function to dynamically create the form for adding quotes
createAddQuoteForm();
