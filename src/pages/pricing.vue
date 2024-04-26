<template>
  <div id="pricingPageId" class="mx-3 mt-4 mb-5">
    <div class="d-flex justify-content-between">
      <h2 class="fw-bold">Pricing Plans</h2>
      <router-link  to="/" type="button" class="btn btn-primary fw-bold px-4 mb-2">Go To Chat</router-link>
    </div>
    <div class="row">
      <div class="col-md-3 mb-3" v-for="(plan, i) in plans" :key="`plan-${i}`" :class="{ 'displaying': showingPlan == i }">
        <div class="card h-100">
          <div v-if="plan.name == 'Free'"  class="d-flex p-3 pb-0 justify-content-between align-items-center">
            <h3>{{ plan.name }}</h3>
            <div class="d-flex flex-wrap gap-2">
              <span  class="badge rounded-pill free-badge">No Card Required</span>
            </div>
          </div>
          <h3 v-else class="p-3 pb-0" >{{ plan.name }}</h3>
          <div class="info d-flex flex-column border-bottom p-3 pt-1">
            <div class="smaller description" v-html="plan.description"></div>
            <div class="d-flex  flex-grow-1" :class="plan.name == 'Enterprise' ? 'flex-column align-items-start justify-content-center' : 'align-items-center'">
              <div class="display-6 fw-bolder" v-if="plan.name !== 'Enterprise'">
                {{ plan.price != '-' ? `$${plan.price}` : plan.price }}
              </div>
              <div class="mb-1 ms-2" :class="plan.name != 'Enterprise' ? 'text-muted' : ''">
                <span v-if="plan.name != 'Enterprise'">/</span> {{ plan.period }}
              </div>
              <div class="mb-1 ms-2" v-if="plan.name == 'Enterprise'">
                <h5 class="fw-bold">Starts at $250 Per Month</h5>
              </div>
            </div>
            <div class="col-6 col-md-12">
              <button type="button" :disabled="i < currentPlan && i != 0 " :class="{ 'current-plan': currentPlan == i,'downgrade': plan.callToAction.label.toLowerCase() == 'downgrade' && currentPlan != i }" class="btn btn-secondary w-100 justify-content-center" @click="planButtonAction(plan,i)">
                {{ currentPlan != i ? (i < currentPlan && i != 0 ? 'You own a better plan' : plan.callToAction.label) : 'Current Plan' }}
              </button>
            </div>
          </div>
          <div class="to-collapse flex-grow-1 d-flex flex-column justify-content-between">
            <div class="px-3 py-4 flex-grow-1">
              <ul class="features">
                <li class="mb-3 fs-7 d-flex align-items-center fw-bold" v-if="plan.name !== 'Free'"><span>Everything from lower plans included PLUS</span></li>
                <li v-for="(feature, ii) in plan.features" :key="`feat-${i}-${ii}`" class="mb-3 fs-7 d-flex align-items-center">
                  <div class="icon d-flex justify-content-center me-2">
                    <svg v-if="!feature.excluded" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.9158 0.62594C17.0813 0.736278 17.1962 0.907831 17.2352 1.10287C17.2742 1.2979 17.2342 1.50044 17.1238 1.66594L8.12385 15.1659C8.06226 15.2582 7.98099 15.3356 7.88588 15.3927C7.79077 15.4497 7.68418 15.485 7.57381 15.4959C7.46344 15.5068 7.35202 15.4931 7.24758 15.4557C7.14314 15.4184 7.04829 15.3584 6.96985 15.2799L0.969847 9.27994C0.837366 9.13776 0.765243 8.94972 0.768672 8.75542C0.7721 8.56112 0.850812 8.37573 0.988225 8.23832C1.12564 8.10091 1.31102 8.02219 1.50532 8.01876C1.69963 8.01534 1.88767 8.08746 2.02985 8.21994L7.38285 13.5729L15.8758 0.83394C15.9862 0.668455 16.1577 0.553574 16.3528 0.514568C16.5478 0.475561 16.7503 0.515622 16.9158 0.62594Z" fill="#14B8A6"/></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.21934 0.238708C0.359965 0.0982575 0.550589 0.0193681 0.74934 0.0193681C0.948091 0.0193681 1.13871 0.0982575 1.27934 0.238708L6.74934 5.70871L12.2193 0.238708C12.288 0.165021 12.3708 0.105919 12.4628 0.064927C12.5548 0.023935 12.6541 0.00189351 12.7548 0.000116722C12.8555 -0.00166006 12.9555 0.0168643 13.0489 0.0545854C13.1423 0.0923064 13.2272 0.148451 13.2984 0.21967C13.3696 0.290888 13.4257 0.375722 13.4635 0.46911C13.5012 0.562499 13.5197 0.662528 13.5179 0.763231C13.5162 0.863934 13.4941 0.963247 13.4531 1.05525C13.4121 1.14725 13.353 1.23005 13.2793 1.29871L7.80934 6.76871L13.2793 12.2387C13.353 12.3074 13.4121 12.3902 13.4531 12.4822C13.4941 12.5742 13.5162 12.6735 13.5179 12.7742C13.5197 12.8749 13.5012 12.9749 13.4635 13.0683C13.4257 13.1617 13.3696 13.2465 13.2984 13.3177C13.2272 13.389 13.1423 13.4451 13.0489 13.4828C12.9555 13.5206 12.8555 13.5391 12.7548 13.5373C12.6541 13.5355 12.5548 13.5135 12.4628 13.4725C12.3708 13.4315 12.288 13.3724 12.2193 13.2987L6.74934 7.82871L1.27934 13.2987C1.13717 13.4312 0.949119 13.5033 0.754817 13.4999C0.560516 13.4965 0.375131 13.4177 0.237718 13.2803C0.100305 13.1429 0.0215933 12.9575 0.0181651 12.7632C0.0147369 12.5689 0.0868598 12.3809 0.21934 12.2387L5.68934 6.76871L0.21934 1.29871C0.0788894 1.15808 0 0.967459 0 0.768708C0 0.569957 0.0788894 0.379333 0.21934 0.238708Z" fill="#EF4444"/></svg>
                  </div>
                  <div class="flex-grow-1" v-html="feature.name"></div>
                  <button type="button" data-bs-toggle="tooltip" :title="feature.description">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3996 6.99961C13.3996 8.69699 12.7253 10.3249 11.5251 11.5251C10.3249 12.7253 8.69699 13.3996 6.99961 13.3996C5.30222 13.3996 3.67436 12.7253 2.47413 11.5251C1.27389 10.3249 0.599609 8.69699 0.599609 6.99961C0.599609 5.30222 1.27389 3.67436 2.47413 2.47413C3.67436 1.27389 5.30222 0.599609 6.99961 0.599609C8.69699 0.599609 10.3249 1.27389 11.5251 2.47413C12.7253 3.67436 13.3996 5.30222 13.3996 6.99961ZM7.79961 3.79961C7.79961 4.01178 7.71532 4.21527 7.56529 4.36529C7.41527 4.51532 7.21178 4.59961 6.99961 4.59961C6.78744 4.59961 6.58395 4.51532 6.43392 4.36529C6.2839 4.21527 6.19961 4.01178 6.19961 3.79961C6.19961 3.58744 6.2839 3.38395 6.43392 3.23392C6.58395 3.08389 6.78744 2.99961 6.99961 2.99961C7.21178 2.99961 7.41527 3.08389 7.56529 3.23392C7.71532 3.38395 7.79961 3.58744 7.79961 3.79961ZM6.19961 6.19961C6.04048 6.19961 5.88787 6.26282 5.77535 6.37535C5.66282 6.48787 5.59961 6.64048 5.59961 6.79961C5.59961 6.95874 5.66282 7.11135 5.77535 7.22387C5.88787 7.3364 6.04048 7.39961 6.19961 7.39961H6.40201C6.43194 7.39962 6.46148 7.40635 6.48846 7.4193C6.51544 7.43224 6.53917 7.45108 6.5579 7.47442C6.57664 7.49776 6.58989 7.525 6.59669 7.55415C6.6035 7.58329 6.60367 7.61359 6.59721 7.64281L6.23001 9.29561C6.18447 9.50033 6.18551 9.71266 6.23304 9.91693C6.28057 10.1212 6.37339 10.3122 6.50464 10.4757C6.63589 10.6393 6.80221 10.7713 6.99132 10.862C7.18042 10.9527 7.38749 10.9997 7.59721 10.9996H7.79961C7.95874 10.9996 8.11135 10.9364 8.22387 10.8239C8.3364 10.7114 8.39961 10.5587 8.39961 10.3996C8.39961 10.2405 8.3364 10.0879 8.22387 9.97535C8.11135 9.86282 7.95874 9.79961 7.79961 9.79961H7.59721C7.56728 9.7996 7.53774 9.79287 7.51076 9.77992C7.48378 9.76698 7.46005 9.74814 7.44131 9.7248C7.42258 9.70146 7.40933 9.67421 7.40252 9.64507C7.39572 9.61593 7.39555 9.58563 7.40201 9.55641L7.76921 7.90361C7.81475 7.69889 7.81371 7.48656 7.76618 7.28229C7.71864 7.07803 7.62583 6.88705 7.49458 6.72347C7.36333 6.5599 7.19701 6.42789 7.0079 6.33722C6.8188 6.24655 6.61173 6.19952 6.40201 6.19961H6.19961Z" fill="#9CA3AF"/></svg>
                  </button>
                </li>
              </ul>
            </div>
            <div class="d-none px-3 py-4" style="min-height: 360px;">
              <h5 class="fw-bold">Monthly Limit</h5>
              <div class="smaller" v-html="plan.token"></div>
            </div>
          </div>
          <div class=" p-3 px-lg-5 row gx-2">
            <div class="col-6 col-md-12 d-md-none">
              <button class="btn btn-outline-primary w-100 justify-content-center fw-bold" @click="showingPlan = showingPlan == i ? null : i">
                View {{ showingPlan == i ? 'Less' : 'More'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 mb-5 p-3 d-flex justify-content-center align-items-center">
      <small><span style="color:red">Note:</span> No refunds will be applicable against canceling an existing Subscription plan or renewal of a subscription plan.</small>
    </div>
    <UpgradePlanModal :checkoutUrl="checkoutUrl" ref="upgradePlanModal" />    
    <UpgradeStarterPlanModal :checkoutUrl="checkoutUrlStarter" ref="upgradeStarterPlanModal" />
    <ContactSalesModal :alreadyContacted="alreadyContacted" @onContactSubmit="sendContact" ref="contactSalesModal" />
    <DowngradePlanModal :plans="plans" :currentPlan="currentPlan" @onDowngradePlan="downgradePlanNow" ref="downgradePlanModal" />
  </div>
</template>

<script>
  import UpgradePlanModal from '@/modals/pricing/upgrade-plan';  
  import UpgradeStarterPlanModal from '@/modals/pricing/upgrade-starter-plan';
  import ContactSalesModal from '@/modals/pricing/contact-sales';
  import DowngradePlanModal from '@/modals/pricing/downgrade-plan';
  import PricingService from '@/api-services/pricing.service';

  export default {
    name: 'PricingPage',
    components: {
      UpgradePlanModal,
      UpgradeStarterPlanModal,
      ContactSalesModal,
      DowngradePlanModal
    },
    data() {
      return {
        currentPlan: 0,
        showingPlan: null,
        checkoutUrl: '',
        checkoutUrlStarter: '',
        alreadyContacted: false,
        collapsed: [],
        plans: [
          {
            name: `Free`,
            description: `The Free plan is designed for individuals seeking a more accurate and efficient experience with AI models by training them with their own data, making it highly relevant to their processes.`,
            price: 0,
            period: `Forever`,
            features: [
              {
                name: `Train your model with various data sources.`,
                description: `Refine your model with various data sources: Train your AI model with data from URLs, videos, audio files, PDFs, DOCs, CSVs, YouTube links, and Google Drive.`,
              }, {
                name: `Develop Independent models <b>Up to 3</b>`,
                description: `Train multiple models independently to handle different tasks or domains.`,
              }, {
                name: `Unlimited snippets`,
                description: `Generate and save an unlimited number of text snippets with your AI model.`,
              }, {
                name: `Prompt Library`,
                description: `Access a collection of pre-built prompts for various use cases.`,
              }, {
                name: `Confidence scoring and data visualization`,
                description: ` Assess AI-generated content quality with confidence scores and visualize data insights, as well as providing new guidelines to the model to make it more accurate.`
              }
            ],
            token: `<b>GPT-3.5</b>
            <ul><li>3,000 daily words (90,000 monthly words) for Prompt and Completion </li></ul>
            <b>GPT-4</b>
            <ul><li>700 daily words (21,000 monthly words) for Prompt and Completion </li></ul>
            <b>Training</b>
            <ul><li>Train your models with the equivalent of 6 PDFs of 100 pages each per month.  </li></ul>`,
            callToAction: {
              label: 'Downgrade',
              callback: this.downgradeModal
            }
          },
          {
            name: `Starter`,
            description: `The Starter plan is intended for users stepping up from the Free plan, interested in exploring more advanced features. It serves as an excellent starting point for those willing to dip their toes into a more feature-rich AI experience..`,
            price: 19,
            period: `mo`,
            features: [
            {
                name: `Develop Independent models <b>Up to 10</b>`,
                description: `Train multiple models independently to handle different tasks or domains.`,
              }, {
                name: `Train your model using social media data`,
                description: `Use your social media data to make your AI model more context-aware and relevant.`,
              }, {
                name: `Incorporate EZAI as a Chrome extension`,
                description: `Use EZAI seamlessly within your browser with the Chrome extension.`,
              }, {
                name: `Deployment System including: <ul><li>ChatBot Widget for your website</li><li>API Deployment</li><li>Email Bot</li><li>Text Bot</li><ul>`,
                description: `Easily incorporate EZAI wherever you need it. It's designed to provide consistent AI assistance across all channels and mediums.`,
              }, {
                name: `Integrate EZAI with Apple keyboard (coming soon)`,
                description: `Access EZAI features through an Apple keyboard extension on your mobile.`
              }, {
                name: `Long Terms Saved Conversations and Data`,
                description: `EZAI captures and learns from all your conversations, continuously enhancing your models for a more personalized AI experience.`
              }, {
                name: `Export AI-generated content as documents`,
                description: `Share and collaborate on AI-generated content by exporting it as documents.`,
              }, {
                name: `<b>High</b> Responsive customer support`,
                description: `Assess AI-generated content quality with confidence scores and visualize data insights.`,
              }, {
                name: `AI Voice Generation (+$17 on top of the Premium Fee) (coming soon)`,
                description: `- Create speech in English, German, Polish, Spanish, Italian, French, Portuguese, and Hindi.
- High-quality 96kbps audio outputs 
- Create up to 30 custom voices
- 2hs of Generated Audio `,
              }
            ],
            token: `<b>GPT-3.5</b>
            <ul><li>6,000 daily words (180,000 monthly words) for Prompt and Completion </li></ul>
            <b>GPT-4</b>
            <ul><li>2500 daily words (75,000 monthly words) for Prompt and Completion</li></ul>
            <b>Training</b>
            <ul><li>Train your models with the equivalent of 30 PDFs of 100 pages each per month. </li></ul>
            <b>Voice</b> <span class="text-muted">(Included with the AI Voice Generation Feature)</span>
            <ul><li>2hs of generated audio</li></ul>`,
              callToAction: {
              label: 'Get starter',
              callback: this.upgradeStarterModal
            }
          },
          {
            name: `Premium`,
            description: `The Premium plan is tailored for professionals, small businesses, and creators aiming to integrate AI into their workflow to boost productivity, optimize resources, and automate processes involved in daily business operations.`,
            price: 49,
            period: `mo`,
            features: [
              {
                name: `Develop Independent models <b>Up to 100</b>`,
                description: `Train multiple models independently to handle different tasks or domains.`,
              }, {
                name: `EZAI Google Workspaces & Email Integration`,
                description: `Integrate EZAI with your Google Workspace for easy model access and automate your email replies or outreach with customized messages.`,
              }, {
                name: `EZAI Text Message Integration`,
                description: `EZAI can be integrated into your text messaging platform, enabling automatic replies or customized messaging to your audience or customers.`
              }, {
                name: `Full API access`,
                description: `Integrate EZAI into your existing applications using API endpoints.`,
              }, {
                name: `AI Voice Generation (+$17 on top of the Premium Fee) (coming soon)`,
                description: `- Create speech in English, German, Polish, Spanish, Italian, French, Portuguese, and Hindi.
- High-quality 96kbps audio outputs 
- Create up to 30 custom voices
- 2hs of Generated Audio `,
              }
            ],
            token: `<b>GPT-3.5</b>
            <ul><li>15,500 daily words (465,000 monthly words) for Prompt and Completion </li></ul>
            <b>GPT-4</b>
            <ul><li>6500 daily words (195,000 monthly words) for Prompt and Completion</li></ul>
            <b>Training</b>
            <ul><li>Train your models with the equivalent of 80 PDFs of 100 pages each per month. </li></ul>
            <b>Voice</b> <span class="text-muted">(Included with the AI Voice Generation Feature)</span>
            <ul><li>5hs of generated audio</li></ul>`,
            callToAction: {
              label: 'Get starter',
              callback: this.upgradeModal
            }
          },
          {
            name: `Enterprise`,
            description: `The Enterprise plan is intended for established businesses and corporations looking to incorporate AI into specific aspects of their internal/external workflow or enhance features on their existing site/app.`,
            price: '-',
            period: `Based on Requirements`,
            features: [
              {
                name: `Develop <b>Unlimited</b> Models `,
                description: `Train multiple models independently to handle different tasks or domains.`,
              }, {
                name: `Exclusive Development Team`,
                description: `Benefit from an exclusive development team committed to crafting tailored solutions for Enterprise users.`,
              }, {
                name: `Custom Built Integrations`,
                description: `Deploy EZAI in a manner that meets all your enterprise needs - be it for internal or external use, or integration with bespoke software you're utilizing.`
              }, {
                name: `Dedicated Tech Support Team`,
                description: `An attentive Tech Support Team is at your disposal, ready to address any queries or challenges you might encounter.`,
              }, {
                name: `Privileged Access to Emerging Enterprise Features`,
                description: `Enjoy preferential access to our cutting-edge features, specifically designed for enterprise applications.`,
              }, {
                name: `Live Data Integration through API Interactions`,
                description: `Leverage EZAI's ability to interface with other APIs, enabling the retrieval of real-time data for enhanced usage possibilities.`
              }
            ],
            token: `The Enterprise plan offers a custom token limit tailored to the customer's specific needs, ensuring seamless integration with their processes and objectives. Please discuss your requirements with us to determine the appropriate token limit for your business.`,
            callToAction: {
              label: 'Contact Sales',
              callback: this.contactSalesModal
            }
          }
        ]
      }
    },
    mounted() {
      this.getCurrentPlan();
      this.getAlreadyContacted();
      this.getCheckoutSession();
    },
    methods: {
      planButtonAction(plan,i) {
        if(this.currentPlan != i) {
          plan.callToAction.callback();
          return;
        }
        var app = document.getElementById('pricingPageId');
        app.scrollTo({ top: 0, behavior: 'smooth' });
      },
      downgradeModal() {
        this.$refs.downgradePlanModal.show();
      },
      upgradeStarterModal(){
        this.$refs.upgradeStarterPlanModal.show();
      },
      upgradeModal() {
        this.$refs.upgradePlanModal.show();
      },
      contactSalesModal() {
        this.$refs.contactSalesModal.show();
      },
      getCheckoutSession() {
        PricingService.getCheckoutSession({plan:'starter'}).then(res=>{
          this.checkoutUrlStarter = res.url;
        })
        PricingService.getCheckoutSession({plan:'premium'}).then(res=>{
          this.checkoutUrl = res.url;
        })
      },
      getAlreadyContacted() {
        PricingService.getAlreadyContacted().then(res => {
          if(res.exists) {
            this.alreadyContacted = true;
          }
        })
      },
      getCurrentPlan() {
        PricingService.getCurrentPlan().then(res => {
          if(res.plan) {
            switch(res.plan){
              case 'starter':
                this.currentPlan = 1;
                break;
              case 'premium':
                this.currentPlan = 2;
                break;
              default: break;
            }
          }
        })
      },
      sendContact(formData) {
        PricingService.sendContactForm(formData).then(res => this.$swal(res.error ? 'Error' : 'Contact form sended', res.error || 'Thanks for your submit!', res.error ? 'error' : 'success'))
      },
      downgradePlanNow(){
        this.$swal({
          title: 'Downgrade your plan!',
          text: 'We will downgrade  your plan at the end of the month',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: `Downgrade now`,
          cancelButtonText: `Cancel`,
        }).then(res => {
          if(res.isConfirmed) {
              //Downgrade api call
            }
          })
      }
    },
    
  }
</script>

<style lang="scss" scoped>
  .info {
    min-height: 260px; 
  }
  .fw-bolder{
    font-weight: 800;
  }
  .description{
    min-height: 120px;
  }
  .icon {
    width: 20px;
  }
  .features {
    padding: 0;
    list-style: none;
  }
  .free-badge{
    color: #115E59;
    background: #CCFBF1;
  }
  .downgrade{
    border-color: var(--bs-sender-border-color);
    background: var(--bs-base);
    color: var(--bs-body-color);
  }
  .current-plan{
    background: var(--bs-selected);
    border-color: var(--bs-sender-border-color);
    color: var(--bs-body-color);
  }
  @media (max-width: 767px) {
    .to-collapse {
      max-height: 0;
      overflow: hidden;
      transition: max-height .3s;
    }
    .displaying {
      .to-collapse {
        max-height: 800px;
      }
    }
  }
</style>
