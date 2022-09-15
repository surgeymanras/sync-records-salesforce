import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';
import syncLead from '@salesforce/apex/SyncLeadButtonController.syncLead';

export default class SyncLeadButton extends LightningElement {
    recordId;
    isLoaded = false;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.recordId = currentPageReference.state.recordId;
        }
    }

    connectedCallback(){
        syncLead({ recordId: this.recordId })
            .then(() => {
                this.toggle();
            })
            .catch(error => {
                this.toggle();
                console.error('Error:', error);
            });
    }

    toggle() {
        this.isLoaded = !this.isLoaded;
    }

    closeModal(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}