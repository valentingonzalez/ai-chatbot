<template>
  <div class="d-flex" v-if="deploy">
    <div class="flex-grow-1 bg-base p-4 overflow-auto pb-5">
      <form @submit.prevent="saveDeploy" :class="{ 'disabled': saving }">
        <div class="mb-4 d-flex justify-content-between">
          <div>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-1">
                <li class="breadcrumb-item"><router-link to="/deploy">Publish</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">New</li>
              </ol>
            </nav>
            <h3 class="fw-bold">New AI ChatBot</h3>
          </div>
          <button type="submit" class="btn btn-secondary px-3">
            <div class="spinner-border spinner-border-sm me-2" v-if="saving"></div>
            Save
          </button>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="chatName">Name of Chat</label>
          <input class="form-control" id="chatName" type="text" placeholder="Name of Chat" v-model="deploy.name" />
        </div>
        <div class="mb-3">
          <label class="mb-1" for="chatName">Select Model</label>
          <v-select :options="models" v-model="deploy.model_id" label="name" :reduce="model => model.id" class="models-select v-select-small flex-grow-1">
            <template slot="option" slot-scope="model">
              <div class="text-capitalize fs-7">{{ model.name }}</div>
              <div class="smaller text-muted">
                {{ model.description }}
              </div>
              <div class="smaller">
                {{ model.instruction_count }} Instructions . 
                {{ model.file_count }} Files . 
                {{ model.embeddings_count }} Embeddings
              </div>
            </template>
            <template #open-indicator="{ attributes }">
              <span v-bind="attributes"><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.625 1.375L5 4.75L8.375 1.375" stroke="#8390A2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </template>
            <span class="small" slot="no-options">Nothing found</span>
          </v-select>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="chatName">Select Type</label>
          <div class="d-flex gap-2">
            <div class="form-check custom type w-50">
              <input class="form-check-input" type="radio" name="type" id="type-bar" value="bar" v-model="deploy.settings.style">
              <label class="form-check-label w-100" for="type-bar">
                <div class="card card-type p-3 justify-content-center align-items-center w-100">
                  <div class="tick">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.66699 2.99967L3.33366 4.66634L6.66699 1.33301" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <svg class="text-primary mb-2" width="79" height="22" viewBox="0 0 79 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 8.5C2 6.29086 3.79086 4.5 6 4.5H71C73.2091 4.5 75 6.29086 75 8.5V21.5H2V8.5Z" fill="currentColor"/><rect y="19.5" width="78" height="2" rx="1" fill="currentColor"/>
                  <circle v-if="theme == 'theme-white'" cx="73" cy="6.5" r="5" fill="currentColor" stroke="white" stroke-width="2"/>
                  <circle v-else-if="theme == 'theme-black'" cx="73" cy="6.5" r="5" fill="currentColor" stroke="#111827" stroke-width="2"/></svg>
                  Bar
                </div>
              </label>
            </div>
            <div class="form-check custom type w-50">
              <input class="form-check-input" type="radio" name="type" id="type-bubble" value="bubble" v-model="deploy.settings.style">
              <label class="form-check-label w-100" for="type-bubble">
                <div class="card card-type p-3 justify-content-center align-items-center w-100">
                  <div class="tick">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.66699 2.99967L3.33366 4.66634L6.66699 1.33301" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <svg class="text-primary mb-1" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="15.5" r="12" fill="currentColor"/>
                    <circle v-if="theme == 'theme-white'" cx="22" cy="6.5" r="5" fill="currentColor" stroke="white" stroke-width="2"/>
                    <circle v-else-if="theme == 'theme-black'" cx="22" cy="6.5" r="5" fill="currentColor" stroke="#111827" stroke-width="2"/>
                  </svg>
                  Bubble
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="mb-1" for="color">Color</label>
          <ColorPicker id="color" v-model="deploy.settings.color" :color="deploy.settings.color" />
        </div>
        <div class="mb-3">
          <label class="mb-1">Logo</label>
          <div class="form-check form-switch form-switch-sm mb-2">
            <input type="checkbox" id="showLogo" class="form-check-input" v-model="deploy.settings.showLogo">
            <label class="form-check-label" for="showLogo">
              Show Logo
            </label>
          </div>
          <div class="logo-preview mt-3" v-if="logoPreview && deploy.settings.showLogo">
            <button type="button" class="delete-bt" @click="logoFile = null; deploy.logo = '';">
              <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.999023 7.45508L7.00009 1.45401" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.999023 1.45312L7.00009 7.45419" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <img :src="logoPreview" />
          </div>
          <button v-else type="button" class="btn btn-sm fw-bold px-3 btn-outline-secondary" @click="$refs.logoUpload.click()">
            <svg class="text-primary me-2" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 8.4541C0.75 9.53751 0.963392 10.6103 1.37799 11.6112C1.7926 12.6122 2.40029 13.5216 3.16637 14.2877C3.93245 15.0538 4.84193 15.6615 5.84286 16.0761C6.8438 16.4907 7.91659 16.7041 9 16.7041C10.0834 16.7041 11.1562 16.4907 12.1571 16.0761C13.1581 15.6615 14.0675 15.0538 14.8336 14.2877C15.5997 13.5216 16.2074 12.6122 16.622 11.6112C17.0366 10.6103 17.25 9.53751 17.25 8.4541C17.25 7.3707 17.0366 6.2979 16.622 5.29696C16.2074 4.29603 15.5997 3.38655 14.8336 2.62047C14.0675 1.85439 13.1581 1.2467 12.1571 0.832096C11.1562 0.417494 10.0834 0.204102 9 0.204102C7.91659 0.204102 6.8438 0.417494 5.84286 0.832096C4.84193 1.2467 3.93245 1.85439 3.16637 2.62047C2.40029 3.38655 1.7926 4.29603 1.37799 5.29696C0.963392 6.2979 0.75 7.3707 0.75 8.4541Z" fill="currentColor"/><path d="M5 8.4541H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 4.4541V12.4541" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Upload Logo
            <input @change="uploadLogo" ref="logoUpload" class="d-none" type="file" accept="image/*" />
          </button>
        </div>
        <div class="mb-3">
          <label class="mb-1 d-flex align-items-center w-100" for="preChatMessage">
            Pre Chat Message
          </label>
          <TextareaAutosize id="preChatMessage" class="form-control" v-model="deploy.pre_chat" rows="1" />
        </div>
        <div class="mb-3">
          <label class="mb-1" for="preChatForm">
            Pre Chat Form
            <div class="small text-muted">
              The Pre chat form allows you to gather visitor information before the chat starts.
            </div>
          </label>
          <div class="card p-2">
            <Draggable v-model="deploy.pre_chat_form" handle=".handle">
              <div class="card p-3 mb-2" v-for="(e, i) in deploy.pre_chat_form" :key="`form-${i}`">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <div>
                      <button type="button" class="handle me-2 cursor-move">
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.3335 1.78776C1.3335 1.96457 1.40373 2.13414 1.52876 2.25916C1.65378 2.38419 1.82335 2.45443 2.00016 2.45443C2.17697 2.45443 2.34654 2.38419 2.47157 2.25916C2.59659 2.13414 2.66683 1.96457 2.66683 1.78776C2.66683 1.61095 2.59659 1.44138 2.47157 1.31636C2.34654 1.19133 2.17697 1.12109 2.00016 1.12109C1.82335 1.12109 1.65378 1.19133 1.52876 1.31636C1.40373 1.44138 1.3335 1.61095 1.3335 1.78776Z" fill="#8390A2" stroke="#8390A2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.3335 6.45378C1.3335 6.63059 1.40373 6.80016 1.52876 6.92518C1.65378 7.0502 1.82335 7.12044 2.00016 7.12044C2.17697 7.12044 2.34654 7.0502 2.47157 6.92518C2.59659 6.80016 2.66683 6.63059 2.66683 6.45378C2.66683 6.27697 2.59659 6.1074 2.47157 5.98237C2.34654 5.85735 2.17697 5.78711 2.00016 5.78711C1.82335 5.78711 1.65378 5.85735 1.52876 5.98237C1.40373 6.1074 1.3335 6.27697 1.3335 6.45378Z" fill="#8390A2" stroke="#8390A2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.3335 11.1208C1.3335 11.2976 1.40373 11.4671 1.52876 11.5922C1.65378 11.7172 1.82335 11.7874 2.00016 11.7874C2.17697 11.7874 2.34654 11.7172 2.47157 11.5922C2.59659 11.4671 2.66683 11.2976 2.66683 11.1208C2.66683 10.944 2.59659 10.7744 2.47157 10.6494C2.34654 10.5243 2.17697 10.4541 2.00016 10.4541C1.82335 10.4541 1.65378 10.5243 1.52876 10.6494C1.40373 10.7744 1.3335 10.944 1.3335 11.1208Z" fill="#8390A2" stroke="#8390A2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.3335 1.78776C5.3335 1.96457 5.40373 2.13414 5.52876 2.25916C5.65378 2.38419 5.82335 2.45443 6.00016 2.45443C6.17697 2.45443 6.34654 2.38419 6.47157 2.25916C6.59659 2.13414 6.66683 1.96457 6.66683 1.78776C6.66683 1.61095 6.59659 1.44138 6.47157 1.31636C6.34654 1.19133 6.17697 1.12109 6.00016 1.12109C5.82335 1.12109 5.65378 1.19133 5.52876 1.31636C5.40373 1.44138 5.3335 1.61095 5.3335 1.78776Z" fill="#8390A2" stroke="#8390A2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.3335 6.45378C5.3335 6.63059 5.40373 6.80016 5.52876 6.92518C5.65378 7.0502 5.82335 7.12044 6.00016 7.12044C6.17697 7.12044 6.34654 7.0502 6.47157 6.92518C6.59659 6.80016 6.66683 6.63059 6.66683 6.45378C6.66683 6.27697 6.59659 6.1074 6.47157 5.98237C6.34654 5.85735 6.17697 5.78711 6.00016 5.78711C5.82335 5.78711 5.65378 5.85735 5.52876 5.98237C5.40373 6.1074 5.3335 6.27697 5.3335 6.45378Z" fill="#8390A2" stroke="#8390A2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.3335 11.1208C5.3335 11.2976 5.40373 11.4671 5.52876 11.5922C5.65378 11.7172 5.82335 11.7874 6.00016 11.7874C6.17697 11.7874 6.34654 11.7172 6.47157 11.5922C6.59659 11.4671 6.66683 11.2976 6.66683 11.1208C6.66683 10.944 6.59659 10.7744 6.47157 10.6494C6.34654 10.5243 6.17697 10.4541 6.00016 10.4541C5.82335 10.4541 5.65378 10.5243 5.52876 10.6494C5.40373 10.7744 5.3335 10.944 5.3335 11.1208Z" fill="#8390A2" stroke="#8390A2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </button>
                    </div>
                    <h6 class="text-capitalize fw-bold mb-0">{{ e.type }}</h6>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="form-check form-switch form-switch-sm me-3">
                      <input type="checkbox" :id="`required-form-${i}`" class="form-check-input" v-model="e.required">
                      <label class="form-check-label" :for="`required-form-${i}`">Required</label>
                    </div>
                    <button v-if="!e.readonly" type="button" @click="deleteChatField(i)">
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.3335 4.28711H14.6668" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.3335 7.62109V12.6211" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.6665 7.62109V12.6211" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.1665 4.28711L2.99984 14.2871C2.99984 14.7291 3.17543 15.1531 3.48799 15.4656C3.80055 15.7782 4.22448 15.9538 4.6665 15.9538H11.3332C11.7752 15.9538 12.1991 15.7782 12.5117 15.4656C12.8242 15.1531 12.9998 14.7291 12.9998 14.2871L13.8332 4.28711" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 4.28744V1.78743C5.5 1.56642 5.5878 1.35446 5.74408 1.19818C5.90036 1.0419 6.11232 0.954102 6.33333 0.954102H9.66667C9.88768 0.954102 10.0996 1.0419 10.2559 1.19818C10.4122 1.35446 10.5 1.56642 10.5 1.78743V4.28744" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                  </div>
                </div>
                <div v-if="!e.readonly" class="mt-2">
                  <label class="mb-1" :for="`form-label-${i}`">Label</label>
                  <input type="text" class="form-control" :id="`form-label-${i}`" placeholder="Label" v-model="e.label" />
                </div>
              </div>
            </Draggable>
            <div class="d-flex">
              <div class="dropdown">
                <button type="button" id="addChatField" class="btn btn-sm fw-bold px-3 btn-outline-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg class="text-primary me-2" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 8.4541C0.75 9.53751 0.963392 10.6103 1.37799 11.6112C1.7926 12.6122 2.40029 13.5216 3.16637 14.2877C3.93245 15.0538 4.84193 15.6615 5.84286 16.0761C6.8438 16.4907 7.91659 16.7041 9 16.7041C10.0834 16.7041 11.1562 16.4907 12.1571 16.0761C13.1581 15.6615 14.0675 15.0538 14.8336 14.2877C15.5997 13.5216 16.2074 12.6122 16.622 11.6112C17.0366 10.6103 17.25 9.53751 17.25 8.4541C17.25 7.3707 17.0366 6.2979 16.622 5.29696C16.2074 4.29603 15.5997 3.38655 14.8336 2.62047C14.0675 1.85439 13.1581 1.2467 12.1571 0.832096C11.1562 0.417494 10.0834 0.204102 9 0.204102C7.91659 0.204102 6.8438 0.417494 5.84286 0.832096C4.84193 1.2467 3.93245 1.85439 3.16637 2.62047C2.40029 3.38655 1.7926 4.29603 1.37799 5.29696C0.963392 6.2979 0.75 7.3707 0.75 8.4541Z" fill="currentColor"/><path d="M5 8.4541H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 4.4541V12.4541" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Add Field
                </button>
                <ul class="dropdown-menu fs-7" aria-labelledby="addChatField" role="menu">
                  <li>
                    <a href="#" @click.prevent="addChatField('name')" class="dropdown-item">Name</a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="addChatField('email')" class="dropdown-item">Email</a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="addChatField('text')" class="dropdown-item">Text</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="mb-1 d-flex align-items-center" for="postRegistrationMessage">
            Post Registration Message
          </label>
          <TextareaAutosize id="postRegistrationMessage" v-model="deploy.post_chat" class="form-control" placeholder="Post-registration message" rows="1" />
        </div>
      </form>
    </div>
    <ColumnResize class="sidebar d-none d-lg-flex flex-column border-start" :maxWidth="900" :width="500" :minWidth="500" :direction="'l'">
      <div class="bg-deep chat-preview p-4 flex-grow-1 d-flex flex-column position-relative overflow-hidden">
        <div class="chat-box overflow-hidden d-flex flex-column flex-grow-1" :class="{ 'collapsed': collapsedPreview, 'type-bar': deploy.settings.style == 'bar', 'type-bubble': deploy.settings.style == 'bubble' }">
          <div class="header bg-base px-3 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center w-100">
              <div>
                <div class="logo me-2" v-if="deploy.settings.showLogo">
                  <div class="connected"></div>
                  <img :src="logoPreview || logoPlaceholder" />
                </div>
              </div>
              <h5 class="fw-bold mb-0 text-truncate">{{ deploy.name || 'Chat Bot'}}</h5>
            </div>
            <div class="h-100 pt-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 1L13 13" stroke="#8390A2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
          <div class="body flex-grow-1 p-3 w-100 d-flex flex-column justify-content-end">
            <div class="chat-bubbles w-100 d-flex flex-grow-1 flex-column justify-content-end align-items-start">
              <div class="chat-bubble p-3 position-relative mw-100">
                <div v-html="message"></div>
              </div>
              <div class="text-muted mt-1" style="font-size: 10px; opacity: .6;">
                {{ timestamp }}
              </div>
            </div>
          </div>
          <div class="bg-base p-3">
            <div class="form-control d-flex align-items-center justify-content-between">
              <TextareaAutosize class="border-0 bg-transparent text fs-6 flex-grow-1" placeholder="Enter Message" rows="1" />
              <div class="d-flex align-items-center">
                <div class="me-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 9C0 10.1819 0.232792 11.3522 0.685084 12.4442C1.13738 13.5361 1.80031 14.5282 2.63604 15.364C3.47177 16.1997 4.46392 16.8626 5.55585 17.3149C6.64778 17.7672 7.8181 18 9 18C10.1819 18 11.3522 17.7672 12.4442 17.3149C13.5361 16.8626 14.5282 16.1997 15.364 15.364C16.1997 14.5282 16.8626 13.5361 17.3149 12.4442C17.7672 11.3522 18 10.1819 18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 0 9 0C7.8181 0 6.64778 0.232792 5.55585 0.685084C4.46392 1.13738 3.47177 1.80031 2.63604 2.63604C1.80031 3.47177 1.13738 4.46392 0.685084 5.55585C0.232792 6.64778 0 7.8181 0 9ZM5.25 9C5.25 8.58579 5.58579 8.25 6 8.25H8.25V6C8.25 5.58579 8.58579 5.25 9 5.25C9.41421 5.25 9.75 5.58579 9.75 6V8.25H12C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H9.75V12C9.75 12.4142 9.41421 12.75 9 12.75C8.58579 12.75 8.25 12.4142 8.25 12V9.75H6C5.58579 9.75 5.25 9.41421 5.25 9Z" fill="#8390A2"/></svg>
                </div>
                <div>
                  <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12C8.66 12 9.99 10.66 9.99 9L10 3C10 1.34 8.66 0 7 0C5.34 0 4 1.34 4 3V9C4 10.66 5.34 12 7 12ZM12.3 9C12.3 12 9.76 14.1 7 14.1C4.24 14.1 1.7 12 1.7 9H0C0 12.41 2.72 15.23 6 15.72V19H8V15.72C11.28 15.24 14 12.42 14 9H12.3Z" fill="#8390A2"/></svg>
                </div>
              </div>
            </div>
            <div class="smaller w-100 text-center mt-2 mb-n2">
              Powered by
              <svg :style="{ color: deploy.settings.color }" width="60" height="9" viewBox="0 0 60 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.3125 8.48719V0.5H44.0133V8.48719H41.3125Z" fill="currentColor"/><path d="M0.16 8.48719C0.0716346 8.48719 0 8.41556 0 8.32719V0.66C0 0.571634 0.0716344 0.5 0.16 0.5H9.94559V1.0632C9.94559 1.77012 9.37252 2.3432 8.66559 2.3432H2.8608C2.77243 2.3432 2.7008 2.41483 2.7008 2.5032V3.4376C2.7008 3.52596 2.77243 3.5976 2.8608 3.5976H6.3424C6.43076 3.5976 6.5024 3.66923 6.5024 3.7576V5.2808C6.5024 5.36916 6.43076 5.4408 6.3424 5.4408H2.8608C2.77243 5.4408 2.7008 5.51243 2.7008 5.6008V6.484C2.7008 6.57236 2.77243 6.644 2.8608 6.644H9.78559C9.87396 6.644 9.94559 6.71563 9.94559 6.804V8.32719C9.94559 8.41556 9.87396 8.48719 9.78559 8.48719H0.16Z" fill="currentColor"/><path d="M38.4803 8.24131C38.5481 8.34782 38.4716 8.48719 38.3453 8.48719H35.8288C35.7757 8.48719 35.7261 8.46092 35.6964 8.41703L35.062 7.48215C35.0322 7.43827 34.9826 7.41199 34.9296 7.41199H29.48C29.4269 7.41199 29.3773 7.43827 29.3476 7.48215L28.7132 8.41703C28.6834 8.46092 28.6338 8.48719 28.5808 8.48719H26.0518C25.9255 8.48719 25.849 8.34766 25.9169 8.24115L30.6657 0.79584C30.7832 0.611554 30.9867 0.5 31.2053 0.5H33.2038C33.4226 0.5 33.6263 0.611817 33.7438 0.796456L38.4803 8.24131ZM33.6294 5.556C33.7568 5.556 33.8331 5.41438 33.7631 5.308L32.3335 3.1372C32.2699 3.04061 32.128 3.04134 32.0654 3.13858L30.6676 5.30938C30.599 5.41585 30.6755 5.556 30.8021 5.556H33.6294Z" fill="currentColor"/><path d="M21.3824 6.644C22.4004 6.644 23.2256 7.46922 23.2256 8.48719H13.4528C13.3644 8.48719 13.2928 8.41556 13.2928 8.32719V7.14521C13.2928 6.71274 13.5112 6.30952 13.8734 6.0732L19.5904 2.3432H15.1232C14.1052 2.3432 13.28 1.51797 13.28 0.5H23.0656C23.1539 0.5 23.2256 0.571634 23.2256 0.66V2.47395C23.2256 2.52811 23.1982 2.5786 23.1528 2.60812L16.9408 6.644H21.3824Z" fill="currentColor"/><path d="M46.3867 8.5V7.21999H47.6731V8.5H46.3867Z" fill="currentColor"/><path d="M50.0639 4.5H51.4207V8.49359H50.0639V4.5Z" fill="currentColor"/><path d="M53.5812 5.2168C53.5812 5.0888 53.611 4.98 53.6708 4.8904C53.7305 4.8008 53.8094 4.72826 53.9076 4.6728C54.0057 4.61306 54.1166 4.5704 54.2404 4.5448C54.3641 4.51493 54.4921 4.5 54.6244 4.5H58.1252C58.2446 4.5 58.3662 4.51493 58.49 4.5448C58.618 4.57466 58.731 4.6216 58.8292 4.6856C58.9273 4.74533 59.0084 4.82 59.0724 4.9096C59.1364 4.9992 59.1684 5.1016 59.1684 5.2168V7.77679C59.1684 7.89199 59.1364 7.99439 59.0724 8.08399C59.0084 8.17359 58.9273 8.25039 58.8292 8.31439C58.731 8.37413 58.618 8.41893 58.49 8.44879C58.3662 8.47866 58.2446 8.49359 58.1252 8.49359H54.6244C54.4921 8.49359 54.3641 8.48079 54.2404 8.45519C54.1166 8.42533 54.0057 8.38266 53.9076 8.32719C53.8094 8.26746 53.7305 8.19279 53.6708 8.10319C53.611 8.01359 53.5812 7.90479 53.5812 7.77679V5.2168ZM57.4916 7.57199C57.6683 7.57199 57.8116 7.42873 57.8116 7.25199V5.7416C57.8116 5.56486 57.6683 5.4216 57.4916 5.4216H55.2516C55.0748 5.4216 54.9316 5.56487 54.9316 5.7416V7.25199C54.9316 7.42873 55.0748 7.57199 55.2516 7.57199H57.4916Z" fill="currentColor"/></svg>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mt-3">
          <button type="button" class="open-chat-btn bubble" @click="collapsedPreview = !collapsedPreview" :class="{ 'visible': deploy.settings.style == 'bubble' }" :style="{ backgroundColor: deploy.settings.color }">
            <svg v-if="!collapsedPreview" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6668 1.66699L8.00016 8.33366L1.3335 1.66699" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg v-else width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.1636 17.28C23.9091 15.52 25 13.32 25 10.9C25 5.4 19.6545 1 13 1C6.34545 1 1 5.4 1 10.9C1 16.4 6.34545 20.8 13 20.8C14.2 20.8 15.2909 20.69 16.3818 20.36L22.8182 23L22.1636 17.28Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" class="open-chat-btn bar p-3 d-flex align-items-center justify-content-between fs-6" @click="collapsedPreview = !collapsedPreview" :class="{ 'visible': deploy.settings.style == 'bar' }" :style="{ backgroundColor: deploy.settings.color }">
            <div class="text-truncate text-white">Chat with {{ deploy.name || 'Chat Bot' }}</div>
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.6364 14.32C20.0909 12.88 21 11.08 21 9.1C21 4.6 16.5455 1 11 1C5.45455 1 1 4.6 1 9.1C1 13.6 5.45455 17.2 11 17.2C12 17.2 12.9091 17.11 13.8182 16.84L19.1818 19L18.6364 14.32Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div class="bg-base border-top border-bottom p-3">
        <div class="d-flex justify-content-between align-center mb-2">
          <div class="fw-bold text-secondary me-3">HTML Snippet For Your Site</div>
          <button type="button" @click="copyCode">
            <svg class="me-1" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.50001C4 5.10218 4.15804 4.72065 4.43934 4.43934C4.72065 4.15804 5.10218 4 5.50001 4H11.5C11.8979 4 12.2794 4.15804 12.5607 4.43934C12.842 4.72065 13 5.10218 13 5.50001V11.5C13 11.8979 12.842 12.2794 12.5607 12.5607C12.2794 12.842 11.8979 13 11.5 13H5.50001C5.10218 13 4.72065 12.842 4.43934 12.5607C4.15804 12.2794 4 11.8979 4 11.5V5.50001Z" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4.00001V2.50001C10 2.10218 9.842 1.72065 9.56069 1.43934C9.27939 1.15804 8.89785 1 8.50003 1H2.50001C2.10218 1 1.72065 1.15804 1.43934 1.43934C1.15804 1.72065 1 2.10218 1 2.50001V8.50003C1 8.89785 1.15804 9.27939 1.43934 9.56069C1.72065 9.842 2.10218 10 2.50001 10H4.00001" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Copy code
          </button>
        </div>
        <textarea v-if="code" class="form-control small" readonly rows="3" v-model="code"></textarea>
        <div v-else class="spinner-border"></div>

      </div>
      <div class="bg-base border-top border-bottom p-3">
        <div class="d-flex justify-content-between align-center">
          <div class="d-flex align-items-center mw-0 pe-2">
            <div class="fw-bold text-secondary me-3 text-nowrap">Chat Page</div>
            <a v-if="link" target="_blank" class="text-truncate" :href="link">{{ link }}</a>
            <div v-else class="spinner-border"></div>
          </div>
          <button type="button" class="me-2 text-nowrap" @click="copyLink">
            <svg class="me-1" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5.50001C4 5.10218 4.15804 4.72065 4.43934 4.43934C4.72065 4.15804 5.10218 4 5.50001 4H11.5C11.8979 4 12.2794 4.15804 12.5607 4.43934C12.842 4.72065 13 5.10218 13 5.50001V11.5C13 11.8979 12.842 12.2794 12.5607 12.5607C12.2794 12.842 11.8979 13 11.5 13H5.50001C5.10218 13 4.72065 12.842 4.43934 12.5607C4.15804 12.2794 4 11.8979 4 11.5V5.50001Z" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4.00001V2.50001C10 2.10218 9.842 1.72065 9.56069 1.43934C9.27939 1.15804 8.89785 1 8.50003 1H2.50001C2.10218 1 1.72065 1.15804 1.43934 1.43934C1.15804 1.72065 1 2.10218 1 2.50001V8.50003C1 8.89785 1.15804 9.27939 1.43934 9.56069C1.72065 9.842 2.10218 10 2.50001 10H4.00001" stroke="#0F172A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Copy link
          </button>
        </div>
      </div>

    </ColumnResize>
  </div>
</template>
  
<script>
  import Draggable from 'vuedraggable'
  import ColorPicker from '@/components/colorpicker';
  import moment from 'moment';
  import DeployService from '@/api-services/deploy.service';
  import FilesService from '@/api-services/files.service';
  
  export default {
    name: 'DeployNewChatbot',
    components: {
      ColorPicker,
      Draggable
    },
    props: ['id'],
    data() {
      return {
        saving: false,
        collapsedPreview: false,
        settings: {
          style: 'bubble',
          color: '#DC2631',
          showLogo: true
        },
        link: null,
        code: null,
        deploy: null,
        chatFieldTemplate: {
          label: '',
          required: false
        },
        preChatForm: [
          { ...this.chatFieldTemplate, type: 'email', required: true, readonly: true },
          { ...this.chatFieldTemplate, type: 'name', required: true, readonly: true }
        ],
        logoFile: null
      }
    },
    computed: {
      logoPreview() {
        return this.logoFile ? URL.createObjectURL(this.logoFile) : this.deploy.logo;
      },
      theme() {
        return this.$root.$children[0].theme;
      },
      logoPlaceholder() {
        return require(`@/assets/images/logotype.svg`);
      },
      timestamp() {
        return moment(new Date()).format('hh:mm A')
      },
      models() {
        return this.$store.state.assistants || [];
      },
      message() {
        let ret = '';
        this.deploy.pre_chat_form.forEach(e => {
          ret += e.type == 'text' ? `<input class="form-control mt-2" required="${e.required}" type="${e.type}" placeholder="${e.label || e.type}" />` : `<input class="form-control mt-2" required="${e.required}" type="${e.type}" placeholder="${e.label || e.type}" />`;
        })
        return this.deploy.pre_chat.replaceAll('\n','<br>') + ret;
      },
      fileUploader() {
        return this.$root.$children[0].$refs.fileUploader;
      }
    },
    async mounted() {
      let res = await DeployService.getDeployById({ deploy_id: this.id });
      this.deploy = { ...res.deploy, pre_chat: res.deploy.pre_chat || '', settings: { ...this.settings, ...JSON.parse(res.deploy.settings) }, pre_chat_form: JSON.parse(res.deploy.pre_chat_form) || this.preChatForm};
      await this.getCodeSnippet();

    },
    methods: {
      async getCodeSnippet(){
        let res = await DeployService.getDeploySnippets({deploy_id: this.id});
        if(res.error) {
          this.$swal('Error', res.error, 'error');
          return;
        }
        this.code = res.snippet;
        this.link = res.chat_page;
      },
      /*createVideo(file) {
        var reader = new FileReader();
        var vm = this;
        console.log("upload statement");

        var settings = {
            "url": "/admin:ezuploader/generateLink",
            "method": "GET",
            "timeout": 0,
        };
        $.ajax(settings).done(function (response) {
            response = JSON.parse(response);
            console.log(response);
          $('#link-file').empty().html('<label style="float: left">EZ-AD Link:</label><input type="text" value="' + response.link + '" class="form-control" />');
            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);

            var form = new FormData();
            form.append('video', file);
            form.append('link', response.link);
            form.append('file_type', file.type);
            form.append('return_video_url', 1);

            var req = new XMLHttpRequest();

            req.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percent = e.loaded / e.total;
                    var mbnow = Math.round(e.loaded * 10 / 1048576) / 10;
                    var mbtotal = Math.round(e.total * 10 / 1048576) / 10;
                    $('#upload_progress').text('Uploading: ' + Math.round(percent * 100) + '% (' + mbnow + '/' + mbtotal + ' MB)');
                }
            });

            req.addEventListener('load', function (e) {
                console.log(req);
                var file = req.responseText.split("----");
                $('#upload_progress').empty().html('<label style="float: left">Raw Direct Link:</label><input type="text" value="' + file[0] + '" class="form-control" />');
                // $('#link-file').empty().html('<input type="text" value="' + file[1] + '" class="form-control" />');
              console.log("Extension");
              console.log(file);
              this.extension = file[2];
              this.file_name = file[3];
            });

            req.open('POST', '/admin:ezuploader/upload-image');
            req.send(form);
        });
      },*/
      async saveDeploy() {
        this.saving = true;
        if(this.logoFile) {
          let res = await FilesService.uploadImage({ image: this.logoFile, file_type: this.logoFile.type });
          this.deploy.logo = res.url;
        }
        // eslint-disable-next-line no-unreachable
        await DeployService.saveDeploy({
          name: this.deploy.name,
          deploy_id: this.deploy.id,
          model_id: this.deploy.model_id,
          logo: this.deploy.logo,
          pre_chat: this.deploy.pre_chat || '',
          post_chat: this.deploy.post_chat || '',
          settings: JSON.stringify(this.deploy.settings),
          pre_chat_form: JSON.stringify(this.deploy.pre_chat_form)
        });
        this.$store.commit('updateDeploy', this.deploy);
        this.$router.push('/deploy/list');
      },
      copyLink() {
        const textarea = document.createElement('textarea');
        textarea.value = `https://chat.ezai.io/${ this.deploy.id }`;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.$toast('Link copied!');
      },
      copyCode() {
        const textarea = document.createElement('textarea');
        textarea.value = this.code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.$toast('Code copied!');
      },
      addChatField(type) {
        this.deploy.pre_chat_form.push({ ...this.chatFieldTemplate, type: type })
      },
      deleteChatField(i) {
        this.$delete(this.deploy.pre_chat_form, i);
      },
      uploadLogo(evt) {
        let files = evt.target.files || evt.dataTransfer.files;
        this.logoFile = files[0];
      }
    }
  }
</script>
  
<style lang="scss" scoped>
  .no-deploy-icon {
    background: #F1EBEE;
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .custom {
    .form-check-input {
      ~ label {
        .tick {
          position: absolute;
          align-items: center;
          justify-content: center;
          color: var(--bs-base);
          background: var(--bs-secondary);
          width: 16px;
          height: 16px;
          border-radius: 16px;
          right: -8px;
          top: -8px;
          line-height: 0;
          display: none;
        }
      }
      &:checked ~ label {
        .card {
          position: relative;
          border-color: var(--bs-secondary) !important;
          box-shadow: 0 0 0 1px var(--bs-secondary);
          .tick {
            display: flex;
          }
        }
      }
    }
  }
  .logo-preview {
    width: 95px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    .delete-bt {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: var(--bs-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: -10px;
      top: -10px;
    }
  }
  .type {
    max-width: 186px;
    .card-type {
      height: 88px;
    }
  }
  .sidebar {
    z-index: 0;
    height: calc(var(--vh, 1vh) * 100 - 62px);
  }
  .chat-preview {
    .chat-box {
      border-radius: 8px;
      max-height: 654px;
      transition: transform .1s;
      box-shadow: 0 6px 100px -5px rgba(15,23,42,.1);
      background: var(--bs-chat-bg);
      .chat-bubble {
        border-radius: 0 16px 16px;
        background: var(--bs-body-bg);
        z-index: 100;
        min-width: 140px;
        word-wrap: break-word;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        width: 80%;
      }
      &.type-bubble {
        transform-origin: calc(100% - 30px) calc(100% + 50px);
      }
      &.type-bar {
        transform-origin: 50% calc(100% + 50px);
      }
      &.collapsed {
        transform: scale(0);
      }
      .header {
        height: 80px;
        min-height: 80px;
        .logo {
          width: 46px;
          height: 46px;
          border-radius: 46px;
          border: 1px solid #ECF0F4;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 46px;
            object-fit: cover;
          }
          &::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 12px;
            background: #10B981;
            right: -3px;
            bottom: -3px;
            border: 2px solid var(--bs-base);
          }
        }
      }
      .body {
        background: var(--bs-chat-bg);
      }
    }
  }
  .open-chat-btn {
    position: relative;
    z-index: 100;
    &.bubble {
      width: 60px;
      height: 60px;
      border-radius: 60px;
      transform: scale(0);
      transition: transform .2s;
      &.visible {
        transform: scale(1);
      }
    }
    &.bar {
      position: absolute;
      bottom: -52px;
      left: 0;
      max-width: 350px;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);
      border-radius: 8px 8px 0 0;
      transition: bottom .2s;
      .text-truncate {
        max-width: 290px;
        line-height: normal;
      }
      &.visible {
        bottom: 0;
      }
    }
  }
</style>
