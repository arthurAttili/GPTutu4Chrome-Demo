//  Select the "Ask GPT/regenerate" button
const generateButton = document.querySelector('#generate');

// Add a click event to the button
generateButton.addEventListener('click', async () => {

    // Select the value selected in the dropdown box
    const inputType = document.querySelector('#input-type').value;

    // Select the text entered in the text box
    const inputText = document.querySelector('#input').value;

    try {
        //  Select the HTML element to display the result
        const elementResult = document.querySelector('#result');

        // Select the HTML element of the loading image
        const loadingGif = document.querySelector('#loading-gif');

        // Display the loading image
        loadingGif.style.display = 'block';

        // Add the result to the HTML element
        let consultGPT = await apiGPT(inputType, inputText);
        elementResult.value = consultGPT
        navigator.clipboard.writeText(consultGPT);

        // Remove the loading image
        loadingGif.style.display = 'none';

    } catch (e) {
        alert('Error sending request to the GPT API: '+e);
        console.error('Error sending request to the GPT API', e);
    }
})