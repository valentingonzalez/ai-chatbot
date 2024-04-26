<template>
  <div v-if="file" class="file d-flex align-items-center py-2 fs-7" :class="{ 'alt': alt }">
    <input v-if="showSelected" type="checkbox" class="form-check-input me-2" v-model="selected" @click="onSeletected(selected)">
    <div class="thumb" :class="{ 'opacity-50': disable }" >
      <div class="icon-badge d-flex">
        <svg v-if="file.file_type == 'youtube'" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6654 1.7491C15.4811 1.06026 14.9397 0.518933 14.2509 0.334541C13.0036 1.0014e-07 7.99997 0 7.99997 0C7.99997 0 2.99637 1.0014e-07 1.74909 0.334541C1.06026 0.518933 0.518933 1.06026 0.334541 1.7491C1.0014e-07 2.99637 0 5.60026 0 5.60026C0 5.60026 1.0014e-07 8.20416 0.334541 9.45145C0.518933 10.1403 1.06026 10.6816 1.74909 10.866C2.99637 11.2005 7.99997 11.2005 7.99997 11.2005C7.99997 11.2005 13.0036 11.2005 14.2509 10.866C14.9397 10.6816 15.4811 10.1403 15.6654 9.45145C16 8.20416 16 5.60026 16 5.60026C16 5.60026 15.9987 2.99637 15.6654 1.7491Z" fill="#FF0000"/><path d="M6.39844 7.9999L10.5552 5.60019L6.39844 3.20044V7.9999Z" fill="white"/></svg>
        <svg v-if="file.file_type == 'instagram'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_192_3959)" filter="url(#filter0_d_192_3959)"><path d="M10.0039 1.12109C6.71404 1.12109 5.75189 1.12449 5.56486 1.14C4.88973 1.19612 4.46962 1.30242 4.01194 1.53029C3.65922 1.70544 3.38105 1.90846 3.10651 2.19306C2.60653 2.71208 2.30351 3.3506 2.19381 4.10961C2.14048 4.47808 2.12497 4.55323 2.12182 6.43536C2.1206 7.06273 2.12182 7.8884 2.12182 8.99589C2.12182 12.2831 2.12545 13.2442 2.14121 13.4309C2.19575 14.0879 2.29878 14.5012 2.51696 14.9533C2.93391 15.8187 3.73025 16.4684 4.66841 16.7108C4.99324 16.7944 5.35202 16.8405 5.81261 16.8623C6.00776 16.8708 7.99679 16.8769 9.98703 16.8769C11.9773 16.8769 13.9675 16.8744 14.1578 16.8647C14.6911 16.8396 15.0008 16.7981 15.3432 16.7096C16.2874 16.466 17.0692 15.826 17.4947 14.9484C17.7086 14.5072 17.8171 14.0782 17.8662 13.4555C17.8769 13.3198 17.8813 11.1553 17.8813 8.99382C17.8813 6.83195 17.8765 4.67153 17.8658 4.53578C17.8161 3.90307 17.7076 3.47763 17.4868 3.02795C17.3056 2.65983 17.1044 2.38493 16.8123 2.10385C16.291 1.60593 15.6534 1.30291 14.8937 1.19333C14.5256 1.14012 14.4522 1.12437 12.5687 1.12109H10.0039Z" fill="url(#paint0_radial_192_3959)"/><path d="M10.0039 1.12109C6.71404 1.12109 5.75189 1.12449 5.56486 1.14C4.88973 1.19612 4.46962 1.30242 4.01194 1.53029C3.65922 1.70544 3.38105 1.90846 3.10651 2.19306C2.60653 2.71208 2.30351 3.3506 2.19381 4.10961C2.14048 4.47808 2.12497 4.55323 2.12182 6.43536C2.1206 7.06273 2.12182 7.8884 2.12182 8.99589C2.12182 12.2831 2.12545 13.2442 2.14121 13.4309C2.19575 14.0879 2.29878 14.5012 2.51696 14.9533C2.93391 15.8187 3.73025 16.4684 4.66841 16.7108C4.99324 16.7944 5.35202 16.8405 5.81261 16.8623C6.00776 16.8708 7.99679 16.8769 9.98703 16.8769C11.9773 16.8769 13.9675 16.8744 14.1578 16.8647C14.6911 16.8396 15.0008 16.7981 15.3432 16.7096C16.2874 16.466 17.0692 15.826 17.4947 14.9484C17.7086 14.5072 17.8171 14.0782 17.8662 13.4555C17.8769 13.3198 17.8813 11.1553 17.8813 8.99382C17.8813 6.83195 17.8765 4.67153 17.8658 4.53578C17.8161 3.90307 17.7076 3.47763 17.4868 3.02795C17.3056 2.65983 17.1044 2.38493 16.8123 2.10385C16.291 1.60593 15.6534 1.30291 14.8937 1.19333C14.5256 1.14012 14.4522 1.12437 12.5687 1.12109H10.0039Z" fill="url(#paint1_radial_192_3959)"/><path d="M10.0002 3.18164C8.42017 3.18164 8.22187 3.18855 7.60128 3.21679C6.98191 3.24515 6.55913 3.34321 6.18921 3.48709C5.80655 3.63569 5.48195 3.83447 5.15857 4.15797C4.83494 4.48136 4.63616 4.80596 4.48708 5.18849C4.34284 5.55854 4.24466 5.98143 4.21678 6.60057C4.18902 7.22115 4.18175 7.41957 4.18175 8.99965C4.18175 10.5797 4.18878 10.7774 4.2169 11.398C4.24539 12.0174 4.34344 12.4401 4.4872 12.8101C4.63592 13.1927 4.8347 13.5173 5.15821 13.8407C5.48147 14.1643 5.80607 14.3636 6.18848 14.5122C6.55865 14.6561 6.98155 14.7541 7.6008 14.7825C8.22139 14.8107 8.41956 14.8177 9.99951 14.8177C11.5797 14.8177 11.7774 14.8107 12.398 14.7825C13.0174 14.7541 13.4406 14.6561 13.8108 14.5122C14.1933 14.3636 14.5174 14.1643 14.8407 13.8407C15.1643 13.5173 15.3631 13.1927 15.5122 12.8102C15.6552 12.4401 15.7534 12.0173 15.7825 11.3981C15.8104 10.7775 15.8176 10.5797 15.8176 8.99965C15.8176 7.41957 15.8104 7.22128 15.7825 6.60069C15.7534 5.98131 15.6552 5.55854 15.5122 5.18861C15.3631 4.80595 15.1643 4.48136 14.8407 4.15797C14.5171 3.83435 14.1934 3.63557 13.8104 3.48709C13.4395 3.34321 13.0165 3.24515 12.3971 3.21679C11.7766 3.18855 11.579 3.18164 9.99842 3.18164H10.0002ZM9.47832 4.23009C9.63322 4.22985 9.80607 4.23009 10.0002 4.23009C11.5536 4.23009 11.7378 4.23567 12.3512 4.26355C12.9185 4.28949 13.2263 4.38427 13.4314 4.4639C13.7029 4.56936 13.8965 4.69541 14.1 4.89904C14.3036 5.10267 14.4297 5.29661 14.5354 5.56811C14.615 5.77296 14.7099 6.08083 14.7357 6.64808C14.7636 7.2614 14.7697 7.44563 14.7697 8.99831C14.7697 10.551 14.7636 10.7352 14.7357 11.3485C14.7098 11.9158 14.615 12.2237 14.5354 12.4285C14.4299 12.7 14.3036 12.8933 14.1 13.0969C13.8964 13.3005 13.703 13.4265 13.4314 13.532C13.2266 13.612 12.9185 13.7065 12.3512 13.7325C11.7379 13.7604 11.5536 13.7664 10.0002 13.7664C8.44671 13.7664 8.2626 13.7604 7.64928 13.7325C7.08203 13.7063 6.77416 13.6115 6.56895 13.5319C6.29744 13.4264 6.10351 13.3004 5.89988 13.0967C5.69625 12.8931 5.57019 12.6997 5.4645 12.428C5.38487 12.2232 5.28996 11.9153 5.26414 11.3481C5.23626 10.7347 5.23069 10.5505 5.23069 8.99686C5.23069 7.44321 5.23626 7.25994 5.26414 6.64663C5.29008 6.07937 5.38487 5.7715 5.4645 5.56642C5.56995 5.29491 5.69625 5.10098 5.89988 4.89735C6.10351 4.69372 6.29744 4.56766 6.56895 4.46197C6.77404 4.38197 7.08203 4.28743 7.64928 4.26137C8.18599 4.23712 8.39399 4.22985 9.47832 4.22864V4.23009ZM13.1058 5.19613C12.7204 5.19613 12.4077 5.50848 12.4077 5.89404C12.4077 6.27949 12.7204 6.5922 13.1058 6.5922C13.4913 6.5922 13.804 6.27949 13.804 5.89404C13.804 5.5086 13.4913 5.19588 13.1058 5.19588V5.19613ZM10.0002 6.01186C8.35023 6.01186 7.01245 7.34964 7.01245 8.99965C7.01245 10.6497 8.35023 11.9868 10.0002 11.9868C11.6503 11.9868 12.9875 10.6497 12.9875 8.99965C12.9875 7.34964 11.6503 6.01186 10.0002 6.01186ZM10.0002 7.06031C11.0712 7.06031 11.9396 7.92853 11.9396 8.99965C11.9396 10.0706 11.0712 10.939 10.0002 10.939C8.92912 10.939 8.06091 10.0706 8.06091 8.99965C8.06091 7.92853 8.92912 7.06031 10.0002 7.06031Z" fill="white"/></g><defs><filter id="filter0_d_192_3959" x="0" y="0" width="20" height="19.9995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_3959"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_3959" result="shape"/></filter><radialGradient id="paint0_radial_192_3959" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.30756 18.0904) rotate(-90) scale(15.6151 14.5273)"><stop stop-color="#FFDD55"/><stop offset="0.1" stop-color="#FFDD55"/><stop offset="0.5" stop-color="#FF543E"/><stop offset="1" stop-color="#C837AB"/></radialGradient><radialGradient id="paint1_radial_192_3959" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.518617 2.25611) rotate(78.6776) scale(6.9801 28.7795)"><stop stop-color="#3771C8"/><stop offset="0.128" stop-color="#3771C8"/><stop offset="1" stop-color="#6600FF" stop-opacity="0"/></radialGradient><clipPath id="clip0_192_3959"><rect width="16" height="15.9995" fill="white" transform="translate(2 1)"/></clipPath></defs></svg>
        <svg v-if="file.file_type == 'facebook'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_192_3966)" filter="url(#filter0_d_192_3966)"><path d="M8.68 16.92C4.88 16.24 2 12.96 2 9C2 4.6 5.6 1 10 1C14.4 1 18 4.6 18 9C18 12.96 15.12 16.24 11.32 16.92L10.88 16.56H9.12L8.68 16.92Z" fill="url(#paint0_linear_192_3966)"/><path d="M13.12 11.2401L13.48 9.00012H11.36V7.44012C11.36 6.80012 11.6 6.32012 12.56 6.32012H13.6V4.28012C13.04 4.20012 12.4 4.12012 11.84 4.12012C10 4.12012 8.72 5.24012 8.72 7.24012V9.00012H6.72V11.2401H8.72V16.8801C9.16 16.9601 9.6 17.0001 10.04 17.0001C10.48 17.0001 10.92 16.9601 11.36 16.8801V11.2401H13.12Z" fill="white"/></g><defs><filter id="filter0_d_192_3966" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_3966"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_3966" result="shape"/></filter><linearGradient id="paint0_linear_192_3966" x1="10.0004" y1="16.4436" x2="10.0004" y2="0.997053" gradientUnits="userSpaceOnUse"><stop stop-color="#0062E0"/><stop offset="1" stop-color="#19AFFF"/></linearGradient><clipPath id="clip0_192_3966"><rect width="16" height="16" fill="white" transform="translate(2 1)"/></clipPath></defs></svg>
      </div>
      <img class="rounded-1" v-if="file.thumbnail_url" :src="file.thumbnail_url" alt="">
      <img class="rounded-1" v-else :src="placeholder" alt="">
    </div>
    <div class="ms-2 flex-grow-1 overflow-hidden" :class="{'opacity-50': disable }">
      <div class="text-truncate">
        <a class="text-secondary small" v-if="file.file_url" :href="file.file_url" target="_blank">{{ file.title || file.file_url }}</a>
        <router-link v-else-if="file.file_type == 'youtube' || file.file_type == 'instagram' || file.file_type == 'facebook'" :to="`/posts/${file.account_id}/${model_id}`" class="text-secondary small">
          {{ file.title }}
        </router-link>
        <div v-else>{{ file.title || file.file_url}}</div>
      </div>
      <div class="d-flex align-items-center">
        <div class="smaller text-muted">{{ file.date_formatted }}</div>
        <template v-if="!alt && file.number_of_embeddings">
          <svg class="mx-2" width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1.33333 3.33317C2.06971 3.33317 2.66667 2.73622 2.66667 1.99984C2.66667 1.26346 2.06971 0.666504 1.33333 0.666504C0.596954 0.666504 0 1.26346 0 1.99984C0 2.73622 0.596954 3.33317 1.33333 3.33317Z" fill="#8390A2"/></svg>
          <div class="smaller text-nowrap text-muted">
            <router-link @click="$logActivity({action: 'click', page: $route.name, type: 'showEmbeddings'});" :to="`/embeddings/${file.id}`">
              {{ file.number_of_embeddings }}
            </router-link>
            Embeddings
          </div>
        </template>
        <template v-if="file.file_type == 'audio' || file.file_type == 'video' || file.file_type == 'youtube'">
          <svg class="mx-2" width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1.33333 3.33317C2.06971 3.33317 2.66667 2.73622 2.66667 1.99984C2.66667 1.26346 2.06971 0.666504 1.33333 0.666504C0.596954 0.666504 0 1.26346 0 1.99984C0 2.73622 0.596954 3.33317 1.33333 3.33317Z" fill="#8390A2"/></svg>
          <div class="smaller text-nowrap text-muted" :class="{'opacity-50': disable }">
            {{ $parseDuration(file.duration) }}
          </div>
        </template>
        <template v-if ="file.file_type == 'website'">
          <svg class="mx-2" width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M1.33333 3.33317C2.06971 3.33317 2.66667 2.73622 2.66667 1.99984C2.66667 1.26346 2.06971 0.666504 1.33333 0.666504C0.596954 0.666504 0 1.26346 0 1.99984C0 2.73622 0.596954 3.33317 1.33333 3.33317Z" fill="#8390A2"/></svg>
          <div class="smaller text-nowrap text-muted">
            <span><a class="smaller text-info cursor-pointer" @click.prevent="openLinksModal(file)">{{ file.links?.length }}</a> Links</span> 
          </div>
        </template>
        <a v-if="alt" class="smaller fw-bold text-info cursor-pointer" @click="getModelsForFile(file.id)"> {{ file.models }} Model<span v-if="file.models > 1">s</span> </a>
      </div>
    </div>
    <div v-if="!file.completed || file.error_message">
      <div class="status d-flex justify-content-center text-center text-nowrap">
        <div v-if="disable && !hide_disable" class="bg-danger smaller px-2">
          Disabled
        </div>
        <div v-else-if="file.error_message" class="bg-danger smaller d-flex align-items-center gap-1 justify-content-center px-2">
          Error <svg data-bs-toggle="tooltip" :title="file.error_message" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3996 6.99961C13.3996 8.69699 12.7253 10.3249 11.5251 11.5251C10.3249 12.7253 8.69699 13.3996 6.99961 13.3996C5.30222 13.3996 3.67436 12.7253 2.47413 11.5251C1.27389 10.3249 0.599609 8.69699 0.599609 6.99961C0.599609 5.30222 1.27389 3.67436 2.47413 2.47413C3.67436 1.27389 5.30222 0.599609 6.99961 0.599609C8.69699 0.599609 10.3249 1.27389 11.5251 2.47413C12.7253 3.67436 13.3996 5.30222 13.3996 6.99961ZM7.79961 3.79961C7.79961 4.01178 7.71532 4.21527 7.56529 4.36529C7.41527 4.51532 7.21178 4.59961 6.99961 4.59961C6.78744 4.59961 6.58395 4.51532 6.43392 4.36529C6.2839 4.21527 6.19961 4.01178 6.19961 3.79961C6.19961 3.58744 6.2839 3.38395 6.43392 3.23392C6.58395 3.08389 6.78744 2.99961 6.99961 2.99961C7.21178 2.99961 7.41527 3.08389 7.56529 3.23392C7.71532 3.38395 7.79961 3.58744 7.79961 3.79961ZM6.19961 6.19961C6.04048 6.19961 5.88787 6.26282 5.77535 6.37535C5.66282 6.48787 5.59961 6.64048 5.59961 6.79961C5.59961 6.95874 5.66282 7.11135 5.77535 7.22387C5.88787 7.3364 6.04048 7.39961 6.19961 7.39961H6.40201C6.43194 7.39962 6.46148 7.40635 6.48846 7.4193C6.51544 7.43224 6.53917 7.45108 6.5579 7.47442C6.57664 7.49776 6.58989 7.525 6.59669 7.55415C6.6035 7.58329 6.60367 7.61359 6.59721 7.64281L6.23001 9.29561C6.18447 9.50033 6.18551 9.71266 6.23304 9.91693C6.28057 10.1212 6.37339 10.3122 6.50464 10.4757C6.63589 10.6393 6.80221 10.7713 6.99132 10.862C7.18042 10.9527 7.38749 10.9997 7.59721 10.9996H7.79961C7.95874 10.9996 8.11135 10.9364 8.22387 10.8239C8.3364 10.7114 8.39961 10.5587 8.39961 10.3996C8.39961 10.2405 8.3364 10.0879 8.22387 9.97535C8.11135 9.86282 7.95874 9.79961 7.79961 9.79961H7.59721C7.56728 9.7996 7.53774 9.79287 7.51076 9.77992C7.48378 9.76698 7.46005 9.74814 7.44131 9.7248C7.42258 9.70146 7.40933 9.67421 7.40252 9.64507C7.39572 9.61593 7.39555 9.58563 7.40201 9.55641L7.76921 7.90361C7.81475 7.69889 7.81371 7.48656 7.76618 7.28229C7.71864 7.07803 7.62583 6.88705 7.49458 6.72347C7.36333 6.5599 7.19701 6.42789 7.0079 6.33722C6.8188 6.24655 6.61173 6.19952 6.40201 6.19961H6.19961Z" fill="#842029"/></svg>
        </div>
        <div v-else-if="!file.account_id && !file.completed" class="bg-warning smaller d-flex justify-content-center fw-bold px-2">
          {{ currentProgress }}%
        </div>
      </div>
    </div>
    <template v-else>
      <div v-if="alt && showOptions">
        <button type="button" id="fileCardMenu" data-bs-toggle="dropdown" aria-expanded="false">
          <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H2.01M9 2H9.01M16 2H16.01M3 2C3 2.55228 2.55228 3 2 3C1.44772 3 1 2.55228 1 2C1 1.44772 1.44772 1 2 1C2.55228 1 3 1.44772 3 2ZM10 2C10 2.55228 9.55228 3 9 3C8.44772 3 8 2.55228 8 2C8 1.44772 8.44772 1 9 1C9.55228 1 10 1.44772 10 2ZM17 2C17 2.55228 16.5523 3 16 3C15.4477 3 15 2.55228 15 2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <ul class="dropdown-menu fs-7" aria-labelledby="fileCardMenu" role="menu">
          <li><a class="dropdown-item" @click.prevent="openArchiveModal(file)" href="#">Archive</a></li>
          <li><a class="dropdown-item" @click.prevent="completeFileDeletion(file)" href="#">Delete</a></li>
        </ul>
        <router-link :to="`/embeddings/${file.id}`" class="d-flex align-items-center btn btn-link text-nowrap small">
          Embeddings ({{ file.number_of_embeddings }})
        </router-link>
      </div>
      <router-link v-else-if="alt" :to="`/embeddings/${file.id}`" class="d-flex align-items-center btn btn-link text-nowrap  small">
        Embeddings ({{ file.number_of_embeddings }})
      </router-link>
      <div v-else-if="showOptions" class="dropdown mx-2">
        <button type="button" id="fileCardMenu" data-bs-toggle="dropdown" aria-expanded="false">
          <svg width="16" height="3" viewBox="0 0 16 3" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5C1 1.76522 1.10536 2.01957 1.29289 2.20711C1.48043 2.39464 1.73478 2.5 2 2.5C2.26522 2.5 2.51957 2.39464 2.70711 2.20711C2.89464 2.01957 3 1.76522 3 1.5C3 1.23478 2.89464 0.98043 2.70711 0.792893C2.51957 0.605357 2.26522 0.5 2 0.5C1.73478 0.5 1.48043 0.605357 1.29289 0.792893C1.10536 0.98043 1 1.23478 1 1.5Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 1.5C7 1.76522 7.10536 2.01957 7.29289 2.20711C7.48043 2.39464 7.73478 2.5 8 2.5C8.26522 2.5 8.51957 2.39464 8.70711 2.20711C8.89464 2.01957 9 1.76522 9 1.5C9 1.23478 8.89464 0.98043 8.70711 0.792893C8.51957 0.605357 8.26522 0.5 8 0.5C7.73478 0.5 7.48043 0.605357 7.29289 0.792893C7.10536 0.98043 7 1.23478 7 1.5Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 1.5C13 1.76522 13.1054 2.01957 13.2929 2.20711C13.4804 2.39464 13.7348 2.5 14 2.5C14.2652 2.5 14.5196 2.39464 14.7071 2.20711C14.8946 2.01957 15 1.76522 15 1.5C15 1.23478 14.8946 0.98043 14.7071 0.792893C14.5196 0.605357 14.2652 0.5 14 0.5C13.7348 0.5 13.4804 0.605357 13.2929 0.792893C13.1054 0.98043 13 1.23478 13 1.5Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <ul class="dropdown-menu fs-7" aria-labelledby="fileCardMenu" role="menu">
          <template v-if="!social">
            <li v-if=" file.file_type == 'website'"><a class="dropdown-item" href="#" @click.prevent="openLinksModal(file)">Disable/Enable Pages</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="toggleDisable">{{ this.disable ? "Enable" : "Disable" }}</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="archive">Archive</a></li>
            <li><a class="dropdown-item" @click.prevent="completeFileDeletion" href="#">Delete</a></li>
          </template>
          <template v-else>
            <li><a class="dropdown-item" @click.prevent="disconnectSocialAccount" href="#">Disconnect</a></li>
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
  import FilesService from '@/api-services/files.service';
  import SocialService from '@/api-services/social.service';
  import EmbeddingService from '@/api-services/embedding.service'; 
  //import { ProgressCircle } from 'vue-progress-circle';
  export default {
    name: 'FileCardBig',
    props: {
      file: {
        default: null,
        required: true
      },
      model_id: {
        default: null,
      },
      hide_disable:{
        default: null,
      },
      alt: {
        default: false
      },
      showOptions: {
        default: true
      },
      showSelected: {
        default: false
      }
    },
    components: {
      //ProgressCircle
    },
    data() {
      return {
        placeholders: {
          csv: 'thumbnail-csv.svg',
          text: 'thumbnail-html.svg',
          document: 'thumbnail-doc.svg',
          pdf: 'thumbnail-pdf.svg',
          audio: 'thumbnail-audio.svg'
        },
        disable: null,
        currentProgress: 0,
        selected: false
      }
    },
    computed: {
      social() {
        return this.file.file_type == 'facebook' || this.file.file_type == 'instagram';
      },
      placeholder() {
        return require(`@/assets/images/${this.placeholders[this.file.file_type] ? this.placeholders[this.file.file_type] : 'thumbnail-placeholder.png'}`);
      }
    },
    mounted() {
      this.disable = this.file.disable;
      if(this.file.completed === 1) {
        return;
      }
      this.currentProgress = this.file.new ? 0 : this.file.progress;
      this.timer = setInterval(() => {
        if(this.file.progress === 100) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.currentProgress = (this.currentProgress < this.file.progress) ? this.currentProgress + 1 : this.currentProgress;
      }, this.currentProgress <= this.file.progress - 5 ? 500 : 1200);
    },
    methods: {
      openLinksModal(file){
        this.$emit('openLinksModal', file);
      },
      getModelsForFile(id) {
        this.$emit('getModelsForFile', id);
      },
      toggleDisable() {
        this.$logActivity({action: 'click', page: this.$route.name, type: this.disable ? 'Enable File' : 'Disable File', ref_id: this.file.id});

        this.disable = this.disable ? 0 : 1;
        FilesService.disable({ file_id: this.file.id, disable: this.disable, model_id: this.model_id }).then(res => {
          if(res.success) this.$toast(this.disable ? 'File Disabled!' : 'File Enabled!');
        });

      },
      openArchiveModal(file) {
        this.$emit('openArchiveModal',file)
      },
      async archive() {
        this.$logActivity({ action: 'click', page: this.$route.name,type: 'archive file', ref_id: this.file.id });
        const res = await FilesService.getTotalMapped({
          file_id: this.file.id,
          disable: this.disable,
        });
        if(!res.success) {
          this.$swal('Error',res.error);
          return;
        }
        if(res.mapped > 1) {
          this.$swal({
            title: 'Are you sure?',
            text: 'This file is used by more than 1 models. Do you want to archive this file for only this model or ALL models?',
            icon: 'danger',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Archive For All Models',
            denyButtonText: 'Archive Only For This Model',
            cancelButtonText: 'Cancel',
          }).then(res => {
            if(res.isConfirmed || res.isDenied) {
              FilesService.archiveFile({ 
                file_id: this.file.id,
                delete_type: res.isDenied ? 'one' : 'all',
                model_id: res.isDenied ? this.$parent.$parent.model.id: null
              }).then((res) => {
                if(res.success)
                  this.$toast('File archived successfullly');
              });
              this.$emit('onArchive', this.file.id);
            }
          });
        } else {
          this.$swal({
            title: 'Are you sure?',
            text: 'Do you want to archive this file?',
            icon: 'danger',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Archive',
            denyButtonText: 'Cancel',
          }).then((result) => {
            if(result.isConfirmed) {
              this.$emit('onArchive', this.file.id);
              FilesService.archiveFile({ file_id: this.file.id });
            }
          });
        }
      },
      changeLinkDisableEnable(link,fileId){
          EmbeddingService.enableDisableWebsiteEmbedding({link_id:link.id,file_id:fileId}).then(()=> {
            link.disabled = !link.disabled;
          });
        },
      onSeletected() {
        setTimeout(() => {
          this.$emit(this.selected ? 'addSelected' : 'removeSelected', this.file.id)
        }, 100);
      },
      completeFileDeletion() {
        this.$logActivity({ action: 'click', page: this.$route.name,type: 'deleteFile', ref_id: this.file.id });
        this.$swal({
          title: 'Are you sure?',
            text: 'Do you want to make a complete file delete? this cannot be undone',
            icon: 'warning',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Delete file',
            denyButtonText: 'Cancel',
        }).then((result) => {
          if(result.isConfirmed) {
            FilesService.completeFileDelete({ file_id: this.file.id }).then(res => {
              if(res.error){
                this.$swal('Error', 'Something went wrong,try again', 'error');
              }
              this.$store.dispatch('getAllModels');
              this.$store.dispatch('getAllFiles');
              this.$emit('onDelete', this.file.id);
              this.$toast('Your file has been deleted');
              this.$destroy();
              this.$el.parentNode.removeChild(this.$el);
            })
          }
        });
      },
      disconnectSocialAccount() {
        this.$swal({
          title: 'Are you sure?',
            text: 'Do you want to disconnect this account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Disconnect',
        }).then(res => {
          if(res.isConfirmed) {
            SocialService.disconnectSocialAccount({ model_id: this.file.model_id, account_id: this.file.account_id });
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .file {
    position: relative;
    word-break: break-word;
    &.alt {
      * {
        white-space: normal;
        word-break: break-word; 
      }
    }
    .status {
      border-radius: 10px;
      overflow: hidden;
    }
    .thumb {
      width: 32px;
      min-width: 32px;
      height: 32px;
      position: relative;
      .icon-badge {
        position: absolute;
        bottom: -5px;
        right: -5px;
      }
      &:not(.svg) {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &.svg {
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
  @keyframes glowing {
    0% {
      box-shadow: 0 0 5px #fff;
    }
    50% {
      box-shadow: 0 0 15px #fff;
    }
    100% {
      box-shadow: 0 0 5px #fff;
    }
  }
</style>
