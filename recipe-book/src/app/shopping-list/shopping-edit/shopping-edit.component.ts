import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  providers: [LoggingService]
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('slForm', {static: false}) shoppingListForm;
  editSubscription: Subscription;
  editMode: boolean;
  editedItemIndex: number;
  editedIngredient: Ingredient

  constructor(private logService: LoggingService, 
    private shoppingService: ShoppingListService){
  }

  ngOnInit() {
    this.editSubscription = this.shoppingService.startedEditing.subscribe((index) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedIngredient = this.shoppingService.getIngredient(index);
      this.shoppingListForm.setValue({
        'name': this.editedIngredient.name,
        'amount': this.editedIngredient.amount
      })
    });
  }

  onShoppingListSubmit() {
    const ingredient = new Ingredient(this.shoppingListForm.value['name'], this.shoppingListForm.value['amount']);
    if(this.editMode) { 
      this.shoppingService.editIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onDelete() {
    this.onClear();
    this.shoppingService.deleteIngredient(this.editedItemIndex);
  }

  onClear() {
    this.shoppingListForm.reset()
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
