import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/core/services/query/query.service';

declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private bookService: QueryService) { }

  ngOnInit(): void {
    $('.ui.dropdown').dropdown();
    // this.bookService.get().subscribe(books => console.log(books));
  }

}
