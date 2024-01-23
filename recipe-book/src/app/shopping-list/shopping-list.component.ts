import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService){
    this.shoppingListService.ingredientAdded.subscribe(
      (ingredient: Ingredient) => this.ingredients.push(ingredient)
    );
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
  }
}
