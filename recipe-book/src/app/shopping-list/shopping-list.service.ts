import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({ 
    providedIn: 'root' 
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Eggs', 2), 
        new Ingredient('Milk', 1), 
        new Ingredient('Bread', 1)
      ];

      getIngredients() {
        return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.getIngredients()[index];
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      editIngredient(index:number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index:number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}
