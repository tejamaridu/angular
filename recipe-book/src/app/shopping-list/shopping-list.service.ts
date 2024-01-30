import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({ 
    providedIn: 'root' 
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Eggs', 2), 
        new Ingredient('Milk', 1), 
        new Ingredient('Bread', 1)
      ];

      getIngredients() {
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}
