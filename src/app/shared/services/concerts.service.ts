import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConcertsService {

  collectionName = 'Tickets';

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
  ) {
  }

  loadTickets(): Observable<Array<any>> {
    return this.afs.collection<any>(this.collectionName).valueChanges();
  }
}
