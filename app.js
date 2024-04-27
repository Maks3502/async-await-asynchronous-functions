const apiKey = '43066130-5334719edca1429b8c556a89d';
const perPage = 10;
let currentPage = 1;

const imageContainer = document.getElementById('image-container');
const loadMoreButton = document.getElementById('load-more');

async function fetchImages() {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&editors_choice=true&page=${currentPage}&per_page=${perPage}`);
    const data = await response.json();
    return data.hits;
}

async function displayImages() {
    try {
        const images = await fetchImages();
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.previewURL;
            imgElement.classList.add('image-preview');
            imageContainer.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    await displayImages();
});

displayImages();