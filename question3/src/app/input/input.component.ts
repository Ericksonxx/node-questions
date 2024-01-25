import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  
import { differenceInMilliseconds, addMonths, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DatePipe]
})

export class InputComponent {
  currentDate: string | null;
  userDate: string | null;
  aliveTime: Age | null;
  isDateValid: boolean = true;

  constructor(private datePipe: DatePipe) {    
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.userDate = this.currentDate;
    this.aliveTime = null;
  }

  // calculate age
  calculate(birthdate: Date): Age {
    const now = new Date();
  
    // time differences
    const milliseconds = differenceInMilliseconds(now, birthdate);
    const seconds = differenceInSeconds(now, birthdate);
    const minutes = differenceInMinutes(now, birthdate);
    const hours = differenceInHours(now, birthdate);
    const days = differenceInDays(now, birthdate);
    const months = differenceInMonths(now, birthdate);
    const years = differenceInYears(now, birthdate);
  
    // remaining units
    const remainingMonths = months % 12; 
    const remainingDays = differenceInDays(now, addMonths(birthdate, years * 12 + remainingMonths));
    const remainingWeeks = Math.floor(remainingDays / 7);
  
    const aliveTime = {
      milliseconds,
      seconds,
      minutes,
      hours,
      days: remainingDays % 7,
      months: remainingMonths,
      weeks: remainingWeeks,
      years,
    };
  
    aliveTime.hours %= 24;
    aliveTime.minutes %= 60;
    aliveTime.seconds %= 60;
  
    return aliveTime;
  }

  // handler for date input
  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedDate = new Date(inputElement.value);

    if (selectedDate > new Date()) {
      console.log('Invalid date. Please select a date on or before today.');
      this.userDate = this.currentDate;
      this.isDateValid = false;
    } else {
      this.userDate = inputElement.value;
      this.isDateValid = true;
    }
  }

  // handler for calculation button
  onCalculation(event: Event): void {
    const userDateAsDate = this.userDate ? new Date(this.userDate) : null;
    
    // input date is valid and then calculate
    if (userDateAsDate) {
      this.aliveTime = this.calculate(userDateAsDate);
      console.log(`Days Lived: ${this.aliveTime.days}`);
    } else {
      console.log('Invalid date.');
    }
  }
}

interface Age {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}
