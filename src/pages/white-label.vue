<template>
    <div>
      <div class="container pt-4">
        <div class="w-100">
          <h3 class="mb-1 fw-bold text-center">Request EZAI Whitelabel</h3>
          <p class="text-muted text-center">Fill the form below and our team will contant you</p>
        </div>
        <div class="d-flex justify-content-center">
            <form class="w-50" @submit.prevent="send">
                <div class="form-group mb-3">
                    <label for="exampleInputEmail1">Company Name</label>
                    <input required type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Company Name" v-model="form.name">
                </div>
                <div class="form-group  mb-3">
                    <label for="exampleInputPassword1">Company Logo</label>
                    <button type="button" class="btn btn-add btn-outline-secondary my-2 btn-xs fw-bold px-2" role="button" @click="$refs.logoFile.click()">
                        <svg class="me-2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 9C0.75 10.0834 0.963392 11.1562 1.37799 12.1571C1.7926 13.1581 2.40029 14.0675 3.16637 14.8336C3.93245 15.5997 4.84193 16.2074 5.84286 16.622C6.8438 17.0366 7.91659 17.25 9 17.25C10.0834 17.25 11.1562 17.0366 12.1571 16.622C13.1581 16.2074 14.0675 15.5997 14.8336 14.8336C15.5997 14.0675 16.2074 13.1581 16.622 12.1571C17.0366 11.1562 17.25 10.0834 17.25 9C17.25 7.91659 17.0366 6.8438 16.622 5.84286C16.2074 4.84193 15.5997 3.93245 14.8336 3.16637C14.0675 2.40029 13.1581 1.7926 12.1571 1.37799C11.1562 0.963393 10.0834 0.75 9 0.75C7.91659 0.75 6.8438 0.963393 5.84286 1.37799C4.84193 1.7926 3.93245 2.40029 3.16637 3.16637C2.40029 3.93245 1.7926 4.84193 1.37799 5.84286C0.963392 6.8438 0.75 7.91659 0.75 9Z" fill="#DC2631"/><path d="M5 9H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        Upload Logo
                    </button>
                    <input @change="uploadFile" ref="logoFile" type="file" class="d-none" accept="image/*" />
                    <FileCard class="card flex-row p-2 small" v-if="fileObj" :deleteOnCancel="true" :file="fileObj"  @onDelete="deleteFile" />
                </div>
                <label for="exampleInputPassword1">Subdomain URL</label>
                <div class="input-group mb-3">
                    <input v-model="form.url" required type="text" class="form-control" placeholder="Subdomain URL" aria-label="Subdomain URL" aria-describedby="basic-addon2">
                    <span class="input-group-text" id="basic-addon2">.ezai.io</span>
                </div>

                <label for="exampleInputPassword1">Company Address</label>
                <div class="input-group mb-3">
                    <input v-model="form.address" required type="text" class="form-control" placeholder="Address" aria-label="Address">
                </div>
                <div class="input-group mb-3">
                    <input v-model="form.city" type="text" class="form-control" placeholder="City" aria-label="City">
                </div>
                <div class="row g-3 mb-3">
                    <div class="col">
                        <input v-model="form.state" type="text" class="form-control" placeholder="State" aria-label="State">
                    </div>
                    <div class="col">
                        <input v-model="form.zipcode" type="text" class="form-control" placeholder="Zip Code" aria-label="Zip Code">
                    </div>
                </div>

                <label for="exampleInputPassword1">Contant Person</label>
                <div class="row g-3 mb-3">
                    <div class="col">
                        <input v-model="form.email" required type="email" class="form-control" placeholder="Email" aria-label="Email">
                    </div>
                    <div class="col">
                        <input v-model="form.number" type="text" class="form-control" placeholder="Phone Number" aria-label="Phone Number">
                    </div>
                </div>
                <button type="submit" class="btn btn-secondary float-right" :disabled="sending">
                    <div class="spinner-border spinner-border-sm me-2" v-if="sending"></div>
                    Send For Approval
                </button>
            </form>

        </div>

      </div>
    </div>
  </template>
    
  <script>
  /* eslint-disable */
    import FileCard from '@/components/cards/file-card';
    import WhiteLabel from '@/api-services/whitelabel.service';
    import FilesService from '@/api-services/files.service';

    export default {
      name: 'FilesModule',
      components: {
        FileCard
      },
      created() {
        if(!this.$store.state.showWhiteLabel) {
            this.$router.push("/");
        } 
      },
      data() {
        return {
          sending: false,
          file: null,
          fileObj: null,
          form: {
            name: '',
            logo: '',
            url: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            email: '',
            number: ''
          }
        }
      },
      computed: {
        files() {
          return this.$store.state.files;
        },
        root() {
          return this.$root.$children[0];
        },
        fileUploader() {
            return this.$root.$children[0].$refs.fileUploader;
        },
      },
      methods: {
        uploadFile(evt) {
            let files = evt.target.files;
            files = [...files];
            console.log("files",files)
            if(files.length) {
                this.file = files[0];
                console.log(this.file)
                this.fileObj = {name: this.file.name, status: 'done', progress: 100 }
            }
        },
        deleteFile() {
            this.fileObj = null;
            this.file = null;
        },
        async send() {

            this.sending = true;
            if(this.file) {
                let res = await FilesService.uploadImage({ image: this.file, file_type: this.file.type });
                this.form.logo = res.url;
            }
            await WhiteLabel.approval(this.form).then(res => {
                this.sending = false;
                if(!res.success) {
                    this.$swal(res.error);
                } else {
                    this.$store.commit('updateWhiteLabel', false);
                    this.$swal('Approval Sent Successfully!');
                    this.$router.push("/");
                }
            });
        }
      }
    }
  </script>
    
  <style lang="scss" scoped>
    .float-right {
        float: right;
    }
    input[type=search] {
      background-color: var(--bs-base);
      border: 1px solid var(--bs-sender-border-color) !important;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03) !important;
      width: 100%;
      max-width: 330px;
    }
    .table {
      border-collapse: separate;
      border-spacing: 0 10px;
      .thumb {
        width: 32px;
        min-width: 32px;
        height: 32px;
        position: relative;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      tbody {
        tr {
          border-radius: 10px;
          box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, .03);
          td {
            background: #fff;
            border-bottom: 1px solid var(--bs-card-border-color);
            border-top: 1px solid var(--bs-card-border-color);
            margin-bottom: 10px;
            vertical-align: middle;
            &:first-child {
              border-left: 1px solid var(--bs-card-border-color);
              border-radius: 10px 0 0 10px;
            }
            &:last-child {
              border-right: 1px solid var(--bs-card-border-color);
              border-radius: 0 10px 10px 0;
            }
          }
          /*td {
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            border-radius: 10px !important;
            .card {
              border-radius: 0 !important;
              border-left: none !important;
              border-right: none !important;
              box-shadow: none !important;
            }
            &:first-child {
              .card {
                border-left: 2px solid var(--bs-card-border-color) !important;
                border-top-left-radius: 10px !important;
                border-bottom-left-radius: 10px !important;
              }
            }
            &:last-child {
              .card {
                border-right: 2px solid var(--bs-card-border-color) !important;
                border-top-right-radius: 10px !important;
                border-bottom-right-radius: 10px !important;
              }
            }
          }*/
        }
      }
    }
  
  </style>
  
