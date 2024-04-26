<template>
  <div>
    <div class="container pt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="mb-0 fw-bold flex-grow-1">Data Sources</h3>
        <input type="search" class="form-control" placeholder="Search Data Sources" v-model="search" />
        <div class="mx-2">
          <button type="button" class="btn btn-outline-secondary px-3" data-bs-toggle="dropdown" aria-expanded="false">
            {{ selectedType }}
            <svg class="ms-4 me-n1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><path d="M2.625 4.875L6 8.25L9.375 4.875" stroke="#64748B" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></g></svg>
          </button>
          <ul class="dropdown-menu fs-7" aria-labelledby="filePageType" role="menu">
            <li v-for="(type) in fileTypes" :key="type">
              <a class="dropdown-item" href="#" @click.prevent="selectedType = type">
                {{ type }}
              </a>
            </li>
          </ul>
        </div>
        <FileSort @onFileSort="selectSort" />
        <AddSource class="ms-2" />
      </div>

      <div class="table-responsive mt-4">
        <table class="table table-borderless mb-0">
          <thead>
            <tr>
              <th scope="col" width="35%">Source</th>
              <th scope="col" width="15%">Date</th>
              <th scope="col" width="15%">Assistants</th>
              <th scope="col" width="15%">Training</th>
              <th scope="col" width="20%">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in filteredFiles" :key="file.id">
              <td width="35%">
                <div class="d-flex align-items-center">
                  <div class="thumb me-3">
                    <div class="icon-badge d-flex">
                      <svg v-if="file.file_type == 'youtube'" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6654 1.7491C15.4811 1.06026 14.9397 0.518933 14.2509 0.334541C13.0036 1.0014e-07 7.99997 0 7.99997 0C7.99997 0 2.99637 1.0014e-07 1.74909 0.334541C1.06026 0.518933 0.518933 1.06026 0.334541 1.7491C1.0014e-07 2.99637 0 5.60026 0 5.60026C0 5.60026 1.0014e-07 8.20416 0.334541 9.45145C0.518933 10.1403 1.06026 10.6816 1.74909 10.866C2.99637 11.2005 7.99997 11.2005 7.99997 11.2005C7.99997 11.2005 13.0036 11.2005 14.2509 10.866C14.9397 10.6816 15.4811 10.1403 15.6654 9.45145C16 8.20416 16 5.60026 16 5.60026C16 5.60026 15.9987 2.99637 15.6654 1.7491Z" fill="#FF0000"/><path d="M6.39844 7.9999L10.5552 5.60019L6.39844 3.20044V7.9999Z" fill="white"/></svg>
                      <svg v-if="file.file_type == 'instagram'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_192_3959)" filter="url(#filter0_d_192_3959)"><path d="M10.0039 1.12109C6.71404 1.12109 5.75189 1.12449 5.56486 1.14C4.88973 1.19612 4.46962 1.30242 4.01194 1.53029C3.65922 1.70544 3.38105 1.90846 3.10651 2.19306C2.60653 2.71208 2.30351 3.3506 2.19381 4.10961C2.14048 4.47808 2.12497 4.55323 2.12182 6.43536C2.1206 7.06273 2.12182 7.8884 2.12182 8.99589C2.12182 12.2831 2.12545 13.2442 2.14121 13.4309C2.19575 14.0879 2.29878 14.5012 2.51696 14.9533C2.93391 15.8187 3.73025 16.4684 4.66841 16.7108C4.99324 16.7944 5.35202 16.8405 5.81261 16.8623C6.00776 16.8708 7.99679 16.8769 9.98703 16.8769C11.9773 16.8769 13.9675 16.8744 14.1578 16.8647C14.6911 16.8396 15.0008 16.7981 15.3432 16.7096C16.2874 16.466 17.0692 15.826 17.4947 14.9484C17.7086 14.5072 17.8171 14.0782 17.8662 13.4555C17.8769 13.3198 17.8813 11.1553 17.8813 8.99382C17.8813 6.83195 17.8765 4.67153 17.8658 4.53578C17.8161 3.90307 17.7076 3.47763 17.4868 3.02795C17.3056 2.65983 17.1044 2.38493 16.8123 2.10385C16.291 1.60593 15.6534 1.30291 14.8937 1.19333C14.5256 1.14012 14.4522 1.12437 12.5687 1.12109H10.0039Z" fill="url(#paint0_radial_192_3959)"/><path d="M10.0039 1.12109C6.71404 1.12109 5.75189 1.12449 5.56486 1.14C4.88973 1.19612 4.46962 1.30242 4.01194 1.53029C3.65922 1.70544 3.38105 1.90846 3.10651 2.19306C2.60653 2.71208 2.30351 3.3506 2.19381 4.10961C2.14048 4.47808 2.12497 4.55323 2.12182 6.43536C2.1206 7.06273 2.12182 7.8884 2.12182 8.99589C2.12182 12.2831 2.12545 13.2442 2.14121 13.4309C2.19575 14.0879 2.29878 14.5012 2.51696 14.9533C2.93391 15.8187 3.73025 16.4684 4.66841 16.7108C4.99324 16.7944 5.35202 16.8405 5.81261 16.8623C6.00776 16.8708 7.99679 16.8769 9.98703 16.8769C11.9773 16.8769 13.9675 16.8744 14.1578 16.8647C14.6911 16.8396 15.0008 16.7981 15.3432 16.7096C16.2874 16.466 17.0692 15.826 17.4947 14.9484C17.7086 14.5072 17.8171 14.0782 17.8662 13.4555C17.8769 13.3198 17.8813 11.1553 17.8813 8.99382C17.8813 6.83195 17.8765 4.67153 17.8658 4.53578C17.8161 3.90307 17.7076 3.47763 17.4868 3.02795C17.3056 2.65983 17.1044 2.38493 16.8123 2.10385C16.291 1.60593 15.6534 1.30291 14.8937 1.19333C14.5256 1.14012 14.4522 1.12437 12.5687 1.12109H10.0039Z" fill="url(#paint1_radial_192_3959)"/><path d="M10.0002 3.18164C8.42017 3.18164 8.22187 3.18855 7.60128 3.21679C6.98191 3.24515 6.55913 3.34321 6.18921 3.48709C5.80655 3.63569 5.48195 3.83447 5.15857 4.15797C4.83494 4.48136 4.63616 4.80596 4.48708 5.18849C4.34284 5.55854 4.24466 5.98143 4.21678 6.60057C4.18902 7.22115 4.18175 7.41957 4.18175 8.99965C4.18175 10.5797 4.18878 10.7774 4.2169 11.398C4.24539 12.0174 4.34344 12.4401 4.4872 12.8101C4.63592 13.1927 4.8347 13.5173 5.15821 13.8407C5.48147 14.1643 5.80607 14.3636 6.18848 14.5122C6.55865 14.6561 6.98155 14.7541 7.6008 14.7825C8.22139 14.8107 8.41956 14.8177 9.99951 14.8177C11.5797 14.8177 11.7774 14.8107 12.398 14.7825C13.0174 14.7541 13.4406 14.6561 13.8108 14.5122C14.1933 14.3636 14.5174 14.1643 14.8407 13.8407C15.1643 13.5173 15.3631 13.1927 15.5122 12.8102C15.6552 12.4401 15.7534 12.0173 15.7825 11.3981C15.8104 10.7775 15.8176 10.5797 15.8176 8.99965C15.8176 7.41957 15.8104 7.22128 15.7825 6.60069C15.7534 5.98131 15.6552 5.55854 15.5122 5.18861C15.3631 4.80595 15.1643 4.48136 14.8407 4.15797C14.5171 3.83435 14.1934 3.63557 13.8104 3.48709C13.4395 3.34321 13.0165 3.24515 12.3971 3.21679C11.7766 3.18855 11.579 3.18164 9.99842 3.18164H10.0002ZM9.47832 4.23009C9.63322 4.22985 9.80607 4.23009 10.0002 4.23009C11.5536 4.23009 11.7378 4.23567 12.3512 4.26355C12.9185 4.28949 13.2263 4.38427 13.4314 4.4639C13.7029 4.56936 13.8965 4.69541 14.1 4.89904C14.3036 5.10267 14.4297 5.29661 14.5354 5.56811C14.615 5.77296 14.7099 6.08083 14.7357 6.64808C14.7636 7.2614 14.7697 7.44563 14.7697 8.99831C14.7697 10.551 14.7636 10.7352 14.7357 11.3485C14.7098 11.9158 14.615 12.2237 14.5354 12.4285C14.4299 12.7 14.3036 12.8933 14.1 13.0969C13.8964 13.3005 13.703 13.4265 13.4314 13.532C13.2266 13.612 12.9185 13.7065 12.3512 13.7325C11.7379 13.7604 11.5536 13.7664 10.0002 13.7664C8.44671 13.7664 8.2626 13.7604 7.64928 13.7325C7.08203 13.7063 6.77416 13.6115 6.56895 13.5319C6.29744 13.4264 6.10351 13.3004 5.89988 13.0967C5.69625 12.8931 5.57019 12.6997 5.4645 12.428C5.38487 12.2232 5.28996 11.9153 5.26414 11.3481C5.23626 10.7347 5.23069 10.5505 5.23069 8.99686C5.23069 7.44321 5.23626 7.25994 5.26414 6.64663C5.29008 6.07937 5.38487 5.7715 5.4645 5.56642C5.56995 5.29491 5.69625 5.10098 5.89988 4.89735C6.10351 4.69372 6.29744 4.56766 6.56895 4.46197C6.77404 4.38197 7.08203 4.28743 7.64928 4.26137C8.18599 4.23712 8.39399 4.22985 9.47832 4.22864V4.23009ZM13.1058 5.19613C12.7204 5.19613 12.4077 5.50848 12.4077 5.89404C12.4077 6.27949 12.7204 6.5922 13.1058 6.5922C13.4913 6.5922 13.804 6.27949 13.804 5.89404C13.804 5.5086 13.4913 5.19588 13.1058 5.19588V5.19613ZM10.0002 6.01186C8.35023 6.01186 7.01245 7.34964 7.01245 8.99965C7.01245 10.6497 8.35023 11.9868 10.0002 11.9868C11.6503 11.9868 12.9875 10.6497 12.9875 8.99965C12.9875 7.34964 11.6503 6.01186 10.0002 6.01186ZM10.0002 7.06031C11.0712 7.06031 11.9396 7.92853 11.9396 8.99965C11.9396 10.0706 11.0712 10.939 10.0002 10.939C8.92912 10.939 8.06091 10.0706 8.06091 8.99965C8.06091 7.92853 8.92912 7.06031 10.0002 7.06031Z" fill="white"/></g><defs><filter id="filter0_d_192_3959" x="0" y="0" width="20" height="19.9995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_3959"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_3959" result="shape"/></filter><radialGradient id="paint0_radial_192_3959" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.30756 18.0904) rotate(-90) scale(15.6151 14.5273)"><stop stop-color="#FFDD55"/><stop offset="0.1" stop-color="#FFDD55"/><stop offset="0.5" stop-color="#FF543E"/><stop offset="1" stop-color="#C837AB"/></radialGradient><radialGradient id="paint1_radial_192_3959" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.518617 2.25611) rotate(78.6776) scale(6.9801 28.7795)"><stop stop-color="#3771C8"/><stop offset="0.128" stop-color="#3771C8"/><stop offset="1" stop-color="#6600FF" stop-opacity="0"/></radialGradient><clipPath id="clip0_192_3959"><rect width="16" height="15.9995" fill="white" transform="translate(2 1)"/></clipPath></defs></svg>
                      <svg v-if="file.file_type == 'facebook'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_192_3966)" filter="url(#filter0_d_192_3966)"><path d="M8.68 16.92C4.88 16.24 2 12.96 2 9C2 4.6 5.6 1 10 1C14.4 1 18 4.6 18 9C18 12.96 15.12 16.24 11.32 16.92L10.88 16.56H9.12L8.68 16.92Z" fill="url(#paint0_linear_192_3966)"/><path d="M13.12 11.2401L13.48 9.00012H11.36V7.44012C11.36 6.80012 11.6 6.32012 12.56 6.32012H13.6V4.28012C13.04 4.20012 12.4 4.12012 11.84 4.12012C10 4.12012 8.72 5.24012 8.72 7.24012V9.00012H6.72V11.2401H8.72V16.8801C9.16 16.9601 9.6 17.0001 10.04 17.0001C10.48 17.0001 10.92 16.9601 11.36 16.8801V11.2401H13.12Z" fill="white"/></g><defs><filter id="filter0_d_192_3966" x="0" y="0" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="1"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_192_3966"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_192_3966" result="shape"/></filter><linearGradient id="paint0_linear_192_3966" x1="10.0004" y1="16.4436" x2="10.0004" y2="0.997053" gradientUnits="userSpaceOnUse"><stop stop-color="#0062E0"/><stop offset="1" stop-color="#19AFFF"/></linearGradient><clipPath id="clip0_192_3966"><rect width="16" height="16" fill="white" transform="translate(2 1)"/></clipPath></defs></svg>
                    </div>
                    <img class="rounded-1" v-if="file.thumbnail_url" :src="file.thumbnail_url" alt="">
                    <img class="rounded-1" v-else :src="placeholder(file.file_type)" alt="">
                  </div>
                  <div class="title">
                    {{ file.title }}
                  </div>
                </div>
              </td>
              <td width="15%">
                {{ file.date_formatted }}
              </td>
              <td width="15%">
                {{ file.models }} Assistant{{ file.models != 1 ? 's' : '' }}
              </td>
              <td width="15%" class="text-center">
                <div v-if="file.disable" class="badge bg-danger d-inline-flex small">Disabled</div>
                <div v-else-if="file.error_message" class="badge bg-danger d-inline-flex small d-flex align-items-center">
                  <button type="button" class="me-2" data-bs-toggle="tooltip" :title="file.error_message">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3996 6.99961C13.3996 8.69699 12.7253 10.3249 11.5251 11.5251C10.3249 12.7253 8.69699 13.3996 6.99961 13.3996C5.30222 13.3996 3.67436 12.7253 2.47413 11.5251C1.27389 10.3249 0.599609 8.69699 0.599609 6.99961C0.599609 5.30222 1.27389 3.67436 2.47413 2.47413C3.67436 1.27389 5.30222 0.599609 6.99961 0.599609C8.69699 0.599609 10.3249 1.27389 11.5251 2.47413C12.7253 3.67436 13.3996 5.30222 13.3996 6.99961ZM7.79961 3.79961C7.79961 4.01178 7.71532 4.21527 7.56529 4.36529C7.41527 4.51532 7.21178 4.59961 6.99961 4.59961C6.78744 4.59961 6.58395 4.51532 6.43392 4.36529C6.2839 4.21527 6.19961 4.01178 6.19961 3.79961C6.19961 3.58744 6.2839 3.38395 6.43392 3.23392C6.58395 3.08389 6.78744 2.99961 6.99961 2.99961C7.21178 2.99961 7.41527 3.08389 7.56529 3.23392C7.71532 3.38395 7.79961 3.58744 7.79961 3.79961ZM6.19961 6.19961C6.04048 6.19961 5.88787 6.26282 5.77535 6.37535C5.66282 6.48787 5.59961 6.64048 5.59961 6.79961C5.59961 6.95874 5.66282 7.11135 5.77535 7.22387C5.88787 7.3364 6.04048 7.39961 6.19961 7.39961H6.40201C6.43194 7.39962 6.46148 7.40635 6.48846 7.4193C6.51544 7.43224 6.53917 7.45108 6.5579 7.47442C6.57664 7.49776 6.58989 7.525 6.59669 7.55415C6.6035 7.58329 6.60367 7.61359 6.59721 7.64281L6.23001 9.29561C6.18447 9.50033 6.18551 9.71266 6.23304 9.91693C6.28057 10.1212 6.37339 10.3122 6.50464 10.4757C6.63589 10.6393 6.80221 10.7713 6.99132 10.862C7.18042 10.9527 7.38749 10.9997 7.59721 10.9996H7.79961C7.95874 10.9996 8.11135 10.9364 8.22387 10.8239C8.3364 10.7114 8.39961 10.5587 8.39961 10.3996C8.39961 10.2405 8.3364 10.0879 8.22387 9.97535C8.11135 9.86282 7.95874 9.79961 7.79961 9.79961H7.59721C7.56728 9.7996 7.53774 9.79287 7.51076 9.77992C7.48378 9.76698 7.46005 9.74814 7.44131 9.7248C7.42258 9.70146 7.40933 9.67421 7.40252 9.64507C7.39572 9.61593 7.39555 9.58563 7.40201 9.55641L7.76921 7.90361C7.81475 7.69889 7.81371 7.48656 7.76618 7.28229C7.71864 7.07803 7.62583 6.88705 7.49458 6.72347C7.36333 6.5599 7.19701 6.42789 7.0079 6.33722C6.8188 6.24655 6.61173 6.19952 6.40201 6.19961H6.19961Z" fill="currentColor"/></svg>
                  </button>
                  Error
                </div>
                <template v-else>
                  <div :class="`badge bg-${getStatusClass(file.status)} small d-inline-flex align-items-center fw-medium`">
                    <svg class="me-2" v-if="file.progress == 100" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.6665 6L5.6665 8L9.6665 4" stroke="#42B075" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/></svg>
                    <div v-else class="percent me-2">{{ file.progress }}%</div>
                    {{ getStatus(file.status) }}
                  </div>
                </template>
              </td>
              <td width="20%">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <div v-if="file.duration">{{ $parseDuration(file.duration) }}</div>
                  </div>
                  <div class="dropdown">
                    <button type="button" :id="`fileOptions-${file.id}`" data-bs-toggle="dropdown" aria-expanded="false">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1896_22086)"><path d="M5 12C5 12.2652 5.10536 12.5196 5.29289 12.7071C5.48043 12.8946 5.73478 13 6 13C6.26522 13 6.51957 12.8946 6.70711 12.7071C6.89464 12.5196 7 12.2652 7 12C7 11.7348 6.89464 11.4804 6.70711 11.2929C6.51957 11.1054 6.26522 11 6 11C5.73478 11 5.48043 11.1054 5.29289 11.2929C5.10536 11.4804 5 11.7348 5 12Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 12C17 12.2652 17.1054 12.5196 17.2929 12.7071C17.4804 12.8946 17.7348 13 18 13C18.2652 13 18.5196 12.8946 18.7071 12.7071C18.8946 12.5196 19 12.2652 19 12C19 11.7348 18.8946 11.4804 18.7071 11.2929C18.5196 11.1054 18.2652 11 18 11C17.7348 11 17.4804 11.1054 17.2929 11.2929C17.1054 11.4804 17 11.7348 17 12Z" fill="#94A3B8" stroke="#94A3B8" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1896_22086"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
                    </button>
                    <ul class="dropdown-menu fs-7" aria-labelledby="`fileOptions-${file.id}`" role="menu" style="width: 230px">
                      <li>
                        <a class="dropdown-item" href="#" @click.prevent="getModelsForFile(file.id)">Assign to Assistant</a>
                      </li>
                      <!--<li>
                        <a class="dropdown-item" href="#" @click.prevent="() => {}">Resync</a>
                      </li>-->
                      <li>
                        <a class="dropdown-item" href="#" @click.prevent="deleteFile(file)">Delete</a>
                      </li>
                      <!--<li>
                        <a class="dropdown-item" href="#" @click.prevent="() => {}">Disconnect</a>
                      </li>-->
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal" ref="modelModalRef">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content" style="min-height: 370px;">
          <div class="modal-header pb-2 mb-3">
            <h4 class="modal-title">Assistants</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-2" style="max-height: 500px;overflow: auto;">
            <div class="d-flex mb-3 align-items-center justify-content-between">
              <input v-if="!loading" v-model="modelFilter" type="text" class="form-control" placeholder="Search Assistants" />
              <ModelSort @onModelSort="selectModelSort" class="ms-2" />
            </div>
            <div v-if="filteredModels.length === 0 && !loadingModels">
              <h4 class="modal-title">
                No Assistants found
              </h4>
            </div>
            <div v-else-if="!loadingModels"> 
              <div v-for="model in filteredModels" v-bind:key="model.id" class="mb-3 d-flex flex-row justify-content-between border-bottom">
                <p>{{ model.name }}</p>
                <input type="checkbox" class="form-check-input" v-model="model.is_used">
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center loading h-100" v-else  style="min-height: 50px;">
              <div role="status" class="spinner-border text-primary"><span class="visually-hidden">Loading...</span></div>
            </div>
          </div>
          <div class="modal-footer pt-2">
            <button type="button" class="btn px-5 btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn px-5 btn-primary" :disabled="updatingModel" @click="updateModels" >
              <div class="spinner-border spinner-border-sm me-2" v-if="updatingModel"></div>
              Update Assistants
            </button>
          </div>
        </div>
      </div>
    </div>
    <ArchiveFileModal :file="selectedArchiveFile" ref="archiveFileModal"/>
  </div>
</template>
  
<script>
  import FilesService from '@/api-services/files.service';
  import FileSort from '@/components/file-sort.vue';
  import { Modal } from 'bootstrap';
  import { EventBus } from '@/main';
  import ModelSort from '@/components/models/model-sort.vue'
  import ArchiveFileModal from '@/modals/files/archive-file-modal.vue';
  import AddSource from '@/components/uploader/add-source';

  export default {
    name: 'FilesModule',
    components:{
      ModelSort,
      FileSort,
      ArchiveFileModal,
      AddSource
    },
    data() {
      return {
        loading: true,
        search: '',
        training: 0,
        selectedType: 'All Sources',
        selectedSort:{},
        fileTypes: ['All Sources','Documents','Audios/Videos','YouTube','Websites','Social Accounts'],
        updatingModel: false,
        loadingModels: false,
        models: [],
        modelFilter:'',
        selectedModelSort:{},
        selectedFile: null,
        selectedArchiveFile: {},
        placeholders: {
          csv: 'thumbnail-csv.svg',
          text: 'thumbnail-html.svg',
          document: 'thumbnail-doc.svg',
          pdf: 'thumbnail-pdf.svg',
          audio: 'thumbnail-audio.svg',
          image: ''
        },
      }
    },
    computed: {
      files() {
        return this.$store.state.files;
      },
      root() {
        return this.$root.$children[0];
      },
      filteredFiles() {
        return this.files ? this.files.filter(e => e.file_url.toLowerCase().includes(this.search.toLowerCase()) || e.title.toLowerCase().includes(this.search.toLowerCase())).filter(e => this.training ? !e.completed: e)
        .filter(e => 
          this.selectedType == 'Documents' ? e.file_type == 'pdf' || e.file_type == 'document' || e.file_type == 'csv' :
          this.selectedType == 'Audios/Videos' ? e.file_type == 'audio' || e.file_type == 'video' :
          this.selectedType == 'YouTube' ? e.file_type == 'youtube' :
          this.selectedType == 'Websites' ? e.file_type == 'website' :
          this.selectedType == 'Social Accounts' ? e.file_type == 'social' : e
        ).sort((a,b) => {
          if(this.selectedSort?.value == 'title') {
            return this.selectedSort.order == 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
          } else if(this.selectedSort?.value == 'date') {
            return this.selectedSort.order == 'ASC' ? new Date(a.date_added) - new Date(b.date_added) : new Date(b.date_added) - new Date(a.date_added);
          }
        }) : [];
      },
      filteredModels() {
        if(!this.models) return [];
        return this.models.filter(e => e.name.toLowerCase().includes(this.modelFilter.toLowerCase())).sort((a,b) => {
          if(this.selectedModelSort?.value == 'title') {
            return this.selectedModelSort.order == 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
          } else if(this.selectedModelSort?.value == 'date') {
            return this.selectedModelSort.order == 'ASC' ? new Date(a.date_added) - new Date(b.date_added) : new Date(b.date_added) - new Date(a.date_added);
          }
        });
      },
      modelModal() {
        return new Modal(this.$refs.modelModalRef);
      },
    },
    async mounted() {
      if(!this.files) {
        await this.$store.dispatch('getAllFiles');
      }
      this.loading = false;
      EventBus.$on('refreshFiles', () => {
        this.$store.dispatch('getAllFiles');
      });
    },
    methods: {
      getStatus(status) {
        return status == 'done' ? 'Completed' : status == 'processing' ? 'Training' : '';
      },
      getStatusClass(status) {
        return status == 'done' ? 'success' : status == 'processing' ? 'warning' : '';
      },
      placeholder(type) {
        return require(`@/assets/images/${this.placeholders[type] ? this.placeholders[type] : 'thumbnail-placeholder.png'}`);
      },
      deleteFile(file) {
        this.$logActivity({ action: 'click', page: this.$route.name,type: 'deleteFile', ref_id: file.id });
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
            this.$store.dispatch('deleteFile', file.id);
            this.$toast('Your file has been deleted');
          }
        });
      },
      openArchiveModal(file){
        this.selectedArchiveFile = file;
        this.$nextTick(() => {
          this.$refs.archiveFileModal.show();
        });
      },
      selectModelSort(name) {
      this.selectedModelSort = name;
    },
      selectSort(name) {
        this.selectedSort = name;
      },
      getModelsForFile(id) {
        this.models = [];
        this.selectedFile = id;
        this.modelModal.show();
        this.loadingModels = true;
        FilesService.getModelsForFile({ file_id: id }).then(res => {
          this.loadingModels = false;
          this.models = res.models.sort((a,b) => {
            return a.is_used < b.is_used ? 1 : (a.is_used > b.is_used ? -1 : 0);
          })
        });
      },
      updateModels() {
        if(!this.selectedFile) return;
        let ids = this.models.filter(e => e.is_used);
        if(ids.length) {
          ids = ids.map(e => e.id).join(',')
          this.updatingModel = true;
          FilesService.updateModelsForFile({ file_id: this.selectedFile, ids: ids }).then(res => {
            this.updatingModel = false;
            if(res.success) {
              this.modelModal.hide();
              this.$store.commit('setFiles', this.files.map(e => ({ ...e, models: e.id == this.selectedFile ? e.models = ids.split(',').length : e.models })));
              this.$swal('Assistants Updated Successfully');
            }
          });
        } else {
          this.$swal('No Assistant Selected', 'error');
        }
      },
      showArchived(id) {
        let file = this.files.find(f => f.id == id);
        if(file.archived) {
          this.$swal('',`The file ${file.title} is already archived`, 'warning');
        } else {
          this.$swal('',`The file ${file.title} has been archived`, 'info');
        }
      }
    }
  }
</script>
  
<style lang="scss" scoped>
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
          background: var(--bs-card-bg);
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
