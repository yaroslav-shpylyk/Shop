import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private httpClient: HttpClient) {}

  getItems() : void {
    this.httpClient.get('http://localhost:80/api/objects').subscribe();
  }
}
