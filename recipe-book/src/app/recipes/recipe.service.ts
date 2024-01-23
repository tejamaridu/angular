import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe("Pizza", "Pizza is a dish made with cheese, dough", "assets/images/pizza.jpg"),
    new Recipe("Burger", "Burger is a dish made with meat, bun", "assets/images/burger.jpg")
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
