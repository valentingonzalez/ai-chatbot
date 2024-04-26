<template>
    <div>
      
    </div>
  </template>
  
  <script>
    export default {
      name: 'WizardCongrats',
      data() {
        return {
        }
      },
      mounted() {
      },
      methods: {
        async next(to) {
          this.$router.push(to);
        }
      }
    }
  </script>