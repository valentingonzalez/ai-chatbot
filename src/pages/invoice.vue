<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center" v-if="loading">
    <div class="spinner-border"></div>
  </div>
  <div class="w-100 h-100" v-else-if="invoice">
    <div class="saturn-body"  >
      <div class="saturn-container" id="saturn-header">
        <img :src="logo" class="s-logo">
        <div class="s-header-right">
          Receipt 
        </div>
      </div>
      <div class="saturn-container" id="saturn-main" style="margin-bottom:50px" >
        <div class="saturn-main-left">
          <div class="saturn-main-title">
            Recipient
          </div>
          <div class="saturn-main-black-title">
            {{ username }}
          </div>
        </div>
        <div class="saturn-main-right">
          <div class="saturn-main-black-title">
            #{{ invoice.invoice_id }}<i></i><span>{{ invoice.date_formatted }}</span>
          </div>
          <div class="saturn-main-black-right-desc">
            Total
            <div class="total-section">
              <div class="total-section-price">
                {{ invoice.total_formatted }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="saturn-table" style="">
      <div class="saturn-container">
        <div class="item-detail-title">
          Item Detail
        </div>
        <table class="table table-bordered table-striped" style=" border: 0px solid white;">
          <tr>
            <th style="background: white;">Description</th>
            <th style="background: white;">Quantity</th>
            <th style="background: white;">Total Price</th>
          </tr>
          <tr>
            <td>{{ invoice.description }}</td>
            <td>{{ invoice.total_formatted }}</td>
            <td>{{ invoice.total_formatted }}</td>
          </tr>
          <tr>
            <th style="background: white; border: 0px solid white;"></th>
            <th style="opacity: 0.35;background: white; border: 0px solid white;">Total</th>
            <th style="background: white; border: 0px solid white;">{{ invoice.total_formatted }}</th>
          </tr>
        </table>
      </div>
    </div>
    <div class="saturn-container" style="text-align:center;border-top: 1px solid #ebebeb;padding-top:0px">
      <p class="saturn-main-black-left-desc">Have Questions? Call (833) 672-8876 or Email support@ezai.com</p>
    </div>
  </div>
</template>

<script>
import PricingService from '@/api-services/pricing.service';
import userService from '@/api-services/user.service';
export default {
  name: 'InvoicePage',
  data() {
    return {
      username: null,
      invoice: null,
      invoice_id : this.$route.params.id,
      loading: true,
    }
  },
  computed:{
    logo() {
      return require(`@/assets/images/logo.svg`);
    },
  },
  mounted() {
    this.getUserInfo();
    this.getInvoice();
  },
  methods: {
    async getInvoice() {
      this.loading = true;
      await PricingService.getInvoices().then(res => {
        let finded = res.invoices.find(invoice => invoice.invoice_id == this.invoice_id);
        if(!finded) {
          this.$router.push('/');
        }
        this.invoice = finded;
      })
      this.loading = false;
    },
    getUserInfo() {
      userService.getUserInfo().then(e => {
        this.username = e.member.name;
      });
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
  @media print{@page {size: landscape}}

@page { size : portrait }
@page rotated { size : landscape }
.saturn-body{
    background: #F9F9F9;

}
.saturn-main-right{
    width: 50%; display:inline-block;
}
.saturn-main-left{
    width: 50%; display:inline-block;

}
.saturn-container{
    max-width: 612px;
    margin: 0px auto;
}
.s-logo{
    display: inline-block;
    margin-top: 24px;
    max-width: 166px;
}
.s-header-right{
    width: 135px;
    line-height: 24px;
    text-align: center;
    font-family: 'Montserrat-Bold','Montserrat', sans-serif;
    font-weight: bold;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 0.6px;
    background: #E50C26;
    display: block;
    float: right;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    text-transform: uppercase;
    padding-top: 28px;
    padding-bottom: 12px;
}
#saturn-header{
    margin-bottom: 43px;
    background: #F9F9F9;
  height: 50px;
}
#saturn-main{
    background: #F9F9F9;
    font-size: 0;
    padding-bottom: 38px;
}
.saturn-main-title{
    font-family: 'Montserrat-Bold','Montserrat', sans-serif;
    font-weight: bold;
    font-size: 12px;
    color: #E50C26;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    background: #F9F9F9;
    padding-right: 5px;
    position: relative;
    margin-bottom: 24px;
}
.saturn-main-title:after{
    position: absolute;
    width: 65%;
    top: 40%;
    right: 0;
    background: #E8E9EA;
    content: ' ';
    height: 1px;
}
.saturn-main-black-title{
    font-family: 'Montserrat-Bold','Montserrat', sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
  margin-top: 50px;
}
.saturn-main-black-title i{
    width: 4px;
    height: 4px;
    opacity: 0.3;
    background: #49494A;
    margin-right: 12px;
    margin-left: 12px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 100%;
}
.saturn-main-black-title span{
    font-family: 'Montserrat-Regular','Montserrat', sans-serif;
    font-weight: 400;
    opacity: 0.7;
    font-size: 14px;
    color: #000000;
    line-height: 18px;
}
.saturn-main-black-left-desc{
    opacity: 0.7;
    font-family: 'Montserrat-Regular','Montserrat', sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #000000;
    line-height: 18px;
    margin-top: 12px;
}
.saturn-main-black-right-desc{
    font-family: 'Montserrat-Regular','Montserrat', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: rgba(0,0,0,0.7);
    line-height: 18px;
    margin-top: 28px;
}
.total-section{
    margin-top: 16px;
    font-size: 0;
}
.total-section-price{
    font-family: 'Montserrat-Bold','Montserrat', sans-serif;
    font-weight: bold;
    font-size: 30px;
    color: #E50C26;
    display: inline-block;
    width: 50%;
}
.total-section-btn-parent{
    display: inline-block;
    width: 50%;
    text-align: right;
}
.item-detail-title{
    font-family: 'Montserrat-Bold','Montserrat', sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #000000;
    margin-top: 56px;
    margin-bottom: 23px;
}
#saturn-table{
    background: white;
}
#saturn-table table tr td:not(:first-child), #saturn-table table tr th:not(:first-child) {
    text-align: center;
}

#saturn-table table tr td{
    font-family: 'Montserrat-Regular','Montserrat', sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #000000;
}
.total-section-btn-green-parent{

}
.total-section-btn-green-parent{
    display: inline-block;
    width: 50%;
    text-align: right;
}

</style>
