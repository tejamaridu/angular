import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({ 
    providedIn: 'root' 
})
export class ShoppingListService {
    ingredientAdded = new EventEmitter<Ingredient>();

    private ingredients: Ingredient[] = [
        new Ingredient('Eggs', 2), 
        new Ingredient('Milk', 1), 
        new Ingredient('Bread', 1)
      ];

      getIngredients() {
        return this.ingredients.slice();
      }
}
