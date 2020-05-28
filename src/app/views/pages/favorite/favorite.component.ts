import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/core/services/item/item.service';
import { tap, map } from 'rxjs/operators';
import { FavoriteService } from 'src/app/core/services/favorite/favorite.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  set = new Set<string>();
  constructor(private itemService: ItemService, private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    // for (let page = 1; page <= 43; page++) {
    //   this.itemService.get([{
    //     url: 'https://www.anapioficeandfire.com/api/characters',
    //     filters: {
    //       name: null,
    //       fromReleaseDate: null,
    //       toReleaseDate: null,
    //     },
    //     page,
    //     pageSize: 50,
    //     resource: 'books'
    //   }]).pipe(tap(data => {
    //     const cultureArray = data.map(item => item.culture);
    //     cultureArray.forEach(element => {
    //       this.set.add(element);
    //     });
  
    //   })).subscribe();
    // }
  }

  submit() {
    const items = Array.from<string>(this.set.keys()).filter(item => item !== '');
    console.log(items);
    // this.favoriteService.add(items);

  }

}
