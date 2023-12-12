import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Pizza", "Pizza is a dish made with cheese, dough", "assets/images/pizza.jpg"),
    new Recipe("Burger", "Burger is a dish made with meat, bun", "assets/images/burger.jpg")
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { 

  }

  ngOnInit() {
    
  }

  onRecipeSelected(recipe: Recipe): void {
    this.recipeWasSelected.emit(recipe);
    console.log("Emitting recipeWasSelected");
    console.log(recipe);
  }
}
