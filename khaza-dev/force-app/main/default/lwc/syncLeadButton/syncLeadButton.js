import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import syncLead from '@salesforce/apex/SyncLeadButtonController.syncLead';

export default class SyncLeadButton extends LightningElement {
    recordId;
    isLoaded = false;
    error = null;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.recordId = currentPageReference.state.recordId;
        }
    }

    connectedCallback(){
        console.log('recordId ' + this.recordId)
        syncLead({ recordId: this.recordId })
            .then((response) => this.handleLoaded(response))
            .catch((error) => this.handleError(error));
    }

    handleLoaded(response) {
        console.log('Success', response);
        this.isLoaded = !this.isLoaded;
        this.error = null;
    }

    handleError(error) {
        console.error('Error', error);
        this.isLoaded = !this.isLoaded;
        this.error = error;
    }

    closeModal(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}