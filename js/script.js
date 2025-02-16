// Meal Plan Generator
function generateMealPlan(dietType) {
    const meals = {
        vegan: [
            { name: "Vegan Buddha Bowl", calories: 400, ingredients: ["quinoa", "avocado", "tofu", "spinach"] },
            { name: "Vegan Tacos", calories: 300, ingredients: ["corn tortillas", "beans", "avocado", "tomato"] }
        ],
        keto: [
            { name: "Keto Chicken Salad", calories: 500, ingredients: ["chicken", "lettuce", "avocado", "olive oil"] },
            { name: "Keto Zucchini Noodles", calories: 350, ingredients: ["zucchini", "parmesan", "cream cheese"] }
        ]
    };

    const selectedMeals = meals[dietType] || [];

    const mealPlanContainer = document.querySelector('.meal-plan-list');
    mealPlanContainer.innerHTML = '';  // Clear previous meal plans

    selectedMeals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal-item');
        mealDiv.innerHTML = `
            <h3>${meal.name}</h3>
            <p>Calories: ${meal.calories}</p>
            <ul>
                ${meal.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <button class="btn">Add to Plan</button>
        `;
        mealPlanContainer.appendChild(mealDiv);
    });
}

// Event listener for diet selection
document.querySelector('#diet-select').addEventListener('change', function() {
    const dietType = this.value;
    generateMealPlan(dietType);
});

// Ingredient Tracker
function trackIngredients() {
    const ingredientInput = document.querySelector('#ingredient-input');
    const ingredients = ingredientInput.value.split(',').map(ingredient => ingredient.trim());

    // Simulate API response
    const recipes = [
        { name: "Chicken Salad", ingredients: ["chicken", "lettuce", "tomato"] },
        { name: "Vegan Tacos", ingredients: ["corn tortillas", "beans", "avocado"] }
    ];

    const filteredRecipes = recipes.filter(recipe => 
        ingredients.every(ingredient => recipe.ingredients.includes(ingredient))
    );

    displayRecipes(filteredRecipes);
}

function displayRecipes(recipes) {
    const recipeContainer = document.querySelector('.recipe-list');
    recipeContainer.innerHTML = '';  // Clear previous recipes

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-item');
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            <button class="btn">View Recipe</button>
        `;
        recipeContainer.appendChild(recipeDiv);
    });
}

// Event listener for ingredient input
document.querySelector('#ingredient-button').addEventListener('click', trackIngredients);

// Geolocation Functionality
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Simulate fetching nearby restaurants
    fetchNearbyRestaurants(latitude, longitude);
}

function showError(error) {
    alert("Error fetching location: " + error.message);
}

function fetchNearbyRestaurants(latitude, longitude) {
    const restaurants = [
        { name: "Restaurant A", description: "Vegan-friendly dishes", image: "https://via.placeholder.com/150" },
        { name: "Restaurant B", description: "Best chicken meals in town", image: "https://via.placeholder.com/150" }
    ];

    const restaurantContainer = document.querySelector('.restaurant-list');
    restaurantContainer.innerHTML = '';  // Clear previous restaurants

    restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.classList.add('restaurant-item');
        restaurantDiv.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.description}</p>
            <button class="btn">Order Now</button>
        `;
        restaurantContainer.appendChild(restaurantDiv);
    });
}

// Trigger geolocation function when the user clicks the button
document.querySelector('#geolocation-btn').addEventListener('click', getUserLocation);
