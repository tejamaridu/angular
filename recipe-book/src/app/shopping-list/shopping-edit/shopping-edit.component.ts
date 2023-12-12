import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  selectedIngredient;

  onAdd() {
    this.selectedIngredient = new Ingredient(this.nameInput.nativeElement.value, Number(this.amountInput.nativeElement.value));
    this.ingredientAdded.emit(this.selectedIngredient);
  }
}
