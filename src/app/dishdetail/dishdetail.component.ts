import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIDs: string[];
  prev: string;
  next: string;

  constructor(private dishService: DishService, private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.dishService.getDishIDs()
      .subscribe((dishIDs) => this.dishIDs = dishIDs);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => { this.dish = dish; this.setPrevNext(dish.id) });
  }

  setPrevNext(dishID: string) {
    const index = this.dishIDs.indexOf(dishID);
    this.prev = this.dishIDs[(this.dishIDs.length + index - 1) % this.dishIDs.length];
    this.next = this.dishIDs[(this.dishIDs.length + index + 1) % this.dishIDs.length];
  }

  goBack(): void {
    this.location.back();
  }

}
