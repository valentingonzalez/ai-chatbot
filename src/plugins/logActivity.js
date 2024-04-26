export default {
    install(Vue) {
      Vue.prototype.$logActivity = async function(data) {
        if(!this.$store.state.ip_address)
          await this.$store.dispatch('getIpAddress');

        data.ip_address = this.$store.state.ip_address;
        if (this.$root.$children[0].socket) {
          this.$root.$children[0].socket.emit('log activity', JSON.stringify(data));
        }
      };
    }
  }
  