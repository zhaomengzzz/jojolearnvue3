<script lang="ts">
import {h} from "vue";
import * as Icon from "@element-plus/icons-vue";


export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let iconEl = undefined
    for (const iconKey in Icon) {
      if (Icon[iconKey].__name == props.icon) {
        iconEl = Icon[iconKey]
      }
    }
    return () => {
      return h(iconEl ? iconEl : 'div')
    }
  }
}
</script>
<style scoped>

</style>