import {Component, OnInit} from '@angular/core';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {CartService} from "../../shared/services/cart.service";

const auth = getAuth();
var uid: string;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
  }
});

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  tickets!: any[][];
  uid!: string;
  empty!:boolean;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    auth;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.cartService.loadBoughtTickets(this.uid).subscribe(data => {
          this.tickets = [][5];
          this.tickets = data.map(function (obj) {
            return Object.keys(obj).sort().map(function (key) {
              return obj[key];
            });
          }).sort();
          for (let i = 0; i < this.tickets.length; i++) {
            this.tickets[i][0][4] = this.tickets[i][0][4].toDate();
            this.empty=true;
          }
        });
      }
    });
  }


  payTickets() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.cartService.PayTickets(user.uid);
        this.empty=false;
      }
    });
  }
}
