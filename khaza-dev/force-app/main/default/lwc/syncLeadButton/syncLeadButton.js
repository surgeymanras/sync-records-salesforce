import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { CloseActionScreenEvent } from 'lightning/actions';

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
        console.log('Hello from connectedCallback', this.recordId);
    }

    toggle() {
        this.isLoaded = !this.isLoaded;
    }

    closeModal(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

}