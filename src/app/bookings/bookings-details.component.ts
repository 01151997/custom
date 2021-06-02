import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data/data.service'
@Component({
  selector: 'app-booking-details',
  templateUrl: './bookings-details.component.html',
  styleUrls: ['./bookings-details.component.scss'],
})
export class BookingDetailsComponent implements OnInit {

  constructor(public data: DataService,
    public fb: FormBuilder) { }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  starRating = 4;
  public minValue = 0;
  public maxValue = 0;
  public workList = [];
  public workListData = [];
  public searchForm: FormGroup;
  public valueNotFound: boolean;
  public transaction=['Mumbai','Delhi','Chennai','Kolkata'];
  public arrival = [ 'New York','Dubai','Delhi','Tokiyo','Weeze']
  ngOnInit(): void {
    console.log(this.data.customAirWay)
    console.log(this.data.value)
    this.workList = this.data.customAirWay
    this.workListData = this.data.customAirWay

    this.searchForm = this.fb.group({
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      date: ['', Validators.required],
      slider: [''],
      sliderTwo:['']
    })
  }
  public onSearch(): void {
    console.log(this.searchForm.value);
    if (this.searchForm.valid) {
      this.workList = this.workListData.filter(data => {
        return data.departure.toString().toLowerCase() === this.searchForm.value.departure.toString().toLowerCase() &&
          data.arrival.toString().toLowerCase() === this.searchForm.value.arrival.toString().toLowerCase()
      })
      console.log(this.workList)
      if (this.workList.length === 0) {
        this.valueNotFound = true;
      } else {
        this.valueNotFound = false;
      }
    }
  }
  public onRefresh(): void {
    this.searchForm.patchValue({
      departure: '',
      arrival: '',
      date: '',
      slider: ''
    })
    this.workList = this.data.customAirWay
    this.valueNotFound = false;
  }
  public sliderStops(): void {
    this.minValue = this.searchForm.value.slider;
    this.maxValue = this.searchForm.value.sliderTwo
    ;
    if(this.searchForm.value.slider !== '' && this.searchForm.value.sliderTwo !== ''){
      this.workList = this.workListData.filter(data => {
        return  data.Cost.toString().toLowerCase() >= this.searchForm.value.slider.toString().toLowerCase() && 
          data.Cost.toString().toLowerCase() <= this.searchForm.value.sliderTwo.toString().toLowerCase();
      })
      console.log(this.workList)
      if (this.workList.length === 0) {
        this.valueNotFound = true;
      } else {
        this.valueNotFound = false;
      }
    }
    
  }
}
