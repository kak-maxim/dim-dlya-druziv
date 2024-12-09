document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-content');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    const API_KEY = 'live_UiXAoQUNcD4lKP6r0USjG3FtbE8hVcgiM2aZtM3G6g1z5uZSAV5ronkzF8KwRKV7';
    
    // Функція для отримання котів з API (зменшуємо limit до 3)
    async function fetchCats() {
        const headers = {
            'x-api-key': API_KEY
        };
        try {
            const response = await fetch(
                'https://api.thecatapi.com/v1/images/search?limit=3',
                { headers }
            );
            const cats = await response.json();
            return cats;
        } catch (error) {
            console.error('Помилка при отриманні даних:', error);
            return [];
        }
    }
    
    // Функція для створення карточки кота
    function createPetCard(cat) {
        return `
            <div class="pet-card">
                <img src="${cat.url}" alt="Кіт">
                <h3>Кіт ${cat.id.slice(0, 5)}</h3>
                <button class="help-button">Допомогти</button>
            </div>
        `;
    }
    
    // Функція для оновлення слайдера
    async function updateSlider() {
        const cats = await fetchCats();
        slider.innerHTML = cats.map(cat => createPetCard(cat)).join('');
    }
    
    // Ініціалізуємо слайдер з котами
    updateSlider();
    
    // Спрощені обробники кліків - просто завантажуємо нові картки
    prevButton.addEventListener('click', updateSlider);
    nextButton.addEventListener('click', updateSlider);
});