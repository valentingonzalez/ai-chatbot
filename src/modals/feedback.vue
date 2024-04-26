<template>
    <div class="modal" ref="feedbackModal" id="feedbackModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header pb-3">
            <h4 class="mb-0 fw-bold">Please take a moment to explain the reason of why you don't like the response</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" ref="closeModelModal" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-2 d-flex flex-column align-items-center">
            <div class="d-flex flex-column">
              <div>Your feedback is very helpful! Thank you for sharing your thoughts with us!</div>
              <div v-for="(item, i) in feedbacks" :key="`item-${i}`" class="form-check py-3">
                <input class="form-check-input" type="radio" name="feedback-option" :id="`item-${i}`" :value="item.value" v-model="selected">
                <label class="form-check-label d-block" :for="`item-${i}`">
                  <h6 class="mb-0">{{ item.feedback }}</h6>
                  <div class="text-muted">{{ item.desc }}</div>
                </label>
              </div>
              <textareaAutosize v-model="otherText" class="form-control" v-if="selected == 'other'" />
            </div>
          </div>
          <div class="modal-footer pt-2">
            <button type="button" class="btn px-5 btn-secondary me-2" :disabled="submitting" @click="onAdd">
              <div class="spinner-border spinner-border-sm me-2" v-if="submitting"></div>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
    import { Modal } from 'bootstrap';
    import ChatService from '@/api-services/chat.service';

    export default {
      name: 'FeedbackModal',
      props: {
        eventId: {
          default: null
        }
      },
      data() {
        return {
          feedbacks: [
            { value: 'confusing', feedback: 'Confusing', desc: 'The response is unclear or confusing and it\'s difficult to understand' },
            { value: 'inaccurate', feedback: 'Inaccurate', desc: 'The response is incorrect or inaccurate and it doesn\'t provide the inforamtion needed.' },
            { value: 'incomplete', feedback: 'Incomplete', desc: 'The response is missing important details or information' },
            { value: 'too_technical', feedback: 'Too technical', desc: 'The response is overly technical or complex and it\'s difficult to understand.' },
            { value: 'incorrect', feedback: 'Incorrect', desc: 'The response doesn\'t provide any value or insight' },
            { value: 'other', feedback: 'Other', desc: '' },
          ],
          selected: '',
          otherText: '',
          submitting: false
        }
      },
      computed: {
        modal() {
          return new Modal(this.$refs.feedbackModal);
        }
      },
      methods: {
        async onAdd() {
          if(this.submitting || !this.selected || !this.eventId) return;
          this.submitting = true;
          await ChatService.addFeedback({ id: this.eventId, feedback: this.selected, other_text: this.otherText }).then((response) => {
            this.submitting = false;
            if(response.error) {
              this.$swal('', response.error, 'error');
              return;
            }
            this.$swal('Success', 'Thank you for submitting your feedback! Our team is serious about reviewing all feedbacks and we will improve EZAI immediately!', 'success');
            this.selected = ''
            this.otherText = ''
            this.modal.hide();
          });
        },
        show() {
          this.otherText = '';
          this.modal.show();
        }
      }
    }
  </script>
  