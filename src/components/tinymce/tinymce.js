import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'

import 'tinymce/plugins/autolink'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/code'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/paste'

import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'

export default {
  name: 'tinymce',
  props: {
    'id' : {
      type : String,
      required : true
    }
  },
  data() {
    return { }
  },
  mounted() {
    let valid = "@[style|lang],br,p,span,strong/b,img[src|alt|width|height],a[href|title|target=_blank],ul,ol,li,pre,code,em/i,sup,sub,tbody,thead,h1,h2,h3,h4,h5,div,";
    valid = valid + "abbr,article,section,aside,caption,cite,col,colgroup,dd,dl,dt,dfn,kbd,samp,var,h6,footer,header,hgroup,time,wbr,summary,figure,figcaption,";
    valid = valid + "blockquote[cite],q[cite],canvas[height|width],details[open],video[autoplay|controls|height|width|loop|muted|poster|preload|src],source[media|src|type],";
    valid = valid + "table[border|cellspacing|cellpadding],tr[align|valign],td[align|valign|colspan|rowspan],th[align|valign|colspan|rowspan],iframe[src|width|height]";
    let options = {
      selector: '#' + this.id,
      mode: "exact",
      element_format: "xhtml",
      entity_encoding: "numeric",
      width: "100%",
      height: "400px",
      valid_elements: valid,
      convert_urls: false,
      entity_encoding: "raw",
      skin: false,
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      plugins: 'autolink lists link image charmap print searchreplace visualblocks code nonbreaking insertdatetime media table contextmenu paste',
      init_instance_callback: (editor) => {
        editor.on('Change', () => {
          this.$emit('input', editor.getContent())
        })
      }
    }
    tinymce.init(options)
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy();
  }
}
