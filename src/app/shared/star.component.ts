import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
    @Input() rating: number ;       //To get information from the parent component
    starWidth: number ;
    @Output() ratingClicked: EventEmitter<string> =       //To send information to the parent container
        new EventEmitter<string>();

    ngOnChanges() : void{
        this.starWidth = this.rating * 86/5;           //Convert the width from the rating depending on the width of the div i.e 86
    }

    onClick(): void{
        // console.log(`The rating ${this.rating} was clicked!`);
        this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);    //We emit this event from here which has to handled by parent component i.e product-list
    }
}