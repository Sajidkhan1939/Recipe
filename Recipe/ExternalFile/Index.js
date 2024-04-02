    function viewAllRecipes() {
        $('.recipe-edit-container').hide();
        $('.view-all-recipe-container-heading').show();
        const url = "/Home/GetRecipe";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        };
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    const recipesHTML = data.map(recipe => {
                        return `
        <div class="col-md-4">
            <div class="card mt-4">
                <div class="card-header"><h4>${recipe.Title}</h4></div>
                <div class="card-body">
                    <p class="card-text">${recipe.Ingrediants}</p>
                    <button class="recipe-container-button-Edit" onclick="
                      updaterecipe(${recipe.ID},'${recipe.Title}','${recipe.Ingrediants}')">Edit</button>
                    <button class="recipe-container-button-Delete" onclick="deleteRecipe(${recipe.ID})">Delete</button>
                </div>
            </div>
        </div>`;
                    }).join('');
                    $('.view-all-recipe-container').html(recipesHTML).show();
                } else {
                    $('.view-all-recipe-container').show();
                }
            })
            .catch(err => console.log(err));
    }
    function switchTab() {
        viewAllRecipes();
    }
    function sidebartitles() {
        const url = "/Home/GetRecipe";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        };
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                var oldHtml = `<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="/ExternalFile/Image/recipes-icon-png-2990.png" class="d-inline-block align-text-top" style="width: 30px; height: 24px;"/>
      Recipe
    </a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <div class="sidebar-button">
          <a href="#" onclick="changePage()">Add a New Recipe</a>
        </div>
      </li>
      <li class="nav-item">
        <div class="sidebar-button">
          <a href="#" onclick="switchTab('view-all-recipe-container')">Show All Recipes</a>
        </div>
      </li>
      <li class="nav-item" id="remove-all">
        <div class="sidebar-button">
          <a href="#" onclick="removeAll()">Remove All Recipes</a>
        </div>
      </li>
    </ul>
    <h4 class="list-status">List is Empty</h4>
  </div>
</nav>`;
                var str = "";
                $.each(data, function (i, item) {
                    str += `<div class="sidebar-button">
            <a href="#" onclick="updaterecipe(${item.ID},'${item.Title}','${item.Ingrediants}')">${item.Title}</a>
          </div>`;
                });                
                $('.left').html(oldHtml + str);
            })
            .catch(err => console.log(err));
    }

   function updaterecipe(id, title, ingredients) {
        $("#validatetitle").hide();
        $("#validateingrediants").hide();
        $('.view-all-recipe-container').hide();
        $('.recipe-edit-container').show();
        $('#custId').val(id);
        $('#title_input').val(title);
        $('#recipe_ingrediants').val(ingredients);
   }
 
    function addrecipe() {
        let id = $("#custId").val();
        let title = $("#title_input").val().trim();
        let ingredients = $("#recipe_ingrediants").val().trim();
        if (title === '' || ingredients === '') {
            if (title === '') {
                $("#validatetitle").show();
            } else {
                $("#validatetitle").hide();
            }

            if (ingredients === '') {
                $("#validateingrediants").show();
            } else {
                $("#validateingrediants").hide();
            }
            return; 
        }
        const url = "/Home/AdRecipe";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, title, ingredients })
        };
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                $("#title_input").val('');
                $("#recipe_ingrediants").val('');
                sidebartitles();
                changePage();
                return response.json();
            
            })
            .catch(err => console.log(err))
    }
    function deleteRecipe(id) {
        const url = "/Home/DeleteRecipe";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID: id })
        };
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();

            })
            .then(() => {
                viewAllRecipes();
                sidebartitles();
            })
            .catch(err => console.log(err))
    }
    function removeAll() {
        const url = "/Home/RomoveAll";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                $('.view-all-recipe-container').html('<h2 class="view-all-recipe-container-heading">Recipe List Empty</h2>');
                sidebartitles();
            })
            .catch(err => console.log(err))
    }
    function changePage() {
        $('.recipe-edit-container').show();
        $('.view-all-recipe-container').hide();
        $("#title_input").val('');
        $("#recipe_ingrediants").val('');
    }

$(document).ready(function () {
    $("#validatetitle").hide();
    $("#validateingrediants").hide();
        $("#cancel").click(function () {
            $("#title_input").val('');
            $("#recipe_ingrediants").val('');
            $("#validatetitle").hide();
            $("#validateingrediants").hide();
        });
        sidebartitles();
});