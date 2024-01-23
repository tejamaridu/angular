import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService){
  }

  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'Pizza is a dish made with cheese, dough',
      'assets/images/pizza.jpg',
      [
        new Ingredient('Floor', 10),
        new Ingredient('Tomato', 5),
        new Ingredient('Meat', 4),
        new Ingredient('Salt', 2),
      ]
    ),
    new Recipe(
      'Burger',
      'Burger is a dish made with meat, bun',
      'assets/images/burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Chicken Breast', 1),
        new Ingredient('Lettuce', 1),
      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
