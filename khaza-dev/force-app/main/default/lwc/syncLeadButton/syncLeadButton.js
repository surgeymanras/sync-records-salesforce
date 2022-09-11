import { LightningElement } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class SyncLeadButton extends LightningElement {
    isLoaded = false;

    connectedCallback(){

    } 

    toggle() {
        this.isLoaded = !this.isLoaded;
    }

    closeModal(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}