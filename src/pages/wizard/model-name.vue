<template>
  <div>
    <h1 class="fw-bold">
      <TypeWriter>
        Create Your First A.I Assistant
      </TypeWriter>
    </h1>
    <div class="text-muted w-100">
      <TypeWriter :speed="2" :delay="1000" @onComplete="showButton = true">
        AI Assistants You can create multiple AI assistants tailored to specific processes, each functioning independently and designed for various purposes. ✨
      </TypeWriter>
    </div>
    <CreateModel :model_id="$parent.wizard.model_id" ref="createModel" class="mt-4 w-100" :small="true" style="height: 430px;" />
    <!-- <transition name="fadeHeight">
      <div class="d-flex flex-column form w-100 mt-5" v-if="showButton">
        <label for="model-name" class="form-label h4">Enter A.I Model Name</label>
        <input ref="input" placeholder="Model Name" type="text" class="form-control form-control-lg" id="model-name" v-model="model_name">
      </div>
    </transition> -->
  </div>
</template>

<script>
  import CreateModel from '@/components/models/model-create';
  import WizardService from '@/api-services/wizard.service';
  export default {
    name: 'WizardModelName',
    data() {
      return {
      }
    },
    components: {
      CreateModel
    },
    mounted() {
      this.$logActivity({action: 'view', page: this.$route.name, type: 'firstModel'});
    },
    methods: {
      async next(to) {
        this.$logActivity({action: 'click', page: this.$route.name, type: 'addModel'});

        let obj = await this.$refs.createModel.add();
        if(obj) {
          await WizardService.saveModel({model_id : obj.id,model_name: obj.name, id: this.$parent.wizard.id});
          this.$router.push(to);
        }
        //await this.$store.dispatch('newModel', this.newModel);
        //this.$store.commit('updateWizard', { model_name: model.title })

      }
    }
  }
</script>
