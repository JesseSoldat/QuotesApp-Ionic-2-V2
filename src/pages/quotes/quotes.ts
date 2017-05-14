import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
	quoteGroup: {cateogry: string, quotes: Quote[], icon: string}[];

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						public alertCtrl: AlertController,
  						private quotesService: QuotesService ) {
  }

  ngOnInit() {
  	this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote: Quote) {
  	const alert = this.alertCtrl.create({
  		title: 'Add Quote',
  		subTitle: 'Are you sure?',
  		message: 'Are you sure you want to add the quote?',
  		buttons: [
  			{
  				text: 'Yes',
  				handler: () => {
  					this.quotesService.addQuoteToFavorites(selectedQuote);
  				}
  			},
  			{
  				text: 'No',
  				role: 'cancel',
  				handler: () => {

  				}
  			}
  		]
  	});

  	alert.present();
  }

  onRemoveFromFavorites(quote) {

  }


}
