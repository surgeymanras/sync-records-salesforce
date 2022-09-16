import { LightningElement, api, wire } from 'lwc';
import saveButton from '@salesforce/apex/SyncListController.saveButton';

export default class SyncList extends LightningElement {
    UsernameValue;
    PasswordValue;
    ClientIDValue;
    ClientSecretValue;

    value = '';

    get options() {
        return [
            { label: 'Sandbox', value: 'option1' },
            { label: 'Production', value: 'option2' },
        ];
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
        saveButton({ username : this.username,
                     password : this.password,
                     clientID : this.clientID,
                     clientSecret : this.clientSecret
                    })
            .then((result) => {
                this.save();
                console.log('Success:', result)
            })
            .catch(error => {
                this.save();
                console.error('Error:', error);
            });
    }
}