import { LightningElement, api, wire, track } from 'lwc';
import saveButton from '@salesforce/apex/SyncListController.saveButton';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
export default class SyncList extends LightningElement {
    username;
    password;
    clientID;
    clientSecret;
    selectedEnv;
    value = '';
    
    @track sandboxFieldValue = true;
    
    @track productionFieldValue = false; 
    
    get options() { 
        return  [
            { label: 'Sandbox', value: 'sandbox' },
            { label: 'Production', value: 'production' },
        ];
    }

    handleRadioChange(event) {
        this.selectedEnv = event.detail.value;
    }

    handleUsernameChange(event){
        this.username = event.target.value;
    }

    handlePasswordChange(event){
        this.password = event.target.value;
    }

    handleClientIDChange(event){
        this.clientID = event.target.value;
    }

    handleClientSecretChange(event){
        this.clientSecret = event.target.value;
    }

    save() {
        saveButton({ 
            username : this.username,
            password : this.password,
            clientID : this.clientID,
            clientSecret : this.clientSecret,
            env : this.selectedEnv,
        })
            .then((result) => {
                this.save();
                console.log('Success:', result)
            })
            .catch(error => {
                this.save();
                console.error('Error:', error);
            });

            const evt = new ShowToastEvent({
                title: 'Sync Message',
                message: 'Success saved',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
    }
}