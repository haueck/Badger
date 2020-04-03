import tinymce from "tinymce/tinymce"
import "tinymce/themes/silver"
import "tinymce/plugins/autolink"
import "tinymce/plugins/lists"
import "tinymce/plugins/link"
import "tinymce/plugins/image"
import "tinymce/plugins/charmap"
import "tinymce/plugins/print"
import "tinymce/plugins/searchreplace"
import "tinymce/plugins/visualblocks"
import "tinymce/plugins/code"
import "tinymce/plugins/nonbreaking"
import "tinymce/plugins/insertdatetime"
import "tinymce/plugins/media"
import "tinymce/plugins/table"
import "tinymce/plugins/codesample"
import "tinymce/plugins/paste"
import "tinymce/plugins/fullscreen"
import "plugins/googledrive"

export default {
  name: "tinymce",
  props: {
    "id" : {
      type : String,
      required : true
    }
  },
  data() {
    return { }
  },
  mounted() {
    let valid = "@[style|lang|class],br,p,span,strong/b,img[src|alt|width|height],a[href|title|target=_blank],ul,ol,li,pre,code,em/i,sup,sub,tbody,thead,h1,h2,h3,h4,h5,div,"
    valid = valid + "abbr,article,section,aside,caption,cite,col,colgroup,dd,dl,dt,dfn,kbd,samp,var,h6,footer,header,hgroup,time,wbr,summary,figure,figcaption,"
    valid = valid + "blockquote[cite],q[cite],canvas[height|width],details[open],video[autoplay|controls|height|width|loop|muted|poster|preload|src],source[media|src|type],"
    valid = valid + "table[border|cellspacing|cellpadding],tr[align|valign],td[align|valign|colspan|rowspan],th[align|valign|colspan|rowspan],iframe[src|width|height]"
    let options = {
      selector: "#" + this.id,
      mode: "exact",
      element_format: "xhtml",
      width: "100%",
      height: "400px",
      valid_elements: valid,
      convert_urls: false,
      entity_encoding: "raw",
      skin_url: "/css/tinymce/ui/oxide",
      content_css: "/css/tinymce/content/default/content.min.css",
      menubar: "file edit insert view format table",
      toolbar: "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link codesample image googledrive",
      plugins: "autolink lists link image charmap print searchreplace visualblocks code nonbreaking insertdatetime media table paste codesample fullscreen googledrive",
      codesample_languages: [ { text: "C++", value: "cpp" }, { text: "JavaScript", value: "javascript" }, { text: "Python", value: "python" } ],
      init_instance_callback: (editor) => {
        editor.on("Change", () => {
          this.$emit("input", editor.getContent())
        })
      }
    }
    tinymce.init(options)
  },
  beforeDestroy () {
    tinymce.get(this.id).destroy()
  }
}
