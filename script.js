document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            // Extract Pokémon data
            const name = data.name.toUpperCase();
            const id = `#${data.id}`;
            const weight = `Weight: ${data.weight}`;
            const height = `Height: ${data.height}`;
            const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
            const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
            const defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
            const specialAttack = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
            const specialDefense = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
            const speed = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
            const types = data.types.map(type => type.type.name.toUpperCase());

            // Update the UI with Pokémon data
            document.getElementById('pokemon-name').textContent = name;
            document.getElementById('pokemon-id').textContent = id;
            document.getElementById('weight').textContent = weight;
            document.getElementById('height').textContent = height;
            document.getElementById('hp').textContent = hp;
            document.getElementById('attack').textContent = attack;
            document.getElementById('defense').textContent = defense;
            document.getElementById('special-attack').textContent = specialAttack;
            document.getElementById('special-defense').textContent = specialDefense;
            document.getElementById('speed').textContent = speed;
            document.getElementById('types').innerHTML = types.map(type => `<div>${type}</div>`).join('');
            document.getElementById('sprite').src = data.sprites.front_default;
        })
        .catch(error => {
            alert(error.message);
            // Clear the displayed data
            document.getElementById('pokemon-name').textContent = '';
            document.getElementById('pokemon-id').textContent = '';
            document.getElementById('weight').textContent = '';
            document.getElementById('height').textContent = '';
            document.getElementById('hp').textContent = '';
            document.getElementById('attack').textContent = '';
            document.getElementById('defense').textContent = '';
            document.getElementById('special-attack').textContent = '';
            document.getElementById('special-defense').textContent = '';
            document.getElementById('speed').textContent = '';
            document.getElementById('types').innerHTML = '';
            document.getElementById('sprite').src = '';
        });
});

