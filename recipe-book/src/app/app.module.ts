import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { BetterHighlightDirective } from './directives/better-highlight.directive';
import { HoverHighlightDirective } from './directives/hover-highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { PracticeComponent } from './practice/practice.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './shared/shorten.pipe';
import { FilterPipe } from './shared/filter.pipe';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentEditComponent } from './departments/edit-department/department-edit.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { LoggingInterceptorService } from './interceptors/logging-interceptor.service';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    HoverHighlightDirective,
    UnlessDirective,
    PracticeComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterPipe,
    DepartmentsComponent,
    DepartmentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService,
    multi: true      
  },
  {
    provide: HTTP_INTERCEPTORS, 
    useClass: LoggingInterceptorService,
    multi: true      
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
