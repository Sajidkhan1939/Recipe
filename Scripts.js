var recipes = [
  { id: 1, title: 'Chicken Biryani', ingredients: 'Bread slices Bread slices <br/>1 Tomato (cut into slices)<br/>1 Cucumber (cut into slices)<br/>2 cups Roasted chicken<br/>2 eggs Omelets made with<br/>1/2 cup Mayonnaise<br/>as required Salad leaves<br/>¼ tsp Salt<br/>¾ tsp Black pepper<br/>¾ tsp Mustard powder' },
  { id: 2, title: 'Chinese Rice', ingredients: 'Bread slices Bread slices <br/>1 Tomato (cut into slices)<br/>1 Cucumber (cut into slices)<br/>2 cups Roasted chicken<br/>2 eggs Omelets made with<br/>1/2 cup Mayonnaise<br/>as required Salad leaves<br/>¼ tsp Salt<br/>¾ tsp Black pepper<br/>¾ tsp Mustard powder' },
  { id: 3, title: 'Chicken Tikka', ingredients: 'Bread slices Bread slices <br/>1 Tomato (cut into slices)<br/>1 Cucumber (cut into slices)<br/>2 cups Roasted chicken<br/>2 eggs Omelets made with<br/>1/2 cup Mayonnaise<br/>as required Salad leaves<br/>¼ tsp Salt<br/>¾ tsp Black pepper<br/>¾ tsp Mustard powder' },
  { id: 4, title: 'Tandoori Sandwich', ingredients: 'Bread slices Bread slices <br/>1 Tomato (cut into slices)<br/>1 Cucumber (cut into slices)<br/>2 cups Roasted chicken<br/>2 eggs Omelets made with<br/>1/2 cup Mayonnaise<br/>as required Salad leaves<br/>¼ tsp Salt<br/>¾ tsp Black pepper<br/>¾ tsp Mustard powder' },
];
var idCount = recipes.length;
function viewAllRecipes() {
  $('.recipe-container').remove();
  $('.list-button').remove();
  if (recipes.length == 0) {
    $('.list-status').css('opacity', '1');
  }
  else {
    $('.list-status').css('opacity', '0');
  }
  recipes.map(function (val) {
    var temp = '<div class="recipe-container"><h3 class="recipe-container-heading">' + val.title + '</h3><p>INGREDIENTS</p><p class="recipe-container-content">' + val.ingredients + '</p><button id="" class="recipe-container-button-Edit" onclick="editRecipe(' + val.id + ')">Edit</button><button class="recipe-container-button-Delete" onclick="deleteRecipe(' + val.id + ')">Delete</button></div>';
    $('.view-all-recipe-container').append(temp);
    var temp1 = '<div class="sidebar-button list-button"><a href="#"  onclick="editRecipe(' + val.id + ')">' + val.title + '</a></div>';
    $('.left').append(temp1);
  });
}
viewAllRecipes();
function switchTab(str) {
  if (str === 'recipe-edit-container') {
    $('#recipe-title').val('');
    $('#recipe-ingrediants').val('');
    $('#custId').val('0');
    $('.recipe-edit-heading').text('Add a New Recipe');
    $('#cancel').text('Cancel Recipe');
    $('#save').text('Submit Recipe');
  }

  $('.view-all-recipe-container').css('display', 'none');
  $('.recipe-edit-container').css('display', 'none');
  $('.' + str).css('display', 'block');
}

function editRecipe(tempId) {
  var objIndex = recipes.findIndex((obj => obj.id == tempId));
  $('.view-all-recipe-container').css('display', 'none');
  $('.recipe-edit-container').css('display', 'none');
  $('.recipe-edit-container').css('display', 'block');

  $('.recipe-edit-heading').text('Edit Recipe');
  $('#custId').val(tempId);
  $('#cancel').text('Cancel Edit');
  $('#save').text('Save Edit');
  $('#recipe-title').val(recipes[objIndex].title);
  $('#recipe-ingrediants').val(recipes[objIndex].ingredients.replace(/<br?\/?>/g, "\n"));
}

function submitRecipe() {
  if ($('#recipe-title').val().length == 0 || $('#recipe-ingrediants').val().length == 0) {
    // TODO validation msg
  } else if ($('#custId').val() == 0) {
    idCount++;
    var obj = { id: idCount, title: $('#recipe-title').val(), ingredients: $('#recipe-ingrediants').val().replace(/\n/g, '<br/>') }
    recipes.push(obj);
    viewAllRecipes();
    $('#recipe-title').val('');
    $('#recipe-ingrediants').val('');
  } else {
    var custId = $('#custId').val();
    var objIndex = recipes.findIndex((obj => obj.id == custId));
    recipes[objIndex].title = $('#recipe-title').val();
    recipes[objIndex].ingredients = $('#recipe-ingrediants').val().replace(/\n/g, '<br/>');
    viewAllRecipes();
    $('#recipe-title').val('');
    $('#recipe-ingrediants').val('');
    $('#custId').val('0');
    $('.recipe-edit-heading').text('Add a New Recipe');
    $('#cancel').text('Cancel Recipe');
    $('#save').text('Save Recipe');
  }
}
function removeAll() {
  if (recipes.length != 0) {
    recipes.length = 0;
    viewAllRecipes();
  }
}
function deleteRecipe(custId) {
  if (recipes.length != 0) {
    var objIndex = recipes.findIndex((obj => obj.id == custId));
    if (objIndex > -1) {
      recipes.splice(objIndex, 1);
    }
    viewAllRecipes();
  }
}