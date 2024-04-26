<template>
  <div class="wrapper">
    <div class="card p-3 mb-4">
      <h5 class="mb-3">Invoices</h5>
      <div class="d-flex justify-content-center w-100" v-if="invoicesLoading">
        <div class="spinner-border spinner-border-sm my-4"></div>
      </div>
      <div v-else-if="Object.keys(invoices).length == 0">
        <h3>No invoice found</h3>
      </div>
      <table v-else class="table table-borderless smaller">
        <thead>
          <tr>
            <th class="text-capitalize text-muted fw-normal" v-for="head in Object.keys(invoices[0])" scope="col" :key="head">
              <span v-if="head != 'link'">{{ head == 'id' ? 'Invoice #' : head }}</span>
            </th>
            <th class="text-capitalize text-muted fw-normal text-end">Receipt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in invoices" :key="`invoice${i}`">
            <td v-for="(data, ii) in Object.keys(item)" :key="`invoice${i}${ii}`">
              <div class="text-capitalize" v-if="data !== 'link'">
                {{ String(item[data]).replaceAll('-', ' ') }}
              </div>
            </td>
            <td class="text-end">
              <a class="fw-bold" target="_blank" :href="item.link">View</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PricingService from '@/api-services/pricing.service';
  export default {
    name:'userSettingsCards',
    data() {
      return {
        cardpieces: [
          {},{},{},{}
        ],
        cardNumber: '',
        invoices: [],
        invoicesLoading: true,
      }
    },
    mounted() {
      this.loadInvoices();
    },
    methods: {
      async loadInvoices() {
        this.invoicesLoading = true;
        await PricingService.getInvoices().then(res => {
          this.invoices = res.invoices.map(invoice=>({
            id: invoice.id,
            date: invoice.date_formatted,
            total: invoice.total_formatted,
            link: invoice.hosted_invoice_url
          }));
        });
        this.invoicesLoading = false;
      },
      onCcardInput(evt, i) {
        evt.srcElement.value = evt.srcElement.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        if(evt.srcElement.value.length >= 4) {
          if(this.$refs.ccard[i + 1])
            this.$refs.ccard[i + 1].focus();
          else
            return;
        }
        this.cardNumber = this.$refs.ccard.map((a) => `${a.value}`).join('');
      },
      onCcardKeyDown(evt, i) {
        if(evt.key == 'Backspace' && evt.srcElement.value.length == 0) {
          if(this.$refs.ccard[i - 1])
            this.$refs.ccard[i - 1].focus();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .form-control.ccard {
    font-family: monospace;
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px;
    letter-spacing: 10px;
  }
  .status {
    padding: 1px 6px;
    border-radius: 6px;
    &.not-paid-yet,
    &.paid {
      text-align: center;
      display: inline-block;
    }
    &.not-paid-yet {
      background: #FEF2F2;
      color: #EF4444;
    }
    &.paid {
      background: #F0FDFA;
      color: #14B8A6;
    }
  }
</style>
