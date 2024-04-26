<template>
  <div>
    <div class="d-flex justify-content-center align-items-center" :class="{ 'loading h-100' : loading }" v-if="loading" style="min-height: 50px;">
      <div role="status" class="spinner-border text-primary"><span class="visually-hidden">Loading...</span></div>
    </div>
    <div id="posts" class="p-3 p-sm-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/files">Data Sources</router-link></li>
          <li class="breadcrumb-item active text-capitalize" aria-current="page">{{ account.name }} {{ account.media_type }}</li>
        </ol>
      </nav>
      
      <div class="mb-2">
        <h4 class="fw-bold text-capitalize">{{ account.name }} {{ account.media_type }}</h4>
      </div>
      <div v-for="post in posts" :key="post.id" class="p-2 card mb-2">
        <div class="d-flex">
          <div class="media overflow-hidden">
            <img v-if="post.media[0].type == 'image'" :src="post.media[0].url" class="w-100 h-100">
            <video v-else controls>
              <source :src="post.media[0].url" type="video/mp4">
              <source :src="post.media[0].url" type="video/ogg">
              Your browser does not support HTML video.
            </video>
          </div>
          <div class="px-3 py-2 d-flex flex-column align-items-stretch">
            <div class="fw-bold text-uppercase smaller">Caption</div>
            <div class="flex-grow-1">{{ post['caption'] }}</div>
            <div class="d-flex align-items-center">
              <div class="me-3 d-flex align-items-center">
                <svg class="me-1" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.91869 9.82848C2.22493 8.35598 0.833281 7.09394 0.833281 5.08115V5.06835L0.832844 5.05556C0.797606 4.02341 1.1725 3.01929 1.87556 2.26278C2.57779 1.50716 3.55032 1.05999 4.58094 1.01872C5.07161 1.00481 5.55917 1.10105 6.00778 1.30038C6.45747 1.50019 6.85653 1.79849 7.17546 2.17324L7.7472 2.84505L8.31827 2.17265C8.63732 1.79698 9.03702 1.49813 9.48759 1.29834C9.93735 1.09892 10.4262 1.00334 10.918 1.01868C11.949 1.05971 12.9219 1.50693 13.6243 2.26278L14.1461 1.77791L13.6243 2.26278C14.3274 3.01929 14.7023 4.02341 14.6671 5.05556L14.6666 5.06835V5.08115C14.6666 7.09942 13.213 8.413 11.6056 9.80759C11.4075 9.9788 11.2071 10.1535 11.0088 10.3295L11.0068 10.3313L10.3922 10.8806L10.3829 10.8889L10.3739 10.8975C9.63325 11.6051 8.8562 12.2735 8.0459 12.9C7.95634 12.9527 7.85418 12.9806 7.74995 12.9806C7.64578 12.9806 7.54368 12.9527 7.45416 12.9001C6.66935 12.2925 5.91597 11.6453 5.19695 10.9612L5.18849 10.9531L5.17977 10.9453L4.49511 10.3333L4.49417 10.3325C4.31684 10.1745 4.1386 10.0196 3.96581 9.86944C3.95004 9.85573 3.93436 9.8421 3.91869 9.82848ZM3.91869 9.82848L3.42661 10.3945L3.91869 9.82848Z" stroke="#0F172A" stroke-width="1.5"/></svg>
                {{ post.likes_count }}
              </div>
              <div class="me-3 d-flex align-items-center">
                <svg class="me-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5209 11.3386C14.331 9.93731 14.6032 8.28906 14.2867 6.70173C13.9703 5.11439 13.0867 3.69656 11.8012 2.7131C10.5157 1.72964 8.91609 1.24782 7.30125 1.35765C5.68641 1.46748 4.16678 2.16145 3.02625 3.30992C1.88573 4.45839 1.20232 5.9828 1.10369 7.59836C1.00507 9.21393 1.49798 10.8101 2.49034 12.0888C3.4827 13.3675 4.90663 14.2411 6.49612 14.5466C8.08561 14.852 9.73194 14.5684 11.1275 13.7486L14.4169 14.6666L13.5209 11.3386Z" stroke="#0F172A" stroke-width="1.5" stroke-linejoin="round"/></svg>
                {{ post.comment_count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import SocialService from '@/api-services/social.service';

export default {
  name: "PostsModule",
  components: {

  },
  data() {
    return {
      loading: false,
      accountId: this.$route.params.accId,
      modelId: this.$route.params.modelId,
      posts: [],
      account: [],

    }
  },
  async mounted() {
    await this.getPosts();
  },
  methods: {
    parse(str) {
      if(!this.post) return '';
      return JSON.parse(this.post['media'])[0][str]
    },
    async getPosts() {
      this.loading = true;
      let res = await SocialService.getSocialAccountPosts({account_id: this.accountId, model_id: this.modelId});
      if(res.success) {
        this.posts = res.posts.map(e => ({ ...e, media: JSON.parse(e.media)}));
        this.account = res.account;
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
  .media {
    width:120px;
    height:120px;
    min-width:120px;
    min-height:120px;
    border-radius: 4px;
    img {
      object-fit: cover;
    }
  }
</style>