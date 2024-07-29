const langoption = document.querySelectorAll('select');
const fromTextarea = document.querySelector('.from textarea');
const toTextarea = document.querySelector('.to textarea');

langoption.forEach((selectElement, index) => {
    for (let code in language) {
        let selected = '';
        if (index === 0 && code === "en-GB") {
            selected = "selected";
        } else if (index === 1 && code === "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${code}" ${selected}>${language[code]}</option>`;
        console.log(option);
        selectElement.insertAdjacentHTML('beforeend', option);
    }
});

fromTextarea.addEventListener('input', function () {
    let content = fromTextarea.value;
    let formContent = langoption[0].value;
    let trasnContent = langoption[1].value;

    let LINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${formContent}|${trasnContent}`;

    fetch(LINK)
        .then(response => response.json())
        .then(data => {
            toTextarea.value = data.responseData.translatedText;
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
});
