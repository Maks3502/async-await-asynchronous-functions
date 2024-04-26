const input = document.querySelector('#country-name');
const list = document.querySelector('#countries');
const debounced = _.debounce(async () => {
  const name = input.value;
  if (!name) {
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v2/name/${name}`);
    const data = await response.json();

    if (data.length > 10) {
      PNotify.error({
        text: 'Запит занадто широкий. Будь ласка, введіть більш специфічну назву країни.'
      });
      return;
    }

    list.innerHTML = '';
    data.forEach(country => {
      const li = document.createElement('li');
      li.textContent = country.name;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}, 500);

input.addEventListener('input', debounced);