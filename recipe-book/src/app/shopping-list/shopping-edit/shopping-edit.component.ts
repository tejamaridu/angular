import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  providers: [LoggingService]
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  selectedIngredient;

  constructor(private logService: LoggingService, private shoppingService: ShoppingListService){
  }

  onAdd() {
    this.selectedIngredient = new Ingredient(this.nameInput.nativeElement.value, Number(this.amountInput.nativeElement.value));
    this.shoppingService.ingredientAdded.emit(this.selectedIngredient);
    this.logService.logMessage('New ingredient added')
  }
}
