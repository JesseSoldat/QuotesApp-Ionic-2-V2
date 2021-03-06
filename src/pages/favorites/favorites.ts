import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { QuotePage } from '../quote/quote';
import { SettingsService } from '../../services/settings';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
	quotes: Quote[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  						private quotesService: QuotesService,
  						private modalCtrl: ModalController,
              private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
  	this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote) {
  	const modal = this.modalCtrl.create(QuotePage, quote);
  	modal.present();
  	modal.onDidDismiss((remove: boolean) => {
  		if(remove) {
  			this.onRemoveFromFavorites(quote);
  		}
  	});
  }

  onRemoveFromFavorites(quote) {
  	this.quotesService.removeQuoteFromFavorites(quote);
  	//remove locally
  	const position = this.quotes.findIndex((quoteEl: Quote) => {
  		return quoteEl.id === quote.id;
  	});
  	this.quotes.splice(position, 1);
  }
  //#1
  //HTML [color]="getBackground()"
  // getBackground() {
  //   return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  // }

  //#2
  //HTML color="quoteBackground"
  //[ngClass]="{alt: isAltBackground()}"
  isAltBackground() {
    return this.settingsService.isAltBackground();
  }

}
