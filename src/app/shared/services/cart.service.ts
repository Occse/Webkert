import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
  ) {
  }

  loadBoughtTickets(collectionName: string): Observable<Array<any>> {
    return this.afs.collection<any>(collectionName).valueChanges();
  }
  async PayTickets(collectionName: string): Promise<void> {
    const qry: firebase.firestore.QuerySnapshot<unknown> = await this.afs.collection(collectionName).ref.get();
    qry.forEach((doc: any) => {
      doc.ref.delete();
    });
  }
}
