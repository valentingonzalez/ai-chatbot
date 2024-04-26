<template>
  <div class="input-group color-picker" ref="colorpicker">
    <div class="form-control d-flex align-items-center">
      <div class="flex-grow-1">
        <input class="border-0 p-0 bg-transparent text" type="text" v-model="colorValue" @focus="showPicker" @input="updateFromInput" />
      </div>
      <button type="button" class="current-color" :style="{ backgroundColor: colorValue }" @click="togglePicker"></button>
      <span class="input-group-addon color-picker-container">
        <Chrome :value="colors" @input="updateFromPicker" v-if="displayPicker" />
      </span>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
  name: 'ColorPicker',
  props: ['color'],
  components: {
    Chrome
  },
	data() {
		return {
			colors: {
				hex: '#000000',
			},
			colorValue: '',
			displayPicker: false,
		}
	},
	mounted() {
		this.setColor(this.color || '#000000');
	},
	methods: {
		setColor(color) {
			this.updateColors(color);
			this.colorValue = color;
		},
		updateColors(color) {
			if(color.slice(0, 1) == '#') {
				this.colors = { hex: color };
			}
			else if(color.slice(0, 4) == 'rgba') {
				let rgba = color.replace(/^rgba?\(|\s+|\)$/g,'').split(','),
            hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
				this.colors = { hex: hex, a: rgba[3] }
			}
		},
		showPicker() {
			document.addEventListener('click', this.documentClick);
			this.displayPicker = true;
		},
		hidePicker() {
			document.removeEventListener('click', this.documentClick);
			this.displayPicker = false;
		},
		togglePicker() {
			this.displayPicker ? this.hidePicker() : this.showPicker();
		},
		updateFromInput() {
			this.updateColors(this.colorValue);
		},
		updateFromPicker(color) {
			this.colors = color;
			this.colorValue = color.rgba.a == 1 ? color.hex : `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`;
		},
		documentClick(e) {
			if(this.$refs.colorpicker !== e.target && !this.$refs.colorpicker.contains(e.target)) {
				this.hidePicker();
			}
		}
	},
	watch: {
		colorValue(val) {
			if(val) {
				this.updateColors(val);
				this.$emit('input', val);
			}
		}
	}
}
</script>
<style scoped lang="scss">
.form-control {
  max-width: 210px;
  .current-color {
    min-width: 24px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }
}
  .vc-chrome {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 9;
  }
</style>