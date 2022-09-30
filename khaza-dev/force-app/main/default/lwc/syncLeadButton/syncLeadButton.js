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
        const { responseCode, responseBody } = JSON.parse(response);
        console.log('Code:', responseCode);
        console.log('Body:', responseBody);

        if (responseCode >= 400) {
            this.error = responseBody.errors || response.body.message;
        }  else {
            this.error = null;
        }  

        this.isLoaded = !this.isLoaded;
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