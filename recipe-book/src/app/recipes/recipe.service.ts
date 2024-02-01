import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService){
  }

  private recipes: Recipe[] = [
    new Recipe(
      1,
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
      2,
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

  
  getRecipe(index: number): Recipe {
    // var recipe: Recipe;
    // this.recipes.forEach((r1) => {
    //   if(r1.id === id) {
    //     recipe = r1;
    //   }
    // })
    // return recipe;
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
