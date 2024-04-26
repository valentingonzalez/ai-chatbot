<template>
    <div>
    
    </div>
    </template>
    
    <script>
    export default {
        name: 'GDriveSelector',
        data() {
            return {
                developerKey: process.env.GOOGLE_API_KEY || "AIzaSyAZbwHmtjesgRQ8fXCduJHtbBIab4K4dSs",
                clientId: process.env.GOOGLE_CLIENT_ID || "84182513624-4lilsuh1tn0h3sqqihd5epdkbrgqherg.apps.googleusercontent.com",
                scope: 'https://www.googleapis.com/auth/drive.readonly',
                discoveryDoc: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
            }
        },
        mounted() {
    
        },
        methods: {
            async handleGoogleCallback(response) {
                console.log(response);
                /* eslint-disable */
                gapi.load('picker', () => {
    
                    const view = new google.picker.DocsView()
                        .setIncludeFolders(true);
                    const picker = new google.picker.PickerBuilder()
                        .addView(view)
                        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                        .setOAuthToken(response.access_token)
                        .setDeveloperKey(this.developerKey)
                        .setCallback(data => {
                            console.log("data", data.docs)
                        })
                        .build();
                    picker.setVisible(true);
                });
                /* eslint-enable */
    
            },
            async setupGoogleDrive() {
                const CLIENT_ID = this.clientId;
                /* eslint-disable */
    
                const tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    callback: this.handleGoogleCallback,
                    discoveryDocs: [this.discoveryDoc],
                    scope: this.scope,
                    prompt: "select_account",
                });
                tokenClient.requestAccessToken({ prompt: "select_account" })
                            /* eslint-enable */
    
            },
        }
    }
    </script>
    