import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-try',
  imports: [],
  templateUrl: './try.component.html',
  styleUrl: './try.component.sass'
})
export class TryComponent {

  firstName = signal('Harriet');
  lastName = signal <string>('Smith');

  fullName = linkedSignal(() => {
    source: this.firstName
  }
  );

  rollNumber = signal<number>(0)


  constructor() {


  }
  
    
  onIncrement() {
    this.rollNumber.update((value) => value + 1);
  }

}


