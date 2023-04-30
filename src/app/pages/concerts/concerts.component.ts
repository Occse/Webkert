import {Component, OnInit} from '@angular/core';
import {ConcertsService} from '../../shared/services/concerts.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AuthService} from "../../shared/services/auth.service";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
var uid: string;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
  }
});
@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent implements OnInit {
  tickets!: any[][];
  constructor(private concertsService: ConcertsService, private firestore: AngularFirestore) { }
  ngOnInit(): void {
    this.concertsService.loadTickets().subscribe(data => {
      this.tickets=[][5];
      this.tickets=data.map(function (obj) {
        return Object.keys(obj).sort().map(function (key) {
          return obj[key];
        });
      }).sort();
      for (let i = 0; i < this.tickets.length; i++) {
        this.tickets[i][4]=this.tickets[i][4].toDate();
      }
    });
  }

  public addToCart($event: MouseEvent, ticket: any[]) {
    this.firestore.collection(uid).add({
      field: ticket
    });
  }
}
